
import React from 'react';
import Header from '@/components/Header';
import { Megaphone, TrendingUp, Target, Share2, BarChart3, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/LanguageSelector';

const Marketing = () => {
  const { t } = useLanguage();
  
  const campaigns = [
    {
      title: t('marketing.familyAwarenessCampaign'),
      status: t('marketing.active'),
      reach: '15,000',
      engagement: '8.5%',
      color: 'bg-green-100 text-green-800'
    },
    {
      title: t('marketing.maritalAwarenessMonth'),
      status: t('marketing.soon'),
      reach: '25,000',
      engagement: '12%',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      title: t('marketing.newFamiliesProgram'),
      status: t('marketing.completed'),
      reach: '8,500',
      engagement: '15%',
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  const marketingServices = [
    {
      icon: Target,
      title: t('marketing.preciseTargeting'),
      description: t('marketing.preciseTargetingDesc')
    },
    {
      icon: TrendingUp,
      title: t('marketing.performanceAnalysis'),
      description: t('marketing.performanceAnalysisDesc')
    },
    {
      icon: Share2,
      title: t('marketing.digitalMarketing'),
      description: t('marketing.digitalMarketingDesc')
    },
    {
      icon: BarChart3,
      title: t('marketing.detailedReports'),
      description: t('marketing.detailedReportsDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gold-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {t('marketing.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('marketing.subtitle')}
          </p>
        </div>

        {/* Marketing Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Megaphone className="h-10 w-10 text-purple-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 mb-1">12</h3>
            <p className="text-gray-600">{t('marketing.activeCampaigns')}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Users className="h-10 w-10 text-purple-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 mb-1">48,500</h3>
            <p className="text-gray-600">{t('marketing.totalReach')}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <TrendingUp className="h-10 w-10 text-purple-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 mb-1">11.2%</h3>
            <p className="text-gray-600">{t('marketing.engagementRate')}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Target className="h-10 w-10 text-purple-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 mb-1">85%</h3>
            <p className="text-gray-600">{t('marketing.targetingAccuracy')}</p>
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('marketing.currentCampaigns')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {campaigns.map((campaign, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{campaign.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${campaign.color}`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('marketing.reach')}:</span>
                    <span className="font-semibold">{campaign.reach}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('marketing.engagement')}:</span>
                    <span className="font-semibold">{campaign.engagement}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marketing Services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {marketingServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <Icon className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-gold-600 text-white p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">{t('marketing.joinCampaigns')}</h2>
          <p className="mb-6">{t('marketing.joinMessage')}</p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            {t('contactUs')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
