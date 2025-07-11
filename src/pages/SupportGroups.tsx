import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useData } from '@/data/DataProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { 
  Users, 
  MessageCircle, 
  Shield, 
  Heart,
  Brain,
  Home,
  Baby,
  Stethoscope,
  Send,
  UserPlus,
  Crown,
  Lock,
  MessageSquare
} from 'lucide-react';
import { getUserById } from '@/data/testData';
import Header from '@/components/Header';

interface SupportGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  moderatorId: string;
  isPrivate: boolean;
  members: string[];
  messages: GroupMessage[];
  createdAt: string;
}

interface GroupMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isModerated?: boolean;
}

const SupportGroups = () => {
  const { user } = useAuth();
  const { users } = useData();
  const [supportGroups, setSupportGroups] = useState<SupportGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<SupportGroup | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupData, setNewGroupData] = useState({
    name: '',
    description: '',
    category: 'general',
    isPrivate: false
  });

  // Données des groupes par défaut
  const defaultGroups: SupportGroup[] = [
    {
      id: 'group-1',
      name: 'دعم الأزواج الجدد',
      description: 'مجموعة دعم للأزواج المتزوجين حديثاً لمشاركة التجارب والنصائح',
      category: 'marriage',
      memberCount: 24,
      moderatorId: 'formateur-1',
      isPrivate: false,
      members: ['client-1', 'client-2'],
      messages: [
        {
          id: 'msg-1',
          senderId: 'client-1',
          content: 'مرحباً بالجميع! أنا متزوج حديثاً وأحتاج لبعض النصائح حول التأقلم مع الحياة الزوجية',
          timestamp: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'msg-2',
          senderId: 'formateur-1',
          content: 'مرحباً بك! هذا شعور طبيعي تماماً. التأقلم يحتاج وقت وصبر من الطرفين',
          timestamp: new Date(Date.now() - 3300000).toISOString()
        }
      ],
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString()
    },
    {
      id: 'group-2',
      name: 'إدارة الضغوط النفسية',
      description: 'مساحة آمنة لمناقشة وتبادل استراتيجيات التعامل مع الضغوط اليومية',
      category: 'stress',
      memberCount: 18,
      moderatorId: 'formateur-2',
      isPrivate: false,
      members: ['client-1'],
      messages: [
        {
          id: 'msg-3',
          senderId: 'client-2',
          content: 'كيف تتعاملون مع ضغوط العمل والمنزل في نفس الوقت؟',
          timestamp: new Date(Date.now() - 7200000).toISOString()
        }
      ],
      createdAt: new Date(Date.now() - 86400000 * 14).toISOString()
    },
    {
      id: 'group-3',
      name: 'تربية الأطفال الإيجابية',
      description: 'نصائح وتجارب في التربية الإيجابية وبناء علاقة صحية مع الأطفال',
      category: 'parenting',
      memberCount: 31,
      moderatorId: 'formateur-1',
      isPrivate: false,
      members: [],
      messages: [],
      createdAt: new Date(Date.now() - 86400000 * 21).toISOString()
    },
    {
      id: 'group-4',
      name: 'الدعم النفسي للنساء',
      description: 'مجموعة خاصة لدعم النساء في مختلف تحديات الحياة',
      category: 'women',
      memberCount: 15,
      moderatorId: 'formateur-2',
      isPrivate: true,
      members: [],
      messages: [],
      createdAt: new Date(Date.now() - 86400000 * 10).toISOString()
    }
  ];

  // تحميل البيانات
  useEffect(() => {
    const savedGroups = localStorage.getItem('support_groups');
    if (savedGroups) {
      setSupportGroups(JSON.parse(savedGroups));
    } else {
      setSupportGroups(defaultGroups);
      localStorage.setItem('support_groups', JSON.stringify(defaultGroups));
    }
  }, []);

  // حفظ البيانات
  const saveGroups = (groups: SupportGroup[]) => {
    setSupportGroups(groups);
    localStorage.setItem('support_groups', JSON.stringify(groups));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'marriage': return <Heart className="h-5 w-5" />;
      case 'stress': return <Brain className="h-5 w-5" />;
      case 'parenting': return <Baby className="h-5 w-5" />;
      case 'women': return <Shield className="h-5 w-5" />;
      case 'health': return <Stethoscope className="h-5 w-5" />;
      default: return <Users className="h-5 w-5" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'marriage': return 'الزواج والأسرة';
      case 'stress': return 'إدارة الضغوط';
      case 'parenting': return 'تربية الأطفال';
      case 'women': return 'دعم النساء';
      case 'health': return 'الصحة النفسية';
      default: return 'عام';
    }
  };

  const handleJoinGroup = (groupId: string) => {
    if (!user?.id) return;

    const updatedGroups = supportGroups.map(group => {
      if (group.id === groupId && !group.members.includes(user.id)) {
        return {
          ...group,
          members: [...group.members, user.id],
          memberCount: group.memberCount + 1
        };
      }
      return group;
    });

    saveGroups(updatedGroups);
    toast({
      title: "انضممت للمجموعة",
      description: "تم انضمامك للمجموعة بنجاح"
    });
  };

  const handleLeaveGroup = (groupId: string) => {
    if (!user?.id) return;

    const updatedGroups = supportGroups.map(group => {
      if (group.id === groupId && group.members.includes(user.id)) {
        return {
          ...group,
          members: group.members.filter(id => id !== user.id),
          memberCount: group.memberCount - 1
        };
      }
      return group;
    });

    saveGroups(updatedGroups);
    setSelectedGroup(null);
    toast({
      title: "تركت المجموعة",
      description: "تم مغادرة المجموعة بنجاح"
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedGroup || !user?.id) return;

    const message: GroupMessage = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      content: newMessage,
      timestamp: new Date().toISOString()
    };

    const updatedGroups = supportGroups.map(group => {
      if (group.id === selectedGroup.id) {
        return {
          ...group,
          messages: [...group.messages, message]
        };
      }
      return group;
    });

    saveGroups(updatedGroups);
    setSelectedGroup(prev => prev ? { ...prev, messages: [...prev.messages, message] } : null);
    setNewMessage('');
  };

  const handleCreateGroup = () => {
    if (!newGroupData.name.trim() || !user?.id) return;

    const newGroup: SupportGroup = {
      id: `group-${Date.now()}`,
      name: newGroupData.name,
      description: newGroupData.description,
      category: newGroupData.category,
      memberCount: 1,
      moderatorId: user.id,
      isPrivate: newGroupData.isPrivate,
      members: [user.id],
      messages: [],
      createdAt: new Date().toISOString()
    };

    saveGroups([...supportGroups, newGroup]);
    setShowCreateGroup(false);
    setNewGroupData({ name: '', description: '', category: 'general', isPrivate: false });
    
    toast({
      title: "تم إنشاء المجموعة",
      description: "تم إنشاء مجموعة الدعم بنجاح"
    });
  };

  const userGroups = supportGroups.filter(group => group.members.includes(user?.id || ''));
  const availableGroups = supportGroups.filter(group => !group.members.includes(user?.id || ''));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gold-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">مجموعات الدعم</h1>
              <p className="text-gray-600">انضم لمجتمع الدعم واحصل على المساعدة من أشخاص يفهمون تجربتك</p>
            </div>
            <Dialog open={showCreateGroup} onOpenChange={setShowCreateGroup}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  إنشاء مجموعة
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>إنشاء مجموعة دعم جديدة</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">اسم المجموعة</label>
                    <Input
                      value={newGroupData.name}
                      onChange={(e) => setNewGroupData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="اكتب اسم المجموعة"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">الوصف</label>
                    <Textarea
                      value={newGroupData.description}
                      onChange={(e) => setNewGroupData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="اكتب وصف المجموعة"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">الفئة</label>
                    <select 
                      value={newGroupData.category}
                      onChange={(e) => setNewGroupData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="general">عام</option>
                      <option value="marriage">الزواج والأسرة</option>
                      <option value="stress">إدارة الضغوط</option>
                      <option value="parenting">تربية الأطفال</option>
                      <option value="women">دعم النساء</option>
                      <option value="health">الصحة النفسية</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="private"
                      checked={newGroupData.isPrivate}
                      onChange={(e) => setNewGroupData(prev => ({ ...prev, isPrivate: e.target.checked }))}
                    />
                    <label htmlFor="private" className="text-sm">مجموعة خاصة</label>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleCreateGroup} className="flex-1">
                      إنشاء المجموعة
                    </Button>
                    <Button variant="outline" onClick={() => setShowCreateGroup(false)} className="flex-1">
                      إلغاء
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* قائمة المجموعات */}
          <div className="lg:col-span-1">
            <Tabs defaultValue="my-groups" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="my-groups">مجموعاتي</TabsTrigger>
                <TabsTrigger value="available">متاحة</TabsTrigger>
              </TabsList>

              <TabsContent value="my-groups">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">مجموعاتي ({userGroups.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {userGroups.map((group) => (
                        <div
                          key={group.id}
                          className={`p-3 rounded-lg border cursor-pointer hover:bg-gray-50 ${
                            selectedGroup?.id === group.id ? 'bg-purple-50 border-purple-200' : ''
                          }`}
                          onClick={() => setSelectedGroup(group)}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {getCategoryIcon(group.category)}
                            <h3 className="font-medium text-sm">{group.name}</h3>
                            {group.isPrivate && <Lock className="h-4 w-4 text-gray-500" />}
                          </div>
                          <p className="text-xs text-gray-600">{group.memberCount} عضو</p>
                          {group.moderatorId === user?.id && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              <Crown className="h-3 w-3 mr-1" />
                              مشرف
                            </Badge>
                          )}
                        </div>
                      ))}
                      {userGroups.length === 0 && (
                        <p className="text-center text-gray-500 py-4 text-sm">لم تنضم لأي مجموعة بعد</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="available">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">مجموعات متاحة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {availableGroups.map((group) => (
                        <div key={group.id} className="p-3 rounded-lg border">
                          <div className="flex items-center gap-2 mb-2">
                            {getCategoryIcon(group.category)}
                            <h3 className="font-medium text-sm">{group.name}</h3>
                            {group.isPrivate && <Lock className="h-4 w-4 text-gray-500" />}
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{group.memberCount} عضو</p>
                          <p className="text-xs text-gray-700 mb-3">{group.description}</p>
                          <Button 
                            size="sm" 
                            className="w-full text-xs"
                            onClick={() => handleJoinGroup(group.id)}
                          >
                            انضمام
                          </Button>
                        </div>
                      ))}
                      {availableGroups.length === 0 && (
                        <p className="text-center text-gray-500 py-4 text-sm">لا توجد مجموعات متاحة</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* منطقة المحادثة */}
          <div className="lg:col-span-3">
            {selectedGroup ? (
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {getCategoryIcon(selectedGroup.category)}
                        {selectedGroup.name}
                        {selectedGroup.isPrivate && <Lock className="h-5 w-5 text-gray-500" />}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{selectedGroup.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="outline">
                          {selectedGroup.memberCount} عضو
                        </Badge>
                        <Badge variant="outline">
                          {getCategoryName(selectedGroup.category)}
                        </Badge>
                        {selectedGroup.moderatorId === user?.id && (
                          <Badge className="bg-purple-100 text-purple-800">
                            <Crown className="h-3 w-3 mr-1" />
                            مشرف
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleLeaveGroup(selectedGroup.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      مغادرة
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  {/* منطقة الرسائل */}
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-96">
                    {selectedGroup.messages.map((message) => {
                      const sender = getUserById(message.senderId);
                      const isModerator = message.senderId === selectedGroup.moderatorId;
                      const isCurrentUser = message.senderId === user?.id;
                      
                      return (
                        <div key={message.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                            isCurrentUser 
                              ? 'bg-purple-600 text-white' 
                              : isModerator 
                                ? 'bg-yellow-100 text-gray-900 border border-yellow-300'
                                : 'bg-gray-100 text-gray-900'
                          }`}>
                            {!isCurrentUser && (
                              <div className="flex items-center gap-1 mb-1">
                                <p className="text-xs font-medium">
                                  {sender?.name || 'مستخدم'}
                                </p>
                                {isModerator && <Crown className="h-3 w-3 text-yellow-600" />}
                              </div>
                            )}
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${isCurrentUser ? 'text-purple-200' : 'text-gray-500'}`}>
                              {new Date(message.timestamp).toLocaleTimeString('ar-DZ', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    {selectedGroup.messages.length === 0 && (
                      <div className="flex items-center justify-center h-32">
                        <div className="text-center">
                          <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">لا توجد رسائل بعد</p>
                          <p className="text-sm text-gray-400">كن أول من يبدأ المحادثة</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* مربع إرسال الرسائل */}
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="اكتب رسالتك..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-[600px]">
                <CardContent className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">اختر مجموعة للبدء</h3>
                    <p className="text-gray-500">انضم لمجموعة دعم وابدأ المحادثة مع الأعضاء</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportGroups;