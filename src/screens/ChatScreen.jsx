import React, { useState, useRef } from 'react';
import { Send, Mic, BookmarkPlus, Info, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const apiKey = import.meta.env.VITE_AI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Welcome. I am the AI Research Assistant. You can ask me questions about Dr. B.R. Ambedkar\'s life, his writings, or the Constitution.', source: null }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const suggestions = [
    "What is his contribution to the Constitution?",
    "Why did he convert to Buddhism?",
    "What were his views on women's rights?"
  ];

  const handleSend = async (text = input) => {
    if (!text.trim()) return;
    
    const userMsg = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      if (!genAI) {
        throw new Error("API Key not found");
      }
      const model = genAI.getGenerativeModel({ model: "gemini-3.7-flash" });
      
      const prompt = `You are an AI research assistant expert on Dr. B.R. Ambedkar. Answer this query comprehensively but concisely, focusing on his life and works: ${text}. 
Please format your response in Markdown. Include relevant markdown links to external sources. When appropriate, embed relevant public domain images using markdown image syntax (e.g. ![description](image_url)). Only use verified, real image URLs (like from Wikimedia Commons). If you cannot verify the image URL is real, do not include an image. At the end of your response, provide a 'Sources' section with bulleted links.`;
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      setMessages(prev => [...prev, { role: 'assistant', text: responseText, source: null }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', text: `Error: ${error.message || 'Unknown error occurred'}`, source: null }]);
    } finally {
      setLoading(false);
    }
  };

  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access the camera. Please check permissions.");
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const captureImage = async () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      
      const dataUrl = canvasRef.current.toDataURL('image/jpeg');
      const base64Data = dataUrl.split(',')[1];
      
      stopCamera();
      
      const userMsg = { role: 'user', text: '📷 *Document scanned for extraction*', image: dataUrl };
      setMessages(prev => [...prev, userMsg]);
      setLoading(true);

      try {
        if (!genAI) throw new Error("API Key not found");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const imagePart = {
          inlineData: {
            data: base64Data,
            mimeType: 'image/jpeg'
          }
        };

        const prompt = `Extract all readable text from this document.
Requirements:
- Preserve the original wording.
- Preserve headings and paragraphs.
- try filling the info based on data internet
- Preserve page numbers where visible.`;
        
        const result = await model.generateContent([prompt, imagePart]);
        const responseText = result.response.text();
        
        setMessages(prev => [...prev, { role: 'assistant', text: responseText, source: null }]);
      } catch (error) {
        console.error(error);
        setMessages(prev => [...prev, { role: 'assistant', text: `Error: ${error.message || 'Unknown error occurred'}`, source: null }]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-full h-full flex flex-col bg-brand-offwhite relative">
      {/* Camera Modal */}
      {showCamera && (
        <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center">
          <video ref={videoRef} autoPlay playsInline className="max-h-[80vh] max-w-full bg-black object-contain" />
          <canvas ref={canvasRef} className="hidden" />
          <div className="mt-8 flex space-x-6">
            <button onClick={captureImage} className="bg-brand-gold text-white px-8 py-4 rounded-full text-2xl font-bold flex items-center shadow-lg hover:opacity-90">
              <Camera className="mr-3" size={32} /> Capture
            </button>
            <button onClick={stopCamera} className="bg-gray-600 text-white px-8 py-4 rounded-full text-2xl font-bold hover:bg-gray-700 shadow-lg">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-brand-blue text-white p-4 md:p-8 shadow-md z-10 flex items-center space-x-3 md:space-x-4">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-brand-gold flex items-center justify-center shrink-0">
          <img src="https://www.drbrambedkarcollege.ac.in//assets/front/images/Dr_Bhim_Rao_Ambedkar.jpg" alt="AI" className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover grayscale mix-blend-multiply opacity-50" />
        </div>
        <div>
          <h2 className="text-lg md:text-2xl font-bold uppercase tracking-widest">AI Research Assistant</h2>
          <p className="text-brand-gold text-sm md:text-lg">Trained on the Complete Works of Dr. Ambedkar</p>
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-8">
        {messages.map((msg, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[90%] md:max-w-[85%] rounded-3xl p-4 md:p-6 text-base md:text-xl shadow-md ${msg.role === 'user' ? 'bg-brand-gold text-brand-blue rounded-tr-none' : 'bg-white border-l-8 border-brand-blue rounded-tl-none'}`}>
              {msg.image && (
                <img src={msg.image} alt="Scanned Document" className="max-w-md w-full rounded-2xl mb-6 shadow-md border-2 border-brand-gold/20" />
              )}
              <div className="leading-relaxed prose prose-blue prose-xl max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" />
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
              
              {msg.source && (
                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                  <div className="flex items-center text-sm font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-4 py-2 rounded-full">
                    <Info size={16} className="mr-2" />
                    Source: {msg.source}
                  </div>
                  <button className="flex items-center text-brand-blue hover:text-brand-gold font-semibold">
                    <BookmarkPlus size={20} className="mr-1" /> Save
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white border-l-8 border-gray-300 rounded-3xl rounded-tl-none p-6 shadow-md text-gray-500 italic flex items-center space-x-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-8 bg-white border-t border-gray-200 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] z-10">
        <div className="max-w-7xl mx-auto">
          <div className="hidden md:flex overflow-x-auto pb-2 space-x-2 md:space-x-4 mb-3 md:mb-6 scrollbar-hide">
            {suggestions.map(sugg => (
              <button 
                key={sugg} 
                onClick={() => handleSend(sugg)}
                className="px-4 py-2 md:px-6 md:py-3 bg-brand-offwhite text-brand-blue rounded-full border border-brand-gold/30 hover:bg-brand-gold hover:text-white transition-colors text-sm md:text-lg font-semibold whitespace-nowrap"
              >
                {sugg}
              </button>
            ))}
          </div>
          
          <div className="flex items-center bg-brand-offwhite rounded-full p-1 md:p-2 border-2 border-gray-200 focus-within:border-brand-gold">
            <button className="p-2 md:p-4 text-brand-blue hover:bg-white rounded-full transition-colors shrink-0">
              <Mic className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <button 
              onClick={startCamera}
              className="p-2 md:p-4 text-brand-blue hover:bg-white rounded-full transition-colors mr-1 md:mr-2 shrink-0"
              title="Scan Document"
            >
              <Camera className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 bg-transparent px-2 md:px-4 text-lg md:text-2xl focus:outline-none placeholder:text-gray-400 min-w-0"
            />
            <button 
              onClick={() => handleSend()}
              disabled={loading}
              className={`p-2 md:p-4 rounded-full transition-colors shrink-0 ${loading ? 'bg-gray-300 text-gray-500' : 'bg-brand-blue text-white hover:bg-brand-gold'}`}
            >
              <Send className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
