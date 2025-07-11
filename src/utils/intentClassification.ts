
// نظام تصنيف نية المستخدم للمرشد الأسري الجزائري
export interface UserIntent {
  mainIntent: string;
  subIntent?: string;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  requiresSpecialist: boolean;
}

export interface IntentClassificationResult {
  intent: UserIntent;
  confidence: number;
  suggestedResponse: string;
}

// فئات النيات الرئيسية والفرعية
export const INTENT_CATEGORIES = {
  marital_counseling: {
    name: 'استشارة زوجية',
    subCategories: ['تواصل', 'غيرة', 'مشاكل يومية', 'خلافات مالية', 'العلاقة الحميمة'],
    urgency: 'medium' as const,
    requiresSpecialist: false
  },
  family_counseling: {
    name: 'استشارة أسرية',
    subCategories: ['مشاكل مع الأبناء', 'التربية', 'المراهقة', 'العلاقة مع الأهل'],
    urgency: 'medium' as const,
    requiresSpecialist: false
  },
  emotional_support: {
    name: 'دعم نفسي وعاطفي',
    subCategories: ['بعد الطلاق', 'فقدان الثقة', 'الاكتئاب', 'القلق'],
    urgency: 'high' as const,
    requiresSpecialist: true
  },
  domestic_violence: {
    name: 'عنف أسري',
    subCategories: ['تعنيف جسدي', 'تعنيف لفظي', 'تهديد', 'خطر فوري'],
    urgency: 'emergency' as const,
    requiresSpecialist: true
  },
  premarital_counseling: {
    name: 'استشارة ما قبل الزواج',
    subCategories: ['حدود العلاقة', 'التوافق', 'نظرة للمستقبل', 'التواصل'],
    urgency: 'low' as const,
    requiresSpecialist: false
  },
  religious_legal: {
    name: 'سؤال ديني أو قانوني',
    subCategories: ['حكم شرعي', 'وثائق الطلاق', 'الحقوق الزوجية', 'الميراث'],
    urgency: 'medium' as const,
    requiresSpecialist: true
  },
  specialist_referral: {
    name: 'إحالة إلى مختص',
    subCategories: ['أخصائي نفسي', 'جمعية دعم', 'محامي أسري', 'طبيب'],
    urgency: 'high' as const,
    requiresSpecialist: true
  },
  general_inquiry: {
    name: 'استفسار عام',
    subCategories: ['سؤال غامض', 'طلب معلومات', 'تعريف بالمنصة'],
    urgency: 'low' as const,
    requiresSpecialist: false
  }
};

// كلمات مفتاحية لتصنيف النية
const INTENT_KEYWORDS = {
  marital_counseling: [
    'زوج', 'زوجة', 'مرت', 'راجل', 'زواج', 'تواصل', 'غيرة', 'خلاف', 'مشكل زوجي',
    'ما نحكيوش', 'تعياني', 'مشاكل يومية', 'فلوس', 'عمل'
  ],
  family_counseling: [
    'ولد', 'بنت', 'أولاد', 'عائلة', 'أهل', 'تربية', 'مراهق', 'سلوك',
    'مدرسة', 'درجات', 'عنيد', 'ما يسمعش'
  ],
  emotional_support: [
    'حزين', 'مكتئب', 'يائس', 'محبط', 'تعبان نفسيا', 'ما نقدرش',
    'طلاق', 'انفصال', 'فقدت الثقة', 'ننهار', 'مشاعر سيئة'
  ],
  domestic_violence: [
    'يضربني', 'يعنفني', 'يسبني', 'يهددني', 'خايف', 'خطر',
    'عنف', 'ضرب', 'إهانة', 'تهديد', 'آذية جسدية'
  ],
  premarital_counseling: [
    'خطيب', 'خطيبة', 'مخطوب', 'قبل الزواج', 'استعداد للزواج',
    'حدود', 'توافق', 'مستقبل', 'تخطيط'
  ],
  religious_legal: [
    'حلال', 'حرام', 'شرعي', 'دين', 'فقه', 'حكم شرعي',
    'قانون', 'وثائق', 'طلاق قانوني', 'حقوق', 'محكمة'
  ],
  specialist_referral: [
    'أخصائي', 'دكتور', 'مختص', 'عيادة', 'جمعية', 'مساعدة',
    'محامي', 'استشارة طبية', 'علاج نفسي'
  ]
};

