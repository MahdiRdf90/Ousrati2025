import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, Trophy } from 'lucide-react';
import { useLanguage } from '@/components/LanguageSelector';

interface TestItem {
  id: number;
  statement: string;
}
const MaritalSatisfactionTest = () => {
  const {
    t,
    currentLanguage
  } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const testItems: TestItem[] = [{
    id: 1,
    statement: 'أنا وشريكي نفهم بعضنا بشكل كامل'
  }, {
    id: 2,
    statement: 'أنا غير سعيد بالتصرفات والعادات الشخصية لشريكي'
  }, {
    id: 3,
    statement: 'أنا سعيد جداً حول كيفية التعامل مع المسؤوليات والأدوار في الزواج'
  }, {
    id: 4,
    statement: 'شريكي يفهم ويقدر كافة رغباتي الأنثوية / الرجولية'
  }, {
    id: 5,
    statement: 'لا أشعر بأن طرق التواصل تجعلني قريباً من شريكي'
  }, {
    id: 6,
    statement: 'علاقتنا ناجحة بشكل كامل'
  }, {
    id: 7,
    statement: 'أنا سعيد جداً حول كيفية اتخاذ القرارات وحل المشكلات'
  }, {
    id: 8,
    statement: 'أنا غير سعيد حول الوضع المالي وطريقة اتخاذ القرارات المتعلقة بهذا الشأن'
  }, {
    id: 9,
    statement: 'لدي بعض الحاجات التي لا تستطيع علاقتنا إشباعها أو تلبيتها'
  }, {
    id: 10,
    statement: 'أنا سعيد جداً حول كيفية قضاء أوقات الفراغ والنشاطات معاً'
  }, {
    id: 11,
    statement: 'أنا مسرور جداً حول طريقة تعبيرنا عن المشاعر في العلاقة الحميمة'
  }, {
    id: 12,
    statement: 'أنا غير راضٍ عن الطريقة التي نتعامل بها في تربية الأولاد كوالدين'
  }, {
    id: 13,
    statement: 'أنا غير نادم حول علاقتي مع شريكي ولو للحظة واحدة'
  }, {
    id: 14,
    statement: 'أنا غير راضٍ عن علاقتنا مع الوالدين أو الإخوة أو الأقارب أو الأصدقاء'
  }, {
    id: 15,
    statement: 'لدي إحساس بالرضا حول حياتنا الزوجية بشكل عام'
  }];
  const scaleLabels = [
    { value: 1, label: 'أوافق بدرجة ضعيفة جدًا', color: 'text-red-600' },
    { value: 2, label: 'أوافق بدرجة ضعيفة', color: 'text-orange-600' },
    { value: 3, label: 'بين الموافقة وعدم الموافقة', color: 'text-yellow-600' },
    { value: 4, label: 'أوافق بدرجة مقبولة', color: 'text-blue-600' },
    { value: 5, label: 'أوافق بشدة', color: 'text-green-600' }
  ];
  const calculateScore = () => {
    return Object.values(answers).reduce((sum, score) => sum + score, 0);
  };
  const getInterpretation = (score: number) => {
    if (score > 45) {
      return {
        level: 'رضا زواجي جيد',
        icon: CheckCircle,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        message: 'هناك مؤشرات واضحة على الاستقرار والتفاهم في علاقتك الزوجية. استمر في تعزيز هذه الجوانب الإيجابية.'
      };
    } else {
      return {
        level: 'رضا زواجي ضعيف',
        icon: AlertTriangle,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        message: 'توجد حاجة لتحسين العلاقة في عدة جوانب. يُنصح بطلب المساعدة من مختص في الإرشاد الأسري.'
      };
    }
  };
  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [testItems[currentQuestion].id]: parseInt(value)
    }));
  };
  const handleNext = () => {
    if (currentQuestion < testItems.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setTestStarted(false);
  };
  const progress = (currentQuestion + 1) / testItems.length * 100;
  const totalScore = calculateScore();
  const interpretation = getInterpretation(totalScore);
  if (!testStarted) {
    return (
      <Card className="max-w-2xl mx-auto" dir={currentLanguage.direction}>
        <CardHeader className="text-center">
          <CardTitle className={`text-2xl font-bold text-purple-600 ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
            مقياس الرضا الزواجي
          </CardTitle>
          <CardDescription className={`text-lg ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
            إعداد: د. أبو أسعد (2007) - مركز هداية للاستشارات والتدريب
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className={`space-y-4 ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">تعليمات الاختبار:</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• الزمن المتوقع: أقل من 3 دقائق</li>
                <li>• عدد الأسئلة: 15 سؤال</li>
                <li>• اقرأ كل عبارة بعناية واختر الدرجة التي تمثل مدى موافقتك عليها</li>
                <li>• أجب بصدق وصراحة لتحصل على نتيجة دقيقة</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">مقياس التقييم:</h4>
              <div className="space-y-2">
                {scaleLabels.map(scale => <div key={scale.value} className={`flex items-center gap-3 ${currentLanguage.direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <span className="font-bold text-lg w-6 text-center">{scale.value}</span>
                    <span className={`${scale.color} font-medium`}>{scale.label}</span>
                  </div>)}
              </div>
            </div>
          </div>
          
          <Button onClick={() => setTestStarted(true)} className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-3">
            ابدأ الاختبار
          </Button>
        </CardContent>
      </Card>
    );
  }
  if (showResults) {
    const IconComponent = interpretation.icon;
    return <Card className="max-w-2xl mx-auto" dir={currentLanguage.direction}>
        <CardHeader className="text-center">
          <CardTitle className={`text-2xl font-bold text-purple-600 ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
            نتائج مقياس الرضا الزواجي
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className={`${interpretation.bgColor} ${interpretation.borderColor} border-2 rounded-lg p-6 text-center`}>
            <IconComponent className={`h-16 w-16 ${interpretation.color} mx-auto mb-4`} />
            <div className="text-3xl font-bold mb-2">
              {totalScore} / 75
            </div>
            <div className={`text-xl font-semibold ${interpretation.color} mb-3`}>
              {interpretation.level}
            </div>
            <p className={`${interpretation.color} text-sm leading-relaxed ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
              {interpretation.message}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className={`font-semibold mb-3 ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>التوصيات:</h4>
            <ul className={`space-y-2 text-sm ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
              {totalScore > 45 ? <>
                  <li>• الحفاظ على أنماط التواصل الإيجابية الحالية</li>
                  <li>• مواصلة الاستثمار في تطوير العلاقة الزوجية</li>
                  <li>• مشاركة الخبرات الإيجابية مع الأزواج الآخرين</li>
                </> : <>
                  <li>• حضور جلسات إرشاد زواجي مع مختص</li>
                  <li>• تحسين مهارات التواصل بين الزوجين</li>
                  <li>• العمل على حل الخلافات بطرق بناءة</li>
                  <li>• قضاء المزيد من الوقت معاً في أنشطة ممتعة</li>
                </>}
            </ul>
          </div>

          <div className={`flex gap-3 ${currentLanguage.direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <Button onClick={resetTest} variant="outline" className="flex-1">
              إعادة الاختبار
            </Button>
            <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
              احجز استشارة زوجية
            </Button>
          </div>
        </CardContent>
      </Card>;
  }
  return <Card className="max-w-2xl mx-auto" dir={currentLanguage.direction}>
      <CardHeader>
        <div className={`flex justify-between items-center ${currentLanguage.direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <CardTitle className="text-lg">
            السؤال {currentQuestion + 1} من {testItems.length}
          </CardTitle>
          <span className="text-sm text-gray-500">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className={`text-lg font-medium leading-relaxed ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
          {testItems[currentQuestion].statement}
        </div>
        
        <RadioGroup value={answers[testItems[currentQuestion].id]?.toString() || ''} onValueChange={handleAnswerChange} className={`space-y-3 ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
          {scaleLabels.map(scale => <div key={scale.value} className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-200 ${currentLanguage.direction === 'rtl' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <RadioGroupItem value={scale.value.toString()} id={`option-${scale.value}`} />
              <Label htmlFor={`option-${scale.value}`} className={`flex-1 cursor-pointer ${scale.color} font-medium`}>
                <span className="font-bold ml-2">{scale.value}</span>
                {scale.label}
              </Label>
            </div>)}
        </RadioGroup>
        
        <div className={`flex justify-between ${currentLanguage.direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
            السابق
          </Button>
          
          <Button onClick={handleNext} disabled={!answers[testItems[currentQuestion].id]} className="bg-purple-600 hover:bg-purple-700">
            {currentQuestion === testItems.length - 1 ? 'عرض النتائج' : 'التالي'}
          </Button>
        </div>
      </CardContent>
    </Card>;
};
export default MaritalSatisfactionTest;
