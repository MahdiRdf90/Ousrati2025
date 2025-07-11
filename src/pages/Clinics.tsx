import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import { MapPin, Phone, Clock, Star, Users, Video, MessageSquare, Mic, Calendar, CheckCircle, TestTube } from 'lucide-react';

const Clinics = () => {
  const [selectedCommunicationMethod, setSelectedCommunicationMethod] = useState('');

  const communicationMethods = [
    { 
      value: 'video', 
      label: 'مكالمة فيديو', 
      icon: Video, 
      description: 'التواصل المرئي المباشر مع المختص',
      color: 'bg-blue-500'
    },
    { 
      value: 'audio', 
      label: 'مكالمة صوتية', 
      icon: Mic, 
      description: 'مكالمة صوتية فقط للراحة أكثر',
      color: 'bg-green-500'
    },
    { 
      value: 'chat', 
      label: 'دردشة نصية', 
      icon: MessageSquare, 
      description: 'تبادل الرسائل النصية مع المختص',
      color: 'bg-purple-500'
    },
  ];

  const professionalCourses = [
    {
      id: 1,
      title: 'دورة تأهيل مرشدين أسريين وتربويين',
      description: 'برنامج شامل لتأهيل المرشدين في العلاج الأسري والتربوي',
      duration: '12 أسبوع',
      participants: 45,
      rating: 4.9,
      price: 25000,
      level: 'متقدم',
      instructor: 'بروف. أحمد بن سعيد',
      modules: [
        'أسس الإرشاد الأسري',
        'تقنيات التواصل العلاجي',
        'إدارة الأزمات الأسرية',
        'الممارسة العملية'
      ]
    },
    {
      id: 2,
      title: 'تربية وطفولة - مرشد تربوي متخصص',
      description: 'تكوين متخصص في مجال التربية وعلم نفس الطفل',
      duration: '10 أسابيع',
      participants: 67,
      rating: 4.8,
      price: 20000,
      level: 'متوسط',
      instructor: 'د. فاطمة زهراء',
      modules: [
        'علم نفس الطفل التطوري',
        'تقنيات التربية الحديثة',
        'التعامل مع المشاكل السلوكية',
        'بناء برامج تربوية'
      ]
    },
    {
      id: 3,
      title: 'مرشد تربوي لفئة المراهقين',
      description: 'تخصص في التعامل مع المراهقين وتحدياتهم النفسية',
      duration: '8 أسابيع',
      participants: 52,
      rating: 4.7,
      price: 18000,
      level: 'متوسط',
      instructor: 'د. محمد الصالح',
      modules: [
        'فهم سيكولوجية المراهق',
        'إدارة سلوكيات المراهقين',
        'التواصل مع الأهل',
        'برامج التوجيه المهني'
      ]
    },
    {
      id: 4,
      title: 'مرشد علاقات زوجية أسرية',
      description: 'تخصص في العلاج الزوجي وتقوية الروابط الأسرية',
      duration: '14 أسبوع',
      participants: 38,
      rating: 4.9,
      price: 28000,
      level: 'متقدم',
      instructor: 'د. سعاد بوعلام',
      modules: [
        'نظريات العلاج الزوجي',
        'تقنيات حل النزاعات',
        'بناء التواصل الفعال',
        'العلاج الأسري الجماعي'
      ]
    }
  ];

  const clinics = [
    {
      id: 1,
      name: 'عيادة الأمل للإرشاد الأسري',
      address: 'حي بن عكنون، الجزائر العاصمة',
      phone: '0551234567',
      hours: 'السبت - الخميس: 9:00 - 17:00',
      rating: 4.8,
      specialists: ['د. أمينة بن علي', 'د. محمد الصالح'],
      services: ['استشارات زوجية', 'علاج أسري', 'إرشاد تربوي'],
      image: '/lovable-uploads/378a1f74-6902-4491-8bb1-99340773d67e.jpg'
    },
    {
      id: 2,
      name: 'مركز السعادة للاستشارات النفسية',
      address: 'باب الزوار، الجزائر العاصمة',
      phone: '0770112233',
      hours: 'الأحد - الأربعاء: 8:00 - 16:00',
      rating: 4.5,
      specialists: ['د. فاطمة زهراء'],
      services: ['علاج القلق', 'علاج الاكتئاب', 'تطوير الذات'],
      image: '/lovable-uploads/4e949354-9846-4949-9458-f0151169f899.png'
    },
    {
      id: 3,
      name: 'عيادة الراحة النفسية',
      address: 'وهران',
      phone: '0661445566',
      hours: 'الاثنين - الجمعة: 10:00 - 18:00',
      rating: 4.7,
      specialists: ['د. عبد الرحمن'],
      services: ['علاج الإدمان', 'علاج الوسواس القهري', 'الدعم النفسي'],
      image: '/lovable-uploads/69680994-c969-4951-959a-9c99195ca491.jpg'
    },
  ];

  const CommunicationMethodSelector = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Video className="h-5 w-5 ml-2" />
          اختر وسيلة التواصل
        </CardTitle>
        <CardDescription>حدد الطريقة المفضلة للتواصل مع الأخصائيين</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {communicationMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.value}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedCommunicationMethod === method.value
                    ? 'border-primary bg-primary/5 transform scale-105'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedCommunicationMethod(method.value)}
              >
                <div className={`${method.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{method.label}</h3>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  const ProfessionalCourseCard = ({ course }: { course: any }) => (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
          <Badge variant="secondary">{course.level}</Badge>
        </div>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="h-4 w-4 ml-1" />
              {course.duration}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 ml-1" />
              {course.participants} مشترك
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current ml-1" />
              <span className="text-sm font-medium">{course.rating}</span>
            </div>
            <div className="text-lg font-bold text-primary">
              {course.price.toLocaleString()} دج
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-2">المدرب: {course.instructor}</p>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-700">محاور الدورة:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                {course.modules.slice(0, 3).map((module, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 ml-1" />
                    {module}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <Button className="w-full">
            التسجيل في الدورة
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* About Us Section */}
        <section className="relative mb-12 rounded-lg overflow-hidden">
          <div className="relative">
            <img 
              src="/lovable-uploads/cedec783-ab84-43b4-81a0-83001063b5ab.png" 
              alt="من نحن" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2 className="text-4xl font-black mb-4 text-shadow-lg">من نحن؟</h2>
                <p className="text-lg font-bold max-w-4xl mx-auto leading-relaxed text-shadow">
                  "أسرتي" هي منصة جزائرية رقمية متخصصة في الإرشاد والعلاج الزواجي والأسري، 
                  تهدف إلى بناء أسر أكثر وعيًا وتماسكًا في ظل التحديات المعاصرة
                </p>
              </div>
            </div>
          </div>
        </section>

        <CommunicationMethodSelector />

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">العيادات والدورات المهنية</h1>
          <p className="text-lg text-gray-600">
            اكتشف شبكتنا من العيادات الشريكة والدورات المتخصصة للمهنيين
          </p>
        </div>

        <Tabs defaultValue="clinics" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="clinics" className="flex items-center">
              <MapPin className="h-4 w-4 ml-2" />
              العيادات الشريكة
            </TabsTrigger>
            <TabsTrigger value="professional-courses" className="flex items-center">
              <TestTube className="h-4 w-4 ml-2" />
              دورات المهنيين
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clinics">
            <div className="grid md:grid-cols-2 gap-6">
              {clinics.map((clinic) => (
                <Card key={clinic.id} className="card-hover">
                  <CardHeader>
                    <CardTitle className="text-lg">{clinic.name}</CardTitle>
                    <CardDescription>{clinic.address}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <img
                      src={clinic.image}
                      alt={clinic.name}
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center mb-1">
                        <Phone className="h-4 w-4 ml-1" />
                        {clinic.phone}
                      </div>
                      <div className="flex items-center mb-1">
                        <Clock className="h-4 w-4 ml-1" />
                        {clinic.hours}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current ml-1" />
                        <span className="font-medium">{clinic.rating}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">المختصون:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {clinic.specialists.map((specialist, index) => (
                          <li key={index}>{specialist}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">الخدمات:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {clinic.services.map((service, index) => (
                          <li key={index}>{service}</li>
                        ))}
                      </ul>
                    </div>
                    <Button>حجز موعد</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="professional-courses">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">دورات تأهيل المهنيين</h2>
              <p className="text-gray-600">
                برامج تدريبية متقدمة لتأهيل المرشدين والأخصائيين في مختلف المجالات
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {professionalCourses.map((course) => (
                <ProfessionalCourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Clinics;
