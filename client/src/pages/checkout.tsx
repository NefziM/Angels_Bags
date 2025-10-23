import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Helmet } from 'react-helmet';

type DeliveryMethod = 'delivery' | 'pickup';
type PaymentMethod = 'whatsapp' | 'online' | 'cash';
// En haut de ton fichier, avant ton composant
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}


interface FormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
}
interface CartItem {
  id: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  personalization?: string;
  product: {
    id: string;
    name: string;
    price: number;
    images?: string[];
  };
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('whatsapp');
  const { cart, getCartTotal, clearCart } = useCart() as {
  cart: { items: CartItem[] };
  getCartTotal: () => number;
  clearCart: () => void;
};

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });

  const deliveryFee = deliveryMethod === 'delivery' ? 7 : 0;
  const total = getCartTotal() + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatWhatsAppMessage = () => {
    let message = `🛍️ *NOUVELLE COMMANDE - Angel's Bags*\n\n`;
    message += `👤 *Client:* ${formData.fullName}\n`;
    message += `📱 *Téléphone:* ${formData.phone}\n`;
    message += `📧 *Email:* ${formData.email}\n\n`;
    
    message += `📦 *Mode de livraison:* ${deliveryMethod === 'delivery' ? 'Livraison à domicile' : 'Retrait en magasin'}\n`;
    
    if (deliveryMethod === 'delivery') {
      message += `📍 *Adresse:* ${formData.address}\n`;
      message += `🏙️ *Ville:* ${formData.city}\n`;
      message += `📮 *Code postal:* ${formData.postalCode}\n`;
    }
    
    message += `\n💳 *Mode de paiement:* `;
    if (paymentMethod === 'whatsapp') message += 'Confirmation par WhatsApp';
    else if (paymentMethod === 'online') message += 'Paiement en ligne';
    else message += 'Paiement à la livraison';
    
    message += `\n\n🛒 *PRODUITS:*\n`;
    cart.items.forEach((item: any, index: number) => {
      message += `\n${index + 1}. *${item.product.name}*\n`;
      message += `   Quantité: ${item.quantity}\n`;
      message += `   Prix unitaire: ${item.product.price} TND\n`;
      if (item.selectedColor) message += `   Couleur: ${item.selectedColor}\n`;
      if (item.selectedSize) message += `   Taille: ${item.selectedSize}\n`;
      if (item.personalization) message += `   Personnalisation: "${item.personalization}"\n`;
      message += `   Sous-total: ${(item.product.price * item.quantity).toFixed(2)} TND\n`;
    });
    
    message += `\n💰 *TOTAL:*\n`;
    message += `Sous-total: ${getCartTotal().toFixed(2)} TND\n`;
    message += `Frais de livraison: ${deliveryFee.toFixed(2)} TND\n`;
    message += `*TOTAL À PAYER: ${total.toFixed(2)} TND*\n`;
    
    if (formData.notes) {
      message += `\n📝 *Notes:* ${formData.notes}\n`;
    }
    
    return encodeURIComponent(message);
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // Validation
  if (!formData.fullName || !formData.phone) {
    alert('Veuillez remplir les champs obligatoires');
    return;
  }
  
  if (deliveryMethod === 'delivery' && (!formData.address || !formData.city)) {
    alert('Veuillez remplir l\'adresse de livraison');
    return;
  }

  // --- EVENT GOOGLE ANALYTICS ---
  if (window.gtag) {
  window.gtag('event', 'purchase_attempt', {
    method: paymentMethod, // whatsapp, cash, online
    value: total,
    currency: 'TND',
    items: cart.items.map((item) => ({
      item_name: item.product.name,
      item_id: item.product.id,
      price: item.product.price,
      quantity: item.quantity
    }))
  });
}


  // Traitement commande
  if (paymentMethod === 'whatsapp') {
    const whatsappNumber = '21646535386';
    const message = formatWhatsAppMessage();
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    setTimeout(() => {
      clearCart();
      navigate('/order-success');
    }, 2000);
  } else if (paymentMethod === 'online') {
    alert('Le paiement en ligne sera disponible prochainement !');
  } else {
    const whatsappNumber = '21646535386';
    const message = formatWhatsAppMessage();
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    setTimeout(() => {
      clearCart();
      navigate('/order-success');
    }, 2000);
  }
};


  if (cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <>
      {/* === BALISES SEO OPTIMISÉES === */}
      <Helmet>
        <title>Finaliser Commande - Paiement Sécurisé | Angel's Bags</title>
        
        <meta 
          name="description" 
          content="🛒 Finalisez votre commande de sacs en perles et cristal faits main. Livraison Tunisie, paiement WhatsApp sécurisé. Processus simple et rapide pour vos sacs Angel's Bags." 
        />
        
        <meta 
          name="keywords" 
          content="commander sacs perles, paiement Angel's Bags, checkout sacs cristal, livraison Tunisie, WhatsApp paiement, sacs faits main commande, finaliser achat Angel's Bags" 
        />
        
        <meta property="og:title" content="Finaliser Votre Commande - Angel's Bags" />
        <meta property="og:description" content="Finalisez votre commande de sacs en perles et cristal faits main. Paiement sécurisé et livraison en Tunisie." />
        <meta property="og:url" content="https://angelsbags.netlify.app/checkout" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Finaliser Commande - Angel's Bags" />
        <meta name="twitter:description" content="Passez commande de vos sacs en perles et cristal faits main" />
        
        <link rel="canonical" href="https://angelsbags.netlify.app/checkout" />
        
        {/* Schema.org pour CheckoutPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CheckoutPage",
            "name": "Finaliser la Commande - Angel's Bags",
            "description": "Page de finalisation de commande pour les sacs en perles et cristal faits main",
            "url": "https://angelsbags.netlify.app/checkout",
            "potentialAction": {
              "@type": "OrderAction",
              "target": "https://angelsbags.netlify.app/order-success"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-angel-background py-8">
        <div className="container mx-auto px-4">
          {/* === H1 OPTIMISÉ === */}
          <h1 className="font-tan-pearl text-4xl text-primary mb-2">
            Finaliser Votre Commande
          </h1>
          <p className="text-angel-dark text-lg mb-8 max-w-3xl">
            Complétez vos informations pour recevoir vos <strong>sacs en perles et cristal faits main</strong>. 
            Processus sécurisé et confirmation rapide par WhatsApp.
          </p>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* === FORMULAIRE PRINCIPAL === */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* === INFORMATIONS PERSONNELLES AVEC H2 === */}
              <div className="bg-angel-card rounded-2xl shadow-sm p-6 border border-angel-border">
                <h2 className="text-xl font-semibold text-primary mb-4 flex items-center">
                  <svg className="w-6 h-6 text-angel-gold mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Informations Personnelles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-angel-border rounded-xl focus:outline-none focus:ring-2 focus:ring-angel-gold transition-all"
                      required
                      title="Entrez votre nom complet"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Téléphone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-angel-border rounded-xl focus:outline-none focus:ring-2 focus:ring-angel-gold transition-all"
                      required
                      title="Entrez votre numéro de téléphone"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Email (optionnel)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-angel-border rounded-xl focus:outline-none focus:ring-2 focus:ring-angel-gold transition-all"
                      title="Entrez votre adresse email pour le suivi"
                    />
                  </div>
                </div>
              </div>

              {/* === MODE DE LIVRAISON AVEC H2 === */}
              <div className="bg-angel-card rounded-2xl shadow-sm p-6 border border-angel-border">
                <h2 className="text-xl font-semibold text-primary mb-4 flex items-center">
                  <svg className="w-6 h-6 text-angel-gold mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  Mode de Livraison
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`p-4 border-2 rounded-xl transition-all text-left ${
                      deliveryMethod === 'delivery'
                        ? 'border-angel-gold bg-angel-pink shadow-md'
                        : 'border-angel-border hover:border-angel-gold hover:shadow-sm'
                    }`}
                    title="Choisir la livraison à domicile partout en Tunisie"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-angel-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <div className="text-left">
                        <div className="font-semibold text-primary">Livraison à Domicile</div>
                        <div className="text-sm text-angel-dark">7 TND - Partout en Tunisie</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`p-4 border-2 rounded-xl transition-all text-left ${
                      deliveryMethod === 'pickup'
                        ? 'border-angel-gold bg-angel-pink shadow-md'
                        : 'border-angel-border hover:border-angel-gold hover:shadow-sm'
                    }`}
                    title="Retirer votre commande en magasin à La Mannouba"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-angel-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <div className="text-left">
                        <div className="font-semibold text-primary">Retrait en Magasin</div>
                        <div className="text-sm text-angel-dark">Gratuit - La Mannouba</div>
                      </div>
                    </div>
                  </button>
                </div>

                {deliveryMethod === 'delivery' && (
                  <div className="mt-4 grid grid-cols-1 gap-4">
                    <h3 className="font-semibold text-primary text-lg mb-2">Adresse de Livraison</h3>
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        Adresse complète <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-angel-border rounded-xl focus:outline-none focus:ring-2 focus:ring-angel-gold transition-all"
                        required={deliveryMethod === 'delivery'}
                        placeholder="Rue, numéro, appartement..."
                        title="Entrez votre adresse complète de livraison"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">
                          Ville <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-angel-border rounded-xl focus:outline-none focus:ring-2 focus:ring-angel-gold transition-all"
                          required={deliveryMethod === 'delivery'}
                          placeholder="Ex: Tunis, Sousse, Sfax..."
                          title="Entrez votre ville"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">
                          Code postal (optionnel)
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-angel-border rounded-xl focus:outline-none focus:ring-2 focus:ring-angel-gold transition-all"
                          placeholder="Ex: 1000"
                          title="Entrez votre code postal"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {deliveryMethod === 'pickup' && (
                  <div className="mt-4 p-4 bg-angel-light rounded-xl border border-angel-border">
                    <h3 className="font-semibold text-primary mb-3 flex items-center">
                      <svg className="w-5 h-5 text-angel-gold mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Point de Retrait Angel's Bags
                    </h3>
                    <div className="text-sm text-angel-dark space-y-1">
                      <p><strong>Adresse:</strong> La Mannouba, Tunis, Tunisie</p>
                      <p><strong>Horaires:</strong> Lundi - Samedi, 9h00 - 18h00</p>
                      <p><strong>Contact:</strong> +216 46 535 386</p>
                    </div>
                  </div>
                )}
              </div>

              {/* === MODE DE PAIEMENT AVEC H2 === */}
              <div className="bg-angel-card rounded-2xl shadow-sm p-6 border border-angel-border">
                <h2 className="text-xl font-semibold text-primary mb-4 flex items-center">
                  <svg className="w-6 h-6 text-angel-gold mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Mode de Paiement
                </h2>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('whatsapp')}
                    className={`w-full p-4 border-2 rounded-xl transition-all text-left ${
                      paymentMethod === 'whatsapp'
                        ? 'border-angel-gold bg-angel-pink shadow-md'
                        : 'border-angel-border hover:border-angel-gold hover:shadow-sm'
                    }`}
                    title="Commander via WhatsApp - Confirmation rapide"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      <div>
                        <div className="font-semibold text-primary">Commander par WhatsApp</div>
                        <div className="text-sm text-angel-dark">Confirmation rapide - Paiement flexible</div>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`w-full p-4 border-2 rounded-xl transition-all text-left ${
                      paymentMethod === 'cash'
                        ? 'border-angel-gold bg-angel-pink shadow-md'
                        : 'border-angel-border hover:border-angel-gold hover:shadow-sm'
                    }`}
                    title="Payer en espèces à la livraison"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-angel-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <div>
                        <div className="font-semibold text-primary">Paiement à la Livraison</div>
                        <div className="text-sm text-angel-dark">Payez en espèces lors de la réception</div>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('online')}
                    className={`w-full p-4 border-2 rounded-xl transition-all text-left ${
                      paymentMethod === 'online'
                        ? 'border-angel-gold bg-angel-pink shadow-md'
                        : 'border-angel-border hover:border-angel-gold hover:shadow-sm'
                    }`}
                    title="Paiement en ligne sécurisé (Bientôt disponible)"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-angel-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <div>
                        <div className="font-semibold text-primary">Paiement en Ligne</div>
                        <div className="text-sm text-angel-dark">Carte bancaire sécurisée - Bientôt disponible</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* === NOTES AVEC H2 === */}
              <div className="bg-angel-card rounded-2xl shadow-sm p-6 border border-angel-border">
                <h2 className="text-xl font-semibold text-primary mb-4 flex items-center">
                  <svg className="w-6 h-6 text-angel-gold mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Instructions Spéciales (optionnel)
                </h2>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-angel-border rounded-xl focus:outline-none focus:ring-2 focus:ring-angel-gold transition-all resize-none"
                  placeholder="Précisions sur la livraison, demandes spéciales pour vos sacs personnalisés, instructions particulières..."
                  title="Ajoutez des instructions spéciales pour votre commande"
                />
              </div>
            </div>

            {/* === RÉSUMÉ DE COMMANDE AVEC H2 === */}
            <div className="lg:col-span-1">
              <div className="bg-angel-card rounded-2xl shadow-sm p-6 border border-angel-border sticky top-8">
                <h2 className="text-xl font-semibold text-primary mb-6 flex items-center">
                  <svg className="w-6 h-6 text-angel-gold mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Récapitulatif de Commande
                </h2>
                
                {/* Produits */}
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  <h3 className="font-semibold text-primary text-sm mb-2">Vos Articles</h3>
                  {cart.items.map((item: any) => (
                    <div key={item.id} className="flex items-center space-x-3 pb-3 border-b border-angel-border">
                      <div className="flex-shrink-0 w-16 h-16 bg-angel-pink rounded-lg overflow-hidden">
                        {item.product.images?.[0] && (
                          <img 
                            src={item.product.images[0]} 
                            alt={`${item.product.name} - Sac en perles et cristal Angel's Bags`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="font-semibold text-sm text-primary">{item.product.name}</div>
                        <div className="text-xs text-angel-dark">Quantité: {item.quantity}</div>
                        {item.selectedColor && (
                          <div className="text-xs text-angel-dark">Couleur: {item.selectedColor}</div>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-primary">
                        {(item.product.price * item.quantity).toFixed(2)} TND
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totaux */}
                <div className="space-y-3 mb-6">
                  <h3 className="font-semibold text-primary text-sm mb-2">Détails du Prix</h3>
                  <div className="flex justify-between text-angel-dark">
                    <span>Sous-total produits</span>
                    <span>{getCartTotal().toFixed(2)} TND</span>
                  </div>
                  <div className="flex justify-between text-angel-dark">
                    <span>Frais de livraison</span>
                    <span>{deliveryFee === 0 ? 'Gratuit' : `${deliveryFee.toFixed(2)} TND`}</span>
                  </div>
                  <div className="border-t border-angel-border pt-3 flex justify-between text-lg font-bold text-primary">
                    <span>Total Final</span>
                    <span className="text-angel-gold">{total.toFixed(2)} TND</span>
                  </div>
                </div>

                {/* Bouton de soumission */}
                <button
                  type="submit"
                  className="w-full bg-angel-gold text-angel-light py-4 rounded-xl hover:bg-primary transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 duration-300"
                  title={paymentMethod === 'whatsapp' ? 'Finaliser la commande via WhatsApp' : 
                         paymentMethod === 'online' ? 'Procéder au paiement en ligne' : 
                         'Confirmer la commande avec paiement à la livraison'}
                >
                  {paymentMethod === 'whatsapp' ? 'Commander via WhatsApp' : 
                   paymentMethod === 'online' ? 'Payer en Ligne' : 
                   'Confirmer la Commande'}
                </button>

                {/* Sécurité et garanties */}
                <div className="mt-6 pt-6 border-t border-angel-border">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="flex flex-col items-center space-y-1">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="text-xs text-angel-dark">Paiement Sécurisé</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <svg className="w-5 h-5 text-angel-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="text-xs text-angel-dark">Satisfaction Garantie</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;