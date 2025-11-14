// src/pages/Orders.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useUser } from '@clerk/clerk-react';

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  selectedColor?: string;
  selectedSize?: string;
  personalization?: string;
  subtotal: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'in_production' | 'shipped' | 'delivered' | 'cancelled';
  customerInfo: {
    fullName: string;
    phone: string;
    email: string;
  };
  deliveryInfo: {
    method: 'delivery' | 'pickup';
    address?: {
      address: string;
      city: string;
      postalCode: string;
    };
  };
  paymentInfo: {
    method: 'whatsapp' | 'online' | 'cash';
    total: number;
    currency: string;
  };
  items: OrderItem[];
  createdAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

const Orders: React.FC = () => {
  const { user, isSignedIn } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    if (isSignedIn && user) {
      fetchUserOrders();
    } else if (isSignedIn === false) {
      setLoading(false);
    }
  }, [isSignedIn, user]);

  const fetchUserOrders = async () => {
    // Vérification supplémentaire pour TypeScript
    if (!user) {
      setError('Utilisateur non connecté');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:5000/api/orders/user/${user.id}`);
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des commandes');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.orders);
      } else {
        throw new Error(data.message || 'Erreur inconnue');
      }
    } catch (err) {
      console.error('Erreur récupération commandes:', err);
      setError('Impossible de charger vos commandes. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
      in_production: 'bg-purple-100 text-purple-800 border-purple-200',
      shipped: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      delivered: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: 'En attente',
      confirmed: 'Confirmée',
      in_production: 'En production',
      shipped: 'Expédiée',
      delivered: 'Livrée',
      cancelled: 'Annulée'
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: '⏳',
      confirmed: '✅',
      in_production: '🔧',
      shipped: '🚚',
      delivered: '📦',
      cancelled: '❌'
    };
    return icons[status as keyof typeof icons] || '📋';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: 'TND'
    }).format(amount);
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  // Gestion de l'état de chargement initial
  if (loading && isSignedIn === undefined) {
    return (
      <div className="min-h-screen bg-angel-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-angel-gold border-t-transparent mx-auto mb-4"></div>
          <p className="text-angel-dark">Vérification de connexion...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-angel-background flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-angel-light rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-angel-border">
              <svg className="w-8 h-8 text-angel-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-primary mb-4">Connexion Requise</h2>
            <p className="text-angel-dark mb-6">
              Veuillez vous connecter pour accéder à vos commandes.
            </p>
            <Link
              to="/login"
              className="bg-angel-gold text-angel-light px-6 py-3 rounded-xl hover:bg-primary transition-all font-semibold inline-block"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-angel-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-angel-gold border-t-transparent mx-auto mb-4"></div>
          <p className="text-angel-dark">Chargement de vos commandes...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Mes Commandes - Historique d'achats | Angel's Bags`}</title>
        <meta 
          name="description" 
          content="📋 Consultez l'historique de vos commandes Angel's Bags. Suivez vos sacs en perles et cristal faits main, du statut de production à la livraison." 
        />
        <meta 
          name="keywords" 
          content="mes commandes Angel's Bags, historique commandes, suivi commande sacs perles, statut livraison, sacs cristal commandes" 
        />
      </Helmet>

      <div className="min-h-screen bg-angel-background py-8">
        <div className="container mx-auto px-4">
          {/* En-tête */}
          <div className="text-center mb-8">
            <h1 className="font-tan-pearl text-4xl text-primary mb-2">
              Mes Commandes
            </h1>
            <p className="text-angel-dark text-lg">
              Retrouvez l'historique de tous vos achats Angel's Bags
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-center">
              <p className="text-red-800">{error}</p>
              <button
                onClick={fetchUserOrders}
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Réessayer
              </button>
            </div>
          )}

          {/* Filtres et statistiques */}
          <div className="bg-angel-card rounded-2xl shadow-sm p-6 border border-angel-border mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-primary">Filtrer :</span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-angel-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-angel-gold"
                >
                  <option value="all">Toutes les commandes</option>
                  <option value="pending">En attente</option>
                  <option value="confirmed">Confirmées</option>
                  <option value="in_production">En production</option>
                  <option value="shipped">Expédiées</option>
                  <option value="delivered">Livrées</option>
                  <option value="cancelled">Annulées</option>
                </select>
              </div>
              
              <div className="text-sm text-angel-dark">
                {filteredOrders.length} commande{filteredOrders.length !== 1 ? 's' : ''} trouvée{filteredOrders.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {/* Liste des commandes */}
          {filteredOrders.length === 0 ? (
            <div className="bg-angel-card rounded-2xl shadow-sm p-12 text-center border border-angel-border">
              <div className="w-24 h-24 bg-angel-light rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-angel-border">
                <svg className="w-12 h-12 text-angel-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                {filterStatus === 'all' ? 'Aucune commande' : `Aucune commande ${getStatusText(filterStatus).toLowerCase()}`}
              </h2>
              <p className="text-angel-dark mb-6 max-w-md mx-auto">
                {filterStatus === 'all' 
                  ? "Vous n'avez pas encore passé de commande. Découvrez notre collection de sacs en perles et cristal faits main !"
                  : `Vous n'avez aucune commande avec le statut "${getStatusText(filterStatus).toLowerCase()}".`
                }
              </p>
              {filterStatus === 'all' && (
                <Link
                  to="/products"
                  className="bg-angel-gold text-angel-light px-8 py-3 rounded-xl hover:bg-primary transition-all font-semibold inline-block"
                >
                  Découvrir nos produits
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <div key={order._id} className="bg-angel-card rounded-2xl shadow-sm border border-angel-border overflow-hidden">
                  {/* En-tête de la commande */}
                  <div className="p-6 border-b border-angel-border bg-angel-light">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className={`px-3 py-1 rounded-full border text-sm font-semibold ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)} {getStatusText(order.status)}
                        </div>
                        <div className="text-sm text-angel-dark">
                          Commande passée le {formatDate(order.createdAt)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-semibold text-primary">N° {order.orderNumber}</div>
                          <div className="text-sm text-angel-dark">
                            {formatCurrency(order.paymentInfo.total)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Détails de la commande */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Produits */}
                      <div className="lg:col-span-2">
                        <h3 className="font-semibold text-primary mb-4 flex items-center">
                          <svg className="w-5 h-5 text-angel-gold mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          Produits commandés
                        </h3>
                        <div className="space-y-4">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center space-x-4 p-4 bg-angel-background rounded-xl border border-angel-border">
                              <div className="flex-shrink-0 w-16 h-16 bg-angel-pink rounded-lg flex items-center justify-center">
                                <svg className="w-8 h-8 text-angel-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                              </div>
                              <div className="flex-grow">
                                <div className="font-semibold text-primary">{item.productName}</div>
                                <div className="text-sm text-angel-dark space-y-1">
                                  <div>Quantité: {item.quantity}</div>
                                  <div>Prix unitaire: {formatCurrency(item.price)}</div>
                                  {item.selectedColor && (
                                    <div>Couleur: {item.selectedColor}</div>
                                  )}
                                  {item.selectedSize && (
                                    <div>Taille: {item.selectedSize}</div>
                                  )}
                                  {item.personalization && (
                                    <div>Personnalisation: "{item.personalization}"</div>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-angel-gold">
                                  {formatCurrency(item.subtotal)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Informations de livraison et paiement */}
                      <div className="space-y-6">
                        {/* Livraison */}
                        <div>
                          <h3 className="font-semibold text-primary mb-3 flex items-center">
                            <svg className="w-5 h-5 text-angel-gold mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Livraison
                          </h3>
                          <div className="bg-angel-background rounded-xl p-4 border border-angel-border">
                            <div className="text-sm text-angel-dark space-y-2">
                              <div>
                                <strong>Mode:</strong> {order.deliveryInfo.method === 'delivery' ? 'Livraison à domicile' : 'Retrait en magasin'}
                              </div>
                              {order.deliveryInfo.address && (
                                <>
                                  <div>
                                    <strong>Adresse:</strong> {order.deliveryInfo.address.address}
                                  </div>
                                  <div>
                                    <strong>Ville:</strong> {order.deliveryInfo.address.city}
                                  </div>
                                  {order.deliveryInfo.address.postalCode && (
                                    <div>
                                      <strong>Code postal:</strong> {order.deliveryInfo.address.postalCode}
                                    </div>
                                  )}
                                </>
                              )}
                              {order.estimatedDelivery && (
                                <div className="text-green-600 font-semibold">
                                  📅 Livraison estimée: {formatDate(order.estimatedDelivery)}
                                </div>
                              )}
                              {order.trackingNumber && (
                                <div className="text-blue-600 font-semibold">
                                  📦 Numéro de suivi: {order.trackingNumber}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Paiement */}
                        <div>
                          <h3 className="font-semibold text-primary mb-3 flex items-center">
                            <svg className="w-5 h-5 text-angel-gold mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            Paiement
                          </h3>
                          <div className="bg-angel-background rounded-xl p-4 border border-angel-border">
                            <div className="text-sm text-angel-dark space-y-2">
                              <div>
                                <strong>Méthode:</strong> {
                                  order.paymentInfo.method === 'whatsapp' ? 'WhatsApp' :
                                  order.paymentInfo.method === 'online' ? 'En ligne' : 'À la livraison'
                                }
                              </div>
                              <div>
                                <strong>Total:</strong> {formatCurrency(order.paymentInfo.total)}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-3">
                          <button
                            onClick={() => window.open(`https://wa.me/21646535386?text=Bonjour, je souhaite avoir des informations sur ma commande ${order.orderNumber}`, '_blank')}
                            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold flex items-center justify-center space-x-2"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            <span>Contacter</span>
                          </button>
                          
                          <Link
                            to="/products"
                            className="flex-1 border-2 border-angel-gold text-angel-gold py-2 px-4 rounded-lg hover:bg-angel-gold hover:text-angel-light transition-all text-sm font-semibold text-center"
                          >
                            Commander à nouveau
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;