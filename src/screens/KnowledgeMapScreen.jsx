import React from 'react';
import KnowledgeGraph from '../components/knowledge-graph/KnowledgeGraph';

export default function KnowledgeMapScreen() {
  return (
    <div className="w-full h-[calc(100vh-100px)] overflow-hidden">
      <KnowledgeGraph />
    </div>
  );
}
