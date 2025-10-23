import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/logo_light.png";

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Merci de votre inscription : ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-angel-dark text-white" role="contentinfo" aria-label="Pied de page Angel's Bags">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6 group" title="Retour à l'accueil Angel's Bags">
              <img 
                src={logo}
                alt="Angel's Bags - Logo - Sacs en perles et cristal faits main Tunisie"
                className="w-12 h-12 object-contain"
                loading="lazy"
              />
              <div>
                <span className="font-bold text-xl text-angel-gold" style={{ fontFamily: 'TAN Pearl, serif' }}>
                  ANGEL'S BAGS
                </span>
                <div className="text-[10px] text-angel-border uppercase">Sacs Perles & Cristal Faits Main</div>
              </div>
            </Link>
            
            <p className="text-angel-border mb-6 leading-relaxed text-sm">
              Des <strong>sacs uniques en perles et cristal faits main</strong> avec passion en Tunisie. 
              Chaque pièce est une <strong>œuvre d'art artisanale</strong> créée pour illuminer votre quotidien 
              et vos <strong>occasions spéciales</strong>.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/angel.bags.off/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-angel-gold/20 rounded-full flex items-center justify-center hover:bg-angel-gold hover:text-white transition-all duration-300 group"
                aria-label="Suivez Angel's Bags sur Instagram"
                title="Suivre Angel's Bags sur Instagram"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.75 2a.75.75 0 110 1.5.75.75 0 010-1.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@angel_s_bags"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-angel-gold/20 rounded-full flex items-center justify-center hover:bg-angel-gold hover:text-white transition-all duration-300 group"
                aria-label="Suivez Angel's Bags sur TikTok"
                title="Suivre Angel's Bags sur TikTok"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.002 2.003v11.232a3.3 3.3 0 11-3.3-3.3v5.378a7.02 7.02 0 107.018-7.018V2.003h-3.718z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h2 className="font-bold text-lg mb-6 text-angel-gold">
              Navigation du Site
            </h2>
            <ul className="space-y-3" role="list" aria-label="Liens de navigation principaux">
              {[
                { to: '/', label: 'Accueil - Angel\'s Bags' },
                { to: '/categories', label: 'Nos Collections' },
                { to: '/products', label: 'Tous nos Sacs' },
                { to: '/about', label: 'Notre Histoire' },
                { to: '/contact', label: 'Contact & Support' }
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-angel-border hover:text-angel-gold transition-colors text-sm flex items-center group"
                    title={link.label}
                  >
                    <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h2 className="font-bold text-lg mb-6 text-angel-gold">
              Nos Collections de Sacs
            </h2>
            <ul className="space-y-3" role="list" aria-label="Collections de sacs Angel's Bags">
              {[
                { to: '/categories/sacs-perles', label: 'Sacs en Perles' },
                { to: '/categories/sacs-cristal', label: 'Sacs en Cristal' },
                { to: '/categories/accessoires', label: 'Accessoires' },
                { to: '/categories/personnalisables', label: 'Sacs Personnalisables' }
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-angel-border hover:text-angel-gold transition-colors text-sm flex items-center group"
                    title={`Voir la collection ${link.label}`}
                  >
                    <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h2 className="font-bold text-lg mb-6 text-angel-gold">
              Contact & Newsletter
            </h2>
            
            {/* Contact Info */}
            <div className="mb-6 space-y-3" role="list" aria-label="Informations de contact">
              <div className="flex items-start space-x-3 text-angel-border text-sm group">
                <svg className="w-5 h-5 text-angel-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a 
                  href="mailto:nefzimalek2002@gmail.com" 
                  className="group-hover:text-angel-gold transition-colors"
                  title="Envoyer un email à Angel's Bags"
                >
                  nefzimalek2002@gmail.com
                </a>
              </div>
              
              <div className="flex items-start space-x-3 text-angel-border text-sm group">
                <svg className="w-5 h-5 text-angel-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a 
                  href="tel:+21646535386" 
                  className="group-hover:text-angel-gold transition-colors"
                  title="Appeler Angel's Bags"
                >
                  +216 46 535 386
                </a>
              </div>
              
              <div className="flex items-start space-x-3 text-angel-border text-sm group">
                <svg className="w-5 h-5 text-angel-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="group-hover:text-angel-gold transition-colors">
                  La Mannouba, Tunis - Atelier Artisanal
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-angel-border mb-3 text-sm">
                Inscrivez-vous à notre newsletter pour les <strong>nouvelles collections</strong> et <strong>offres exclusives</strong>
              </p>
              <form 
                onSubmit={handleNewsletterSubmit} 
                className="flex"
                aria-label="Formulaire d'inscription à la newsletter"
              >
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  required
                  className="flex-grow px-4 py-2.5 bg-angel-gold/10 border border-angel-border rounded-l-full focus:outline-none focus:border-angel-gold text-white placeholder-angel-border text-sm"
                  aria-label="Adresse email pour la newsletter"
                  title="Entrez votre email pour la newsletter"
                />
                <button 
                  type="submit"
                  className="bg-angel-gold px-5 py-2.5 rounded-r-full hover:bg-angel-dark transition-all duration-300 group"
                  aria-label="S'inscrire à la newsletter"
                  title="S'inscrire à la newsletter Angel's Bags"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-angel-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-angel-border text-sm text-center md:text-left">
              © {new Date().getFullYear()} <strong className="text-angel-gold font-semibold">Angel's Bags</strong>. 
              Tous droits réservés. - <strong>Sacs en perles et cristal faits main en Tunisie</strong>
            </div>
            
            {/* Additional SEO Links */}
            <div className="flex flex-wrap justify-center gap-4 text-angel-border text-xs">
              <Link 
                to="/privacy" 
                className="hover:text-angel-gold transition-colors"
                title="Politique de confidentialité Angel's Bags"
              >
                Confidentialité
              </Link>
              <Link 
                to="/terms" 
                className="hover:text-angel-gold transition-colors"
                title="Conditions d'utilisation Angel's Bags"
              >
                Conditions
              </Link>
              <span className="text-angel-gold">•</span>
              <span>Artisanat Tunisien</span>
              <span className="text-angel-gold">•</span>
              <span>Fait Main</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;