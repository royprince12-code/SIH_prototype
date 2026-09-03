import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Book, Scale, ArrowRight, Activity, Search, Compass, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSettings } from '../SettingsContext';

const TOPICS = [
  "Equality", "Fundamental Rights", "Liberty", "Freedom of Speech",
  "Religious Freedom", "Untouchability", "Reservation & Representation",
  "Social Justice", "Democracy", "Federalism"
];

const ARTICLES = [
  { id: "14", title: "Equality before law" },
  { id: "15", title: "Prohibition of discrimination" },
  { id: "16", title: "Equality of opportunity in matters of public employment" },
  { id: "17", title: "Abolition of Untouchability" },
  { id: "19", title: "Protection of certain rights regarding freedom of speech, etc." },
  { id: "21", title: "Protection of life and personal liberty" },
  { id: "32", title: "Remedies for enforcement of rights conferred by this Part" },
];

export default function ConstitutionExploreScreen() {
  const { t } = useSettings();
  const navigate = useNavigate();

  return (
    <div className="h-full bg-brand-offwhite p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 md:mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold uppercase tracking-widest text-brand-blue mb-2 md:mb-4"
          >
            Then <span className="text-brand-gold">&amp;</span> Now
          </motion.h1>
          <p className="text-lg md:text-2xl text-brand-dark/80 italic font-serif">
            Explore how India's Constitution evolved from the Constituent Assembly to the present day.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Explore by Topic */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-brand-gold/20 flex flex-col">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-4 bg-brand-blue/10 rounded-full text-brand-blue">
                <Compass size={32} />
              </div>
              <h2 className="text-2xl font-bold text-brand-dark uppercase tracking-wide">Explore by Topic</h2>
            </div>
            <div className="flex-1 flex flex-wrap gap-2">
              {TOPICS.map(topic => (
                <button key={topic} className="px-4 py-2 bg-brand-offwhite border border-brand-blue/20 rounded-full text-sm font-semibold hover:bg-brand-blue hover:text-white transition-colors">
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Explore by Article */}
          <div className="bg-brand-blue text-white p-8 rounded-2xl shadow-lg flex flex-col">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-4 bg-white/10 rounded-full text-brand-gold">
                <Book size={32} />
              </div>
              <h2 className="text-2xl font-bold uppercase tracking-wide">Explore by Article</h2>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto max-h-64 pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
              {ARTICLES.map(article => (
                <Link 
                  key={article.id} 
                  to={`/constitution/article/${article.id}`}
                  className="block p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10"
                >
                  <div className="font-bold text-brand-gold mb-1">Article {article.id}</div>
                  <div className="text-sm opacity-90 truncate">{article.title}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Explore by Timeline */}
          <div className="bg-brand-gold text-brand-blue p-8 rounded-2xl shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 bg-brand-blue/10 rounded-full">
                  <Activity size={32} />
                </div>
                <h2 className="text-2xl font-bold uppercase tracking-wide">Constitutional Timeline</h2>
              </div>
              <p className="text-brand-blue/80 font-medium mb-6">
                Journey through the making of the Constitution, from the Constituent Assembly debates to modern-day amendments.
              </p>
            </div>
            <button className="flex items-center justify-center space-x-2 bg-brand-blue text-white py-4 px-6 rounded-xl font-bold uppercase hover:bg-brand-blue/90 transition-colors">
              <span>View Timeline</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* AI Assistant Promo */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border-l-4 border-brand-blue flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-2 flex items-center">
              <Search className="mr-2 text-brand-blue" />
              AI Constitution Assistant
            </h3>
            <p className="text-sm md:text-base text-brand-dark/70">Ask complex questions about the historical context and evolution of any constitutional provision.</p>
          </div>
          <Link to="/chat" className="px-6 py-3 border-2 border-brand-blue text-brand-blue rounded-xl font-bold hover:bg-brand-blue hover:text-white transition-colors whitespace-nowrap self-stretch md:self-auto text-center">
            Ask a Question
          </Link>
        </div>
      </div>
    </div>
  );
}
