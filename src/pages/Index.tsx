
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  CircleDot, 
  Zap, 
  Brain, 
  Award, 
  Palette, 
  BookOpen 
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold text-primary mb-4">Graph Coloring Quest</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Master the art of graph coloring through interactive puzzles, challenges, and visual learning
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold mb-4">Challenge Your Mind</h2>
            <p className="text-lg mb-6">
              Graph coloring is a fascinating mathematical problem with applications in scheduling, 
              register allocation, map coloring, and more. Dive into our interactive platform to learn, 
              practice, and master this fundamental concept in graph theory.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/game">Start Playing</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/learn">Learn More</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card rounded-xl shadow-lg overflow-hidden"
          >
            {/* Placeholder for screenshot or animation */}
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <div className="relative w-4/5 h-4/5">
                {/* Simple graph visualization */}
                {[
                  { x: "50%", y: "25%", color: "#EF4444" },
                  { x: "25%", y: "50%", color: "#3B82F6" },
                  { x: "75%", y: "50%", color: "#10B981" },
                  { x: "40%", y: "75%", color: "#8B5CF6" },
                  { x: "60%", y: "75%", color: "#F59E0B" },
                ].map((node, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-12 h-12 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold"
                    style={{ 
                      left: node.x, 
                      top: node.y, 
                      backgroundColor: node.color,
                      transform: "translate(-50%, -50%)"
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
                  >
                    {i + 1}
                  </motion.div>
                ))}
                {/* Edges */}
                <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -1 }}>
                  <motion.line x1="50%" y1="25%" x2="25%" y2="50%" stroke="#94A3B8" strokeWidth="2"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.5 }} />
                  <motion.line x1="50%" y1="25%" x2="75%" y2="50%" stroke="#94A3B8" strokeWidth="2"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.1, duration: 0.5 }} />
                  <motion.line x1="25%" y1="50%" x2="40%" y2="75%" stroke="#94A3B8" strokeWidth="2"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 0.5 }} />
                  <motion.line x1="75%" y1="50%" x2="60%" y2="75%" stroke="#94A3B8" strokeWidth="2"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.3, duration: 0.5 }} />
                  <motion.line x1="40%" y1="75%" x2="60%" y2="75%" stroke="#94A3B8" strokeWidth="2"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.4, duration: 0.5 }} />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <CircleDot className="h-8 w-8 text-primary" />,
                title: "Interactive Visualization",
                description: "Explore graph theory concepts through intuitive visual representations and interactive controls."
              },
              {
                icon: <Zap className="h-8 w-8 text-primary" />,
                title: "Progressive Difficulty",
                description: "Start with simple graphs and work your way up to complex challenges as you master coloring techniques."
              },
              {
                icon: <Palette className="h-8 w-8 text-primary" />,
                title: "Intuitive Coloring",
                description: "Simple click-to-color interface with real-time validation and visual feedback."
              },
              {
                icon: <Brain className="h-8 w-8 text-primary" />,
                title: "Educational Quizzes",
                description: "Test your understanding of chromatic numbers and other graph theory concepts."
              },
              {
                icon: <Award className="h-8 w-8 text-primary" />,
                title: "Achievement System",
                description: "Earn points and track your progress as you solve increasingly challenging problems."
              },
              {
                icon: <BookOpen className="h-8 w-8 text-primary" />,
                title: "Learning Resources",
                description: "Access explanations and theory behind graph coloring algorithms and applications."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
            <p className="text-lg mb-8">
              Jump into our interactive graph coloring playground and challenge yourself with various graph types and difficulties.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/game">Start Playing Now</Link>
            </Button>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Index;
