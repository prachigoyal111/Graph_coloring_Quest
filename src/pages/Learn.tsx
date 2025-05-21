
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const Learn: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
      
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Understanding Graph Coloring</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Learn about the fundamentals of graph coloring, its applications, and how to approach coloring problems
        </p>
      </header>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">What is Graph Coloring?</h2>
            <p className="text-lg mb-4">
              Graph coloring is the assignment of labels, called "colors," to elements of a graph subject to certain constraints. 
              In its simplest form, it's about coloring the vertices of a graph such that no two adjacent vertices share the same color.
            </p>
            <p className="text-lg mb-4">
              The goal is typically to use as few colors as possible. The minimum number of colors needed to color a graph is called 
              its <strong>chromatic number</strong>.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Key Terms and Concepts</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Chromatic Number</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>The minimum number of colors required to color a graph without any adjacent nodes sharing the same color.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Proper Coloring</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>An assignment of colors to the nodes where no adjacent nodes have the same color.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>k-Colorable</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>A graph is k-colorable if it can be properly colored using k colors.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Four Color Theorem</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Any planar graph can be properly colored using at most four colors.</p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Special Cases</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">Complete Graphs</h3>
                <p>
                  A complete graph with n vertices (denoted K<sub>n</sub>) requires exactly n colors, as every vertex is adjacent to every other vertex.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Bipartite Graphs</h3>
                <p>
                  A bipartite graph can always be colored with exactly 2 colors. In fact, a graph is bipartite if and only if it is 2-colorable.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Cycle Graphs</h3>
                <p>
                  A cycle graph with an even number of vertices can be colored with 2 colors, while a cycle with an odd number of vertices requires 3 colors.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Trees</h3>
                <p>
                  All trees are 2-colorable, making them a special case of bipartite graphs.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Planar Graphs</h3>
                <p>
                  According to the Four Color Theorem, any planar graph can be colored with at most 4 colors.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Applications</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">Map Coloring</h3>
                <p>
                  The classic application: coloring geographical maps so that no adjacent regions share the same color.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Scheduling Problems</h3>
                <p>
                  Assigning time slots to events such that no conflicting events occur simultaneously.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Register Allocation</h3>
                <p>
                  In compiler optimization, assigning a limited number of registers to variables in a program.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Frequency Assignment</h3>
                <p>
                  Assigning frequencies to radio stations or mobile networks to avoid interference.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Coloring Algorithms</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">Greedy Coloring</h3>
                <p>
                  Process vertices in some order, assigning each vertex the smallest available color that hasn't been used by its adjacent vertices.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Welsh-Powell Algorithm</h3>
                <p>
                  Order vertices by degree (highest first), then color them one by one, skipping any that are adjacent to a vertex of the current color.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Backtracking</h3>
                <p>
                  A systematic way to try different color assignments, backtracking when a coloring becomes invalid.
                </p>
              </div>
            </div>
          </section>
          
          <section className="bg-secondary/30 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Tips for Our Graph Coloring Game</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">Start with High-Degree Nodes</h3>
                <p>
                  Nodes with more connections are more constrained in their color choices, so color them first.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Look for Patterns</h3>
                <p>
                  Identify substructures like cycles, complete subgraphs, or bipartite components to inform your coloring strategy.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Use the Minimum Colors Possible</h3>
                <p>
                  Try to use as few colors as possible. This not only improves your score but helps you understand the graph's structure better.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Don't Be Afraid to Reset</h3>
                <p>
                  If you find yourself using too many colors, consider starting over with a different strategy.
                </p>
              </div>
            </div>
          </section>
        </div>
        
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ready to Play?</CardTitle>
              <CardDescription>
                Put your knowledge to practice in our interactive game.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/game">Start Coloring</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>External Resources</CardTitle>
              <CardDescription>
                Further readings on graph coloring.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://en.wikipedia.org/wiki/Graph_coloring" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center"
                  >
                    Wikipedia: Graph Coloring
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://mathworld.wolfram.com/ChromaticNumber.html" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center"
                  >
                    Wolfram: Chromatic Number
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://en.wikipedia.org/wiki/Four_color_theorem" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center"
                  >
                    Four Color Theorem
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Graph Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <h4 className="font-medium">Complete Graph</h4>
                <p className="text-sm text-muted-foreground">
                  Every node connects to every other node. Requires n colors for n nodes.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Bipartite Graph</h4>
                <p className="text-sm text-muted-foreground">
                  Nodes can be divided into two groups with no connections within each group. Requires 2 colors.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Planar Graph</h4>
                <p className="text-sm text-muted-foreground">
                  Can be drawn on a plane without edge crossings. Requires at most 4 colors.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Tree</h4>
                <p className="text-sm text-muted-foreground">
                  Connected graph with no cycles. Requires 2 colors.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Learn;
