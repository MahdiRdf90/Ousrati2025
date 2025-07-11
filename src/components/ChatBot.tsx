
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, AlertTriangle, Phone, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { classifyUserIntent, getEmergencyActions, type IntentClassificationResult } from '@/utils/intentClassification';
import { useLanguage } from './LanguageSelector';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  intent?: IntentClassificationResult;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: t('chatbot.welcome'),
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // إضافة رسالة المستخدم
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // تصنيف نية المستخدم
    const intentResult = classifyUserIntent(inputMessage);
    
    // محاكاة معالجة الذكاء الاصطناعي
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage, intentResult);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        intent: intentResult
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string, intent: IntentClassificationResult): string => {
    const { intent: userIntent, confidence, suggestedResponse } = intent;

    // إضافة معلومات التصنيف للاستجابة في حالة الطوارئ
    if (userIntent.urgency === 'emergency') {
      const emergencyActions = getEmergencyActions(userIntent);
      return `🚨 ${t('chatbot.emergency')}\n\n${suggestedResponse}\n\n${t('chatbot.immediateActions')}:\n${emergencyActions.map(action => `• ${action}`).join('\n')}\n\n${t('chatbot.dontHesitate')}`;
    }

    if (userIntent.urgency === 'high') {
      return `${suggestedResponse}\n\n💡 ${t('chatbot.tip')}: ${t('chatbot.urgentSupport')}: 0664250682`;
    }

    // إضافة توجيهات للموارد حسب النية
    let resourceSuggestions = '';
    
    switch (userIntent.mainIntent) {
      case 'استشارة زوجية':
        resourceSuggestions = `\n\n📖 ${t('chatbot.maritalResources')}:\n• ${t('chatbot.communicationGuide')}\n• ${t('chatbot.compatibilityTest')}\n• ${t('chatbot.onlineCounseling')}`;
        break;
      case 'استشارة أسرية':
        resourceSuggestions = `\n\n👨‍👩‍👧‍👦 ${t('chatbot.familyResources')}:\n• ${t('chatbot.positiveParenting')}\n• ${t('chatbot.teenageTips')}\n• ${t('chatbot.familyCounseling')}`;
        break;
      case 'استشارة ما قبل الزواج':
        resourceSuggestions = `\n\n💍 ${t('chatbot.premaritalPrograms')}:\n• ${t('chatbot.marriagePrep')}\n• ${t('chatbot.readinessTest')}\n• ${t('chatbot.communicationWorkshops')}`;
        break;
    }

    return `${suggestedResponse}${resourceSuggestions}`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('ar-DZ', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full luxury-gradient text-white shadow-lg hover:shadow-xl transition-all duration-300 z-50 ${isOpen ? 'hidden' : 'block'}`}
        size="lg"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col">
          {/* Chat Header */}
          <div className="luxury-gradient text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{t('chatbot.title')}</h3>
                <p className="text-xs opacity-90">{t('chatbot.textChat')}</p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start space-x-2 space-x-reverse ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-100 text-purple-600'
                      }`}>
                        {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {/* عرض تنبيه الطوارئ */}
                        {message.intent?.intent.urgency === 'emergency' && (
                          <Alert className="mb-2 border-red-200 bg-red-50">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-800 text-xs">
                              {t('chatbot.emergencyAlert')}
                            </AlertDescription>
                          </Alert>
                        )}
                        
                        <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                        
                        {/* عرض معلومات النية للرسائل البوت (في وضع التطوير فقط) */}
                        {message.intent && process.env.NODE_ENV === 'development' && (
                          <div className="mt-2 text-xs opacity-70 border-t pt-2">
                            <div>النية: {message.intent.intent.mainIntent}</div>
                            {message.intent.intent.subIntent && (
                              <div>النية الفرعية: {message.intent.intent.subIntent}</div>
                            )}
                            <div>الثقة: {Math.round(message.intent.confidence * 100)}%</div>
                            <div>الأولوية: {message.intent.intent.urgency}</div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 ${
                      message.sender === 'user' ? 'text-left' : 'text-right'
                    }`}>
                      {formatTimestamp(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 space-x-reverse">
                    <div className="w-8 h-8 bg-gray-100 text-purple-600 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Emergency Contact Bar */}
          <div className="px-4 py-2 bg-red-50 border-t border-red-100">
            <div className="flex items-center justify-between text-xs">
              <span className="text-red-800 font-medium">{t('chatbot.emergency')}؟</span>
              <div className="flex items-center space-x-4 space-x-reverse">
                <a href="tel:14" className="flex items-center space-x-1 space-x-reverse text-red-600 hover:text-red-800">
                  <Phone className="h-3 w-3" />
                  <span>14</span>
                </a>
                <a href="tel:1548" className="flex items-center space-x-1 space-x-reverse text-red-600 hover:text-red-800">
                  <Phone className="h-3 w-3" />
                  <span>1548</span>
                </a>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2 space-x-reverse">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('chatbot.placeholder')}
                className="flex-1 text-right"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="luxury-gradient text-white"
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {t('chatbot.privacy')}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
