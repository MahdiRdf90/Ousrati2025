import { testUsers } from '@/data/testData';

export interface MatchingProfile {
  userId: string;
  needs: string[];
  preferences: {
    language: 'ar' | 'fr' | 'both';
    sessionType: 'video' | 'audio' | 'text' | 'any';
    availability: string[];
    priceRange: [number, number];
  };
  issues: string[];
  demographics: {
    age: number;
    gender: 'male' | 'female';
    location: string;
    maritalStatus: string;
  };
}

export interface ProfessionalProfile {
  userId: string;
  specializations: string[];
  languages: string[];
  experience: number;
  rating: number;
  availability: string[];
  priceRange: [number, number];
  approaches: string[];
  certifications: string[];
}

export interface MatchResult {
  professionalId: string;
  score: number;
  reasons: string[];
  professional: any;
}

class MatchingService {
  private calculateCompatibilityScore(
    clientProfile: MatchingProfile, 
    professional: any
  ): { score: number; reasons: string[] } {
    let score = 0;
    const reasons: string[] = [];
    
    // 1. Spécialisation Match (40 points max)
    const clientIssues = clientProfile.issues;
    const professionalSpecializations = professional.specializations || [];
    
    let specializationMatch = 0;
    clientIssues.forEach(issue => {
      if (professionalSpecializations.some((spec: string) => 
        spec.toLowerCase().includes(issue.toLowerCase()) || 
        issue.toLowerCase().includes(spec.toLowerCase())
      )) {
        specializationMatch += 10;
        reasons.push(`متخصص في ${issue}`);
      }
    });
    score += Math.min(specializationMatch, 40);

    // 2. Langue (20 points max)
    const professionalLanguages = professional.languages || ['ar'];
    if (clientProfile.preferences.language === 'both' || 
        professionalLanguages.includes(clientProfile.preferences.language)) {
      score += 20;
      reasons.push('يتحدث باللغة المفضلة لديك');
    }

    // 3. Prix (15 points max)
    const professionalPrice = professional.pricePerSession || 0;
    const [minPrice, maxPrice] = clientProfile.preferences.priceRange;
    if (professionalPrice >= minPrice && professionalPrice <= maxPrice) {
      score += 15;
      reasons.push('ضمن النطاق السعري المناسب');
    }

    // 4. التقييم (10 points max)
    const rating = professional.rating || 0;
    score += (rating / 5) * 10;
    if (rating >= 4.5) {
      reasons.push('تقييم ممتاز من العملاء السابقين');
    }

    // 5. الخبرة (10 points max)
    const experience = professional.experienceYears || 0;
    score += Math.min(experience / 2, 10);
    if (experience >= 5) {
      reasons.push(`خبرة ${experience} سنوات في المجال`);
    }

    // 6. الموقع (5 points max)
    if (professional.location === clientProfile.demographics.location) {
      score += 5;
      reasons.push('متواجد في نفس المنطقة');
    }

    return { score: Math.round(score), reasons };
  }

  public findBestMatches(clientId: string, limit: number = 5): MatchResult[] {
    const client = testUsers.find(u => u.id === clientId);
    if (!client) return [];

    // Créer le profil client basé sur ses données avec des valeurs par défaut
    const clientProfile: MatchingProfile = {
      userId: clientId,
      needs: (client as any).needs || ['الاستشارة الزوجية', 'إدارة الضغوط'],
      preferences: {
        language: (client as any).preferredLanguage || 'ar',
        sessionType: (client as any).preferredSessionType || 'video',
        availability: (client as any).availability || [],
        priceRange: (client as any).budgetRange || [1000, 5000]
      },
      issues: (client as any).psychologicalIssues || ['القلق', 'الاكتئاب'],
      demographics: {
        age: (client as any).age || 30,
        gender: (client as any).gender || 'male',
        location: client.location || 'الجزائر',
        maritalStatus: (client as any).maritalStatus || 'متزوج'
      }
    };

    // Obtenir tous les professionnels
    const professionals = testUsers.filter(u => u.role === 'formateur');
    
    // Calculer les scores pour chaque professionnel
    const matches = professionals.map(professional => {
      const { score, reasons } = this.calculateCompatibilityScore(clientProfile, professional);
      
      return {
        professionalId: professional.id,
        score,
        reasons,
        professional
      };
    });

    // Trier par score décroissant et limiter les résultats
    return matches
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  public getMatchingReasons(clientId: string, professionalId: string): string[] {
    const matches = this.findBestMatches(clientId, 10);
    const match = matches.find(m => m.professionalId === professionalId);
    return match?.reasons || [];
  }

  public updateUserPreferences(userId: string, preferences: Partial<MatchingProfile['preferences']>): void {
    // Dans une vraie application, cela sauvegarderait dans la base de données
    console.log(`Updating preferences for user ${userId}:`, preferences);
  }

  public recordMatchingFeedback(clientId: string, professionalId: string, rating: number, feedback: string): void {
    // Enregistrer les commentaires pour améliorer l'algorithme
    const feedbackData = {
      clientId,
      professionalId,
      rating,
      feedback,
      timestamp: new Date().toISOString()
    };
    
    // Sauvegarder dans localStorage pour le moment
    const existingFeedback = JSON.parse(localStorage.getItem('matching_feedback') || '[]');
    existingFeedback.push(feedbackData);
    localStorage.setItem('matching_feedback', JSON.stringify(existingFeedback));
  }

  public getRecommendedCourses(clientId: string): any[] {
    const client = testUsers.find(u => u.id === clientId);
    if (!client) return [];

    const clientIssues = (client as any).psychologicalIssues || [];
    const clientNeeds = (client as any).needs || [];
    
    // Simuler des cours recommandés basés sur le profil
    const recommendedCourses = [
      {
        id: 'course-rec-1',
        title: 'تحسين التواصل الزوجي',
        description: 'دورة متخصصة في تطوير مهارات التواصل بين الأزواج',
        duration: '4 أسابيع',
        price: 2500,
        instructor: 'د. أحمد المالكي',
        rating: 4.8,
        relevanceScore: 85,
        reasons: ['مناسب لتحسين العلاقة الزوجية', 'يعالج مشاكل التواصل']
      },
      {
        id: 'course-rec-2',
        title: 'إدارة الضغوط والقلق',
        description: 'تقنيات فعالة للتعامل مع الضغوط النفسية اليومية',
        duration: '3 أسابيع',
        price: 1800,
        instructor: 'د. فاطمة بن عمر',
        rating: 4.7,
        relevanceScore: 92,
        reasons: ['يساعد في تقليل القلق', 'تقنيات عملية للاسترخاء']
      }
    ];

    return recommendedCourses;
  }
}

export default new MatchingService();