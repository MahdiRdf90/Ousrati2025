
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Clock, FileText } from 'lucide-react';
import { useLanguage } from '@/components/LanguageSelector';
import MaritalSatisfactionTest from './MaritalSatisfactionTest';
import MaritalSatisfactionTestHudson from './MaritalSatisfactionTestHudson';
import MaritalControlTest from './MaritalControlTest';
import MaritalCompatibilityTest from './MaritalCompatibilityTest';

const MaritalSatisfactionTestSelector = () => {
  const { currentLanguage } = useLanguage();
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  const tests = [
    {
      id: 'abu-asaad',
      title: 'مقياس الرضا الزواجي - د. أبو أسعد',
      author: 'د. أبو أسعد (2007)',
      source: 'مركز هداية للاستشارات والتدريب',
      questions: 15,
      duration: 'أقل من 3 دقائق',
      scoreRange: '15-75',
      description: 'يقيس أبعاد التفاهم، العلاقة الحميمة، التواصل، الأدوار، واتخاذ القرار',
      interpretation: 'أعلى من 45: رضا زواجي جيد | أقل من 45: ضعف في الرضا'
    },
    {
      id: 'hudson',
      title: 'مقياس الرضا الزواجي - Walter & Hudson',
      author: 'Walter & Hudson (1982)',
      source: 'مُكَيَّف على البيئة الجزائرية - بلميهوب (2006)',
      questions: 25,
      duration: 'حوالي 5 دقائق',
      scoreRange: '25-125',
      description: 'يقيس إدراك الفرد للمشكلات الزوجية دون اعتبار التوافق الكلي',
      interpretation: 'أقل من 75: مشكلات حقيقية | 75 فأكثر: لا توجد مؤشرات واضحة على المشكلات'
    },
    {
      id: 'marital-control',
      title: 'مقياس السيطرة الزواجية',
      author: 'الأقرع (2019)',
      source: 'جامعة النجاح الوطنية - فلسطين (مُكَيَّف على البيئة الفلسطينية)',
      questions: 34,
      duration: '5-7 دقائق',
      scoreRange: 'متغير حسب البعد',
      description: 'يقيس أشكال السيطرة في الحياة الزوجية عبر أبعاد: السيطرة العلنية، السيطرة السرية، المسيطر عليه، والتعاون',
      interpretation: 'النتائج تُعرض لكل بُعد على حدة لتحديد نمط العلاقة السائد'
    },
    {
      id: 'spanier-compatibility',
      title: 'مقياس التوافق الزواجي (سبانير)',
      author: 'سبانير (Spanier, 1976)',
      source: 'مقياس معياري مُعتمد دولياً لتقييم جودة العلاقة الزوجية',
      questions: 32,
      duration: '5 دقائق',
      scoreRange: '0-151',
      description: 'يقيس التوافق الزواجي عبر أربعة أبعاد: التوافق، الرضا، التماسك، والتعبير العاطفي',
      interpretation: '≥107: توافق مرتفع جداً | 92-106: توافق متوسط | <92: توافق منخفض'
    }
  ];

  if (selectedTest === 'abu-asaad') {
    return (
      <div>
        <Button
          variant="outline"
          onClick={() => setSelectedTest(null)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          العودة لاختيار المقياس
        </Button>
        <MaritalSatisfactionTest />
      </div>
    );
  }

  if (selectedTest === 'hudson') {
    return (
      <div>
        <Button
          variant="outline"
          onClick={() => setSelectedTest(null)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          العودة لاختيار المقياس
        </Button>
        <MaritalSatisfactionTestHudson />
      </div>
    );
  }

  if (selectedTest === 'marital-control') {
    return (
      <div>
        <Button
          variant="outline"
          onClick={() => setSelectedTest(null)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          العودة لاختيار المقياس
        </Button>
        <MaritalControlTest />
      </div>
    );
  }

  if (selectedTest === 'spanier-compatibility') {
    return (
      <div>
        <Button
          variant="outline"
          onClick={() => setSelectedTest(null)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          العودة لاختيار المقياس
        </Button>
        <MaritalCompatibilityTest />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto" dir={currentLanguage.direction}>
      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle className={`text-3xl font-bold text-purple-600 ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
            المقاييس النفسية الزوجية
          </CardTitle>
          <CardDescription className={`text-lg ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
            اختر المقياس الذي يناسب حالتك لتقييم مختلف جوانب العلاقة الزوجية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`bg-blue-50 p-4 rounded-lg border border-blue-200 ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
            <h3 className="font-semibold text-blue-800 mb-2">معلومات مهمة:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• في هذا القسم، نتيح لك تقييم مختلف جوانب العلاقة الزوجية باستخدام أحد المقاييس المتاحة</li>
              <li>• اختر المقياس الذي يناسب حالتك، ثم أجب على جميع عباراته بدقة</li>
              <li>• مدة الإجابة على كل مقياس: حوالي 5 دقائق</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {tests.map((test) => (
          <Card key={test.id} className="hover:shadow-lg transition-shadow border-2 hover:border-purple-200">
            <CardHeader>
              <CardTitle className={`text-xl font-bold text-purple-600 ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
                {test.title}
              </CardTitle>
              <CardDescription className={`${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
                <div className="space-y-1">
                  <div className="font-medium">{test.author}</div>
                  <div className="text-sm">{test.source}</div>
                </div>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className={`space-y-3 ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-600" />
                    <span>{test.questions} سؤال</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span>{test.duration}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">وصف المقياس:</h4>
                  <div className="text-sm text-gray-700">{test.description}</div>
                </div>
                
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">التفسير:</h4>
                  <div className="text-sm text-purple-700">{test.interpretation}</div>
                </div>
                
                <div className="text-center">
                  <span className="text-sm text-gray-600">النتيجة الكلية: {test.scoreRange}</span>
                </div>
              </div>
              
              <Button 
                onClick={() => setSelectedTest(test.id)}
                className="w-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                اختر هذا المقياس
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MaritalSatisfactionTestSelector;
