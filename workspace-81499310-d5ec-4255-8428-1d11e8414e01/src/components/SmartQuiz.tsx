'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, ArrowRight, CheckCircle, Brain, Target, Star, DollarSign, Monitor, Shield, MessageSquare } from 'lucide-react'

interface QuizAnswers {
  workType: string
  mainGoal: string
  experienceLevel: string
  budget: string
  platforms: string[]
  privacy: string
  interactionStyle: string
}

const quizQuestions = [
  {
    id: 'workType',
    question: "What's your primary work type?",
    icon: Brain,
    options: [
      { value: 'developer', label: 'Developer' },
      { value: 'designer', label: 'Designer' },
      { value: 'content-creator', label: 'Content Creator' },
      { value: 'student', label: 'Student' },
      { value: 'business', label: 'Business' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'mainGoal',
    question: "What's your main goal?",
    icon: Target,
    options: [
      { value: 'productivity', label: 'Productivity' },
      { value: 'creativity', label: 'Creativity' },
      { value: 'research', label: 'Research' },
      { value: 'coding', label: 'Coding' },
      { value: 'writing', label: 'Writing' }
    ]
  },
  {
    id: 'experienceLevel',
    question: "What's your experience level?",
    icon: Star,
    options: [
      { value: 'beginner', label: 'Beginner' },
      { value: 'intermediate', label: 'Intermediate' },
      { value: 'expert', label: 'Expert' }
    ]
  },
  {
    id: 'budget',
    question: "What's your budget?",
    icon: DollarSign,
    options: [
      { value: 'free', label: 'Free only' },
      { value: 'under-20', label: 'Under $20/month' },
      { value: '20-50', label: '$20-50/month' },
      { value: 'no-limit', label: 'No limit' }
    ]
  },
  {
    id: 'platforms',
    question: "Which platforms do you use?",
    icon: Monitor,
    options: [
      { value: 'windows', label: 'Windows' },
      { value: 'mac', label: 'Mac' },
      { value: 'linux', label: 'Linux' },
      { value: 'mobile', label: 'Mobile' }
    ],
    multiple: true
  },
  {
    id: 'privacy',
    question: "How important is privacy?",
    icon: Shield,
    options: [
      { value: 'very-important', label: 'Very important' },
      { value: 'somewhat', label: 'Somewhat' },
      { value: 'not-important', label: 'Not important' }
    ]
  },
  {
    id: 'interactionStyle',
    question: "Preferred interaction style?",
    icon: MessageSquare,
    options: [
      { value: 'chat-based', label: 'Chat-based' },
      { value: 'command-based', label: 'Command-based' },
      { value: 'visual-interface', label: 'Visual interface' }
    ]
  }
]

interface SmartQuizProps {
  onComplete: (answers: QuizAnswers) => void
  onClose: () => void
}

export default function SmartQuiz({ onComplete, onClose }: SmartQuizProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({
    workType: '',
    mainGoal: '',
    experienceLevel: '',
    budget: '',
    platforms: [],
    privacy: '',
    interactionStyle: ''
  })

  const currentQuestion = quizQuestions[currentStep]
  const progress = ((currentStep + 1) / quizQuestions.length) * 100

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const handleNext = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      onComplete(answers)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const isCurrentAnswerValid = () => {
    const currentAnswer = answers[currentQuestion.id as keyof QuizAnswers]
    if (currentQuestion.multiple) {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0
    }
    return currentAnswer !== ''
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-2xl"
      >
        <Card className="glass-morphism neon-border">
          <CardHeader className="text-center">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="sm" onClick={onClose} className="text-muted-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Close
              </Button>
              <div className="text-sm text-muted-foreground">
                Question {currentStep + 1} of {quizQuestions.length}
              </div>
            </div>
            
            <div className="mb-6">
              <Progress value={progress} className="h-2" />
            </div>

            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full glass-morphism neon-glow flex items-center justify-center">
                  <currentQuestion.icon className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
              
              <CardTitle className="text-2xl font-bold mb-2">
                {currentQuestion.question}
              </CardTitle>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {currentQuestion.multiple ? (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-3 p-4 rounded-lg glass-morphism hover:bg-white/10 transition-colors cursor-pointer"
                        onClick={() => {
                          const currentPlatforms = answers.platforms as string[]
                          const newPlatforms = currentPlatforms.includes(option.value)
                            ? currentPlatforms.filter(p => p !== option.value)
                            : [...currentPlatforms, option.value]
                          handleAnswer('platforms', newPlatforms)
                        }}
                      >
                        <Checkbox
                          id={option.value}
                          checked={(answers.platforms as string[]).includes(option.value)}
                          onChange={() => {}}
                        />
                        <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <RadioGroup
                    value={answers[currentQuestion.id as keyof QuizAnswers] as string}
                    onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                    className="space-y-3"
                  >
                    {currentQuestion.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-3">
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                          className="border-cyan-400 text-cyan-400"
                        />
                        <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!isCurrentAnswerValid()}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500"
              >
                {currentStep === quizQuestions.length - 1 ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Get Results
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}