
import { Graph, Node, Edge, GraphType } from '../types';

export function generateGraph(type: GraphType, nodeCount: number): Graph {
  switch (type) {
    case 'cycle':
      return generateCycleGraph(nodeCount);
    case 'tree':
      return generateTreeGraph(nodeCount);
    case 'complete':
      return generateCompleteGraph(nodeCount);
    case 'bipartite':
      return generateBipartiteGraph(nodeCount);
    case 'planar':
      return generatePlanarGraph(nodeCount);
    case 'random':
    default:
      return generateRandomGraph(nodeCount, nodeCount * 1.5);
  }
}

// Generates a circular layout for visualization
function calculateCircularLayout(nodes: Node[], radius: number = 200): Node[] {
  return nodes.map((node, i) => {
    const angle = (i / nodes.length) * 2 * Math.PI;
    return {
      ...node,
      x: radius * Math.cos(angle) + radius + 50,
      y: radius * Math.sin(angle) + radius + 50
    };
  });
}

// Generate a cycle graph
export function generateCycleGraph(nodeCount: number): Graph {
  const nodes: Node[] = Array.from({ length: nodeCount }, (_, i) => ({
    id: `node-${i}`,
    x: 0,
    y: 0,
    color: null,
    label: `${i + 1}`
  }));

  const edges: Edge[] = [];
  for (let i = 0; i < nodeCount; i++) {
    edges.push({
      source: `node-${i}`,
      target: `node-${(i + 1) % nodeCount}`
    });
  }

  // Apply circular layout
  const arrangedNodes = calculateCircularLayout(nodes);
  
  return { nodes: arrangedNodes, edges };
}

// Generate a random tree graph
export function generateTreeGraph(nodeCount: number): Graph {
  const nodes: Node[] = Array.from({ length: nodeCount }, (_, i) => ({
    id: `node-${i}`,
    x: 0,
    y: 0,
    color: null,
    label: `${i + 1}`
  }));

  const edges: Edge[] = [];
  // Start from node 1 (index 0 is the root)
  for (let i = 1; i < nodeCount; i++) {
    // Connect to a random node with a smaller index (creates a tree)
    const parentIndex = Math.floor(Math.random() * i);
    edges.push({
      source: `node-${parentIndex}`,
      target: `node-${i}`
    });
  }

  // Apply a force-directed layout (simulated here with a simple circular layout)
  const arrangedNodes = calculateCircularLayout(nodes);
  
  return { nodes: arrangedNodes, edges };
}

// Generate a complete graph (every node connected to every other node)
export function generateCompleteGraph(nodeCount: number): Graph {
  const nodes: Node[] = Array.from({ length: nodeCount }, (_, i) => ({
    id: `node-${i}`,
    x: 0,
    y: 0,
    color: null,
    label: `${i + 1}`
  }));

  const edges: Edge[] = [];
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      edges.push({
        source: `node-${i}`,
        target: `node-${j}`
      });
    }
  }

  // Apply circular layout
  const arrangedNodes = calculateCircularLayout(nodes);
  
  return { nodes: arrangedNodes, edges };
}

// Generate a bipartite graph
export function generateBipartiteGraph(nodeCount: number): Graph {
  const partSize = Math.ceil(nodeCount / 2);
  const nodes: Node[] = Array.from({ length: nodeCount }, (_, i) => ({
    id: `node-${i}`,
    x: 0,
    y: 0,
    color: null,
    label: `${i + 1}`
  }));

  const edges: Edge[] = [];
  // Connect nodes between partitions
  for (let i = 0; i < partSize; i++) {
    for (let j = partSize; j < nodeCount; j++) {
      if (Math.random() > 0.3) { // 70% chance to add an edge
        edges.push({
          source: `node-${i}`,
          target: `node-${j}`
        });
      }
    }
  }

  // Layout nodes in two rows
  const arrangedNodes = nodes.map((node, i) => {
    const isFirstPartition = i < partSize;
    return {
      ...node,
      x: isFirstPartition ? 100 : 300,
      y: isFirstPartition ? (i * 70) + 100 : ((i - partSize) * 70) + 100
    };
  });
  
  return { nodes: arrangedNodes, edges };
}

// Generate a planar graph (simplified approach)
export function generatePlanarGraph(nodeCount: number): Graph {
  // For simplicity, we'll generate a wheel graph which is planar
  const nodes: Node[] = Array.from({ length: nodeCount }, (_, i) => ({
    id: `node-${i}`,
    x: 0,
    y: 0,
    color: null,
    label: `${i + 1}`
  }));

  const edges: Edge[] = [];
  
  // Create a cycle
  for (let i = 1; i < nodeCount; i++) {
    edges.push({
      source: `node-${i}`,
      target: `node-${(i % (nodeCount - 1)) + 1}`
    });
  }
  
  // Connect center node to all others
  for (let i = 1; i < nodeCount; i++) {
    edges.push({
      source: `node-0`,
      target: `node-${i}`
    });
  }

  // Place center node in the middle and others in a circle
  nodes[0].x = 250;
  nodes[0].y = 250;
  
  for (let i = 1; i < nodeCount; i++) {
    const angle = ((i - 1) / (nodeCount - 1)) * 2 * Math.PI;
    nodes[i].x = 200 * Math.cos(angle) + 250;
    nodes[i].y = 200 * Math.sin(angle) + 250;
  }
  
  return { nodes, edges };
}

