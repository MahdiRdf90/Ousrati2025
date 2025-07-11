import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Calendar, Star, BookOpen, CheckCircle } from 'lucide-react';
import { getTestResultsForUser, getSessionsForUser, getCoursesForUser } from '@/data/testData';
import Header from '@/components/Header';

const Reports = () => {
  const { user } = useAuth();
  const [testResults, setTestResults] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    if (user?.id) {
      const results = getTestResultsForUser(user.id);
      const userSessions = getSessionsForUser(user.id, user.role as 'client' | 'formateur');
      const userCourses = getCoursesForUser(user.id);
      
      setTestResults(results);
      setSessions(userSessions);
      setCourses(userCourses);
    }
  }, [user]);

  const overallProgress = testResults.length > 0 
    ? Math.round(testResults.reduce((acc, test) => acc + test.score, 0) / testResults.length)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">التقارير والإحصائيات</h1>
          <p className="text-gray-600">تتبع تقدمك وأدائك الشخصي</p>
        </div>

        {/* Overall Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              نظرة عامة على التقدم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{overallProgress}%</div>
                <p className="text-gray-600">التقدم العام</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{sessions.filter(s => s.status === 'completed').length}</div>
                <p className="text-gray-600">جلسة مكتملة</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{courses.length}</div>
                <p className="text-gray-600">دورة نشطة</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">{testResults.length}</div>
                <p className="text-gray-600">اختبار مكتمل</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Test Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                نتائج الاختبارات النفسية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testResults.map((test) => (
                  <div key={test.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {test.testType === 'marital-satisfaction' ? 'اختبار الرضا الزواجي' :
                           test.testType === 'emotional-intelligence' ? 'اختبار الذكاء العاطفي' :
                           test.testType === 'stress-management' ? 'اختبار إدارة الضغوط' : test.testType}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {new Date(test.completedAt).toLocaleDateString('ar-DZ')}
                        </p>
                      </div>
                      <Badge variant={test.score >= 80 ? 'default' : test.score >= 60 ? 'secondary' : 'destructive'}>
                        {test.score}%
                      </Badge>
                    </div>
                    <Progress value={test.score} className="h-2" />
                  </div>
                ))}
                {testResults.length === 0 && (
                  <p className="text-center text-gray-500 py-8">لم تكمل أي اختبارات بعد</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Session History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                سجل الجلسات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessions.slice(0, 5).map((session) => (
                  <div key={session.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{session.date}</p>
                        <p className="text-sm text-gray-600">{session.time} - {session.duration} دقيقة</p>
                        {session.notes && (
                          <p className="text-sm text-gray-700 mt-1">{session.notes}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          session.status === 'completed' ? 'default' :
                          session.status === 'confirmed' ? 'secondary' : 'outline'
                        }>
                          {session.status === 'completed' ? 'مكتملة' :
                           session.status === 'confirmed' ? 'مؤكدة' : 'مجدولة'}
                        </Badge>
                        {session.rating && (
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm ml-1">{session.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {sessions.length === 0 && (
                  <p className="text-center text-gray-500 py-8">لا توجد جلسات في السجل</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Progress */}
        {courses.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                تقدم الدورات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <div key={course.id} className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">{course.title}</h4>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">التقدم</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                    <p className="text-xs text-gray-500 mt-2">المدة: {course.duration}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Reports;