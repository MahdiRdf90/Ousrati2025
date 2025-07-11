import React, { useState } from 'react';
import Header from '@/components/Header';
import MaritalSatisfactionTestSelector from '@/components/MaritalSatisfactionTestSelector';
import SelfConsciousnessTest from '@/components/SelfConsciousnessTest';
import EmotionalIntelligenceTest from '@/components/EmotionalIntelligenceTest';
import OntarioChildMentalHealthTest from '@/components/OntarioChildMentalHealthTest';
import { Heart, CheckCircle, Clock, Users, ArrowRight, Activity, Brain, Baby } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Tests = () => {
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const navigate = useNavigate();

  const psychologicalTests = [
    {
      id: 'pre-marriage-tests',
      title: 'مقاييس ما قبل الزواج',
      description: 'مجموعة شاملة من المقاييس لتقييم الجاهزية النفسية والاجتماعية والشرعية قبل الزواج',
      duration: '5 دقائق',
      questions: 'مقياسان متكاملان',
      category: 'ما قبل الزواج',
      price: 'مجاني',
      featured: true,
      icon: Heart,
      isGroup: true
    },
    {
      id: 'marital-satisfaction',
      title: 'المقاييس النفسية الزوجية (خيارات متعددة)',
      description: 'قياس مستوى الرضا الزواجي والسيطرة في العلاقة الزوجية باستخدام مقاييس متعددة متخصصة',
      duration: '3-7 دقائق',
      questions: '15-34 سؤال',
      category: 'الحياة الزوجية',
      price: 'مجاني',
      featured: true,
      icon: Activity
    },
    {
      id: 'self-development-tests',
      title: 'مقاييس التطوير الذاتي',
      description: 'مجموعة شاملة من المقاييس لتقييم الوعي الذاتي والذكاء العاطفي وتطوير المهارات الشخصية',
      duration: '8-15 دقيقة',
      questions: 'مقياسان متخصصان',
      category: 'التطوير الذاتي',
      price: 'مجاني',
      featured: true,
      icon: Brain,
      isGroup: true
    },
    {
      id: 'ontario-child-mental-health',
      title: 'مقياس أونتاريو للصحة النفسية للطفل',
      description: 'تقييم شامل للحالة النفسية والسلوكية للأطفال من خلال تقييم الوالدين لسلوكيات الطفل',
      duration: '5 دقائق',
      questions: '71 سؤال',
      category: 'تربية الأطفال',
      price: 'مجاني',
      featured: true,
      icon: Baby
    },
    {
      title: 'مقياس التواصل الأسري',
      description: 'تقييم جودة التواصل داخل الأسرة',
      duration: '18 دقيقة',
      questions: '50 سؤال',
      category: 'الحياة الأسرية',
      price: '400 دج',
      icon: Users
    }
  ];

  const handleTestStart = (testId: string) => {
    if (testId === 'pre-marriage-tests') {
      navigate('/pre-marriage-tests');
    } else if (testId === 'marital-satisfaction') {
      setActiveTest('marital-satisfaction');
    } else if (testId === 'self-development-tests') {
      setActiveTest('self-development-tests');
    } else if (testId === 'ontario-child-mental-health') {
      setActiveTest('ontario-child-mental-health');
    } else {
      // Handle other tests
      console.log('Starting test:', testId);
    }
  };

  if (activeTest === 'marital-satisfaction') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gold-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Button
            variant="outline"
            onClick={() => setActiveTest(null)}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            العودة إلى قائمة الاختبارات
          </Button>
          <MaritalSatisfactionTestSelector />
        </div>
      </div>
    );
  }

  if (activeTest === 'ontario-child-mental-health') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gold-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Button
            variant="outline"
            onClick={() => setActiveTest(null)}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            العودة إلى قائمة الاختبارات
          </Button>
          <OntarioChildMentalHealthTest />
        </div>
      </div>
    );
  }

  if (activeTest === 'self-development-tests') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gold-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Button
            variant="outline"
            onClick={() => setActiveTest(null)}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            العودة إلى قائمة الاختبارات
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              🧠 مقاييس التطوير الذاتي
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              اكتشف مستوى وعيك الذاتي وذكائك العاطفي من خلال مقاييس علمية متخصصة
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                  الوعي الذاتي
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 mb-2">مقياس الوعي الذاتي</h3>
              <p className="text-gray-600 mb-4 text-sm">
                أداة لقياس مدى وعي الفرد بذاته وسلوكياته وانفعالاته ونظرته للأفكار والقيم المحيطة به
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 ml-2" />
                  <span>3-5 دقائق</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 ml-2" />
                  <span>18 سؤال</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">مجاني</span>
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setActiveTest('self-consciousness')}
                >
                  ابدأ الاختبار
                </Button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-green-200">
              <div className="flex items-center justify-between mb-4">
                <Heart className="h-8 w-8 text-green-600" />
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                  الذكاء العاطفي
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 mb-2">مقياس الذكاء العاطفي</h3>
              <p className="text-gray-600 mb-4 text-sm">
                قياس مستوى الوعي الانفعالي والاجتماعي وطريقة التعامل مع المشاعر الذاتية ومشاعر الآخرين
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 ml-2" />
                  <span>8-10 دقائق</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 ml-2" />
                  <span>60 سؤال</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">مجاني</span>
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => setActiveTest('emotional-intelligence')}
                >
                  ابدأ الاختبار
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTest === 'self-consciousness') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gold-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Button
            variant="outline"
            onClick={() => setActiveTest('self-development-tests')}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            العودة إلى مقاييس التطوير الذاتي
          </Button>
          <SelfConsciousnessTest />
        </div>
      </div>
    );
  }

  if (activeTest === 'emotional-intelligence') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gold-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Button
            variant="outline"
            onClick={() => setActiveTest('self-development-tests')}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            العودة إلى مقاييس التطوير الذاتي
          </Button>
          <EmotionalIntelligenceTest />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gold-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🧠 الاختبارات والمقاييس النفسية
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            مجموعة شاملة من الاختبارات النفسية المعتمدة لتقييم مختلف جوانب الحياة الأسرية والزوجية
          </p>
        </div>

        {/* Featured Tests Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">المقاييس المميزة</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {psychologicalTests.filter(test => test.featured).map((test, index) => {
              const IconComponent = test.icon;
              return (
                <div 
                  key={test.id || index} 
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-purple-200 relative"
                >
                  <div className="absolute -top-3 -right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {test.isGroup ? 'مجموعة' : 'جديد'}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="h-8 w-8 text-purple-600" />
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                      {test.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{test.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{test.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{test.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 ml-2" />
                      <span>{test.questions}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-purple-600">{test.price}</span>
                    <Button 
                      size="sm" 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => handleTestStart(test.id || `test-${index}`)}
                    >
                      {test.isGroup ? 'استكشف المقاييس' : 'ابدأ الاختبار'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Other Tests Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">المقاييس الأخرى</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {psychologicalTests.filter(test => !test.featured).map((test, index) => {
              const IconComponent = test.icon || Brain;
              return (
                <div 
                  key={test.id || index} 
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="h-8 w-8 text-purple-600" />
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                      {test.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{test.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{test.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{test.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 ml-2" />
                      <span>{test.questions}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-purple-600">{test.price}</span>
                    <Button 
                      size="sm" 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => handleTestStart(test.id || `test-${index}`)}
                    >
                      ابدأ الاختبار
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">فوائد الاختبارات النفسية</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Users className="h-10 w-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">فهم أعمق للذات</h3>
              <p className="text-sm text-gray-600">اكتشف نقاط قوتك ومجالات التحسين</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-10 w-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">توجيه علاجي دقيق</h3>
              <p className="text-sm text-gray-600">نتائج تساعد المختص في وضع خطة علاجية مناسبة</p>
            </div>
            <div className="text-center">
              <Brain className="h-10 w-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">قياس التقدم</h3>
              <p className="text-sm text-gray-600">متابعة تطور حالتك عبر الزمن</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-gold-600 text-white p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">ابدأ رحلة اكتشاف الذات</h2>
          <p className="mb-6">اختر الاختبار المناسب لك وابدأ في فهم نفسك بشكل أعمق</p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            ابدأ الآن
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Tests;
