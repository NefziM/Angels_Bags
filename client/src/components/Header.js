import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import MobileMenu from './MobileMenu';
import logo from "../images/logo.png";

const Header = () => {
  const { getCartItemsCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      <header className="bg-angel-card/95 backdrop-blur-lg shadow-sm border-b border-angel-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            
            {/* LOGO */}
            <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
              <div className="flex-shrink-0 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-angel-gold to-angel-dark rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <img 
                  src={logo}
                  alt="ANGEL'S BAGS"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain relative z-10 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <div className="text-left hidden sm:block">
                <div className="text-lg sm:text-xl text-angel-dark font-bold tracking-wide" style={{ fontFamily: 'TAN Pearl, serif' }}>
                  ANGEL'S BAGS
                </div>
                <div className="text-[10px] text-angel-gold font-light tracking-widest uppercase">
                  By NEFZI Malek
                </div>
              </div>
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden lg:flex items-center space-x-1 bg-angel-background rounded-full px-2 py-2 shadow-sm border border-angel-border">
              <Link 
                to="/" 
                className={`px-5 py-2.5 rounded-full transition-all duration-300 font-semibold text-sm ${
                  isActiveLink('/') && location.pathname === '/'
                    ? 'bg-angel-card text-angel-dark shadow-md' 
                    : 'text-angel-dark hover:text-angel-gold hover:bg-angel-card/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Accueil</span>
                </div>
              </Link>

              <Link 
                to="/categories" 
                className={`px-5 py-2.5 rounded-full transition-all duration-300 font-semibold text-sm ${
                  isActiveLink('/categories')
                    ? 'bg-angel-card text-angel-dark shadow-md' 
                    : 'text-angel-dark hover:text-angel-gold hover:bg-angel-card/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span>Catégories</span>
                </div>
              </Link>

              <Link 
                to="/products" 
                className={`px-5 py-2.5 rounded-full transition-all duration-300 font-semibold text-sm ${
                  isActiveLink('/product')
                    ? 'bg-angel-card text-angel-dark shadow-md' 
                    : 'text-angel-dark hover:text-angel-gold hover:bg-angel-card/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span>Produits</span>
                </div>
              </Link>

              <Link 
                to="/about" 
                className={`px-5 py-2.5 rounded-full transition-all duration-300 font-semibold text-sm ${
                  isActiveLink('/about')
                    ? 'bg-angel-card text-angel-dark shadow-md' 
                    : 'text-angel-dark hover:text-angel-gold hover:bg-angel-card/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>À Propos</span>
                </div>
              </Link>

              <Link 
                to="/contact" 
                className={`px-5 py-2.5 rounded-full transition-all duration-300 font-semibold text-sm ${
                  isActiveLink('/contact')
                    ? 'bg-angel-card text-angel-dark shadow-md' 
                    : 'text-angel-dark hover:text-angel-gold hover:bg-angel-card/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Contact</span>
                </div>
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Recherche */}
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 text-angel-dark hover:text-angel-gold transition-all duration-300 rounded-full hover:bg-angel-background"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Panier */}
              <Link 
                to="/cart" 
                className="relative p-2.5 text-angel-dark hover:text-angel-gold transition-all duration-300 rounded-full hover:bg-angel-background group"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-angel-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {getCartItemsCount()}
                  </span>
                )}
              </Link>
              
              {/* Bouton Connexion */}
              <Link 
                to="/login" 
                className="hidden sm:flex items-center space-x-2 bg-angel-dark text-white px-4 py-2 rounded-full hover:bg-angel-gold transition-all duration-300 font-semibold text-sm hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Connexion</span>
              </Link>

              {/* Menu Burger */}
              <button 
                className="lg:hidden p-2.5 text-angel-dark hover:text-angel-gold rounded-full hover:bg-angel-background transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Barre de recherche expansible */}
          {searchOpen && (
            <div className="mt-3 animate-slideDown">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Rechercher un produit, une catégorie..."
                  className="w-full pl-12 pr-4 py-3 bg-angel-background border-2 border-angel-border rounded-full focus:outline-none focus:border-angel-gold focus:ring-4 focus:ring-angel-gold/20 transition-all text-angel-dark placeholder-angel-dark/50"
                  autoFocus
                />
                <svg className="w-5 h-5 text-angel-gold absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <button 
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-angel-dark/50 hover:text-angel-gold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Menu Mobile */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        currentPath={location.pathname}
      />
    </>
  );
};

export default Header;