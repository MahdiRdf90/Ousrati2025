import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/Auth/AuthProvider';
import Login from '@/components/Auth/Login';
import Signup from '@/components/Auth/Signup';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAuthSuccess = (user: any) => {
    login(user);
    
    // Redirect based on user role
    switch (user.role) {
      case 'admin':
        navigate('/admin-dashboard');
        break;
      case 'client':
        navigate('/client-dashboard');
        break;
      case 'formateur':
        navigate('/formateur-dashboard');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gold-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isLogin ? (
          <Login
            onLoginSuccess={handleAuthSuccess}
            onSwitchToSignup={() => setIsLogin(false)}
          />
        ) : (
          <Signup
            onSignupSuccess={handleAuthSuccess}
            onSwitchToLogin={() => setIsLogin(true)}
          />
        )}
      </div>
    </div>
  );
};

export default Auth;