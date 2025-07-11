import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import FeatureCard from '@/components/FeatureCard';
import Header from '@/components/Header';
import { useLanguage } from '@/components/LanguageSelector';
import { Heart, Users, Calendar, TestTube, Building, Megaphone, Shield, Star, CheckCircle, Phone, Mail, MapPin, Video, MessageSquare, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();
  
  const targetAudience = [{
    title: 'العُزاب المقبلون على الزواج',
    description: '18+ سنة، إعداد لحياة زوجية ناجحة'
  }, {
    title: 'الأزواج الجدد',
    description: 'دعم في بداية المشوار الزوجي'
  }, {
    title: 'الأزواج الذين يعانون من مشاكل',
    description: 'حلول للمشاكل الزوجية من جميع الأعمار'
  }, {
    title: 'العائلات',
    description: 'استشارات نفسية وتربوية للأطفال'
  }, {
    title: 'المهنيون',
    description: 'أخصائيون نفسيون ومرشدون'
  }, {
    title: 'المؤسسات والجمعيات',
    description: 'خدمات مؤسسية متخصصة'
  }];
  const features = [{
    icon: Calendar,
    title: 'جلسات عن بعد',
    description: 'جلسات فردية وزوجية عبر الفيديو والصوت والرسائل'
  }, {
    icon: Video,
    title: 'مكالمات فيديو',
    description: 'جلسات مباشرة بالصوت والصورة للتفاعل المثلى'
  }, {
    icon: MessageSquare,
    title: 'رسائل نصية وصوتية',
    description: 'تواصل مرن عبر الرسائل النصية والصوتية'
  }, {
    icon: TestTube,
    title: 'اختبارات نفسية',
    description: 'مقاييس معتمدة للتقييم والتشخيص النفسي'
  }, {
    icon: Building,
    title: 'دورات تدريبية',
    description: 'للمستخدمين والأخصائيين النفسيين'
  }, {
    icon: Heart,
    title: 'دعم محلي',
    description: 'باللغة العربية والفرنسية والإنجليزية'
  }, {
    icon: Users,
    title: 'ذكاء اصطناعي',
    description: 'ربط ذكي مع المختص المناسب'
  }, {
    icon: Shield,
    title: 'خصوصية تامة',
    description: 'ضمان سرية جميع الاستشارات'
  }];
  const experts = [{
    name: 'د. أمينة بن علي',
    specialty: 'أخصائية نفسية',
    rating: 4.9,
    languages: 'العربية، الفرنسية، القبائلية',
    image: '/placeholder.svg?height=100&width=100&text=د.أمينة'
  }, {
    name: 'د. سارة محمد',
    specialty: 'مرشدة أسرية',
    rating: 4.8,
    languages: 'العربية، الإنجليزية، الشاوية',
    image: '/placeholder.svg?height=100&width=100&text=د.سارة'
  }, {
    name: 'د. كريم الصالح',
    specialty: 'مرشد أسري',
    rating: 4.9,
    languages: 'العربية، الفرنسية، القبائلية',
    image: '/placeholder.svg?height=100&width=100&text=د.كريم'
  }, {
    name: 'د. فاطمة زهراء',
    specialty: 'معالجة نفسية جنسية',
    rating: 4.7,
    languages: 'العربية، الفرنسية، الإنجليزية، القبائلية',
    image: '/placeholder.svg?height=100&width=100&text=د.فاطمة'
  }, {
    name: 'د. عبد الرحمن',
    specialty: 'معالج نفسي جنسي',
    rating: 4.8,
    languages: 'العربية، الإنجليزية، الشاوية',
    image: '/placeholder.svg?height=100&width=100&text=د.عبدالرحمن'
  }, {
    name: 'د. ليلى بوزيد',
    specialty: 'محامية أسرية',
    rating: 4.6,
    languages: 'العربية، الفرنسية، القبائلية',
    image: '/placeholder.svg?height=100&width=100&text=د.ليلى'
  }, {
    name: 'د. أحمد منصور',
    specialty: 'محامي أسري',
    rating: 4.7,
    languages: 'العربية، الفرنسية، الإنجليزية',
    image: '/placeholder.svg?height=100&width=100&text=د.أحمد'
  }, {
    name: 'د. رانيا حسين',
    specialty: 'طبيبة أمراض جنسية',
    rating: 4.9,
    languages: 'العربية، الفرنسية، الشاوية',
    image: '/placeholder.svg?height=100&width=100&text=د.رانيا'
  }, {
    name: 'د. محمد العربي',
    specialty: 'طبيب أمراض جنسية',
    rating: 4.8,
    languages: 'العربية، الإنجليزية، القبائلية',
    image: '/placeholder.svg?height=100&width=100&text=د.محمد'
  }];
  const clinics = [{
    name: 'عيادة الأمل الأسرية',
    location: 'الجزائر العاصمة'
  }, {
    name: 'مركز الوئام النفسي',
    location: 'وهران'
  }, {
    name: 'عيادة السعادة الزوجية',
    location: 'قسنطينة'
  }, {
    name: 'مركز التوافق الأسري',
    location: 'سطيف'
  }, {
    name: 'عيادة الاستقرار النفسي',
    location: 'عنابة'
  }, {
    name: 'مركز الصحة النفسية',
    location: 'تلمسان'
  }];

  return <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gold-50">
      <Header />
      
      {/* Hero Section */}
      <section className="luxury-gradient text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-4">
              <CheckCircle className="h-5 w-5 ml-2" />
              <span className="text-sm font-medium">منصة جزائرية متخصصة ومعتمدة</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            منصة "أسرتي" للإرشاد والعلاج الزواجي والأسري
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
            دعم نفسي وأسري متخصص، يتماشى مع خصوصيات المجتمع الجزائري، عبر جلسات رقمية وبرامج تدريبية متخصصة
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/booking">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4">
                {t('bookAppointment')}
              </Button>
            </Link>
            <Link to="/courses">
              <Button size="lg" variant="outline" className="border-white text-purple-600 hover:bg-white hover:text-purple-800 text-lg px-8 py-4">
                تصفح الدورات
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section - Updated with multilingual support */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t('aboutUs.title')}
            </h2>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-100 to-gold-100 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {t('aboutUs.subtitle')}
                </h3>
                <p className="text-lg font-semibold text-gray-700 leading-relaxed">
                  {t('aboutUs.description')}
                </p>
              </div>
              
              <div className="grid md:grid-cols-1 gap-6 text-justify">
                <p className="text-gray-700 leading-relaxed text-base">
                  {t('aboutUs.contextP1')}
                </p>
                
                <p className="text-gray-700 leading-relaxed text-base">
                  {t('aboutUs.contextP2')}
                </p>
                
                <div className="bg-gradient-to-r from-purple-50 to-gold-50 p-6 rounded-lg border-r-4 border-purple-500">
                  <p className="text-gray-800 leading-relaxed font-semibold text-center">
                    {t('aboutUs.services')}
                  </p>
                  <p className="text-purple-600 text-lg font-bold text-center mt-4">
                    {t('aboutUs.motto')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-gold-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              💡 لماذا تختار منصة "أسرتي"؟
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              أول منصة جزائرية مخصصة للإرشاد والعلاج الزواجي والأسري، تجمع بين الجودة، التخصص، والسهولة
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard icon={CheckCircle} title="خدمات استشارية موثوقة" description="بأسعار في المتناول ومختصين معتمدين" />
            <FeatureCard icon={Heart} title="محتوى متعدد اللغات" description="باللغة العربية واللهجات الجزائرية المحلية" />
            <FeatureCard icon={Star} title="نظام نقاط ومكافآت" description="اكسب نقاط مع كل جلسة واحصل على خصومات" />
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              👥 من نخدم؟
            </h2>
            <p className="text-lg text-gray-600">
              خدماتنا مصممة لتلبية احتياجات جميع أفراد المجتمع
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {targetAudience.map((audience, index) => <div key={index} className="bg-white p-6 rounded-lg shadow-md card-hover border border-purple-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  ✅ {audience.title}
                </h3>
                <p className="text-gray-600">{audience.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-gold-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              🧠 مميزات المنصة
            </h2>
            <p className="text-lg text-gray-600">
              تقنيات حديثة وخدمات شاملة لتجربة علاجية متكاملة
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature, index) => <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} className="border border-purple-100" />)}
          </div>
        </div>
      </section>

      {/* Experts Team */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              🧑‍⚕️ تعرف على فريق الخبراء
            </h2>
            <p className="text-lg text-gray-600">
              نخبة من المختصين النفسيين والقانونيين والطبيين
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {experts.map((expert, index) => <div key={index} className="bg-white p-6 rounded-lg shadow-md card-hover text-center border border-purple-100">
                <Avatar className="w-16 h-16 mx-auto mb-4">
                  <AvatarImage src={expert.image} alt={expert.name} />
                  <AvatarFallback className="bg-purple-100 text-purple-600 text-lg font-semibold">
                    {expert.name.split(' ')[1]?.charAt(0) || expert.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-gray-800 mb-1">{expert.name}</h3>
                <p className="text-sm text-purple-600 mb-2">{expert.specialty}</p>
                <p className="text-xs text-gray-500 mb-2">{expert.languages}</p>
                <div className="flex items-center justify-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700 mr-1">{expert.rating}</span>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-gold-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              🎓 الدورات والتكوينات المتخصصة
            </h2>
            <p className="text-lg text-gray-600">
              برامج تعليمية متخصصة للمستخدمين والمهنيين
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md card-hover border border-purple-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20"></div>
              <img alt="دورات للمستخدمين" className="w-full h-32 object-cover rounded-lg mb-4 relative z-10" src="/lovable-uploads/b70ff1ae-092f-4d46-8542-ee68de08c9be.jpg" />
              <TestTube className="h-10 w-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">للمستخدمين</h3>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>✓ دورات إعداد ما قبل الزواج</li>
                <li>✓ مهارات التواصل الزوجي</li>
                <li>✓ الوعي الذاتي وتحقيق الرضا الزواجي</li>
                <li>✓ التربية الجنسية للأطفال</li>
                <li>✓ إدارة الضغوط الأسرية</li>
              </ul>
              <Link to="/courses?type=users">
                <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
                  تصفح الدورات
                </Button>
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md card-hover border border-purple-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-20"></div>
              <img alt="تكوين المهنيين" className="w-full h-32 object-cover rounded-lg mb-4 relative z-10" src="/lovable-uploads/ba8a1260-9bdd-44fe-8bb9-e728f9ae18bf.jpg" />
              <Building className="h-10 w-10 text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">للمهنيين</h3>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>✓ تقنيات الإرشاد الحديثة</li>
                <li>✓ دراسات حالة متقدمة</li>
                <li>✓ تكوين معالجين في علم النفس الجنسي</li>
                <li>✓ العلاج النفسي الأسري</li>
                <li>✓ ورش عمل تطبيقية</li>
              </ul>
              <Link to="/courses?type=professionals">
                <Button variant="outline" className="w-full border-yellow-600 text-yellow-600 hover:bg-yellow-50">
                  التسجيل في التكوين
                </Button>
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md card-hover border border-purple-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-green-400 to-teal-400 opacity-20"></div>
              <img alt="اختبارات نفسية" className="w-full h-32 object-cover rounded-lg mb-4 relative z-10" src="/lovable-uploads/378a1f74-6902-4491-8bb1-99340773d67e.jpg" />
              <TestTube className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">الاختبارات النفسية</h3>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>✓ مقياس الاستعداد الزواجي</li>
                <li>✓ مقياس الرضا الزواجي</li>
                <li>✓ مقياس التوافق الزواجي</li>
                <li>✓ تقييم التواصل الأسري</li>
                <li>✓ الصحة النفسية للأطفال</li>
              </ul>
              <Link to="/tests">
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  ابدأ الاختبارات
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Clinics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              🏥 العيادات الشريكة
            </h2>
            <p className="text-lg text-gray-600">
              شبكة من العيادات المتخصصة في مختلف ولايات الجزائر
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {clinics.map((clinic, index) => <div key={index} className="bg-white p-6 rounded-lg shadow-md card-hover border border-purple-100">
                <Building className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">{clinic.name}</h3>
                <p className="text-gray-600 flex items-center">
                  <MapPin className="h-4 w-4 ml-2" />
                  {clinic.location}
                </p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-gold-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            {t('contactUs')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-purple-100">
              <Phone className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">اتصل بنا</h3>
              <p className="text-gray-600">0664250682</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-purple-100">
              <Mail className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">راسلنا</h3>
              <p className="text-gray-600">info@osrati.dz</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-purple-100">
              <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">موقعنا</h3>
              <p className="text-gray-600">ولاية سطيف، الجزائر</p>
            </div>
          </div>
          
          <Button size="lg" className="luxury-gradient text-white text-lg px-8 py-4 border-0">
            {t('getStarted')}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-purple-400 ml-2" />
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">أسرتي</h3>
              </div>
              <p className="text-gray-300">
                منصة رائدة في الإرشاد والعلاج الزواجي والأسري في الجزائر
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">خدماتنا</h4>
              <ul className="space-y-2 text-gray-300">
                <li>الاستشارات النفسية</li>
                <li>العلاج الزوجي</li>
                <li>الإرشاد الأسري</li>
                <li>الدورات التدريبية</li>
                <li>الاختبارات النفسية</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">روابط مفيدة</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/booking" className="hover:text-purple-400">حجز جلسة</Link></li>
                <li><Link to="/courses" className="hover:text-purple-400">الدورات</Link></li>
                <li><Link to="/tests" className="hover:text-purple-400">الاختبارات</Link></li>
                <li><Link to="/clinics" className="hover:text-purple-400">العيادات</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">تواصل معنا</h4>
              <ul className="space-y-2 text-gray-300">
                <li>سطيف، الجزائر</li>
                <li>0664250682</li>
                <li>info@osrati.dz</li>
              </ul>
            </div>
          </div>
          
          {/* Social Media Section */}
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="text-center mb-6">
              <h4 className="text-lg font-semibold mb-4">تابع "أسرتي" على وسائل التواصل الاجتماعي</h4>
              <div className="flex justify-center space-x-6 space-x-reverse">
                <a 
                  href="https://facebook.com/osrati" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a 
                  href="https://twitter.com/osrati" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a 
                  href="https://instagram.com/osrati" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-pink-400 transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a 
                  href="https://tiktok.com/@osrati" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-black transition-colors"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a 
                  href="https://youtube.com/osrati" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
            
            <div className="text-center text-gray-400">
              <p>&copy; 2024 منصة أسرتي. جميع الحقوق محفوظة.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};

export default Index;
