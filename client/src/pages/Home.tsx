import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

interface HomeProps {
  categories: any[];
  featuredProducts: any[];
}

// Composant optimisé pour les images avec lazy loading
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

// Composant CategoryCard optimisé
const CategoryCard = React.memo<{ category: any }>(({ category }) => (
  <Link 
    to={`/categories/${category.slug}`}
    className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-angel-border hover:border-angel-gold"
  >
    <div className="aspect-square bg-angel-pink flex items-center justify-center">
      {category.image ? (
        <OptimizedImage 
          src={category.image} 
          alt={category.name}
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

// Composant ProductCard optimisé
const ProductCard = React.memo<{ product: any }>(({ product }) => (
  <Link 
    to={`/product/${product._id}`}
    className="bg-angel-card rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-angel-border hover:border-angel-gold group"
  >
    <div className="aspect-square bg-angel-pink flex items-center justify-center relative overflow-hidden">
      {product.images?.[0] ? (
        <OptimizedImage 
          src={product.images[0]} 
          alt={product.name}
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
  // Mémoriser le schéma JSON-LD pour éviter de le recréer à chaque render
  const organizationSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Angel's Bags",
    "url": "https://angelsbags.netlify.app",
    "logo": "https://angelsbags.netlify.app/logo.png",
    "sameAs": [
      "https://www.facebook.com/https://www.instagram.com/angel.bags.off",
      "https://www.tiktok.com/@angel_s_bags"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+21646535386",
      "contactType": "Customer Service",
      "email": "nefzimalek2002@gmail.com"
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
        
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-angel py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-tan-pearl text-5xl md:text-6xl text-angel-light mb-6">
            Angel's Bags
          </h1>
          <p className="text-xl text-angel-light opacity-90 mb-8 max-w-2xl mx-auto">
            Des sacs uniques en perles et cristal, faits main avec amour. 
            Personnalisez votre sac pour créer un accessoire qui vous ressemble.
          </p>
          <Link 
            to="/categories" 
            className="bg-angel-gold text-angel-light px-8 py-4 rounded-xl text-lg hover:bg-primary transition-all duration-300 font-semibold inline-block hover:shadow-lg"
          >
            Découvrir nos créations
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-angel-light">
        <div className="container mx-auto px-4">
          <h2 className="font-tan-pearl text-4xl text-center text-primary mb-12">
            Nos Catégories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {memoizedCategories.map(category => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-angel-background">
        <div className="container mx-auto px-4">
          <h2 className="font-tan-pearl text-4xl text-center text-primary mb-12">
            Créations Étoiles
          </h2>
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
                <p className="text-angel-dark text-lg">Aucun produit phare pour le moment.</p>
                <Link 
                  to="/products" 
                  className="inline-block mt-4 bg-angel-gold text-angel-light px-6 py-2 rounded-lg hover:bg-primary transition-colors"
                >
                  Voir tous les produits
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-angel-light border-t border-angel-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-tan-pearl text-3xl text-primary mb-6">
            Prêt à trouver votre sac idéal ?
          </h2>
          <p className="text-angel-dark text-lg mb-8 max-w-2xl mx-auto">
            Explorez notre collection complète de sacs artisanaux uniques et personnalisables.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="bg-angel-gold text-angel-light px-8 py-3 rounded-xl hover:bg-primary transition-all duration-300 font-semibold"
            >
              Voir tous les produits
            </Link>
            <Link 
              to="/about" 
              className="border border-angel-gold text-angel-gold px-8 py-3 rounded-xl hover:bg-angel-gold hover:text-angel-light transition-all duration-300 font-semibold"
            >
              Notre Histoire
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;