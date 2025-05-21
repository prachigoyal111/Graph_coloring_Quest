
export interface Node {
  id: string;
  x: number;
  y: number;
  color: string | null;
  label?: string;
}

export interface Edge {
  source: string;
  target: string;
}

export interface Graph {
  nodes: Node[];
  edges: Edge[];
}

export interface GraphLevel {
  id: number;
  name: string;
  graph: Graph;
  chromaticNumber: number; // Minimum colors needed
  description: string;
}

export interface GameState {
  currentLevel: number;
  score: number;
  timeElapsed: number;
  colorsUsed: Set<string>;
  isComplete: boolean;
}

export type GraphType = 'tree' | 'cycle' | 'complete' | 'bipartite' | 'planar' | 'random';
