import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../App';
import { apiService } from '../services/apiService';

const Categories = () => {
  const { slug } = useParams();
  const { categories } = useContext(AppContext);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      const fetchCategoryProducts = async () => {
        setLoading(true);
        setError(null);
        try {
          // ✅ getCategoryBySlug retourne { category, products }
          const data = await apiService.getCategoryBySlug(slug);
          
          setCurrentCategory(data.category);
          setProducts(data.products);
        } catch (err) {
          console.error('Error fetching category products:', err);
          setError(err.message || 'Impossible de charger la catégorie');
          setCurrentCategory(null);
          setProducts([]);
        } finally {
          setLoading(false);
        }
      };
      
      fetchCategoryProducts();
    }
  }, [slug]);

  // Gestion des erreurs
  if (slug && error) {
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
        
        <div className="min-h-screen bg-angel-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-angel-dark text-lg mb-4">{error}</p>
            <Link 
              to="/categories" 
              className="bg-angel-gold text-white px-6 py-2 rounded-lg hover:bg-primary transition-colors"
            >
              Retour aux catégories
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Page d'une catégorie spécifique avec ses produits
  if (slug && currentCategory) {
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
        
        <div className="min-h-screen bg-angel-background py-8">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-angel-dark mb-8">
              <Link to="/" className="hover:text-angel-gold transition-colors">Accueil</Link>
              <span>›</span>
              <Link to="/categories" className="hover:text-angel-gold transition-colors">Catégories</Link>
              <span>›</span>
              <span className="text-primary font-medium">{currentCategory.name}</span>
            </nav>

            {/* Category Header */}
            <div className="mb-8">
              <h1 className="font-tan-pearl text-4xl text-primary mb-4">
                {currentCategory.name}
              </h1>
              <p className="text-angel-dark max-w-2xl text-lg">
                {currentCategory.description}
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-angel-border border-t-angel-gold mx-auto"></div>
                <p className="mt-4 text-angel-dark">Chargement des produits...</p>
              </div>
            ) : (
              <>
                {/* Products Grid */}
                {products.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map(product => (
                      <Link 
                        key={product._id} 
                        to={`/product/${product._id}`}
                        className="bg-angel-card rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-angel-border hover:border-angel-gold group"
                      >
                        <div className="aspect-square bg-angel-pink relative overflow-hidden">
                          {product.images && product.images[0] ? (
                            <img 
                              src={product.images[0]} 
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-angel-border">
                              <div className="text-center">
                                <div className="text-4xl mb-2">👜</div>
                                <div className="text-sm font-medium text-primary">{product.name}</div>
                              </div>
                            </div>
                          )}
                          {product.featured && (
                            <div className="absolute top-3 left-3 bg-angel-gold text-angel-light px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span>Populaire</span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-2 text-primary group-hover:text-angel-gold transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-angel-dark text-sm mb-3 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-primary font-bold text-xl">
                              {product.price.toFixed(2)} TND
                            </span>
                            {product.originalPrice && (
                              <span className="text-angel-border line-through text-sm">
                                {product.originalPrice.toFixed(2)} TND
                              </span>
                            )}
                          </div>
                          {/* Stock indicator */}
                          {product.inStock ? (
                            <div className="mt-3 flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-green-600 text-xs font-medium">En stock</span>
                            </div>
                          ) : (
                            <div className="mt-3 flex items-center space-x-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <span className="text-red-600 text-xs font-medium">Épuisé</span>
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-angel-card rounded-2xl border border-angel-border p-12 max-w-md mx-auto">
                      <svg className="w-16 h-16 mx-auto mb-4 text-angel-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <h3 className="text-xl font-semibold text-primary mb-2">Aucun produit trouvé</h3>
                      <p className="text-angel-dark mb-6">Cette catégorie ne contient aucun produit pour le moment.</p>
                      <Link 
                        to="/categories" 
                        className="bg-angel-gold text-angel-light px-6 py-3 rounded-lg font-semibold hover:bg-primary transition-colors inline-block"
                      >
                        Retour aux catégories
                      </Link>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  // Page liste des catégories
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
      
      <div className="min-h-screen bg-angel-background py-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="bg-gradient-angel py-16">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="font-tan-pearl text-5xl text-angel-light mb-4">
                  Nos Univers
                </h1>
                <p className="text-angel-light text-lg opacity-90">
                  Découvrez nos différentes collections de sacs artisanaux, 
                  chaque catégorie raconte une histoire unique à travers ses créations.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-8">
            {categories.map(category => (
              <Link 
                key={category._id} 
                to={`/categories/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-angel-border hover:border-angel-gold"
              >
                <div className="aspect-video bg-angel-pink">
                  {category.image ? (
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-angel-border">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📁</div>
                        <div className="text-sm font-medium text-primary">{category.name}</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent flex items-end p-6">
                  <div className="text-angel-light">
                    <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-angel-light/90 text-sm mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span className="text-sm font-medium">Explorer la collection</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {categories.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-angel-card rounded-2xl border border-angel-border p-12 max-w-md mx-auto">
                <svg className="w-16 h-16 mx-auto mb-4 text-angel-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="text-xl font-semibold text-primary mb-2">Aucune catégorie disponible</h3>
                <p className="text-angel-dark">Les catégories seront bientôt disponibles.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;