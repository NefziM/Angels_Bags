const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import des routes
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');

// Route de base pour tester
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Angels_Bags fonctionne ! 🎉',
    version: '1.0.0',
    endpoints: {
      categories: '/api/categories',
      products: '/api/products', 
      product_by_id: '/api/products/:id',
      category_by_slug: '/api/categories/slug/:slug'
    }
  });
});

// Utilisation des routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// ✅ CORRIGÉ : Middleware 404 pour les routes API non trouvées
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
      product_by_id: '/api/products/:id'
    }
  });
});

// Route de fallback pour toutes les autres routes (doit être en dernier)
app.use((req, res) => {
  res.json({ 
    message: 'Serveur Angels_Bags fonctionne! 🚀',
    api: 'Utilisez les routes /api/* pour accéder à l\'API',
    frontend: 'L\'application React est disponible sur le port 3000'
  });
});

// Connexion MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/angels_bags';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connecté à MongoDB'))
.catch(err => console.log('❌ Erreur MongoDB:', err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('🚀 Serveur Angels_Bags démarré !');
  console.log('📡 Port:', PORT);
  console.log('🌐 URL: http://localhost:' + PORT);
  console.log('📚 API Documentation:');
  console.log('   • GET /                        - Page d\'accueil API');
  console.log('   • GET /api/categories          - Liste des catégories');
  console.log('   • GET /api/categories/:id      - Catégorie par ID');
  console.log('   • GET /api/categories/slug/:slug - Produits par catégorie (slug)');
  console.log('   • GET /api/products            - Liste des produits');
  console.log('   • GET /api/products/:id        - Détail d\'un produit');
});