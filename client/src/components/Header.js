// src/components/Header.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import MobileMenu from './MobileMenu';
import logo from "../images/logo.png";
import { useUser, useClerk } from '@clerk/clerk-react';

const Header = () => {
  const { getCartItemsCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); // 👈 Nouvel état pour dropdown user
  const location = useLocation();
  
  const { user, isSignedIn } = useUser();
  const clerk = useClerk();

  // Vérifier si on est sur une page admin
  const isAdminPage = location.pathname.startsWith('/admin');

  // Si on est sur une page admin, ne pas afficher le header normal
  if (isAdminPage) {
    return null;
  }

  const isActiveLink = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleSignOut = async () => {
    await clerk.signOut();
    window.location.href = '/';
  };

  // Vérifier si l'utilisateur est admin
  const isAdmin = user?.publicMetadata?.role === 'admin';

  // Récupérer le nom d'utilisateur ou email
  const getUserDisplayName = () => {
    if (!user) return 'Utilisateur';
    
    // Priorité: username -> fullName -> email -> primaryEmailAddress
    return user.username || 
           user.fullName || 
           user.primaryEmailAddress?.emailAddress || 
           'Client';
  };

  // Récupérer l'email principal
  const getUserEmail = () => {
    return user?.primaryEmailAddress?.emailAddress || '';
  };

  const displayName = getUserDisplayName();
  const userEmail = getUserEmail();

  return (
    <>
      <header className="bg-angel-card/95 backdrop-blur-lg shadow-sm border-b border-angel-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group flex-shrink-0"
              title="Angel's Bags - Accueil"
            >
              <div className="flex-shrink-0 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-angel-gold to-angel-dark rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <img 
                  src={logo}
                  alt="Logo Angel's Bags"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain relative z-10 group-hover:scale-110 transition-transform duration-300"
                  loading="eager"
                />
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-lg sm:text-xl text-angel-dark font-bold tracking-wide" style={{ fontFamily: 'TAN Pearl, serif' }}>
                  ANGEL'S BAGS
                </div>
                <div className="text-[10px] text-angel-gold font-light tracking-widest uppercase">
                  Sacs en Perles & Cristal
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
                Accueil
              </Link>
              <Link 
                to="/categories" 
                className={`px-5 py-2.5 rounded-full transition-all duration-300 font-semibold text-sm ${
                  isActiveLink('/categories')
                    ? 'bg-angel-card text-angel-dark shadow-md' 
                    : 'text-angel-dark hover:text-angel-gold hover:bg-angel-card/50'
                }`}
              >
                Catégories
              </Link>
              <Link 
                to="/products" 
                className={`px-5 py-2.5 rounded-full transition-all duration-300 font-semibold text-sm ${
                  isActiveLink('/products')
                    ? 'bg-angel-card text-angel-dark shadow-md' 
                    : 'text-angel-dark hover:text-angel-gold hover:bg-angel-card/50'
                }`}
              >
                Produits
              </Link>
              <Link 
                to="/about" 
                className={`px-5 py-2.5 rounded-full transition-all duration-300 font-semibold text-sm ${
                  isActiveLink('/about')
                    ? 'bg-angel-card text-angel-dark shadow-md' 
                    : 'text-angel-dark hover:text-angel-gold hover:bg-angel-card/50'
                }`}
              >
                Notre Histoire
              </Link>
              <Link 
                to="/contact" 
                className={`px-5 py-2.5 rounded-full transition-all duration-300 font-semibold text-sm ${
                  isActiveLink('/contact')
                    ? 'bg-angel-card text-angel-dark shadow-md' 
                    : 'text-angel-dark hover:text-angel-gold hover:bg-angel-card/50'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Actions Utilisateur */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Recherche */}
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 text-angel-dark hover:text-angel-gold transition-all duration-300 rounded-full hover:bg-angel-background"
                title="Rechercher"
              >
                🔍
              </button>

              {/* Panier */}
              <Link 
                to="/cart" 
                className="relative p-2.5 text-angel-dark hover:text-angel-gold transition-all duration-300 rounded-full hover:bg-angel-background"
                title={`Mon Panier - ${getCartItemsCount()} article(s)`}
              >
                🛒
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-angel-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                    {getCartItemsCount()}
                  </span>
                )}
              </Link>

              {/* Connexion / Déconnexion */}
              {isSignedIn ? (
                <>
                  {/* Menu déroulant utilisateur */}
                  <div className="relative hidden sm:block">
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="flex items-center space-x-2 bg-angel-dark text-white px-4 py-2 rounded-full hover:bg-angel-gold transition-all duration-300 font-semibold text-sm"
                    >
                      <span className="flex flex-col items-start">
                        <span className="text-sm">👤 {displayName}</span>
                        {userEmail && (
                          <span className="text-xs text-angel-light font-normal">{userEmail}</span>
                        )}
                      </span>
                      <span>▼</span>
                    </button>

                    {isUserDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-angel-border py-1 z-50">
                        {/* Info utilisateur dans le dropdown */}
                        <div className="px-4 py-2 border-b border-angel-border">
                          <div className="text-sm font-semibold text-angel-dark">{displayName}</div>
                          {userEmail && (
                            <div className="text-xs text-angel-gold truncate">{userEmail}</div>
                          )}
                          {isAdmin && (
                            <div className="text-xs text-purple-600 font-medium mt-1">● Administrateur</div>
                          )}
                        </div>
                        
                        <Link 
                          to="/profile"
                          className="block px-4 py-2 text-angel-dark hover:bg-angel-background text-sm"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          👤 Mon Profil
                        </Link>
                        <Link 
                          to="/orders"
                          className="block px-4 py-2 text-angel-dark hover:bg-angel-background text-sm"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          📦 Mes Commandes
                        </Link>
                        <div className="border-t border-angel-border my-1"></div>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
                        >
                          🚪 Déconnexion
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Version simple pour mobile */}
                  <button
                    onClick={handleSignOut}
                    className="sm:hidden flex items-center space-x-2 bg-red-600 text-white px-3 py-2 rounded-full hover:bg-red-500 transition-all duration-300 font-semibold text-sm"
                  >
                    🚪
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="hidden sm:flex items-center space-x-2 bg-angel-dark text-white px-4 py-2 rounded-full hover:bg-angel-gold transition-all duration-300 font-semibold text-sm"
                >
                  Connexion
                </Link>
              )}

              {/* Menu Mobile */}
              <button 
                className="lg:hidden p-2.5 text-angel-dark hover:text-angel-gold rounded-full hover:bg-angel-background transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(true)}
                title="Ouvrir le menu mobile"
              >
                ☰
              </button>
            </div>
          </div>

          {/* Recherche extensible */}
          {searchOpen && (
            <div className="mt-3 animate-slideDown">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-12 pr-4 py-3 bg-angel-background border-2 border-angel-border rounded-full focus:outline-none focus:border-angel-gold"
                autoFocus
              />
            </div>
          )}
        </div>
      </header>

      {/* Menu Mobile */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        currentPath={location.pathname}
        isAdmin={isAdmin}
        userDisplayName={displayName}
        userEmail={userEmail}
      />
    </>
  );
};

export default Header;