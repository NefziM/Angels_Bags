import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { apiService } from '../services/apiService';
import { Helmet } from 'react-helmet';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customization, setCustomization] = useState({
    color: '',
    size: '',
    personalization: '',
    quantity: 1
  });
  const [addedToCart, setAddedToCart] = useState(false);

  // Optimisation du chargement avec gestion d'erreur améliorée
  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Timeout pour éviter les requêtes trop longues
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout lors du chargement du produit')), 8000)
        );

        const fetchPromise = apiService.getProductById(id);
        const productData = await Promise.race([fetchPromise, timeoutPromise]);
        
        if (isMounted) {
          setProduct(productData);
          
          // Initialiser les options de personnalisation
          if (productData.customizationOptions) {
            setCustomization(prev => ({
              ...prev,
              color: productData.customizationOptions.colors?.[0] || '',
              size: productData.customizationOptions.sizes?.[0] || ''
            }));
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error('Erreur:', err);
          setError(err.message || 'Erreur de chargement du produit');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchProduct();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Composant Image optimisé avec lazy loading et ALT
  const OptimizedImage = ({ src, alt, className, onClick }) => (
    <img 
      src={src} 
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onClick={onClick}
    />
  );

  // Calcul du prix total avec personnalisation
  const totalPrice = useMemo(() => {
    if (!product) return 0;
    
    let price = product.price;
    if (customization.personalization && product.customizationOptions?.personalization?.price) {
      price += product.customizationOptions.personalization.price;
    }
    
    return price * customization.quantity;
  }, [product, customization]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Validation des options requises
    if (product.customizationOptions?.colors?.length > 0 && !customization.color) {
      alert('Veuillez sélectionner une couleur');
      return;
    }
    
    if (product.customizationOptions?.sizes?.length > 0 && !customization.size) {
      alert('Veuillez sélectionner une taille');
      return;
    }
    
    addToCart(product, customization);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Chargement... - Détails du produit | Angel's Bags</title>
          <meta name="description" content="Chargement des détails du sac en perles et cristal. Veuillez patienter..." />
        </Helmet>
        
        <div className="min-h-screen bg-angel-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-angel-border border-t-angel-gold mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-primary mb-2">Chargement du produit...</h2>
            <p className="text-angel-dark">Préparation des détails de votre sac</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Helmet>
          <title>Produit non trouvé - Angel's Bags</title>
          <meta name="description" content="Le produit demandé n'a pas été trouvé. Découvrez notre collection de sacs en perles et cristal." />
        </Helmet>
        
        <div className="min-h-screen bg-angel-background flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-primary mb-4">Produit non trouvé</h2>
            <p className="text-angel-dark mb-6">
              {error || 'Le produit que vous recherchez n\'existe pas ou a été déplacé.'}
            </p>
            <Link 
              to="/products" 
              className="bg-angel-gold text-white px-6 py-3 rounded-lg hover:bg-primary transition-colors font-semibold inline-block"
              title="Découvrir notre collection de sacs"
            >
              Découvrir nos produits
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-angel-background">
      <Helmet>
        {/* === BALISES SEO OPTIMISÉES === */}
        <title>{product.name} - Sac en Perles et Cristal Fait Main | Angel's Bags</title>
        
        <meta 
          name="description" 
          content={`✨ ${product.name} - ${product.description} Sac fait main en perles et cristal. Prix: ${product.price} TND. Personnalisation disponible. Livraison Tunisie ✅ Découvrez ce chef-d'œuvre artisanal Angel's Bags.`} 
        />
        
        <meta 
          name="keywords" 
          content={`${product.name}, sac perles, sac cristal, ${product.category?.name}, sac fait main Tunisie, sac luxe, sac mariée, personnalisation sac, Angel's Bags ${product.name.toLowerCase()}`} 
        />
        <link rel="canonical" href={`https://angelsbags.netlify.app/product/${product._id}`} />
      </Helmet>

      {/* === BREADCRUMB OPTIMISÉ === */}
      <div className="bg-angel-light border-b border-angel-border">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm" aria-label="Fil d'Ariane">
            <Link to="/" className="text-angel-dark hover:text-angel-gold transition-colors" title="Retour à l'accueil Angel's Bags">
              Accueil
            </Link>
            <svg className="w-4 h-4 text-angel-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link to="/products" className="text-angel-dark hover:text-angel-gold transition-colors" title="Voir tous nos sacs">
              Nos Sacs
            </Link>
            <svg className="w-4 h-4 text-angel-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {product.category && (
              <>
                <Link to={`/categories/${product.category.slug}`} className="text-angel-dark hover:text-angel-gold transition-colors" title={`Voir les ${product.category.name}`}>
                  {product.category.name}
                </Link>
                <svg className="w-4 h-4 text-angel-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
            <span className="text-primary font-medium" aria-current="page">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="bg-angel-card rounded-3xl shadow-lg overflow-hidden border border-angel-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* === GALERIE D'IMAGES AVEC ALT OPTIMISÉ === */}
            <div className="p-8 lg:p-12">
              {/* Image principale */}
              <div className="aspect-square bg-angel-pink rounded-3xl mb-6 overflow-hidden shadow-sm">
                {product.images && product.images[selectedImage] ? (
                  <OptimizedImage
                    src={product.images[selectedImage]}
                    alt={`${product.name} - Sac en perles et cristal fait main Angel's Bags - Vue principale`}
                    className="w-full h-full object-cover cursor-zoom-in"
                    onClick={() => window.open(product.images[selectedImage], '_blank')}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-32 h-32 text-angel-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Miniatures avec ALT optimisé */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-angel-pink rounded-2xl overflow-hidden border-3 transition-all duration-300 ${
                        selectedImage === index
                          ? 'border-angel-gold ring-4 ring-angel-pink scale-105'
                          : 'border-angel-border hover:border-angel-gold hover:scale-105'
                      }`}
                      title={`Voir l'image ${index + 1} de ${product.name}`}
                    >
                      <OptimizedImage
                        src={image}
                        alt={`${product.name} - Vue ${index + 1} - Sac en perles et cristal Angel's Bags`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Badges avec mots-clés */}
              <div className="mt-6 flex flex-wrap gap-3">
                {product.featured && (
                  <div className="bg-gradient-angel text-angel-light px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>Sac Populaire</span>
                  </div>
                )}
                <div className="bg-angel-pink text-primary px-4 py-2 rounded-full text-sm font-semibold">
                  ✨ Fait Main Tunisie
                </div>
                <div className="bg-angel-light text-primary px-4 py-2 rounded-full text-sm font-semibold border border-angel-border">
                  💎 Perles & Cristaux
                </div>
              </div>
            </div>

            {/* === INFORMATIONS PRODUIT AVEC H1 OPTIMISÉ === */}
            <div className="p-8 lg:p-12 flex flex-col">
              <div className="flex-grow">
                {/* H1 Principal optimisé */}
                <h1 className="font-tan-pearl text-4xl lg:text-5xl text-primary mb-4 leading-tight">
                  {product.name} - Sac en Perles et Cristal Fait Main
                </h1>

                {/* Prix avec H2 */}
                <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-angel-border">
                  <span className="text-4xl font-bold text-primary">
                    {product.price.toFixed(2)} TND
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-2xl text-angel-border line-through">
                        {product.originalPrice.toFixed(2)} TND
                      </span>
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>

                {/* Stock */}
                <div className="mb-6">
                  {product.inStock ? (
                    <div className="flex items-center space-x-2 text-green-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">En stock - Prêt à être livré</span>
                      {product.stockQuantity && (
                        <span className="text-angel-dark text-sm">({product.stockQuantity} sacs disponibles)</span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-red-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">Rupture de stock temporaire</span>
                    </div>
                  )}
                </div>

                {/* Description avec H2 */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-primary mb-3">Description du Sac</h2>
                  <p className="text-angel-dark leading-relaxed text-lg">
                    {product.description}
                  </p>
                </div>

                {/* Options de personnalisation avec H2 */}
                <div className="space-y-6 mb-8">
                  <h2 className="text-xl font-semibold text-primary mb-4">Personnalisez Votre Sac</h2>
                  
                  {/* Couleur */}
                  {product.customizationOptions?.colors?.length > 0 && (
                    <div>
                      <label className="block text-sm font-bold text-primary mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-angel-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                        Choisissez votre couleur de perles
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {product.customizationOptions.colors.map(color => (
                          <button
                            key={color}
                            onClick={() => setCustomization(prev => ({ ...prev, color }))}
                            className={`px-6 py-3 rounded-2xl border-2 font-medium transition-all duration-300 ${
                              customization.color === color
                                ? 'border-angel-gold bg-angel-gold text-angel-light shadow-lg scale-105'
                                : 'border-angel-border bg-angel-light text-primary hover:border-angel-gold hover:scale-105'
                            }`}
                            title={`Choisir la couleur ${color}`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Taille */}
                  {product.customizationOptions?.sizes?.length > 0 && (
                    <div>
                      <label className="block text-sm font-bold text-primary mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-angel-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        Choisissez la taille de votre sac
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {product.customizationOptions.sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => setCustomization(prev => ({ ...prev, size }))}
                            className={`px-6 py-3 rounded-2xl border-2 font-medium transition-all duration-300 ${
                              customization.size === size
                                ? 'border-angel-gold bg-angel-gold text-angel-light shadow-lg scale-105'
                                : 'border-angel-border bg-angel-light text-primary hover:border-angel-gold hover:scale-105'
                            }`}
                            title={`Choisir la taille ${size}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Personnalisation */}
                  {product.customizationOptions?.personalization?.available && (
                    <div>
                      <label className="block text-sm font-bold text-primary mb-3 flex items-center justify-between">
                        <span className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-angel-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Personnalisez avec du texte (optionnel)
                        </span>
                        {product.customizationOptions.personalization.maxCharacters && (
                          <span className="text-xs text-angel-dark">
                            {customization.personalization.length}/{product.customizationOptions.personalization.maxCharacters}
                          </span>
                        )}
                      </label>
                      <textarea
                        value={customization.personalization}
                        onChange={(e) => setCustomization(prev => ({ 
                          ...prev, 
                          personalization: e.target.value 
                        }))}
                        placeholder="Ex: Initiales, prénom, date spéciale, message personnalisé..."
                        className="w-full px-4 py-3 border border-angel-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-angel-gold focus:border-angel-gold transition-all resize-none bg-white"
                        rows="3"
                        maxLength={product.customizationOptions.personalization.maxCharacters}
                        title="Ajoutez un texte personnalisé à votre sac"
                      />
                      {product.customizationOptions.personalization.price && (
                        <p className="text-sm text-angel-dark mt-2">
                          + {product.customizationOptions.personalization.price.toFixed(2)} TND pour la personnalisation
                        </p>
                      )}
                    </div>
                  )}

                  {/* Quantité */}
                  <div>
                    <label className="block text-sm font-bold text-primary mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-angel-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                      Quantité souhaitée
                    </label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setCustomization(prev => ({ 
                          ...prev, 
                          quantity: Math.max(1, prev.quantity - 1) 
                        }))}
                        className="w-12 h-12 rounded-xl bg-angel-pink text-primary hover:bg-angel-gold hover:text-angel-light transition-colors flex items-center justify-center font-bold text-xl"
                        title="Réduire la quantité"
                      >
                        −
                      </button>
                      <span className="text-2xl font-bold text-primary min-w-[3rem] text-center">
                        {customization.quantity}
                      </span>
                      <button
                        onClick={() => setCustomization(prev => ({ 
                          ...prev, 
                          quantity: prev.quantity + 1 
                        }))}
                        className="w-12 h-12 rounded-xl bg-angel-pink text-primary hover:bg-angel-gold hover:text-angel-light transition-colors flex items-center justify-center font-bold text-xl"
                        title="Augmenter la quantité"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Prix total */}
                  <div className="bg-angel-pink rounded-2xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-primary">Prix total:</span>
                      <span className="text-2xl font-bold text-primary">
                        {totalPrice.toFixed(2)} TND
                      </span>
                    </div>
                    {customization.quantity > 1 && (
                      <p className="text-sm text-angel-dark mt-1">
                        {customization.quantity} × {product.price.toFixed(2)} TND
                      </p>
                    )}
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="space-y-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`w-full py-4 px-6 rounded-2xl text-lg font-bold transition-all duration-300 flex items-center justify-center space-x-3 ${
                      product.inStock
                        ? addedToCart
                          ? 'bg-green-500 text-white shadow-lg'
                          : 'bg-angel-gold text-angel-light hover:bg-primary hover:shadow-xl hover:scale-105'
                        : 'bg-angel-border text-angel-dark cursor-not-allowed'
                    }`}
                    title={product.inStock ? `Ajouter ${product.name} au panier` : 'Produit en rupture de stock'}
                  >
                    {addedToCart ? (
                      <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Ajouté au panier !</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>{product.inStock ? `Ajouter au panier - ${totalPrice.toFixed(2)} TND` : 'Rupture de stock'}</span>
                      </>
                    )}
                  </button>

                  <Link
                    to="/cart"
                    className="w-full py-4 px-6 rounded-2xl text-lg font-bold transition-all duration-300 flex items-center justify-center space-x-3 border-2 border-angel-gold text-angel-gold hover:bg-angel-pink"
                    title="Voir le contenu de mon panier"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span>Voir mon panier</span>
                  </Link>
                </div>

                {/* Garanties avec H2 */}
                <div className="mt-8 pt-8 border-t border-angel-border">
                  <h2 className="text-xl font-semibold text-primary mb-4">Nos Garanties Angel's Bags</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-primary text-sm">Paiement 100% sécurisé</p>
                        <p className="text-angel-dark text-xs">SSL & cryptage bancaire</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-angel-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      <div>
                        <p className="font-semibold text-primary text-sm">Livraison soignée</p>
                        <p className="text-angel-dark text-xs">Emballage cadeau inclus</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-angel-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-primary text-sm">Fait main en Tunisie</p>
                        <p className="text-angel-dark text-xs">Artisanat local de qualité</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-angel-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-primary text-sm">Matériaux premium</p>
                        <p className="text-angel-dark text-xs">Perles & cristaux qualité luxe</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* === SECTION DÉTAILS SUPPLÉMENTAIRES AVEC H2 === */}
          {(product.details || product.tags) && (
            <div className="border-t border-angel-border bg-angel-pink/30 p-8 lg:p-12">
              <h2 className="text-2xl font-bold text-primary mb-8 text-center">Informations Complémentaires</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Détails techniques */}
                {product.details && (
                  <div className="bg-angel-card rounded-3xl p-6 border border-angel-border">
                    <h3 className="font-bold text-xl text-primary mb-4 flex items-center">
                      <svg className="w-6 h-6 mr-2 text-angel-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Détails Techniques du Sac
                    </h3>
                    <div className="space-y-3 text-angel-dark">
                      {product.details.material && (
                        <div className="flex items-start">
                          <span className="font-semibold w-32 flex-shrink-0">Matériaux:</span>
                          <span>{product.details.material}</span>
                        </div>
                      )}
                      {product.details.dimensions && (
                        <div className="flex items-start">
                          <span className="font-semibold w-32 flex-shrink-0">Dimensions:</span>
                          <span>{product.details.dimensions}</span>
                        </div>
                      )}
                      {product.details.weight && (
                        <div className="flex items-start">
                          <span className="font-semibold w-32 flex-shrink-0">Poids:</span>
                          <span>{product.details.weight}</span>
                        </div>
                      )}
                      {product.details.care && (
                        <div className="flex items-start">
                          <span className="font-semibold w-32 flex-shrink-0">Entretien:</span>
                          <span>{product.details.care}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tags et catégorie */}
                <div className="bg-angel-card rounded-3xl p-6 border border-angel-border">
                  <h3 className="font-bold text-xl text-primary mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-angel-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Caractéristiques du Produit
                  </h3>
                  
                  {product.category && (
                    <div className="mb-4">
                      <p className="text-sm text-angel-dark mb-2">Catégorie principale</p>
                      <Link
                        to={`/categories/${product.category.slug}`}
                        className="inline-block bg-angel-gold text-angel-light px-4 py-2 rounded-full font-semibold text-sm hover:bg-primary transition-all"
                        title={`Voir tous les ${product.category.name}`}
                      >
                        {product.category.name}
                      </Link>
                    </div>
                  )}

                  {product.tags && product.tags.length > 0 && (
                    <div>
                      <p className="text-sm text-angel-dark mb-2">Mots-clés associés</p>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-angel-pink text-primary px-3 py-1 rounded-full text-sm font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;