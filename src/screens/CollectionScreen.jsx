import React from 'react';
import { FileText, PlayCircle, Clock, MessageSquare, Printer, Mail, Trash2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CollectionScreen() {
  const collection = [
    { id: 1, type: 'Document', title: 'The Grammar of Anarchy', desc: 'Constituent Assembly Debates, Nov 25, 1949', source: 'Constituent Assembly Debates Archive', url: 'https://www.constitutionofindia.net/', icon: <FileText size={32} /> },
    { id: 2, type: 'AI Answer', title: 'Views on Caste System', desc: 'From conversation with AI Research Assistant', source: 'Dr. Ambedkar Foundation', url: 'https://www.mea.gov.in/books-writings-of-ambedkar.htm', icon: <MessageSquare size={32} /> },
    { id: 3, type: 'Timeline Event', title: 'Drafting Committee Chairman', desc: '1947 - Appointed as India\'s first Law Minister', source: 'Constituent Assembly Debates Archive', url: 'https://www.constitutionofindia.net/', icon: <Clock size={32} /> },
    { id: 4, type: 'Video', title: 'BBC Interview on Democracy in India', desc: 'Video Archive - 12:45 Duration', source: 'National Digital Library of India', url: 'https://ndl.iitkgp.ac.in/', icon: <PlayCircle size={32} /> },
  ];

  return (
    <div className="h-full bg-brand-offwhite flex flex-col p-12">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-end mb-12 border-b-4 border-brand-blue pb-6">
          <div>
            <h2 className="text-5xl font-bold uppercase tracking-widest text-brand-blue mb-4">My Collection</h2>
            <p className="text-2xl text-gray-600">Items saved during this session (4 items)</p>
          </div>
          
          <div className="flex space-x-4">
            <button className="flex items-center space-x-3 px-6 py-4 bg-brand-gold text-brand-blue font-bold rounded-xl uppercase tracking-wide hover:opacity-90">
              <Printer size={28} />
              <span>Print Summary</span>
            </button>
            <button className="flex items-center space-x-3 px-6 py-4 bg-brand-blue text-white font-bold rounded-xl uppercase tracking-wide hover:bg-[#1e3a6a]">
              <Mail size={28} />
              <span>Email Collection</span>
            </button>
          </div>
        </div>
        
        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-4">
          {collection.map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={item.id} 
              className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 flex items-center group"
            >
              <div className="w-16 h-16 rounded-full bg-[#f5f2eb] text-brand-blue flex items-center justify-center mr-8">
                {item.icon}
              </div>
              <div className="flex-1">
                <span className="text-sm font-bold text-brand-gold uppercase tracking-widest">{item.type}</span>
                <h3 className="text-3xl font-bold text-brand-blue mt-1 mb-2">{item.title}</h3>
                <p className="text-xl text-gray-500 mb-1">{item.desc}</p>
                {item.url && (
                  <p className="text-sm text-gray-400">
                    Source: <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold underline">{item.source}</a>
                  </p>
                )}
              </div>
              
              <div className="flex items-center space-x-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link to="/document/1" className="flex items-center space-x-2 text-brand-blue font-bold text-xl hover:text-brand-gold transition-colors">
                  <span>View</span>
                  <ArrowRight size={24} />
                </Link>
                <button className="text-gray-400 hover:text-red-500 transition-colors p-3 bg-gray-100 rounded-full hover:bg-red-50">
                  <Trash2 size={24} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="mt-8 pt-8 flex justify-center">
          <Link to="/" className="flex items-center space-x-2 px-8 py-4 bg-gray-200 text-gray-600 font-bold rounded-full uppercase tracking-wide hover:bg-gray-300">
            <Trash2 size={24} />
            <span>Clear & Start New Session</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
