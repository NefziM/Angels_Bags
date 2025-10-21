const mongoose = require('mongoose');
require('dotenv').config();

// Modèles
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

// Utilisez vos produits Cloudinary corrigés
const products = [
  {
    name: 'Sac à main en perles bleu',
    description: 'Élégant et moderne, ce sac rectangulaire en perles bleu est entièrement fait à la main avec un grand souci du détail.',
    price: 75,
    originalPrice: 89,
    images: [
      "https://res.cloudinary.com/ddsvoimvr/image/upload/v1760369176/angels-bags/sac_bleu_en_perle-1_hbi8v3.jpg",
      "https://res.cloudinary.com/ddsvoimvr/image/upload/v1760369173/angels-bags/sac_bleu_en_perle-2_fgxrvj.jpg"
    ],
    inStock: true,
    stockQuantity: 10,
    customizationOptions: {
      colors: ["Or", "Argent", "Rose Gold"],
      sizes: ["Petit", "Moyen"],
      personalization: {
        available: true,
        maxCharacters: 15
      }
    },
    featured: true,
    tags: ["soirée", "élégant", "perles"]
  },
  // ... Ajoutez tous vos autres produits Cloudinary ici
];

const seedDatabase = async () => {
  try {
    console.log('🔗 Connexion à MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000
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

    console.log('🎉 Base de données Atlas remplie avec succès !');
    console.log('📍 Base:', mongoose.connection.name);
    console.log('🏢 Cluster:', mongoose.connection.host);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du remplissage:', error);
    console.log('💡 Conseils de dépannage:');
    console.log('   • Vérifiez MONGODB_URI dans .env');
    console.log('   • Vérifiez votre connexion internet');
    console.log('   • Vérifiez Network Access dans Atlas');
    process.exit(1);
  }
};

seedDatabase();