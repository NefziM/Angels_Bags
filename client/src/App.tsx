import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import { Category, Product } from './types';
import { apiService } from './services/apiService';

// Lazy loading des pages non critiques
const Categories = lazy(() => import('./pages/Categories'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/checkout'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const Register = lazy(() => import('./pages/Register'));

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://angels-bags-1.onrender.com/api';

interface AppContextType {
  categories: Category[];
  featuredProducts: Product[];
  loading: boolean;
  error: string | null;
}

export const AppContext = React.createContext<AppContextType>({
  categories: [],
  featuredProducts: [],
  loading: true,
  error: null,
});

// Composant pour scroller en haut à chaque changement de page
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Composant de chargement réutilisable
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen bg-angel-background flex flex-col items-center justify-center">
    {/* Google tag (gtag.js) */}
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-393HMHQQSE"></script>
    <script>
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-393HMHQQSE');
      `}
    </script>
    
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-angel-border border-t-angel-gold mx-auto mb-4"></div>
      <h2 className="text-xl font-semibold text-primary mb-2">Chargement...</h2>
    </div>
  </div>
);

function App() {
  const [appData, setAppData] = useState<AppContextType>({
    categories: [],
    featuredProducts: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        console.log('🔄 Chargement des données depuis l\'API...');
        console.log('📍 URL API:', API_BASE_URL);
        
        // Charger seulement les données critiques pour la page d'accueil
        const [categories, products] = await Promise.all([
          apiService.getCategories(),
          // Limiter le nombre de produits chargés initialement
          apiService.getProducts().then(prods => 
            prods.filter((p: Product) => p.featured).slice(0, 6)
          )
        ]);

        setAppData({
          categories,
          featuredProducts: products,
          loading: false,
          error: null,
        });

        console.log('✅ Données chargées avec succès:', {
          categories: categories.length,
          featured: products.length
        });

      } catch (error) {
        console.error('❌ Erreur lors du chargement des données:', error);
        setAppData(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Erreur de connexion au serveur'
        }));
      }
    };

    fetchAppData();
  }, []);

  // Composant d'erreur
  if (appData.error) {
    return (
      <>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-393HMHQQSE"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-393HMHQQSE');
          `}
        </script>
        
        <div className="min-h-screen bg-angel-background flex flex-col items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-primary mb-4">Erreur de connexion</h2>
            <p className="text-angel-dark mb-4">{appData.error}</p>
            <div className="bg-angel-card p-4 rounded-lg border border-angel-border text-sm text-left">
              <p className="mb-2"><strong>Vérifiez que :</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Le serveur backend est démarré</li>
                <li>L'URL de l'API est correcte</li>
                <li>MongoDB Atlas est connecté</li>
              </ul>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 bg-angel-gold text-white px-6 py-2 rounded-lg hover:bg-primary transition-all"
            >
              Réessayer
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Google tag (gtag.js) - Version optimale dans l'App principal */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-393HMHQQSE"></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-393HMHQQSE');
        `}
      </script>
      
      <AppContext.Provider value={appData}>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-white flex flex-col">
              <Header />
              <main className="flex-grow">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route 
                      path="/" 
                      element={
                        appData.loading ? (
                          <LoadingSpinner />
                        ) : (
                          <Home 
                            categories={appData.categories}
                            featuredProducts={appData.featuredProducts}
                          />
                        )
                      } 
                    />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/categories/:slug" element={<Categories />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    
                    {/* Pages statiques optimisées */}
                    <Route 
                      path="/about" 
                      element={<AboutPage />}
                    />
                    <Route 
                      path="/contact" 
                      element={<ContactPage />}
                    />
                    <Route 
                      path="/login" 
                      element={<LoginPage />}
                    />
                  </Routes>
                </Suspense>
              </main>
              <Footer /> 
            </div>
          </Router>
        </CartProvider>
      </AppContext.Provider>
    </>
  );
}

// Composants de pages statiques séparés pour une meilleure organisation
const AboutPage: React.FC = () => (
  <>
    {/* Google tag (gtag.js) */}
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-393HMHQQSE"></script>
    <script>
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-393HMHQQSE');
      `}
    </script>
    
    <div className="min-h-screen bg-angel-background">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-angel py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-tan-pearl text-5xl text-angel-light mb-4">À Propos de Nous</h1>
            <div className="w-24 h-1 bg-angel-pink mx-auto mb-8"></div>
            <p className="text-xl text-angel-light max-w-2xl mx-auto">
              L'art de l'élégance personnalisée
            </p>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto py-8">
          <div className="bg-angel-card rounded-2xl shadow-sm p-8 md:p-12 border border-angel-border mb-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-tan-pearl text-3xl text-primary mb-6">Notre Histoire</h2>
                <p className="text-angel-dark text-lg leading-relaxed mb-6">
                  Fondé en 2023, Angel's Bags est né d'une passion pour l'artisanat d'exception 
                  et le désir de créer des accessoires uniques qui racontent une histoire. 
                  Chaque sac est une œuvre d'art, méticuleusement conçu à la main avec des 
                  perles et cristaux soigneusement sélectionnés.
                </p>
                <p className="text-angel-dark text-lg leading-relaxed">
                  Notre mission est d'offrir à chaque cliente un accessoire qui reflète 
                  sa personnalité, alliant tradition artisanale et design contemporain.
                </p>
              </div>
              <div className="bg-angel-light rounded-xl p-8 text-center border border-angel-border">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="font-semibold text-primary text-xl mb-4">Notre Philosophie</h3>
                <p className="text-angel-dark">
                  Croire que chaque femme mérite un accessoire aussi unique qu'elle l'est
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="font-tan-pearl text-3xl text-primary text-center mb-12">Nos Valeurs</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-8 bg-angel-pink rounded-2xl border border-angel-border transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-4">👑</div>
                <h3 className="font-semibold text-primary text-xl mb-4">Excellence Artisanale</h3>
                <p className="text-angel-dark">Chaque sac est créé avec un savoir-faire traditionnel et une attention méticuleuse aux détails</p>
              </div>
              
              <div className="text-center p-8 bg-angel-light rounded-2xl border border-angel-border transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-4">💎</div>
                <h3 className="font-semibold text-primary text-xl mb-4">Matériaux Premium</h3>
                <p className="text-angel-dark">Perles de haute qualité et cristaux Swarovski® pour une brillance exceptionnelle</p>
              </div>
              
              <div className="text-center p-8 bg-angel-card rounded-2xl border border-angel-border transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-4">🎨</div>
                <h3 className="font-semibold text-primary text-xl mb-4">Personnalisation Unique</h3>
                <p className="text-angel-dark">Créez le sac de vos rêves qui reflète votre style personnel</p>
              </div>
            </div>
          </div>

          <div className="bg-angel-light rounded-2xl p-8 border border-angel-border">
            <h2 className="font-tan-pearl text-3xl text-primary text-center mb-8">Notre Processus Créatif</h2>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              {[
                { num: 1, title: 'Conception', desc: 'Étude de votre design personnalisé' },
                { num: 2, title: 'Sélection', desc: 'Choix des matériaux premium' },
                { num: 3, title: 'Confection', desc: 'Assemblage artisanal minutieux' },
                { num: 4, title: 'Livraison', desc: 'Emballage soigné et expédition' }
              ].map(step => (
                <div key={step.num} className="p-6">
                  <div className="w-12 h-12 bg-angel-pink rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-semibold text-primary">{step.num}</span>
                  </div>
                  <h4 className="font-semibold text-primary mb-2">{step.title}</h4>
                  <p className="text-angel-dark text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

const ContactPage: React.FC = () => (
  <>
    {/* Google tag (gtag.js) */}
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-393HMHQQSE"></script>
    <script>
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-393HMHQQSE');
      `}
    </script>
    
    <div className="min-h-screen py-16 bg-angel-background">
      <div className="container mx-auto px-4">
        <h1 className="font-tan-pearl text-4xl text-center text-primary mb-8">Contact</h1>
        <div className="max-w-2xl mx-auto bg-angel-card rounded-2xl shadow-sm p-8 border border-angel-border">
          <div className="space-y-4">
            {[
              { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', text: 'contact@angels-bags.com', bg: 'bg-angel-pink' },
              { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', text: '+216 46 535 386', bg: 'bg-angel-light' },
              { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z', text: 'La Mannouba, Tunis', bg: 'bg-angel-pink' }
            ].map((item, i) => (
              <div key={i} className={`flex items-center space-x-3 p-4 ${item.bg} rounded-xl`}>
                <svg className="w-6 h-6 text-angel-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className="text-primary font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
);

const LoginPage: React.FC = () => (
  <>
    {/* Google tag (gtag.js) */}
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-393HMHQQSE"></script>
    <script>
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-393HMHQQSE');
      `}
    </script>
    
    <div className="min-h-screen py-16 bg-angel-background">
      <div className="container mx-auto px-4">
        <h1 className="font-tan-pearl text-4xl text-center text-primary mb-8">Connexion</h1>
        <div className="max-w-md mx-auto bg-angel-card rounded-2xl shadow-sm p-8 border border-angel-border">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 border border-angel-border rounded-xl focus:outline-none focus:ring-2 focus:ring-angel-gold focus:border-angel-gold transition-all bg-white"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Mot de passe</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 border border-angel-border rounded-xl focus:outline-none focus:ring-2 focus:ring-angel-gold focus:border-angel-gold transition-all bg-white"
                placeholder="Votre mot de passe"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-angel-gold text-white py-3 rounded-xl hover:bg-primary transition-all font-semibold"
            >
              Se connecter
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-angel-dark text-sm">
              Pas de compte ?{' '}
              <a href="/register" className="text-angel-gold hover:underline font-semibold">
                Créer un compte
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default App;