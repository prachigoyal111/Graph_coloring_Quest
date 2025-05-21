
import React from 'react';
import { GraphLevel } from '../types';
import { Badge } from '@/components/ui/badge';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface LevelInfoProps {
  level: GraphLevel;
  colorsUsed: Set<string>;
  isComplete: boolean;
  showChromaticNumber: boolean;
}

const LevelInfo: React.FC<LevelInfoProps> = ({ 
  level, 
  colorsUsed, 
  isComplete,
  showChromaticNumber
}) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">
            {level.name}
          </CardTitle>
          {isComplete && (
            <Badge variant="default" className="bg-green-500 hover:bg-green-600">
              Complete!
            </Badge>
          )}
        </div>
        <CardDescription>{level.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          <div className="bg-secondary/50 px-3 py-1 rounded-md">
            <span className="text-sm font-medium">Nodes: {level.graph.nodes.length}</span>
          </div>
          <div className="bg-secondary/50 px-3 py-1 rounded-md">
            <span className="text-sm font-medium">Edges: {level.graph.edges.length}</span>
          </div>
          <div className="bg-secondary/50 px-3 py-1 rounded-md">
            <span className="text-sm font-medium">
              Colors Used: {colorsUsed.size}
            </span>
          </div>
          {showChromaticNumber && (
            <div className="bg-primary/20 px-3 py-1 rounded-md">
              <span className="text-sm font-medium">
                Chromatic Number: {level.chromaticNumber}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LevelInfo;
