import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { testUsers } from '@/data/testData';

interface LoginProps {
  onLoginSuccess: (user: { id: string; email: string; role: 'admin' | 'client' | 'formateur'; name: string }) => void;
  onSwitchToSignup: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  // Utilisation des données de test synchronisées

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulation d'appel API avec données de test synchronisées
    setTimeout(() => {
      const user = testUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: `مرحباً ${user.name}`,
        });
        onLoginSuccess(user);
      } else {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-800">تسجيل الدخول</CardTitle>
        <CardDescription>
          أدخل بياناتك للوصول إلى حسابك
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <div className="relative">
              <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pr-10"
                placeholder="ادخل بريدك الإلكتروني"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <div className="relative">
              <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10 pl-10"
                placeholder="ادخل كلمة المرور"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ليس لديك حساب؟{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              إنشاء حساب جديد
            </button>
          </p>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 mb-2 font-semibold">حسابات تجريبية متاحة:</p>
          <div className="space-y-1 text-xs text-gray-500">
            <p>• مدير: admin@osrati.dz / admin123</p>
            <p>• عميل: client@osrati.dz / client123</p>
            <p>• عميل: sara.ahmed@osrati.dz / client123</p>
            <p>• مدرب: formateur@osrati.dz / formateur123</p>
            <p className="mt-2 text-xs text-blue-600">💡 جميع البيانات متزامنة ومترابطة</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;