// Generate a random graph
export function generateRandomGraph(nodeCount: number, edgeCount: number): Graph {
  const nodes: Node[] = Array.from({ length: nodeCount }, (_, i) => ({
    id: `node-${i}`,
    x: 0,
    y: 0,
    color: null,
    label: `${i + 1}`
  }));

  const edges: Edge[] = [];
  let addedEdges = 0;
  
  // Add a minimal spanning tree to ensure the graph is connected
  for (let i = 1; i < nodeCount; i++) {
    const source = Math.floor(Math.random() * i);
    edges.push({
      source: `node-${source}`,
      target: `node-${i}`
    });
    addedEdges++;
  }
  
  // Add additional random edges up to the desired edge count
  while (addedEdges < edgeCount && addedEdges < nodeCount * (nodeCount - 1) / 2) {
    const source = Math.floor(Math.random() * nodeCount);
    let target = Math.floor(Math.random() * nodeCount);
    
    // Avoid self-loops
    while (source === target) {
      target = Math.floor(Math.random() * nodeCount);
    }
    
    // Check if this edge already exists
    const edgeExists = edges.some(e => 
      (e.source === `node-${source}` && e.target === `node-${target}`) || 
      (e.source === `node-${target}` && e.target === `node-${source}`)
    );
    
    if (!edgeExists) {
      edges.push({
        source: `node-${source}`,
        target: `node-${target}`
      });
      addedEdges++;
    }
  }

  // Apply circular layout
  const arrangedNodes = calculateCircularLayout(nodes);
  
  return { nodes: arrangedNodes, edges };
}

export function validateColoring(graph: Graph): { isValid: boolean; conflicts: Edge[] } {
  const conflicts: Edge[] = [];
  
  for (const edge of graph.edges) {
    const sourceNode = graph.nodes.find(node => node.id === edge.source);
    const targetNode = graph.nodes.find(node => node.id === edge.target);
    
    if (sourceNode && targetNode && 
        sourceNode.color && 
        targetNode.color && 
        sourceNode.color === targetNode.color) {
      conflicts.push(edge);
    }
  }
  
  return {
    isValid: conflicts.length === 0,
    conflicts
  };
}

export function calculateChromaticNumber(graph: Graph): number {
  // This is a simplified approach - in a real app, you'd want to implement
  // a proper algorithm for this like Welsh-Powell or backtracking
  
  // For small graphs or certain types, we can provide exact answers
  const nodeCount = graph.nodes.length;
  const edgeCount = graph.edges.length;
  
  // Complete graph
  if (edgeCount === (nodeCount * (nodeCount - 1)) / 2) {
    return nodeCount; // Complete graphs need n colors
  }
  
  // Bipartite check (simplified)
  let isBipartite = true;
  const colors: Record<string, number> = {};
  
  function dfs(nodeId: string, color: number): boolean {
    colors[nodeId] = color;
    
    const node = graph.nodes.find(n => n.id === nodeId);
    if (!node) return true;
    
    const adjacentEdges = graph.edges.filter(
      e => e.source === nodeId || e.target === nodeId
    );
    
    for (const edge of adjacentEdges) {
      const neighborId = edge.source === nodeId ? edge.target : edge.source;
      
      if (colors[neighborId] === undefined) {
        if (!dfs(neighborId, 1 - color)) return false;
      } else if (colors[neighborId] === color) {
        return false;
      }
    }
    
    return true;
  }
  
  for (const node of graph.nodes) {
    if (colors[node.id] === undefined) {
      if (!dfs(node.id, 0)) {
        isBipartite = false;
        break;
      }
    }
  }
  
  if (isBipartite) return 2;
  
  // Cycle graph with odd length
  if (nodeCount >= 3 && edgeCount === nodeCount && nodeCount % 2 === 1) {
    return 3;
  }
  
  // For other types, fall back to a heuristic
  // Typically, planar graphs need at most 4 colors (Four Color Theorem)
  // Trees need 2 colors
  // General case: use maximum degree + 1 as an upper bound (Brooks' theorem)
  let maxDegree = 0;
  for (const node of graph.nodes) {
    const degree = graph.edges.filter(
      e => e.source === node.id || e.target === node.id
    ).length;
    maxDegree = Math.max(maxDegree, degree);
  }
  
  return Math.min(maxDegree + 1, nodeCount);
}

export function getAdjacent(graph: Graph, nodeId: string): Node[] {
  const adjacentNodes: Node[] = [];
  
  for (const edge of graph.edges) {
    if (edge.source === nodeId) {
      const targetNode = graph.nodes.find(node => node.id === edge.target);
      if (targetNode) adjacentNodes.push(targetNode);
    } else if (edge.target === nodeId) {
      const sourceNode = graph.nodes.find(node => node.id === edge.source);
      if (sourceNode) adjacentNodes.push(sourceNode);
    }
  }
  
  return adjacentNodes;
}

export function getSafeColors(graph: Graph, nodeId: string, availableColors: string[]): string[] {
  const adjacentNodes = getAdjacent(graph, nodeId);
  const usedColors = new Set(adjacentNodes.map(node => node.color).filter(Boolean) as string[]);
  
  return availableColors.filter(color => !usedColors.has(color));
}

// Return a node suggestion based on degree (highest degree first)
export function suggestNextNode(graph: Graph): string | null {
  const uncoloredNodes = graph.nodes.filter(node => node.color === null);
  if (uncoloredNodes.length === 0) return null;
  
  // Calculate degree for each uncolored node
  const nodesByDegree = uncoloredNodes.map(node => {
    const degree = graph.edges.filter(
      e => e.source === node.id || e.target === node.id
    ).length;
    return { node, degree };
  });
  
  // Sort by degree, highest first
  nodesByDegree.sort((a, b) => b.degree - a.degree);
  
  return nodesByDegree[0].node.id;
}
