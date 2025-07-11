
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, XCircle, Trophy, Brain, Heart, Activity, BookOpen, Users } from 'lucide-react';
import { useLanguage } from '@/components/LanguageSelector';

interface TestItem {
  id: number;
  statement: string;
  dimension: string;
}

const MaritalReadinessComponentsTest = () => {
  const { currentLanguage } = useLanguage();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const testItems: TestItem[] = [
    // الاستعداد النفسي والعاطفي
    { id: 1, statement: 'أعرف نقاط القوة والضعف في شخصيتي', dimension: 'psychological' },
    { id: 2, statement: 'أعتبر الأحداث الصعبة فرصة للنمو الشخصي', dimension: 'psychological' },
    { id: 3, statement: 'ثقتي بنفسي مرتفعة', dimension: 'psychological' },
    { id: 4, statement: 'أستطيع ضبط انفعالاتي كالغضب والحزن', dimension: 'psychological' },
    { id: 5, statement: 'أمتلك القدرة على فهم مشاعر الآخرين وتعاطفهم', dimension: 'psychological' },
    
    // الاستعداد الروحي والقيمي
    { id: 6, statement: 'أختار سلوكي بناءً على توجيهات ديني', dimension: 'spiritual' },
    { id: 7, statement: 'لا أحمل مشاعر سلبية تجاه الآخرين مثل الحسد والكراهية', dimension: 'spiritual' },
    { id: 8, statement: 'أمارس عباداتي بانتظام دون انقطاع', dimension: 'spiritual' },
    { id: 9, statement: 'لدي هدف واضح في حياتي أسعى لتحقيقه', dimension: 'spiritual' },
    { id: 10, statement: 'أتعامل بإحسان مع الناس حتى عند الإساءة', dimension: 'spiritual' },
    
    // الاستعداد الجسدي والصحي
    { id: 11, statement: 'أجريت مؤخراً فحصاً شاملاً للتأكد من صحتي', dimension: 'physical' },
    { id: 12, statement: 'لا أعاني من أمراض قد تؤثر عليّ عند الزواج', dimension: 'physical' },
    { id: 13, statement: 'أهتم بالحالة الصحية للشخص الذي قد أرتبط به', dimension: 'physical' },
    { id: 14, statement: 'ألتزم بنظام غذائي صحي للحفاظ على قوة جسمي', dimension: 'physical' },
    { id: 15, statement: 'أمارس أنشطة تعزز صحتي الجسدية', dimension: 'physical' },
    
    // الاستعداد الشرعي والقانوني
    { id: 16, statement: 'أعرف الأحكام الشرعية الأساسية المتعلقة بالزواج', dimension: 'legal' },
    { id: 17, statement: 'قرأت كتباً تتحدث عن الزواج', dimension: 'legal' },
    { id: 18, statement: 'أعرف العادات والتقاليد المرتبطة بالزواج في مجتمعي', dimension: 'legal' },
    { id: 19, statement: 'أحترم عادات الزواج في مجتمعي', dimension: 'legal' },
    { id: 20, statement: 'أعرف القوانين المرتبطة بالزواج في بلدي', dimension: 'legal' },
    
    // الاستعداد الاجتماعي والمالي
    { id: 21, statement: 'أمتلك القدرة المالية على توفير متطلبات الزواج', dimension: 'social' },
    { id: 22, statement: 'أطور معارفي حول الزواج من خلال محاضرات ودورات', dimension: 'social' },
    { id: 23, statement: 'أتلقى دعماً من أسرتي في قراري بالزواج', dimension: 'social' },
    { id: 24, statement: 'أعمل على تنمية المهارات التي أحتاجها في الحياة الزوجية', dimension: 'social' },
    { id: 25, statement: 'أجيد التعامل مع عادات وتفكير الناس في موضوع الزواج', dimension: 'social' }
  ];

  const scaleLabels = [
    { value: 5, label: 'دائماً', color: 'text-green-600' },
    { value: 4, label: 'غالباً', color: 'text-blue-600' },
    { value: 3, label: 'أحياناً', color: 'text-yellow-600' },
    { value: 2, label: 'نادراً', color: 'text-orange-600' },
    { value: 1, label: 'أبداً', color: 'text-red-600' }
  ];

  const dimensions = {
    psychological: { name: 'الاستعداد النفسي والعاطفي', icon: Brain },
    spiritual: { name: 'الاستعداد الروحي والقيمي', icon: Heart },
    physical: { name: 'الاستعداد الجسدي والصحي', icon: Activity },
    legal: { name: 'الاستعداد الشرعي والقانوني', icon: BookOpen },
    social: { name: 'الاستعداد الاجتماعي والمالي', icon: Users }
  };

  const calculateDimensionScore = (dimension: string) => {
    const dimensionItems = testItems.filter(item => item.dimension === dimension);
    return dimensionItems.reduce((sum, item) => sum + (answers[item.id] || 0), 0);
  };

  const calculateTotalScore = () => {
    return Object.values(answers).reduce((sum, score) => sum + score, 0);
  };

  const getDimensionInterpretation = (score: number) => {
    if (score <= 15) {
      return {
        level: 'ضعيف',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        message: 'بحاجة إلى تطوير فوري'
      };
    } else {
      return {
        level: 'جيد',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        message: 'يحتاج إلى تعميق وتعزيز'
      };
    }
  };

  const getTotalInterpretation = (score: number) => {
    if (score <= 75) {
      return {
        level: 'ضعيف إلى متوسط',
        icon: AlertTriangle,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        message: 'استعداد عام ضعيف إلى متوسط - يحتاج إلى تطوير شامل'
      };
    } else {
      return {
        level: 'جيد إلى متقدم',
        icon: Trophy,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        message: 'استعداد جيد إلى متقدم - واصل التعلم وتطوير المهارات'
      };
    }
  };

  const getCourseSuggestions = (dimension: string) => {
    const suggestions = {
      psychological: [
        '🧠 دورة "الذكاء العاطفي"',
        '💬 دورة "التعامل مع الضغوط"'
      ],
      spiritual: [
        '🕌 دورة "المهارات الروحية في الحياة الزوجية"'
      ],
      physical: [
        '🏋️ دورة "الصحة الجسدية والاستعداد البدني للزواج"'
      ],
      legal: [
        '📚 ورشة "الأحكام الشرعية والقانونية للزواج"'
      ],
      social: [
        '💸 دورة "الميزانية للأزواج الجدد"',
        '🤝 دورة "مهارات الاندماج الأسري"'
      ]
    };
    return suggestions[dimension as keyof typeof suggestions] || [];
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
  const totalScore = calculateTotalScore();
  const totalInterpretation = getTotalInterpretation(totalScore);

  if (!testStarted) {
    return (
      <Card className="max-w-2xl mx-auto" dir={currentLanguage.direction}>
        <CardHeader className="text-center">
          <CardTitle className={`text-2xl font-bold text-purple-600 ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
            مقياس مقومات الاستعداد للزواج
          </CardTitle>
          <CardDescription className={`text-lg ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
            يقيس مدى جاهزيتك للزواج من خلال خمسة أبعاد رئيسية
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className={`space-y-4 ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">تعليمات الاختبار:</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• الزمن المتوقع: حوالي 5 دقائق</li>
                <li>• عدد الأسئلة: 25 سؤال</li>
                <li>• يقيس 5 أبعاد: النفسي، الروحي، الجسدي، الشرعي، والاجتماعي</li>
                <li>• اقرأ كل عبارة بدقة واختر مدى انطباقها عليك</li>
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
    const IconComponent = totalInterpretation.icon;
    
    return (
      <Card className="max-w-4xl mx-auto" dir={currentLanguage.direction}>
        <CardHeader className="text-center">
          <CardTitle className={`text-2xl font-bold text-purple-600 ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
            نتائج مقياس مقومات الاستعداد للزواج
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* النتيجة الكلية */}
          <div className={`${totalInterpretation.bgColor} ${totalInterpretation.borderColor} border-2 rounded-lg p-6 text-center`}>
            <IconComponent className={`h-16 w-16 ${totalInterpretation.color} mx-auto mb-4`} />
            <div className="text-3xl font-bold mb-2">
              {totalScore} / 125
            </div>
            <div className={`text-xl font-semibold ${totalInterpretation.color} mb-3`}>
              التقييم العام: {totalInterpretation.level}
            </div>
            <p className={`${totalInterpretation.color} text-sm leading-relaxed ${currentLanguage.direction === 'rtl' ? 'text-right' : ''}`}>
              {totalInterpretation.message}
            </p>
          </div>

          {/* نتائج الأبعاد */}
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(dimensions).map(([key, dimension]) => {
              const score = calculateDimensionScore(key);
              const interpretation = getDimensionInterpretation(score);
              const IconComponent = dimension.icon;
              
              return (
                <div key={key} className={`${interpretation.bgColor} ${interpretation.borderColor} border rounded-lg p-4`}>
                  <div className="flex items-center gap-3 mb-2">
                    <IconComponent className={`h-6 w-6 ${interpretation.color}`} />
                    <h4 className={`font-semibold ${interpretation.color}`}>{dimension.name}</h4>
                  </div>
                  <div className="text-lg font-bold mb-1">{score} / 25</div>
                  <div className={`text-sm ${interpretation.color} mb-2`}>
                    {interpretation.level} - {interpretation.message}
                  </div>
                  
                  {score <= 15 && (
                    <div className="mt-3">
                      <h5 className="font-semibold text-xs mb-2">دورات مقترحة:</h5>
                      <ul className="text-xs space-y-1">
                        {getCourseSuggestions(key).map((course, index) => (
                          <li key={index}>{course}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
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

export default MaritalReadinessComponentsTest;
