// Types pour les catégories
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
}

// Types pour les produits
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  images: string[];
  customizationOptions?: {
    colors: string[];
    sizes: string[];
    personalization: {
      available: boolean;
      maxCharacters: number;
      price?: number;
    };
  };
  featured: boolean;
  inStock: boolean;
  stockQuantity: number;
  tags: string[];
  details?: {
    material: string;
    dimensions: string;
    weight: string;
    care: string;
  };
}

// Props pour le composant Categories
export interface CategoriesProps {
  categories: Category[];
}

// Props pour le composant Home
export interface HomeProps {
  categories: Category[];
  featuredProducts: Product[];
}