import React, { useState, useEffect, useRef } from 'react';
import { Camera, FileText, Languages, Headphones, BookmarkPlus, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_AI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export default function DigitizationScreen() {
  const [status, setStatus] = useState('idle'); // idle, scanning, done
  const [extractedText, setExtractedText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    // Start camera on mount
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } catch (err) {
        console.error("Camera access error:", err);
      }
    };
    startCamera();
    
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleScan = async () => {
    if (!videoRef.current || !canvasRef.current || !cameraActive) return;
    setStatus('scanning');
    setErrorMessage('');
    
    try {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      
      const dataUrl = canvasRef.current.toDataURL('image/jpeg');
      const base64Data = dataUrl.split(',')[1];
      
      if (!genAI) throw new Error("API Key not configured");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const imagePart = { inlineData: { data: base64Data, mimeType: 'image/jpeg' } };
      const prompt = `Extract all readable text from this document.
Requirements:
- Preserve the original wording.
- Preserve headings and paragraphs.
- try filling the info based on data internet
- Preserve page numbers where visible.`;
      
      const result = await model.generateContent([prompt, imagePart]);
      setExtractedText(result.response.text());
      setStatus('done');
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Unknown error occurred');
      setStatus('idle');
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex bg-brand-offwhite">
      {/* Left Panel: Camera/Scanner */}
      <div className="w-1/2 p-8 border-r border-gray-300 flex flex-col bg-[#e6e2d8]">
        <div className="mb-8">
          <h2 className="text-3xl font-bold uppercase tracking-widest text-brand-blue mb-2">Manuscript Digitization</h2>
          <p className="text-xl text-gray-600">Place physical document on the glass to extract and analyze text.</p>
        </div>
        
        <div className="flex-1 relative bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800">
          <video ref={videoRef} autoPlay playsInline className={`w-full h-full object-cover transition-opacity ${status === 'scanning' ? 'opacity-50' : 'opacity-100'}`} />
          <canvas ref={canvasRef} className="hidden" />
          {!cameraActive && status === 'idle' && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <p>Camera not active. Please allow access.</p>
            </div>
          )}
          
          {status === 'scanning' && (
            <div className="absolute inset-0 bg-brand-blue/20 flex flex-col items-center justify-center">
              <div className="w-full h-2 bg-brand-gold shadow-[0_0_20px_10px_rgba(198,160,82,0.5)] animate-[scan_2s_ease-in-out_infinite]" style={{ position: 'absolute', top: 0 }} />
              <style>{`
                @keyframes scan {
                  0% { top: 0; }
                  50% { top: 100%; }
                  100% { top: 0; }
                }
              `}</style>
              <Loader2 size={64} className="text-white animate-spin mb-4" />
              <h3 className="text-2xl font-bold text-white tracking-widest">ANALYZING MANUSCRIPT...</h3>
            </div>
          )}
          
          {status === 'idle' && cameraActive && (
            <button 
              onClick={handleScan}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center w-32 h-32 bg-brand-gold rounded-full shadow-[0_0_0_8px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform"
            >
              <Camera size={40} className="text-white mb-2" />
              <span className="text-white font-bold tracking-widest uppercase">Scan</span>
            </button>
          )}
        </div>
      </div>

      {/* Right Panel: Output */}
      <div className="w-1/2 bg-white flex flex-col relative">
        <div className="p-8 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="text-2xl font-bold uppercase text-brand-blue">Extracted Text</h3>
          {status === 'done' && <span className="px-4 py-1 bg-green-100 text-green-800 font-bold uppercase tracking-wider rounded-full text-sm">Success</span>}
        </div>
        
        <div className="flex-1 p-12 overflow-y-auto">
          {status === 'idle' && (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <FileText size={80} className="mb-6 opacity-50" />
              <p className="text-2xl text-center">Digitized text will appear here.<br/>Ready to scan.</p>
              {errorMessage && <p className="mt-4 text-red-500 font-bold text-center">Error: {errorMessage}</p>}
            </div>
          )}
          
          {status === 'scanning' && (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-2/3 space-y-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          )}
          
          {status === 'done' && (
            <div className="prose prose-xl prose-gray font-serif">
              <div className="whitespace-pre-line text-gray-800 leading-relaxed text-2xl">
                {extractedText}
              </div>
            </div>
          )}
        </div>
        
        {status === 'done' && (
          <div className="p-6 bg-brand-blue flex justify-between items-center gap-4">
            <button className="flex-1 flex flex-col items-center p-4 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors">
              <Languages size={24} className="mb-2 text-brand-gold" />
              <span className="font-semibold uppercase tracking-wider">Translate</span>
            </button>
            <button className="flex-1 flex flex-col items-center p-4 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors">
              <Headphones size={24} className="mb-2 text-brand-gold" />
              <span className="font-semibold uppercase tracking-wider">Listen</span>
            </button>
            <button className="flex-1 flex flex-col items-center p-4 bg-brand-gold hover:opacity-90 rounded-xl text-brand-blue transition-opacity">
              <BookmarkPlus size={24} className="mb-2" />
              <span className="font-bold uppercase tracking-wider">Save to Archive</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
