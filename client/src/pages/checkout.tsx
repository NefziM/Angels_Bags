import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

type DeliveryMethod = 'delivery' | 'pickup';
type PaymentMethod = 'whatsapp' | 'online' | 'cash';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
}

const Checkout: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('whatsapp');
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

    if (paymentMethod === 'whatsapp') {
      // Redirection vers WhatsApp
      const whatsappNumber = '21646535386'; // Votre numéro
      const message = formatWhatsAppMessage();
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
      
      // Vider le panier après un délai
      setTimeout(() => {
        clearCart();
        navigate('/order-success');
      }, 2000);
    } else if (paymentMethod === 'online') {
      // Intégration paiement en ligne (à implémenter selon votre gateway)
      alert('Le paiement en ligne sera disponible prochainement !');
      // TODO: Intégrer avec Stripe, PayPal, ou autre
    } else {
      // Paiement à la livraison
      const message = formatWhatsAppMessage();
      const whatsappNumber = '21646535386';
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
          <h1 className="font-tan-pearl text-4xl text-primary mb-8">Finaliser la commande</h1>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire principal */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Informations personnelles */}
              <div className="bg-angel-card rounded-2xl shadow-sm p-6 border border-angel-border">
                <h2 className="text-xl font-semibold text-primary mb-4">Informations personnelles</h2>
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
                      className="w-full px-4 py-3 border border-angel-border rounded-xl focus:outline-none focus:ring-2 focus:ring-angel-gold"
                      required
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
                      className="w-full px-4 py-3 border border-angel-border rounded-xl focus:outline-none focus:ring-2 focus:ring-angel-gold"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-angel-border rounded-xl focus:outline-none focus:ring-2 focus:ring-angel-gold"
                    />
                  </div>
                </div>
              </div>

              {/* Mode de livraison */}
              <div className="bg-angel-card rounded-2xl shadow-sm p-6 border border-angel-border">
                <h2 className="text-xl font-semibold text-primary mb-4">Mode de livraison</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      deliveryMethod === 'delivery'
                        ? 'border-angel-gold bg-angel-pink'
                        : 'border-angel-border hover:border-angel-gold'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-angel-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <div className="text-left">
                        <div className="font-semibold text-primary">Livraison à domicile</div>
                        <div className="text-sm text-angel-dark">7 TND</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      deliveryMethod === 'pickup'
                        ? 'border-angel-gold bg-angel-pink'
                        : 'border-angel-border hover:border-angel-gold'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-angel-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <div className="text-left">
                        <div className="font-semibold text-primary">Retrait en magasin</div>
                        <div className="text-sm text-angel-dark">Gratuit</div>
                      </div>
                    </div>
                  </button>
                </div>

                {deliveryMethod === 'delivery' && (
                  <div className="mt-4 grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        Adresse <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-angel-border rounded-xl focus:outline-none focus:ring-2 focus:ring-angel-gold"
                        required={deliveryMethod === 'delivery'}
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
                          className="w-full px-4 py-3 border border-angel-border rounded-xl focus:outline-none focus:ring-2 focus:ring-angel-gold"
                          required={deliveryMethod === 'delivery'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">
                          Code postal
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-angel-border rounded-xl focus:outline-none focus:ring-2 focus:ring-angel-gold"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {deliveryMethod === 'pickup' && (
                  <div className="mt-4 p-4 bg-angel-light rounded-xl border border-angel-border">
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-angel-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <div className="font-semibold text-primary">Notre magasin</div>
                        <div className="text-sm text-angel-dark">La Mannouba, Tunis</div>
                        <div className="text-sm text-angel-dark">Horaires: Lun-Sam 9h-18h</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mode de paiement */}
              <div className="bg-angel-card rounded-2xl shadow-sm p-6 border border-angel-border">
                <h2 className="text-xl font-semibold text-primary mb-4">Mode de paiement</h2>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('whatsapp')}
                    className={`w-full p-4 border-2 rounded-xl transition-all text-left ${
                      paymentMethod === 'whatsapp'
                        ? 'border-angel-gold bg-angel-pink'
                        : 'border-angel-border hover:border-angel-gold'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      <div>
                        <div className="font-semibold text-primary">Commander par WhatsApp</div>
                        <div className="text-sm text-angel-dark">Confirmation rapide et paiement flexible</div>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`w-full p-4 border-2 rounded-xl transition-all text-left ${
                      paymentMethod === 'cash'
                        ? 'border-angel-gold bg-angel-pink'
                        : 'border-angel-border hover:border-angel-gold'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-angel-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <div>
                        <div className="font-semibold text-primary">Paiement à la livraison</div>
                        <div className="text-sm text-angel-dark">Payez en espèces lors de la réception</div>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('online')}
                    className={`w-full p-4 border-2 rounded-xl transition-all text-left ${
                      paymentMethod === 'online'
                        ? 'border-angel-gold bg-angel-pink'
                        : 'border-angel-border hover:border-angel-gold'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-angel-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <div>
                        <div className="font-semibold text-primary">Paiement en ligne</div>
                        <div className="text-sm text-angel-dark">Carte bancaire sécurisée (Bientôt disponible)</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-angel-card rounded-2xl shadow-sm p-6 border border-angel-border">
                <h2 className="text-xl font-semibold text-primary mb-4">Notes (optionnel)</h2>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-angel-border rounded-xl focus:outline-none focus:ring-2 focus:ring-angel-gold resize-none"
                  placeholder="Instructions spéciales pour votre commande..."
                />
              </div>
            </div>

            {/* Résumé de commande */}
            <div className="lg:col-span-1">
              <div className="bg-angel-card rounded-2xl shadow-sm p-6 border border-angel-border sticky top-8">
                <h2 className="text-xl font-semibold text-primary mb-6">Résumé</h2>
                
                {/* Produits */}
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {cart.items.map((item: any) => (
                    <div key={item.id} className="flex items-center space-x-3 pb-3 border-b border-angel-border">
                      <div className="flex-shrink-0 w-16 h-16 bg-angel-pink rounded-lg overflow-hidden">
                        {item.product.images?.[0] && (
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="font-semibold text-sm text-primary">{item.product.name}</div>
                        <div className="text-xs text-angel-dark">Qté: {item.quantity}</div>
                      </div>
                      <div className="text-sm font-semibold text-primary">
                        {(item.product.price * item.quantity).toFixed(2)} TND
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totaux */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-angel-dark">
                    <span>Sous-total</span>
                    <span>{getCartTotal().toFixed(2)} TND</span>
                  </div>
                  <div className="flex justify-between text-angel-dark">
                    <span>Livraison</span>
                    <span>{deliveryFee === 0 ? 'Gratuit' : `${deliveryFee.toFixed(2)} TND`}</span>
                  </div>
                  <div className="border-t border-angel-border pt-3 flex justify-between text-lg font-bold text-primary">
                    <span>Total</span>
                    <span className="text-angel-gold">{total.toFixed(2)} TND</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-angel-gold text-angel-light py-4 rounded-xl hover:bg-primary transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  {paymentMethod === 'whatsapp' ? 'Commander via WhatsApp' : 
                   paymentMethod === 'online' ? 'Payer en ligne' : 
                   'Confirmer la commande'}
                </button>

                {/* Sécurité */}
                <div className="mt-6 pt-6 border-t border-angel-border">
                  <div className="flex items-center justify-center space-x-4 text-angel-dark text-xs">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Sécurisé</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Garanti</span>
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