import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

interface HomeProps {
  categories: any[];
  featuredProducts: any[];
}

// Composant optimisé pour les images avec lazy loading et ALT optimisé
const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className }) => (
  <img 
    src={src}
    alt={alt}
    className={className}
    loading="lazy"
    decoding="async"
  />
);

// Composant CategoryCard optimisé avec ALT SEO
const CategoryCard = React.memo<{ category: any }>(({ category }) => (
  <Link 
    to={`/categories/${category.slug}`}
    className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-angel-border hover:border-angel-gold"
  >
    <div className="aspect-square bg-angel-pink flex items-center justify-center">
      {category.image ? (
        <OptimizedImage 
          src={category.image} 
          alt={`Sacs ${category.name} en perles et cristal faits main - Angel's Bags Tunisie`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      ) : (
        <div className="text-angel-border text-center p-4">
          <div className="text-4xl mb-2">👜</div>
          <div className="text-sm font-medium text-primary">{category.name}</div>
        </div>
      )}
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <h3 className="text-angel-light text-xl font-semibold">{category.name}</h3>
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-angel-light/90 p-4 transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
      <h3 className="text-primary font-semibold text-center">{category.name}</h3>
    </div>
  </Link>
));

CategoryCard.displayName = 'CategoryCard';

// Composant ProductCard optimisé avec ALT SEO
const ProductCard = React.memo<{ product: any }>(({ product }) => (
  <Link 
    to={`/product/${product._id}`}
    className="bg-angel-card rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-angel-border hover:border-angel-gold group"
  >
    <div className="aspect-square bg-angel-pink flex items-center justify-center relative overflow-hidden">
      {product.images?.[0] ? (
        <OptimizedImage 
          src={product.images[0]} 
          alt={`${product.name} - Sac en perles et cristal fait main Angel's Bags - ${product.price} TND`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="text-angel-border text-center p-4">
          <div className="text-4xl mb-2">✨</div>
          <div className="text-sm font-medium text-primary">{product.name}</div>
        </div>
      )}
      <div className="absolute top-3 right-3">
        <div className="bg-angel-gold text-angel-light px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>Étoile</span>
        </div>
      </div>
    </div>
    <div className="p-6">
      <h3 className="font-semibold text-lg mb-2 text-primary group-hover:text-angel-gold transition-colors">
        {product.name}
      </h3>
      <p className="text-angel-dark text-sm mb-4 line-clamp-2 leading-relaxed">
        {product.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-primary font-bold text-xl">
          {product.price.toFixed(2)} TND
        </span>
        {product.originalPrice && (
          <span className="text-angel-border line-through text-sm">
            {product.originalPrice.toFixed(2)} TND
          </span>
        )}
      </div>
      {product.inStock ? (
        <div className="mt-3 flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-green-600 text-xs font-medium">En stock</span>
        </div>
      ) : (
        <div className="mt-3 flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-red-600 text-xs font-medium">Épuisé</span>
        </div>
      )}
    </div>
  </Link>
));

ProductCard.displayName = 'ProductCard';

const Home: React.FC<HomeProps> = ({ categories, featuredProducts }) => {
  // Mémoriser le schéma JSON-LD pour l'organisation
  const organizationSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Angel's Bags",
    "url": "https://angelsbags.netlify.app",
    "logo": "https://angelsbags.netlify.app/logo.png",
    "description": "Sacs personnalisés faits main en perles et cristal - Créations uniques et élégantes",
    "sameAs": [
      "https://www.instagram.com/angel.bags.off",
      "https://www.tiktok.com/@angel_s_bags"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+21646535386",
      "contactType": "Customer Service",
      "email": "nefzimalek2002@gmail.com",
      "areaServed": "TN",
      "availableLanguage": ["French", "Arabic"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "La Mannouba",
      "addressCountry": "TN"
    }
  }), []);

  // Mémoriser le schéma JSON-LD pour les produits
  const productsSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": featuredProducts.map(product => ({
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "image": product.images?.[0] || "",
      "sku": product._id,
      "mpn": product._id,
      "brand": {
        "@type": "Brand",
        "name": "Angel's Bags"
      },
      "offers": {
        "@type": "Offer",
        "url": `https://angelsbags.netlify.app/product/${product._id}`,
        "priceCurrency": "TND",
        "price": product.price,
        "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "itemCondition": "https://schema.org/NewCondition"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "25"
      }
    }))
  }), [featuredProducts]);

  // Mémoriser le schéma JSON-LD pour le site web
  const websiteSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Angel's Bags",
    "url": "https://angelsbags.netlify.app",
    "description": "Sacs personnalisés faits main en perles et cristal - Créations artisanales uniques",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://angelsbags.netlify.app/products?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Angel's Bags",
      "logo": "https://angelsbags.netlify.app/logo.png"
    }
  }), []);

  // Mémoriser les produits et catégories pour éviter les re-renders inutiles
  const memoizedCategories = useMemo(() => categories, [categories]);
  const memoizedFeaturedProducts = useMemo(() => featuredProducts, [featuredProducts]);

  return (
    <div className="min-h-screen bg-angel-background">
      <Helmet>
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
        
        {/* === BALISES SEO OPTIMISÉES === */}
        
        {/* Title unique et descriptif */}
        <title>Angel's Bags - Sacs en Perles et Cristal Faits Main Tunisie | Personnalisation</title>
        
        {/* Meta Description optimisée avec mots-clés */}
        <meta 
          name="description" 
          content="✨ Angel's Bags - Sacs uniques en perles et cristal FAITS MAIN en Tunisie. Personnalisation gratuite ✅ Livraison partout en Tunisie. Sacs soirée, mariée, élégants. Créez le sac de vos rêves !" 
        />
        
        {/* Keywords optimisés */}
        <meta 
          name="keywords" 
          content="sacs perles, sacs cristal, sacs faits main Tunisie, sacs personnalisés, artisanat tunisien, sacs femme élégants, sacs perles cristal, accessoires luxe, sacs mariée, sacs soirée, sacs main perles, sacs artisanaux Tunisie" 
        />
        
        {/* Open Graph optimisé */}
        <meta property="og:title" content="Angel's Bags - Sacs en Perles et Cristal Faits Main Tunisie" />
        <meta property="og:description" content="Sacs uniques faits main en perles et cristal. Personnalisation gratuite. Livraison partout en Tunisie. Créez votre sac personnalisé !" />
        <meta property="og:url" content="https://angelsbags.netlify.app" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://angelsbags.netlify.app/logo.png" />
        <meta property="og:site_name" content="Angel's Bags" />
        
        {/* Twitter Card optimisée */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Angel's Bags - Sacs Perles & Cristal Faits Main Tunisie" />
        <meta name="twitter:description" content="Sacs uniques en perles et cristal faits main. Personnalisation gratuite. Livraison Tunisie." />
        <meta name="twitter:image" content="https://angelsbags.netlify.app/logo.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://angelsbags.netlify.app" />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify(productsSchema)}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      </Helmet>

      {/* === HERO SECTION AVEC H1 OPTIMISÉ === */}
      <section className="bg-gradient-angel py-20">
        <div className="container mx-auto px-4 text-center">
          {/* H1 Principal unique et riche en mots-clés */}
          <h1 className="font-tan-pearl text-5xl md:text-6xl text-angel-light mb-6">
            Sacs en Perles et Cristal Faits Main - Angel's Bags Tunisie
          </h1>
          
          {/* Texte riche en mots-clés naturellement intégrés */}
          <p className="text-xl text-angel-light opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Découvrez nos <strong>sacs uniques en perles et cristal faits main en Tunisie</strong>. 
            Chaque sac est une œuvre d'artisanat exceptionnelle, <strong>personnalisable selon vos envies</strong>. 
            Parfait pour <strong>mariages, soirées et occasions spéciales</strong>.
          </p>
          
          <Link 
            to="/categories" 
            className="bg-angel-gold text-angel-light px-8 py-4 rounded-xl text-lg hover:bg-primary transition-all duration-300 font-semibold inline-block hover:shadow-lg"
            title="Découvrir tous nos sacs en perles et cristal"
          >
            Découvrir Nos Créations Artisanales
          </Link>
        </div>
      </section>

      {/* === CATEGORIES SECTION AVEC H2 OPTIMISÉ === */}
      <section className="py-16 bg-angel-light">
        <div className="container mx-auto px-4">
          {/* H2 optimisé pour les catégories */}
          <h2 className="font-tan-pearl text-4xl text-center text-primary mb-8">
            Nos Catégories de Sacs en Perles et Cristal
          </h2>
          
          {/* Texte introductif riche en mots-clés */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-angel-dark text-lg leading-relaxed">
              Explorez notre collection exclusive de <strong>sacs faits main en perles et cristaux</strong>. 
              De <strong>sacs soirée élégants</strong> aux <strong>sacs mariée romantiques</strong>, 
              chaque catégorie propose des créations uniques <strong>confectionnées artisanalement en Tunisie</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {memoizedCategories.map(category => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* === FEATURED PRODUCTS AVEC H2 OPTIMISÉ === */}
      <section className="py-16 bg-angel-background">
        <div className="container mx-auto px-4">
          {/* H2 pour les produits vedettes */}
          <h2 className="font-tan-pearl text-4xl text-center text-primary mb-8">
            Nos Sacs Vedettes en Perles et Cristal
          </h2>
          
          {/* Texte descriptif riche en SEO */}
          <div className="text-center max-w-4xl mx-auto mb-12">
            <p className="text-angel-dark text-lg leading-relaxed">
              Découvrez notre sélection de <strong>sacs en perles les plus populaires</strong>, 
              tous <strong>faits main avec des matériaux premium</strong>. 
              Ces <strong>sacs cristal et perles</strong> sont appréciés pour leur 
              <strong> élégance exceptionnelle et leur finition artisanale</strong>. 
              Chaque pièce est unique et <strong>confectionnée avec passion en Tunisie</strong>.
            </p>
          </div>

          {memoizedFeaturedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {memoizedFeaturedProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-angel-card rounded-2xl border border-angel-border p-12 max-w-md mx-auto">
                <svg className="w-16 h-16 mx-auto mb-4 text-angel-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="text-xl font-semibold text-primary mb-2">En Préparation</h3>
                <p className="text-angel-dark text-lg mb-4">De nouvelles créations arrivent bientôt !</p>
                <Link 
                  to="/products" 
                  className="inline-block mt-4 bg-angel-gold text-angel-light px-6 py-2 rounded-lg hover:bg-primary transition-colors"
                  title="Voir tous nos sacs en perles et cristal"
                >
                  Voir Tous Nos Produits
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* === CALL TO ACTION AVEC H2 OPTIMISÉ === */}
      <section className="py-16 bg-angel-light border-t border-angel-border">
        <div className="container mx-auto px-4 text-center">
          {/* H2 pour l'appel à l'action */}
          <h2 className="font-tan-pearl text-3xl text-primary mb-6">
            Prêt à Trouver Votre Sac Idéal en Perles et Cristal ?
          </h2>
          
          {/* Texte persuasif avec mots-clés */}
          <p className="text-angel-dark text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Rejoignez nos nombreuses clientes satisfaites en Tunisie qui ont choisi 
            <strong> Angel's Bags pour leurs sacs en perles et cristal faits main</strong>. 
            <strong> Qualité artisanale exceptionnelle</strong>, <strong>service personnalisé</strong> 
            et <strong>livraison rapide dans toute la Tunisie</strong>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="bg-angel-gold text-angel-light px-8 py-3 rounded-xl hover:bg-primary transition-all duration-300 font-semibold"
              title="Explorer tous nos sacs en perles et cristal"
            >
              Voir Tous Nos Sacs
            </Link>
            <Link 
              to="/about" 
              className="border border-angel-gold text-angel-gold px-8 py-3 rounded-xl hover:bg-angel-gold hover:text-angel-light transition-all duration-300 font-semibold"
              title="Découvrir l'histoire d'Angel's Bags"
            >
              Notre Histoire Artisanale
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;