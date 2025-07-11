
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, User, Phone, Mail, Heart } from 'lucide-react';
import Header from '@/components/Header';
import { useLanguage } from '@/components/LanguageSelector';
import { useToast } from '@/hooks/use-toast';

const Booking = () => {
  const { t, currentLanguage } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    age: '',
    specialty: '',
    sessionType: '',
    date: '',
    time: '',
    description: '',
    preferredLanguage: ''
  });

  const specialties = [
    { value: 'marital', label: t('booking.maritalCounseling') },
    { value: 'family', label: t('booking.familyCounseling') },
    { value: 'child', label: t('booking.childPsychology') },
    { value: 'premarital', label: t('booking.premaritalCounseling') },
    { value: 'individual', label: t('booking.individualTherapy') },
    { value: 'group', label: t('booking.groupTherapy') }
  ];

  const timeSlots = [
    { value: 'morning', label: t('booking.morning') },
    { value: 'afternoon', label: t('booking.afternoon') },
    { value: 'evening', label: t('booking.evening') }
  ];

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.phoneNumber || !formData.specialty || !formData.date) {
      toast({
        title: t('booking.requiredField'),
        description: t('booking.requiredField'),
        variant: "destructive"
      });
      return;
    }

    // Simulate booking submission
    toast({
      title: t('booking.bookingSuccess'),
      description: t('booking.bookingSuccessMessage'),
    });

    // Reset form
    setFormData({
      fullName: '',
      phoneNumber: '',
      email: '',
      age: '',
      specialty: '',
      sessionType: '',
      date: '',
      time: '',
      description: '',
      preferredLanguage: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gold-50" dir={currentLanguage.direction}>
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {t('booking.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('booking.subtitle')}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            هل سبق لك تلقي استشارة نفسية؟
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${currentLanguage.direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <Heart className="h-5 w-5 text-purple-600" />
              {t('booking.bookingForm')}
            </CardTitle>
            <CardDescription>
              {t('booking.personalInfo')}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className={currentLanguage.direction === 'rtl' ? 'text-right block' : ''}>{t('booking.fullName')} *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                    className={currentLanguage.direction === 'rtl' ? 'text-right' : ''}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className={currentLanguage.direction === 'rtl' ? 'text-right block' : ''}>{t('booking.phoneNumber')} *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    required
                    className={currentLanguage.direction === 'rtl' ? 'text-right' : ''}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className={currentLanguage.direction === 'rtl' ? 'text-right block' : ''}>{t('booking.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={currentLanguage.direction === 'rtl' ? 'text-right' : ''}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age" className={currentLanguage.direction === 'rtl' ? 'text-right block' : ''}>{t('booking.age')}</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className={currentLanguage.direction === 'rtl' ? 'text-right' : ''}
                  />
                </div>
              </div>

              {/* Session Details */}
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold text-gray-800 flex items-center gap-2 ${currentLanguage.direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <Calendar className="h-5 w-5" />
                  {t('booking.sessionDetails')}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className={currentLanguage.direction === 'rtl' ? 'text-right block' : ''}>{t('booking.selectSpecialty')} *</Label>
                    <Select value={formData.specialty} onValueChange={(value) => handleInputChange('specialty', value)}>
                      <SelectTrigger className={currentLanguage.direction === 'rtl' ? 'text-right' : ''}>
                        <SelectValue placeholder={t('booking.selectSpecialty')} />
                      </SelectTrigger>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty.value} value={specialty.value}>
                            {specialty.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className={currentLanguage.direction === 'rtl' ? 'text-right block' : ''}>{t('booking.selectTime')}</Label>
                    <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                      <SelectTrigger className={currentLanguage.direction === 'rtl' ? 'text-right' : ''}>
                        <SelectValue placeholder={t('booking.selectTime')} />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot.value} value={slot.value}>
                            {slot.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date" className={currentLanguage.direction === 'rtl' ? 'text-right block' : ''}>{t('booking.selectDate')} *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      required
                      className={currentLanguage.direction === 'rtl' ? 'text-right' : ''}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className={currentLanguage.direction === 'rtl' ? 'text-right block' : ''}>{t('booking.preferredLanguage')}</Label>
                    <Select value={formData.preferredLanguage} onValueChange={(value) => handleInputChange('preferredLanguage', value)}>
                      <SelectTrigger className={currentLanguage.direction === 'rtl' ? 'text-right' : ''}>
                        <SelectValue placeholder={t('booking.preferredLanguage')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description" className={currentLanguage.direction === 'rtl' ? 'text-right block' : ''}>{t('booking.briefDescription')}</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className={currentLanguage.direction === 'rtl' ? 'text-right' : ''}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                {t('booking.submitBooking')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Booking;
