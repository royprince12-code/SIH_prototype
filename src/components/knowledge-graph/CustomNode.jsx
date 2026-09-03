import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { User, Book, Landmark, Calendar, Lightbulb, FileText, Settings } from 'lucide-react';

const iconMap = {
  person: User,
  writing: Book,
  constitution: Landmark,
  event: Calendar,
  idea: Lightbulb,
  document: FileText,
  default: Settings
};

const colorMap = {
  person: { bg: 'bg-[#3b1e1e]', border: 'border-[#7a3b3b]', text: 'text-[#ff9999]', shadow: 'hover:shadow-[0_0_15px_rgba(255,153,153,0.3)]' },
  writing: { bg: 'bg-[#1e2a3b]', border: 'border-[#3b527a]', text: 'text-[#99bbff]', shadow: 'hover:shadow-[0_0_15px_rgba(153,187,255,0.3)]' },
  constitution: { bg: 'bg-[#3b331e]', border: 'border-[#7a6a3b]', text: 'text-[#ffe699]', shadow: 'hover:shadow-[0_0_15px_rgba(255,230,153,0.3)]' },
  event: { bg: 'bg-[#1e3b2e]', border: 'border-[#3b7a5e]', text: 'text-[#99ffcc]', shadow: 'hover:shadow-[0_0_15px_rgba(153,255,204,0.3)]' },
  idea: { bg: 'bg-[#331e3b]', border: 'border-[#6a3b7a]', text: 'text-[#e699ff]', shadow: 'hover:shadow-[0_0_15px_rgba(230,153,255,0.3)]' },
  default: { bg: 'bg-[#0f2444]', border: 'border-[#1e3a68]', text: 'text-brand-gold', shadow: 'hover:shadow-[0_0_15px_rgba(198,160,82,0.3)]' }
};

const CustomNode = memo(({ data, isConnectable }) => {
  const Icon = iconMap[data.type] || iconMap.default;
  const colors = colorMap[data.type] || colorMap.default;
  
  return (
    <div className={`px-4 py-3 shadow-lg rounded-xl ${colors.bg} border-2 ${colors.border} text-white min-w-[150px] max-w-[250px] transition-all group hover:border-white ${colors.shadow}`}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className={`w-3 h-3 ${colors.bg} border-2 border-white`}
      />
      <div className="flex items-center">
        <div className={`rounded-full bg-white/10 p-2 mr-3 group-hover:bg-white/20 transition-colors`}>
          <Icon className={`w-5 h-5 ${colors.text}`} />
        </div>
        <div>
          <div className={`text-xs ${colors.text} opacity-80 uppercase tracking-wider font-semibold mb-1`}>
            {data.type}
          </div>
          <div className="font-bold text-sm leading-tight text-gray-100">
            {data.label}
          </div>
        </div>
      </div>
      
      {data.metadata?.year && (
        <div className="mt-2 text-xs text-gray-400 font-mono">
          {data.metadata.year}
        </div>
      )}
      
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
        className={`w-3 h-3 ${colors.bg} border-2 border-white`}
      />
    </div>
  );
});

export default CustomNode;

