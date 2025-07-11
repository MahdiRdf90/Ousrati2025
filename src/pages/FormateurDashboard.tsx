import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  Calendar, 
  Users, 
  BookOpen, 
  Star, 
  Clock,
  MessageSquare,
  Video,
  TrendingUp,
  DollarSign,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { 
  getSessionsForUser, 
  getMessagesForUser, 
  getFormateurClients,
  getUserById,
  testSessions,
  testMessages
} from '@/data/testData';

const FormateurDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [formateurSessions, setFormateurSessions] = useState<any[]>([]);
  const [formateurMessages, setFormateurMessages] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    if (user?.id) {
      const sessions = getSessionsForUser(user.id, 'formateur');
      const messages = getMessagesForUser(user.id);
      const clientList = getFormateurClients(user.id);
      
      setFormateurSessions(sessions);
      setFormateurMessages(messages);
      setClients(clientList);
    }
  }, [user]);

  const todaySchedule = formateurSessions
    .filter(session => {
      const today = new Date().toISOString().split('T')[0];
      return session.date === today;
    })
    .map(session => {
      const client = getUserById(session.clientId);
      return {
        ...session,
        client: client?.name || 'عميل غير معروف',
        type: session.type === 'video' ? 'فيديو' : session.type === 'audio' ? 'صوت' : 'رسائل',
        status: session.status === 'confirmed' ? 'confirmed' : 'pending'
      };
    });

  const clientMessages = formateurMessages
    .filter(msg => !msg.read)
    .slice(0, 3)
    .map(msg => {
      const client = getUserById(msg.senderId);
      return {
        ...msg,
        client: client?.name || 'عميل غير معروف',
        time: new Date(msg.timestamp).toLocaleString('ar-DZ', { 
          hour: '2-digit', 
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit'
        }),
        unread: !msg.read
      };
    });

  const monthlyStats = {
    totalSessions: formateurSessions.length,
    completedSessions: formateurSessions.filter(s => s.status === 'completed').length,
    earnings: formateurSessions
      .filter(s => s.status === 'completed')
      .reduce((sum, s) => sum + s.price, 0)
      .toLocaleString(),
    rating: 4.8,
    newClients: clients.length
  };

  const handleStartSession = (sessionId: string) => {
    toast({
      title: "بدء الجلسة",
      description: "سيتم توجيهك لغرفة الجلسة...",
    });
  };

  const handleConfirmSession = (sessionId: string) => {
    toast({
      title: "تم تأكيد الجلسة",
      description: "تم تأكيد الجلسة بنجاح",
    });
  };

  const handleManageAppointments = () => {
    navigate('/appointments');
  };

  const handleViewClients = () => {
    navigate('/clients');
  };

  const handleCreateCourse = () => {
    navigate('/create-course');
  };

  const handleViewReports = () => {
    navigate('/reports');
  };

  const handleViewAllMessages = () => {
    navigate('/messages');
  };

  const handleViewDetailedReports = () => {
    navigate('/detailed-reports');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gold-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم المدرب</h1>
              <p className="text-gray-600">مرحباً {user?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                مدرب معتمد
              </Badge>
              <Button variant="outline" onClick={logout}>
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Monthly Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{monthlyStats.totalSessions}</p>
              <p className="text-sm text-gray-600">جلسة هذا الشهر</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{monthlyStats.completedSessions}</p>
              <p className="text-sm text-gray-600">جلسة مكتملة</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{monthlyStats.earnings} دج</p>
              <p className="text-sm text-gray-600">أرباح الشهر</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{monthlyStats.rating}</p>
              <p className="text-sm text-gray-600">تقييم العملاء</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{monthlyStats.newClients}</p>
              <p className="text-sm text-gray-600">عميل جديد</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600" />
                جدول اليوم
              </CardTitle>
              <CardDescription>جلساتك المجدولة لهذا اليوم</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-purple-100 rounded-full">
                        {session.type === 'فيديو' ? 
                          <Video className="h-4 w-4 text-purple-600" /> : 
                          session.type === 'صوت' ?
                          <MessageSquare className="h-4 w-4 text-purple-600" /> :
                          <MessageSquare className="h-4 w-4 text-purple-600" />
                        }
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{session.client}</p>
                        <p className="text-sm text-gray-600">{session.time} - {session.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={session.status === 'confirmed' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {session.status === 'confirmed' ? 'مؤكد' : 'في الانتظار'}
                      </Badge>
                      <Button 
                        size="sm"
                        onClick={() => session.status === 'confirmed' 
                          ? handleStartSession(session.id) 
                          : handleConfirmSession(session.id)
                        }
                      >
                        {session.status === 'confirmed' ? 'بدء الجلسة' : 'تأكيد'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                الرسائل الجديدة
                <Badge variant="destructive" className="text-xs">
                  {clientMessages.filter(m => m.unread).length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {clientMessages.map((message) => (
                  <div key={message.id} className={`p-3 rounded-lg ${message.unread ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}>
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium text-sm text-gray-900">{message.client}</p>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{message.message}</p>
                    {message.unread && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    )}
                  </div>
                ))}
                <Button 
                  className="w-full" 
                  variant="outline" 
                  size="sm"
                  onClick={handleViewAllMessages}
                >
                  عرض جميع الرسائل
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>إجراءات سريعة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center p-6 h-auto"
                  onClick={handleManageAppointments}
                >
                  <Calendar className="h-6 w-6 mb-2" />
                  إدارة المواعيد
                </Button>
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center p-6 h-auto"
                  onClick={handleViewClients}
                >
                  <Users className="h-6 w-6 mb-2" />
                  عملائي
                </Button>
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center p-6 h-auto"
                  onClick={handleCreateCourse}
                >
                  <BookOpen className="h-6 w-6 mb-2" />
                  إنشاء دورة
                </Button>
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center p-6 h-auto"
                  onClick={handleViewReports}
                >
                  <TrendingUp className="h-6 w-6 mb-2" />
                  التقارير
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Client Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                تقدم العملاء
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">أحمد محمد</p>
                    <p className="text-sm text-gray-600">تحسن في التواصل الزوجي</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">ممتاز</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">سارة أحمد</p>
                    <p className="text-sm text-gray-600">تقدم متوسط في إدارة الضغوط</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">جيد</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">محمد علي</p>
                    <p className="text-sm text-gray-600">بداية العلاج</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">جديد</Badge>
                </div>
                <Button 
                  className="w-full" 
                  variant="outline" 
                  size="sm"
                  onClick={handleViewDetailedReports}
                >
                  عرض تقارير مفصلة
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Earnings and Performance */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-yellow-600" />
              الأرباح والأداء
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">45,230 دج</p>
                <p className="text-sm text-gray-600">أرباح هذا الأسبوع</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">4.8/5</p>
                <p className="text-sm text-gray-600">متوسط التقييم</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">94%</p>
                <p className="text-sm text-gray-600">معدل الحضور</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-sm text-gray-600">ساعة عمل الشهر</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FormateurDashboard;