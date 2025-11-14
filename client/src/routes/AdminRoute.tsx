// routes/AdminRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  // Si non connecté, rediriger vers login
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  // Si connecté mais pas admin, afficher une alerte et rediriger
  if (user?.publicMetadata.role !== 'admin') {
    // Afficher une alerte
    alert('🚫 Accès refusé - Espace réservé aux administrateurs');
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};