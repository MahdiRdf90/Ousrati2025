import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useData } from '@/data/DataProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { MessageSquare, Send, User, Phone, Video, Paperclip, Smile } from 'lucide-react';
import { getMessagesForUser, getUserById } from '@/data/testData';
import Header from '@/components/Header';

const Messages = () => {
  const { user } = useAuth();
  const { messages, addMessage, markMessageAsRead } = useData();
  const [userMessages, setUserMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (user?.id) {
      // Utiliser les messages du context et les filtrer pour l'utilisateur actuel
      const filteredMessages = messages.filter(msg => 
        msg.senderId === user.id || msg.receiverId === user.id
      );
      setUserMessages(filteredMessages);
    }
  }, [user, messages]);

  const conversations = userMessages.reduce((acc, msg) => {
    const otherUserId = msg.senderId === user?.id ? msg.receiverId : msg.senderId;
    if (!acc[otherUserId]) {
      acc[otherUserId] = [];
    }
    acc[otherUserId].push(msg);
    return acc;
  }, {});

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation && user?.id) {
      // Ajouter le message via le context
      addMessage({
        senderId: user.id,
        receiverId: selectedConversation,
        content: newMessage.trim(),
        type: 'text'
      });
      
      setNewMessage('');
      
      // Simuler la réponse automatique après un délai court
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addMessage({
            senderId: selectedConversation,
            receiverId: user.id,
            content: 'شكراً لرسالتك. سأرد عليك قريباً.',
            type: 'text'
          });
        }, 2000);
      }, 1000);
      
      toast({
        title: "تم إرسال الرسالة",
        description: "تم إرسال رسالتك بنجاح"
      });
    }
  };

  const handleMarkAsRead = (messageId: string) => {
    markMessageAsRead(messageId);
  };

  const handleStartCall = (type: 'voice' | 'video') => {
    toast({
      title: type === 'voice' ? "مكالمة صوتية" : "مكالمة فيديو",
      description: "سيتم بدء المكالمة قريباً...",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">الرسائل</h1>
          <p className="text-gray-600">تواصل مع المدربين والعملاء</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                المحادثات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(conversations).map(([userId, msgs]: [string, any]) => {
                  const otherUser = getUserById(userId);
                  const lastMessage = msgs[msgs.length - 1];
                  const unreadCount = msgs.filter((m: any) => !m.read && m.receiverId === user?.id).length;

                  return (
                    <div
                      key={userId}
                      className={`p-3 rounded-lg border cursor-pointer hover:bg-gray-50 ${
                        selectedConversation === userId ? 'bg-purple-50 border-purple-200' : ''
                      }`}
                      onClick={() => setSelectedConversation(userId)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p className="font-medium text-gray-900 truncate">{otherUser?.name}</p>
                            {unreadCount > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 truncate">{lastMessage.content}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {Object.keys(conversations).length === 0 && (
                  <p className="text-center text-gray-500 py-8">لا توجد محادثات</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2">
            {selectedConversation ? (
              <>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">{getUserById(selectedConversation)?.name}</p>
                        <p className="text-sm text-green-600 font-normal">
                          {isTyping ? 'يكتب...' : 'متصل'}
                        </p>
                      </div>
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleStartCall('voice')}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleStartCall('video')}
                      >
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                    {conversations[selectedConversation]?.map((message: any) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.senderId === user?.id ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.senderId === user?.id
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-200 text-gray-900'
                          }`}
                        >
                          <p>{message.content}</p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs opacity-70">
                              {new Date(message.timestamp).toLocaleTimeString('ar-DZ')}
                            </p>
                            {message.senderId === user?.id && (
                              <span className="text-xs opacity-70">
                                {message.read ? '✓✓' : '✓'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-200 text-gray-900">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="اكتب رسالتك..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button variant="ghost" size="sm">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">اختر محادثة للبدء</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;