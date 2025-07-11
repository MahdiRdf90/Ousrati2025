// Données de test synchronisées pour la plateforme

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'client' | 'formateur';
  avatar?: string;
  phone?: string;
  bio?: string;
  location?: string;
  language?: 'ar' | 'fr';
  createdAt: string;
  updatedAt?: string;
  
  // Profil client
  clientProfile?: ClientProfile;
  
  // Profil professionnel
  professionalProfile?: ProfessionalProfile;
}

export interface ClientProfile {
  age?: number;
  maritalStatus?: 'célibataire' | 'marié' | 'divorcé' | 'veuf';
  hasChildren?: boolean;
  numberOfChildren?: number;
  preferredLanguage?: 'ar' | 'fr';
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory?: string[];
  goals?: string[];
  sessionHistory: string[]; // session IDs
}

export interface ProfessionalProfile {
  title: string; // Dr., Prof., etc.
  specializations: string[];
  certifications: string[];
  experience: number; // années d'expérience
  education: string[];
  languages: ('ar' | 'fr')[];
  sessionRate: number; // tarif par session
  availability: WeeklyAvailability;
  rating: number;
  totalSessions: number;
  clientIds: string[];
  description: string;
  isVerified: boolean;
}

export interface WeeklyAvailability {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

export interface TimeSlot {
  start: string; // HH:mm format
  end: string;   // HH:mm format
  available: boolean;
}

export interface Session {
  id: string;
  clientId: string;
  formateurId: string;
  date: string;
  time: string;
  duration: number; // en minutes
  type: 'video' | 'audio' | 'message';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  notes?: string;
  rating?: number;
  feedback?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  duration: string;
  totalHours: number;
  price: number;
  originalPrice?: number;
  level: 'مبتدئ' | 'متوسط' | 'متقدم';
  category: string;
  tags: string[];
  topics: string[];
  image: string;
  active: boolean;
  participants: string[]; // user IDs
  rating: number;
  reviews: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'file' | 'appointment';
}

export interface TestResult {
  id: string;
  userId: string;
  testType: string;
  score: number;
  results: any;
  completedAt: string;
}

// Utilisateurs de test avec profils complets
export const testUsers: User[] = [
  {
    id: 'admin-1',
    email: 'admin@osrati.dz',
    password: 'admin123',
    name: 'أدمين النظام',
    role: 'admin',
    avatar: '/placeholder.svg',
    phone: '+213 555 000 001',
    bio: 'مدير النظام المسؤول عن إدارة المنصة',
    location: 'الجزائر العاصمة',
    language: 'ar',
    createdAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'client-1',
    email: 'client@osrati.dz',
    password: 'client123',
    name: 'أحمد محمد الصالح',
    role: 'client',
    avatar: '/placeholder.svg',
    phone: '+213 555 000 002',
    bio: 'أسعى لتحسين علاقتي الزوجية والعائلية',
    location: 'وهران',
    language: 'ar',
    createdAt: '2024-01-15T14:30:00Z',
    clientProfile: {
      age: 32,
      maritalStatus: 'marié',
      hasChildren: true,
      numberOfChildren: 2,
      preferredLanguage: 'ar',
      emergencyContact: {
        name: 'فاطمة الصالح',
        phone: '+213 555 000 012',
        relationship: 'زوجة'
      },
      goals: ['تحسين التواصل مع الزوجة', 'إدارة ضغوط العمل', 'تربية الأطفال'],
      sessionHistory: ['session-1', 'session-2', 'session-5']
    }
  },
  {
    id: 'client-2',
    email: 'sara.ahmed@osrati.dz',
    password: 'client123',
    name: 'سارة أحمد بن علي',
    role: 'client',
    avatar: '/placeholder.svg',
    phone: '+213 555 000 003',
    bio: 'أم جديدة تبحث عن التوازن في الحياة الأسرية',
    location: 'عنابة',
    language: 'fr',
    createdAt: '2024-01-20T09:15:00Z',
    clientProfile: {
      age: 28,
      maritalStatus: 'marié',
      hasChildren: true,
      numberOfChildren: 1,
      preferredLanguage: 'fr',
      goals: ['إدارة ضغوط الأمومة', 'تحقيق التوازن', 'تطوير الذات'],
      sessionHistory: ['session-3']
    }
  },
  {
    id: 'client-3',
    email: 'fatima.zahra@osrati.dz',
    password: 'client123',
    name: 'فاطمة زهراء السعيد',
    role: 'client',
    avatar: '/placeholder.svg',
    phone: '+213 555 000 004',
    bio: 'باحثة عن الاستقرار النفسي والعاطفي',
    location: 'قسنطينة',
    language: 'ar',
    createdAt: '2024-02-01T16:45:00Z',
    clientProfile: {
      age: 35,
      maritalStatus: 'divorcé',
      hasChildren: false,
      goals: ['التعافي من الطلاق', 'بناء الثقة بالنفس', 'التحضير لعلاقة جديدة'],
      sessionHistory: ['session-4']
    }
  },
  {
    id: 'formateur-1',
    email: 'formateur@osrati.dz',
    password: 'formateur123',
    name: 'د. أمينة بن علي',
    role: 'formateur',
    avatar: '/placeholder.svg',
    phone: '+213 555 000 005',
    bio: 'أخصائية نفسية متخصصة في العلاج الزوجي والأسري',
    location: 'الجزائر العاصمة',
    language: 'ar',
    createdAt: '2024-01-01T08:00:00Z',
    professionalProfile: {
      title: 'د.',
      specializations: ['العلاج الزوجي', 'العلاج الأسري', 'إرشاد ما قبل الزواج'],
      certifications: ['دكتوراه في علم النفس', 'شهادة العلاج الأسري', 'رخصة مزاولة المهنة'],
      experience: 8,
      education: ['جامعة الجزائر - دكتوراه علم النفس', 'جامعة باريس - ماجستير العلاج الأسري'],
      languages: ['ar', 'fr'],
      sessionRate: 8000,
      availability: {
        monday: [{ start: '09:00', end: '17:00', available: true }],
        tuesday: [{ start: '09:00', end: '17:00', available: true }],
        wednesday: [{ start: '09:00', end: '17:00', available: true }],
        thursday: [{ start: '09:00', end: '17:00', available: true }],
        friday: [{ start: '09:00', end: '12:00', available: true }],
        saturday: [{ start: '09:00', end: '15:00', available: true }],
        sunday: [{ start: '14:00', end: '18:00', available: true }]
      },
      rating: 4.8,
      totalSessions: 256,
      clientIds: ['client-1', 'client-3'],
      description: 'متخصصة في العلاج النفسي والإرشاد الأسري مع خبرة 8 سنوات في مساعدة الأزواج والعائلات',
      isVerified: true
    }
  },
  {
    id: 'formateur-2',
    email: 'mohamed.saleh@osrati.dz',
    password: 'formateur123',
    name: 'د. محمد الصالح',
    role: 'formateur',
    avatar: '/placeholder.svg',
    phone: '+213 555 000 006',
    bio: 'متخصص في العلاج النفسي والإرشاد الزوجي',
    location: 'وهران',
    language: 'ar',
    createdAt: '2024-01-01T08:00:00Z',
    professionalProfile: {
      title: 'د.',
      specializations: ['العلاج النفسي', 'إرشاد الأزواج', 'علاج القلق والاكتئاب'],
      certifications: ['دكتوراه في الطب النفسي', 'شهادة العلاج المعرفي السلوكي'],
      experience: 12,
      education: ['جامعة وهران - دكتوراه الطب النفسي', 'جامعة مونبلييه - ماجستير علم النفس'],
      languages: ['ar', 'fr'],
      sessionRate: 9000,
      availability: {
        monday: [{ start: '10:00', end: '18:00', available: true }],
        tuesday: [{ start: '10:00', end: '18:00', available: true }],
        wednesday: [{ start: '10:00', end: '18:00', available: true }],
        thursday: [{ start: '10:00', end: '18:00', available: true }],
        friday: [{ start: '10:00', end: '16:00', available: true }],
        saturday: [{ start: '14:00', end: '18:00', available: true }],
        sunday: [{ start: '14:00', end: '17:00', available: true }]
      },
      rating: 4.9,
      totalSessions: 189,
      clientIds: ['client-2'],
      description: 'طبيب نفسي معتمد مع خبرة 12 سنة في العلاج النفسي والإرشاد الزوجي',
      isVerified: true
    }
  }];

// Sessions de test synchronisées
export const testSessions: Session[] = [
  {
    id: 'session-1',
    clientId: 'client-1',
    formateurId: 'formateur-1',
    date: '2024-01-15',
    time: '14:00',
    duration: 60,
    type: 'video',
    status: 'completed',
    price: 8000,
    notes: 'جلسة مفيدة جداً، تحسن ملحوظ في التواصل',
    rating: 5,
    feedback: 'ممتاز، استفدت كثيراً من هذه الجلسة'
  },
  {
    id: 'session-2',
    clientId: 'client-1',
    formateurId: 'formateur-1',
    date: '2024-01-22',
    time: '14:00',
    duration: 60,
    type: 'video',
    status: 'scheduled',
    price: 8000
  },
  {
    id: 'session-3',
    clientId: 'client-2',
    formateurId: 'formateur-2',
    date: '2024-01-18',
    time: '16:30',
    duration: 45,
    type: 'audio',
    status: 'confirmed',
    price: 6000
  },
  {
    id: 'session-4',
    clientId: 'client-3',
    formateurId: 'formateur-1',
    date: '2024-01-10',
    time: '10:00',
    duration: 60,
    type: 'video',
    status: 'completed',
    price: 8000,
    rating: 4,
    notes: 'تحسن ملحوظ في إدارة الضغوط'
  },
  {
    id: 'session-5',
    clientId: 'client-1',
    formateurId: 'formateur-1',
    date: '2024-01-25',
    time: '09:00',
    duration: 60,
    type: 'video',
    status: 'confirmed',
    price: 8000
  }
];

// Messages synchronisés
export const testMessages: Message[] = [
  {
    id: 'msg-1',
    senderId: 'client-2',
    receiverId: 'formateur-2',
    content: 'شكراً لك على الجلسة الرائعة، استفدت كثيراً من النصائح',
    timestamp: '2024-01-18T17:00:00Z',
    read: false,
    type: 'text'
  },
  {
    id: 'msg-2',
    senderId: 'client-1',
    receiverId: 'formateur-1',
    content: 'هل يمكن تغيير موعد الجلسة القادمة؟',
    timestamp: '2024-01-20T10:30:00Z',
    read: false,
    type: 'text'
  },
  {
    id: 'msg-3',
    senderId: 'client-3',
    receiverId: 'formateur-1',
    content: 'أشعر بتحسن كبير بعد تطبيق التمارين التي أعطيتني إياها',
    timestamp: '2024-01-19T15:45:00Z',
    read: true,
    type: 'text'
  }
];

// Résultats de tests psychologiques
export const testResults: TestResult[] = [
  {
    id: 'test-1',
    userId: 'client-1',
    testType: 'marital-satisfaction',
    score: 75,
    results: {
      communication: 80,
      intimacy: 70,
      conflict: 75,
      overall: 75
    },
    completedAt: '2024-01-10T12:00:00Z'
  },
  {
    id: 'test-2',
    userId: 'client-1',
    testType: 'emotional-intelligence',
    score: 85,
    results: {
      selfAwareness: 88,
      selfRegulation: 82,
      empathy: 85,
      socialSkills: 87
    },
    completedAt: '2024-01-12T14:30:00Z'
  },
  {
    id: 'test-3',
    userId: 'client-2',
    testType: 'stress-management',
    score: 65,
    results: {
      workStress: 60,
      familyStress: 70,
      copingSkills: 65,
      overall: 65
    },
    completedAt: '2024-01-16T11:15:00Z'
  }
];

// Cours avec participants synchronisés
export const testCourses: Course[] = [
  {
    id: 'course-1',
    title: 'إعداد ما قبل الزواج',
    description: 'دورة شاملة للتحضير لحياة زوجية ناجحة ومستقرة',
    instructor: 'د. أمينة بن علي',
    instructorId: 'formateur-1',
    duration: '4 أسابيع',
    totalHours: 16,
    price: 5000,
    originalPrice: 7000,
    level: 'مبتدئ',
    category: 'relationship',
    tags: ['زواج', 'علاقات', 'تواصل'],
    topics: [
      'فهم التوقعات الزوجية',
      'مهارات التواصل الفعال',
      'إدارة الخلافات',
      'التخطيط المالي للأسرة'
    ],
    image: '/placeholder.svg',
    active: true,
    participants: ['client-1', 'client-2'],
    rating: 4.8,
    reviews: 89
  },
  {
    id: 'course-2',
    title: 'مهارات التواصل الزوجي',
    description: 'تعلم كيفية التواصل بفعالية مع شريك الحياة',
    instructor: 'د. محمد الصالح',
    instructorId: 'formateur-2',
    duration: '3 أسابيع',
    totalHours: 12,
    price: 4000,
    originalPrice: 5500,
    level: 'متوسط',
    category: 'communication',
    tags: ['تواصل', 'مهارات', 'علاقات'],
    topics: [
      'الاستماع الفعال',
      'التعبير عن المشاعر',
      'حل النزاعات',
      'بناء الثقة'
    ],
    image: '/placeholder.svg',
    active: true,
    participants: ['client-1'],
    rating: 4.9,
    reviews: 67
  },
  {
    id: 'course-3',
    title: 'إدارة الضغوط الأسرية',
    description: 'كيفية التعامل مع التحديات والضغوط في الحياة الأسرية',
    instructor: 'د. خديجة المنصوري',
    instructorId: 'formateur-3',
    duration: '2 أسابيع',
    totalHours: 8,
    price: 3000,
    originalPrice: 4000,
    level: 'مبتدئ',
    category: 'wellness',
    tags: ['ضغوط', 'صحة نفسية', 'إدارة'],
    topics: [
      'تحديد مصادر الضغط',
      'تقنيات الاسترخاء',
      'إدارة الوقت',
      'التوازن بين العمل والأسرة'
    ],
    image: '/placeholder.svg',
    active: true,
    participants: ['client-3'],
    rating: 4.6,
    reviews: 45
  }
];

// Fonctions utilitaires pour gérer les données
export const getSessionsForUser = (userId: string, role: 'client' | 'formateur') => {
  if (role === 'client') {
    return testSessions.filter(session => session.clientId === userId);
  } else {
    return testSessions.filter(session => session.formateurId === userId);
  }
};

export const getMessagesForUser = (userId: string) => {
  return testMessages.filter(msg => msg.senderId === userId || msg.receiverId === userId);
};

export const getCoursesForUser = (userId: string) => {
  return testCourses.filter(course => course.participants.includes(userId));
};

export const getTestResultsForUser = (userId: string) => {
  return testResults.filter(result => result.userId === userId);
};

export const getUserById = (userId: string) => {
  return testUsers.find(user => user.id === userId);
};

export const getFormateurClients = (formateurId: string) => {
  const clientIds = testSessions
    .filter(session => session.formateurId === formateurId)
    .map(session => session.clientId);
  
  return testUsers.filter(user => clientIds.includes(user.id));
};