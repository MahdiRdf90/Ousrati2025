
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Brain, BookOpen, Target, Heart } from 'lucide-react';

const EmotionalIntelligenceTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { id: 1, text: "أستمتع بالتسلية" },
    { id: 2, text: "أجيد فهم مشاعر الآخرين" },
    { id: 3, text: "لدي القدرة على تهدئة نفسي" },
    { id: 4, text: "أشعر أنني متهيج" },
    { id: 5, text: "أهتم بما يحدث للآخرين" },
    { id: 6, text: "من الصعب عليَّ أن أسيطر على غضبي" },
    { id: 7, text: "من السهل عليَّ إخبار الناس بمشاعري" },
    { id: 8, text: "أتقبل كل من ألتقي به" },
    { id: 9, text: "أشعر بالثقة بنفسي" },
    { id: 10, text: "أتفهم عادةً كيف يشعر الآخرون" },
    { id: 11, text: "لا أتمكن من الحفاظ على هدوئي" },
    { id: 12, text: "أحاول استعمال طرائق مختلفة للإجابة عن الأسئلة الصعبة" },
    { id: 13, text: "أعتقد أن معظم الأشياء التي أنجزها ستكون مرضية" },
    { id: 14, text: "لدي القدرة على احترام الآخرين" },
    { id: 15, text: "أنزعج بشكل مبالغ فيه من بعض الأمور" },
    { id: 16, text: "من السهل عليّ فهم أشياء جديدة" },
    { id: 17, text: "أستطيع التحدث بسهولة عن مشاعري" },
    { id: 18, text: "أفكر في الناس بأفكار إيجابية" },
    { id: 19, text: "لدي أمل بما هو أفضل" },
    { id: 20, text: "الحصول على الأصدقاء أمر هام" },
    { id: 21, text: "أتشاجر مع الناس" },
    { id: 22, text: "أستطيع فهم أسئلة صعبة" },
    { id: 23, text: "أحب أن أبتسم" },
    { id: 24, text: "أحاول أن لا أؤذي مشاعر الآخرين" },
    { id: 25, text: "أحاول تفهم المشكلة حتى أتمكن من حلها" },
    { id: 26, text: "أنا عصبي" },
    { id: 27, text: "لا شيء يزعجني" },
    { id: 28, text: "يصعب علي التحدث عن مشاعري الداخلية العميقة" },
    { id: 29, text: "أعلم أن الأمور ستصبح على ما يرام" },
    { id: 30, text: "أستطيع تقديم إجابة جيدة على أسئلة صعبة" },
    { id: 31, text: "أستطيع وصف مشاعري بسهولة" },
    { id: 32, text: "أعرف كيف أقضي أوقاتًا جيدة" },
    { id: 33, text: "عليَّ قول الحقيقة" },
    { id: 34, text: "أستطيع الإجابة بطرائق عديدة عن السؤال الصعب عندما أريد" },
    { id: 35, text: "أغضب بسرعة" },
    { id: 36, text: "أحب أن أعمل من أجل الآخرين" },
    { id: 37, text: "لا أشعر بسعادة كبيرة" },
    { id: 38, text: "أستخدم بسهولة طرائق مختلفة في حل المشكلات" },
    { id: 39, text: "يتطلب كثيرًا من الوقت حتى أغضب" },
    { id: 40, text: "مشاعري جيدة تجاه نفسي" },
    { id: 41, text: "أكون أصدقاء بسهولة" },
    { id: 42, text: "أعتقد أنني الأفضل في كل ما أنجز مقارنة بغيري" },
    { id: 43, text: "يسهل عليّ البوح بمشاعري" },
    { id: 44, text: "عند الإجابة عن الأسئلة الصعبة أحاول التفكير بحلول عديدة" },
    { id: 45, text: "أشعر بالاستياء عندما أؤذي مشاعر الآخرين" },
    { id: 46, text: "عندما أغضب من أحد، أبقى هكذا مدة طويلة" },
    { id: 47, text: "أنا سعيد بنوعية شخصيتي" },
    { id: 48, text: "أجيد حل المشكلات" },
    { id: 49, text: "يصعب علي الانتظار في الدور" },
    { id: 50, text: "أستمتع بالأشياء التي أصنعها" },
    { id: 51, text: "أحب أصدقائي" },
    { id: 52, text: "ليس لدي أيام سيئة" },
    { id: 53, text: "لدي صعوبة في البوح للآخرين بأسراري" },
    { id: 54, text: "أغضب بسهولة" },
    { id: 55, text: "أعرف ما إذا كان صديقي غير سعيد" },
    { id: 56, text: "أحب شكلي (راضٍ عن جسدي)" },
    { id: 57, text: "لا أهتم بالأمور الصعبة" },
    { id: 58, text: "عندما أغضب أتصرف دون تفكير" },
    { id: 59, text: "أعرف متى يكون الآخرون غير سعداء حتى لو لم يخبروني بذلك" },
    { id: 60, text: "أنا راضٍ عن الشكل الذي أبدو عليه" }
  ];

  const options = [
    { value: 4, label: "بدرجة عالية (تنطبق عليّ دائمًا تقريبًا)" },
    { value: 3, label: "بدرجة كبيرة (تنطبق عليّ كثيرًا)" },
    { value: 2, label: "بدرجة متوسطة (تنطبق عليّ أحيانًا)" },
    { value: 1, label: "بدرجة ضعيفة (نادرًا ما تنطبق عليّ أو لا تنطبق مطلقًا)" }
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
    
    Object.keys(answers).forEach(key => {
      totalScore += answers[parseInt(key)];
    });

    setShowResult(true);
    console.log('نتيجة مقياس الذكاء العاطفي:', totalScore);
  };

  const getResultInterpretation = () => {
    let totalScore = 0;
    
    Object.keys(answers).forEach(key => {
      totalScore += answers[parseInt(key)];
    });

    const averageScore = totalScore / questions.length;

    if (averageScore >= 3.5) {
      return {
        level: "ذكاء عاطفي مرتفع",
        color: "text-green-600",
        icon: CheckCircle,
        description: "تتمتع بدرجة عالية من الذكاء العاطفي والقدرة على فهم وإدارة المشاعر",
        courses: [
          "تنمية الذكاء العاطفي في الحياة الزوجية",
          "مهارات الإصغاء والتواصل الفعّال",
          "إدارة الغضب والانفعالات بطريقة بنّاءة"
        ]
      };
    } else if (averageScore >= 2.5) {
      return {
        level: "ذكاء عاطفي متوسط",
        color: "text-yellow-600",
        icon: Target,
        description: "لديك مستوى جيد من الذكاء العاطفي مع إمكانية التطوير",
        courses: [
          "تطوير الوعي الذاتي والتفكير الانعكاسي",
          "تقنيات تهدئة الذات وتنظيم المشاعر",
          "تحسين العلاقات والذكاء الاجتماعي"
        ]
      };
    } else {
      return {
        level: "ذكاء عاطفي منخفض",
        color: "text-red-600",
        icon: Brain,
        description: "يمكنك تطوير مهاراتك العاطفية والاجتماعية بشكل كبير",
        courses: [
          "تطوير الوعي الذاتي والتفكير الانعكاسي",
          "تقنيات تهدئة الذات وتنظيم المشاعر",
          "تحسين العلاقات والذكاء الاجتماعي"
        ]
      };
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    const result = getResultInterpretation();
    let totalScore = 0;
    
    Object.keys(answers).forEach(key => {
      totalScore += answers[parseInt(key)];
    });

    const IconComponent = result.icon;

    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800 mb-4">
              💡 نتائج مقياس الذكاء العاطفي
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
                  {totalScore} / 240
                </p>
                <p className="text-sm text-gray-600">الدرجة الكلية</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                الدورات المناسبة لك في منصتنا
              </h4>
              <ul className="space-y-2">
                {result.courses.map((course, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{course}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                إرشادات إضافية
              </h4>
              <div className="text-sm text-gray-700 space-y-2">
                <p>🎓 <strong>هل ترغب بتحليل نتائجك بدقة؟</strong><br />
                تواصل مع المرشد النفسي في منصتنا لتحصل على تحليل مخصص لمستواك العاطفي مع خطة تطويرية شخصية.</p>
                
                <p>📲 لا تنسَ تفعيل خاصية <strong>الإرشاد الذكي</strong> في المنصة، حيث نقترح لك تدريبات وتمارين مصممة حسب نقاط ضعفك وقوتك.</p>
              </div>
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
              مقياس الذكاء العاطفي
            </CardTitle>
            <span className="text-sm text-gray-600">
              السؤال {currentQuestion + 1} من {questions.length}
            </span>
          </div>
          <Progress value={progress} className="mb-4" />
          
          {currentQuestion === 0 && (
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">مرحبًا بك في مقياس الذكاء العاطفي!</h3>
              <p className="text-sm text-gray-700 mb-2">
                يهدف هذا المقياس إلى مساعدتك على التعرّف على مستوى وعيك الانفعالي والاجتماعي، وفهم طريقة تعاملك مع مشاعرك ومشاعر الآخرين.
              </p>
              <p className="text-sm text-gray-700 mb-2">
                ⏱️ <strong>الوقت المطلوب:</strong> مدة الإجابة على المقياس لا تتجاوز 10 دقائق.
              </p>
              <p className="text-xs text-gray-600">
                حاول الإجابة بهدوء وبصدق قدر الإمكان — فليست هناك إجابات صحيحة أو خاطئة.
              </p>
            </div>
          )}
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

export default EmotionalIntelligenceTest;
