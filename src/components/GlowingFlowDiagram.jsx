import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Custom node styles
const nodeStyle = {
  padding: '10px 20px',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: 'bold',
  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
  width: 180,
};

// Initial nodes with glowing Gen Z aesthetics
const initialNodes = [
  {
    id: '1',
    position: { x: 250, y: 100 },
    data: { label: 'Create Content' },
    style: {
      ...nodeStyle,
      background: 'linear-gradient(135deg, #ff6bcb, #6b6bff)',
      color: 'white',
      border: '2px solid rgba(255, 255, 255, 0.2)',
    },
  },
  {
    id: '2',
    position: { x: 100, y: 250 },
    data: { label: 'Share Stories' },
    style: {
      ...nodeStyle,
      background: 'linear-gradient(135deg, #6bffb8, #6b9eff)',
      color: 'white',
      border: '2px solid rgba(255, 255, 255, 0.2)',
    },
  },
  {
    id: '3',
    position: { x: 400, y: 250 },
    data: { label: 'Connect Friends' },
    style: {
      ...nodeStyle,
      background: 'linear-gradient(135deg, #ffb86b, #ff6b6b)',
      color: 'white',
      border: '2px solid rgba(255, 255, 255, 0.2)',
    },
  },
  {
    id: '4',
    position: { x: 250, y: 400 },
    data: { label: 'Grow Community' },
    style: {
      ...nodeStyle,
      background: 'linear-gradient(135deg, #bc6bff, #6bd4ff)',
      color: 'white',
      border: '2px solid rgba(255, 255, 255, 0.2)',
    },
  },
];

// Connect the nodes with stylish edges
const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#8a6bff', strokeWidth: 2 },
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    animated: true,
    style: { stroke: '#ff6bdc', strokeWidth: 2 },
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    animated: true,
    style: { stroke: '#6bffd4', strokeWidth: 2 },
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    animated: true,
    style: { stroke: '#ffb86b', strokeWidth: 2 },
  },
];

export default function GlowingFlowDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: '100%', height: '500px', borderRadius: '16px', overflow: 'hidden' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-right"
      >
        <Controls position="bottom-right" style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }} />
        <MiniMap
          nodeStrokeColor={(n) => '#fff'}
          nodeColor={(n) => {
            if (n.id === '1') return '#ff6bcb';
            if (n.id === '2') return '#6bffb8';
            if (n.id === '3') return '#ffb86b';
            return '#bc6bff';
          }}
          maskColor="rgba(0, 0, 0, 0.2)"
          style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}
        />
        <Background color="#aaa" gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}