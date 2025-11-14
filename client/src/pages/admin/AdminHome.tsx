// src/pages/admin/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

interface StatsData {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalUsers: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<StatsData>({
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
    fetchRecentOrders();
  }, []);

  const fetchStats = async () => {
    try {
      // Pour l'instant, on simule les données
      setStats({
        totalOrders: 12,
        pendingOrders: 3,
        totalRevenue: 2450,
        totalProducts: 8,
        totalUsers: 24
      });
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentOrders = async () => {
    try {
      // Simulation de données
      setRecentOrders([
        {
          _id: '1',
          orderNumber: 'ANGELS-123456',
          customerInfo: { fullName: 'Marie Dupont' },
          paymentInfo: { total: 150 },
          status: 'pending'
        },
        {
          _id: '2', 
          orderNumber: 'ANGELS-123457',
          customerInfo: { fullName: 'Sophie Martin' },
          paymentInfo: { total: 89 },
          status: 'confirmed'
        }
      ]);
    } catch (error) {
      console.error('Erreur chargement commandes récentes:', error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      in_production: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Tableau de Bord Admin | Angel's Bags</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 p-6">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
          <p className="text-gray-600 mt-2">Aperçu général de votre boutique Angel's Bags</p>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-2xl">📦</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Commandes Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <span className="text-2xl">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">En Attente</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue} TND</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <span className="text-2xl">🛍️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Produits</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Commandes récentes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Commandes Récentes</h2>
              <Link 
                to="/admin/orders" 
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Voir tout →
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <div key={order._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                      <p className="text-sm text-gray-600">{order.customerInfo.fullName}</p>
                      <p className="text-sm text-gray-500">{order.paymentInfo.total} TND</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Aucune commande récente</p>
              )}
            </div>
          </div>

          {/* Actions rapides */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Actions Rapides</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <Link 
                to="/admin/products/new" 
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
              >
                <span className="text-2xl mb-2 block">➕</span>
                <p className="font-semibold text-gray-900">Nouveau Produit</p>
                <p className="text-sm text-gray-600">Ajouter un produit</p>
              </Link>

              <Link 
                to="/admin/categories/new" 
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-center"
              >
                <span className="text-2xl mb-2 block">📁</span>
                <p className="font-semibold text-gray-900">Nouvelle Catégorie</p>
                <p className="text-sm text-gray-600">Créer une catégorie</p>
              </Link>

              <Link 
                to="/admin/orders" 
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-all text-center"
              >
                <span className="text-2xl mb-2 block">📋</span>
                <p className="font-semibold text-gray-900">Gérer Commandes</p>
                <p className="text-sm text-gray-600">Voir toutes les commandes</p>
              </Link>

              <Link 
                to="/admin/users" 
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-center"
              >
                <span className="text-2xl mb-2 block">👥</span>
                <p className="font-semibold text-gray-900">Utilisateurs</p>
                <p className="text-sm text-gray-600">Gérer les clients</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;