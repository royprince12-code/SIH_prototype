import React from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Globe, UserCog, Settings, ArrowLeft } from 'lucide-react';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import DocumentScreen from './screens/DocumentScreen';
import KnowledgeMapScreen from './screens/KnowledgeMapScreen';
import ChatScreen from './screens/ChatScreen';
import DigitizationScreen from './screens/DigitizationScreen';
import TimelineScreen from './screens/TimelineScreen';
import MediaScreen from './screens/MediaScreen';
import CollectionScreen from './screens/CollectionScreen';
import SettingsScreen from './screens/SettingsScreen';
import AdminScreen from './screens/AdminScreen';
import ConstitutionExploreScreen from './screens/ConstitutionExploreScreen';
import ConstitutionArticleScreen from './screens/ConstitutionArticleScreen';
import { SettingsProvider, useSettings } from './SettingsContext';

const KioskLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useSettings();
  
  if (location.pathname === '/admin') {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-brand-offwhite text-brand-dark font-serif selection:bg-brand-gold selection:text-white">
      {/* Kiosk Header */}
      <header className="flex-none bg-brand-blue text-brand-offwhite p-4 md:p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div className="flex items-center gap-2 md:gap-4 flex-1">
            {location.pathname !== '/' && (
              <button onClick={() => navigate(-1)} className="p-2 md:p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors flex-shrink-0">
                <ArrowLeft size={24} className="md:w-7 md:h-7" />
              </button>
            )}
            <Link to="/" className="flex items-center min-w-0">
              <h1 className="text-lg sm:text-xl md:text-3xl font-bold tracking-wider uppercase break-words leading-tight">
                {t('Ambedkar Digital Heritage Archive')}
              </h1>
            </Link>
          </div>
          {/* Settings/Admin icons on mobile */}
          <div className="flex md:hidden gap-2 flex-shrink-0">
            <Link to="/settings" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <Globe size={20} />
            </Link>
            <Link to="/admin" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <UserCog size={20} />
            </Link>
          </div>
        </div>
        <div className="flex gap-2 md:gap-4 justify-between md:justify-end w-full md:w-auto">
          <Link to="/collection" className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 md:px-5 py-2 md:py-3 bg-brand-gold text-brand-blue rounded-full text-sm md:text-base font-bold uppercase tracking-wide hover:opacity-90">
            <span>{t('My Collection')} (3)</span>
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link to="/settings" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <Globe size={28} />
            </Link>
            <Link to="/admin" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <UserCog size={28} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        {children}
      </main>
      
      {/* Idle Timeout / Kiosk specific footer could go here */}
    </div>
  );
};

export default function App() {
  return (
    <SettingsProvider>
      <HashRouter>
        <KioskLayout>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/document/:id" element={<DocumentScreen />} />
            <Route path="/map" element={<KnowledgeMapScreen />} />
            <Route path="/chat" element={<ChatScreen />} />
            <Route path="/digitize" element={<DigitizationScreen />} />
            <Route path="/timeline" element={<TimelineScreen />} />
            <Route path="/media" element={<MediaScreen />} />
            <Route path="/collection" element={<CollectionScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/constitution" element={<ConstitutionExploreScreen />} />
            <Route path="/constitution/article/:id" element={<ConstitutionArticleScreen />} />
            <Route path="/admin" element={<AdminScreen />} />
          </Routes>
        </KioskLayout>
      </HashRouter>
    </SettingsProvider>
  );
}
