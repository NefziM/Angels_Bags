// src/components/AuthRedirect.tsx
import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const AuthRedirect = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn && user?.publicMetadata.role === 'admin') {
      navigate('/admin', { replace: true });
    }
  }, [isSignedIn, isLoaded, user, navigate]);

  return null;
};

export default AuthRedirect;
