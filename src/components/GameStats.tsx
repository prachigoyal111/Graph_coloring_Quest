
import React from 'react';
import { GameState } from '@/types';
import { Progress } from '@/components/ui/progress';

interface GameStatsProps {
  gameState: GameState;
  totalLevels: number;
  optimalColors: number;
}

const GameStats: React.FC<GameStatsProps> = ({ 
  gameState, 
  totalLevels, 
  optimalColors 
}) => {
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = (gameState.currentLevel / totalLevels) * 100;
  
  // Color efficiency (closer to optimal colors is better)
  const colorEfficiency = optimalColors > 0 
    ? Math.max(0, 100 - ((gameState.colorsUsed.size - optimalColors) * 20)) 
    : 100;

  return (
    <div className="bg-card p-4 rounded-lg shadow-sm">
      <h3 className="font-medium mb-3">Your Progress</h3>
      
      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Level Progress</span>
            <span>{gameState.currentLevel}/{totalLevels}</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Time</div>
            <div className="text-xl font-bold">{formatTime(gameState.timeElapsed)}</div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground">Score</div>
            <div className="text-xl font-bold">{gameState.score}</div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground">Colors Used</div>
            <div className="text-xl font-bold">{gameState.colorsUsed.size}</div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground">Optimal</div>
            <div className="text-xl font-bold">{optimalColors}</div>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Color Efficiency</span>
            <span>{colorEfficiency}%</span>
          </div>
          <Progress value={colorEfficiency} className="h-2" />
        </div>
      </div>
    </div>
  );
};

export default GameStats;
