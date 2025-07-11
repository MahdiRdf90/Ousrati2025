
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, XCircle, Trophy } from 'lucide-react';
import { useLanguage } from '@/components/LanguageSelector';

interface TestItem {
  id: number;
  statement: string;
}

const MaritalReadinessTest = () => {
  const { t, currentLanguage } = useLanguage();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const testItems: TestItem[] = [
    { id: 1, statement: 'لدي معرفة بمراحل تكوين الأسرة' },
    { id: 2, statement: 'يمكنني توضيح مدة ومراحل الخِطبة' },
    { id: 3, statement: 'أعرف مفهوم وأركان وشروط عقد القِران والزواج' },
    { id: 4, statement: 'أعرف أحكام وآداب ليلة الزفاف' },
    { id: 5, statement: 'يمكنني تحديد حقوق الزوجة على زوجها' },
    { id: 6, statement: 'يمكنني تحديد حقوق الزوج على زوجته' },
    { id: 7, statement: 'يمكنني تحديد الحقوق المشتركة بين الزوجين' },
    { id: 8, statement: 'أعرف مفهوم التوافق الزواجي' },
    { id: 9, statement: 'أعرف مفهوم وأبعاد الذكاء الانفعالي' },
    { id: 10, statement: 'عندي مهارات حل المشكلات الزوجية' },
    { id: 11, statement: 'أستطيع التخطيط لميزانية الأسرة' },
    { id: 12, statement: 'أعرف برامج وتطبيقات إلكترونية لميزانية الأسرة' },
    { id: 13, statement: 'أعرف الخصائص السيكولوجية للرجل والمرأة' },
    { id: 14, statement: 'أعرف مصادر الضغوط النفسية' },
    { id: 15, statement: 'أعرف مفهوم لغات الحب الخمس' },
    { id: 16, statement: 'يمكنني قياس كفاءة الاستعداد النفسي والعاطفي لدي' },
    { id: 17, statement: 'أعرف مفهوم الصحة الزوجية العامة' },
    { id: 18, statement: 'أعرف مفاهيم ومراحل العلاقة الحميمة' },
    { id: 19, statement: 'أعرف أحكام الحيض' },
    { id: 20, statement: 'لدي معرفة بأسرار الحمل والولادة' }
  ];

  const scaleLabels = [
    { value: 5, label: 'أعرف تماماً', color: 'text-green-600' },
    { value: 4, label: 'أعرف جيداً', color: 'text-blue-600' },
    { value: 3, label: 'معرفة متوسطة', color: 'text-yellow-600' },
    { value: 2, label: 'معرفة ضعيفة', color: 'text-orange-600' },
    { value: 1, label: 'لا أعرف إطلاقاً', color: 'text-red-600' }
  ];

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, score) => sum + score, 0);
  };

  const getInterpretation = (score: number) => {
    if (score >= 85) {
      return {
        level: 'ممتاز',
        icon: Trophy,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        message: 'استعداد زواجي ممتاز – لديك وعي ومعرفة تؤهلك لحياة زوجية ناجحة ومستقرة.'
      };
    } else if (score >= 70) {
      return {
        level: 'جيد',
        icon: CheckCircle,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        message: 'استعداد جيد – تحتاج إلى تحسين بعض المهارات لاستكمال جاهزيتك.'
      };
    } else if (score >= 50) {
      return {
        level: 'متوسط',
        icon: AlertTriangle,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        message: 'استعداد متوسط – يُفضل حضور دورات إرشادية لتقوية مهاراتك ومعرفتك.'
      };
    } else {
      return {
        level: 'ضعيف',
        icon: XCircle,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        message: 'استعداد ضعيف – يوصى بالخضوع لتأهيل زواجي قبل اتخاذ قرار الزواج.'
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
            مقياس مهارات الاستعداد الزواجي
          </CardTitle>
          <CardDescription className={`text-lg ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
            أداة تقييمية تهدف إلى قياس مدى معرفة الفرد بمهارات الاستعداد للزواج
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className={`space-y-4 ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">تعليمات الاختبار:</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• الزمن المتوقع: أقل من 5 دقائق</li>
                <li>• عدد الأسئلة: 20 سؤال</li>
                <li>• اقرأ كل عبارة بعناية واختر التقييم المناسب</li>
                <li>• لا توجد إجابات صحيحة أو خاطئة، فقط عبّر عن معرفتك الحقيقية</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">مقياس التقييم:</h4>
              <div className="space-y-2">
                {scaleLabels.map((scale) => (
                  <div key={scale.value} className={`flex items-center gap-3 ${currentLanguage.direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <span className="font-bold text-lg w-6 text-center">{scale.value}</span>
                    <span className={`${scale.color} font-medium`}>{scale.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <Button 
            onClick={() => setTestStarted(true)} 
            className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-3"
          >
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
            نتائج مقياس الاستعداد الزواجي
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className={`${interpretation.bgColor} ${interpretation.borderColor} border-2 rounded-lg p-6 text-center`}>
            <IconComponent className={`h-16 w-16 ${interpretation.color} mx-auto mb-4`} />
            <div className="text-3xl font-bold mb-2">
              {totalScore} / 100
            </div>
            <div className={`text-xl font-semibold ${interpretation.color} mb-3`}>
              مستوى الاستعداد: {interpretation.level}
            </div>
            <p className={`${interpretation.color} text-sm leading-relaxed ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
              {interpretation.message}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className={`font-semibold mb-3 ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>التوصيات:</h4>
            <ul className={`space-y-2 text-sm ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
              {totalScore >= 85 ? (
                <>
                  <li>• مواصلة تطوير المهارات من خلال القراءة المتخصصة</li>
                  <li>• مشاركة المعرفة مع الآخرين المقبلين على الزواج</li>
                </>
              ) : totalScore >= 70 ? (
                <>
                  <li>• حضور ورش عمل متخصصة في الإرشاد الزواجي</li>
                  <li>• القراءة في المجالات التي تحتاج تطوير</li>
                </>
              ) : totalScore >= 50 ? (
                <>
                  <li>• الالتحاق بدورة شاملة للإعداد الزواجي</li>
                  <li>• استشارة مختص في الإرشاد الأسري</li>
                </>
              ) : (
                <>
                  <li>• ضرورة الخضوع لبرنامج تأهيل زواجي شامل</li>
                  <li>• استشارة عدة مختصين في المجال</li>
                  <li>• تأجيل قرار الزواج حتى اكتساب المهارات اللازمة</li>
                </>
              )}
            </ul>
          </div>

          <div className={`flex gap-3 ${currentLanguage.direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <Button onClick={resetTest} variant="outline" className="flex-1">
              إعادة الاختبار
            </Button>
            <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
              احجز استشارة
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
          {scaleLabels.map((scale) => (
            <div 
              key={scale.value} 
              className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-200 ${currentLanguage.direction === 'rtl' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <RadioGroupItem value={scale.value.toString()} id={`option-${scale.value}`} />
              <Label 
                htmlFor={`option-${scale.value}`} 
                className={`flex-1 cursor-pointer ${scale.color} font-medium`}
              >
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

export default MaritalReadinessTest;
