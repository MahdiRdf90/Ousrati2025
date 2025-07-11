
import React from 'react';
import Header from '@/components/Header';
import { Users, UserCheck, Award, Activity, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UsersPage = () => {
  const userStats = [
    { title: 'المستخدمين النشطين', count: '2,500+', icon: Users },
    { title: 'الجلسات المكتملة', count: '8,750+', icon: UserCheck },
    { title: 'معدل الرضا', count: '96%', icon: Award },
    { title: 'متوسط التقييم', count: '4.8/5', icon: Activity },
  ];

  const userServices = [
    {
      title: 'إدارة الحسابات',
      description: 'متابعة شاملة لملفات المستخدمين وتاريخ الجلسات',
      features: ['تتبع الجلسات', 'إدارة المواعيد', 'تقارير مفصلة']
    },
    {
      title: 'الدعم الفني',
      description: 'مساعدة فورية للمستخدمين في حل المشاكل التقنية',
      features: ['دعم 24/7', 'حلول سريعة', 'إرشادات مفصلة']
    },
    {
      title: 'برنامج الولاء',
      description: 'نظام نقاط ومكافآت للمستخدمين المنتظمين',
      features: ['نقاط مكافآت', 'خصومات حصرية', 'عروض خاصة']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gold-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            👥 مصلحة المستخدمين
          </h1>
          <p className="text-xl text-gray-600">
            إدارة شاملة لحسابات المستخدمين ومتابعة رحلتهم العلاجية
          </p>
        </div>

        {/* User Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {userStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <Icon className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.count}</h3>
                <p className="text-gray-600">{stat.title}</p>
              </div>
            );
          })}
        </div>

        {/* Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {userServices.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <span className="text-purple-600 ml-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-purple-600 to-gold-600 text-white p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">تحتاج مساعدة؟</h2>
          <p className="mb-6">فريقنا متاح للإجابة على جميع استفساراتكم</p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" className="bg-white text-purple-600 hover:bg-gray-100">
              <Phone className="h-4 w-4 ml-2" />
              0664250682
            </Button>
            <Button variant="outline" className="bg-white text-purple-600 hover:bg-gray-100">
              <Mail className="h-4 w-4 ml-2" />
              users@osrati.dz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
