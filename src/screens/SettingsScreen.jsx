import React from 'react';
import { Type, Moon, Sun, Ear, VolumeX, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSettings } from '../SettingsContext';

export default function SettingsScreen() {
  const { 
    lang, setLang, 
    largeText, setLargeText, 
    highContrast, setHighContrast, 
    audioFirst, setAudioFirst,
    t
  } = useSettings();

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  ];

  return (
    <div className="h-full bg-brand-offwhite p-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold uppercase tracking-widest text-brand-blue mb-4">{t('Language & Accessibility')}</h2>
        <p className="text-2xl text-gray-600 mb-12">{t('Customize your archive experience.')}</p>
        
        <div className="space-y-12">
          {/* Language Selection */}
          <div>
            <h3 className="text-2xl font-bold text-brand-blue mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-brand-gold text-white flex items-center justify-center mr-4">1</span>
              {t('Select Language')}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {languages.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`p-6 rounded-2xl border-4 transition-all text-center flex flex-col items-center justify-center ${lang === l.code ? 'border-brand-gold bg-brand-gold/10 text-brand-blue shadow-lg' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                >
                  <span className="text-4xl font-bold mb-2">{l.native}</span>
                  <span className="text-xl text-gray-500 uppercase tracking-widest">{l.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          <hr className="border-gray-200" />
          
          {/* Accessibility Settings */}
          <div>
            <h3 className="text-2xl font-bold text-brand-blue mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-brand-gold text-white flex items-center justify-center mr-4">2</span>
              {t('Accessibility Options')}
            </h3>
            
            <div className="space-y-6">
              <div 
                onClick={() => setLargeText(!largeText)}
                className={`p-6 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-colors ${largeText ? 'bg-brand-blue text-white border-brand-blue' : 'bg-white border-gray-200'}`}
              >
                <div className="flex items-center space-x-6">
                  <Type size={40} className={largeText ? 'text-brand-gold' : 'text-gray-400'} />
                  <div>
                    <h4 className="text-2xl font-bold mb-1">{t('Larger Text Mode')}</h4>
                    <p className={`text-lg ${largeText ? 'text-gray-300' : 'text-gray-500'}`}>{t('Increases font size across all screens for better readability.')}</p>
                  </div>
                </div>
                <div className={`w-16 h-8 rounded-full flex items-center p-1 transition-colors ${largeText ? 'bg-brand-gold' : 'bg-gray-300'}`}>
                  <motion.div animate={{ x: largeText ? 32 : 0 }} className="w-6 h-6 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              
              <div 
                onClick={() => setHighContrast(!highContrast)}
                className={`p-6 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-colors ${highContrast ? 'bg-brand-blue text-white border-brand-blue' : 'bg-white border-gray-200'}`}
              >
                <div className="flex items-center space-x-6">
                  <Eye size={40} className={highContrast ? 'text-brand-gold' : 'text-gray-400'} />
                  <div>
                    <h4 className="text-2xl font-bold mb-1">{t('High Contrast')}</h4>
                    <p className={`text-lg ${highContrast ? 'text-gray-300' : 'text-gray-500'}`}>{t('Uses maximum contrast colors (black and yellow) for vision impairment.')}</p>
                  </div>
                </div>
                <div className={`w-16 h-8 rounded-full flex items-center p-1 transition-colors ${highContrast ? 'bg-brand-gold' : 'bg-gray-300'}`}>
                  <motion.div animate={{ x: highContrast ? 32 : 0 }} className="w-6 h-6 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              
              <div 
                onClick={() => setAudioFirst(!audioFirst)}
                className={`p-6 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-colors ${audioFirst ? 'bg-brand-blue text-white border-brand-blue' : 'bg-white border-gray-200'}`}
              >
                <div className="flex items-center space-x-6">
                  <Ear size={40} className={audioFirst ? 'text-brand-gold' : 'text-gray-400'} />
                  <div>
                    <h4 className="text-2xl font-bold mb-1">{t('Audio-First Mode')}</h4>
                    <p className={`text-lg ${audioFirst ? 'text-gray-300' : 'text-gray-500'}`}>{t('Automatically plays audio narration and descriptions when opening screens.')}</p>
                  </div>
                </div>
                <div className={`w-16 h-8 rounded-full flex items-center p-1 transition-colors ${audioFirst ? 'bg-brand-gold' : 'bg-gray-300'}`}>
                  <motion.div animate={{ x: audioFirst ? 32 : 0 }} className="w-6 h-6 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
