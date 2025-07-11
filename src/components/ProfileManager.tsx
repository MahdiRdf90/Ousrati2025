import React, { useState } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useData } from '@/data/DataProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, MapPin, Clock, Star, Award } from 'lucide-react';

export const ProfileManager: React.FC = () => {
  const { user } = useAuth();
  const { updateUser } = useData();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(user);

  if (!user) return null;

  const handleSave = () => {
    if (profileData) {
      updateUser(profileData);
      setIsEditing(false);
      toast({
        title: "تم حفظ الملف الشخصي",
        description: "تم تحديث معلوماتك الشخصية بنجاح",
      });
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setProfileData(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleProfileChange = (profileType: 'clientProfile' | 'professionalProfile', field: string, value: any) => {
    setProfileData(prev => prev ? {
      ...prev,
      [profileType]: {
        ...prev[profileType],
        [field]: value
      }
    } : null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">الملف الشخصي</h1>
        <Button 
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          variant={isEditing ? "default" : "outline"}
        >
          {isEditing ? 'حفظ' : 'تحرير'}
        </Button>
      </div>

      <Card>
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <div className="flex justify-center items-center gap-2">
            <Badge variant="secondary">{user.role}</Badge>
            {user.professionalProfile?.isVerified && (
              <Badge variant="outline" className="text-green-600">
                <Award className="w-3 h-3 mr-1" />
                معتمد
              </Badge>
            )}
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">المعلومات الأساسية</TabsTrigger>
          {user.role === 'client' && <TabsTrigger value="client">الملف الشخصي</TabsTrigger>}
          {user.role === 'formateur' && <TabsTrigger value="professional">الملف المهني</TabsTrigger>}
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>المعلومات الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <Input
                    id="name"
                    value={profileData?.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData?.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    value={profileData?.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="location">الموقع</Label>
                  <Input
                    id="location"
                    value={profileData?.location || ''}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bio">نبذة شخصية</Label>
                <Textarea
                  id="bio"
                  value={profileData?.bio || ''}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {user.role === 'client' && (
          <TabsContent value="client">
            <Card>
              <CardHeader>
                <CardTitle>الملف الشخصي للعميل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">العمر</Label>
                    <Input
                      id="age"
                      type="number"
                      value={profileData?.clientProfile?.age || ''}
                      onChange={(e) => handleProfileChange('clientProfile', 'age', parseInt(e.target.value))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maritalStatus">الحالة الاجتماعية</Label>
                    <Select
                      value={profileData?.clientProfile?.maritalStatus || ''}
                      onValueChange={(value) => handleProfileChange('clientProfile', 'maritalStatus', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الحالة الاجتماعية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="célibataire">أعزب</SelectItem>
                        <SelectItem value="marié">متزوج</SelectItem>
                        <SelectItem value="divorcé">مطلق</SelectItem>
                        <SelectItem value="veuf">أرمل</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {profileData?.clientProfile?.goals && (
                  <div>
                    <Label>الأهداف الشخصية</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profileData.clientProfile.goals.map((goal, index) => (
                        <Badge key={index} variant="outline">{goal}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {user.role === 'formateur' && (
          <TabsContent value="professional">
            <Card>
              <CardHeader>
                <CardTitle>الملف المهني</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {user.professionalProfile && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>سنوات الخبرة</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-4 h-4" />
                          <span>{user.professionalProfile.experience} سنوات</span>
                        </div>
                      </div>
                      <div>
                        <Label>التقييم</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{user.professionalProfile.rating}/5</span>
                        </div>
                      </div>
                      <div>
                        <Label>إجمالي الجلسات</Label>
                        <span className="block mt-1">{user.professionalProfile.totalSessions} جلسة</span>
                      </div>
                      <div>
                        <Label>سعر الجلسة</Label>
                        <span className="block mt-1">{user.professionalProfile.sessionRate} د.ج</span>
                      </div>
                    </div>

                    <div>
                      <Label>التخصصات</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {user.professionalProfile.specializations.map((spec, index) => (
                          <Badge key={index} variant="secondary">{spec}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>الشهادات</Label>
                      <div className="space-y-2 mt-2">
                        {user.professionalProfile.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-primary" />
                            <span>{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>اللغات</Label>
                      <div className="flex gap-2 mt-2">
                        {user.professionalProfile.languages.map((lang, index) => (
                          <Badge key={index} variant="outline">
                            {lang === 'ar' ? 'العربية' : 'الفرنسية'}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ProfileManager;