# 🌸 Angels_Bags - Sacs Personnalisés en Perles & Cristaux

![Angels_Bags](https://img.shields.io/badge/Angels_Bags-Luxury_Bags-pink)
![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB_Atlas-blue)

Une application web moderne de e-commerce spécialisée dans la vente de sacs personnalisés en perles et cristaux de luxe.

## ✨ Features

### 🛍️ Fonctionnalités Produits
- **Catalogue de sacs** personnalisables
- **Filtrage par catégories** (perles, cristaux, mixte)
- **Recherche avancée** avec slugs SEO-friendly
- **Gallerie haute qualité** avec zoom
- **Système de personnalisation** en temps réel

### 🎨 Expérience Utilisateur
- Interface responsive et élégante
- Navigation intuitive par catégories
- Pages produit détaillées
- Design luxueux correspondant à la marque

### ⚙️ Fonctionnalités Techniques
- **API RESTful** complète
- **Gestion des catégories** dynamiques
- **Base de données cloud** MongoDB Atlas
- **Upload d'images** et médias
- **Système d'authentification** (en développement)

## 🚀 Technologies Utilisées

### Frontend
- **React.js** - Framework principal
- **CSS3/SCSS** - Styling et design responsive
- **Axios** - Communication avec l'API
- **React Router** - Navigation SPA

### Backend
- **Node.js** - Runtime server
- **Express.js** - Framework web
- **MongoDB Atlas** - Base de données cloud
- **Mongoose** - ODM MongoDB
- **CORS** - Gestion des origines multiples

### Développement & Déploiement
- **Git & GitHub** - Version control
- **dotenv** - Variables d'environnement
- **Nodemon** - Développement local

## 📦 Installation & Démarrage

### Prérequis
- Node.js (v16 ou supérieur)
- MongoDB Atlas account
- Git
### 2. Configuration Backend
bash
cd server
npm install
**Créer le fichier .env :**

env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/angels_bags
PORT=5000
JWT_SECRET=ton_secret_jwt
### 3. Configuration Frontend
bash
cd ../client
npm install
### 4. Démarrer l'application
bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
cd client
npm start
**L'application sera accessible sur :**

Frontend : http://localhost:3000

Backend API : http://localhost:5000/
