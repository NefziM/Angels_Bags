import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
  image: string;
  productCount?: number;
}

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Erreur chargement catégories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/categories/${categoryId}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          setCategories(categories.filter(c => c._id !== categoryId));
        }
      } catch (error) {
        console.error('Erreur suppression catégorie:', error);
        alert('Impossible de supprimer cette catégorie car elle contient des produits.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Gestion des Catégories | Admin Angel's Bags</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 p-6">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Catégories</h1>
            <p className="text-gray-600 mt-2">Organisez vos produits par catégories</p>
          </div>
          <Link
            to="/admin/categories/new"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all font-semibold"
          >
            + Nouvelle Catégorie
          </Link>
        </div>

        {/* Grille des catégories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 overflow-hidden">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <span className="text-4xl">📁</span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {category.description || 'Aucune description'}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {category.slug}
                  </span>
                  
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/categories/edit/${category._id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Éditer
                    </Link>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <span className="text-6xl mb-4 block">📁</span>
            <p className="text-gray-500 text-lg mb-2">Aucune catégorie créée</p>
            <p className="text-gray-400 text-sm mb-6">
              Créez votre première catégorie pour organiser vos produits
            </p>
            <Link
              to="/admin/categories/new"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all font-semibold"
            >
              Créer une catégorie
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminCategories;