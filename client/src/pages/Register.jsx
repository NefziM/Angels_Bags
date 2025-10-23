import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    acceptTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer le mot de passe';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    // Simulation d'une requête API
    setTimeout(() => {
      console.log('Inscription:', formData);
      alert('Compte créé avec succès ! Redirection vers la connexion...');
      setLoading(false);
      navigate('/login');
    }, 2000);
  };

  return (
    <>
      {/* === BALISES SEO OPTIMISÉES === */}
      <Helmet>
        {/* Title unique et descriptif */}
        <title>Inscription - Créer un compte Angel's Bags | Sacs Perles et Cristal</title>
        
        {/* Meta Description optimisée */}
        <meta 
          name="description" 
          content="Rejoignez Angel's Bags ✨ Créez votre compte pour accéder à nos sacs en perles et cristal faits main. Offres exclusives, programme fidélité et service personnalisé vous attendent." 
        />
        
        {/* Keywords */}
        <meta 
          name="keywords" 
          content="inscription Angel's Bags, créer compte sacs perles, compte client sacs cristal, rejoindre Angel's Bags, programme fidélité sacs faits main, offres exclusives sacs Tunisie" 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Inscription - Angel's Bags | Sacs Perles et Cristal Faits Main" />
        <meta property="og:description" content="Rejoignez notre communauté et découvrez nos sacs uniques en perles et cristal faits main en Tunisie." />
        <meta property="og:url" content="https://angelsbags.netlify.app/register" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://angelsbags.netlify.app/logo.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Inscription - Angel's Bags" />
        <meta name="twitter:description" content="Rejoignez Angel's Bags pour découvrir nos sacs en perles et cristal faits main" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://angelsbags.netlify.app/register" />
        
        {/* Schema.org pour la page d'inscription */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Inscription - Angel's Bags",
            "description": "Page d'inscription pour créer un compte client Angel's Bags et accéder aux sacs en perles et cristal faits main",
            "url": "https://angelsbags.netlify.app/register",
            "mainEntity": {
              "@type": "Service",
              "name": "Création de compte client",
              "description": "Service d'inscription pour accéder aux produits et avantages Angel's Bags"
            }
          })}
        </script>
      </Helmet>

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
      
      <div className="min-h-screen bg-angel-background py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          
          {/* === HEADER AVEC H1 OPTIMISÉ === */}
          <div className="text-center mb-8">
            {/* H1 Principal unique */}
            <h1 className="font-tan-pearl text-4xl md:text-5xl text-primary mb-3">
              Créer Votre Compte Angel's Bags
            </h1>
            {/* Sous-titre riche en mots-clés */}
            <p className="text-angel-dark text-lg max-w-2xl mx-auto">
              Rejoignez notre communauté de passionnées de <strong>sacs en perles et cristal faits main</strong>. 
              Accédez à des <strong>offres exclusives</strong> et un <strong>service personnalisé</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* === FORMULAIRE D'INSCRIPTION === */}
            <div className="bg-angel-card rounded-3xl shadow-lg p-8 border border-angel-border">
              {/* H2 pour la section formulaire */}
              <h2 className="text-2xl font-bold text-primary mb-6">
                Informations Personnelles
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Nom et Prénom */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.firstName
                          ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                          : 'border-angel-border focus:border-angel-gold focus:ring-angel-pink'
                      }`}
                      placeholder="Votre prénom"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.lastName
                          ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                          : 'border-angel-border focus:border-angel-gold focus:ring-angel-pink'
                      }`}
                      placeholder="Votre nom"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Adresse email *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                          : 'border-angel-border focus:border-angel-gold focus:ring-angel-pink'
                      }`}
                      placeholder="votre@email.com"
                    />
                    <svg className="w-5 h-5 text-angel-gold absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Téléphone (optionnel)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-angel-border rounded-xl focus:outline-none focus:border-angel-gold focus:ring-2 focus:ring-angel-pink transition-all"
                      placeholder="+216 XX XXX XXX"
                      title="Numéro de téléphone tunisien"
                    />
                    <svg className="w-5 h-5 text-angel-gold absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>

                {/* Mot de passe */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Mot de passe *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-11 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.password
                          ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                          : 'border-angel-border focus:border-angel-gold focus:ring-angel-pink'
                      }`}
                      placeholder="••••••••"
                      title="Créez un mot de passe sécurisé d'au moins 8 caractères"
                    />
                    <svg className="w-5 h-5 text-angel-gold absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-angel-border hover:text-angel-gold"
                      title={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.password}
                    </p>
                  )}
                  {formData.password && formData.password.length > 0 && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2 text-xs">
                        <div className={`h-1 flex-1 rounded-full ${formData.password.length < 6 ? 'bg-red-300' : formData.password.length < 10 ? 'bg-yellow-300' : 'bg-green-300'}`}></div>
                        <span className={`${formData.password.length < 6 ? 'text-red-500' : formData.password.length < 10 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {formData.password.length < 6 ? 'Faible' : formData.password.length < 10 ? 'Moyen' : 'Fort'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirmation mot de passe */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Confirmer le mot de passe *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-11 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.confirmPassword
                          ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                          : 'border-angel-border focus:border-angel-gold focus:ring-angel-pink'
                      }`}
                      placeholder="••••••••"
                      title="Confirmez votre mot de passe"
                    />
                    <svg className="w-5 h-5 text-angel-gold absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-angel-border hover:text-angel-gold"
                      title={showConfirmPassword ? "Masquer la confirmation" : "Afficher la confirmation"}
                    >
                      {showConfirmPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Conditions */}
                <div>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      className="w-5 h-5 text-angel-gold border-2 border-angel-border rounded focus:ring-2 focus:ring-angel-pink mt-0.5"
                      title="Accepter les conditions d'utilisation"
                    />
                    <span className="text-sm text-angel-dark">
                      J'accepte les{' '}
                      <Link to="/terms" className="text-angel-gold hover:underline font-semibold" title="Lire les conditions d'utilisation">
                        conditions d'utilisation
                      </Link>
                      {' '}et la{' '}
                      <Link to="/privacy" className="text-angel-gold hover:underline font-semibold" title="Lire la politique de confidentialité">
                        politique de confidentialité
                      </Link>
                      {' '}d'Angel's Bags
                    </span>
                  </label>
                  {errors.acceptTerms && (
                    <p className="text-red-500 text-xs mt-1 flex items-center ml-8">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.acceptTerms}
                    </p>
                  )}
                </div>

                {/* Bouton Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                    loading
                      ? 'bg-angel-border text-angel-dark cursor-not-allowed'
                      : 'bg-angel-gold text-angel-light hover:bg-primary hover:shadow-xl'
                  }`}
                  title="Créer mon compte Angel's Bags"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Création en cours...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      <span>Créer mon compte Angel's Bags</span>
                    </>
                  )}
                </button>

                {/* Lien connexion */}
                <div className="text-center pt-4 border-t border-angel-border">
                  <p className="text-angel-dark text-sm">
                    Vous avez déjà un compte ?{' '}
                    <Link 
                      to="/login" 
                      className="text-angel-gold hover:text-primary font-semibold hover:underline"
                      title="Se connecter à mon compte Angel's Bags"
                    >
                      Se connecter
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            {/* === INFORMATIONS LATÉRALES AVEC H2 OPTIMISÉ === */}
            <div className="space-y-6">
              
              {/* Avantages */}
              <div className="bg-angel-card rounded-3xl shadow-lg p-8 border border-angel-border">
                {/* H2 pour les avantages */}
                <h2 className="font-bold text-2xl text-primary mb-6 flex items-center">
                  <svg className="w-8 h-8 mr-3 text-angel-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Avantages Exclusifs Membres
                </h2>
                
                <div className="space-y-4">
                  {[
                    {
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                      ),
                      title: 'Offres Exclusives Sacs Perles',
                      description: 'Accédez à des promotions et collections limitées de sacs en perles et cristal réservées aux membres'
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ),
                      title: 'Programme de Fidélité',
                      description: 'Gagnez des points à chaque achat de sacs faits main et bénéficiez de récompenses exclusives'
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      ),
                      title: 'Livraison Rapide Tunisie',
                      description: 'Profitez d\'une livraison prioritaire pour vos sacs en perles et cristal partout en Tunisie'
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      ),
                      title: 'Service Personnalisé Sacs',
                      description: 'Bénéficiez d\'un accompagnement sur mesure pour choisir vos sacs en perles et cristal faits main'
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-3 rounded-xl hover:bg-angel-pink transition-colors">
                      <div className="flex-shrink-0 w-10 h-10 bg-angel-pink rounded-xl flex items-center justify-center text-angel-gold">
                        {item.icon}
                      </div>
                      <div>
                        {/* H3 pour chaque avantage */}
                        <h3 className="font-semibold text-primary mb-1">{item.title}</h3>
                        <p className="text-sm text-angel-dark">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statistiques Communauté */}
              <div className="bg-gradient-angel rounded-3xl shadow-lg p-8 text-angel-light">
                {/* H2 pour les statistiques */}
                <h2 className="font-bold text-2xl mb-6">Notre Communauté Angel's Bags</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">10K+</div>
                    <div className="text-sm opacity-90">Passionnées de sacs perles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">4.9★</div>
                    <div className="text-sm opacity-90">Satisfaction client</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">24h</div>
                    <div className="text-sm opacity-90">Support personnalisé</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">100%</div>
                    <div className="text-sm opacity-90">Artisanat fait main</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;