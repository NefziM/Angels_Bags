const { body, param, validationResult } = require('express-validator');

/**
 * Middleware pour gérer les erreurs de validation
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    console.warn('⚠️ Erreurs de validation:', errors.array());
    
    return res.status(400).json({
      success: false,
      error: 'Erreur de validation des données',
      details: errors.array().map(err => ({
        field: err.path || err.param,
        message: err.msg,
        value: err.value
      }))
    });
  }
  
  next();
};

/**
 * Validation pour la création d'une commande
 */
const validateCreateOrder = [
 body('userId')
    .trim()
    .notEmpty().withMessage('userId est requis'),

  body('customerInfo')
    .notEmpty().withMessage('customerInfo est requis'),

  body('customerInfo.fullName')
    .trim()
    .notEmpty().withMessage('Le nom du client est obligatoire')
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/).withMessage('Nom invalide (caractères spéciaux interdits)')
    .escape(),

  body('items')
    .isArray({ min: 1 }).withMessage('La commande doit contenir au moins un produit'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Erreur de validation',
        errors: errors.array().map(e => e.msg)
      });
    }
    next();
  }
];

/**
 * Validation pour la mise à jour du statut
 */
const validateUpdateStatus = [
  param('orderId')
    .trim()
    .notEmpty().withMessage('ID de commande requis')
    .isMongoId().withMessage('ID de commande invalide'),
  
  body('status')
    .trim()
    .notEmpty().withMessage('Statut requis')
    .isIn(['pending', 'confirmed', 'in_production', 'shipped', 'delivered', 'cancelled'])
    .withMessage('Statut invalide'),
  
  handleValidationErrors
];

/**
 * Validation pour les paramètres d'ID
 */
const validateOrderId = [
  param('orderId')
    .trim()
    .notEmpty().withMessage('ID de commande requis')
    .isMongoId().withMessage('ID de commande invalide'),
  
  handleValidationErrors
];

const validateUserId = [
  param('userId')
    .trim()
    .notEmpty().withMessage('ID utilisateur requis')
    .isString().withMessage('ID utilisateur invalide'),
  
  handleValidationErrors
];

/**
 * Sanitizer pour nettoyer les données sensibles avant la réponse
 */
const sanitizeOrderResponse = (order) => {
  if (!order) return null;
  
  // Créer une copie de l'objet
  const sanitized = order.toObject ? order.toObject() : { ...order };
  
  // Supprimer les champs sensibles si nécessaire
  // (Pour l'instant on garde tout, mais on pourrait masquer certaines infos)
  
  return sanitized;
};

module.exports = {
  validateCreateOrder,
  validateUpdateStatus,
  validateOrderId,
  validateUserId,
  sanitizeOrderResponse,
  handleValidationErrors
};