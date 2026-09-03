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
    <div className="min-h-full md:h-full flex flex-col md:flex-row bg-brand-offwhite">
      {/* Hero Section */}
      <div className="md:w-5/12 h-auto md:h-full bg-brand-blue flex flex-col justify-center items-center p-8 md:p-12 text-brand-offwhite relative overflow-hidden shadow-2xl flex-shrink-0">
        <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/4/41/Dr._Bhimrao_Ambedkar.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="z-10 text-center space-y-6 md:space-y-8 mt-4 md:mt-12">
          <div className="w-40 h-40 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden border-4 border-brand-gold shadow-2xl">
            <img src="https://www.drbrambedkarcollege.ac.in//assets/front/images/Dr_Bhim_Rao_Ambedkar.jpg" alt="Dr. B.R. Ambedkar" className="w-full h-full object-cover grayscale sepia-[.3]" />
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest mb-2 md:mb-4">{t('Dr. B. R. Ambedkar')}</h2>
            <h3 className="text-xl md:text-3xl font-light text-brand-gold">{t('Digital Heritage Archive')}</h3>
          </div>
          <p className="text-base md:text-xl text-brand-offwhite/80 max-w-md mx-auto leading-relaxed hidden sm:block">
            {t('quote')}
          </p>
          <p className="text-sm md:text-lg text-brand-offwhite/60">
            {t('touch_to_begin')}
          </p>
        </div>
      </div>

      {/* Grid Navigation */}
      <div className="flex-1 md:w-7/12 p-4 sm:p-6 md:p-12 bg-[#f8f5ee]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 h-full items-center pb-8 md:pb-0">
          {menuItems.map((item, idx) => (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} key={idx}>
              <Link to={item.path} className={`flex flex-col items-center justify-center h-40 md:h-48 rounded-2xl shadow-lg transition-shadow hover:shadow-2xl ${item.color} ${!item.color.includes('text-') ? 'text-white' : ''}`}>
                <div className="mb-2 md:mb-4 opacity-90 scale-75 md:scale-100">{item.icon}</div>
                <h3 className="text-lg md:text-2xl font-bold uppercase tracking-wide text-center px-2">{item.title}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
