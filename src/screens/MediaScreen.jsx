import React, { useState } from 'react';
import { PlayCircle, Clock, Tag, X, BookmarkPlus, Pause, Volume2, Maximize, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MediaScreen() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Lectures', 'Documentaries', 'Interviews', 'Audio'];

  const media = [
{ 
  id: 1, 
  type: 'Interview', 
  category: 'Interviews', 
  title: 'BBC Interview on Democracy in India', 
  duration: '12:45', 
  tags: ['Democracy', 'Politics'], 
  img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dr._Bhimrao_Ambedkar.jpg',
  source: 'Dr. Ambedkar Foundation', 
  url: 'https://www.mea.gov.in/books-writings-of-ambedkar.htm' 
},

{ 
  id: 2, 
  type: 'Lecture', 
  category: 'Lectures', 
  title: 'Address to the Constituent Assembly', 
  duration: '45:20', 
  tags: ['Constitution', 'Speech'], 
  img: 'https://commons.wikimedia.org/wiki/Special:FilePath/B.R._Ambedkar_in_1950.jpg',
  source: 'Constituent Assembly Debates Archive', 
  url: 'https://www.constitutionofindia.net/' 
},

{ 
  id: 3, 
  type: 'Documentary', 
  category: 'Documentaries', 
  title: 'The Making of the Indian Constitution', 
  duration: '1:20:00', 
  tags: ['History', 'Documentary'], 
  img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dr_Ambedkar.jpg',
  source: 'National Digital Library of India', 
  url: 'https://ndl.iitkgp.ac.in/' 
},

{ 
  id: 4, 
  type: 'Audio', 
  category: 'Audio', 
  title: 'Speech at Mahad', 
  duration: '34:10', 
  tags: ['Dalit Rights', 'Audio'], 
  img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dr_B_R_Ambedkar_as_Barrister_in_1922.jpg',
  source: 'National Digital Library of India', 
  url: 'https://ndl.iitkgp.ac.in/' 
},

{ 
  id: 5, 
  type: 'Lecture', 
  category: 'Lectures', 
  title: 'Annihilation of Caste (Audio Reading)', 
  duration: '2:15:00', 
  tags: ['Social Reform', 'Literature'], 
  img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Babasaheb_reading_a_book.jpg',
  source: 'Archive.org', 
  url: 'https://archive.org/' 
},

{ 
  id: 6, 
  type: 'Documentary', 
  category: 'Documentaries', 
  title: 'Dr. Babasaheb Ambedkar (Films Division)', 
  duration: '20:15', 
  tags: ['Biography', 'Films Division'], 
  img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dr_Babasaheb_Ambedkar_(1891-1956).jpg',
  source: 'Films Division of India', 
  url: 'https://filmsdivision.org/' 
},
  ];

  const filteredMedia = activeCategory === 'All' 
    ? media 
    : media.filter(item => item.category === activeCategory);

  return (
    <div className="h-full bg-brand-offwhite p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold uppercase tracking-widest text-brand-blue mb-4">Audio-Video Archive</h2>
            <p className="text-2xl text-gray-600">Historic recordings, speeches, documentaries, and interviews.</p>
          </div>
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-bold uppercase tracking-wider transition-colors ${
                  activeCategory === category 
                    ? 'bg-brand-blue text-brand-gold' 
                    : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {filteredMedia.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.2 }}
                key={item.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 cursor-pointer group"
                onClick={() => setActiveVideo(item)}
              >
                <div className="relative h-64 bg-gray-900">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-60 grayscale group-hover:opacity-80 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle size={80} className="text-white/80 group-hover:text-brand-gold group-hover:scale-110 transition-all" />
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1 rounded text-white font-bold flex items-center space-x-2">
                    <Clock size={16} />
                    <span>{item.duration}</span>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-sm font-bold text-brand-gold uppercase tracking-wider">{item.type}</span>
                  <h3 className="text-2xl font-bold text-brand-blue mt-2 mb-4 line-clamp-2">{item.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="flex items-center space-x-1 text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                        <Tag size={14} />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col p-12"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">{activeVideo.title}</h2>
                <div className="flex space-x-4 text-gray-400 text-lg uppercase tracking-wider">
                  <span>{activeVideo.type}</span>
                  <span>•</span>
                  <span>{activeVideo.duration}</span>
                  <span>•</span>
                  <a href={activeVideo.url} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold underline capitalize">{activeVideo.source}</a>
                </div>
              </div>
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 px-6 py-3 bg-brand-gold text-brand-blue font-bold rounded-xl hover:opacity-90 transition-opacity">
                  <BookmarkPlus size={24} />
                  <span>Save to Collection</span>
                </button>
                <button onClick={() => setActiveVideo(null)} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors">
                  <X size={32} />
                </button>
              </div>
            </div>
            
            {/* Player Area */}
            <div className="flex-1 flex space-x-8 overflow-hidden">
              {/* Fake Video Box */}
              <div className="flex-[2] bg-black rounded-3xl overflow-hidden border border-white/20 flex flex-col relative">
                <img src={activeVideo.img} className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale blur-sm" />
                <div className="flex-1 flex items-center justify-center z-10">
                  <Pause size={100} className="text-white/50" />
                </div>
                
                {/* Controls */}
                <div className="h-24 bg-gradient-to-t from-black to-transparent z-10 flex flex-col justify-end p-6">
                  <div className="w-full h-2 bg-white/20 rounded-full mb-4 cursor-pointer">
                    <div className="w-1/3 h-full bg-brand-gold rounded-full relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-white">
                    <div className="flex space-x-6 items-center">
                      <Pause size={32} className="cursor-pointer hover:text-brand-gold transition-colors" />
                      <span className="font-mono text-lg">04:15 / {activeVideo.duration}</span>
                      <Volume2 size={28} className="cursor-pointer hover:text-brand-gold transition-colors" />
                    </div>
                    <Maximize size={28} className="cursor-pointer hover:text-brand-gold transition-colors" />
                  </div>
                </div>
              </div>
              
              {/* Transcript */}
              <div className="flex-1 bg-[#1a1a1a] rounded-3xl border border-white/10 flex flex-col overflow-hidden">
                <div className="p-6 border-b border-white/10 bg-[#222]">
                  <h3 className="text-xl font-bold text-white uppercase tracking-widest">Interactive Transcript</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-8 space-y-6 text-xl text-gray-400">
                  <p><span className="text-brand-gold font-bold mr-4">04:10</span> Democracy is not merely a form of government...</p>
                  <p className="text-white bg-white/10 p-4 rounded-xl shadow-lg border-l-4 border-brand-gold"><span className="text-brand-gold font-bold mr-4">04:15</span> It is primarily a mode of associated living, of conjoint communicated experience.</p>
                  <p><span className="text-brand-gold font-bold mr-4">04:22</span> It is essentially an attitude of respect and reverence towards fellowmen.</p>
                  <p><span className="text-brand-gold font-bold mr-4">04:30</span> Any society that does not recognize this is bound to collapse...</p>
                  <p><span className="text-brand-gold font-bold mr-4">04:45</span> We must make our political democracy a social democracy as well.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
