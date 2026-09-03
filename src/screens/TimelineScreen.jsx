import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookmarkPlus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TimelineScreen() {
  const [activeEvent, setActiveEvent] = useState(null);

  const events = [
    { year: '1891', title: 'Birth in Mhow', desc: 'Born on April 14 in the military cantonment of Mhow, Central Provinces (now Madhya Pradesh).', source: 'Dr. Ambedkar Foundation', url: 'https://www.mea.gov.in/books-writings-of-ambedkar.htm' },
    { year: '1913', title: 'Higher Education in USA', desc: 'Moved to the United States on a Baroda State Scholarship to study at Columbia University, New York.', source: 'National Digital Library of India', url: 'https://ndl.iitkgp.ac.in/' },
    { year: '1923', title: 'The Problem of the Rupee', desc: 'Completed his D.Sc. at London School of Economics. His thesis "The Problem of the Rupee" was published.', source: 'Dr. Ambedkar Foundation', url: 'https://www.mea.gov.in/books-writings-of-ambedkar.htm' },
    { year: '1927', title: 'Mahad Satyagraha', desc: 'Led a peaceful march to the Chavdar Tale in Mahad to assert the rights of Dalits to use public water resources.', source: 'National Digital Library of India', url: 'https://ndl.iitkgp.ac.in/' },
    { year: '1936', title: 'Annihilation of Caste', desc: 'Wrote the seminal text "Annihilation of Caste," critiquing the caste system and orthodox Hindu practices.', source: 'Dr. Ambedkar Foundation', url: 'https://www.mea.gov.in/books-writings-of-ambedkar.htm' },
    { year: '1947', title: 'Law Minister & Drafting Committee', desc: 'Appointed as India\'s first Law Minister and elected Chairman of the Drafting Committee of the Constitution.', source: 'Constituent Assembly Debates Archive', url: 'https://www.constitutionofindia.net/' },
    { year: '1956', title: 'Embracing Buddhism', desc: 'Converted to Buddhism along with half a million followers in Nagpur on October 14. Passed away on December 6.', source: 'National Digital Library of India', url: 'https://ndl.iitkgp.ac.in/' }
  ];

  return (
    <div className="h-full bg-brand-offwhite flex flex-col overflow-hidden relative">
      <div className="p-12 pb-0">
        <h2 className="text-4xl font-bold uppercase tracking-widest text-brand-blue mb-4">Interactive Timeline</h2>
        <p className="text-2xl text-gray-600">The Life and Legacy of Dr. B.R. Ambedkar</p>
      </div>

      {/* Horizontal Timeline */}
      <div className="flex-1 flex items-center overflow-x-auto px-20 relative snap-x snap-mandatory hide-scrollbar">
        {/* Continuous Line */}
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-brand-blue/10 -translate-y-1/2" />
        
        <div className="flex items-center space-x-32 relative z-10 w-max">
          {events.map((evt, idx) => (
            <motion.div 
              key={idx}
              className="flex flex-col items-center snap-center cursor-pointer group"
              onClick={() => setActiveEvent(evt)}
              whileHover={{ scale: 1.1 }}
            >
              <h3 className="text-4xl font-bold text-brand-blue mb-6 group-hover:text-brand-gold transition-colors">{evt.year}</h3>
              <div className="w-8 h-8 rounded-full bg-brand-gold shadow-[0_0_0_8px_rgba(245,242,235,1)] flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <h4 className="text-xl font-bold uppercase tracking-wide text-gray-600 mt-6 max-w-[200px] text-center">{evt.title}</h4>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {activeEvent && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-12"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 50 }}
              className="bg-brand-offwhite max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl flex"
            >
              <div className="w-2/5 bg-gray-200">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Dr._Bhimrao_Ambedkar.jpg" alt="Historical Event" className="w-full h-full object-cover grayscale opacity-80 mix-blend-multiply" />
              </div>
              
              <div className="w-3/5 p-12 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-2xl font-bold text-brand-gold mb-2">{activeEvent.year}</h4>
                    <h2 className="text-4xl font-bold text-brand-blue leading-tight">{activeEvent.title}</h2>
                  </div>
                  <button onClick={() => setActiveEvent(null)} className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors">
                    <X size={32} className="text-gray-600" />
                  </button>
                </div>
                
                <p className="text-2xl text-gray-700 leading-relaxed flex-1">
                  {activeEvent.desc}
                </p>
                <div className="mt-4 mb-2">
                  <span className="text-gray-500 font-bold mr-2">Source:</span>
                  <a href={activeEvent.url} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:text-brand-gold underline font-semibold text-lg">{activeEvent.source}</a>
                </div>
                
                <div className="flex space-x-4 mt-8 pt-8 border-t border-gray-200">
                  <Link to="/document/1" className="flex-1 flex justify-center items-center space-x-2 px-6 py-4 bg-brand-blue text-white rounded-xl text-xl font-bold uppercase tracking-wide hover:bg-brand-gold transition-colors">
                    <span>Read More</span>
                    <ArrowRight size={24} />
                  </Link>
                  <button className="flex justify-center items-center space-x-2 px-6 py-4 bg-white border-2 border-brand-blue text-brand-blue rounded-xl text-xl font-bold uppercase tracking-wide hover:bg-gray-50 transition-colors">
                    <BookmarkPlus size={24} />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
