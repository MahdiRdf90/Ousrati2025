import React, { useState, createContext, useContext } from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Language {
  code: string;
  name: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const languages: Language[] = [
  { code: 'ar', name: 'العربية', flag: '🇩🇿', direction: 'rtl' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', direction: 'ltr' },
  { code: 'en', name: 'English', flag: '🇺🇸', direction: 'ltr' },
];

const translations = {
  ar: {
    'home': 'الرئيسية',
    'booking': 'الحجز',
    'courses': 'الدورات',
    'tests': 'الاختبارات',
    'clinics': 'العيادات',
    'users': 'المستخدمين',
    'marketing': 'التسويق',
    'about': 'من نحن',
    'contact': 'اتصل بنا',
    'getStarted': 'ابدأ الآن',
    'bookAppointment': 'احجز موعدًا',
    'contactUs': 'تواصل معنا',
    'whoAreWe': 'من نحن؟',
    'back': 'العودة',
    'send': 'إرسال',
    'loading': 'جاري التحميل...',
    'chooseLanguage': 'اختر اللغة',
    'howCanIHelp': 'كيف يمكنني مساعدتك اليوم؟',
    // About Us section translations
    'aboutUs.welcome': 'مرحبًا بك في مساحتك الآمنة...',
    'aboutUs.title': '🏠 من نحن؟',
    'aboutUs.subtitle': 'مرحبًا بك في مساحتك الآمنة...',
    'aboutUs.description': '"أسرتي" هي منصة جزائرية رقمية تهدف إلى دعم الأسرة والعلاقة الزوجية من خلال الإرشاد والعلاج المتخصص، في بيئة آمنة ومحترمة، تراعي خصوصيات المجتمع الجزائري.',
    'aboutUs.services': 'نوفّر استشارات، محتوى توعوي، دورات واختبارات، وربط مباشر مع مختصين لمساعدتك على بناء أسرة أكثر تماسكًا ووعيًا.',
    'aboutUs.motto': '"أسرتي"... معك في كل خطوة، من الفهم إلى الحل.',
    'aboutUs.contextP1': 'في السنوات الأخيرة، شهدت الجزائر تزايدًا ملحوظًا في حالات الطلاق وارتفاعًا في نسبة النزاعات الزوجية، نتيجة التحولات الثقافية والاجتماعية والاقتصادية المتسارعة، مما أفرز تحديات جديدة أمام الأزواج والعائلات.',
    'aboutUs.contextP2': 'جاء تأسيس "أسرتي" ليكون ردًّا فعليًا ومسؤولًا على هذه التحولات، عبر تقديم خدمات رقمية متخصصة، تتماشى مع الخصوصيات الدينية والثقافية واللغوية للمجتمع الجزائري، وتمنح المستخدمين إمكانية الوصول إلى مختصين معتمدين أينما كانوا، بسهولة وخصوصية.',
    // Booking page translations
    'booking.title': '📅 احجز موعدك مع المختص',
    'booking.subtitle': 'اختر الاختصاص والوقت المناسب لك',
    'booking.selectSpecialty': 'اختر الاختصاص',
    'booking.selectTime': 'اختر الوقت المناسب',
    'booking.selectDate': 'اختر التاريخ',
    'booking.confirmBooking': 'تأكيد الحجز',
    'booking.maritalCounseling': 'إرشاد زوجي',
    'booking.familyCounseling': 'إرشاد أسري',
    'booking.childPsychology': 'علم نفس الطفل',
    'booking.premaritalCounseling': 'إرشاد ما قبل الزواج',
    'booking.individualTherapy': 'علاج نفسي فردي',
    'booking.groupTherapy': 'علاج جماعي',
    'booking.bookingForm': 'نموذج الحجز',
    'booking.personalInfo': 'المعلومات الشخصية',
    'booking.fullName': 'الاسم الكامل',
    'booking.phoneNumber': 'رقم الهاتف',
    'booking.email': 'البريد الإلكتروني',
    'booking.age': 'العمر',
    'booking.sessionType': 'نوع الجلسة',
    'booking.sessionDetails': 'تفاصيل الجلسة',
    'booking.briefDescription': 'وصف مختصر للحالة',
    'booking.previousExperience': 'هل سبق لك تلقي استشارة نفسية؟',
    'booking.preferredLanguage': 'اللغة المفضلة للجلسة',
    'booking.emergencyContact': 'جهة الاتصال في حالة الطوارئ',
    'booking.submitBooking': 'إرسال طلب الحجز',
    'booking.bookingSuccess': 'تم إرسال طلب الحجز بنجاح',
    'booking.bookingSuccessMessage': 'سيتم التواصل معك خلال 24 ساعة لتأكيد الموعد',
    'booking.requiredField': 'هذا الحقل مطلوب',
    'booking.yes': 'نعم',
    'booking.no': 'لا',
    'booking.morning': 'صباحاً',
    'booking.afternoon': 'بعد الظهر',
    'booking.evening': 'مساءً',
    // Marketing page translations
    'marketing.title': '📣 المصلحة التجارية والتسويق',
    'marketing.subtitle': 'نشر الوعي الأسري وبناء مجتمع صحي من خلال حملات تسويقية هادفة',
    'marketing.activeCampaigns': 'حملات نشطة',
    'marketing.totalReach': 'إجمالي الوصول',
    'marketing.engagementRate': 'معدل التفاعل',
    'marketing.targetingAccuracy': 'دقة الاستهداف',
    'marketing.currentCampaigns': 'الحملات الحالية',
    'marketing.familyAwarenessCampaign': 'حملة الوعي الأسري',
    'marketing.maritalAwarenessMonth': 'شهر التوعية الزوجية',
    'marketing.newFamiliesProgram': 'برنامج الأسر الجديدة',
    'marketing.active': 'نشطة',
    'marketing.soon': 'قريباً',
    'marketing.completed': 'مكتملة',
    'marketing.reach': 'الوصول',
    'marketing.engagement': 'التفاعل',
    'marketing.preciseTargeting': 'استهداف دقيق',
    'marketing.preciseTargetingDesc': 'وصول للفئات المستهدفة بدقة عالية',
    'marketing.performanceAnalysis': 'تحليل الأداء',
    'marketing.performanceAnalysisDesc': 'متابعة وتحليل نتائج الحملات التسويقية',
    'marketing.digitalMarketing': 'التسويق الرقمي',
    'marketing.digitalMarketingDesc': 'حملات على منصات التواصل الاجتماعي',
    'marketing.detailedReports': 'تقارير مفصلة',
    'marketing.detailedReportsDesc': 'إحصائيات شاملة عن الوصول والتفاعل',
    'marketing.joinCampaigns': 'انضم لحملاتنا التوعوية',
    'marketing.joinMessage': 'كن جزءاً من رسالتنا في نشر الوعي الأسري والزوجي',
    // chatbot translations
    'chatbot.title': 'المرشد الأسري الجزائري',
    'chatbot.textChat': 'دردشة نصية',
    'chatbot.welcome': 'مرحباً بك في منصة "أسرتي" 🏠\n\nأنا المرشد الأسري الجزائري، مساعدك الذكي المختص في الإرشاد والعلاج الأسري والزوجي.\n\nكيف يمكنني مساعدتك اليوم؟ 💬',
    'chatbot.placeholder': 'اكتب رسالتك هنا...',
    'chatbot.privacy': 'نحن هنا لدعمك بسرية تامة واحترام كامل',
    'chatbot.emergency': 'طوارئ',
    'chatbot.emergencyAlert': 'حالة طوارئ - يرجى طلب المساعدة فوراً',
    'chatbot.immediateActions': 'إجراءات فورية',
    'chatbot.dontHesitate': 'لا تترددي في طلب المساعدة فوراً.',
    'chatbot.tip': 'نصيحة',
    'chatbot.urgentSupport': 'إذا كنت بحاجة لدعم عاجل، يمكنك التواصل مع خط الدعم',
    'chatbot.maritalResources': 'مواردنا المفيدة',
    'chatbot.communicationGuide': 'دليل تحسين التواصل الزوجي',
    'chatbot.compatibilityTest': 'اختبار التوافق الزواجي',
    'chatbot.onlineCounseling': 'جلسات إرشاد زوجي عن بُعد',
    'chatbot.familyResources': 'مواردنا للأسر',
    'chatbot.positiveParenting': 'دليل التربية الإيجابية',
    'chatbot.teenageTips': 'نصائح للتعامل مع المراهقين',
    'chatbot.familyCounseling': 'استشارات أسرية متخصصة',
    'chatbot.premaritalPrograms': 'برامج الإعداد للزواج',
    'chatbot.marriagePrep': 'دورة الاستعداد للزواج',
    'chatbot.readinessTest': 'اختبار الاستعداد الزواجي',
    'chatbot.communicationWorkshops': 'ورش التواصل الفعال'
  },
  fr: {
    'home': 'Accueil',
    'booking': 'Réservation',
    'courses': 'Cours',
    'tests': 'Tests',
    'clinics': 'Cliniques',
    'users': 'Utilisateurs',
    'marketing': 'Marketing',
    'about': 'À propos',
    'contact': 'Contact',
    'getStarted': 'Commencer maintenant',
    'bookAppointment': 'Prendre un rendez-vous',
    'contactUs': 'Contactez-nous',
    'whoAreWe': 'Qui sommes-nous ?',
    'back': 'Retour',
    'send': 'Envoyer',
    'loading': 'Chargement en cours...',
    'chooseLanguage': 'Choisir la langue',
    'howCanIHelp': 'Comment puis-je vous aider aujourd\'hui ?',
    // About Us section translations
    'aboutUs.welcome': 'Bienvenue dans votre espace de confiance...',
    'aboutUs.title': '🏠 Qui sommes-nous ?',
    'aboutUs.subtitle': 'Bienvenue dans votre espace de confiance...',
    'aboutUs.description': 'OUSRATI est une plateforme numérique algérienne qui vise à soutenir la famille et la relation conjugale à travers des services spécialisés d\'orientation et de thérapie, dans un environnement sécurisé et respectueux, adapté aux spécificités culturelles de la société algérienne.',
    'aboutUs.services': 'Nous proposons des consultations, du contenu éducatif, des formations, des tests interactifs et une mise en relation directe avec des spécialistes pour vous aider à construire une famille plus forte et plus consciente.',
    'aboutUs.motto': 'OUSRATI... à vos côtés à chaque étape, de la compréhension à la solution.',
    'aboutUs.contextP1': 'Ces dernières années, l\'Algérie a connu une augmentation notable des cas de divorce et une hausse des conflits conjugaux, résultant des transformations culturelles, sociales et économiques rapides, créant de nouveaux défis pour les couples et les familles.',
    'aboutUs.contextP2': 'La création d\'OUSRATI constitue une réponse concrète et responsable à ces transformations, en offrant des services numériques spécialisés, adaptés aux spécificités religieuses, culturelles et linguistiques de la société algérienne, permettant aux utilisateurs d\'accéder facilement et en toute confidentialité à des spécialistes certifiés où qu\'ils soient.',
    // Booking page translations
    'booking.title': '📅 Réservez votre rendez-vous avec un spécialiste',
    'booking.subtitle': 'Choisissez la spécialité et l\'heure qui vous conviennent',
    'booking.selectSpecialty': 'Choisir la spécialité',
    'booking.selectTime': 'Choisir l\'heure',
    'booking.selectDate': 'Choisir la date',
    'booking.confirmBooking': 'Confirmer la réservation',
    'booking.maritalCounseling': 'Conseil conjugal',
    'booking.familyCounseling': 'Conseil familial',
    'booking.childPsychology': 'Psychologie de l\'enfant',
    'booking.premaritalCounseling': 'Conseil prénuptial',
    'booking.individualTherapy': 'Thérapie individuelle',
    'booking.groupTherapy': 'Thérapie de groupe',
    'booking.bookingForm': 'Formulaire de réservation',
    'booking.personalInfo': 'Informations personnelles',
    'booking.fullName': 'Nom complet',
    'booking.phoneNumber': 'Numéro de téléphone',
    'booking.email': 'Adresse e-mail',
    'booking.age': 'Âge',
    'booking.sessionType': 'Type de séance',
    'booking.sessionDetails': 'Détails de la séance',
    'booking.briefDescription': 'Description brève de la situation',
    'booking.previousExperience': 'Avez-vous déjà reçu une consultation psychologique ?',
    'booking.preferredLanguage': 'Langue préférée pour la séance',
    'booking.emergencyContact': 'Contact d\'urgence',
    'booking.submitBooking': 'Envoyer la demande de réservation',
    'booking.bookingSuccess': 'Demande de réservation envoyée avec succès',
    'booking.bookingSuccessMessage': 'Nous vous contacterons dans les 24 heures pour confirmer le rendez-vous',
    'booking.requiredField': 'Ce champ est requis',
    'booking.yes': 'Oui',
    'booking.no': 'Non',
    'booking.morning': 'Matin',
    'booking.afternoon': 'Après-midi',
    'booking.evening': 'Soir',
    // Marketing page translations
    'marketing.title': '📣 Département Commercial et Marketing',
    'marketing.subtitle': 'Sensibilisation familiale et construction d\'une société saine par des campagnes marketing ciblées',
    'marketing.activeCampaigns': 'campagnes actives',
    'marketing.totalReach': 'portée totale',
    'marketing.engagementRate': 'taux d\'engagement',
    'marketing.targetingAccuracy': 'précision du ciblage',
    'marketing.currentCampaigns': 'Campagnes actuelles',
    'marketing.familyAwarenessCampaign': 'Campagne de sensibilisation familiale',
    'marketing.maritalAwarenessMonth': 'Mois de sensibilisation conjugale',
    'marketing.newFamiliesProgram': 'Programme nouvelles familles',
    'marketing.active': 'active',
    'marketing.soon': 'bientôt',
    'marketing.completed': 'terminée',
    'marketing.reach': 'Portée',
    'marketing.engagement': 'Engagement',
    'marketing.preciseTargeting': 'Ciblage précis',
    'marketing.preciseTargetingDesc': 'Atteindre les groupes cibles avec une grande précision',
    'marketing.performanceAnalysis': 'Analyse des performances',
    'marketing.performanceAnalysisDesc': 'Suivi et analyse des résultats des campagnes marketing',
    'marketing.digitalMarketing': 'Marketing numérique',
    'marketing.digitalMarketingDesc': 'Campagnes sur les plateformes de médias sociaux',
    'marketing.detailedReports': 'Rapports détaillés',
    'marketing.detailedReportsDesc': 'Statistiques complètes sur la portée et l\'engagement',
    'marketing.joinCampaigns': 'Rejoignez nos campagnes de sensibilisation',
    'marketing.joinMessage': 'Faites partie de notre mission de diffusion de la sensibilisation familiale et conjugale',
    // chatbot translations
    'chatbot.title': 'Conseiller Familial Algérien',
    'chatbot.textChat': 'Chat textuel',
    'chatbot.welcome': 'Bienvenue sur la plateforme "OUSRATI" 🏠\n\nJe suis le conseiller familial algérien, votre assistant intelligent spécialisé dans l\'accompagnement et la thérapie familiale et conjugale.\n\nComment puis-je vous aider aujourd\'hui ? 💬',
    'chatbot.placeholder': 'Tapez votre message ici...',
    'chatbot.privacy': 'Nous sommes là pour vous soutenir en toute confidentialité et respect',
    'chatbot.emergency': 'Urgence',
    'chatbot.emergencyAlert': 'Situation d\'urgence - veuillez demander de l\'aide immédiatement',
    'chatbot.immediateActions': 'Actions immédiates',
    'chatbot.dontHesitate': 'N\'hésitez pas à demander de l\'aide immédiatement.',
    'chatbot.tip': 'Conseil',
    'chatbot.urgentSupport': 'Si vous avez besoin d\'un soutien urgent, vous pouvez contacter la ligne d\'assistance',
    'chatbot.maritalResources': 'Nos ressources utiles',
    'chatbot.communicationGuide': 'Guide d\'amélioration de la communication conjugale',
    'chatbot.compatibilityTest': 'Test de compatibilité conjugale',
    'chatbot.onlineCounseling': 'Séances de conseil conjugal à distance',
    'chatbot.familyResources': 'Nos ressources familiales',
    'chatbot.positiveParenting': 'Guide de parentalité positive',
    'chatbot.teenageTips': 'Conseils pour gérer les adolescents',
    'chatbot.familyCounseling': 'Consultations familiales spécialisées',
    'chatbot.premaritalPrograms': 'Programmes de préparation au mariage',
    'chatbot.marriagePrep': 'Cours de préparation au mariage',
    'chatbot.readinessTest': 'Test de préparation au mariage',
    'chatbot.communicationWorkshops': 'Ateliers de communication efficace'
  },
  en: {
    'home': 'Home',
    'booking': 'Booking',
    'courses': 'Courses',
    'tests': 'Tests',
    'clinics': 'Clinics',
    'users': 'Users',
    'marketing': 'Marketing',
    'about': 'About',
    'contact': 'Contact',
    'getStarted': 'Get Started',
    'bookAppointment': 'Book an Appointment',
    'contactUs': 'Contact Us',
    'whoAreWe': 'Who are we?',
    'back': 'Back',
    'send': 'Send',
    'loading': 'Loading...',
    'chooseLanguage': 'Choose Language',
    'howCanIHelp': 'How can I assist you today?',
    // About Us section translations
    'aboutUs.welcome': 'Welcome to your safe space...',
    'aboutUs.title': '🏠 Who are we?',
    'aboutUs.subtitle': 'Welcome to your safe space...',
    'aboutUs.description': 'OUSRATI is a digital Algerian platform dedicated to supporting families and couples through specialized counseling and therapy, in a safe and respectful environment that honors the unique cultural values of Algerian society.',
    'aboutUs.services': 'We offer consultations, educational content, training programs, assessments, and direct access to specialists — all designed to help you build a more resilient and conscious family.',
    'aboutUs.motto': 'OUSRATI... with you at every step, from understanding to solution.',
    'aboutUs.contextP1': 'In recent years, Algeria has witnessed a notable increase in divorce cases and rising marital conflicts, resulting from rapid cultural, social, and economic transformations, creating new challenges for couples and families.',
    'aboutUs.contextP2': 'The establishment of OUSRATI represents a concrete and responsible response to these transformations, by providing specialized digital services that align with the religious, cultural, and linguistic specificities of Algerian society, giving users easy and private access to certified specialists wherever they are.',
    // Booking page translations
    'booking.title': '📅 Book Your Appointment with a Specialist',
    'booking.subtitle': 'Choose the specialty and time that suits you',
    'booking.selectSpecialty': 'Select Specialty',
    'booking.selectTime': 'Select Time',
    'booking.selectDate': 'Select Date',
    'booking.confirmBooking': 'Confirm Booking',
    'booking.maritalCounseling': 'Marital Counseling',
    'booking.familyCounseling': 'Family Counseling',
    'booking.childPsychology': 'Child Psychology',
    'booking.premaritalCounseling': 'Premarital Counseling',
    'booking.individualTherapy': 'Individual Therapy',
    'booking.groupTherapy': 'Group Therapy',
    'booking.bookingForm': 'Booking Form',
    'booking.personalInfo': 'Personal Information',
    'booking.fullName': 'Full Name',
    'booking.phoneNumber': 'Phone Number',
    'booking.email': 'Email Address',
    'booking.age': 'Age',
    'booking.sessionType': 'Session Type',
    'booking.sessionDetails': 'Session Details',
    'booking.briefDescription': 'Brief Description of the Situation',
    'booking.previousExperience': 'Have you received psychological consultation before?',
    'booking.preferredLanguage': 'Preferred Language for Session',
    'booking.emergencyContact': 'Emergency Contact',
    'booking.submitBooking': 'Submit Booking Request',
    'booking.bookingSuccess': 'Booking request sent successfully',
    'booking.bookingSuccessMessage': 'We will contact you within 24 hours to confirm the appointment',
    'booking.requiredField': 'This field is required',
    'booking.yes': 'Yes',
    'booking.no': 'No',
    'booking.morning': 'Morning',
    'booking.afternoon': 'Afternoon',
    'booking.evening': 'Evening',
    // Marketing page translations
    'marketing.title': '📣 Commercial & Marketing Department',
    'marketing.subtitle': 'Spreading family awareness and building a healthy society through targeted marketing campaigns',
    'marketing.activeCampaigns': 'active campaigns',
    'marketing.totalReach': 'total reach',
    'marketing.engagementRate': 'engagement rate',
    'marketing.targetingAccuracy': 'targeting accuracy',
    'marketing.currentCampaigns': 'Current Campaigns',
    'marketing.familyAwarenessCampaign': 'Family Awareness Campaign',
    'marketing.maritalAwarenessMonth': 'Marital Awareness Month',
    'marketing.newFamiliesProgram': 'New Families Program',
    'marketing.active': 'active',
    'marketing.soon': 'soon',
    'marketing.completed': 'completed',
    'marketing.reach': 'Reach',
    'marketing.engagement': 'Engagement',
    'marketing.preciseTargeting': 'Precise Targeting',
    'marketing.preciseTargetingDesc': 'Reaching target groups with high precision',
    'marketing.performanceAnalysis': 'Performance Analysis',
    'marketing.performanceAnalysisDesc': 'Tracking and analyzing marketing campaign results',
    'marketing.digitalMarketing': 'Digital Marketing',
    'marketing.digitalMarketingDesc': 'Campaigns on social media platforms',
    'marketing.detailedReports': 'Detailed Reports',
    'marketing.detailedReportsDesc': 'Comprehensive statistics on reach and engagement',
    'marketing.joinCampaigns': 'Join Our Awareness Campaigns',
    'marketing.joinMessage': 'Be part of our mission to spread family and marital awareness',
    // chatbot translations
    'chatbot.title': 'Algerian Family Counselor',
    'chatbot.textChat': 'Text chat',
    'chatbot.welcome': 'Welcome to "OUSRATI" platform 🏠\n\nI am the Algerian family counselor, your intelligent assistant specialized in family and marital guidance and therapy.\n\nHow can I help you today? 💬',
    'chatbot.placeholder': 'Type your message here...',
    'chatbot.privacy': 'We are here to support you with complete confidentiality and respect',
    'chatbot.emergency': 'Emergency',
    'chatbot.emergencyAlert': 'Emergency situation - please seek help immediately',
    'chatbot.immediateActions': 'Immediate actions',
    'chatbot.dontHesitate': 'Don\'t hesitate to seek help immediately.',
    'chatbot.tip': 'Tip',
    'chatbot.urgentSupport': 'If you need urgent support, you can contact the support line',
    'chatbot.maritalResources': 'Our useful resources',
    'chatbot.communicationGuide': 'Marital communication improvement guide',
    'chatbot.compatibilityTest': 'Marital compatibility test',
    'chatbot.onlineCounseling': 'Remote marital counseling sessions',
    'chatbot.familyResources': 'Our family resources',
    'chatbot.positiveParenting': 'Positive parenting guide',
    'chatbot.teenageTips': 'Tips for dealing with teenagers',
    'chatbot.familyCounseling': 'Specialized family consultations',
    'chatbot.premaritalPrograms': 'Marriage preparation programs',
    'chatbot.marriagePrep': 'Marriage preparation course',
    'chatbot.readinessTest': 'Marriage readiness test',
    'chatbot.communicationWorkshops': 'Effective communication workshops'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    document.documentElement.dir = language.direction;
    document.documentElement.lang = language.code;
  };

  const t = (key: string): string => {
    return translations[currentLanguage.code as keyof typeof translations]?.[key as keyof typeof translations.ar] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const LanguageSelector = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden md:inline">{currentLanguage.name}</span>
        <span className="md:hidden">{currentLanguage.flag}</span>
      </Button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 bg-white border rounded-lg shadow-lg z-50 min-w-[150px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-right hover:bg-gray-50 flex items-center gap-2 ${
                currentLanguage.code === lang.code ? 'bg-primary/10 text-primary' : ''
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
