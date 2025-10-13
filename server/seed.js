const mongoose = require('mongoose');
require('dotenv').config();

// Modèles (créez ces fichiers si nécessaire)
const Category = require('./models/Category');
const Product = require('./models/Product');

const categories = [
  {
    name: 'Sacs en Perles',
    description: 'Des sacs élégants entièrement réalisés avec des perles de qualité',
    slug: 'sacs-perles',
    image: '/images/categories/beads.jpg'
  },
  {
    name: 'Sacs en Cristal',
    description: 'Des créations scintillantes avec des cristaux Swarovski',
    slug: 'sacs-cristal',
    image: '/images/categories/crystal.jpg'
  },
  {
    name: 'Nouveautés',
    description: 'Nos dernières créations et tendances',
    slug: 'nouveautes',
    image: '/images/categories/new.jpg'
  },
  {
    name: 'Personnalisables',
    description: 'Créez votre sac unique selon vos envies',
    slug: 'personnalisables',
    image: '/images/categories/custom.jpg'
  }
];

const products = [
  {
    name: 'Sac Perles Étoilé',
    description: 'Magnifique sac en perles avec motif étoilé, parfait pour les soirées élégantes.',
    price: 89.99,
    originalPrice: 109.99,
    images: ['/images/products/star-bag-1.jpg', '/images/products/star-bag-2.jpg'],
    customizationOptions: {
      colors: ['Or', 'Argent', 'Rose Gold'],
      sizes: ['Petit', 'Moyen'],
      personalization: {
        available: true,
        maxCharacters: 15
      }
    },
    featured: true,
    inStock: true,
    stockQuantity: 10,
    tags: ['soirée', 'élégant', 'perles']
  },
  {
    name: 'Pochette Cristal Lunaire',
    description: 'Pochette scintillante ornée de cristaux Swarovski, idéale pour vos occasions spéciales.',
    price: 129.99,
    images: ['/images/products/crystal-clutch-1.jpg', '/images/products/crystal-clutch-2.jpg'],
    customizationOptions: {
      colors: ['Cristal clair', 'Cristal fumé', 'Cristal coloré'],
      sizes: ['Unique'],
      personalization: {
        available: true,
        maxCharacters: 10
      }
    },
    featured: true,
    inStock: true,
    stockQuantity: 5,
    tags: ['cristal', 'luxe', 'soirée']
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('🗑️  Nettoyage de la base de données...');
    await Category.deleteMany({});
    await Product.deleteMany({});

    console.log('📁 Création des catégories...');
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ ${createdCategories.length} catégories créées`);

    console.log('🛍️  Création des produits...');
    const productsWithCategories = products.map((product, index) => ({
      ...product,
      category: createdCategories[index % createdCategories.length]._id
    }));

    const createdProducts = await Product.insertMany(productsWithCategories);
    console.log(`✅ ${createdProducts.length} produits créés`);

    console.log('🎉 Base de données remplie avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du remplissage:', error);
    process.exit(1);
  }
};

seedDatabase();