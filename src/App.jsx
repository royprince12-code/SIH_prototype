import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
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
      <header className="flex-none bg-brand-blue text-brand-offwhite p-6 shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {location.pathname !== '/' && (
            <button onClick={() => navigate(-1)} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <ArrowLeft size={28} />
            </button>
          )}
          <Link to="/" className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold tracking-wider uppercase">{t('Ambedkar Digital Heritage Archive')}</h1>
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/collection" className="flex items-center space-x-2 px-5 py-3 bg-brand-gold text-brand-blue rounded-full font-bold uppercase tracking-wide hover:opacity-90">
            <span>{t('My Collection')} (3)</span>
          </Link>
          <Link to="/settings" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <Globe size={28} />
          </Link>
          <Link to="/admin" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <UserCog size={28} />
          </Link>
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
      <BrowserRouter>
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
      </BrowserRouter>
    </SettingsProvider>
  );
}
