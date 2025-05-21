
import React, { useRef, useEffect, useState } from 'react';
import { Graph, Node, Edge } from '../types';
import { motion } from 'framer-motion';

interface GraphCanvasProps {
  graph: Graph;
  conflicts: Edge[];
  onNodeClick: (nodeId: string) => void;
  width?: number;
  height?: number;
  zoomable?: boolean;
  pannable?: boolean;
}

const GraphCanvas: React.FC<GraphCanvasProps> = ({ 
  graph, 
  conflicts, 
  onNodeClick,
  width = 800, 
  height = 600, 
  zoomable = true,
  pannable = true
}) => {
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const svgRef = useRef<SVGSVGElement>(null);
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  // Check if an edge is in conflict
  const isConflict = (source: string, target: string): boolean => {
    return conflicts.some(edge => 
      (edge.source === source && edge.target === target) || 
      (edge.source === target && edge.target === source)
    );
  };

  // Handle mouse wheel for zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (!zoomable) return;
    
    e.preventDefault();
    const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = transform.scale * scaleFactor;
    
    // Limit zoom levels
    if (newScale < 0.5 || newScale > 3) return;
    
    setTransform(prev => ({
      ...prev,
      scale: newScale
    }));
  };

  // Handle pan start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!pannable) return;
    
    if (e.target === svgRef.current) {
      isDragging.current = true;
      lastPosition.current = { x: e.clientX, y: e.clientY };
    }
  };

  // Handle pan move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    
    const dx = e.clientX - lastPosition.current.x;
    const dy = e.clientY - lastPosition.current.y;
    
    setTransform(prev => ({
      ...prev,
      x: prev.x + dx,
      y: prev.y + dy
    }));
    
    lastPosition.current = { x: e.clientX, y: e.clientY };
  };

  // Handle pan end
  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Handle pan leave
  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  // Calculate node radius based on the number of nodes
  const nodeRadius = Math.min(25, 500 / graph.nodes.length);

  return (
    <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
      <svg 
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="cursor-grab"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}>
          {/* Draw edges first so they appear behind nodes */}
          {graph.edges.map(edge => {
            const source = graph.nodes.find(n => n.id === edge.source);
            const target = graph.nodes.find(n => n.id === edge.target);
            
            if (!source || !target) return null;
            
            const hasConflict = isConflict(edge.source, edge.target);
            
            return (
              <motion.line
                key={`${edge.source}-${edge.target}`}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={hasConflict ? "#EF4444" : "#94A3B8"}
                strokeWidth={hasConflict ? 3 : 2}
                className={hasConflict ? "pulse-error" : ""}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            );
          })}
          
          {/* Draw nodes */}
          {graph.nodes.map(node => (
            <motion.g 
              key={node.id} 
              onClick={() => onNodeClick(node.id)}
              className="cursor-pointer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={nodeRadius}
                fill={node.color || "#F1F5F9"}
                stroke="#334155"
                strokeWidth="2"
                className={node.color ? "pop-animation" : ""}
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={node.color && isColorDark(node.color) ? "white" : "black"}
                fontSize={nodeRadius * 0.8}
                fontWeight="bold"
              >
                {node.label || node.id.replace('node-', '')}
              </text>
            </motion.g>
          ))}
        </g>
      </svg>
    </div>
  );
};

// Helper to determine if text should be white or black based on background color
function isColorDark(color: string): boolean {
  // For hex colors
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return (r * 0.299 + g * 0.587 + b * 0.114) < 128;
  }
  return false;
}

export default GraphCanvas;
