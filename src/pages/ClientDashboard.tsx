import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { 
  Calendar, 
  MessageSquare, 
  BookOpen, 
  Heart, 
  Clock,
  Star,
  User,
  Video,
  CheckCircle,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { 
  getSessionsForUser, 
  getMessagesForUser, 
  getCoursesForUser, 
  getTestResultsForUser,
  getUserById,
  testUsers
} from '@/data/testData';
import { useData } from '@/data/DataProvider';

const ClientDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { sessions, courses, messages, testResultsData, enrollInCourse, addSession } = useData();
  
  const [userSessions, setUserSessions] = useState<any[]>([]);
  const [userCourses, setUserCourses] = useState<any[]>([]);
  const [userMessages, setUserMessages] = useState<any[]>([]);
  const [testResults, setTestResults] = useState<any[]>([]);

  useEffect(() => {
    if (user?.id) {
      // Utiliser les données du context au lieu des fonctions statiques
      const filteredSessions = sessions.filter(session => session.clientId === user.id);
      const filteredCourses = courses.filter(course => course.participants.includes(user.id));
      const filteredMessages = messages.filter(msg => msg.senderId === user.id || msg.receiverId === user.id);
      const filteredTests = testResultsData.filter(result => result.userId === user.id);
      
      setUserSessions(filteredSessions);
      setUserCourses(filteredCourses);
      setUserMessages(filteredMessages);
      setTestResults(filteredTests);
    }
  }, [user, sessions, courses, messages, testResultsData]);

  const upcomingSessions = userSessions
    .filter(session => session.status === 'scheduled' || session.status === 'confirmed')
    .map(session => {
      const formateur = getUserById(session.formateurId);
      return {
        ...session,
        therapist: formateur?.name || 'مدرب غير معروف',
        type: session.type === 'video' ? 'فيديو' : session.type === 'audio' ? 'صوت' : 'رسائل'
      };
    });

  const recentSessions = userSessions
    .filter(session => session.status === 'completed')
    .map(session => {
      const formateur = getUserById(session.formateurId);
      return {
        ...session,
        therapist: formateur?.name || 'مدرب غير معروف'
      };
    });

  const handleJoinSession = (sessionId: string) => {
    toast({
      title: "انضمام للجلسة",
      description: "سيتم توجيهك لغرفة الجلسة...",
    });
    // يمكن إضافة منطق الانتقال لصفحة الجلسة هنا
  };

  const handleCancelSession = (sessionId: string) => {
    toast({
      title: "تم إلغاء الجلسة",
      description: "تم إلغاء الجلسة بنجاح",
    });
    // تحديث البيانات بعد الإلغاء
  };

  const handleBookNewSession = () => {
    navigate('/booking');
  };

  const handleMessageTrainer = () => {
    navigate('/messages');
  };

  const handleBrowseCourses = () => {
    navigate('/courses');
  };

  const handlePsychTest = () => {
    navigate('/tests');
  };

  const handleViewDetailedReport = () => {
    navigate('/reports');
  };

  const completedSessions = recentSessions.length;
  const activeCourses = userCourses.length;
  const improvementRate = testResults.length > 0 ? 
    Math.round(testResults.reduce((acc, test) => acc + test.score, 0) / testResults.length) : 85;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gold-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم العميل</h1>
              <p className="text-gray-600">مرحباً {user?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                عميل
              </Badge>
              <Button variant="outline" onClick={logout}>
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{completedSessions}</p>
              <p className="text-sm text-gray-600">جلسة مكتملة</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{upcomingSessions.length}</p>
              <p className="text-sm text-gray-600">جلسة قادمة</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{activeCourses}</p>
              <p className="text-sm text-gray-600">دورة نشطة</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{improvementRate}%</p>
              <p className="text-sm text-gray-600">معدل التحسن</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Sessions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                الجلسات القادمة
              </CardTitle>
              <CardDescription>جلساتك المحجوزة في الأيام القادمة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-purple-100 rounded-full">
                        {session.type === 'فيديو' ? 
                          <Video className="h-4 w-4 text-purple-600" /> : 
                          <MessageSquare className="h-4 w-4 text-purple-600" />
                        }
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{session.therapist}</p>
                        <p className="text-sm text-gray-600">{session.date} - {session.time}</p>
                        <Badge variant="outline" className="text-xs mt-1">{session.type}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleCancelSession(session.id)}
                      >
                        إلغاء
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleJoinSession(session.id)}
                      >
                        انضمام
                      </Button>
                    </div>
                  </div>
                ))}
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={handleBookNewSession}
                >
                  <Calendar className="h-4 w-4 ml-2" />
                  حجز جلسة جديدة
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Progress Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                تتبع التقدم
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">الرضا الزواجي</span>
                  <span className="text-sm text-gray-600">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">مهارات التواصل</span>
                  <span className="text-sm text-gray-600">80%</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">إدارة الضغوط</span>
                  <span className="text-sm text-gray-600">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <Button 
                className="w-full mt-4" 
                variant="outline"
                onClick={handleViewDetailedReport}
              >
                عرض تقرير مفصل
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Sessions & Recommended Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Recent Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                الجلسات الأخيرة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSessions.map((session) => (
                  <div key={session.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{session.therapist}</p>
                        <p className="text-sm text-gray-600">{session.date}</p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < session.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{session.notes}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Courses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                دورات موصى بها
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userCourses.slice(0, 2).map((course) => (
                  <div key={course.id} className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">{course.title}</h4>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <p>المدة: {course.duration}</p>
                        <p className="font-medium text-blue-600">{course.price.toLocaleString()} دج</p>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => navigate(`/course/${course.id}`)}
                      >
                        متابعة
                      </Button>
                    </div>
                  </div>
                ))}
                {userCourses.length === 0 && (
                  <p className="text-gray-500 text-center py-4">لا توجد دورات مسجل بها حالياً</p>
                )}
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={handleBrowseCourses}
                >
                  عرض جميع الدورات
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>إجراءات سريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Button 
                variant="outline" 
                className="flex flex-col items-center p-6 h-auto"
                onClick={handleBookNewSession}
              >
                <Calendar className="h-6 w-6 mb-2" />
                حجز جلسة
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center p-6 h-auto"
                onClick={handleMessageTrainer}
              >
                <MessageSquare className="h-6 w-6 mb-2" />
                مراسلة مدرب
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center p-6 h-auto"
                onClick={handleBrowseCourses}
              >
                <BookOpen className="h-6 w-6 mb-2" />
                تصفح الدورات
              </Button>
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center p-6 h-auto"
                  onClick={() => navigate('/recommendations')}
                >
                  <Sparkles className="h-6 w-6 mb-2" />
                  التوصيات الذكية
                </Button>
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center p-6 h-auto"
                  onClick={handlePsychTest}
                >
                  <Heart className="h-6 w-6 mb-2" />
                  اختبار نفسي
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientDashboard;