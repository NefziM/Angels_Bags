import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Helmet } from 'react-helmet';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

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

  if (cart.items.length === 0) {
    return (
      <>
        <Helmet>
          <title>{`Panier Vide - Découvrez Nos Sacs en Perles et Cristal | Angel's Bags`}</title>
          <meta 
            name="description" 
            content="🛒 Votre panier est vide. Découvrez notre collection exclusive de sacs en perles et cristal faits main. Personnalisation gratuite. Livraison Tunisie." 
          />
          <meta 
            name="keywords" 
            content="panier vide Angel's Bags, sacs perles cristal, découvrir collections, sacs faits main Tunisie, personnalisation sacs" 
          />
        </Helmet>
        
        <div className="min-h-screen bg-angel-background py-8">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-angel-light rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-angel-border">
                <svg className="w-12 h-12 text-angel-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h1 className="text-2xl font-semibold text-primary mb-4">Votre Panier est Vide</h1>
              <p className="text-angel-dark mb-8 max-w-md mx-auto leading-relaxed">
                Explorez notre collection de <strong>sacs en perles et cristal faits main</strong> et 
                découvrez des créations uniques personnalisables selon vos envies.
              </p>
              <Link 
                to="/categories" 
                className="bg-angel-gold text-angel-light px-8 py-3 rounded-xl hover:bg-primary transition-all font-semibold inline-block"
                title="Découvrir nos collections de sacs"
              >
                Découvrir Nos Collections
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        {/* === BALISES SEO OPTIMISÉES === */}
        <title>{`Mon Panier - ${cart.items.length} Article(s) | Angel's Bags`}</title>
        
        <meta 
          name="description" 
          content={`🛒 Votre panier contient ${cart.items.reduce((total, item) => total + item.quantity, 0)} article(s) - Total: ${getCartTotal().toFixed(2)} TND. Finalisez votre commande de sacs en perles et cristal faits main. Paiement sécurisé.`} 
        />
        
        <meta 
          name="keywords" 
          content="panier Angel's Bags, commander sacs perles, sacs cristal panier, finaliser commande, paiement sécurisé, livraison Tunisie" 
        />
        
        <meta property="og:title" content={`Mon Panier - ${cart.items.length} Article(s) - Angel's Bags`} />
        <meta property="og:description" content={`Panier avec ${cart.items.reduce((total, item) => total + item.quantity, 0)} article(s) - Total: ${getCartTotal().toFixed(2)} TND`} />
        <meta property="og:url" content="https://angelsbags.netlify.app/cart" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Mon Panier - Angel's Bags" />
        <meta name="twitter:description" content="Finalisez votre commande de sacs en perles et cristal" />
        
        <link rel="canonical" href="https://angelsbags.netlify.app/cart" />
        
        {/* Schema.org pour Order */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Order",
            "merchant": {
              "@type": "Organization",
              "name": "Angel's Bags",
              "url": "https://angelsbags.netlify.app"
            },
            "acceptedOffer": cart.items.map(item => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": item.product.name,
                "description": item.product.description
              },
              "price": item.product.price,
              "priceCurrency": "TND",
              "eligibleQuantity": {
                "@type": "QuantitativeValue",
                "value": item.quantity
              }
            })),
            "price": getCartTotal(),
            "priceCurrency": "TND"
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-angel-background py-8">
        <div className="container mx-auto px-4">
          {/* === H1 OPTIMISÉ === */}
          <h1 className="font-tan-pearl text-4xl text-primary mb-2">
            Mon Panier
          </h1>
          <p className="text-angel-dark text-lg mb-8">
            Vérifiez vos articles avant de finaliser votre commande de <strong>sacs en perles et cristal faits main</strong>
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* === ARTICLES DU PANIER === */}
            <div className="lg:col-span-2">
              <div className="bg-angel-card rounded-2xl shadow-sm overflow-hidden border border-angel-border">
                {/* En-tête du panier */}
                <div className="p-6 border-b border-angel-border flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-primary">
                    {cart.items.reduce((total, item) => total + item.quantity, 0)} Article(s) dans votre Panier
                  </h2>
                  <button 
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 text-sm font-semibold transition-colors flex items-center space-x-1"
                    title="Vider tout le panier"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Vider le panier</span>
                  </button>
                </div>

                {/* Liste des articles */}
                <div className="divide-y divide-angel-border">
                  {cart.items.map(item => (
                    <div key={item.id} className="p-6 flex items-center space-x-4">
                      {/* Image du produit */}
                      <div className="flex-shrink-0 w-20 h-20 bg-angel-pink rounded-lg overflow-hidden border border-angel-border">
                        {item.product.images && item.product.images[0] ? (
                          <OptimizedImage
                            src={item.product.images[0]} 
                            alt={`${item.product.name} - Sac en perles et cristal Angel's Bags`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-angel-border">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Détails du produit */}
                      <div className="flex-grow">
                        <h3 className="font-semibold text-primary mb-1">
                          {item.product.name}
                        </h3>
                        
                        {/* Détails de personnalisation */}
                        <div className="text-sm text-angel-dark space-y-1">
                          {item.selectedColor && (
                            <div className="flex items-center space-x-2">
                              <span className="text-angel-dark">Couleur:</span>
                              <span className="font-medium text-primary">{item.selectedColor}</span>
                            </div>
                          )}
                          {item.selectedSize && (
                            <div className="flex items-center space-x-2">
                              <span className="text-angel-dark">Taille:</span>
                              <span className="font-medium text-primary">{item.selectedSize}</span>
                            </div>
                          )}
                          {item.personalization && (
                            <div className="flex items-center space-x-2">
                              <span className="text-angel-dark">Personnalisation:</span>
                              <span className="font-medium text-primary italic">"{item.personalization}"</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Contrôles de quantité */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border-2 border-angel-border flex items-center justify-center hover:border-angel-gold hover:bg-angel-pink transition-all"
                          title="Réduire la quantité"
                        >
                          <span className="text-primary font-semibold">−</span>
                        </button>
                        <span className="w-8 text-center font-semibold text-primary">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border-2 border-angel-border flex items-center justify-center hover:border-angel-gold hover:bg-angel-pink transition-all"
                          title="Augmenter la quantité"
                        >
                          <span className="text-primary font-semibold">+</span>
                        </button>
                      </div>

                      {/* Prix */}
                      <div className="text-right min-w-[100px]">
                        <div className="font-semibold text-lg text-angel-gold">
                          {(item.product.price * item.quantity).toFixed(2)} TND
                        </div>
                        <div className="text-sm text-angel-dark">
                          {item.product.price.toFixed(2)} TND / pièce
                        </div>
                      </div>

                      {/* Bouton Supprimer */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-all"
                        title={`Supprimer ${item.product.name} du panier`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* === RÉSUMÉ DE COMMANDE === */}
            <div className="lg:col-span-1">
              <div className="bg-angel-card rounded-2xl shadow-sm p-6 border border-angel-border sticky top-8">
                <h2 className="text-xl font-semibold text-primary mb-6">Résumé de la Commande</h2>
                
                {/* Détails du prix */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-angel-dark">
                    <span>Sous-total ({cart.items.reduce((total, item) => total + item.quantity, 0)} articles)</span>
                    <span className="font-semibold">{getCartTotal().toFixed(2)} TND</span>
                  </div>
                  <div className="flex justify-between text-angel-dark">
                    <span>Frais de livraison</span>
                    <span className="text-green-600 font-semibold">Calculés à l'étape suivante</span>
                  </div>
                  <div className="border-t border-angel-border pt-4 flex justify-between text-lg font-bold">
                    <span className="text-primary">Total Estimé</span>
                    <span className="text-angel-gold">{getCartTotal().toFixed(2)} TND</span>
                  </div>
                </div>

                {/* Bouton de paiement */}
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-angel-gold text-angel-light py-4 rounded-xl hover:bg-primary transition-all mb-4 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 duration-300"
                  title="Finaliser ma commande de sacs Angel's Bags"
                >
                  Finaliser ma Commande
                </button>
                
                {/* Lien continuer les achats */}
                <Link 
                  to="/categories" 
                  className="w-full border-2 border-angel-gold text-angel-gold py-3 rounded-xl hover:bg-angel-gold hover:text-angel-light transition-all text-center block font-semibold"
                  title="Continuer à découvrir nos collections"
                >
                  Continuer mes Achats
                </Link>

                {/* Badges de sécurité */}
                <div className="mt-6 pt-6 border-t border-angel-border">
                  <h3 className="text-sm font-semibold text-primary mb-4 text-center">Achat 100% Sécurisé</h3>
                  <div className="grid grid-cols-3 gap-4 text-angel-dark">
                    <div className="text-center">
                      <svg className="w-8 h-8 mx-auto mb-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <div className="text-xs font-medium">Paiement Sécurisé</div>
                    </div>
                    <div className="text-center">
                      <svg className="w-8 h-8 mx-auto mb-2 text-angel-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      <div className="text-xs font-medium">Livraison Rapide</div>
                    </div>
                    <div className="text-center">
                      <svg className="w-8 h-8 mx-auto mb-2 text-angel-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div className="text-xs font-medium">Garantie Qualité</div>
                    </div>
                  </div>
                </div>

                {/* Contact WhatsApp */}
                <div className="mt-6 pt-6 border-t border-angel-border">
                  <p className="text-center text-sm text-angel-dark mb-3">
                    Questions sur votre commande ?
                  </p>
                  <a
                    href="https://wa.me/21646535386"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 text-green-600 hover:text-green-700 transition-colors font-semibold group"
                    title="Contacter Angel's Bags via WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span className="group-hover:underline">Contact WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;