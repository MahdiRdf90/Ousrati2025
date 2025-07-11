
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, User, FileText, Download, Share2, Brain, Heart, AlertTriangle, Zap, Frown } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const OntarioChildMentalHealthTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const dimensions = [
    {
      name: 'اضطراب السلوك',
      icon: AlertTriangle,
      color: 'hsl(var(--destructive))',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
    },
    {
      name: 'فرط الحركة وتشتت الانتباه',
      icon: Zap,
      color: 'hsl(var(--warning))',
      items: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]
    },
    {
      name: 'القلق',
      icon: Brain,
      color: 'hsl(var(--primary))',
      items: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
    },
    {
      name: 'خوف الانفصال',
      icon: Heart,
      color: 'hsl(var(--secondary))',
      items: [46, 47, 48, 49, 50, 51, 52, 53, 54]
    },
    {
      name: 'الاكتئاب',
      icon: Frown,
      color: 'hsl(var(--muted-foreground))',
      items: [55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71]
    }
  ];

  const questions = [
    // اضطراب السلوك (1-21)
    'يسرق من البيت',
    'يسرق من خارج البيت',
    'يهرب من البيت',
    'يكذب ويغش',
    'يشعل الحرائق',
    'يهرب من المدرسة',
    'يقتحم البيوت أو السيارات',
    'يخرب أغراض الآخرين',
    'قاسٍ ومؤذٍ للحيوانات',
    'يستخدم سلاحًا في القتال (سكين، شفرة...)',
    'يهاجم الآخرين جسديًا',
    'قاسٍ ومؤذٍ للآخرين',
    'تنتابه نوبات غضب',
    'يجادل الأكبر منه كثيرًا',
    'يتمرد ويرد على الأكبر منه',
    'يفعل أشياء تزعج الآخرين',
    'يلوم الآخرين على أخطائه',
    'يغضب بسهولة',
    'دائم الزعل والغضب',
    'يتطاول على الآخرين',
    'يشتم ويسب بكلمات بذيئة',

    // فرط الحركة وتشتت الانتباه (22-35)
    'متململ وعصبي',
    'لا يجلس في الكرسي عند الطلب',
    'سهل التشتت',
    'صعوبة في انتظار دوره',
    'يقاطع ويجيب قبل السؤال',
    'صعوبة في اتباع التعليمات',
    'لا يركّز لفترة طويلة',
    'ينتقل بين الأنشطة دون إكمالها',
    'صعوبة في اللعب بهدوء',
    'يتحدث كثيرًا',
    'يتطفل ويقاطع الآخرين',
    'لا يبدو أنه يستمع',
    'يفقد الأشياء الضرورية',
    'يشارك في أنشطة خطرة دون التفكير بالعواقب',

    // القلق (36-45)
    'يقلق بشأن المستقبل',
    'يقلق بشأن الماضي',
    'يقلق من أداء الأمور بشكل مثالي',
    'يشكو من آلام في الجسم',
    'يشكو من صداع',
    'يشكو من غثيان أو دوار',
    'يشكو من ألم في المعدة',
    'يشعر بالإحراج بسهولة',
    'يطلب تأكيدات أنه "كويس"',
    'متوتر وعصبي',

    // خوف الانفصال (46-54)
    'يقلق على سلامة أحبائه',
    'يقلق من الانفصال عنهم',
    'يتغيب عن المدرسة للبقاء مع الأم',
    'يخاف النوم وحده',
    'يحب البقاء بمفرده',
    'يرى كوابيس عن التخلّي',
    'يشعر بالمرض عند الانفصال',
    'يشعر بالسوء عند الفراق',
    'يشعر بالضيق عند البعد عن من يحب',

    // الاكتئاب (55-71)
    'غير سعيد أو مكتئب',
    'فقد الاهتمام بالأنشطة',
    'لا يهتم بالحياة اليومية',
    'لا يستمتع بالأنشطة',
    'فقدان الوزن دون حمية',
    'زيادة الوزن دون رغبة',
    'صعوبة في النوم',
    'ينام كثيرًا',
    'فرط نشاط أو حركة',
    'بطيء وخامل',
    'يشعر بتعب دائم',
    'يرى أن الحياة بلا معنى',
    'يشعر بالذنب كثيرًا',
    'صعوبة في التركيز',
    'صعوبة في اتخاذ القرارات',
    'يتحدث عن إيذاء نفسه',
    'حاول إيذاء نفسه أو الانتحار'
  ];

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: value }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateDimensionScore = (dimensionIndex: number) => {
    const dimension = dimensions[dimensionIndex];
    let score = 0;
    dimension.items.forEach(itemIndex => {
      score += answers[itemIndex - 1] || 0;
    });
    return score;
  };

  const getScoreLevel = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage <= 30) return { level: 'منخفض', color: 'bg-green-500', description: 'طبيعي' };
    if (percentage <= 60) return { level: 'متوسط', color: 'bg-yellow-500', description: 'يحتاج متابعة' };
    return { level: 'مرتفع', color: 'bg-red-500', description: 'يحتاج تدخل مختص' };
  };

  const getRecommendations = (dimensionName: string, scoreLevel: string) => {
    const recommendations: { [key: string]: { [level: string]: string } } = {
      'اضطراب السلوك': {
        'منخفض': 'الطفل يظهر سلوكيات طبيعية. استمر في التربية الإيجابية والحدود الواضحة.',
        'متوسط': 'قد يحتاج الطفل لمزيد من الحدود والقوانين الواضحة. حاول تطبيق أساليب التربية الإيجابية.',
        'مرتفع': 'يُنصح بشدة بالتواصل مع أخصائي سلوك الأطفال لوضع خطة تدخل مناسبة.'
      },
      'فرط الحركة وتشتت الانتباه': {
        'منخفض': 'مستوى التركيز والنشاط طبيعي. استمر في توفير بيئة هادئة ومنظمة.',
        'متوسط': 'حاول تقليل المشتتات وإنشاء روتين يومي واضح. امنح الطفل فترات راحة منتظمة.',
        'مرتفع': 'يُنصح بالتواصل مع أخصائي نفسي أو طبيب أطفال لتقييم احتمالية وجود اضطراب ADHD.'
      },
      'القلق': {
        'منخفض': 'مستوى القلق طبيعي. استمر في توفير بيئة آمنة ومطمئنة للطفل.',
        'متوسط': 'علم الطفل تقنيات الاسترخاء والتنفس العميق. تحدث معه عن مخاوفه وطمئنه.',
        'مرتفع': 'يُنصح بالتواصل مع أخصائي نفسي لتعلم تقنيات إدارة القلق المتخصصة.'
      },
      'خوف الانفصال': {
        'منخفض': 'الطفل يتعامل بشكل طبيعي مع الانفصال. استمر في بناء الثقة والأمان.',
        'متوسط': 'ساعد الطفل تدريجياً على التعود على فترات الانفصال القصيرة مع تطمينات مستمرة.',
        'مرتفع': 'يُنصح بالتواصل مع أخصائي نفسي لتطوير استراتيجيات التعامل مع قلق الانفصال.'
      },
      'الاكتئاب': {
        'منخفض': 'مزاج الطفل طبيعي. استمر في توفير الدعم العاطفي والأنشطة الممتعة.',
        'متوسط': 'شجع الطفل على ممارسة الأنشطة التي يحبها وتواصل معه بانتظام حول مشاعره.',
        'مرتفع': 'يُنصح بشدة بالتواصل مع أخصائي نفسي أو طبيب نفسي للأطفال فوراً.'
      }
    };

    return recommendations[dimensionName]?.[scoreLevel] || 'استشر مختصاً للحصول على توجيه مناسب.';
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const results = dimensions.map((dimension, index) => {
      const score = calculateDimensionScore(index);
      const maxScore = dimension.items.length * 2;
      const scoreData = getScoreLevel(score, maxScore);
      return {
        name: dimension.name,
        score,
        maxScore,
        percentage: Math.round((score / maxScore) * 100),
        ...scoreData,
        icon: dimension.icon,
        color: dimension.color,
        recommendations: getRecommendations(dimension.name, scoreData.level)
      };
    });

    const chartData = results.map(result => ({
      dimension: result.name,
      score: result.percentage,
      fill: result.color
    }));

    const radarData = results.map(result => ({
      dimension: result.name.split(' ')[0],
      score: result.percentage,
      fullName: result.name
    }));

    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-blue-800 flex items-center justify-center gap-2">
              <Brain className="h-6 w-6" />
              نتائج مقياس أونتاريو للصحة النفسية للطفل
            </CardTitle>
            <p className="text-blue-600">تقييم شامل للحالة النفسية والسلوكية لطفلك</p>
          </CardHeader>
        </Card>

        {/* Overall Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              ملخص النتائج
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {results.map((result, index) => {
                const IconComponent = result.icon;
                return (
                  <div key={index} className="text-center p-4 rounded-lg border">
                    <IconComponent className="h-8 w-8 mx-auto mb-2" style={{ color: result.color }} />
                    <h4 className="font-semibold text-sm mb-2">{result.name}</h4>
                    <div className={`w-full h-2 rounded-full mb-2 ${result.color.includes('destructive') ? 'bg-red-100' : 
                      result.color.includes('warning') ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${result.color.includes('destructive') ? 'bg-red-500' : 
                          result.color.includes('warning') ? 'bg-yellow-500' : 'bg-blue-500'}`}
                        style={{ width: `${result.percentage}%` }}
                      />
                    </div>
                    <Badge 
                      variant={result.level === 'منخفض' ? 'default' : result.level === 'متوسط' ? 'secondary' : 'destructive'}
                      className="text-xs"
                    >
                      {result.level} ({result.percentage}%)
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>الرسم البياني الشريطي</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  score: {
                    label: "النتيجة",
                    color: "hsl(var(--primary))",
                  },
                }}
                className="h-64"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis 
                      dataKey="dimension" 
                      tick={{ fontSize: 10 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="score" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الرسم البياني الرادار</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  score: {
                    label: "النتيجة",
                    color: "hsl(var(--primary))",
                  },
                }}
                className="h-64"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} />
                    <Radar 
                      name="النتيجة" 
                      dataKey="score" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))" 
                      fillOpacity={0.3} 
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Results */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">التفسير والتوصيات التفصيلية</h3>
          {results.map((result, index) => {
            const IconComponent = result.icon;
            return (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
                  <CardTitle className="flex items-center gap-3">
                    <IconComponent className="h-6 w-6" style={{ color: result.color }} />
                    <span>{result.name}</span>
                    <Badge 
                      variant={result.level === 'منخفض' ? 'default' : result.level === 'متوسط' ? 'secondary' : 'destructive'}
                    >
                      {result.level}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">النتيجة: {result.score} من {result.maxScore}</span>
                      <span className="text-sm font-medium">{result.percentage}%</span>
                    </div>
                    <Progress value={result.percentage} className="h-2" />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">التوصيات:</h4>
                      <p className="text-blue-700 text-sm leading-relaxed">{result.recommendations}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                حفظ التقرير PDF
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                مشاركة مع المختص
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                مواد إرشادية
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-orange-800 mb-2">تنبيه مهم</h4>
                <p className="text-orange-700 text-sm leading-relaxed">
                  هذا المقياس أداة للفحص الأولي وليس تشخيصاً نهائياً. في حالة ظهور نتائج مرتفعة أو مثيرة للقلق، 
                  يُنصح بشدة بالتواصل مع أخصائي نفسي أو طبيب أطفال مختص للحصول على تقييم شامل.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-purple-50">
          <CardTitle className="text-2xl font-bold text-blue-800 flex items-center justify-center gap-2">
            <Brain className="h-6 w-6" />
            مقياس أونتاريو للصحة النفسية للطفل
          </CardTitle>
          <p className="text-blue-600 mt-2">نسخة الوالدين - تقييم السلوكيات والمشاعر خلال الأشهر الستة الماضية</p>
          
          <div className="flex justify-center items-center gap-6 mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>5 دقائق</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>71 سؤال</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>5 أبعاد</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Instructions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">📝 تعليمات المقياس</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 mb-3">
              يرجى قراءة كل بند، ثم اختيار الخيار الأنسب لحالة طفلك:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="bg-white p-3 rounded border">
                <span className="font-bold text-green-600">0</span> = ليس صحيحًا
              </div>
              <div className="bg-white p-3 rounded border">
                <span className="font-bold text-yellow-600">1</span> = صحيح نوعًا ما
              </div>
              <div className="bg-white p-3 rounded border">
                <span className="font-bold text-red-600">2</span> = صحيح تمامًا
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>السؤال {currentQuestion + 1} من {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Current Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            السؤال {currentQuestion + 1}: {questions[currentQuestion]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant={answers[currentQuestion] === 0 ? "default" : "outline"}
              onClick={() => handleAnswer(0)}
              className="h-16 text-center"
            >
              <div>
                <div className="font-bold text-green-600">0</div>
                <div className="text-sm">ليس صحيحًا</div>
              </div>
            </Button>
            <Button
              variant={answers[currentQuestion] === 1 ? "default" : "outline"}
              onClick={() => handleAnswer(1)}
              className="h-16 text-center"
            >
              <div>
                <div className="font-bold text-yellow-600">1</div>
                <div className="text-sm">صحيح نوعًا ما</div>
              </div>
            </Button>
            <Button
              variant={answers[currentQuestion] === 2 ? "default" : "outline"}
              onClick={() => handleAnswer(2)}
              className="h-16 text-center"
            >
              <div>
                <div className="font-bold text-red-600">2</div>
                <div className="text-sm">صحيح تمامًا</div>
              </div>
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              السؤال السابق
            </Button>
            {currentQuestion === questions.length - 1 ? (
              <Button
                onClick={() => setShowResults(true)}
                disabled={answers[currentQuestion] === undefined}
              >
                عرض النتائج
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                disabled={answers[currentQuestion] === undefined}
              >
                السؤال التالي
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OntarioChildMentalHealthTest;
