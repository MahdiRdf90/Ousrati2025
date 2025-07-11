
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Building, TestTube, Heart, Menu, X, Calendar, LogIn, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import LanguageSelector, { useLanguage } from './LanguageSelector';
import { useAuth } from './Auth/AuthProvider';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  const navItems = [
    { name: t('home'), path: '/', icon: Heart },
    { name: t('booking'), path: '/booking', icon: Calendar },
    { name: t('courses'), path: '/courses', icon: TestTube },
    { name: t('tests'), path: '/tests', icon: TestTube },
    { name: t('clinics'), path: '/clinics', icon: Building },
    { name: t('users'), path: '/users', icon: Users },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-purple-600 ml-2" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">أسرتي</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 space-x-reverse items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4 ml-1" />
                  {item.name}
                </Link>
              );
            })}
            <LanguageSelector />
            
            {/* Auth Buttons */}
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link 
                    to={
                      user?.role === 'admin' ? '/admin-dashboard' :
                      user?.role === 'client' ? '/client-dashboard' :
                      user?.role === 'formateur' ? '/formateur-dashboard' : '/'
                    }
                  >
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {user?.name || 'حسابي'}
                    </Button>
                  </Link>
                </div>
              ) : (
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    تسجيل الدخول
                  </Button>
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === item.path
                        ? 'text-purple-600 bg-purple-50'
                        : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5 ml-2" />
                    {item.name}
                  </Link>
                );
              })}
              
              <div className="mt-4 pt-4 border-t border-purple-200">
                <LanguageSelector />
                
                {/* Mobile Auth Buttons */}
                <div className="mt-4">
                  {isAuthenticated ? (
                    <Link 
                      to={
                        user?.role === 'admin' ? '/admin-dashboard' :
                        user?.role === 'client' ? '/client-dashboard' :
                        user?.role === 'formateur' ? '/formateur-dashboard' : '/'
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {user?.name || 'حسابي'}
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full flex items-center gap-2">
                        <LogIn className="h-4 w-4" />
                        تسجيل الدخول
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
