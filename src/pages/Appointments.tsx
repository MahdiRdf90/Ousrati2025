import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useData } from '@/data/DataProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { 
  Calendar, 
  Clock, 
  User, 
  Video, 
  MessageSquare, 
  CheckCircle, 
  XCircle,
  Search,
  Filter
} from 'lucide-react';

const Appointments = () => {
  const { user } = useAuth();
  const { sessions, updateSession } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const userSessions = sessions.filter(session => {
    if (user?.role === 'formateur') {
      return session.formateurId === user.id;
    } else if (user?.role === 'client') {
      return session.clientId === user.id;
    } else if (user?.role === 'admin') {
      return true; // Admin sees all sessions
    }
    return false;
  });

  const filteredSessions = userSessions.filter(session => {
    const matchesSearch = session.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.type?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || session.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (sessionId: string, newStatus: string) => {
    updateSession(sessionId, { status: newStatus });
    toast({
      title: "تم تحديث الحالة",
      description: `تم تغيير حالة الجلسة إلى ${newStatus === 'confirmed' ? 'مؤكد' : newStatus === 'cancelled' ? 'ملغي' : 'مكتمل'}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">مؤكد</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">في الانتظار</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">ملغي</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">مكتمل</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4 text-purple-600" />;
      case 'audio':
        return <MessageSquare className="h-4 w-4 text-blue-600" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gold-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">إدارة المواعيد</h1>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="البحث في المواعيد..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('all')}
                size="sm"
              >
                الكل
              </Button>
              <Button
                variant={statusFilter === 'pending' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('pending')}
                size="sm"
              >
                في الانتظار
              </Button>
              <Button
                variant={statusFilter === 'confirmed' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('confirmed')}
                size="sm"
              >
                مؤكد
              </Button>
              <Button
                variant={statusFilter === 'completed' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('completed')}
                size="sm"
              >
                مكتمل
              </Button>
            </div>
          </div>
        </div>

        {/* Sessions Grid */}
        <div className="grid gap-6">
          {filteredSessions.map((session) => (
            <Card key={session.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-full">
                      {getTypeIcon(session.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {session.title || 'جلسة استشارية'}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Calendar className="h-4 w-4" />
                        <span>{session.date}</span>
                        <Clock className="h-4 w-4 ml-2" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <User className="h-4 w-4" />
                        <span>
                          {user?.role === 'formateur' ? 'العميل' : 'المدرب'}: 
                          {session.clientName || session.formateurName || 'غير محدد'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {getStatusBadge(session.status)}
                    
                    {user?.role === 'formateur' && session.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(session.id, 'confirmed')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          تأكيد
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleStatusChange(session.id, 'cancelled')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          إلغاء
                        </Button>
                      </div>
                    )}
                    
                    {session.status === 'confirmed' && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(session.id, 'completed')}
                      >
                        بدء الجلسة
                      </Button>
                    )}
                  </div>
                </div>
                
                {session.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{session.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          {filteredSessions.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">لا توجد مواعيد متاحة</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;