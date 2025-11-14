const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 🆕 IMPORT du rate limiting
const { generalLimiter } = require('./middleware/rateLimiter');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🆕 APPLIQUER le rate limiting GLOBAL à toutes les routes API
app.use('/api', generalLimiter); // ✅ DOIT ÊTRE AVANT les routes

// Import des routes
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders'); 

// Route de base pour tester
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Angels_Bags fonctionne ! 🎉',
    version: '1.0.0',
    database: 'MongoDB Atlas',
    endpoints: {
      categories: '/api/categories',
      products: '/api/products', 
      product_by_id: '/api/products/:id',
      category_by_slug: '/api/categories/slug/:slug',
      orders: '/api/orders' 
    }
  });
});

// Utilisation des routes (APRÈS le rate limiting)
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes); 

// Middleware 404 pour les routes API non trouvées
app.use('/api', (req, res) => {
  res.status(404).json({ 
    message: 'Route API non trouvée',
    requestedPath: req.path,
    availableRoutes: {
      home: '/',
      categories: '/api/categories', 
      category_by_id: '/api/categories/:id',
      category_by_slug: '/api/categories/slug/:slug',
      products: '/api/products',
      product_by_id: '/api/products/:id',
      orders: '/api/orders' 
    }
  });
});

// Route de fallback
app.use((req, res) => {
  res.json({ 
    message: 'Serveur Angels_Bags fonctionne! 🚀',
    database: 'MongoDB Atlas (Cloud)',
    api: 'Utilisez les routes /api/* pour accéder à l\'API',
    availableEndpoints: {
      categories: '/api/categories',
      products: '/api/products',
      orders: '/api/orders' 
    }
  });
});

// ✅ CONNEXION MONGODB ATLAS ET DÉMARRAGE DU SERVEUR
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

// Vérification de l'URI
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI non définie dans .env');
  process.exit(1);
}

// 🎯 Connexion à MongoDB puis démarrage du serveur
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connecté à MongoDB Atlas');
    console.log('📍 Base de données:', mongoose.connection.name);
    console.log('🏢 Cluster:', mongoose.connection.host);
    
    // ✅ Démarrer le serveur SEULEMENT après connexion réussie
    app.listen(PORT, () => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🚀 Serveur Angels_Bags démarré !');
      console.log('📡 Port:', PORT);
      console.log('🌐 URL: http://localhost:' + PORT);
      console.log('💾 Base de données: MongoDB Atlas');
      console.log('📦 Endpoints disponibles:');
      console.log('   📁 /api/categories');
      console.log('   🛍️  /api/products');
      console.log('   📋 /api/orders');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    });
  })
  .catch(err => {
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('❌ Erreur de connexion MongoDB Atlas');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('📋 Message:', err.message);
    console.error('');
    console.error('💡 Vérifications à faire:');
    console.error('   1. Votre URI dans le fichier .env');
    console.error('   2. Vos identifiants (username/password)');
    console.error('   3. Votre IP dans Network Access sur Atlas');
    console.error('   4. Le nom de votre base de données dans l\'URI');
    console.error('');
    console.error('🔗 URI utilisée:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    process.exit(1);
  });

// Gestion des événements de connexion
mongoose.connection.on('error', err => {
  console.error('❌ Erreur MongoDB:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('📡 Déconnecté de MongoDB Atlas');
});

// Gestion de l'arrêt propre du serveur
process.on('SIGINT', async () => {
  console.log('\n🛑 Arrêt du serveur...');
  await mongoose.connection.close();
  console.log('✅ Connexion MongoDB fermée');
  process.exit(0);
});