import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const OrderSuccess: React.FC = () => {
  return (
    <>
      {/* === BALISES SEO OPTIMISÉES === */}
      <Helmet>
        <title>{`Commande Confirmée - Merci pour votre achat | Angel's Bags`}</title>
        
        <meta 
          name="description" 
          content="✅ Votre commande Angel's Bags a été envoyée avec succès ! Notre équipe vous contacte via WhatsApp. Confirmation sous 24h. Livraison sacs perles et cristal faits main en Tunisie." 
        />
        
        <meta 
          name="keywords" 
          content="commande confirmée Angel's Bags, confirmation commande sacs perles, suivi commande WhatsApp, livraison sacs Tunisie, contact Angel's Bags, confirmation achat sacs cristal" 
        />
        
        <meta property="og:title" content="Commande Confirmée - Angel's Bags" />
        <meta property="og:description" content="Votre commande de sacs en perles et cristal a été envoyée avec succès. Notre équipe vous contacte rapidement." />
        <meta property="og:url" content="https://angelsbags.netlify.app/order-success" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Commande Confirmée - Angel's Bags" />
        <meta name="twitter:description" content="Merci pour votre commande de sacs en perles et cristal faits main" />
        
        <link rel="canonical" href="https://angelsbags.netlify.app/order-success" />
        
        {/* Schema.org pour Order */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Order",
            "orderStatus": "https://schema.org/OrderProcessing",
            "merchant": {
              "@type": "Organization",
              "name": "Angel's Bags",
              "url": "https://angelsbags.netlify.app"
            },
            "confirmationNumber": `ANGELS-${Date.now()}`,
            "orderDate": new Date().toISOString(),
            "paymentMethod": "WhatsApp Confirmation",
            "acceptedOffer": {
              "@type": "Offer",
              "description": "Sacs en perles et cristal faits main personnalisés"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-angel-background flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full">
          {/* === CARTE PRINCIPALE AVEC H1 OPTIMISÉ === */}
          <div className="bg-angel-card rounded-2xl shadow-xl p-8 md:p-12 border border-angel-border text-center">
            
            {/* Icône de succès */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* H1 Principal optimisé */}
              <h1 className="font-tan-pearl text-4xl text-primary mb-4">
                Commande Envoyée avec Succès !
              </h1>
              
              {/* Sous-titre riche en mots-clés */}
              <p className="text-angel-dark text-lg leading-relaxed max-w-xl mx-auto">
                Félicitations ! Votre commande de <strong>sacs en perles et cristal faits main</strong> a été transmise à notre équipe. 
                Merci pour votre confiance dans <strong>Angel's Bags</strong> ✨
              </p>
            </div>

            {/* === SECTION WHATSAPP AVEC H2 === */}
            <div className="bg-green-50 rounded-xl p-6 mb-8 border-2 border-green-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg className="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div className="flex-grow text-left">
                  {/* H2 pour la section WhatsApp */}
                  <h2 className="font-semibold text-primary text-lg mb-2">
                    Confirmation WhatsApp en Cours
                  </h2>
                  <p className="text-angel-dark text-sm mb-3 leading-relaxed">
                    Votre commande de <strong>sacs Angel's Bags</strong> a été transmise via WhatsApp. 
                    Notre équipe d'artisans vous contactera dans les <strong>24 heures</strong> pour :
                  </p>
                  <ul className="text-sm text-angel-dark mb-3 space-y-1">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Confirmer les détails de votre commande
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Discuter des options de personnalisation
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Organiser la livraison en Tunisie
                    </li>
                  </ul>
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <p className="text-xs text-angel-dark">
                      <strong>Contact direct:</strong> +216 46 535 386
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* === PROCHAINES ÉTAPES AVEC H2 === */}
            <div className="bg-angel-light rounded-xl p-6 mb-8 border border-angel-border text-left">
              {/* H2 pour les étapes */}
              <h2 className="font-semibold text-primary text-lg mb-4 text-center">
                Déroulement de Votre Commande
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-angel-gold rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <div className="font-semibold text-primary">Confirmation WhatsApp</div>
                    <div className="text-sm text-angel-dark">
                      Notre équipe vous contacte sous 24h pour valider votre commande de sacs en perles et cristal
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-angel-gold rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <div className="font-semibold text-primary">Confection Artisanale</div>
                    <div className="text-sm text-angel-dark">
                      Nos artisans préparent votre sac fait main avec des perles et cristaux de qualité (2-3 jours)
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-angel-gold rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <div className="font-semibold text-primary">Livraison Soignée</div>
                    <div className="text-sm text-angel-dark">
                      Livraison express partout en Tunisie ou retrait en atelier à La Mannouba
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* === BOUTONS D'ACTION AVEC TITLES OPTIMISÉS === */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-angel-gold text-angel-light px-8 py-3 rounded-xl hover:bg-primary transition-all font-semibold text-center"
                title="Retourner à la page d'accueil Angel's Bags"
              >
                Retour à l'Accueil
              </Link>
              <Link
                to="/products"
                className="border-2 border-angel-gold text-angel-gold px-8 py-3 rounded-xl hover:bg-angel-gold hover:text-angel-light transition-all font-semibold text-center"
                title="Découvrir plus de sacs en perles et cristal"
              >
                Voir Nos Autres Créations
              </Link>
            </div>

            {/* === SECTION CONTACT AVEC H3 === */}
            <div className="mt-8 pt-8 border-t border-angel-border">
              {/* H3 pour la section contact */}
              <h3 className="font-semibold text-primary text-lg mb-4 text-center">
                Besoin d'Aide ?
              </h3>
              <p className="text-angel-dark text-sm mb-3 text-center max-w-md mx-auto">
                Notre service client est disponible pour répondre à toutes vos questions sur votre commande de sacs Angel's Bags.
              </p>
              <div className="flex items-center justify-center space-x-6">
                <a
                  href="https://wa.me/21646535386"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors group"
                  title="Contacter Angel's Bags via WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="font-semibold group-hover:underline">WhatsApp Direct</span>
                </a>
                
                <a
                  href="tel:+21646535386"
                  className="flex items-center space-x-2 text-angel-gold hover:text-primary transition-colors group"
                  title="Appeler Angel's Bags directement"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-semibold group-hover:underline">Appel Direct</span>
                </a>
              </div>
            </div>

            {/* === INFORMATIONS SUPPLÉMENTAIRES === */}
            <div className="mt-6 pt-6 border-t border-angel-border">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-primary text-sm mb-2 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Informations Importantes
                </h4>
                <p className="text-xs text-angel-dark text-center">
                  Votre numéro de commande vous sera communiqué lors de la confirmation WhatsApp. 
                  Conservez-le pour tout suivi ultérieur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;