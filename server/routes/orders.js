const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST - Créer une nouvelle commande (CORRIGÉ)
router.post('/', async (req, res) => {
  try {
    const orderData = req.body;
    
    console.log('📨 Données reçues:', JSON.stringify(orderData, null, 2));
    
    // Validation des données requises
    if (!orderData.userId || !orderData.userEmail || !orderData.customerInfo) {
      return res.status(400).json({
        success: false,
        message: 'Données manquantes: userId, userEmail et customerInfo sont requis'
      });
    }

    // Valider les items
    if (!orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'La commande doit contenir au moins un produit'
      });
    }

    // ✅ CORRECTION : S'assurer que chaque item a les champs requis AVANT création
    const validatedItems = orderData.items.map((item, index) => {
      const productId = item.productId || `temp-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`;
      
      if (!item.productName) {
        throw new Error(`Item ${index}: productName est requis`);
      }
      if (!item.quantity || item.quantity < 1) {
        throw new Error(`Item ${index}: quantity doit être au moins 1`);
      }
      if (!item.price || item.price < 0) {
        throw new Error(`Item ${index}: price doit être un nombre positif`);
      }
      
      const subtotal = item.subtotal || (item.price * item.quantity);
      
      return {
        productId: productId,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        personalization: item.personalization,
        subtotal: subtotal
      };
    });

    // ✅ CORRECTION : Créer la commande avec un orderNumber généré
    const order = new Order({
      ...orderData,
      items: validatedItems,
      orderNumber: Order.generateOrderNumber() // ✅ Générer orderNumber explicitement
    });

    console.log('📦 Commande à sauvegarder:', {
      orderNumber: order.orderNumber,
      customer: orderData.customerInfo.fullName,
      itemsCount: validatedItems.length,
      total: orderData.paymentInfo?.total
    });

    // Sauvegarder dans MongoDB
    const savedOrder = await order.save();
    
    console.log(`✅ Nouvelle commande créée: ${savedOrder.orderNumber}`);
    console.log(`👤 Client: ${orderData.customerInfo.fullName}`);
    console.log(`💰 Total: ${orderData.paymentInfo?.total || 0} TND`);
    console.log(`📦 Items: ${orderData.items.length} produit(s)`);
    
    res.status(201).json({
      success: true,
      order: savedOrder,
      message: 'Commande sauvegardée avec succès'
    });
  } catch (error) {
    console.error('❌ Erreur sauvegarde commande:', error);
    
    // Erreur de validation Mongoose
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      console.error('📋 Détails validation:', errors);
      return res.status(400).json({
        success: false,
        message: 'Erreur de validation des données',
        errors: errors
      });
    }
    
    // Erreur de duplication (orderNumber)
    if (error.code === 11000) {
      console.error('🔁 OrderNumber dupliqué, régénération...');
      // Réessayer avec un nouveau orderNumber
      return res.status(409).json({
        success: false,
        message: 'Numéro de commande déjà existant, veuillez réessayer'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la sauvegarde de la commande',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Erreur interne du serveur'
    });
  }
});

// GET - Récupérer les commandes d'un utilisateur spécifique
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const orders = await Order.find({ userId: userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('❌ Erreur récupération commandes utilisateur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des commandes'
    });
  }
});

// GET - Récupérer une commande spécifique par son ID
router.get('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Commande non trouvée'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('❌ Erreur récupération commande:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la commande'
    });
  }
});

// ============================================
// 🆕 NOUVELLE ROUTE : Double vérification userId/orderId
// ============================================

/**
 * GET - Récupérer une commande spécifique avec double vérification
 * 🔒 Vérifie que l'orderId appartient bien au userId
 * ❌ Retourne 403 si l'orderId n'appartient pas au userId
 */
router.get('/user/:userId/order/:orderId', async (req, res) => {
  try {
    const { userId, orderId } = req.params;
    
    console.log(`🔍 Vérification commande: user=${userId}, order=${orderId}`);
    
    // Rechercher la commande par orderId
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Commande non trouvée'
      });
    }

    // 🛡️ DOUBLE VÉRIFICATION SÉCURITÉ
    // Vérifier que la commande appartient bien à l'utilisateur spécifié
    if (order.userId !== userId) {
      console.warn(`🚨 TENTATIVE IDOR DÉTECTÉE!`);
      console.warn(`🔸 User demandé: ${userId}`);
      console.warn(`🔸 Propriétaire réel: ${order.userId}`);
      console.warn(`🔸 Commande: ${orderId}`);
      console.warn(`🔸 OrderNumber: ${order.orderNumber}`);
      
      return res.status(403).json({
        success: false,
        error: 'Accès refusé',
        message: 'Cette commande ne vous appartient pas',
        security: {
          reason: 'IDOR_PROTECTION',
          requestedUser: userId,
          actualOwner: order.userId,
          orderId: orderId,
          timestamp: new Date().toISOString()
        }
      });
    }

    console.log(`✅ Commande validée: ${order.orderNumber} appartient à ${userId}`);

    res.json({
      success: true,
      order: order,
      message: 'Commande récupérée avec succès'
    });
  } catch (error) {
    console.error('❌ Erreur récupération commande:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la commande'
    });
  }
});

// PUT - Mettre à jour le statut d'une commande
router.put('/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'in_production', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Statut invalide',
        validStatuses
      });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { 
        status: status,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Commande non trouvée'
      });
    }

    console.log(`🔄 Statut commande ${order.orderNumber} mis à jour: ${status}`);
    
    res.json({
      success: true,
      order,
      message: `Statut de la commande mis à jour: ${status}`
    });
  } catch (error) {
    console.error('❌ Erreur mise à jour statut commande:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du statut'
    });
  }
});

// GET - Récupérer les statistiques des commandes (pour l'admin)
router.get('/admin/stats', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const confirmedOrders = await Order.countDocuments({ status: 'confirmed' });
    const deliveredOrders = await Order.countDocuments({ status: 'delivered' });
    
    // Calcul du chiffre d'affaires total
    const revenueResult = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: null, totalRevenue: { $sum: '$paymentInfo.total' } } }
    ]);
    
    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    res.json({
      success: true,
      stats: {
        totalOrders,
        pendingOrders,
        confirmedOrders,
        deliveredOrders,
        totalRevenue: Math.round(totalRevenue * 100) / 100
      }
    });
  } catch (error) {
    console.error('❌ Erreur récupération statistiques:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques'
    });
  }
});

module.exports = router;