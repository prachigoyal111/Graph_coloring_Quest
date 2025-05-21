
import React, { useEffect, useState, useRef } from 'react';
import { Graph, Node, Edge, GameState } from '@/types';
import { 
  validateColoring, 
  getAdjacent, 
  getSafeColors, 
  suggestNextNode 
} from '@/utils/graphUtils';
import GraphCanvas from '@/components/GraphCanvas';
import ColorPalette from '@/components/ColorPalette';
import GameControls from '@/components/GameControls';
import LevelInfo from '@/components/LevelInfo';
import GameStats from '@/components/GameStats';
import QuizModal from '@/components/QuizModal';
import HintModal from '@/components/HintModal';
import { colorPalette } from '@/data/colors';
import levels from '@/data/levels';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { HelpCircle, Award, Sparkles } from 'lucide-react';

const Game: React.FC = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [graph, setGraph] = useState<Graph>(levels[0].graph);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [conflicts, setConflicts] = useState<Edge[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    score: 0,
    timeElapsed: 0,
    colorsUsed: new Set<string>(),
    isComplete: false
  });
  const [history, setHistory] = useState<Graph[]>([levels[0].graph]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [suggestedNode, setSuggestedNode] = useState<string | null>(null);
  const [suggestedColors, setSuggestedColors] = useState<string[]>([]);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [showChromaticNumber, setShowChromaticNumber] = useState(false);
  
  const timerRef = useRef<number | null>(null);
  const { toast } = useToast();

  // Initialize the game
  useEffect(() => {
    loadLevel(currentLevelIndex);
    startTimer();
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Start the timer
  const startTimer = () => {
    timerRef.current = window.setInterval(() => {
      setGameState(prev => ({
        ...prev,
        timeElapsed: prev.timeElapsed + 1
      }));
    }, 1000);
  };

  // Load a specific level
  const loadLevel = (levelIndex: number) => {
    const level = levels[levelIndex];
    const initialGraph = JSON.parse(JSON.stringify(level.graph)) as Graph;
    
    setGraph(initialGraph);
    setConflicts([]);
    setSelectedColor(null);
    setHistory([initialGraph]);
    setHistoryIndex(0);
    setGameState(prev => ({
      ...prev,
      currentLevel: levelIndex + 1,
      colorsUsed: new Set<string>(),
      isComplete: false
    }));
    setShowChromaticNumber(false);
    
    toast({
      title: `Level ${levelIndex + 1}: ${level.name}`,
      description: "Color the graph so that no adjacent nodes have the same color."
    });
  };

  // Handle color selection
  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
  };

  // Handle node click for coloring
  const handleNodeClick = (nodeId: string) => {
    if (!selectedColor) {
      toast({
        title: "No color selected",
        description: "Please choose a color from the palette first.",
        variant: "destructive"
      });
      return;
    }

    const nodeIndex = graph.nodes.findIndex(node => node.id === nodeId);
    if (nodeIndex === -1) return;

    // Create a new graph with the updated node color
    const newGraph = { 
      nodes: [...graph.nodes],
      edges: [...graph.edges]
    };
    
    // Update the node color
    newGraph.nodes[nodeIndex] = {
      ...newGraph.nodes[nodeIndex],
      color: selectedColor
    };
    
    // Add color to used colors set
    const newColorsUsed = new Set(gameState.colorsUsed);
    newColorsUsed.add(selectedColor);

    // Validate the new coloring
    const validation = validateColoring(newGraph);
    setConflicts(validation.conflicts);

    // Update the graph
    setGraph(newGraph);
    
    // Update game state
    setGameState(prev => ({
      ...prev,
      colorsUsed: newColorsUsed,
      isComplete: validation.isValid && newGraph.nodes.every(node => node.color !== null)
    }));

    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newGraph);
    setHistory(newHistory);
    setHistoryIndex(historyIndex + 1);

    // Check if the graph is completely colored with no conflicts
    if (validation.isValid && newGraph.nodes.every(node => node.color !== null)) {
      const chromaticNumber = levels[currentLevelIndex].chromaticNumber;
      const usedColors = newColorsUsed.size;
      
      let bonusPoints = 0;
      if (usedColors === chromaticNumber) {
        bonusPoints = 100; // Optimal coloring bonus
        toast({
          title: "Perfect!",
          description: `You found the optimal coloring using exactly ${chromaticNumber} colors!`,
          variant: "default"
        });
      } else {
        toast({
          title: "Graph Colored Successfully!",
          description: `You used ${usedColors} colors. The optimal solution uses ${chromaticNumber} colors.`,
          variant: "default"
        });
      }
      
      // Calculate score based on level, time, and colors used
      const timeBonus = Math.max(0, 300 - gameState.timeElapsed);
      const levelBonus = currentLevelIndex * 50;
      const colorPenalty = Math.max(0, (usedColors - chromaticNumber) * 20);
      
      const levelScore = 100 + levelBonus + timeBonus + bonusPoints - colorPenalty;
      
      // Update game state
      setGameState(prev => ({
        ...prev,
        score: prev.score + levelScore,
        isComplete: true
      }));
      
      // Show the chromatic number
      setShowChromaticNumber(true);
      
      // If it's the last level, show completion message
      if (currentLevelIndex === levels.length - 1) {
        toast({
          title: "Congratulations!",
          description: "You've completed all levels! Your final score: " + (gameState.score + levelScore),
          variant: "default"
        });
      }
    }
  };

  // Navigation functions
  const handlePrevLevel = () => {
    if (currentLevelIndex > 0) {
      setCurrentLevelIndex(currentLevelIndex - 1);
      loadLevel(currentLevelIndex - 1);
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < levels.length - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1);
      loadLevel(currentLevelIndex + 1);
    }
  };

  // History navigation
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setGraph(history[historyIndex - 1]);
      
      // Recalculate conflicts and game state
      const validation = validateColoring(history[historyIndex - 1]);
      setConflicts(validation.conflicts);
      
      const colorsUsed = new Set<string>();
      history[historyIndex - 1].nodes.forEach(node => {
        if (node.color) colorsUsed.add(node.color);
      });
      
      setGameState(prev => ({
        ...prev,
        colorsUsed,
        isComplete: validation.isValid && history[historyIndex - 1].nodes.every(node => node.color !== null)
      }));
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setGraph(history[historyIndex + 1]);
      
      // Recalculate conflicts and game state
      const validation = validateColoring(history[historyIndex + 1]);
      setConflicts(validation.conflicts);
      
      const colorsUsed = new Set<string>();
      history[historyIndex + 1].nodes.forEach(node => {
        if (node.color) colorsUsed.add(node.color);
      });
      
      setGameState(prev => ({
        ...prev,
        colorsUsed,
        isComplete: validation.isValid && history[historyIndex + 1].nodes.every(node => node.color !== null)
      }));
    }
  };

  // Reset the current level
  const handleResetLevel = () => {
    loadLevel(currentLevelIndex);
  };

  // Request a hint
  const handleRequestHint = () => {
    // Find the next node to color (highest degree uncolored node)
    const nodeId = suggestNextNode(graph);
    setSuggestedNode(nodeId);
    
    if (nodeId) {
      // Get safe colors for the suggested node
      const safeColors = getSafeColors(
        graph,
        nodeId,
        colorPalette.map(c => c.value)
      );
      setSuggestedColors(safeColors);
    } else {
      setSuggestedColors([]);
    }
    
    setShowHint(true);
  };

  // Open the quiz modal
  const handleCheckSolution = () => {
    setIsQuizOpen(true);
  };

  // Handle correct quiz answer
  const handleQuizCorrect = () => {
    setShowChromaticNumber(true);
    setIsQuizOpen(false);
    
    // Add bonus points for correctly answering the quiz
    setGameState(prev => ({
      ...prev,
      score: prev.score + 50
    }));
    
    toast({
      title: "Correct Answer!",
      description: `You've earned 50 bonus points for knowing the chromatic number.`,
      variant: "default"
    });
  };

  // Get available safe colors for a node
  const getNodeSafeColors = (nodeId: string): string[] => {
    return getSafeColors(
      graph, 
      nodeId, 
      colorPalette.map(c => c.value)
    );
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 text-primary">Graph Coloring</h1>
        <p className="text-lg text-muted-foreground">
          Color the graph so that no adjacent nodes share the same color
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <LevelInfo 
            level={levels[currentLevelIndex]}
            colorsUsed={gameState.colorsUsed}
            isComplete={gameState.isComplete}
            showChromaticNumber={showChromaticNumber}
          />
          
          <GameStats 
            gameState={gameState}
            totalLevels={levels.length}
            optimalColors={levels[currentLevelIndex].chromaticNumber}
          />
          
          <div className="p-4 bg-card rounded-lg shadow-sm">
            <h3 className="font-medium mb-3">Help</h3>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleRequestHint}
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Get a Hint
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleCheckSolution}
              >
                <Award className="mr-2 h-4 w-4" />
                Quiz: Chromatic Number
              </Button>
              
              <div className="text-sm text-muted-foreground mt-2">
                <p className="mb-1">
                  <strong>Goal:</strong> Color each node so that no adjacent nodes have the same color.
                </p>
                <p className="mb-1">
                  <strong>Score bonus:</strong> Use as few colors as possible to maximize your score.
                </p>
                <p className="mb-1">
                  <strong>Try to find:</strong> The optimal coloring with the minimum number of colors needed.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-3 space-y-6">
          <GameControls 
            onNextLevel={handleNextLevel}
            onPrevLevel={handlePrevLevel}
            onResetLevel={handleResetLevel}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onRequestHint={handleRequestHint}
            onCheckSolution={handleCheckSolution}
            canUndo={historyIndex > 0}
            canRedo={historyIndex < history.length - 1}
            canGoNext={currentLevelIndex < levels.length - 1}
            canGoPrev={currentLevelIndex > 0}
            hintAvailable={true}
            isCheckingAllowed={true}
            currentLevel={currentLevelIndex + 1}
            totalLevels={levels.length}
          />
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex justify-center">
              <GraphCanvas 
                graph={graph}
                conflicts={conflicts}
                onNodeClick={handleNodeClick}
                width={800}
                height={500}
                zoomable={true}
                pannable={true}
              />
            </div>
          </div>
          
          <div className="bg-card p-4 rounded-lg shadow-sm">
            <h3 className="font-medium mb-3">Color Palette</h3>
            <ColorPalette 
              onSelectColor={handleSelectColor}
              selectedColor={selectedColor}
            />
            {selectedColor && (
              <div className="mt-3 flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-full" 
                  style={{ backgroundColor: selectedColor }}
                />
                <span>Selected</span>
                {graph.nodes.some(node => !node.color) && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      const uncoloredNodes = graph.nodes.filter(node => !node.color);
                      if (uncoloredNodes.length > 0) {
                        handleNodeClick(uncoloredNodes[0].id);
                      }
                    }}
                  >
                    <Sparkles className="mr-1 h-3 w-3" />
                    Auto-color next node
                  </Button>
                )}
              </div>
            )}
          </div>
          
          {gameState.isComplete && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <h3 className="text-xl font-bold text-green-700 mb-2">Level Complete!</h3>
              <p className="mb-4">
                You used {gameState.colorsUsed.size} colors. 
                {gameState.colorsUsed.size === levels[currentLevelIndex].chromaticNumber
                  ? " That's optimal! Perfect coloring!"
                  : ` The optimal solution uses ${levels[currentLevelIndex].chromaticNumber} colors.`}
              </p>
              {currentLevelIndex < levels.length - 1 ? (
                <Button onClick={handleNextLevel}>
                  Next Level
                </Button>
              ) : (
                <p className="font-bold">
                  Congratulations! You've completed all levels!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Modals */}
      <QuizModal 
        level={levels[currentLevelIndex]}
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onCorrectAnswer={handleQuizCorrect}
      />
      
      <HintModal 
        isOpen={showHint}
        onClose={() => setShowHint(false)}
        graph={graph}
        suggestedNodeId={suggestedNode}
        suggestedColors={suggestedColors}
      />
    </div>
  );
};

export default Game;
