
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Graph, Node } from '@/types';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  graph: Graph;
  suggestedNodeId: string | null;
  suggestedColors: string[];
}

const HintModal: React.FC<HintModalProps> = ({ 
  isOpen, 
  onClose, 
  graph, 
  suggestedNodeId, 
  suggestedColors 
}) => {
  const suggestedNode = suggestedNodeId 
    ? graph.nodes.find(node => node.id === suggestedNodeId) 
    : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Hint</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {suggestedNode ? (
            <>
              <p>
                Try coloring node {suggestedNode.label || suggestedNode.id.replace('node-', '')} next.
              </p>
              
              {suggestedColors.length > 0 ? (
                <div className="mt-3">
                  <p>Safe colors for this node:</p>
                  <div className="flex gap-2 mt-2">
                    {suggestedColors.map(color => (
                      <div
                        key={color}
                        className="w-8 h-8 rounded-full border"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <p className="mt-3">
                  You'll need to introduce a new color for this node. 
                  All its neighbors have used the available colors.
                </p>
              )}
              
              <p className="text-sm text-muted-foreground mt-3">
                Tip: Nodes with more connections (higher degree) are usually 
                harder to color and should be prioritized.
              </p>
            </>
          ) : (
            <p>
              No specific hint is available at this moment. Try looking for nodes 
              with many connections that haven't been colored yet.
            </p>
          )}
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HintModal;
