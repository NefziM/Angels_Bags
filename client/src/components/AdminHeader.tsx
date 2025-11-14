// src/components/AdminHeader.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';
import logo from "../images/logo_light.png";

const AdminHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const clerk = useClerk();
  const { user } = useUser(); // 👈 Récupérer l'utilisateur

  const handleSignOut = async () => {
    await clerk.signOut();
    window.location.href = '/';
  };

  // Récupérer le nom d'utilisateur ou email
  const getUserDisplayName = () => {
    if (!user) return 'Admin';
    
    // Priorité: username -> fullName -> email -> primaryEmailAddress
    return user.username || 
           user.fullName || 
           user.primaryEmailAddress?.emailAddress || 
           'Admin';
  };

  // Récupérer l'email principal
  const getUserEmail = () => {
    return user?.primaryEmailAddress?.emailAddress || '';
  };

  const displayName = getUserDisplayName();
  const userEmail = getUserEmail();

  return (
    <>
      <header className="bg-gray-900 shadow-lg border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            
            {/* Logo et titre admin */}
            <Link 
              to="/admin" 
              className="flex items-center space-x-3 group flex-shrink-0"
              title="Admin Dashboard - Angel's Bags"
            >
              <div className="flex-shrink-0 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <img 
                  src={logo}
                  alt="Logo Angel's Bags"
                  className="w-10 h-10 object-contain relative z-10 group-hover:scale-110 transition-transform duration-300"
                  loading="eager"
                />
              </div>
              <div className="text-left">
                <div className="text-lg text-white font-bold tracking-wide" style={{ fontFamily: 'TAN Pearl, serif' }}>
                  ANGEL'S BAGS
                </div>
                <div className="text-xs text-blue-300 font-light tracking-widest uppercase">
                  Admin Dashboard
                </div>
              </div>
            </Link>

            {/* Navigation Admin */}
            <nav className="hidden lg:flex items-center space-x-1 bg-gray-800 rounded-full px-2 py-2 shadow-sm border border-gray-700">
              <Link 
                to="/admin" 
                className="px-5 py-2.5 rounded-full transition-all duration-300 font-semibold text-sm text-white hover:bg-gray-700"
              >
                Tableau de Bord
              </Link>
              <Link 
                to="/admin/products" 
                className="px-5 py-2.5 rounded-full transition-all duration-300 font-semibold text-sm text-white hover:bg-gray-700"
              >
                Gérer Produits
              </Link>
              <Link 
                to="/admin/categories" 
                className="px-5 py-2.5 rounded-full transition-all duration-300 font-semibold text-sm text-white hover:bg-gray-700"
              >
                Gérer Catégories
              </Link>
              <Link 
                to="/admin/users" 
                className="px-5 py-2.5 rounded-full transition-all duration-300 font-semibold text-sm text-white hover:bg-gray-700"
              >
                Gérer Utilisateurs
              </Link>
              <Link 
                to="/admin/orders" 
                className="px-5 py-2.5 rounded-full transition-all duration-300 font-semibold text-sm text-white hover:bg-gray-700"
              >
                Commandes
              </Link>
            </nav>

            {/* Actions Admin */}
            <div className="flex items-center space-x-3">
              
              {/* Retour au site public */}
              <Link 
                to="/" 
                className="hidden sm:flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500 transition-all duration-300 font-semibold text-sm"
              >
                🌐 Site Public
              </Link>

              {/* Menu déroulant utilisateur */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-all duration-300 font-semibold text-sm"
                >
                  <span className="flex flex-col items-start">
                    <span className="text-sm font-semibold">👤 {displayName}</span>
                    {userEmail && (
                      <span className="text-xs text-gray-300 font-normal">{userEmail}</span>
                    )}
                  </span>
                  <span>▼</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    {/* Info utilisateur dans le dropdown */}
                    <div className="px-4 py-2 border-b border-gray-200">
                      <div className="text-sm font-semibold text-gray-800">{displayName}</div>
                      {userEmail && (
                        <div className="text-xs text-gray-500 truncate">{userEmail}</div>
                      )}
                      <div className="text-xs text-green-600 font-medium mt-1">● Administrateur</div>
                    </div>
                    
                    <Link 
                      to="/admin/profile" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      📊 Mon Profil
                    </Link>
                    <Link 
                      to="/admin/settings" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      ⚙️ Paramètres
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
                    >
                      🚪 Déconnexion
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Admin Mobile (simplifiée) */}
          <nav className="lg:hidden flex items-center justify-center space-x-2 mt-3 overflow-x-auto pb-2">
            <Link 
              to="/admin" 
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gray-700"
            >
              Dashboard
            </Link>
            <Link 
              to="/admin/products" 
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gray-700"
            >
              Produits
            </Link>
            <Link 
              to="/admin/categories" 
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gray-700"
            >
              Catégories
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default AdminHeader;