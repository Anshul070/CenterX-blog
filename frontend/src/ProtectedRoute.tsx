import { type ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from './hooks/auth';

interface AuthProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: AuthProps) {
  const { isAuthenticated, isLoading, isError } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return <>{isAuthenticated && children}</>;
}

export default ProtectedRoute;
