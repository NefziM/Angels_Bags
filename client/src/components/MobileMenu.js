import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/logo.png";

const MobileMenu = ({ isOpen, onClose, currentPath }) => {
  const menuItems = [
    { 
      path: '/', 
      label: 'Accueil', 
      icon: '🏠'
    },
    { 
      path: '/categories', 
      label: 'Catégories', 
      icon: '📁'
    },
    { 
      path: '/products', 
      label: 'Produits', 
      icon: '👜'
    },
    { 
      path: '/about', 
      label: 'À Propos', 
      icon: 'ℹ️'
    },
    { 
      path: '/contact', 
      label: 'Contact', 
      icon: '📞'
    },
    { 
      path: '/cart', 
      label: 'Panier', 
      icon: '🛒'
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-angel-card shadow-2xl z-50 lg:hidden overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-angel-card border-b border-angel-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img 
                src={logo}
                alt="ANGEL'S BAGS"
                className="w-10 h-10 object-contain"
              />
              <div>
                <div className="text-sm font-bold text-angel-dark" style={{ fontFamily: 'TAN Pearl, serif' }}>
                  ANGEL'S BAGS
                </div>
                <div className="text-[8px] text-angel-gold uppercase">
                  By NEFZI Malek
                </div>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-angel-background transition-colors"
            >
              <svg className="w-6 h-6 text-angel-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = currentPath === item.path || currentPath.startsWith(item.path + '/');
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-angel-gold text-white'
                        : 'bg-angel-background text-angel-dark hover:bg-angel-gold hover:text-white'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA Button */}
        <div className="p-4">
          <Link
            to="/login"
            onClick={onClose}
            className="flex items-center justify-center space-x-2 w-full bg-angel-dark text-white py-3 rounded-xl font-semibold hover:bg-angel-gold transition-all"
          >
            <span>Se connecter</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;