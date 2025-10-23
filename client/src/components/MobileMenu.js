import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/logo.png";

const MobileMenu = ({ isOpen, onClose, currentPath }) => {
  const menuItems = [
    { 
      path: '/', 
      label: 'Accueil', 
      icon: '🏠',
      title: 'Retour à la page d\'accueil Angel\'s Bags'
    },
    { 
      path: '/categories', 
      label: 'Nos Collections', 
      icon: '📁',
      title: 'Découvrir nos collections de sacs en perles et cristal'
    },
    { 
      path: '/products', 
      label: 'Tous Nos Produits', 
      icon: '👜',
      title: 'Voir tous nos sacs en perles et cristal faits main'
    },
    { 
      path: '/about', 
      label: 'Notre Histoire', 
      icon: 'ℹ️',
      title: 'Découvrir l\'histoire et les valeurs d\'Angel\'s Bags'
    },
    { 
      path: '/contact', 
      label: 'Nous Contacter', 
      icon: '📞',
      title: 'Contacter Angel\'s Bags pour vos questions'
    },
    { 
      path: '/cart', 
      label: 'Mon Panier', 
      icon: '🛒',
      title: 'Voir le contenu de mon panier Angel\'s Bags'
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay avec aria-label pour l'accessibilité */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
        aria-label="Fermer le menu mobile"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClose();
          }
        }}
      />

      {/* Menu Panel avec rôle navigation et aria-label */}
      <div 
        className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-angel-card shadow-2xl z-50 lg:hidden overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation principal"
      >
        
        {/* Header avec informations structurées */}
        <div className="sticky top-0 bg-angel-card border-b border-angel-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img 
                src={logo}
                alt="Logo Angel's Bags - Sacs en perles et cristal faits main"
                className="w-10 h-10 object-contain"
                width="40"
                height="40"
                loading="eager"
              />
              <div>
                <div 
                  className="text-sm font-bold text-angel-dark" 
                  style={{ fontFamily: 'TAN Pearl, serif' }}
                  aria-label="Angel's Bags"
                >
                  ANGEL'S BAGS
                </div>
                <div className="text-[8px] text-angel-gold uppercase">
                  Sacs en Perles & Cristal
                </div>
              </div>
            </div>
            
            {/* Bouton de fermeture optimisé */}
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-angel-background transition-colors focus:outline-none focus:ring-2 focus:ring-angel-gold"
              aria-label="Fermer le menu de navigation"
              title="Fermer le menu"
            >
              <svg className="w-6 h-6 text-angel-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation principale avec structure sémantique */}
        <nav 
          className="p-4"
          aria-label="Navigation principale mobile"
        >
          <ul className="space-y-2" role="menubar">
            {menuItems.map((item) => {
              const isActive = currentPath === item.path || currentPath.startsWith(item.path + '/');
              
              return (
                <li key={item.path} role="none">
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-angel-gold text-white shadow-lg'
                        : 'bg-angel-background text-angel-dark hover:bg-angel-gold hover:text-white hover:shadow-md'
                    }`}
                    role="menuitem"
                    title={item.title}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span 
                      className="text-xl" 
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>
                    <span className="font-semibold text-base">
                      {item.label}
                    </span>
                    {isActive && (
                      <span className="ml-auto text-sm bg-white/20 px-2 py-1 rounded-full">
                        Actuel
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Section informations supplémentaires */}
        <div className="p-4 border-t border-angel-border">
          <div className="bg-angel-light rounded-xl p-4 mb-4">
            <h3 className="font-semibold text-primary text-sm mb-2 flex items-center">
              <span className="text-angel-gold mr-2">💎</span>
              Artisanat d'Excellence
            </h3>
            <p className="text-angel-dark text-xs">
              Sacs faits main en perles et cristal de qualité
            </p>
          </div>
        </div>

        {/* Boutons d'action secondaires */}
        <div className="p-4 space-y-3">
          <Link
            to="/login"
            onClick={onClose}
            className="flex items-center justify-center space-x-2 w-full bg-angel-dark text-white py-3 rounded-xl font-semibold hover:bg-angel-gold transition-all shadow-md hover:shadow-lg"
            title="Se connecter à mon compte Angel's Bags"
            role="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Espace Client</span>
          </Link>
          
          <Link
            to="/products"
            onClick={onClose}
            className="flex items-center justify-center space-x-2 w-full border-2 border-angel-gold text-angel-gold py-3 rounded-xl font-semibold hover:bg-angel-gold hover:text-white transition-all"
            title="Découvrir nos nouvelles collections de sacs"
            role="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Nouveautés</span>
          </Link>
        </div>

        {/* Informations de contact rapide */}
        <div className="p-4 border-t border-angel-border bg-angel-background">
          <div className="text-center">
            <p className="text-angel-dark text-xs mb-2">Besoin d'aide ?</p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://wa.me/21646535386"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-green-600 hover:text-green-700 transition-colors text-xs"
                title="Contacter Angel's Bags via WhatsApp"
                onClick={onClose}
              >
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:+21646535386"
                className="flex items-center space-x-1 text-angel-gold hover:text-primary transition-colors text-xs"
                title="Appeler Angel's Bags"
                onClick={onClose}
              >
                <span>Appel</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer avec informations légères */}
        <div className="p-4 border-t border-angel-border">
          <div className="text-center">
            <p className="text-angel-dark text-[10px] uppercase tracking-wide">
              💎 Sacs Faits Main en Tunisie
            </p>
            <p className="text-angel-border text-[8px] mt-1">
              Livraison dans toute la Tunisie
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;