const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://angels-bags-7c1t.onrender.com/api';

export const apiService = {
  // Catégories
  async getCategories() {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur lors du chargement des catégories: ${response.status} - ${errorText}`);
    }
    return response.json();
  },

  // Produits
  async getProducts() {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur lors du chargement des produits: ${response.status} - ${errorText}`);
    }
    return response.json();
  },

  // Produit par ID
  async getProductById(id: string) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Produit non trouvé: ${response.status} - ${errorText}`);
    }
    return response.json();
  },

  // Catégorie par slug
  async getCategoryBySlug(slug: string) {
    const response = await fetch(`${API_BASE_URL}/categories/slug/${slug}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Catégorie non trouvée: ${response.status} - ${errorText}`);
    }
    return response.json();
  },

  // Produits par catégorie
  async getProductsByCategory(categoryId: string) {
    const response = await fetch(`${API_BASE_URL}/products?category=${categoryId}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur produits par catégorie: ${response.status} - ${errorText}`);
    }
    return response.json();
  }
};