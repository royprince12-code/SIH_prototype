import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Book, Mic, Edit3, Image as ImageIcon, BookmarkPlus, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchScreen() {
  const [filter, setFilter] = useState('All');
  
  const filters = ['All', 'Books', 'Speeches', 'Constitutional Debates', 'Manuscripts', 'Photos'];
  
  const results = [
    { id: 1, type: 'Book', title: 'Annihilation of Caste', summary: 'An undelivered speech written in 1936, challenging the very foundations of the caste system and orthodox Hindu beliefs.', date: '1936', source: 'Dr. Ambedkar Foundation', url: 'https://www.mea.gov.in/books-writings-of-ambedkar.htm', icon: <Book /> },
    { id: 2, type: 'Speech', title: 'The Grammar of Anarchy', summary: 'Final address to the Constituent Assembly, warning against the use of unconstitutional methods and hero-worship in politics.', date: 'Nov 25, 1949', source: 'Constituent Assembly Debates Archive', url: 'https://www.constitutionofindia.net/', icon: <Mic /> },
    { id: 3, type: 'Constitutional Debate', title: 'Article 32 Discussion', summary: 'Dr. Ambedkar describes Article 32 as the "heart and soul" of the Constitution, ensuring constitutional remedies.', date: '1948', source: 'Constituent Assembly Debates Archive', url: 'https://www.constitutionofindia.net/', icon: <Edit3 /> },
    { id: 4, type: 'Book', title: 'The Buddha and His Dhamma', summary: 'His final book, treating the life and philosophy of the Buddha, presenting a rationalist interpretation of Buddhism.', date: '1957', source: 'National Digital Library of India', url: 'https://ndl.iitkgp.ac.in/', icon: <Book /> },
  ];

  return (
    <div className="min-h-full bg-brand-offwhite p-12">
      {/* Search Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Ask anything about Dr. Ambedkar's work..." 
            className="w-full text-3xl p-8 pl-20 rounded-2xl shadow-lg border-2 border-transparent focus:border-brand-gold focus:outline-none bg-white text-brand-dark"
          />
          <Search size={40} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mt-8">
          {filters.map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-3 rounded-full text-lg font-bold transition-colors ${filter === f ? 'bg-brand-blue text-brand-offwhite' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
        {results.map((item, i) => (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={item.id} className="bg-white rounded-2xl p-8 shadow-md border-l-8 border-brand-gold flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3 text-brand-blue/70">
                  {item.icon}
                  <span className="text-lg uppercase tracking-wide font-semibold">{item.type}</span>
                </div>
                <span className="text-gray-500 font-bold">{item.date}</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-brand-blue">{item.title}</h3>
              <p className="text-xl text-gray-600 leading-relaxed mb-4">{item.summary}</p>
              <div className="inline-block px-4 py-2 bg-[#f5f2eb] rounded-lg text-brand-gold font-bold text-sm mb-4">
                Source: <a href={item.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-blue">{item.source}</a>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-6 border-t border-gray-100">
              <Link to={`/document/${item.id}`} className="flex items-center space-x-2 text-brand-blue font-bold text-xl hover:text-brand-gold transition-colors">
                <span>Read full text</span>
                <ArrowRight size={24} />
              </Link>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-brand-gold transition-colors">
                <BookmarkPlus size={28} />
                <span className="text-lg font-semibold">Save</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
