import React from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Bot, Link as LinkIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NodeDetailsPanel({ node, onClose }) {
  const navigate = useNavigate();

  const handleAskAI = () => {
    // Navigate to chat with context
    navigate('/chat', { state: { contextNode: node.data } });
  };

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute right-0 top-0 bottom-0 w-80 md:w-96 bg-[#0f2444]/95 backdrop-blur-xl shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-30 border-l border-white/10 flex flex-col"
    >
      <div className="p-6 border-b border-white/10 flex justify-between items-start">
        <div>
          <div className="text-brand-gold text-xs uppercase tracking-wider font-bold mb-1">
            {node.data.type}
          </div>
          <h2 className="text-2xl font-bold text-white leading-tight">
            {node.data.label}
          </h2>
        </div>
        <button 
          onClick={onClose} 
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6 text-gray-300">
        {node.data.metadata?.year && (
          <div className="flex items-center text-sm font-mono text-gray-400">
            <span className="w-16">Year:</span>
            <span className="text-white">{node.data.metadata.year}</span>
          </div>
        )}
        {node.data.metadata?.location && (
          <div className="flex items-center text-sm font-mono text-gray-400">
            <span className="w-16">Location:</span>
            <span className="text-white">{node.data.metadata.location}</span>
          </div>
        )}

        {node.data.description && (
          <div>
            <h3 className="text-sm font-bold text-brand-gold uppercase tracking-wider mb-2">Description</h3>
            <p className="text-sm leading-relaxed">{node.data.description}</p>
          </div>
        )}

        {node.data.topics && node.data.topics.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-brand-gold uppercase tracking-wider mb-2">Topics</h3>
            <div className="flex flex-wrap gap-2">
              {node.data.topics.map(topic => (
                <span key={topic} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {node.data.sourceIds && node.data.sourceIds.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-brand-gold uppercase tracking-wider mb-2">Sources</h3>
            <ul className="space-y-2">
              {node.data.sourceIds.map(srcId => (
                <li key={srcId} className="flex items-center text-sm text-blue-400 hover:text-blue-300 cursor-pointer">
                  <ExternalLink size={14} className="mr-2" />
                  Source Document {srcId}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-white/10 space-y-3">
        <button 
          onClick={handleAskAI}
          className="w-full flex items-center justify-center space-x-2 py-3 bg-brand-gold hover:bg-brand-gold/90 text-brand-blue font-bold rounded-lg transition-colors"
        >
          <Bot size={18} />
          <span>Ask AI About This</span>
        </button>
        {node.data.expandable && (
          <button className="w-full flex items-center justify-center space-x-2 py-3 bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 rounded-lg transition-colors">
            <LinkIcon size={18} />
            <span>Expand Connections</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
