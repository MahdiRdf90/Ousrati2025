
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/components/LanguageSelector';
import { ChevronRight, RotateCcw, BookOpen, Users, MessageCircle } from 'lucide-react';

const MaritalControlTest = () => {
  const { currentLanguage } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    "نتشاور معًا في اتخاذ القرارات المهمة", // 1 - التعاون
    "نتناقش بهدوء عند وجود خلاف", // 2 - التعاون
    "أقبل قرارات زوجي/زوجتي دون مناقشة", // 3 - المسيطر عليه
    "أفرض رأيي على زوجي/زوجتي بوضوح", // 4 - المسيطر العلنية
    "أتراجع عن رأيي حتى لو كنت محقًا", // 5 - المسيطر عليه
    "أتخذ القرارات المالية بمفردي", // 6 - المسيطر العلنية
    "نحل مشاكلنا بالتفاهم والحوار", // 7 - التعاون (سالب)
    "أحدد للطرف الآخر ما يجب عليه فعله", // 8 - المسيطر العلنية
    "أنفذ ما يطلبه مني شريكي دائمًا", // 9 - المسيطر عليه
    "أؤثر على قرارات شريكي بطرق غير مباشرة", // 10 - المسيطر السرية
    "نخطط معًا لمستقبل الأسرة", // 11 - التعاون
    "أمنع شريكي من القيام ببعض الأمور", // 12 - المسيطر العلنية
    "أوافق على آراء شريكي حتى لو لم أقتنع", // 13 - المسيطر عليه
    "أتجنب الاعتراض على قرارات شريكي", // 14 - المسيطر عليه
    "أخضع لرغبات شريكي في كل الأمور", // 15 - المسيطر عليه
    "أقرر وحدي في أمور الأطفال", // 16 - المسيطر العلنية
    "أستخدم العواطف للتأثير على شريكي", // 17 - المسيطر السرية
    "أرفض مناقشة بعض الموضوعات", // 18 - المسيطر العلنية
    "أقبل انتقادات شريكي دون رد", // 19 - المسيطر عليه
    "أحدد للطرف الآخر أصدقاءه ومعارفه", // 20 - المسيطر العلنية
    "أتلاعب بمشاعر شريكي لتحقيق ما أريد", // 21 - المسيطر السرية
    "أتجنب إبداء رأيي في القرارات المهمة", // 22 - المسيطر عليه
    "أقبل باللوم حتى لو لم أكن مخطئًا", // 23 - المسيطر عليه
    "نتقاسم المسؤوليات بالتساوي", // 24 - التعاون
    "أخفي نواياي الحقيقية عن شريكي", // 25 - المسيطر السرية
    "أنسحب من المناقشات تجنبًا للمشاكل", // 26 - المسيطر عليه
    "أشعر بالذنب عندما أرفض طلبًا لشريكي", // 27 - المسيطر عليه
    "أؤجل قراراتي الشخصية لموافقة شريكي", // 28 - المسيطر عليه
    "أتقبل كل ما يقوله شريكي دون جدال", // 29 - المسيطر عليه
    "أستخدم الصمت للضغط على شريكي", // 30 - المسيطر السرية
    "أؤثر على شريكي من خلال أطراف ثالثة", // 31 - المسيطر السرية
    "أفرض قراراتي بالقوة إذا لزم الأمر", // 32 - المسيطر العلنية
    "أستخدم التهديد للحصول على ما أريد", // 33 - المسيطر السرية
    "نحترم آراء بعضنا البعض", // 34 - التعاون
  ];

  const responseOptions = [
    { text: 'أبدًا', value: 1 },
    { text: 'نادرًا', value: 2 },
    { text: 'أحيانًا', value: 3 },
    { text: 'غالبًا', value: 4 },
    { text: 'دائمًا', value: 5 }
  ];

  const handleAnswerSelect = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (allAnswers: number[]) => {
    // تصحيح البند السالب (البند 7 - الفهرس 6)
    const correctedAnswers = allAnswers.map((answer, index) => {
      if (index === 6) { // البند 7
        return 6 - answer; // عكس الدرجة
      }
      return answer;
    });

    // تجميع النتائج حسب الأبعاد
    const dominantOpen = [3, 5, 7, 11, 15, 17, 19, 31].reduce((sum, index) => sum + correctedAnswers[index], 0); // البنود 4،6،8،12،16،18،20،32
    const dominantSecret = [9, 16, 20, 24, 29, 30, 32].reduce((sum, index) => sum + correctedAnswers[index], 0); // البنود 10،17،21，25，30，31，33
    const controlled = [2, 4, 8, 12, 13, 14, 18, 21, 22, 25, 26, 27, 28].reduce((sum, index) => sum + correctedAnswers[index], 0); // البنود 3،5，9，13，14，15，19，22，23，26，27，28，29
    const cooperation = [0, 1, 6, 10, 23, 33].reduce((sum, index) => sum + correctedAnswers[index], 0); // البنود 1，2，7，11，24，34
    const totalDominant = dominantOpen + dominantSecret;

    setResults({
      dominantOpen,
      dominantSecret,
      controlled,
      cooperation,
      totalDominant
    });
    setShowResults(true);
  };

  const [results, setResults] = useState<{
    dominantOpen: number;
    dominantSecret: number;
    controlled: number;
    cooperation: number;
    totalDominant: number;
  } | null>(null);

  const getHighestDimension = () => {
    if (!results) return null;
    
    const dimensions = [
      { name: 'dominant', value: results.totalDominant, type: 'المسيطر' },
      { name: 'controlled', value: results.controlled, type: 'المسيطر عليه' },
      { name: 'cooperation', value: results.cooperation, type: 'التعاون' }
    ];
    
    return dimensions.reduce((max, dim) => dim.value > max.value ? dim : max);
  };

  const getGuidanceForDimension = (dimensionName: string) => {
    const guidanceMap: Record<string, {
      title: string;
      description: string;
      tips: string[];
      courses: { title: string; icon: any }[];
      color: string;
    }> = {
      dominant: {
        title: "السيطرة العالية",
        description: "تشير نتائجك إلى وجود سلوكيات سيطرة زائدة في العلاقة الزوجية، قد تُضعف التواصل أو تُشعر الطرف الآخر بالإقصاء.",
        tips: [
          "راجع نمطك في الحوار والقرار: هل تتحدث أكثر مما تستمع؟",
          "مارس التفويض: أعطِ شريكك فرصًا لاتخاذ قرارات مستقلة",
          "راقب تعبيرات التسلط غير المقصودة (كرفض النقاش أو إنهاء الحوار)"
        ],
        courses: [
          { title: "دورة مهارات التواصل الفعّال بين الأزواج", icon: MessageCircle },
          { title: "دورة الذكاء العاطفي والتفاوض في العلاقات الزوجية", icon: Users },
          { title: "برنامج تخفيف سلوكيات التحكم والسيطرة", icon: BookOpen }
        ],
        color: "red"
      },
      controlled: {
        title: "الخضوع العالي",
        description: "تشير نتائجك إلى ميلك للخضوع الزائد أو كبت رأيك داخل العلاقة الزوجية، مما قد يؤدي لتراكم الضغط النفسي والشعور بعدم التقدير.",
        tips: [
          "لا تخف من التعبير عن رأيك باحترام – الحوار لا يعني المواجهة",
          "جرّب وضع حدود صحية بأسلوب هادئ وواضح",
          "لا تؤجّل الانزعاج، وناقش المواقف فورًا بدلاً من التراكم"
        ],
        courses: [
          { title: "دورة تعزيز الثقة بالنفس في الحياة الزوجية", icon: Users },
          { title: "دورة مهارات التعبير عن الذات والرفض الإيجابي", icon: MessageCircle },
          { title: "برنامج الوعي الذاتي وإدارة العلاقات غير المتوازنة", icon: BookOpen }
        ],
        color: "orange"
      },
      cooperation: {
        title: "التعاون العالي",
        description: "نتيجتك تشير إلى وجود نمط صحي من التعاون والمشاركة في العلاقة الزوجية. هذا توازن رائع يستحق الاستمرار والتطوير.",
        tips: [
          "استمر في التشاور الدوري مع شريكك، حتى في القرارات الصغيرة",
          "احرص على توسيع دائرة التعاون لتشمل الجوانب العاطفية والمالية",
          "شارك شريكك في وضع أهداف أسرية مشتركة"
        ],
        courses: [
          { title: "ورشة تعزيز التفاهم والشراكة الأسرية", icon: Users },
          { title: "دورة تنمية مهارات التفاعل والتخطيط الأسري المشترك", icon: MessageCircle },
          { title: "برنامج الأزواج المتعاونين: كيف نحافظ على النجاح؟", icon: BookOpen }
        ],
        color: "green"
      }
    };

    return guidanceMap[dimensionName] || null;
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setResults(null);
  };

  if (showResults && results) {
    const highestDimension = getHighestDimension();
    const guidance = highestDimension ? getGuidanceForDimension(highestDimension.name) : null;

    return (
      <div className="max-w-4xl mx-auto" dir={currentLanguage.direction}>
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-purple-600">
              نتائج مقياس السيطرة الزواجية
            </CardTitle>
            <CardDescription className="text-lg">
              النتائج موزعة على الأبعاد الأربعة للمقياس
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-600">السيطرة العلنية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 mb-2">{results.dominantOpen}</div>
                  <p className="text-sm text-gray-600">التحكم الواضح والمباشر في القرارات</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">السيطرة السرية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{results.dominantSecret}</div>
                  <p className="text-sm text-gray-600">التأثير غير المباشر على الشريك</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">المسيطر عليه</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600 mb-2">{results.controlled}</div>
                  <p className="text-sm text-gray-600">الخضوع والقبول المستمر لقرارات الطرف الآخر</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">التعاون</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">{results.cooperation}</div>
                  <p className="text-sm text-gray-600">الحوار والمشاركة في اتخاذ القرارات</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-purple-50 border-purple-200 mb-8">
              <CardHeader>
                <CardTitle className="text-xl text-purple-600">إجمالي السيطرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-purple-600 mb-2">{results.totalDominant}</div>
                <p className="text-sm text-gray-600">مجموع السيطرة العلنية والسرية</p>
              </CardContent>
            </Card>

            {guidance && (
              <Card className={`border-2 mb-8 ${
                guidance.color === 'red' ? 'border-red-200 bg-red-50' :
                guidance.color === 'orange' ? 'border-orange-200 bg-orange-50' :
                'border-green-200 bg-green-50'
              }`}>
                <CardHeader>
                  <CardTitle className={`text-2xl font-bold ${
                    guidance.color === 'red' ? 'text-red-600' :
                    guidance.color === 'orange' ? 'text-orange-600' :
                    'text-green-600'
                  }`}>
                    💡 الإرشادات والتوصيات - {guidance.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className={`p-4 rounded-lg ${
                    guidance.color === 'red' ? 'bg-red-100' :
                    guidance.color === 'orange' ? 'bg-orange-100' :
                    'bg-green-100'
                  }`}>
                    <p className={`${
                      guidance.color === 'red' ? 'text-red-800' :
                      guidance.color === 'orange' ? 'text-orange-800' :
                      'text-green-800'
                    }`}>
                      {guidance.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3">نصائح عملية:</h4>
                    <ul className="space-y-2">
                      {guidance.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                            guidance.color === 'red' ? 'bg-red-500' :
                            guidance.color === 'orange' ? 'bg-orange-500' :
                            'bg-green-500'
                          }`} />
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3">الدورات التدريبية المقترحة:</h4>
                    <div className="space-y-3">
                      {guidance.courses.map((course, index) => {
                        const IconComponent = course.icon;
                        return (
                          <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                            <IconComponent className={`h-5 w-5 ${
                              guidance.color === 'red' ? 'text-red-600' :
                              guidance.color === 'orange' ? 'text-orange-600' :
                              'text-green-600'
                            }`} />
                            <span className="text-gray-800">{course.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="text-center">
              <Button onClick={resetTest} className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2 mx-auto">
                <RotateCcw className="h-4 w-4" />
                إعادة الاختبار
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto" dir={currentLanguage.direction}>
      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-purple-600">
            مقياس السيطرة الزواجية
          </CardTitle>
          <CardDescription className="text-lg">
            إعداد: الأقرع (2019) – جامعة النجاح الوطنية – فلسطين
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">تعليمات:</h3>
            <p className="text-sm text-blue-700 mb-3">
              اختر درجة انطباق كل عبارة على حالتك الزوجية حسب المقياس المحدد
            </p>
            <div className="text-xs text-blue-600">
              مُكَيَّف على البيئة الفلسطينية • {questions.length} عبارة • حوالي 5-7 دقائق
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">
                السؤال {currentQuestion + 1} من {questions.length}
              </span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <Card className="border-2 border-purple-100">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center leading-relaxed">
                  {questions[currentQuestion]}
                </h3>

                <div className="grid gap-3">
                  {responseOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant="outline"
                      className="h-12 justify-between text-right hover:bg-purple-50 hover:border-purple-300"
                      onClick={() => handleAnswerSelect(option.value)}
                    >
                      <span>{option.text}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaritalControlTest;
