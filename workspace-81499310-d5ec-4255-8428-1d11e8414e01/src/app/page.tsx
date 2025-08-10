'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Target, ArrowRight } from 'lucide-react'
import SmartQuiz from '@/components/SmartQuiz'
import ComparisonTool from '@/components/ComparisonTool'
import PerfectCombos from '@/components/PerfectCombos'
import InteractiveFeatures from '@/components/InteractiveFeatures'
import Footer from '@/components/Footer'

interface QuizAnswers {
  workType: string
  mainGoal: string
  experienceLevel: string
  budget: string
  platforms: string[]
  privacy: string
  interactionStyle: string
}

export default function Home() {
  const [counter, setCounter] = useState(0)
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>([])
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizResults, setQuizResults] = useState<QuizAnswers | null>(null)

  useEffect(() => {
    // Animate counter
    const target = 200
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0

    const counterInterval = setInterval(() => {
      current += increment
      if (current >= target) {
        setCounter(target)
        clearInterval(counterInterval)
      } else {
        setCounter(Math.floor(current))
      }
    }, 16)

    // Generate particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 10
    }))
    setParticles(newParticles)

    return () => clearInterval(counterInterval)
  }, [])

  const handleQuizComplete = (answers: QuizAnswers) => {
    setQuizResults(answers)
    setShowQuiz(false)
    // Here you would typically process the answers and show recommendations
    console.log('Quiz completed with answers:', answers)
  }

  const handleStartQuiz = () => {
    setShowQuiz(true)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle absolute rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full glass-morphism neon-glow"
          >
            <Sparkles className="w-10 h-10 text-cyan-400" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="neon-text">Find Your Perfect</span>
            <br />
            <span className="text-white">AI Arsenal</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Discover the best AI assistants and browser extensions for your workflow
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-12"
          >
            <Button
              size="lg"
              onClick={handleStartQuiz}
              className="group px-8 py-4 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 neon-glow hover-glow"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Smart Quiz
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Animated Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex items-center justify-center gap-2 text-lg text-muted-foreground"
          >
            <Target className="w-5 h-5 text-cyan-400" />
            <span>Over</span>
            <span className="text-2xl font-bold neon-text counter-animation">
              {counter}+
            </span>
            <span>AI Tools & Extensions compared</span>
          </motion.div>

          {/* Quiz Results Preview */}
          {quizResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-4 glass-morphism rounded-lg max-w-md mx-auto"
            >
              <h3 className="text-lg font-semibold mb-2 text-cyan-400">Quiz Completed!</h3>
              <p className="text-sm text-muted-foreground">
                Based on your answers, we recommend checking out our comparison tool below.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute top-20 left-10 w-32 h-32 rounded-full glass-morphism neon-glow floating"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-20 right-10 w-24 h-24 rounded-full glass-morphism neon-glow floating"
          style={{ animationDelay: '1.5s' }}
        />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2" />
        </motion.div>
      </motion.div>

      {/* Smart Quiz Modal */}
      {showQuiz && (
        <SmartQuiz
          onComplete={handleQuizComplete}
          onClose={() => setShowQuiz(false)}
        />
      )}

      {/* Comparison Tool Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <ComparisonTool />
        </div>
      </section>

      {/* Perfect Combos Section */}
      <section className="relative z-10 py-20 px-4 bg-gradient-to-b from-transparent via-background/50 to-background">
        <div className="max-w-7xl mx-auto">
          <PerfectCombos />
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <InteractiveFeatures />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}