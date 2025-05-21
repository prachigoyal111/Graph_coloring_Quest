
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraphLevel } from '@/types';

interface QuizModalProps {
  level: GraphLevel;
  isOpen: boolean;
  onClose: () => void;
  onCorrectAnswer: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ 
  level, 
  isOpen, 
  onClose,
  onCorrectAnswer 
}) => {
  const [guess, setGuess] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = () => {
    const guessNumber = parseInt(guess);
    
    if (isNaN(guessNumber)) {
      setFeedback("Please enter a valid number.");
      return;
    }
    
    const correct = guessNumber === level.chromaticNumber;
    setIsCorrect(correct);
    setHasSubmitted(true);
    
    if (correct) {
      setFeedback("Correct! You've determined the exact chromatic number.");
      setTimeout(() => {
        onCorrectAnswer();
      }, 2000);
    } else if (guessNumber < level.chromaticNumber) {
      setFeedback(`Not quite. It's not possible to color this graph with only ${guessNumber} colors.`);
    } else {
      setFeedback(`Not quite. This graph can be colored with fewer than ${guessNumber} colors.`);
    }
  };

  const handleReset = () => {
    setGuess('');
    setFeedback(null);
    setIsCorrect(null);
    setHasSubmitted(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Graph Coloring Quiz</DialogTitle>
          <DialogDescription>
            What is the minimum number of colors needed to properly color this graph?
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Label htmlFor="guess">Your Answer:</Label>
          <Input
            id="guess"
            type="number"
            min="1"
            max="10"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="mt-1"
            placeholder="Enter a number"
            disabled={hasSubmitted && isCorrect === true}
          />
          
          {feedback && (
            <div className={`mt-3 p-3 rounded-md ${
              isCorrect ? 'bg-green-100 text-green-800' : 
                (isCorrect === false ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800')
            }`}>
              {feedback}
            </div>
          )}
          
          {hasSubmitted && isCorrect === false && (
            <div className="mt-3">
              <p className="text-sm text-muted-foreground">
                Hint: Look at the structure of the graph carefully. Are there any clusters of nodes 
                that must have different colors from each other?
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex gap-2 justify-end">
          {hasSubmitted && isCorrect === false && (
            <Button variant="outline" onClick={handleReset}>
              Try Again
            </Button>
          )}
          {!hasSubmitted && (
            <Button type="submit" onClick={handleSubmit}>
              Submit Answer
            </Button>
          )}
          {(hasSubmitted && isCorrect) && (
            <Button onClick={onClose}>
              Continue
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;
