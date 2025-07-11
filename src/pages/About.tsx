import React from 'react';
import Header from '@/components/Header';
import { Heart, Shield, Users, BookOpen } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gold-50">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">À propos / Notre mission</h1>
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <p className="text-lg text-gray-700 mb-4">
            <span className="font-bold text-purple-700">“أسرتي”</span> est une plateforme numérique algérienne dédiée à l’accompagnement familial, au bien-être conjugal et à la formation professionnelle dans le domaine de la santé mentale et sociale.
          </p>
          <p className="text-gray-700 mb-4">
            Notre mission est de <span className="font-semibold">favoriser l’épanouissement des familles</span> en offrant un accès simple, confidentiel et personnalisé à des services d’écoute, de conseil, de formation et de soutien psychologique.
          </p>
          <p className="text-gray-700 mb-4">
            Nous croyons que chaque famille mérite un accompagnement de qualité, adapté à ses besoins et respectueux de sa culture.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-purple-50 rounded-lg p-6 text-center">
            <Heart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-bold text-gray-800 mb-2">Accompagnement humain</h3>
            <p className="text-gray-600 text-sm">Des professionnels à l’écoute, formés à l’accompagnement conjugal, familial et parental.</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-6 text-center">
            <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-bold text-gray-800 mb-2">Confidentialité & sécurité</h3>
            <p className="text-gray-600 text-sm">Toutes les données sont protégées et traitées dans le respect de la vie privée et du secret professionnel.</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-6 text-center">
            <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-bold text-gray-800 mb-2">Expertise & innovation</h3>
            <p className="text-gray-600 text-sm">Une équipe pluridisciplinaire et des outils numériques innovants pour un accompagnement sur-mesure.</p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-4" />
          <p className="text-gray-700 text-lg font-semibold">Notre ambition : bâtir des familles plus fortes, plus sereines et plus épanouies, au service de la société algérienne.</p>
        </div>
      </div>
    </div>
  );
};

export default About; 