
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/components/LanguageSelector';

interface TestItem {
  id: number;
  statement: string;
  isReversed: boolean;
}

const MaritalSatisfactionTestHudson = () => {
  const { t, currentLanguage } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const testItems: TestItem[] = [
    { id: 1, statement: 'أشعر بأن شريكي يحبني', isReversed: true },
    { id: 2, statement: 'أشعر بأننا لا نتفق حول الأمور المهمة', isReversed: false },
    { id: 3, statement: 'أشعر بأن شريكي يفهم مشاعري', isReversed: true },
    { id: 4, statement: 'أشعر بأن علاقتنا الزوجية مليئة بالمشاكل', isReversed: false },
    { id: 5, statement: 'أشعر بالرضا عن طريقة تعاملنا مع بعضنا البعض', isReversed: true },
    { id: 6, statement: 'أشعر بأن شريكي لا يقدر جهودي', isReversed: false },
    { id: 7, statement: 'أشعر بأننا نتواصل بشكل جيد', isReversed: true },
    { id: 8, statement: 'أشعر بأن شريكي يتجاهل احتياجاتي', isReversed: false },
    { id: 9, statement: 'أشعر بالسعادة في علاقتي الزوجية', isReversed: true },
    { id: 10, statement: 'أشعر بأن شريكي يحرجني أمام الآخرين', isReversed: false },
    { id: 11, statement: 'أشعر بأن شريكي يدعمني في قراراتي', isReversed: true },
    { id: 12, statement: 'أشعر بأن شريكي لا يثق بي', isReversed: false },
    { id: 13, statement: 'أشعر بالراحة عند التحدث مع شريكي', isReversed: true },
    { id: 14, statement: 'أشعر بأن شريكي ينتقدني باستمرار', isReversed: false },
    { id: 15, statement: 'أشعر بأن علاقتنا تزداد قوة مع الوقت', isReversed: true },
    { id: 16, statement: 'أشعر بأن شريكي لا يقضي وقتاً كافياً معي', isReversed: false },
    { id: 17, statement: 'أشعر بأن شريكي يحترم آرائي', isReversed: true },
    { id: 18, statement: 'أشعر بأن شريكي يتحكم في تصرفاتي', isReversed: false },
    { id: 19, statement: 'أشعر بالأمان العاطفي مع شريكي', isReversed: true },
    { id: 20, statement: 'أشعر بأن شريكي لا يهتم بمشاعري', isReversed: false },
    { id: 21, statement: 'أشعر بأننا نتشارك الأهداف نفسها', isReversed: true },
    { id: 22, statement: 'أشعر بأن شريكي يلومني على أشياء كثيرة', isReversed: false },
    { id: 23, statement: 'أشعر بالفخر بشريكي', isReversed: true },
    { id: 24, statement: 'أشعر بأن شريكي يتجاهل مشاكلنا', isReversed: false },
    { id: 25, statement: 'أشعر بأن زواجنا سعيد بشكل عام', isReversed: true }
  ];

  const scaleLabels = [
    { value: 1, label: 'لا', color: 'text-red-600' },
    { value: 2, label: 'نادراً', color: 'text-orange-600' },
    { value: 3, label: 'أحياناً', color: 'text-yellow-600' },
    { value: 4, label: 'كثيراً', color: 'text-blue-600' },
    { value: 5, label: 'كثيراً جداً', color: 'text-green-600' }
  ];

  const calculateScore = () => {
    let totalScore = 0;
    testItems.forEach(item => {
      const rawScore = answers[item.id] || 0;
      if (item.isReversed) {
        // For reversed items: 1->5, 2->4, 3->3, 4->2, 5->1
        totalScore += (6 - rawScore);
      } else {
        totalScore += rawScore;
      }
    });
    return totalScore;
  };

  const getInterpretation = (score: number) => {
    if (score >= 75) {
      return {
        level: 'لا توجد مؤشرات واضحة على وجود مشكلات',
        icon: CheckCircle,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        message: 'تشير النتيجة إلى علاقة زوجية مستقرة وصحية بشكل عام.'
      };
    } else {
      return {
        level: 'يشير إلى مشكلات حقيقية في العلاقة الزوجية',
        icon: AlertTriangle,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        message: 'تشير النتيجة إلى وجود مشكلات تحتاج إلى اهتمام ومعالجة في العلاقة الزوجية.'
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

  const progress = ((currentQuestion + 1) / testItems.length) * 100;
  const totalScore = calculateScore();
  const interpretation = getInterpretation(totalScore);

  if (!testStarted) {
    return (
      <Card className="max-w-2xl mx-auto" dir={currentLanguage.direction}>
        <CardHeader className="text-center">
          <CardTitle className={`text-2xl font-bold text-purple-600 ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
            مقياس الرضا الزواجي - Walter & Hudson
          </CardTitle>
          <CardDescription className={`text-lg ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
            مُكَيَّف على البيئة الجزائرية - الأستاذة بلميهوب (2006)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className={`space-y-4 ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">تعليمات الاختبار:</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• الزمن المتوقع: حوالي 5 دقائق</li>
                <li>• عدد الأسئلة: 25 سؤال</li>
                <li>• يقيس إدراك الفرد للمشكلات الزوجية</li>
                <li>• أجب بصدق وصراحة لتحصل على نتيجة دقيقة</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">مقياس التقييم:</h4>
              <div className="space-y-2">
                {scaleLabels.map(scale => (
                  <div key={scale.value} className={`flex items-center gap-3 ${currentLanguage.direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <span className="font-bold text-lg w-6 text-center">{scale.value}</span>
                    <span className={`${scale.color} font-medium`}>{scale.label}</span>
                  </div>
                ))}
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
    return (
      <Card className="max-w-2xl mx-auto" dir={currentLanguage.direction}>
        <CardHeader className="text-center">
          <CardTitle className={`text-2xl font-bold text-purple-600 ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
            نتائج مقياس الرضا الزواجي - Hudson
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className={`${interpretation.bgColor} ${interpretation.borderColor} border-2 rounded-lg p-6 text-center`}>
            <IconComponent className={`h-16 w-16 ${interpretation.color} mx-auto mb-4`} />
            <div className="text-3xl font-bold mb-2">
              {totalScore} / 125
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
              {totalScore >= 75 ? (
                <>
                  <li>• الحفاظ على أنماط التواصل الإيجابية الحالية</li>
                  <li>• مواصلة الاستثمار في تطوير العلاقة الزوجية</li>
                  <li>• تعزيز نقاط القوة في العلاقة</li>
                </>
              ) : (
                <>
                  <li>• طلب المساعدة من مختص في الإرشاد الزواجي</li>
                  <li>• العمل على تحسين التواصل بين الزوجين</li>
                  <li>• معالجة المشكلات المحددة في العلاقة</li>
                  <li>• الاستثمار في وقت الجودة معاً</li>
                </>
              )}
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
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto" dir={currentLanguage.direction}>
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
        
        <RadioGroup 
          value={answers[testItems[currentQuestion].id]?.toString() || ''} 
          onValueChange={handleAnswerChange} 
          className={`space-y-3 ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}
        >
          {scaleLabels.map(scale => (
            <div key={scale.value} className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-200 ${currentLanguage.direction === 'rtl' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <RadioGroupItem value={scale.value.toString()} id={`option-${scale.value}`} />
              <Label htmlFor={`option-${scale.value}`} className={`flex-1 cursor-pointer ${scale.color} font-medium`}>
                <span className="font-bold ml-2">{scale.value}</span>
                {scale.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        <div className={`flex justify-between ${currentLanguage.direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <Button 
            variant="outline" 
            onClick={handlePrevious} 
            disabled={currentQuestion === 0}
          >
            السابق
          </Button>
          
          <Button 
            onClick={handleNext} 
            disabled={!answers[testItems[currentQuestion].id]} 
            className="bg-purple-600 hover:bg-purple-700"
          >
            {currentQuestion === testItems.length - 1 ? 'عرض النتائج' : 'التالي'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaritalSatisfactionTestHudson;
