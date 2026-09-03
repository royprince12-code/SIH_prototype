import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Activity, Network, MessageSquare, Info, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const ARTICLE_DATA = {
  "17": {
    id: "article-17",
    articleNumber: "17",
    title: "Abolition of Untouchability",
    historicalContext: "The practice of untouchability was a deeply entrenched social evil in India. Dr. Ambedkar, who himself faced this discrimination, fought relentlessly for its constitutional abolition. The Constituent Assembly debated this extensively, focusing on whether 'untouchability' should be explicitly defined.",
    originalText: `"Untouchability" is abolished and its practice in any form is forbidden. The enforcement of any disability arising out of "Untouchability" shall be an offence punishable in accordance with law.`,
    currentText: `"Untouchability" is abolished and its practice in any form is forbidden. The enforcement of any disability arising out of "Untouchability" shall be an offence punishable in accordance with law.`,
    ambedkarContribution: "Dr. B.R. Ambedkar was the chief architect behind Article 17. He strongly advocated for making untouchability a punishable offence rather than just a moral declaration. He ensured the term was placed in quotes to represent the historical social practice rather than a literal or temporary physical condition.",
    status: "Provision Retained. The text remains unchanged since 1950, though legislation like The Protection of Civil Rights Act, 1955 and The SC/ST (Prevention of Atrocities) Act, 1989 were enacted to enforce it.",
    debates: [
      {
        date: "29 April 1947",
        speaker: "Sardar Vallabhbhai Patel",
        excerpt: "I consider this to be one of the most important clauses... we are wiping out a blot on the fair name of India."
      },
      {
        date: "29 November 1948",
        speaker: "V.I. Muniswamy Pillai",
        excerpt: "I do not think that the history of India will hear a better and more auspicious day than this... when the great social evil of untouchability is abolished."
      }
    ],
    relatedArticles: ["14", "15", "46"],
    topics: ["Untouchability", "Equality", "Social Justice"]
  }
};

export default function ConstitutionArticleScreen() {
  const { id } = useParams();
  const article = ARTICLE_DATA[id] || ARTICLE_DATA["17"]; // Fallback to 17 for demo
  const [activeTab, setActiveTab] = useState('then');

  return (
    <div className="h-full flex flex-col bg-[#f8f5ee]">
      {/* Header */}
      <div className="bg-brand-blue text-white p-6 shadow-md z-10 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/constitution" className="p-2 bg-white/10 rounded-full hover:bg-white/20">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold uppercase tracking-widest text-brand-gold">Article {article.articleNumber}</h1>
              <h2 className="text-xl font-light opacity-90">{article.title}</h2>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20 transition-colors">
              <Network size={20} />
              <span>Explore Connections</span>
            </button>
            <button className="flex items-center space-x-2 bg-brand-gold text-brand-blue font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-colors">
              <MessageSquare size={20} />
              <span>Ask AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Top Info Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-brand-dark/10">
              <h3 className="text-xl font-bold text-brand-blue mb-3 flex items-center">
                <Info className="mr-2 text-brand-gold" size={24} /> 
                Historical Context
              </h3>
              <p className="text-brand-dark/80 leading-relaxed font-serif text-lg">
                {article.historicalContext}
              </p>
            </div>
            <div className="bg-brand-blue/5 p-6 rounded-2xl shadow-sm border border-brand-blue/20">
              <h3 className="text-xl font-bold text-brand-blue mb-3">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {article.topics.map(topic => (
                  <span key={topic} className="px-3 py-1 bg-white border border-brand-dark/10 rounded-full text-sm font-semibold text-brand-dark/70">
                    {topic}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold text-brand-blue mt-6 mb-3">Related Articles</h3>
              <div className="flex flex-wrap gap-2">
                {article.relatedArticles.map(art => (
                  <Link key={art} to={`/constitution/article/${art}`} className="px-3 py-1 bg-brand-blue text-white rounded-full text-sm font-bold hover:bg-brand-blue/80">
                    Art. {art}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Then & Now Comparison */}
          <div className="bg-white rounded-2xl shadow-lg border-t-4 border-brand-gold overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button 
                onClick={() => setActiveTab('then')}
                className={`flex-1 py-4 text-center font-bold uppercase tracking-widest text-lg transition-colors ${activeTab === 'then' ? 'bg-brand-blue text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
              >
                Then (1947-49)
              </button>
              <button 
                onClick={() => setActiveTab('evolution')}
                className={`flex-1 py-4 text-center font-bold uppercase tracking-widest text-lg transition-colors ${activeTab === 'evolution' ? 'bg-brand-gold text-brand-blue' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
              >
                Evolution
              </button>
              <button 
                onClick={() => setActiveTab('now')}
                className={`flex-1 py-4 text-center font-bold uppercase tracking-widest text-lg transition-colors ${activeTab === 'now' ? 'bg-brand-blue text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
              >
                Now (Present)
              </button>
            </div>

            <div className="p-8 min-h-[400px]">
              <AnimatePresence mode="wait">
                {activeTab === 'then' && (
                  <motion.div 
                    key="then"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-brand-blue mb-4 border-b pb-2 flex items-center">
                        <BookOpen className="mr-2 text-brand-gold" /> Original Text
                      </h3>
                      <div className="bg-[#f4f1ea] p-6 rounded-xl border border-[#dcd6c8] shadow-inner font-serif text-xl leading-relaxed text-brand-dark/90 italic">
                        {article.originalText}
                      </div>
                      
                      <div className="mt-8">
                        <h3 className="text-xl font-bold text-brand-blue mb-4">Dr. Ambedkar's Contribution</h3>
                        <p className="text-brand-dark/80 leading-relaxed font-serif">
                          {article.ambedkarContribution}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-brand-blue mb-4 border-b pb-2 flex items-center">
                        <MessageSquare className="mr-2 text-brand-gold" /> Constituent Assembly Debates
                      </h3>
                      <div className="space-y-4">
                        {article.debates.map((debate, idx) => (
                          <div key={idx} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-bold text-brand-blue">{debate.speaker}</span>
                              <span className="text-sm text-gray-500 flex items-center"><Clock size={14} className="mr-1"/> {debate.date}</span>
                            </div>
                            <p className="text-gray-700 italic border-l-4 border-brand-gold pl-3 font-serif">
                              "{debate.excerpt}"
                            </p>
                            <div className="mt-3 text-right">
                              <button className="text-brand-blue text-sm font-bold hover:underline">Read Full Debate</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'evolution' && (
                  <motion.div 
                    key="evolution"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center justify-center h-full text-center space-y-6 max-w-2xl mx-auto"
                  >
                    <div className="p-6 bg-brand-gold/10 rounded-full text-brand-gold">
                      <Activity size={64} />
                    </div>
                    <h3 className="text-3xl font-bold text-brand-blue">What Changed?</h3>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm w-full">
                      <div className="flex items-center justify-center space-x-2 text-green-600 mb-4 font-bold text-lg">
                        <ShieldAlert size={24} />
                        <span>{article.status.split('.')[0]}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed font-serif text-lg">
                        {article.status.split('.').slice(1).join('.')}
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'now' && (
                  <motion.div 
                    key="now"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="max-w-4xl mx-auto"
                  >
                     <h3 className="text-2xl font-bold text-brand-blue mb-4 border-b pb-2 flex items-center">
                        <BookOpen className="mr-2 text-brand-gold" /> Current Constitutional Text
                      </h3>
                      <div className="bg-white p-8 rounded-xl border-2 border-brand-blue shadow-lg font-serif text-2xl leading-relaxed text-brand-dark/90">
                        {article.currentText}
                      </div>
                      
                      <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-brand-blue mb-2">Legal Context</h4>
                        <p className="text-gray-700">
                          This article is absolute in nature and cannot be suspended even during an emergency under Article 359. It is enforceable against both the State and private individuals.
                        </p>
                      </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
