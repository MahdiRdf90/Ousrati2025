import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import { 
  Clock, Users, Star, ArrowRight, ArrowLeft, Play, 
  CheckCircle, Calendar, Award, BookOpen, Video,
  Download, MessageCircle, Share2, Heart, Lock,
  FileText, Pause, Volume2, Maximize, Settings
} from 'lucide-react';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const courses = [
    {
      id: 1,
      title: 'إعداد ما قبل الزواج',
      description: 'دورة شاملة للتحضير لحياة زوجية ناجحة ومستقرة',
      fullDescription: 'هذه الدورة المتخصصة تهدف إلى إعداد الأزواج المقبلين على الزواج بشكل شامل ومتكامل. تغطي الدورة جميع الجوانب الأساسية للحياة الزوجية من التواصل الفعال إلى إدارة الخلافات والتخطيط المالي.',
      duration: '4 أسابيع',
      totalHours: '16 ساعة',
      participants: 245,
      rating: 4.8,
      reviews: 89,
      price: 5000,
      originalPrice: 7000,
      level: 'مبتدئ',
      instructor: {
        name: 'د. أمينة بن علي',
        title: 'أخصائية علم النفس الأسري',
        experience: '15 سنة خبرة',
        image: '/placeholder.svg',
        rating: 4.9,
        students: 1200,
        bio: 'د. أمينة بن علي هي أخصائية علم النفس الأسري مع أكثر من 15 سنة من الخبرة في مجال الإرشاد الأسري والزواجي. حاصلة على دكتوراه في علم النفس الإكلينيكي وقد ساعدت المئات من الأزواج في بناء علاقات صحية ومستقرة.'
      },
      image: '/placeholder.svg',
      trailer: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      topics: [
        'فهم التوقعات الزوجية',
        'مهارات التواصل الفعال',
        'إدارة الخلافات',
        'التخطيط المالي للأسرة',
        'الأدوار والمسؤوليات',
        'بناء الثقة والاحترام المتبادل'
      ],
      curriculum: [
        {
          week: 1,
          title: 'أسس الحياة الزوجية',
          lessons: [
            { 
              id: 1,
              title: 'مقدمة عن الزواج الناجح', 
              duration: '45 دقيقة', 
              type: 'video',
              videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
              description: 'تعرف على المبادئ الأساسية للزواج الناجح',
              resources: ['ملف PDF: دليل الزواج الناجح', 'ورقة عمل: تحديد الأهداف']
            },
            { 
              id: 2,
              title: 'فهم التوقعات المتبادلة', 
              duration: '30 دقيقة', 
              type: 'video',
              videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
              description: 'كيفية وضع توقعات واقعية ومشتركة',
              resources: ['استبيان التوقعات', 'دليل المناقشة']
            },
            { 
              id: 3,
              title: 'تمرين تطبيقي: تحديد الأهداف', 
              duration: '20 دقيقة', 
              type: 'exercise',
              description: 'تمرين عملي لتحديد أهداف العلاقة',
              resources: ['ورقة عمل تفاعلية']
            },
            { 
              id: 4,
              title: 'اختبار الأسبوع الأول', 
              duration: '15 دقيقة', 
              type: 'quiz',
              description: 'اختبار لتقييم فهمك للمفاهيم الأساسية',
              questions: 10
            }
          ]
        },
        {
          week: 2,
          title: 'مهارات التواصل',
          lessons: [
            { 
              id: 5,
              title: 'أساسيات التواصل الفعال', 
              duration: '40 دقيقة', 
              type: 'video',
              videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
              description: 'تعلم مهارات التواصل الأساسية',
              resources: ['دليل التواصل الفعال', 'قائمة مراجعة المهارات']
            },
            { 
              id: 6,
              title: 'لغة الجسد والتعبير غير اللفظي', 
              duration: '35 دقيقة', 
              type: 'video',
              videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
              description: 'فهم لغة الجسد في التواصل الزوجي',
              resources: ['دليل لغة الجسد', 'تمارين تطبيقية']
            },
            { 
              id: 7,
              title: 'ورشة عملية: تمارين التواصل', 
              duration: '30 دقيقة', 
              type: 'workshop',
              description: 'تمارين عملية لتحسين التواصل',
              resources: ['دليل التمارين', 'سيناريوهات للتطبيق']
            },
            { 
              id: 8,
              title: 'تقييم مهارات التواصل', 
              duration: '20 دقيقة', 
              type: 'assessment',
              description: 'تقييم شامل لمهارات التواصل المكتسبة',
              questions: 15
            }
          ]
        }
      ],
      features: [
        'شهادة إتمام معتمدة',
        'دعم مباشر من المدرب',
        'مجموعة دردشة خاصة',
        'مواد تحميل إضافية',
        'جلسات أسئلة وأجوبة مباشرة',
        'ضمان استرداد المال لمدة 30 يوم'
      ],
      requirements: [
        'الرغبة في تطوير الحياة الزوجية',
        'توفر وقت للدراسة (3 ساعات أسبوعياً)',
        'اتصال بالإنترنت مستقر'
      ],
      targetAudience: [
        'المقبلون على الزواج',
        'المتزوجون حديثاً',
        'من يريد تحسين علاقته الزوجية'
      ]
    }
  ];

  const course = courses.find(c => c.id === parseInt(courseId || '1'));

  const totalLessons = course?.curriculum.reduce((total, week) => total + week.lessons.length, 0) || 0;

  useEffect(() => {
    if (completedLessons.length > 0) {
      const progressPercentage = (completedLessons.length / totalLessons) * 100;
      setProgress(progressPercentage);
    }
  }, [completedLessons, totalLessons]);

  useEffect(() => {
    const savedProgress = localStorage.getItem(`course_${courseId}_progress`);
    const savedEnrollment = localStorage.getItem(`course_${courseId}_enrolled`);
    const savedFavorite = localStorage.getItem(`course_${courseId}_favorite`);
    
    if (savedProgress) {
      setCompletedLessons(JSON.parse(savedProgress));
    }
    if (savedEnrollment) {
      setIsEnrolled(JSON.parse(savedEnrollment));
    }
    if (savedFavorite) {
      setIsFavorite(JSON.parse(savedFavorite));
    }
  }, [courseId]);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">الدورة غير موجودة</h1>
          <Button onClick={() => navigate('/courses')}>العودة للدورات</Button>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    setIsEnrolled(true);
    localStorage.setItem(`course_${courseId}_enrolled`, 'true');
    toast({
      title: "تم التسجيل بنجاح! 🎉",
      description: "يمكنك الآن البدء في متابعة الدورة والوصول لجميع المحتويات.",
    });
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    localStorage.setItem(`course_${courseId}_favorite`, JSON.stringify(!isFavorite));
    toast({
      title: isFavorite ? "تم إزالة الدورة من المفضلة" : "تم إضافة الدورة للمفضلة ❤️",
      description: isFavorite ? "لن تظهر الدورة في قائمة المفضلة" : "يمكنك الوصول للدورة بسهولة من المفضلة",
    });
  };

  const handleCompleteLesson = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      const newCompleted = [...completedLessons, lessonId];
      setCompletedLessons(newCompleted);
      localStorage.setItem(`course_${courseId}_progress`, JSON.stringify(newCompleted));
      toast({
        title: "تم إنهاء الدرس! ✅",
        description: "تقدمك في الدورة يتم حفظه تلقائياً.",
      });
    }
  };

  const handlePlayVideo = (lesson: any) => {
    if (!isEnrolled) {
      toast({
        title: "يجب التسجيل أولاً",
        description: "سجل في الدورة للوصول إلى جميع الفيديوهات والمحتويات.",
        variant: "destructive"
      });
      return;
    }

    setSelectedVideo(lesson);
    setShowVideoModal(true);
    setIsVideoPlaying(true);
  };

  const handleDownloadResources = () => {
    if (!isEnrolled) {
      toast({
        title: "يجب التسجيل أولاً",
        description: "سجل في الدورة للوصول إلى جميع المواد التعليمية.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "جاري التحميل... 📥",
      description: "سيتم تحميل جميع المواد التعليمية للدورة.",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: course.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "تم نسخ الرابط! 🔗",
        description: "يمكنك الآن مشاركة الدورة مع الآخرين.",
      });
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'quiz': case 'assessment': return <CheckCircle className="h-4 w-4" />;
      case 'exercise': case 'workshop': return <BookOpen className="h-4 w-4" />;
      default: return <Play className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6 text-sm text-gray-600">
          <button onClick={() => navigate('/courses')} className="hover:text-purple-600 transition-colors">
            الدورات
          </button>
          <ArrowLeft className="h-4 w-4 mx-2" />
          <span>{course.title}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{course.level}</Badge>
                <Badge variant="outline">{course.duration}</Badge>
                {isEnrolled && (
                  <Badge className="bg-green-500 hover:bg-green-600">مسجل</Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{course.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{course.fullDescription}</p>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current ml-1" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-gray-600 mr-1">({course.reviews} تقييم)</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 ml-1" />
                  <span>{course.participants} طالب</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 ml-1" />
                  <span>{course.totalHours}</span>
                </div>
              </div>

              {/* Course Video Preview */}
              <div className="relative mb-6">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-purple-600 hover:bg-gray-100"
                    onClick={() => handlePlayVideo({ title: 'مقدمة الدورة', videoUrl: course.trailer })}
                  >
                    <Play className="h-5 w-5 ml-2" />
                    مشاهدة المقدمة
                  </Button>
                </div>
              </div>
            </div>

            {/* Course Tabs */}
            <Tabs defaultValue="curriculum" className="bg-white rounded-lg shadow-sm">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="curriculum">المنهج</TabsTrigger>
                <TabsTrigger value="instructor">المدرب</TabsTrigger>
                <TabsTrigger value="reviews">التقييمات</TabsTrigger>
                <TabsTrigger value="details">التفاصيل</TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum" className="p-6">
                <h3 className="text-xl font-bold mb-4">محتوى الدورة ({totalLessons} درس)</h3>
                <div className="space-y-4">
                  {course.curriculum.map((week, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">الأسبوع {week.week}: {week.title}</CardTitle>
                        <CardDescription>
                          {week.lessons.length} دروس • {week.lessons.reduce((total, lesson) => {
                            const duration = parseInt(lesson.duration);
                            return total + duration;
                          }, 0)} دقيقة
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {week.lessons.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                              <div className="flex items-center flex-1">
                                {getLessonIcon(lesson.type)}
                                <div className="mr-3 flex-1">
                                  <div className="font-medium">{lesson.title}</div>
                                  {lesson.description && (
                                    <div className="text-sm text-gray-600 mt-1">{lesson.description}</div>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600">{lesson.duration}</span>
                                {!isEnrolled && lesson.type === 'video' && (
                                  <Lock className="h-4 w-4 text-gray-400" />
                                )}
                                {isEnrolled && (
                                  <div className="flex items-center gap-2">
                                    {lesson.type === 'video' && (
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        onClick={() => handlePlayVideo(lesson)}
                                      >
                                        <Play className="h-3 w-3 ml-1" />
                                        تشغيل
                                      </Button>
                                    )}
                                    {completedLessons.includes(lesson.id) ? (
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleCompleteLesson(lesson.id)}
                                      >
                                        إنهاء
                                      </Button>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="instructor" className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <img 
                    src={course.instructor.image} 
                    alt={course.instructor.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{course.instructor.name}</h3>
                    <p className="text-gray-600 mb-2">{course.instructor.title}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{course.instructor.experience}</span>
                      <span>⭐ {course.instructor.rating}</span>
                      <span>{course.instructor.students} طالب</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{course.instructor.bio}</p>
                {isEnrolled && (
                  <Button variant="outline">
                    <MessageCircle className="h-4 w-4 ml-2" />
                    راسل المدرب
                  </Button>
                )}
              </TabsContent>

              <TabsContent value="reviews" className="p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{course.rating}</div>
                      <div className="flex items-center justify-center">
                        {[1,2,3,4,5].map(star => (
                          <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">{course.reviews} تقييم</div>
                    </div>
                    <div className="flex-1">
                      {[5,4,3,2,1].map(rating => (
                        <div key={rating} className="flex items-center gap-2 mb-1">
                          <span className="text-sm w-4">{rating}</span>
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <Progress value={rating === 5 ? 70 : rating === 4 ? 20 : 5} className="flex-1 h-2" />
                          <span className="text-sm text-gray-600 w-8">{rating === 5 ? '70%' : rating === 4 ? '20%' : '5%'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'أحمد محمد', rating: 5, comment: 'دورة رائعة ومفيدة جداً، استفدت منها كثيراً في تحسين علاقتي الزوجية.', date: '2024-01-15' },
                    { name: 'فاطمة علي', rating: 5, comment: 'المحتوى ممتاز والمدربة متمكنة. أنصح بها بشدة.', date: '2024-01-10' },
                    { name: 'سارة أحمد', rating: 4, comment: 'دورة جيدة ولكن كنت أتمنى المزيد من التمارين العملية.', date: '2024-01-08' }
                  ].map((review, index) => (
                    <div key={index} className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{review.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>

                {isEnrolled && (
                  <div className="mt-6 p-4 border rounded-lg">
                    <h4 className="font-bold mb-2">اكتب تقييمك</h4>
                    <div className="flex items-center gap-2 mb-3">
                      {[1,2,3,4,5].map(star => (
                        <Star key={star} className="h-5 w-5 text-gray-300 hover:text-yellow-400 cursor-pointer" />
                      ))}
                    </div>
                    <textarea 
                      placeholder="شاركنا رأيك في الدورة..."
                      className="w-full p-3 border rounded-lg resize-none"
                      rows={3}
                    />
                    <Button className="mt-2">نشر التقييم</Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="details" className="p-6 space-y-6">
                <div>
                  <h4 className="font-bold mb-3">ما ستتعلمه</h4>
                  <ul className="space-y-2">
                    {course.topics.map((topic, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-3">متطلبات الدورة</h4>
                  <ul className="space-y-2">
                    {course.requirements.map((req, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-blue-500 ml-2" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-3">لمن هذه الدورة</h4>
                  <ul className="space-y-2">
                    {course.targetAudience.map((audience, index) => (
                      <li key={index} className="flex items-center">
                        <Users className="h-4 w-4 text-purple-500 ml-2" />
                        {audience}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-purple-600">
                        {course.price.toLocaleString()} دج
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        {course.originalPrice.toLocaleString()} دج
                      </span>
                    </div>
                    <Badge variant="destructive" className="mb-4">
                      خصم 30%
                    </Badge>
                  </div>

                  {!isEnrolled ? (
                    <div className="space-y-3">
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={handleEnroll}
                      >
                        سجل الآن
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={handleToggleFavorite}
                      >
                        <Heart className={`h-4 w-4 ml-2 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                        {isFavorite ? 'إزالة من المفضلة' : 'أضف للمفضلة'}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button className="w-full" size="lg">
                        <Play className="h-4 w-4 ml-2" />
                        متابعة التعلم
                      </Button>
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-2">تقدمك في الدورة</div>
                        <Progress value={progress} className="mb-2" />
                        <div className="text-sm font-medium">{Math.round(progress)}% مكتمل</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {completedLessons.length} من {totalLessons} دروس
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-4 mt-6">
                    <h4 className="font-bold mb-3">تشمل هذه الدورة:</h4>
                    <ul className="space-y-2 text-sm">
                      {course.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-4 mt-6">
                    <div className="flex items-center justify-center gap-4">
                      <Button variant="outline" size="sm" onClick={handleShare}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleDownloadResources}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Courses */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">دورات ذات صلة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: 'مهارات التواصل الزوجي', price: '4000 دج', rating: 4.8 },
                      { title: 'التربية الإيجابية للأطفال', price: '6000 دج', rating: 4.7 }
                    ].map((relatedCourse, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                        <img src="/placeholder.svg" alt={relatedCourse.title} className="w-12 h-12 rounded object-cover" />
                        <div className="flex-1">
                          <h5 className="font-medium text-sm">{relatedCourse.title}</h5>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs">{relatedCourse.rating}</span>
                            </div>
                            <span className="text-xs font-medium text-purple-600">{relatedCourse.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
            <DialogDescription>
              {selectedVideo?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <video 
              controls 
              className="w-full rounded-lg"
              src={selectedVideo?.videoUrl}
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              onTimeUpdate={(e) => setCurrentVideoTime(e.currentTarget.currentTime)}
            >
              متصفحك لا يدعم تشغيل الفيديو
            </video>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCompleteLesson(selectedVideo?.id)}
                >
                  <CheckCircle className="h-4 w-4 ml-1" />
                  إنهاء الدرس
                </Button>
              </div>
              <div className="text-sm text-gray-600">
                {selectedVideo?.duration}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseDetail;
