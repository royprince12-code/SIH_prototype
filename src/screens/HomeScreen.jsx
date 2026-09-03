import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MessageSquare, Network, Camera, PlayCircle, Clock, Bookmark, Globe, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSettings } from '../SettingsContext';

export default function HomeScreen() {
  const { t } = useSettings();
  const menuItems = [
    { title: t('Explore Search'), icon: <Search size={48} />, path: '/search', color: 'bg-brand-blue' },
    { title: t('Then & Now'), icon: <BookOpen size={48} />, path: '/constitution', color: 'bg-[#294e82] text-brand-gold' },
    { title: t('Ask the AI Assistant'), icon: <MessageSquare size={48} />, path: '/chat', color: 'bg-[#1e3a6a]' },
    { title: t('Browse Timeline'), icon: <Clock size={48} />, path: '/timeline', color: 'bg-[#3b66a3]' },
    { title: t('Digitize a Manuscript'), icon: <Camera size={48} />, path: '/digitize', color: 'bg-brand-gold text-brand-blue' },
    { title: t('Watch & Listen'), icon: <PlayCircle size={48} />, path: '/media', color: 'bg-[#e0b55c] text-brand-blue' },
    { title: t('Knowledge Map'), icon: <Network size={48} />, path: '/map', color: 'bg-[#112a4f]' },
    { title: t('My Collection'), icon: <Bookmark size={48} />, path: '/collection', color: 'bg-[#0f2444]' },
    { title: t('Language Options'), icon: <Globe size={48} />, path: '/settings', color: 'bg-brand-blue/90' },
  ];

  return (
    <div className="h-full flex flex-col md:flex-row bg-brand-offwhite">
      {/* Hero Section */}
      <div className="md:w-5/12 h-full bg-brand-blue flex flex-col justify-center items-center p-12 text-brand-offwhite relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/4/41/Dr._Bhimrao_Ambedkar.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="z-10 text-center space-y-8 mt-12">
          <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-brand-gold shadow-2xl">
            <img src="https://www.drbrambedkarcollege.ac.in//assets/front/images/Dr_Bhim_Rao_Ambedkar.jpg" alt="Dr. B.R. Ambedkar" className="w-full h-full object-cover grayscale sepia-[.3]" />
          </div>
          <div>
            <h2 className="text-5xl font-bold uppercase tracking-widest mb-4">{t('Dr. B. R. Ambedkar')}</h2>
            <h3 className="text-3xl font-light text-brand-gold">{t('Digital Heritage Archive')}</h3>
          </div>
          <p className="text-xl text-brand-offwhite/80 max-w-md mx-auto leading-relaxed">
            {t('quote')}
          </p>
          <p className="text-lg text-brand-offwhite/60">
            {t('touch_to_begin')}
          </p>
        </div>
      </div>

      {/* Grid Navigation */}
      <div className="md:w-7/12 p-12 bg-[#f8f5ee]">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 h-full items-center">
          {menuItems.map((item, idx) => (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} key={idx}>
              <Link to={item.path} className={`flex flex-col items-center justify-center h-48 rounded-2xl shadow-lg transition-shadow hover:shadow-2xl ${item.color} ${!item.color.includes('text-') ? 'text-white' : ''}`}>
                <div className="mb-4 opacity-90">{item.icon}</div>
                <h3 className="text-2xl font-bold uppercase tracking-wide">{item.title}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
