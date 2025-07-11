
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Heart, CheckCircle, AlertTriangle, Info, BookOpen, Users, Calendar, FileText } from 'lucide-react';
import { useLanguage } from '@/components/LanguageSelector';

interface Question {
  id: number;
  text: string;
  category: string;
  type: 'scale5' | 'scale5reverse' | 'binary' | 'frequency';
  options: { value: number; label: string }[];
}

const MaritalCompatibilityTest = () => {
  const { currentLanguage } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    // التوافق الزواجي (البنود 1-15) - مقياس 1-5 (لا تتفق أبدًا إلى تتفق تمامًا)
    { id: 1, text: "تفسير حاجات الأسرة", category: "التوافق الزواجي", type: "scale5", options: [
      { value: 1, label: "لا أتفق أبدًا" }, { value: 2, label: "لا أتفق غالبًا" }, { value: 3, label: "أحيانًا" }, { value: 4, label: "أتفق غالبًا" }, { value: 5, label: "أتفق تمامًا" }
    ]},
    { id: 2, text: "الانجذاب المتبادل والاحترام", category: "التوافق الزواجي", type: "scale5", options: [
      { value: 1, label: "لا أتفق أبدًا" }, { value: 2, label: "لا أتفق غالبًا" }, { value: 3, label: "أحيانًا" }, { value: 4, label: "أتفق غالبًا" }, { value: 5, label: "أتفق تمامًا" }
    ]},
    { id: 3, text: "الأمور الدينية", category: "التوافق الزواجي", type: "scale5", options: [
      { value: 1, label: "لا أتفق أبدًا" }, { value: 2, label: "لا أتفق غالبًا" }, { value: 3, label: "أحيانًا" }, { value: 4, label: "أتفق غالبًا" }, { value: 5, label: "أتفق تمامًا" }
    ]},
    { id: 4, text: "التعبير عن الحب والعطف", category: "التوافق الزواجي", type: "scale5", options: [
      { value: 1, label: "لا أتفق أبدًا" }, { value: 2, label: "لا أتفق غالبًا" }, { value: 3, label: "أحيانًا" }, { value: 4, label: "أتفق غالبًا" }, { value: 5, label: "أتفق تمامًا" }
    ]},
    { id: 5, text: "العلاقة الجنسية", category: "التوافق الزواجي", type: "scale5", options: [
      { value: 1, label: "لا أتفق أبدًا" }, { value: 2, label: "لا أتفق غالبًا" }, { value: 3, label: "أحيانًا" }, { value: 4, label: "أتفق غالبًا" }, { value: 5, label: "أتفق تمامًا" }
    ]},
    { id: 6, text: "العلاقات الاجتماعية", category: "التوافق الزواجي", type: "scale5", options: [
      { value: 1, label: "لا أتفق أبدًا" }, { value: 2, label: "لا أتفق غالبًا" }, { value: 3, label: "أحيانًا" }, { value: 4, label: "أتفق غالبًا" }, { value: 5, label: "أتفق تمامًا" }
    ]},
    { id: 7, text: "مهارات التفاوض واتخاذ القرارات العامة", category: "التوافق الزواجي", type: "scale5", options: [
      { value: 1, label: "لا أتفق أبدًا" }, { value: 2, label: "لا أتفق غالبًا" }, { value: 3, label: "أحيانًا" }, { value: 4, label: "أتفق غالبًا" }, { value: 5, label: "أتفق تمامًا" }
    ]},
    { id: 8, text: "احترام رأي الطرف الآخر", category: "التوافق الزواجي", type: "scale5", options: [
      { value: 1, label: "لا أتفق أبدًا" }, { value: 2, label: "لا أتفق غالبًا" }, { value: 3, label: "أحيانًا" }, { value: 4, label: "أتفق غالبًا" }, { value: 5, label: "أتفق تمامًا" }
    ]},
    { id: 9, text: "تقدير الأمور", category: "التوافق الزواجي", type: "scale5", options: [
      { value: 1, label: "لا أتفق أبدًا" }, { value: 2, label: "لا أتفق غالبًا" }, { value: 3, label: "أحيانًا" }, { value: 4, label: "أتفق غالبًا" }, { value: 5, label: "أتفق تمامًا" }
    ]},
    { id: 10, text: "الوقت الذي تقضيانه معًا", category: "التوافق الزواجي", type: "scale5", options: [
      { value: 1, label: "لا أتفق أبدًا" }, { value: 2, label: "لا أتفق غالبًا" }, { value: 3, label: "أحيانًا" }, { value: 4, label: "أتفق غالبًا" }, { value: 5, label: "أتفق تمامًا" }
    ]},
    { id: 11, text: "اتخاذ القرارات", category: "التوافق الزواجي", type: "scale5", options: [
      { value: 1, label: "لا أتفق أبدًا" }, { value: 2, label: "لا أتفق غالبًا" }, { value: 3, label: "أحيانًا" }, { value: 4, label: "أتفق غالبًا" }, { value: 5, label: "أتفق تمامًا" }
    ]},
    { id: 12, text: "إدارة الأمور المالية", category: "التوافق الزواجي", type: "scale5", options: [
      { value: 1, label: "لا أتفق أبدًا" }, { value: 2, label: "لا أتفق غالبًا" }, { value: 3, label: "أحيانًا" }, { value: 4, label: "أتفق غالبًا" }, { value: 5, label: "أتفق تمامًا" }
    ]},
    { id: 13, text: "حل المشكلات", category: "التوافق الزواجي", type: "scale5", options: [
      { value: 1, label: "لا أتفق أبدًا" }, { value: 2, label: "لا أتفق غالبًا" }, { value: 3, label: "أحيانًا" }, { value: 4, label: "أتفق غالبًا" }, { value: 5, label: "أتفق تمامًا" }
    ]},
    { id: 14, text: "الحوار وقت الصراع", category: "التوافق الزواجي", type: "scale5", options: [
      { value: 1, label: "لا أتفق أبدًا" }, { value: 2, label: "لا أتفق غالبًا" }, { value: 3, label: "أحيانًا" }, { value: 4, label: "أتفق غالبًا" }, { value: 5, label: "أتفق تمامًا" }
    ]},
    { id: 15, text: "المسائل الترفيهية", category: "التوافق الزواجي", type: "scale5", options: [
      { value: 1, label: "لا أتفق أبدًا" }, { value: 2, label: "لا أتفق غالبًا" }, { value: 3, label: "أحيانًا" }, { value: 4, label: "أتفق غالبًا" }, { value: 5, label: "أتفق تمامًا" }
    ]},

    // الرضا الزواجي (البنود 16-22) - مقياس عكسي 1-5 (دائمًا إلى أبدًا)
    { id: 16, text: "كم مرة ناقشت أو فكرت في الطلاق؟", category: "الرضا الزواجي", type: "scale5reverse", options: [
      { value: 5, label: "أبدًا" }, { value: 4, label: "نادرًا" }, { value: 3, label: "أحيانًا" }, { value: 2, label: "غالبًا" }, { value: 1, label: "دائمًا" }
    ]},
    { id: 17, text: "كم مرة شعرت بالندم أو لاحظت ندم شريكك؟", category: "الرضا الزواجي", type: "scale5reverse", options: [
      { value: 5, label: "أبدًا" }, { value: 4, label: "نادرًا" }, { value: 3, label: "أحيانًا" }, { value: 2, label: "غالبًا" }, { value: 1, label: "دائمًا" }
    ]},
    { id: 18, text: "إلى أي مدى ترى أن الأمور بينكما تسير بشكل جيد؟", category: "الرضا الزواجي", type: "scale5", options: [
      { value: 1, label: "سيئة جدًا" }, { value: 2, label: "سيئة" }, { value: 3, label: "متوسطة" }, { value: 4, label: "جيدة" }, { value: 5, label: "ممتازة" }
    ]},
    { id: 19, text: "هل تطلع شريكك على أسرارك الخاصة؟", category: "الرضا الزواجي", type: "scale5", options: [
      { value: 1, label: "أبدًا" }, { value: 2, label: "نادرًا" }, { value: 3, label: "أحيانًا" }, { value: 4, label: "غالبًا" }, { value: 5, label: "دائمًا" }
    ]},
    { id: 20, text: "هل تشعر بالندم على زواجك؟", category: "الرضا الزواجي", type: "scale5reverse", options: [
      { value: 5, label: "أبدًا" }, { value: 4, label: "نادرًا" }, { value: 3, label: "أحيانًا" }, { value: 2, label: "غالبًا" }, { value: 1, label: "دائمًا" }
    ]},
    { id: 21, text: "كم مرة تحدثت لشخص آخر عن زواجك؟", category: "الرضا الزواجي", type: "scale5reverse", options: [
      { value: 5, label: "أبدًا" }, { value: 4, label: "نادرًا" }, { value: 3, label: "أحيانًا" }, { value: 2, label: "غالبًا" }, { value: 1, label: "دائمًا" }
    ]},
    { id: 22, text: "هل هناك أحداث تقلقك وتؤثر على العلاقة؟", category: "الرضا الزواجي", type: "scale5reverse", options: [
      { value: 5, label: "أبدًا" }, { value: 4, label: "نادرًا" }, { value: 3, label: "أحيانًا" }, { value: 2, label: "غالبًا" }, { value: 1, label: "دائمًا" }
    ]},

    // التماسك الزواجي (البنود 23-28) - مقياس تكرار 1-5
    { id: 23, text: "هل تقبّل شريكك؟", category: "التماسك الزواجي", type: "frequency", options: [
      { value: 1, label: "أقل من مرة شهريًا" }, { value: 2, label: "مرة شهريًا" }, { value: 3, label: "أسبوعيًا" }, { value: 4, label: "يوميًا" }, { value: 5, label: "أكثر من مرة يوميًا" }
    ]},
    { id: 24, text: "هل تمسك بيده أو تمشيان معًا؟", category: "التماسك الزواجي", type: "frequency", options: [
      { value: 1, label: "أقل من مرة شهريًا" }, { value: 2, label: "مرة شهريًا" }, { value: 3, label: "أسبوعيًا" }, { value: 4, label: "يوميًا" }, { value: 5, label: "أكثر من مرة يوميًا" }
    ]},
    { id: 25, text: "كم مرة تتحدثان يوميًا؟", category: "التماسك الزواجي", type: "frequency", options: [
      { value: 1, label: "أقل من مرة شهريًا" }, { value: 2, label: "مرة شهريًا" }, { value: 3, label: "أسبوعيًا" }, { value: 4, label: "يوميًا" }, { value: 5, label: "أكثر من مرة يوميًا" }
    ]},
    { id: 26, text: "هل تتشاجران كثيرًا؟", category: "التماسك الزواجي", type: "scale5reverse", options: [
      { value: 5, label: "أبدًا" }, { value: 4, label: "نادرًا" }, { value: 3, label: "أحيانًا" }, { value: 2, label: "غالبًا" }, { value: 1, label: "دائمًا" }
    ]},
    { id: 27, text: "هل تمضيان وقتًا ممتعًا معًا؟", category: "التماسك الزواجي", type: "frequency", options: [
      { value: 1, label: "أقل من مرة شهريًا" }, { value: 2, label: "مرة شهريًا" }, { value: 3, label: "أسبوعيًا" }, { value: 4, label: "يوميًا" }, { value: 5, label: "أكثر من مرة يوميًا" }
    ]},
    { id: 28, text: "هل تذهبان معًا إلى مناسبات أو نشاطات مشتركة؟", category: "التماسك الزواجي", type: "frequency", options: [
      { value: 1, label: "أقل من مرة شهريًا" }, { value: 2, label: "مرة شهريًا" }, { value: 3, label: "أسبوعيًا" }, { value: 4, label: "يوميًا" }, { value: 5, label: "أكثر من مرة يوميًا" }
    ]},

    // التعبير العاطفي (البنود 29-32)
    { id: 29, text: "هل توافق على استعدادك لممارسة العلاقة الجنسية؟", category: "التعبير العاطفي", type: "binary", options: [
      { value: 1, label: "نعم" }, { value: 0, label: "لا" }
    ]},
    { id: 30, text: "هل تعبّر عن الحب والمشاعر العاطفية لشريكك؟", category: "التعبير العاطفي", type: "binary", options: [
      { value: 1, label: "نعم" }, { value: 0, label: "لا" }
    ]},
    { id: 31, text: "إلى أي مدى أنت سعيد بحياتك الزوجية؟", category: "التعبير العاطفي", type: "scale5", options: [
      { value: 1, label: "غير سعيد أبدًا" }, { value: 2, label: "غير سعيد" }, { value: 3, label: "متوسط السعادة" }, { value: 4, label: "سعيد" }, { value: 5, label: "سعيد جدًا" }
    ]},
    { id: 32, text: "ما هو تقييمك لمستقبل علاقتك الزوجية؟", category: "التعبير العاطفي", type: "scale5", options: [
      { value: 1, label: "غير متفائل إطلاقًا" }, { value: 2, label: "متشائم" }, { value: 3, label: "محايد" }, { value: 4, label: "متفائل" }, { value: 5, label: "متفائل جدًا" }
    ]}
  ];

  const calculateResults = () => {
    const compatibilityScore = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].reduce((sum, id) => sum + (answers[id] || 0), 0);
    const satisfactionScore = [16,17,18,19,20,21,22].reduce((sum, id) => sum + (answers[id] || 0), 0);
    const cohesionScore = [23,24,25,26,27,28].reduce((sum, id) => sum + (answers[id] || 0), 0);
    const expressionScore = [29,30,31,32].reduce((sum, id) => sum + (answers[id] || 0), 0);
    
    const totalScore = compatibilityScore + satisfactionScore + cohesionScore + expressionScore;
    
    return {
      totalScore,
      compatibilityScore,
      satisfactionScore,
      cohesionScore,
      expressionScore,
      level: totalScore >= 107 ? 'high' : totalScore >= 92 ? 'medium' : 'low'
    };
  };

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];
  const selectedAnswer = answers[currentQuestion.id];

  if (showResults) {
    const results = calculateResults();
    
    return (
      <div className="max-w-4xl mx-auto" dir={currentLanguage.direction}>
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-purple-600 flex items-center justify-center gap-3">
              <Heart className="h-8 w-8" />
              نتائج مقياس التوافق الزواجي (سبانير)
            </CardTitle>
            <CardDescription className="text-lg">
              تحليل شامل لمستوى التوافق في علاقتكما الزوجية
            </CardDescription>
          </CardHeader>
        </Card>

        {/* النتيجة الإجمالية */}
        <Card className={`mb-6 ${results.level === 'high' ? 'border-green-200 bg-green-50' : 
          results.level === 'medium' ? 'border-yellow-200 bg-yellow-50' : 'border-red-200 bg-red-50'}`}>
          <CardContent className="p-8 text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
              results.level === 'high' ? 'bg-green-100' : results.level === 'medium' ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              <span className={`text-3xl font-bold ${
                results.level === 'high' ? 'text-green-600' : results.level === 'medium' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {results.totalScore}
              </span>
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${
              results.level === 'high' ? 'text-green-800' : results.level === 'medium' ? 'text-yellow-800' : 'text-red-800'
            }`}>
              {results.level === 'high' ? 'توافق مرتفع جدًا' : 
               results.level === 'medium' ? 'توافق متوسط' : 'توافق منخفض'}
            </h3>
            <p className="text-gray-600 mb-4">
              النتيجة الإجمالية: {results.totalScore} من 151
            </p>
          </CardContent>
        </Card>

        {/* تحليل الأبعاد */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* التوافق الزواجي */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                التوافق الزواجي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>النتيجة: {results.compatibilityScore}/75</span>
                  <span>{Math.round((results.compatibilityScore/75)*100)}%</span>
                </div>
                <Progress value={(results.compatibilityScore/75)*100} className="h-2" />
              </div>
              <p className="text-sm text-gray-600">
                {results.compatibilityScore >= 60 ? 
                  "✅ توافق جيد في الجوانب العملية اليومية. استمر في التواصل البناء." :
                  results.compatibilityScore >= 45 ?
                  "⚠️ بعض الجوانب تحتاج تحسينًا. يُنصح بدورة 'فن التفاهم الزوجي'." :
                  "❗ تعارضات مستمرة. احجز جلسة مع مختص أسري."
                }
              </p>
            </CardContent>
          </Card>

          {/* الرضا الزواجي */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-5 w-5 text-pink-600" />
                الرضا الزواجي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>النتيجة: {results.satisfactionScore}/35</span>
                  <span>{Math.round((results.satisfactionScore/35)*100)}%</span>
                </div>
                <Progress value={(results.satisfactionScore/35)*100} className="h-2" />
              </div>
              <p className="text-sm text-gray-600">
                {results.satisfactionScore >= 28 ? 
                  "✅ استقرار نفسي وانفعالي جيد. خصص لحظات امتنان يومية." :
                  results.satisfactionScore >= 21 ?
                  "⚠️ مشاعر متذبذبة. تابع دورة 'إدارة الضغوط الزوجية'." :
                  "❗ ضعف في الرضا. استعن بجلسات الإرشاد الفردي أو الزوجي."
                }
              </p>
            </CardContent>
          </Card>

          {/* التماسك الزواجي */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                التماسك الزواجي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>النتيجة: {results.cohesionScore}/30</span>
                  <span>{Math.round((results.cohesionScore/30)*100)}%</span>
                </div>
                <Progress value={(results.cohesionScore/30)*100} className="h-2" />
              </div>
              <p className="text-sm text-gray-600">
                {results.cohesionScore >= 24 ? 
                  "✅ وقت مشترك ونشاطات تعزز الرابط العاطفي. استمر بالتخصيص الأسبوعي." :
                  results.cohesionScore >= 18 ?
                  "⚠️ النشاطات المشتركة غير منتظمة. تابع دورة 'تعزيز الألفة الزوجية'." :
                  "❗ ضعف في الروابط اليومية. احجز جلسة توجيهية مشتركة."
                }
              </p>
            </CardContent>
          </Card>

          {/* التعبير العاطفي */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                التعبير العاطفي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>النتيجة: {results.expressionScore}/12</span>
                  <span>{Math.round((results.expressionScore/12)*100)}%</span>
                </div>
                <Progress value={(results.expressionScore/12)*100} className="h-2" />
              </div>
              <p className="text-sm text-gray-600">
                {results.expressionScore >= 10 ? 
                  "✅ تعبير صحي ومفتوح عن المشاعر. داوم على رسائل الشكر والاهتمام." :
                  results.expressionScore >= 7 ?
                  "⚠️ التعبير العاطفي غير منتظم. سجّل في دورة 'لغة الحب بين الزوجين'." :
                  "❗ نقص في التعبير عن الحب. استعن بجلسات الإرشاد الزواجي المتخصص."
                }
              </p>
            </CardContent>
          </Card>
        </div>

        {/* التوصيات العامة */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-purple-600" />
              التوصيات والإرشادات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`p-6 rounded-lg ${
              results.level === 'high' ? 'bg-green-50 border border-green-200' :
              results.level === 'medium' ? 'bg-yellow-50 border border-yellow-200' :
              'bg-red-50 border border-red-200'
            }`}>
              {results.level === 'high' ? (
                <div>
                  <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    توافق مرتفع جدًا (107 فأكثر)
                  </h4>
                  <p className="text-green-700 mb-4">
                    🎉 علاقتكما صحية ومستقرة. حافظا على أوقاتكما المشتركة وواصلا تقوية التواصل الإيجابي.
                  </p>
                  <ul className="list-disc list-inside text-sm text-green-600 space-y-1">
                    <li>خصصا لقاءً أسبوعيًا للحوار والتخطيط المشترك</li>
                    <li>اهتما بالتعبير عن الامتنان والتقدير المتبادل</li>
                    <li>حافظا على النشاطات الترفيهية المشتركة</li>
                  </ul>
                </div>
              ) : results.level === 'medium' ? (
                <div>
                  <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    توافق متوسط (92-106)
                  </h4>
                  <p className="text-yellow-700 mb-4">
                    ⚠️ قد توجد بعض التحديات. يُنصح بإجراء مراجعة للمواضيع التي ظهرت فيها أقل درجات.
                  </p>
                  <ul className="list-disc list-inside text-sm text-yellow-600 space-y-1">
                    <li>🎓 التحق بدورة "فن التفاهم الزوجي" المتاحة في المنصة</li>
                    <li>📱 استخدم خاصية "الاستشارة الإلكترونية" لعرض التحديات</li>
                    <li>📝 مارس تمارين "الحوار البناء" الأسبوعية</li>
                  </ul>
                </div>
              ) : (
                <div>
                  <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    توافق منخفض (أقل من 92)
                  </h4>
                  <p className="text-red-700 mb-4">
                    ❗ هناك مؤشرات على تراجع جودة العلاقة. يُفضل التحدث مع مختص زواجي عبر المنصة.
                  </p>
                  <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
                    <li>🏥 احجز جلسة مع مختص أسري عبر المنصة فورًا</li>
                    <li>📚 ابدأ بدورة "إعادة بناء التفاهم الأسري"</li>
                    <li>💬 استكشف برنامج "مواعيد زوجية من المنزل"</li>
                    <li>🔄 أعد تقييم الأولويات والتوقعات المشتركة</li>
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* أزرار الإجراءات */}
        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={() => window.print()}>
            طباعة التقرير
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            احجز استشارة مع مختص
          </Button>
          <Button variant="outline">
            تصفح الدورات المقترحة
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto" dir={currentLanguage.direction}>
      {/* Header */}
      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-purple-600 flex items-center justify-center gap-3">
            <Heart className="h-8 w-8" />
            مقياس التوافق الزواجي (سبانير)
          </CardTitle>
          <CardDescription className="text-lg">
            تقييم مدى التوافق بين الزوجين في أربعة أبعاد رئيسية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">تعليمات المقياس:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• ستجد مجموعة من العبارات، اختر الإجابة التي تعبر بدقة عن واقع علاقتك الزوجية</li>
              <li>• اختر خيارًا واحدًا فقط لكل بند</li>
              <li>• تأكد من الإجابة على جميع البنود قبل إرسال المقياس</li>
              <li>• الزمن المتوقع: حوالي 5 دقائق</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>السؤال {currentStep + 1} من {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Question */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-purple-600 mb-2">
            <span className="bg-purple-100 px-2 py-1 rounded">{currentQuestion.category}</span>
          </div>
          <CardTitle className="text-xl">{currentQuestion.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                  selectedAnswer === option.value ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option.value}
                  checked={selectedAnswer === option.value}
                  onChange={() => handleAnswer(currentQuestion.id, option.value)}
                  className="mr-3"
                />
                <span className="font-medium">{option.label}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          السابق
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={selectedAnswer === undefined}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {currentStep === questions.length - 1 ? 'عرض النتائج' : 'التالي'}
        </Button>
      </div>
    </div>
  );
};

export default MaritalCompatibilityTest;
