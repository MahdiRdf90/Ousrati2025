import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useData } from '@/data/DataProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Star, 
  Search,
  Phone,
  Mail,
  Clock,
  TrendingUp
} from 'lucide-react';

const Clients = () => {
  const { user } = useAuth();
  const { users, sessions, messages, addMessage } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  // Get clients for the current formateur
  const formateurClients = users.filter(u => 
    u.role === 'client' && 
    sessions.some(s => s.formateurId === user?.id && s.clientId === u.id)
  );

  const filteredClients = formateurClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getClientStats = (clientId: string) => {
    const clientSessions = sessions.filter(s => s.clientId === clientId && s.formateurId === user?.id);
    const completedSessions = clientSessions.filter(s => s.status === 'completed');
    const totalSessions = clientSessions.length;
    const lastSession = clientSessions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

    return {
      totalSessions,
      completedSessions: completedSessions.length,
      lastSession: lastSession?.date || 'لا توجد جلسات',
      progress: totalSessions > 0 ? Math.round((completedSessions.length / totalSessions) * 100) : 0
    };
  };

  const handleSendMessage = (clientId: string) => {
    const message = prompt('أرسل رسالة للعميل:');
    if (message && message.trim()) {
      addMessage({
        senderId: user?.id || '',
        receiverId: clientId,
        message: message.trim(),
        timestamp: new Date().toISOString(),
        read: false
      });
      
      toast({
        title: "تم إرسال الرسالة",
        description: "تم إرسال الرسالة بنجاح للعميل",
      });
    }
  };

  const handleScheduleSession = (clientId: string) => {
    toast({
      title: "جدولة جلسة",
      description: "سيتم توجيهك لجدولة جلسة جديدة...",
    });
    // Navigate to booking with client pre-selected
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gold-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">عملائي</h1>
          <p className="text-gray-600">إدارة ومتابعة عملائك وتقدمهم</p>
          
          {/* Search */}
          <div className="relative mt-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="البحث عن عميل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 max-w-md"
            />
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{formateurClients.length}</p>
              <p className="text-sm text-gray-600">إجمالي العملاء</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {sessions.filter(s => s.formateurId === user?.id && s.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-600">جلسات مكتملة</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">4.8</p>
              <p className="text-sm text-gray-600">متوسط التقييم</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">85%</p>
              <p className="text-sm text-gray-600">معدل التحسن</p>
            </CardContent>
          </Card>
        </div>

        {/* Clients Grid */}
        <div className="grid gap-6">
          {filteredClients.map((client) => {
            const stats = getClientStats(client.id);
            return (
              <Card key={client.id} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={client.avatar} alt={client.name} />
                        <AvatarFallback className="bg-purple-100 text-purple-600 text-lg">
                          {client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{client.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            <span>{client.email}</span>
                          </div>
                          {client.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              <span>{client.phone}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>آخر جلسة: {stats.lastSession}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            <span>التقدم: {stats.progress}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-4">
                      <div className="flex gap-2">
                        <Badge variant="secondary">
                          {stats.completedSessions}/{stats.totalSessions} جلسة
                        </Badge>
                        <Badge 
                          className={
                            stats.progress >= 75 ? 'bg-green-100 text-green-800' :
                            stats.progress >= 50 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }
                        >
                          {stats.progress >= 75 ? 'تقدم ممتاز' :
                           stats.progress >= 50 ? 'تقدم جيد' :
                           'بحاجة لمتابعة'}
                        </Badge>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSendMessage(client.id)}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          رسالة
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleScheduleSession(client.id)}
                        >
                          <Calendar className="h-4 w-4 mr-1" />
                          جدولة جلسة
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>التقدم العام</span>
                      <span>{stats.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          stats.progress >= 75 ? 'bg-green-500' :
                          stats.progress >= 50 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${stats.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          {filteredClients.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">لا توجد عملاء متاحون</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clients;