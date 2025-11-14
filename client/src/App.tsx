// src/App.tsx
import React, { lazy, Suspense, useEffect, useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SignUp, SignIn , useUser } from '@clerk/clerk-react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import AdminHeader from './components/AdminHeader';
import Footer from './components/Footer';
import { apiService } from './services/apiService';
import { Category, Product } from './types';
import { AdminRoute } from './routes/AdminRoute';
import { UserRoute } from './routes/UserRoute';
import AuthRedirect from './components/AuthRedirect'; 
import AdminCategories from './pages/admin/AdminCategories';
import AdminOrders from './pages/admin/AdminOrders';
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';
import { useAuth } from "@clerk/clerk-react";
// --- AppContext.ts ---
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const AdminHome = lazy(() => import('./pages/admin/AdminHome'));

interface AppContextType {
  categories: Category[];
  featuredProducts: Product[];
  loading: boolean;
  error: string | null;
}


export const ShowJWT: React.FC = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken();
        console.log("JWT Clerk:", token); // 👈 tu verras le token dans la console
      } catch (err) {
        console.error("Erreur récupération token :", err);
      }
    };
    fetchToken();
  }, [getToken]);

  return null; // pas besoin de rendu
};




export const AppContext = createContext<AppContextType>({
  categories: [],
  featuredProducts: [],
  loading: true,
  error: null,
});

// --- Lazy pages ---
const Home = lazy(() => import('./pages/Home'));
const Categories = lazy(() => import('./pages/Categories'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/checkout'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const Orders =lazy(() => import('./pages/Orders'));
// --- ScrollToTop ---
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- LoadingSpinner ---
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
  </div>
);

// Composant pour gérer dynamiquement le header
// Dans App.tsx - Composant DynamicHeader modifié
const DynamicHeader = () => {
  const location = useLocation();
  const { user, isLoaded } = useUser(); // 👈 Ajouter useUser
  
  const isAdminPage = location.pathname.startsWith('/admin');
  
  // Ne montrer AdminHeader que si l'utilisateur est admin ET sur une page admin
  if (isAdminPage && isLoaded && user?.publicMetadata?.role === 'admin') {
    return <AdminHeader />;
  }
  
  // Sinon, montrer le Header normal
  return <Header />;
};
// Composant pour gérer dynamiquement le footer
const DynamicFooter = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  
  return isAdminPage ? null : <Footer />;
};

// --- App ---
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
        const [categories, products] = await Promise.all([
          apiService.getCategories(),
          apiService.getProducts().then((prods: Product[]) => prods.filter((p: Product) => p.featured).slice(0, 6)),
        ]);
        setAppData({ categories, featuredProducts: products, loading: false, error: null });
      } catch (err) {
        setAppData(prev => ({ ...prev, loading: false, error: (err as Error).message }));
      }
    };
    fetchAppData();
  }, []);

  return (
    <AppContext.Provider value={appData}>
      <CartProvider>
        <Router>
            <AuthRedirect />
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-white">
            {/* Header dynamique */}
            <DynamicHeader />
            
            <main className="flex-grow">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {/* Routes publiques */}
                  <Route
                    path="/"
                    element={<Home categories={appData.categories} featuredProducts={appData.featuredProducts} />}
                  />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/categories/:slug" element={<Categories />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />

                  {/* Routes d'authentification */}
                  <Route path="/register/*" element={
                    <div className="flex justify-center items-center min-h-[80vh] py-8">
                      <SignUp 
                        routing="path" 
                        path="/register" 
                        afterSignUpUrl="/auth-redirect" 
                        signInUrl="/login"
                      />
                    </div>
                  } />
                  
                  <Route path="/login/*" element={
                    <div className="flex justify-center items-center min-h-[80vh] py-8">
                      <SignIn 
                        routing="path" 
                        path="/login" 
                        afterSignUpUrl="/auth-redirect" 
                        signUpUrl="/register"
                      />
                    </div>
                  } />

                  {/* Route de redirection après auth */}
                  <Route path="/auth-redirect" element={<AuthRedirect />} />

                  {/* Route admin protégée */}
                  <Route path="/admin/*" element={
                    <AdminRoute>
                      <AdminHome />
                    </AdminRoute>
                  } />
              
<Route path="/admin/products" element={
  <AdminRoute>
    <AdminProducts />
  </AdminRoute>
} />
<Route path="/admin/categories" element={
  <AdminRoute>
    <AdminCategories />
  </AdminRoute>
} />
<Route path="/admin/orders" element={
  <AdminRoute>
    <AdminOrders />
  </AdminRoute>
} />
<Route path="/admin/users" element={
  <AdminRoute>
    <AdminUsers />
  </AdminRoute>
} />

                  {/* Routes utilisateur protégées */}
                  <Route path="/profile" element={
                    <UserRoute>
                      <div className="min-h-[60vh] flex items-center justify-center">
                        <div className="text-center">
                          <h1 className="text-3xl font-bold text-gray-900 mb-4">Mon Profil</h1>
                          <p className="text-gray-600">Page de profil utilisateur</p>
                        </div>
                      </div>
                    </UserRoute>
                  } />
<Route path="/orders" element={
  <UserRoute>
    <Orders />
  </UserRoute>
} />
                  {/* Route 404 */}
                  <Route path="*" element={
                    <div className="min-h-[60vh] flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                        <p className="text-xl text-gray-600">Page non trouvée</p>
                      </div>
                    </div>
                  } />
                </Routes>
              </Suspense>
            </main>
            
            {/* Footer dynamique */}
            <DynamicFooter />
          </div>
        </Router>
      </CartProvider>
    </AppContext.Provider>
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

export default App;