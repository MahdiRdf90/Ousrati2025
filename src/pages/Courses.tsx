import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { TestTube, Clock, Users, Star, Calendar, CheckCircle, ArrowRight, Heart, Award, Search, Filter, SortAsc } from 'lucide-react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useData } from '@/data/DataProvider';

const Courses = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { courses, enrollInCourse } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [filterLevel, setFilterLevel] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  // Load user data from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('user_favorites');
    const savedEnrolled = localStorage.getItem('user_enrolled');
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    if (savedEnrolled) {
      setEnrolledCourses(JSON.parse(savedEnrolled));
    }
  }, []);

  // Séparer les cours pour utilisateurs et professionnels
  const userCourses = courses.filter(course => course.category !== 'professional');
  const professionalCourses = courses.filter(course => course.category === 'professional');

  const handleToggleFavorite = (courseId: string) => {
    const newFavorites = favorites.includes(courseId)
      ? favorites.filter(id => id !== courseId)
      : [...favorites, courseId];
    
    setFavorites(newFavorites);
    localStorage.setItem('user_favorites', JSON.stringify(newFavorites));
    
    toast({
      title: favorites.includes(courseId) ? "تم إزالة الدورة من المفضلة" : "تم إضافة الدورة للمفضلة ❤️",
      description: favorites.includes(courseId) ? "لن تظهر الدورة في قائمة المفضلة" : "يمكنك الوصول للدورة بسهولة من المفضلة",
    });
  };

  const handleEnrollCourse = (courseId: string) => {
    if (!user) {
      toast({
        title: "يجب تسجيل الدخول",
        description: "قم بتسجيل الدخول أولاً للتسجيل في الدورة",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    if (!enrolledCourses.includes(courseId)) {
      // استخدام الدالة المتزامنة من DataProvider
      enrollInCourse(courseId, user.id);
      
      const newEnrolled = [...enrolledCourses, courseId];
      setEnrolledCourses(newEnrolled);
      localStorage.setItem('user_enrolled', JSON.stringify(newEnrolled));
      localStorage.setItem(`course_${courseId}_enrolled`, 'true');
      
      toast({
        title: "تم التسجيل بنجاح! 🎉",
        description: "يمكنك الآن البدء في متابعة الدورة والوصول لجميع المحتويات.",
      });
    }
    navigate(`/course/${courseId}`);
  };

  const filterAndSortCourses = (coursesToFilter: any[]) => {
    let filtered = coursesToFilter;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some((tag: string) => tag.includes(searchTerm))
      );
    }

    // Level filter
    if (filterLevel !== 'all') {
      filtered = filtered.filter(course => course.level === filterLevel);
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.newCourse ? 1 : 0) - (a.newCourse ? 1 : 0));
        break;
      default: // popular
        filtered.sort((a, b) => b.participants.length - a.participants.length);
    }

    return filtered;
  };

  const CourseCard = ({ course, isProfessional = false }: { course: any; isProfessional?: boolean }) => (
    <Card className="h-full card-hover relative overflow-hidden group">
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          {course.bestseller && (
            <Badge className="bg-orange-500 hover:bg-orange-600">
              الأكثر مبيعاً
            </Badge>
          )}
          {course.newCourse && (
            <Badge className="bg-green-500 hover:bg-green-600">
              جديد
            </Badge>
          )}
          {course.certificate && (
            <Badge className="bg-blue-500 hover:bg-blue-600">
              <Award className="h-3 w-3 ml-1" />
              شهادة معتمدة
            </Badge>
          )}
          {enrolledCourses.includes(course.id) && (
            <Badge className="bg-purple-500 hover:bg-purple-600">
              مسجل
            </Badge>
          )}
        </div>
        {course.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
            خصم {course.discount}%
          </div>
        )}
        <button
          onClick={() => handleToggleFavorite(course.id)}
          className="absolute bottom-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
        >
          <Heart className={`h-4 w-4 ${favorites.includes(course.id) ? 'fill-current text-red-500' : 'text-gray-600'}`} />
        </button>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary">{course.level}</Badge>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 ml-1" />
            {course.totalHours} ساعة
          </div>
        </div>
        <CardTitle className="text-lg line-clamp-2 h-14 hover:text-purple-600 transition-colors">
          {course.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 h-10">{course.description}</CardDescription>
        <div className="text-sm text-gray-600">المدرب: {course.instructor}</div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <Users className="h-4 w-4 ml-1" />
              {course.participants?.length || 0} طالب
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current ml-1" />
              <span className="font-medium">{course.rating}</span>
              <span className="text-xs text-gray-500 mr-1">({course.reviews})</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">
                {course.price.toLocaleString()} دج
              </span>
              {course.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {course.originalPrice.toLocaleString()} دج
                </span>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">ما ستتعلمه:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              {course.topics.slice(0, 3).map((topic: string, index: number) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-3 w-3 text-green-500 ml-1 flex-shrink-0" />
                  <span className="line-clamp-1">{topic}</span>
                </li>
              ))}
              {course.topics.length > 3 && (
                <li className="text-gray-500">
                  +{course.topics.length - 3} موضوع آخر
                </li>
              )}
            </ul>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {course.tags.slice(0, 3).map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button 
              className="flex-1"
              onClick={() => enrolledCourses.includes(course.id) 
                ? navigate(`/course/${course.id}`)
                : handleEnrollCourse(course.id)
              }
            >
              {enrolledCourses.includes(course.id) ? 'متابعة التعلم' : 'التسجيل الآن'}
              <ArrowRight className="h-4 w-4 mr-2" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate(`/course/${course.id}`)}
            >
              <CheckCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const filteredUserCourses = filterAndSortCourses(userCourses);
  const filteredProfessionalCourses = filterAndSortCourses(professionalCourses);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 bg-gradient-to-r from-purple-600 to-gold-600 text-white rounded-2xl p-8">
          <h1 className="text-4xl font-bold mb-4">الدورات والتكوينات</h1>
          <p className="text-xl mb-6 opacity-90">
            طور مهاراتك وزد معرفتك مع دوراتنا المتخصصة
          </p>
          <div className="flex justify-center gap-8 text-sm">
            <div className="flex items-center">
              <Users className="h-5 w-5 ml-2" />
              +1000 طالب
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 ml-2" />
              تقييم 4.8/5
            </div>
            <div className="flex items-center">
              <Award className="h-5 w-5 ml-2" />
              شهادات معتمدة
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="ابحث عن الدورات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">الأكثر شعبية</SelectItem>
                  <SelectItem value="rating">الأعلى تقييماً</SelectItem>
                  <SelectItem value="price-low">السعر: من الأقل</SelectItem>
                  <SelectItem value="price-high">السعر: من الأعلى</SelectItem>
                  <SelectItem value="newest">الأحدث</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="مستوى الصعوبة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المستويات</SelectItem>
                  <SelectItem value="مبتدئ">مبتدئ</SelectItem>
                  <SelectItem value="متوسط">متوسط</SelectItem>
                  <SelectItem value="متقدم">متقدم</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="users" className="flex items-center">
              <Users className="h-4 w-4 ml-2" />
              للمستخدمين ({filteredUserCourses.length} دورة)
            </TabsTrigger>
            <TabsTrigger value="professionals" className="flex items-center">
              <TestTube className="h-4 w-4 ml-2" />
              للمهنيين ({filteredProfessionalCourses.length} دورة)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">دورات للمستخدمين</h2>
                  <p className="text-gray-600">
                    دورات مصممة خصيصاً للأزواج والعائلات لتطوير العلاقات الأسرية
                  </p>
                </div>
                {favorites.length > 0 && (
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 ml-2 text-red-500" />
                    المفضلة ({favorites.length})
                  </Button>
                )}
              </div>
              
              {filteredUserCourses.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredUserCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">لم يتم العثور على دورات تطابق بحثك</p>
                  <Button onClick={() => {setSearchTerm(''); setFilterLevel('all');}}>
                    إعادة تعيين البحث
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="professionals">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">تكوينات للمهنيين</h2>
                  <p className="text-gray-600">
                    برامج تدريبية متقدمة للأخصائيين النفسيين والمرشدين
                  </p>
                </div>
              </div>
              
              {filteredProfessionalCourses.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredProfessionalCourses.map((course) => (
                    <CourseCard key={course.id} course={course} isProfessional={true} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">لم يتم العثور على دورات تطابق بحثك</p>
                  <Button onClick={() => {setSearchTerm(''); setFilterLevel('all');}}>
                    إعادة تعيين البحث
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* My Learning Section */}
        {enrolledCourses.length > 0 && (
          <section className="mt-16 bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              🎓 دوراتي ({enrolledCourses.length})
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {enrolledCourses.slice(0, 3).map(courseId => {
                const course = courses.find(c => c.id === courseId);
                if (!course) return null;
                
                return (
                  <div key={courseId} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={course.image} alt={course.title} className="w-12 h-12 rounded object-cover" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-1">{course.title}</h4>
                        <p className="text-xs text-gray-600">{course.instructor}</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>التقدم</span>
                        <span>25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => navigate(`/course/${courseId}`)}
                    >
                      متابعة التعلم
                    </Button>
                  </div>
                );
              })}
            </div>
            {enrolledCourses.length > 3 && (
              <div className="text-center mt-6">
                <Button variant="outline">
                  عرض جميع دوراتي ({enrolledCourses.length})
                </Button>
              </div>
            )}
          </section>
        )}

        {/* Features Section */}
        <section className="mt-16 bg-white rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            🏅 لماذا تختار دوراتنا؟
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">مرونة كاملة</h4>
              <p className="text-sm text-gray-600">تعلم في الوقت المناسب لك</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">شهادات معتمدة</h4>
              <p className="text-sm text-gray-600">احصل على شهادة إتمام رسمية</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">دعم مستمر</h4>
              <p className="text-sm text-gray-600">متابعة ودعم من الخبراء</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">جودة عالية</h4>
              <p className="text-sm text-gray-600">محتوى من خبراء متخصصين</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 bg-gradient-to-r from-purple-600 to-gold-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">🎯 ابدأ رحلة التطوير اليوم</h3>
          <p className="text-lg mb-6 opacity-90">
            انضم إلى آلاف الطلاب الذين طوروا حياتهم الأسرية معنا
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              استكشف الدورات
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              تحدث مع مستشار
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Courses;