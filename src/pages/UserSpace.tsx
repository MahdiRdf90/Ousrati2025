import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useData } from '@/data/DataProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { 
  Calendar, 
  Download, 
  Upload, 
  FileText, 
  Heart,
  TrendingUp,
  User,
  Clock,
  Star,
  StickyNote,
  BarChart3,
  Archive
} from 'lucide-react';
import { getUserById } from '@/data/testData';
import Header from '@/components/Header';

const UserSpace = () => {
  const { user } = useAuth();
  const { sessions, testResultsData, addSession, updateUser } = useData();
  const [userNotes, setUserNotes] = useState<any[]>([]);
  const [newNote, setNewNote] = useState('');
  const [userFiles, setUserFiles] = useState<any[]>([]);

  // Charger les données utilisateur
  useEffect(() => {
    if (user?.id) {
      // Charger les notes depuis localStorage
      const savedNotes = localStorage.getItem(`user_notes_${user.id}`);
      if (savedNotes) {
        setUserNotes(JSON.parse(savedNotes));
      }
      
      // Charger les fichiers depuis localStorage
      const savedFiles = localStorage.getItem(`user_files_${user.id}`);
      if (savedFiles) {
        setUserFiles(JSON.parse(savedFiles));
      }
    }
  }, [user]);

  const userSessions = sessions.filter(session => 
    session.clientId === user?.id || session.formateurId === user?.id
  );

  const completedSessions = userSessions.filter(session => 
    session.status === 'completed'
  );

  const upcomingSessions = userSessions.filter(session => 
    session.status === 'scheduled' || session.status === 'confirmed'
  );

  const userTests = testResultsData.filter(test => test.userId === user?.id);

  // Calculer les statistiques de progression
  const progressStats = {
    totalSessions: completedSessions.length,
    averageRating: completedSessions.length > 0 ? 
      Math.round(completedSessions.reduce((acc, s) => acc + (s.rating || 0), 0) / completedSessions.length * 10) / 10 : 0,
    completionRate: userSessions.length > 0 ? 
      Math.round((completedSessions.length / userSessions.length) * 100) : 0,
    improvementTrend: userTests.length > 1 ? 
      userTests[userTests.length - 1].score - userTests[0].score : 0
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note = {
        id: `note-${Date.now()}`,
        content: newNote,
        createdAt: new Date().toISOString(),
        userId: user?.id
      };
      
      const updatedNotes = [...userNotes, note];
      setUserNotes(updatedNotes);
      localStorage.setItem(`user_notes_${user?.id}`, JSON.stringify(updatedNotes));
      setNewNote('');
      
      toast({
        title: "تم إضافة الملاحظة",
        description: "تم حفظ ملاحظتك بنجاح"
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileData = {
        id: `file-${Date.now()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        userId: user?.id
      };
      
      const updatedFiles = [...userFiles, fileData];
      setUserFiles(updatedFiles);
      localStorage.setItem(`user_files_${user?.id}`, JSON.stringify(updatedFiles));
      
      toast({
        title: "تم رفع الملف",
        description: `تم رفع الملف ${file.name} بنجاح`
      });
    }
  };

  const handleDeleteNote = (noteId: string) => {
    const updatedNotes = userNotes.filter(note => note.id !== noteId);
    setUserNotes(updatedNotes);
    localStorage.setItem(`user_notes_${user?.id}`, JSON.stringify(updatedNotes));
    
    toast({
      title: "تم حذف الملاحظة",
      description: "تم حذف الملاحظة بنجاح"
    });
  };

  const handleDeleteFile = (fileId: string) => {
    const updatedFiles = userFiles.filter(file => file.id !== fileId);
    setUserFiles(updatedFiles);
    localStorage.setItem(`user_files_${user?.id}`, JSON.stringify(updatedFiles));
    
    toast({
      title: "تم حذف الملف",
      description: "تم حذف الملف بنجاح"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gold-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">مساحتي الشخصية</h1>
          <p className="text-gray-600">تتبع تقدمك وإدارة ملاحظاتك وملفاتك</p>
        </div>

        {/* Statistiques de progression */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{progressStats.totalSessions}</p>
              <p className="text-sm text-gray-600">جلسة مكتملة</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{progressStats.averageRating}</p>
              <p className="text-sm text-gray-600">متوسط التقييم</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{progressStats.completionRate}%</p>
              <p className="text-sm text-gray-600">معدل الإكمال</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {progressStats.improvementTrend > 0 ? '+' : ''}{progressStats.improvementTrend}%
              </p>
              <p className="text-sm text-gray-600">تحسن الأداء</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sessions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sessions">تاريخ الجلسات</TabsTrigger>
            <TabsTrigger value="notes">ملاحظاتي</TabsTrigger>
            <TabsTrigger value="files">ملفاتي</TabsTrigger>
            <TabsTrigger value="progress">تتبع التقدم</TabsTrigger>
          </TabsList>

          {/* تاريخ الجلسات */}
          <TabsContent value="sessions">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* الجلسات المكتملة */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Archive className="h-5 w-5 text-green-600" />
                    الجلسات المكتملة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {completedSessions.map((session) => {
                      const otherUser = getUserById(
                        session.clientId === user?.id ? session.formateurId : session.clientId
                      );
                      return (
                        <div key={session.id} className="p-4 bg-green-50 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium text-gray-900">{otherUser?.name}</p>
                              <p className="text-sm text-gray-600">{session.date} - {session.time}</p>
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < (session.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          {session.notes && (
                            <p className="text-sm text-gray-700 bg-white p-2 rounded mt-2">
                              {session.notes}
                            </p>
                          )}
                        </div>
                      );
                    })}
                    {completedSessions.length === 0 && (
                      <p className="text-center text-gray-500 py-8">لا توجد جلسات مكتملة</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* الجلسات القادمة */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    الجلسات القادمة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => {
                      const otherUser = getUserById(
                        session.clientId === user?.id ? session.formateurId : session.clientId
                      );
                      return (
                        <div key={session.id} className="p-4 bg-blue-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-900">{otherUser?.name}</p>
                              <p className="text-sm text-gray-600">{session.date} - {session.time}</p>
                            </div>
                            <Badge variant={session.status === 'confirmed' ? 'default' : 'secondary'}>
                              {session.status === 'confirmed' ? 'مؤكد' : 'مجدول'}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                    {upcomingSessions.length === 0 && (
                      <p className="text-center text-gray-500 py-8">لا توجد جلسات قادمة</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* الملاحظات الشخصية */}
          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <StickyNote className="h-5 w-5 text-purple-600" />
                  ملاحظاتي الشخصية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* إضافة ملاحظة جديدة */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Textarea
                      placeholder="اكتب ملاحظة جديدة..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="mb-3"
                    />
                    <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                      إضافة ملاحظة
                    </Button>
                  </div>

                  {/* عرض الملاحظات */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {userNotes.map((note) => (
                      <div key={note.id} className="p-4 bg-white border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm text-gray-500">
                            {new Date(note.createdAt).toLocaleDateString('ar-DZ')}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteNote(note.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            حذف
                          </Button>
                        </div>
                        <p className="text-gray-800">{note.content}</p>
                      </div>
                    ))}
                    {userNotes.length === 0 && (
                      <p className="text-center text-gray-500 py-8">لا توجد ملاحظات</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* إدارة الملفات */}
          <TabsContent value="files">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  ملفاتي المشتركة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* رفع ملف جديد */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Input
                        type="file"
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                        className="flex-1"
                      />
                      <Upload className="h-5 w-5 text-gray-500" />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      الملفات المسموحة: PDF, DOC, DOCX, TXT, JPG, PNG
                    </p>
                  </div>

                  {/* عرض الملفات */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {userFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-4 bg-white border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-600">
                              {Math.round(file.size / 1024)} KB - {new Date(file.uploadedAt).toLocaleDateString('ar-DZ')}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteFile(file.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            حذف
                          </Button>
                        </div>
                      </div>
                    ))}
                    {userFiles.length === 0 && (
                      <p className="text-center text-gray-500 py-8">لا توجد ملفات مرفوعة</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تتبع التقدم */}
          <TabsContent value="progress">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* نتائج الاختبارات */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    نتائج الاختبارات النفسية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userTests.map((test, index) => (
                      <div key={test.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-medium text-gray-900">{test.testType}</p>
                          <Badge variant={test.score >= 70 ? 'default' : 'secondary'}>
                            {test.score}%
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <Progress value={test.score} className="h-2" />
                          <p className="text-sm text-gray-600">
                            {new Date(test.completedAt).toLocaleDateString('ar-DZ')}
                          </p>
                        </div>
                      </div>
                    ))}
                    {userTests.length === 0 && (
                      <p className="text-center text-gray-500 py-8">لم تقم بإجراء أي اختبارات بعد</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* مؤشرات التقدم */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    مؤشرات التحسن
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">الرضا الزواجي</span>
                        <span className="text-sm text-gray-600">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                      <p className="text-xs text-green-600 mt-1">+12% من الشهر الماضي</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">مهارات التواصل</span>
                        <span className="text-sm text-gray-600">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <p className="text-xs text-green-600 mt-1">+8% من الشهر الماضي</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">إدارة الضغوط</span>
                        <span className="text-sm text-gray-600">68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                      <p className="text-xs text-green-600 mt-1">+15% من الشهر الماضي</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">الثقة بالنفس</span>
                        <span className="text-sm text-gray-600">72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                      <p className="text-xs text-green-600 mt-1">+5% من الشهر الماضي</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserSpace;