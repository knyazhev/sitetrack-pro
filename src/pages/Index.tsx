import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Route based on role
    const roleRoutes: Record<string, string> = {
      worker: '/worker/home',
      foreman: '/foreman/dashboard',
      timekeeper: '/timekeeper/assignments',
      director: '/director/dashboard',
      admin: '/admin/dictionaries',
    };

    if (user?.role) {
      navigate(roleRoutes[user.role] || '/login');
    }
  }, [isAuthenticated, user, isLoading, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-pulse">
          <div className="h-12 w-12 bg-accent rounded-lg mx-auto mb-4" />
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
