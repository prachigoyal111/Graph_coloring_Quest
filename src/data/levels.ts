
import { GraphLevel } from '../types';
import { 
  generateCycleGraph, 
  generateCompleteGraph, 
  generateBipartiteGraph, 
  generatePlanarGraph, 
  generateTreeGraph, 
  generateRandomGraph, 
  calculateChromaticNumber 
} from '../utils/graphUtils';

const levels: GraphLevel[] = [
  {
    id: 1,
    name: "Introduction: Tree Graph",
    graph: generateTreeGraph(7),
    chromaticNumber: 2,
    description: "Trees are connected graphs without cycles and can always be colored using just 2 colors."
  },
  {
    id: 2,
    name: "Cycle Graph",
    graph: generateCycleGraph(6),
    chromaticNumber: 2,
    description: "Even cycle graphs can be colored with 2 colors, while odd cycles require 3 colors."
  },
  {
    id: 3,
    name: "Complete Graph K4",
    graph: generateCompleteGraph(4),
    chromaticNumber: 4,
    description: "Complete graphs require as many colors as there are nodes, as every node is connected to every other node."
  },
  {
    id: 4,
    name: "Bipartite Graph",
    graph: generateBipartiteGraph(8),
    chromaticNumber: 2,
    description: "Bipartite graphs can always be colored using 2 colors, with nodes in each partition getting the same color."
  },
  {
    id: 5,
    name: "Planar Graph",
    graph: generatePlanarGraph(8),
    chromaticNumber: 4,
    description: "According to the Four Color Theorem, any planar graph can be colored using at most 4 colors."
  },
  {
    id: 6,
    name: "Challenging Random Graph",
    graph: generateRandomGraph(10, 20),
    get chromaticNumber() {
      return calculateChromaticNumber(this.graph);
    },
    description: "This random graph presents a more complex coloring challenge. Try to find the minimum number of colors needed."
  }
];

// Ensure chromatic numbers are calculated for all levels
levels.forEach(level => {
  if (typeof level.chromaticNumber !== 'number') {
    level.chromaticNumber = calculateChromaticNumber(level.graph);
  }
});

export default levels;
