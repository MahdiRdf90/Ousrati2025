
import React, { useState } from 'react';
import Header from '@/components/Header';
import MaritalReadinessTest from '@/components/MaritalReadinessTest';
import MaritalReadinessComponentsTest from '@/components/MaritalReadinessComponentsTest';
import { Heart, CheckCircle, Clock, ArrowRight, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PreMarriageTests = () => {
  const [activeTest, setActiveTest] = useState<string | null>(null);

  const preMarriageTests = [
    {
      id: 'marital-readiness',
      title: 'مقياس مهارات الاستعداد الزواجي',
      description: 'تقييم مدى معرفتك بمهارات الاستعداد للحياة الزوجية والمفاهيم الأساسية للزواج',
      duration: '5 دقائق',
      questions: '20 سؤال',
      icon: UserCheck,
      details: 'يقيس المهارات الأساسية مثل الحقوق والواجبات، إدارة الميزانية، الذكاء العاطفي، والمفاهيم الشرعية'
    },
    {
      id: 'marital-readiness-components',
      title: 'مقياس مقومات الاستعداد للزواج',
      description: 'قياس الجاهزية للزواج من خلال 5 أبعاد: النفسي، الروحي، الجسدي، الشرعي، والاجتماعي',
      duration: '5 دقائق',
      questions: '25 سؤال',
      icon: Heart,
      details: 'تحليل شامل لخمسة أبعاد رئيسية للاستعداد للزواج مع تحليل منفصل لكل بُعد'
    }
  ];

  const handleTestStart = (testId: string) => {
    setActiveTest(testId);
  };

  if (activeTest === 'marital-readiness') {
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
            العودة إلى مقاييس ما قبل الزواج
          </Button>
          <MaritalReadinessTest />
        </div>
      </div>
    );
  }

  if (activeTest === 'marital-readiness-components') {
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
            العودة إلى مقاييس ما قبل الزواج
          </Button>
          <MaritalReadinessComponentsTest />
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
            💝 مقاييس ما قبل الزواج
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            قبل اتخاذ خطوة الزواج، من المهم أن تتعرف على مدى جاهزيتك من الناحية النفسية، الشرعية، الاجتماعية، والعاطفية
          </p>
        </div>

        {/* Main Description */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-8 rounded-xl mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-purple-800">أهمية التقييم قبل الزواج</h2>
          </div>
          <p className="text-purple-700 leading-relaxed mb-4">
            🧠 توفر لك هذه المقاييس أدوات متخصصة لمساعدتك على التقييم الذاتي واستكشاف نقاط القوة والجوانب التي تحتاج للتطوير، 
            مع نصائح مخصصة ودورات مقترحة بناءً على نتائجك.
          </p>
          <p className="text-purple-700 leading-relaxed">
            ✨ اختر المقياس المناسب وابدأ التقييم لتحصل على نتيجة مفصلة وتوصيات تساعدك على التطور والاستعداد بشكل أفضل للحياة الزوجية.
          </p>
        </div>

        {/* Tests Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {preMarriageTests.map((test) => {
            const IconComponent = test.icon;
            return (
              <div 
                key={test.id} 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-purple-200 relative"
              >
                <div className="absolute -top-3 -right-3 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                  مجاني
                </div>
                
                <div className="flex items-center justify-center mb-6">
                  <IconComponent className="h-12 w-12 text-purple-600" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{test.title}</h3>
                <p className="text-gray-600 mb-4 text-center">{test.description}</p>
                <p className="text-sm text-purple-700 mb-6 text-center">{test.details}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 ml-2" />
                    <span>{test.duration}</span>
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 ml-2" />
                    <span>{test.questions}</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button 
                    size="lg" 
                    className="bg-purple-600 hover:bg-purple-700 w-full"
                    onClick={() => handleTestStart(test.id)}
                  >
                    ابدأ التقييم
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">فوائد مقاييس ما قبل الزواج</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Heart className="h-10 w-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">فهم أعمق للذات</h3>
              <p className="text-sm text-gray-600">اكتشف نقاط قوتك ومجالات التحسين قبل الزواج</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-10 w-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">استعداد أفضل</h3>
              <p className="text-sm text-gray-600">تحضير شامل للحياة الزوجية من جميع الجوانب</p>
            </div>
            <div className="text-center">
              <UserCheck className="h-10 w-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">توصيات مخصصة</h3>
              <p className="text-sm text-gray-600">نصائح ودورات تدريبية حسب احتياجاتك</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreMarriageTests;
