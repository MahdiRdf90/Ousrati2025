import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { 
  Users, 
  Star, 
  MapPin, 
  Clock,
  BookOpen,
  Heart,
  TrendingUp,
  MessageCircle,
  Calendar,
  Award,
  Target,
  Filter,
  ThumbsUp,
  ThumbsDown,
  Sparkles
} from 'lucide-react';
import matchingService from '@/services/matchingService';
import Header from '@/components/Header';

const Recommendations = () => {
  const { user } = useAuth();
  const [recommendedProfessionals, setRecommendedProfessionals] = useState<any[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<any[]>([]);
  const [selectedProfessional, setSelectedProfessional] = useState<any>(null);
  const [feedbackDialog, setFeedbackDialog] = useState(false);
  const [feedback, setFeedback] = useState({ rating: 5, comment: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      
      // Obtenir les recommandations de professionnels
      const professionalMatches = matchingService.findBestMatches(user.id, 6);
      setRecommendedProfessionals(professionalMatches);
      
      // Obtenir les cours recommandés
      const courseRecommendations = matchingService.getRecommendedCourses(user.id);
      setRecommendedCourses(courseRecommendations);
      
      setLoading(false);
    }
  }, [user]);

  const handleBookSession = (professionalId: string) => {
    toast({
      title: "حجز جلسة",
      description: "سيتم توجيهك لصفحة الحجز...",
    });
    // Navigation vers la page de réservation avec le professionnel pré-sélectionné
  };

  const handleContactProfessional = (professionalId: string) => {
    toast({
      title: "تواصل مع المختص",
      description: "سيتم فتح نافذة المحادثة...",
    });
    // Navigation vers la messagerie avec le professionnel
  };

  const handleSubmitFeedback = () => {
    if (selectedProfessional && user?.id) {
      matchingService.recordMatchingFeedback(
        user.id,
        selectedProfessional.professionalId,
        feedback.rating,
        feedback.comment
      );
      
      toast({
        title: "شكراً لتقييمك",
        description: "سيساعدنا رأيك في تحسين خدمة التوصيات",
      });
      
      setFeedbackDialog(false);
      setFeedback({ rating: 5, comment: '' });
      setSelectedProfessional(null);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'توافق ممتاز';
    if (score >= 60) return 'توافق جيد';
    return 'توافق متوسط';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gold-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">جاري تحليل ملفك وإيجاد أفضل التوصيات...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gold-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">التوصيات الذكية</h1>
          </div>
          <p className="text-gray-600">
            بناءً على ملفك الشخصي واحتياجاتك، إليك أفضل المختصين والدورات المناسبة لك
          </p>
        </div>

        <Tabs defaultValue="professionals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="professionals" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              المختصون الموصى بهم
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              الدورات المقترحة
            </TabsTrigger>
          </TabsList>

          {/* التوصيات للمهنيين */}
          <TabsContent value="professionals">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProfessionals.map((match) => (
                <Card key={match.professionalId} className="card-hover border-2 hover:border-purple-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{match.professional.name}</CardTitle>
                          <p className="text-sm text-gray-600">{match.professional.specialization}</p>
                        </div>
                      </div>
                      <Badge className={`${getScoreColor(match.score)} border-0`}>
                        {match.score}% - {getScoreLabel(match.score)}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* معدل التوافق */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>معدل التوافق</span>
                        <span className="font-medium">{match.score}%</span>
                      </div>
                      <Progress value={match.score} className="h-2" />
                    </div>

                    {/* التفاصيل */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{match.professional.rating || 4.5}/5 ({Math.floor(Math.random() * 50) + 20} تقييم)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Award className="h-4 w-4 text-blue-500" />
                        <span>{match.professional.experienceYears || 5} سنوات خبرة</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 text-green-500" />
                        <span>{match.professional.location || 'الجزائر العاصمة'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Target className="h-4 w-4 text-purple-500" />
                        <span>{match.professional.pricePerSession || 2500} دج/جلسة</span>
                      </div>
                    </div>

                    {/* أسباب التوصية */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">لماذا نوصي به؟</h4>
                      <div className="space-y-1">
                        {match.reasons.slice(0, 3).map((reason, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-xs text-gray-600">{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* الإجراءات */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        className="flex-1" 
                        onClick={() => handleBookSession(match.professionalId)}
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        حجز جلسة
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleContactProfessional(match.professionalId)}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedProfessional(match);
                          setFeedbackDialog(true);
                        }}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {recommendedProfessionals.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد توصيات متاحة</h3>
                  <p className="text-gray-600 mb-4">يرجى إكمال ملفك الشخصي للحصول على توصيات مخصصة</p>
                  <Button variant="outline" onClick={() => window.location.href = '/profile'}>
                    إكمال الملف الشخصي
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* التوصيات للدورات */}
          <TabsContent value="courses">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedCourses.map((course) => (
                <Card key={course.id} className="card-hover">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-0">
                        {course.relevanceScore}% مناسب
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* تفاصيل الدورة */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{course.rating}/5</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{course.instructor}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Target className="h-4 w-4" />
                        <span>{course.price.toLocaleString()} دج</span>
                      </div>
                    </div>

                    {/* معدل الملاءمة */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>معدل الملاءمة</span>
                        <span className="font-medium">{course.relevanceScore}%</span>
                      </div>
                      <Progress value={course.relevanceScore} className="h-2" />
                    </div>

                    {/* أسباب التوصية */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">لماذا نوصي بها؟</h4>
                      <div className="space-y-1">
                        {course.reasons.map((reason: string, index: number) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-xs text-gray-600">{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* الإجراءات */}
                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1">
                        <BookOpen className="h-4 w-4 mr-1" />
                        التسجيل في الدورة
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {recommendedCourses.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد دورات مقترحة</h3>
                  <p className="text-gray-600">تحقق لاحقاً للحصول على دورات جديدة مناسبة لاحتياجاتك</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Dialog للتقييم */}
        <Dialog open={feedbackDialog} onOpenChange={setFeedbackDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>تقييم التوصية</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>هل كانت هذه التوصية مفيدة؟</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant={feedback.rating >= 4 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFeedback(prev => ({ ...prev, rating: 5 }))}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    مفيدة جداً
                  </Button>
                  <Button
                    variant={feedback.rating <= 2 ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => setFeedback(prev => ({ ...prev, rating: 1 }))}
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    غير مفيدة
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="comment">تعليقك (اختياري)</Label>
                <Textarea
                  id="comment"
                  value={feedback.comment}
                  onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="شاركنا رأيك لتحسين خدمة التوصيات..."
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleSubmitFeedback} className="flex-1">
                  إرسال التقييم
                </Button>
                <Button variant="outline" onClick={() => setFeedbackDialog(false)} className="flex-1">
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Recommendations;