import React from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  Settings,
  BarChart3,
  UserPlus,
  FileText
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { title: 'إجمالي المستخدمين', value: '2,847', change: '+12%', icon: Users },
    { title: 'الجلسات اليوم', value: '164', change: '+8%', icon: Calendar },
    { title: 'المدربين النشطين', value: '89', change: '+5%', icon: CheckCircle },
    { title: 'الإيرادات الشهرية', value: '45,230 دج', change: '+15%', icon: TrendingUp },
  ];

  const recentActivities = [
    { id: 1, action: 'تسجيل مدرب جديد', user: 'د. أحمد محمد', time: 'منذ 5 دقائق', type: 'success' },
    { id: 2, action: 'جلسة استشارية مكتملة', user: 'سارة أحمد', time: 'منذ 15 دقيقة', type: 'info' },
    { id: 3, action: 'شكوى من عميل', user: 'محمد علي', time: 'منذ 30 دقيقة', type: 'warning' },
    { id: 4, action: 'دورة تدريبية جديدة', user: 'د. فاطمة زهراء', time: 'منذ ساعة', type: 'success' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gold-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم المدير</h1>
              <p className="text-gray-600">مرحباً {user?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                مدير النظام
              </Badge>
              <Button variant="outline" onClick={logout}>
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <stat.icon className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-purple-600" />
                النشاطات الأخيرة
              </CardTitle>
              <CardDescription>آخر العمليات المنجزة في المنصة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.user}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={
                          activity.type === 'success' ? 'default' : 
                          activity.type === 'warning' ? 'destructive' : 'secondary'
                        }
                        className="text-xs"
                      >
                        {activity.type === 'success' ? 'مكتمل' : 
                         activity.type === 'warning' ? 'تحذير' : 'معلومة'}
                      </Badge>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-purple-600" />
                إجراءات سريعة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/users')}>
                <UserPlus className="h-4 w-4 ml-2" />
                إضافة مدرب جديد
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/create-course')}>
                <BookOpen className="h-4 w-4 ml-2" />
                إنشاء دورة تدريبية
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/reports')}>
                <BarChart3 className="h-4 w-4 ml-2" />
                عرض التقارير
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/courses')}>
                <FileText className="h-4 w-4 ml-2" />
                إدارة المحتوى
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/marketing')}>
                <Settings className="h-4 w-4 ml-2" />
                إعدادات النظام
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>إدارة المستخدمين</CardTitle>
              <CardDescription>عرض وإدارة جميع المستخدمين</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>العملاء</span>
                  <Badge>2,456</Badge>
                </div>
                <div className="flex justify-between">
                  <span>المدربين</span>
                  <Badge>89</Badge>
                </div>
                <div className="flex justify-between">
                  <span>المديرين</span>
                  <Badge>5</Badge>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline" onClick={() => navigate('/users')}>
                عرض التفاصيل
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle>إدارة الجلسات</CardTitle>
              <CardDescription>متابعة الجلسات والحجوزات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>جلسات اليوم</span>
                  <Badge variant="secondary">164</Badge>
                </div>
                <div className="flex justify-between">
                  <span>قيد الانتظار</span>
                  <Badge variant="destructive">23</Badge>
                </div>
                <div className="flex justify-between">
                  <span>مكتملة</span>
                  <Badge>141</Badge>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline" onClick={() => navigate('/appointments')}>
                عرض الجلسات
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle>التقارير المالية</CardTitle>
              <CardDescription>الإيرادات والمدفوعات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>إيرادات اليوم</span>
                  <Badge>12,450 دج</Badge>
                </div>
                <div className="flex justify-between">
                  <span>هذا الشهر</span>
                  <Badge>345,670 دج</Badge>
                </div>
                <div className="flex justify-between">
                  <span>مدفوعات معلقة</span>
                  <Badge variant="destructive">15,230 دج</Badge>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline" onClick={() => navigate('/reports')}>
                عرض التقارير
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;