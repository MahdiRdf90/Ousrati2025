import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Heart, Video, Smile } from 'lucide-react';

const resources = [
  {
    type: 'article',
    icon: BookOpen,
    title: '10 conseils pour une vie de couple épanouie',
    description: 'Découvrez des astuces simples pour renforcer la communication et la complicité au sein du couple.',
    link: '#'
  },
  {
    type: 'video',
    icon: Video,
    title: 'Gérer le stress au quotidien',
    description: 'Une vidéo pratique pour apprendre à mieux gérer le stress familial et professionnel.',
    link: '#'
  },
  {
    type: 'article',
    icon: Users,
    title: 'Parentalité positive : les bases',
    description: 'Les principes essentiels pour instaurer un climat de confiance et d’écoute avec ses enfants.',
    link: '#'
  },
  {
    type: 'conseil',
    icon: Heart,
    title: 'Exprimer sa gratitude en famille',
    description: 'Un petit geste de reconnaissance chaque jour peut transformer l’ambiance familiale.',
    link: '#'
  },
  {
    type: 'conseil',
    icon: Smile,
    title: 'Prendre soin de soi pour mieux prendre soin des autres',
    description: 'Le bien-être personnel est la clé d’une famille harmonieuse.',
    link: '#'
  }
];

const Resources = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gold-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Ressources & Conseils</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {resources.map((res, idx) => {
            const Icon = res.icon;
            return (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Icon className="h-8 w-8 text-purple-600" />
                  <CardTitle className="text-xl font-semibold text-gray-800">{res.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{res.description}</p>
                  <a href={res.link} className="text-purple-600 hover:underline text-sm">Voir plus</a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Resources; 