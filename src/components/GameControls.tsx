
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Undo, Redo, RefreshCw, HelpCircle, Award } from 'lucide-react';

interface GameControlsProps {
  onNextLevel: () => void;
  onPrevLevel: () => void;
  onResetLevel: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onRequestHint: () => void;
  onCheckSolution: () => void;
  canUndo: boolean;
  canRedo: boolean;
  canGoNext: boolean;
  canGoPrev: boolean;
  hintAvailable: boolean;
  isCheckingAllowed: boolean;
  currentLevel: number;
  totalLevels: number;
}

const GameControls: React.FC<GameControlsProps> = ({
  onNextLevel,
  onPrevLevel,
  onResetLevel,
  onUndo,
  onRedo,
  onRequestHint,
  onCheckSolution,
  canUndo,
  canRedo,
  canGoNext,
  canGoPrev,
  hintAvailable,
  isCheckingAllowed,
  currentLevel,
  totalLevels,
}) => {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-between p-2 bg-secondary/30 rounded-lg">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevLevel}
          disabled={!canGoPrev}
          title="Previous Level"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="ml-1 hidden sm:inline">Previous</span>
        </Button>
        
        <div className="px-3 py-1 bg-secondary rounded font-medium">
          Level {currentLevel}/{totalLevels}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onNextLevel}
          disabled={!canGoNext}
          title="Next Level"
        >
          <span className="mr-1 hidden sm:inline">Next</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onResetLevel}
          title="Reset Level"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="ml-1 hidden sm:inline">Reset</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onRequestHint}
          disabled={!hintAvailable}
          title="Get Hint"
        >
          <HelpCircle className="w-4 h-4" />
          <span className="ml-1 hidden sm:inline">Hint</span>
        </Button>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="default"
            size="sm"
            onClick={onCheckSolution}
            disabled={!isCheckingAllowed}
            title="Check Solution"
            className="bg-primary text-white hover:bg-primary/90"
          >
            <Award className="w-4 h-4" />
            <span className="ml-1">Check</span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default GameControls;
