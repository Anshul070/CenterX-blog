import { type ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from './hooks/auth';
import { OrbitProgress } from 'react-loading-indicators';

interface AuthProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: AuthProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <OrbitProgress
          color="#00000070"
          size="medium"
          text="Loading"
          textColor="#000"
        />
      </div>
    );
  }

  return <>{isAuthenticated && children}</>;
}

export default ProtectedRoute;
