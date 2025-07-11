
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Brain, BookOpen, Target } from 'lucide-react';

const SelfConsciousnessTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { id: 1, text: "أقدر انفعالاتي وعواطفي تقديرا دقيقا.", isPositive: true },
    { id: 2, text: "أعي ما أقوم به من أعمال يومية.", isPositive: true },
    { id: 3, text: "يزداد تقديري لذاتي عندما أتغلب على عاداتي السيئة.", isPositive: true },
    { id: 4, text: "أتمكن من تحديد أخطائي.", isPositive: true },
    { id: 5, text: "أهتم بمظهري الخارجي باستمرار.", isPositive: true },
    { id: 6, text: "أهتم بأسلوبي الخاص في عمل الأشياء التي أقوم بها.", isPositive: true },
    { id: 7, text: "ينقصني التعامل مع المواقف غير المتوقعة.", isPositive: false },
    { id: 8, text: "عندما أشعر بالانزعاج فإنني أجهل سببه.", isPositive: false },
    { id: 9, text: "أتمكن من إيجاد حلول لمشكلاتي الخاصة.", isPositive: true },
    { id: 10, text: "أشعر بالحرج عندما أكون مع أشخاص أجهل معرفتهم.", isPositive: false },
    { id: 11, text: "أقدر أسوأ العقبات قبل الشروع في أي عمل مع الآخرين.", isPositive: true },
    { id: 12, text: "أتمكن من تحديد جوانب القوة والضعف عند الآخرين.", isPositive: true },
    { id: 13, text: "أعتقد أن أفكاري واضحة عند تعاملي مع مشكلات الحياة.", isPositive: true },
    { id: 14, text: "أحاول التغلب على الظروف الاجتماعية التي تعيق طموحاتي.", isPositive: true },
    { id: 15, text: "أتمكن من تحديد ما يفكر به الآخرون.", isPositive: true },
    { id: 16, text: "أهتم بالطريقة التي تجعلني شخصًا مميزًا.", isPositive: true },
    { id: 17, text: "أحاول أن أكون مقبولًا لدى الآخرين.", isPositive: true },
    { id: 18, text: "أعي القيم والمعايير الأخلاقية.", isPositive: true }
  ];

  const options = [
    { value: 5, label: "موافق بشدة" },
    { value: 4, label: "موافق" },
    { value: 3, label: "محايد" },
    { value: 2, label: "معارض" },
    { value: 1, label: "معارض بشدة" }
  ];

  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion]: parseInt(value)
    });
  };

  const goToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    let totalScore = 0;
    
    questions.forEach((question, index) => {
      const answer = answers[index];
      if (answer) {
        if (question.isPositive) {
          totalScore += answer;
        } else {
          // البنود السالبة يتم عكس درجاتها
          totalScore += (6 - answer);
        }
      }
    });

    setShowResult(true);
    console.log('نتيجة مقياس الوعي الذاتي:', totalScore);
  };

  const getResultInterpretation = () => {
    let totalScore = 0;
    
    questions.forEach((question, index) => {
      const answer = answers[index];
      if (answer) {
        if (question.isPositive) {
          totalScore += answer;
        } else {
          totalScore += (6 - answer);
        }
      }
    });

    if (totalScore >= 75) {
      return {
        level: "وعي ذاتي مرتفع",
        color: "text-green-600",
        icon: CheckCircle,
        description: "تتمتع بدرجة عالية من إدراك الذات والتحكم السلوكي",
        recommendations: [
          "واصل تطويرك بالمشاركة في برامج القيادة الذاتية",
          "درّب نفسك على مساعدة الآخرين في تطوير وعيهم"
        ]
      };
    } else if (totalScore >= 55) {
      return {
        level: "وعي ذاتي متوسط",
        color: "text-yellow-600",
        icon: Target,
        description: "بحاجة إلى تعزيز مهارات التأمل والانتباه للسلوك",
        recommendations: [
          "شارك في ورشة بناء الوعي بالمشاعر والعادات",
          "مارس التقييم الذاتي بعد الأحداث اليومية"
        ]
      };
    } else {
      return {
        level: "وعي ذاتي منخفض",
        color: "text-red-600",
        icon: Brain,
        description: "يُنصح بتنمية مهارات الوعي والتفكر الذاتي",
        recommendations: [
          "التحق بدورة الذكاء الذاتي وتقدير الذات",
          "مارس التأمل الواعي أو كتابة اليوميات",
          "اقرأ حول أنماط التفكير والانفعالات"
        ]
      };
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    const result = getResultInterpretation();
    let totalScore = 0;
    
    questions.forEach((question, index) => {
      const answer = answers[index];
      if (answer) {
        if (question.isPositive) {
          totalScore += answer;
        } else {
          totalScore += (6 - answer);
        }
      }
    });

    const IconComponent = result.icon;

    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800 mb-4">
              🧠 نتائج مقياس الوعي الذاتي
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <IconComponent className={`h-16 w-16 ${result.color}`} />
              </div>
              <h3 className={`text-2xl font-bold ${result.color} mb-2`}>
                {result.level}
              </h3>
              <p className="text-lg text-gray-700 mb-4">{result.description}</p>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-3xl font-bold text-purple-600">
                  {totalScore} / 90
                </p>
                <p className="text-sm text-gray-600">الدرجة الكلية</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                التوصيات والنصائح
              </h4>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center">
              <Button 
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers({});
                  setShowResult(false);
                }}
                className="bg-purple-600 hover:bg-purple-700"
              >
                إعادة الاختبار
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <CardTitle className="text-xl font-bold text-gray-800">
              مقياس الوعي الذاتي
            </CardTitle>
            <span className="text-sm text-gray-600">
              السؤال {currentQuestion + 1} من {questions.length}
            </span>
          </div>
          <Progress value={progress} className="mb-4" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {questions[currentQuestion].text}
            </h3>
            
            <RadioGroup
              value={answers[currentQuestion]?.toString() || ""}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                  <Label htmlFor={`option-${option.value}`} className="text-right flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={goToPrevious}
              disabled={currentQuestion === 0}
            >
              السابق
            </Button>
            <Button
              onClick={goToNext}
              disabled={!answers[currentQuestion]}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {currentQuestion === questions.length - 1 ? "عرض النتيجة" : "التالي"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelfConsciousnessTest;