// وظيفة تصنيف النية
export function classifyUserIntent(userMessage: string): IntentClassificationResult {
  const message = userMessage.toLowerCase();
  const scores: Record<string, number> = {};

  // حساب نقاط لكل نية بناء على الكلمات المفتاحية
  Object.entries(INTENT_KEYWORDS).forEach(([intent, keywords]) => {
    scores[intent] = keywords.reduce((score, keyword) => {
      return message.includes(keyword.toLowerCase()) ? score + 1 : score;
    }, 0);
  });

  // إيجاد النية الأعلى نقاطاً
  const topIntent = Object.entries(scores).reduce((max, [intent, score]) => {
    return score > max.score ? { intent, score } : max;
  }, { intent: 'general_inquiry', score: 0 });

  // تحديد النية الفرعية
  const category = INTENT_CATEGORIES[topIntent.intent as keyof typeof INTENT_CATEGORIES];
  let subIntent = undefined;

  if (topIntent.score > 0 && category.subCategories.length > 0) {
    // البحث عن النية الفرعية المناسبة
    const subScores = category.subCategories.map(sub => ({
      sub,
      score: message.includes(sub.toLowerCase()) ? 1 : 0
    }));
    
    const topSub = subScores.reduce((max, current) => 
      current.score > max.score ? current : max
    );
    
    if (topSub.score > 0) {
      subIntent = topSub.sub;
    }
  }

  const confidence = Math.min(topIntent.score / 3, 1); // تطبيع الثقة

  const intent: UserIntent = {
    mainIntent: category.name,
    subIntent,
    description: category.name,
    urgency: category.urgency,
    requiresSpecialist: category.requiresSpecialist
  };

  return {
    intent,
    confidence,
    suggestedResponse: generateSuggestedResponse(intent, userMessage)
  };
}

// توليد رد مقترح بناء على النية
function generateSuggestedResponse(intent: UserIntent, userMessage: string): string {
  switch (intent.mainIntent) {
    case 'عنف أسري':
      return `أنا هنا لدعمك، وأتفهم تمامًا أنك تمرين بوضع صعب جدًا. التعنيف الجسدي أو اللفظي غير مقبول في أي علاقة.

إذا كنتِ في خطر فوري، يرجى الاتصال بالرقم الوطني لحماية النساء من العنف: 1548

نقترح عليكِ أيضًا قراءة دليل المنصة: كيف أتصرف في حالة العنف الأسري؟. أنتِ لستِ وحدك.`;

    case 'دعم نفسي وعاطفي':
      return `أتفهم مشاعرك تمامًا وأريدك أن تعرف أنك لست وحدك. المرور بفترات صعبة أمر طبيعي ويحتاج وقت للشفاء.

من المهم أن تطلب الدعم من أشخاص تثق بهم، وإذا كنت بحاجة لمساعدة متخصصة، يمكنني توجيهك لأخصائيين معتمدين في منطقتك.`;

    case 'استشارة زوجية':
      return `العلاقات الزوجية تمر بتحديات، وهذا أمر طبيعي. المهم هو التواصل الصحيح والتفهم المتبادل.

أنصحك بتجربة التحدث بصراحة مع شريك حياتك في وقت مناسب، والاستعانة بمواردنا حول تحسين التواصل الزوجي.`;

    case 'سؤال ديني أو قانوني':
      return `هذا السؤال يدخل ضمن الاستشارات الدينية/القانونية المتخصصة. أنصحك بالتواصل مع الجهات المختصة:

للأسئلة الدينية: إمام مسجد أو دار الإفتاء
للأسئلة القانونية: محامي متخصص في قانون الأسرة

يمكنني مساعدتك في الجوانب النفسية والاجتماعية المرتبطة بموضوعك.`;

    default:
      return `شكرًا لثقتك في منصة "أسرتي". أنا هنا لمساعدتك في أي استفسار يتعلق بالإرشاد الأسري والزوجي.

يمكنك طرح أسئلتك بحرية، وسأقوم بتوجيهك للموارد المناسبة أو المختصين عند الحاجة.`;
  }
}

// دالة للحصول على إجراءات الطوارئ
export function getEmergencyActions(intent: UserIntent): string[] {
  if (intent.urgency === 'emergency') {
    return [
      'الاتصال بالطوارئ: 14',
      'خط النساء ضد العنف: 1548',
      'التوجه لأقرب مركز شرطة',
      'طلب مساعدة من أشخاص تثق بهم'
    ];
  }
  
  if (intent.urgency === 'high') {
    return [
      'التواصل مع أخصائي نفسي',
      'طلب الدعم من العائلة أو الأصدقاء',
      'الاطلاع على مواردنا التعليمية'
    ];
  }
  
  return [];
}
