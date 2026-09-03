import React from 'react';
import { BookOpen, FileText, Headphones, Languages, BookmarkPlus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DocumentScreen() {
  return (
    <div className="min-h-full flex flex-col md:flex-row bg-brand-offwhite">
      {/* Document Sidebar (Actions) */}
      <div className="md:w-1/4 bg-brand-blue text-brand-offwhite p-10 flex flex-col justify-between border-r border-white/10 shadow-xl z-10">
        <div>
          <div className="mb-12">
            <h3 className="text-sm uppercase tracking-widest text-brand-gold mb-2">Speech</h3>
            <h2 className="text-3xl font-bold mb-4 leading-tight">The Grammar of Anarchy</h2>
            <div className="text-white/60 space-y-2 text-lg">
              <p>Date: Nov 25, 1949</p>
              <p>Source: <a href="https://www.constitutionofindia.net/" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-gold">Constituent Assembly Debates Archive</a></p>
            </div>
          </div>
          
          <div className="space-y-4">
            <button className="w-full flex items-center space-x-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-xl font-semibold">
              <FileText size={28} className="text-brand-gold" />
              <span>Summarize</span>
            </button>
            <button className="w-full flex items-center space-x-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-xl font-semibold">
              <Languages size={28} className="text-brand-gold" />
              <span>Translate</span>
            </button>
            <button className="w-full flex items-center space-x-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-xl font-semibold">
              <Headphones size={28} className="text-brand-gold" />
              <span>Listen</span>
            </button>
          </div>
        </div>
        
        <button className="w-full flex justify-center items-center space-x-3 p-5 rounded-xl bg-brand-gold text-brand-blue font-bold text-xl uppercase tracking-wide hover:opacity-90">
          <BookmarkPlus size={28} />
          <span>Add to Collection</span>
        </button>
      </div>

      {/* Document Content */}
      <div className="md:w-3/4 flex flex-col h-[calc(100vh-100px)]">
        <div className="flex-1 overflow-y-auto p-16 bg-[#fcfbf9]">
          <div className="max-w-4xl mx-auto prose prose-2xl prose-blue prose-headings:font-serif prose-headings:text-brand-blue prose-p:text-gray-800 prose-p:leading-loose">
            <h1 className="text-5xl font-bold mb-10 text-center">The Grammar of Anarchy</h1>
            
            <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-brand-gold first-letter:mr-3 first-letter:float-left">
              If we wish to maintain democracy not merely in form, but also in fact, what must we do? The first thing in my judgement we must do is to hold fast to constitutional methods of achieving our social and economic objectives.
            </p>
            
            <p>
              It means we must abandon the bloody methods of revolution. It means that we must abandon the method of civil disobedience, non-cooperation and satyagraha. When there was no way left for constitutional methods for achieving economic and social objectives, there was a great deal of justification for unconstitutional methods.
            </p>
            
            <p>
              But where constitutional methods are open, there can be no justification for these unconstitutional methods. These methods are nothing but the Grammar of Anarchy and the sooner they are abandoned, the better for us.
            </p>
            
            <p>
              The second thing we must do is to observe the caution which John Stuart Mill has given to all who are interested in the maintenance of democracy, namely, not "to lay their liberties at the feet of even a great man, or to trust him with powers which enable him to subvert their institutions."
            </p>
            
            <p>
              In India, Bhakti or what may be called the path of devotion or hero-worship, plays a part in its politics unequalled in magnitude by the part it plays in the politics of any other country in the world. Bhakti in religion may be a road to the salvation of the soul. But in politics, Bhakti or hero-worship is a sure road to degradation and to eventual dictatorship.
            </p>
          </div>
        </div>
        
        {/* Related Topics Bar */}
        <div className="bg-white border-t border-gray-200 p-6 flex items-center shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] z-10">
          <span className="text-xl font-bold uppercase tracking-wide text-gray-500 mr-8 whitespace-nowrap">Related:</span>
          <div className="flex space-x-6 overflow-x-auto pb-2 flex-1">
            {['Democracy vs Dictatorship', 'Role of Minorities', 'Social Reform', 'Constitutional Morality'].map(topic => (
              <Link to="/map" key={topic} className="flex-none px-6 py-3 bg-[#f5f2eb] border border-brand-gold/30 rounded-full text-brand-blue font-semibold text-lg hover:bg-brand-gold hover:text-white transition-colors flex items-center space-x-2">
                <span>{topic}</span>
                <ArrowRight size={18} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
