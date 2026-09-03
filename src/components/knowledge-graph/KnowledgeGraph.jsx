import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Network, Search } from 'lucide-react';
import CustomNode from './CustomNode';
import NodeDetailsPanel from './NodeDetailsPanel';
import { initialNodes, initialEdges } from '../../data/graphData';
import { AnimatePresence } from 'framer-motion';

const nodeTypes = {
  person: CustomNode,
  writing: CustomNode,
  constitution: CustomNode,
  event: CustomNode,
  idea: CustomNode,
  default: CustomNode,
};

export default function KnowledgeGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    
    // Highlight connected edges
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        style: {
          ...edge.style,
          stroke: (edge.source === node.id || edge.target === node.id) ? '#c6a052' : '#ffffff22',
          strokeWidth: (edge.source === node.id || edge.target === node.id) ? 3 : 1,
        },
        animated: (edge.source === node.id || edge.target === node.id),
      }))
    );

    // Dim unrelated nodes
    setNodes((nds) => 
      nds.map((n) => {
        const isConnected = edges.some(e => 
          (e.source === node.id && e.target === n.id) || 
          (e.target === node.id && e.source === n.id)
        );
        const isSelf = n.id === node.id;
        
        return {
          ...n,
          style: {
            ...n.style,
            opacity: (isSelf || isConnected) ? 1 : 0.3
          }
        };
      })
    );
  }, [edges, setEdges, setNodes]);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    // Reset highlights
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        style: { ...edge.style, stroke: '#c6a052', strokeWidth: 1.5 },
        animated: false,
      }))
    );
    setNodes((nds) => nds.map(n => ({ ...n, style: { ...n.style, opacity: 1 }})));
  }, [setEdges, setNodes]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query) {
      onPaneClick(); // Reset
      return;
    }
    
    setNodes((nds) => 
      nds.map((n) => {
        const matches = n.data.label.toLowerCase().includes(query) || 
                        (n.data.description && n.data.description.toLowerCase().includes(query));
        return {
          ...n,
          style: {
            ...n.style,
            opacity: matches ? 1 : 0.2
          }
        };
      })
    );
  };

  return (
    <div className="w-full h-full relative bg-brand-blue" style={{ height: 'calc(100vh - 100px)' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-[#0b172a]"
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#c6a052" gap={30} size={1} opacity={0.1} />
        
        <Panel position="top-left" className="m-4">
          <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center space-x-4">
            <Network className="text-brand-gold w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold text-white uppercase tracking-wider">Knowledge Graph</h1>
              <p className="text-brand-gold/80 text-sm">Interactive Exploration</p>
            </div>
          </div>
        </Panel>

        <Panel position="top-right" className="m-4">
          <div className="bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center shadow-lg">
            <Search className="text-gray-400 w-5 h-5 mr-2" />
            <input 
              type="text" 
              placeholder="Search graph..." 
              className="bg-transparent border-none outline-none text-white w-48 placeholder-gray-500"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </Panel>
        
        <Controls 
          className="bg-black/60 border border-white/10 fill-white [&>button]:border-b-white/10 [&>button]:hover:bg-brand-gold/20" 
          position="bottom-left"
        />
        
        <MiniMap 
          nodeColor={(n) => {
            if (n.type === 'person') return '#c6a052';
            if (n.type === 'writing') return '#3b82f6';
            return '#64748b';
          }}
          maskColor="rgba(11, 23, 42, 0.7)"
          className="bg-black/80 border border-white/10 rounded-xl"
        />
      </ReactFlow>

      <AnimatePresence>
        {selectedNode && (
          <NodeDetailsPanel node={selectedNode} onClose={() => onPaneClick()} />
        )}
      </AnimatePresence>
    </div>
  );
}
