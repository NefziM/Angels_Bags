import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { Helmet } from "react-helmet";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Optimisation du chargement avec useMemo et gestion d'erreur améliorée
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Timeout pour éviter les requêtes trop longues
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout lors du chargement')), 10000)
        );

        const fetchPromise = Promise.all([
          apiService.getProducts(),
          apiService.getCategories()
        ]);

        const [productsData, categoriesData] = await Promise.race([fetchPromise, timeoutPromise]);
        
        if (isMounted) {
          setProducts(productsData || []);
          setCategories(categoriesData || []);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Erreur lors du chargement:', err);
          setError(err.message || 'Erreur de chargement des produits');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Optimisation du filtrage avec useMemo
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesCategory = selectedCategory === 'all' || 
                              product.category?._id === selectedCategory ||
                              product.category?.slug === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        return 0;
      });
  }, [products, selectedCategory, searchTerm, sortBy]);

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

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Chargement... - Nos Sacs en Perles et Cristal | Angel's Bags</title>
          <meta name="description" content="Chargement de notre collection exclusive de sacs en perles et cristal faits main. Découvrez bientôt nos créations artisanales." />
        </Helmet>
        
        <div className="min-h-screen bg-angel-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-angel-border border-t-angel-gold mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-primary mb-2">Chargement de nos créations...</h2>
            <p className="text-angel-dark">Préparation de notre collection de sacs en perles et cristal</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>Erreur de chargement - Angel's Bags</title>
          <meta name="description" content="Une erreur est survenue lors du chargement de nos produits. Veuillez réessayer." />
        </Helmet>
        
        <div className="min-h-screen bg-angel-background flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-primary mb-4">Erreur de chargement</h2>
            <p className="text-angel-dark mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-angel-gold text-white px-6 py-3 rounded-lg hover:bg-primary transition-colors font-semibold"
              title="Recharger la page des produits"
            >
              Réessayer le chargement
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-angel-background">
      <Helmet>
        {/* === BALISES SEO OPTIMISÉES === */}
        <title>Nos Sacs en Perles et Cristal - Collection Complète | Angel's Bags</title>
        
        <meta 
          name="description" 
          content="✨ Découvrez toute notre collection de sacs en perles et cristal FAITS MAIN. Sacs soirée, mariée, élégants. Filtrez par catégorie et prix. Livraison Tunisie ✅" 
        />
        
        <meta 
          name="keywords" 
          content="sacs perles, sacs cristal, collection sacs faits main, sacs soirée Tunisie, sacs mariée perles, sacs artisanaux, sacs luxe, Angel's Bags produits" 
        />
        
        <meta property="og:title" content="Collection Complète de Sacs en Perles et Cristal - Angel's Bags" />
        <meta property="og:description" content="Découvrez tous nos sacs en perles et cristal faits main. Filtrez et trouvez le sac parfait pour chaque occasion." />
        <meta property="og:url" content="https://angelsbags.netlify.app/products" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Collection Sacs Perles & Cristal - Angel's Bags" />
        <meta name="twitter:description" content="Découvrez nos sacs en perles et cristal faits main. Collection complète avec filtres." />
        
        <link rel="canonical" href="https://angelsbags.netlify.app/products" />
      </Helmet>

      {/* === HERO SECTION AVEC H1 OPTIMISÉ === */}
      <div className="bg-gradient-angel py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-tan-pearl text-5xl text-angel-light mb-6">
              Notre Collection de Sacs en Perles et Cristal
            </h1>
            <p className="text-angel-light text-lg opacity-90 leading-relaxed">
              Explorez notre <strong>collection exclusive de sacs artisanaux en perles et cristal faits main en Tunisie</strong>. 
              Chaque pièce est une <strong>œuvre d'art unique</strong>, créée avec passion et délicatesse pour 
              <strong> vos occasions spéciales</strong>.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* === BARRE DE RECHERCHE ET FILTRES === */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Barre de recherche */}
            <div className="relative flex-1 w-full sm:max-w-md">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher un sac en perles ou cristal..."
                  className="w-full pl-12 pr-4 py-3 border border-angel-border rounded-xl focus:outline-none focus:ring-2 focus:ring-angel-gold focus:border-angel-gold transition-all bg-white"
                  title="Rechercher dans notre collection de sacs"
                />
                <svg className="w-5 h-5 text-angel-gold absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Bouton Filtres */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 border border-angel-border rounded-xl hover:bg-angel-light transition-colors bg-white"
              title={`${showFilters ? 'Masquer' : 'Afficher'} les filtres de recherche`}
            >
              <svg className="w-5 h-5 text-angel-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
              </svg>
              <span className="text-angel-dark font-medium">Filtres</span>
              <span className="bg-angel-gold text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {filteredProducts.length}
              </span>
            </button>
          </div>

          {/* === PANEL DE FILTRES AVEC H2 === */}
          {showFilters && (
            <div className="mt-6 bg-white rounded-xl border border-angel-border p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-primary mb-4">Affiner votre recherche</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Catégorie */}
                <div>
                  <label className="block text-sm font-semibold text-angel-dark mb-3">
                    Type de Sac
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-angel-border rounded-lg focus:outline-none focus:ring-2 focus:ring-angel-gold focus:border-angel-gold transition-all bg-white"
                    title="Filtrer par catégorie de sacs"
                  >
                    <option value="all">Tous nos sacs</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Tri */}
                <div>
                  <label className="block text-sm font-semibold text-angel-dark mb-3">
                    Trier par
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 border border-angel-border rounded-lg focus:outline-none focus:ring-2 focus:ring-angel-gold focus:border-angel-gold transition-all bg-white"
                    title="Trier les produits"
                  >
                    <option value="featured">Sacs populaires</option>
                    <option value="name">Nom (A-Z)</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                  </select>
                </div>
              </div>

              {/* Bouton réinitialiser */}
              {(searchTerm || selectedCategory !== 'all') && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="text-angel-gold hover:text-primary font-medium text-sm flex items-center space-x-2 transition-colors"
                    title="Réinitialiser tous les filtres"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Réinitialiser les filtres</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* === RÉSULTATS AVEC H2 === */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-2">
            Résultats de votre recherche
          </h2>
          <p className="text-angel-dark">
            <span className="font-semibold text-primary">{filteredProducts.length}</span> 
            sac{filteredProducts.length > 1 ? 's' : ''} en perles et cristal trouvé{filteredProducts.length > 1 ? 's' : ''}
            {searchTerm && ` pour "${searchTerm}"`}
            {selectedCategory !== 'all' && categories.find(c => c._id === selectedCategory) && 
              ` dans "${categories.find(c => c._id === selectedCategory)?.name}"`}
          </p>
        </div>

        {/* === GRILLE DE PRODUITS OPTIMISÉE === */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product._id}
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-angel-border hover:border-angel-gold"
              >
                <Link to={`/product/${product._id}`} title={`Voir les détails de ${product.name}`}>
                  {/* Badge Produit Populaire */}
                  {product.featured && (
                    <div className="absolute top-3 left-3 z-10">
                      <div className="bg-angel-gold text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>Populaire</span>
                      </div>
                    </div>
                  )}

                  {/* Image avec ALT optimisé */}
                  <div className="aspect-square bg-angel-pink relative overflow-hidden">
                    {product.images && product.images[0] ? (
                      <OptimizedImage
                        src={product.images[0]}
                        alt={`${product.name} - Sac en perles et cristal fait main Angel's Bags - ${product.price} TND`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-angel-border">
                          <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          <p className="text-sm font-medium">{product.name}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Informations produit */}
                  <div className="p-4">
                    {/* H3 pour le nom du produit */}
                    <h3 className="font-semibold text-lg mb-2 text-primary line-clamp-1 group-hover:text-angel-gold transition-colors">
                      {product.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-angel-dark text-sm mb-3 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Prix et Stock */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-xl font-bold text-primary">
                          {product.price?.toFixed(2)} TND
                        </span>
                        {product.originalPrice && (
                          <span className="text-angel-border line-through text-sm">
                            {product.originalPrice.toFixed(2)} TND
                          </span>
                        )}
                      </div>
                      
                      {product.inStock ? (
                        <span className="text-green-600 text-xs font-semibold bg-green-50 px-2 py-1 rounded-full">
                          En stock
                        </span>
                      ) : (
                        <span className="text-red-600 text-xs font-semibold bg-red-50 px-2 py-1 rounded-full">
                          Épuisé
                        </span>
                      )}
                    </div>

                    {/* Tags avec mots-clés */}
                    {product.tags && product.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {product.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-angel-pink text-primary px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          /* === AUCUN PRODUIT TROUVÉ === */
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl border border-angel-border p-12 max-w-md mx-auto">
              <svg className="w-20 h-20 mx-auto mb-6 text-angel-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-xl font-semibold text-primary mb-2">Aucun sac trouvé</h3>
              <p className="text-angel-dark mb-4">
                Aucun sac en perles ou cristal ne correspond à vos critères de recherche.
              </p>
              <p className="text-angel-dark text-sm mb-6">
                Essayez de modifier vos filtres ou termes de recherche.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setShowFilters(false);
                }}
                className="bg-angel-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary transition-colors"
                title="Afficher tous nos sacs"
              >
                Voir toute la collection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;