import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../App';
import { apiService } from '../services/apiService';
import { Helmet } from 'react-helmet';

const Categories = () => {
  const { slug } = useParams();
  const { categories } = useContext(AppContext);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Composant Image optimisé avec lazy loading et ALT
  const OptimizedImage = ({ src, alt, className }) => (
    <img 
      src={src} 
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );

  useEffect(() => {
    if (slug) {
      const fetchCategoryProducts = async () => {
        setLoading(true);
        setError(null);
        try {
          // Timeout pour éviter les requêtes trop longues
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout lors du chargement de la catégorie')), 8000)
          );

          const fetchPromise = apiService.getCategoryBySlug(slug);
          const data = await Promise.race([fetchPromise, timeoutPromise]);
          
          setCurrentCategory(data.category);
          setProducts(data.products);
        } catch (err) {
          console.error('Error fetching category products:', err);
          setError(err.message || 'Impossible de charger les produits de cette catégorie');
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
        <Helmet>
          <title>Catégorie non trouvée - Angel's Bags</title>
          <meta name="description" content="La catégorie demandée n'a pas été trouvée. Découvrez notre collection complète de sacs en perles et cristal faits main." />
        </Helmet>
        
        <div className="min-h-screen bg-angel-background flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-primary mb-4">Catégorie non trouvée</h2>
            <p className="text-angel-dark mb-6">{error}</p>
            <Link 
              to="/categories" 
              className="bg-angel-gold text-white px-6 py-3 rounded-lg hover:bg-primary transition-colors font-semibold"
              title="Retourner à toutes les catégories"
            >
              Voir toutes les catégories
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
        <Helmet>
          {/* === BALISES SEO OPTIMISÉES POUR CATÉGORIE SPÉCIFIQUE === */}
          <title>{currentCategory.name} - Collection de Sacs en Perles et Cristal | Angel's Bags</title>
          
          <meta 
            name="description" 
            content={`Découvrez notre collection ${currentCategory.name} - ${currentCategory.description} Sacs en perles et cristal faits main. Qualité artisanale tunisienne. Livraison Tunisie.`} 
          />
          
          <meta 
            name="keywords" 
            content={`${currentCategory.name}, sacs ${currentCategory.name.toLowerCase()}, collection ${currentCategory.name.toLowerCase()}, sacs perles ${currentCategory.name.toLowerCase()}, Angel's Bags ${currentCategory.name.toLowerCase()}`} 
          />
          
          <meta property="og:title" content={`${currentCategory.name} - Angel's Bags`} />
          <meta property="og:description" content={currentCategory.description} />
          <meta property="og:url" content={`https://angelsbags.netlify.app/categories/${currentCategory.slug}`} />
          <meta property="og:type" content="website" />
          
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${currentCategory.name} - Angel's Bags`} />
          <meta name="twitter:description" content={currentCategory.description} />
          
          <link rel="canonical" href={`https://angelsbags.netlify.app/categories/${currentCategory.slug}`} />
          
          {/* Schema.org pour CollectionPage */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": `${currentCategory.name} - Angel's Bags`,
              "description": currentCategory.description,
              "url": `https://angelsbags.netlify.app/categories/${currentCategory.slug}`,
              "mainEntity": {
                "@type": "ItemList",
                "numberOfItems": products.length,
                "itemListElement": products.map((product, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "item": {
                    "@type": "Product",
                    "name": product.name,
                    "description": product.description,
                    "url": `https://angelsbags.netlify.app/product/${product._id}`,
                    "image": product.images?.[0] || ""
                  }
                }))
              }
            })}
          </script>
        </Helmet>
        
        <div className="min-h-screen bg-angel-background py-8">
          <div className="container mx-auto px-4">
            {/* === BREADCRUMB OPTIMISÉ === */}
            <nav className="flex items-center space-x-2 text-sm text-angel-dark mb-8" aria-label="Fil d'Ariane">
              <Link to="/" className="hover:text-angel-gold transition-colors" title="Retour à l'accueil Angel's Bags">
                Accueil
              </Link>
              <span aria-hidden="true">›</span>
              <Link to="/categories" className="hover:text-angel-gold transition-colors" title="Voir toutes les catégories">
                Catégories
              </Link>
              <span aria-hidden="true">›</span>
              <span className="text-primary font-medium" aria-current="page">{currentCategory.name}</span>
            </nav>

            {/* === HEADER DE CATÉGORIE AVEC H1 OPTIMISÉ === */}
            <div className="mb-8">
              <h1 className="font-tan-pearl text-4xl text-primary mb-4">
                Collection {currentCategory.name} - Sacs en Perles et Cristal
              </h1>
              <p className="text-angel-dark max-w-2xl text-lg leading-relaxed">
                {currentCategory.description} Découvrez nos <strong>sacs faits main en perles et cristal</strong> de la collection {currentCategory.name}, 
                créés avec passion par nos artisans tunisiens pour vos <strong>occasions spéciales</strong>.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-angel-border border-t-angel-gold mx-auto"></div>
                <h2 className="mt-4 text-xl font-semibold text-primary">Chargement des produits...</h2>
                <p className="text-angel-dark">Préparation de la collection {currentCategory.name}</p>
              </div>
            ) : (
              <>
                {/* === GRILLE DE PRODUITS OPTIMISÉE === */}
                {products.length > 0 ? (
                  <>
                    {/* H2 pour la section produits */}
                    <h2 className="text-2xl font-semibold text-primary mb-6">
                      Nos {products.length} Sacs {currentCategory.name}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {products.map(product => (
                        <Link 
                          key={product._id} 
                          to={`/product/${product._id}`}
                          className="bg-angel-card rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-angel-border hover:border-angel-gold group"
                          title={`Voir les détails de ${product.name}`}
                        >
                          <div className="aspect-square bg-angel-pink relative overflow-hidden">
                            {product.images && product.images[0] ? (
                              <OptimizedImage
                                src={product.images[0]} 
                                alt={`${product.name} - Sac ${currentCategory.name} en perles et cristal fait main Angel's Bags`}
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
                            {/* H3 pour le nom du produit */}
                            <h3 className="font-semibold text-lg mb-2 text-primary group-hover:text-angel-gold transition-colors line-clamp-1">
                              {product.name}
                            </h3>
                            <p className="text-angel-dark text-sm mb-3 line-clamp-2 leading-relaxed">
                              {product.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-primary font-bold text-xl">
                                {product.price?.toFixed(2)} TND
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
                                <span className="text-green-600 text-xs font-medium">En stock - Prêt à expédier</span>
                              </div>
                            ) : (
                              <div className="mt-3 flex items-center space-x-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span className="text-red-600 text-xs font-medium">Épuisé temporairement</span>
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-angel-card rounded-2xl border border-angel-border p-12 max-w-md mx-auto">
                      <svg className="w-16 h-16 mx-auto mb-4 text-angel-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <h3 className="text-xl font-semibold text-primary mb-2">Collection en Préparation</h3>
                      <p className="text-angel-dark mb-4">
                        La collection <strong>{currentCategory.name}</strong> est actuellement en cours de préparation.
                      </p>
                      <p className="text-angel-dark text-sm mb-6">
                        De magnifiques sacs en perles et cristal arrivent bientôt dans cette catégorie.
                      </p>
                      <Link 
                        to="/categories" 
                        className="bg-angel-gold text-angel-light px-6 py-3 rounded-lg font-semibold hover:bg-primary transition-colors inline-block"
                        title="Découvrir nos autres collections"
                      >
                        Explorer nos autres collections
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
      <Helmet>
        {/* === BALISES SEO OPTIMISÉES POUR PAGE CATÉGORIES === */}
        <title>Nos Collections de Sacs - Catégories Complètes | Angel's Bags</title>
        
        <meta 
          name="description" 
          content="✨ Découvrez toutes nos collections de sacs en perles et cristal faits main. Sacs soirée, mariée, élégants, personnalisés. Artisanat tunisien de qualité. Livraison partout en Tunisie." 
        />
        
        <meta 
          name="keywords" 
          content="collections sacs perles, catégories sacs cristal, sacs soirée Tunisie, sacs mariée, sacs élégants, collections Angel's Bags, sacs faits main par catégorie" 
        />
        
        <meta property="og:title" content="Nos Collections de Sacs - Angel's Bags" />
        <meta property="og:description" content="Découvrez nos différentes collections de sacs en perles et cristal faits main pour toutes les occasions." />
        <meta property="og:url" content="https://angelsbags.netlify.app/categories" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Collections Sacs - Angel's Bags" />
        <meta name="twitter:description" content="Explorez nos collections de sacs en perles et cristal faits main" />
        
        <link rel="canonical" href="https://angelsbags.netlify.app/categories" />
        
        {/* Schema.org pour ItemList des catégories */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Collections de Sacs Angel's Bags",
            "description": "Collections de sacs en perles et cristal faits main",
            "url": "https://angelsbags.netlify.app/categories",
            "numberOfItems": categories.length,
            "itemListElement": categories.map((category, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Collection",
                "name": category.name,
                "description": category.description,
                "url": `https://angelsbags.netlify.app/categories/${category.slug}`
              }
            }))
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-angel-background py-8">
        <div className="container mx-auto px-4">
          {/* === HERO SECTION AVEC H1 OPTIMISÉ === */}
          <div className="bg-gradient-angel py-16">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="font-tan-pearl text-5xl text-angel-light mb-6">
                  Nos Collections de Sacs en Perles et Cristal
                </h1>
                <p className="text-angel-light text-lg opacity-90 leading-relaxed">
                  Explorez nos <strong>collections exclusives de sacs artisanaux en perles et cristal faits main en Tunisie</strong>. 
                  Chaque collection raconte une histoire unique à travers des <strong>créations élégantes et personnalisables</strong> 
                  pour toutes vos occasions spéciales.
                </p>
              </div>
            </div>
          </div>
          
          {/* === GRILLE DES CATÉGORIES AVEC H2 === */}
          <div className="px-4 py-8">
            <h2 className="text-3xl font-semibold text-primary mb-8 text-center">
              Découvrez Nos Univers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map(category => (
                <Link 
                  key={category._id} 
                  to={`/categories/${category.slug}`}
                  className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-angel-border hover:border-angel-gold"
                  title={`Explorer la collection ${category.name}`}
                >
                  <div className="aspect-video bg-angel-pink">
                    {category.image ? (
                      <OptimizedImage
                        src={category.image} 
                        alt={`Collection ${category.name} - Sacs en perles et cristal Angel's Bags`}
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
                      {/* H3 pour le nom de la catégorie */}
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
          </div>

          {/* === ÉTAT VIDE OPTIMISÉ === */}
          {categories.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-angel-card rounded-2xl border border-angel-border p-12 max-w-md mx-auto">
                <svg className="w-16 h-16 mx-auto mb-4 text-angel-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="text-xl font-semibold text-primary mb-2">Collections en Préparation</h3>
                <p className="text-angel-dark mb-4">
                  Nos magnifiques collections de sacs en perles et cristal sont en cours de création.
                </p>
                <p className="text-angel-dark text-sm">
                  Revenez bientôt pour découvrir nos univers exclusifs.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;