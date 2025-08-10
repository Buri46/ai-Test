'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Code, 
  PenTool, 
  Search, 
  Palette, 
  GraduationCap, 
  Star, 
  DollarSign, 
  Users,
  ArrowRight,
  Check,
  Zap
} from 'lucide-react'

interface ComboTool {
  name: string
  description: string
  category: string
  price: string
  rating: number
  icon: React.ComponentType<any>
}

interface PerfectCombo {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  color: string
  tools: ComboTool[]
  totalPrice: string
  totalRating: number
  useCase: string
  benefits: string[]
}

const perfectCombos: PerfectCombo[] = [
  {
    id: 'developer-powerhouse',
    name: 'Developer Powerhouse',
    description: 'The ultimate toolkit for modern developers to boost productivity and code quality',
    icon: Code,
    color: 'from-green-400 to-blue-500',
    tools: [
      {
        name: 'Claude',
        description: 'AI assistant for coding and problem-solving',
        category: 'AI Assistant',
        price: '$20/month',
        rating: 8.5,
        icon: Zap
      },
      {
        name: 'GitHub Copilot',
        description: 'AI-powered code completion',
        category: 'Code AI',
        price: '$10/month',
        rating: 8.8,
        icon: Code
      },
      {
        name: 'Wappalyzer',
        description: 'Technology detection and analysis',
        category: 'Browser Extension',
        price: 'Free',
        rating: 8.0,
        icon: Search
      }
    ],
    totalPrice: '$30/month',
    totalRating: 8.4,
    useCase: 'Perfect for software developers, web developers, and programming teams',
    benefits: [
      '50% faster coding with AI assistance',
      'Better code quality and fewer bugs',
      'Competitor analysis and tech insights',
      'Seamless IDE integration'
    ]
  },
  {
    id: 'content-creator-pro',
    name: 'Content Creator Pro',
    description: 'Complete toolkit for content creators to produce high-quality content efficiently',
    icon: PenTool,
    color: 'from-purple-400 to-pink-500',
    tools: [
      {
        name: 'ChatGPT',
        description: 'AI writing assistant and content generation',
        category: 'AI Assistant',
        price: '$20/month',
        rating: 9.0,
        icon: Zap
      },
      {
        name: 'Grammarly',
        description: 'Grammar and writing style improvement',
        category: 'Browser Extension',
        price: '$12/month',
        rating: 8.8,
        icon: PenTool
      },
      {
        name: 'Loom',
        description: 'Video recording and screen sharing',
        category: 'Browser Extension',
        price: '$8/month',
        rating: 8.5,
        icon: Users
      }
    ],
    totalPrice: '$40/month',
    totalRating: 8.8,
    useCase: 'Ideal for content creators, copywriters, bloggers, and social media managers',
    benefits: [
      'Professional-quality content generation',
      'Error-free writing with style improvements',
      'Engaging video content creation',
      'Cross-platform content optimization'
    ]
  },
  {
    id: 'research-master',
    name: 'Research Master',
    description: 'Comprehensive research toolkit for students, academics, and researchers',
    icon: Search,
    color: 'from-blue-400 to-indigo-500',
    tools: [
      {
        name: 'Perplexity',
        description: 'AI-powered search with citations',
        category: 'AI Assistant',
        price: '$20/month',
        rating: 8.2,
        icon: Search
      },
      {
        name: 'Zotero',
        description: 'Research paper management and citation',
        category: 'Browser Extension',
        price: 'Free',
        rating: 8.7,
        icon: GraduationCap
      },
      {
        name: 'Mercury Reader',
        description: 'Distraction-free article reading',
        category: 'Browser Extension',
        price: 'Free',
        rating: 8.0,
        icon: PenTool
      }
    ],
    totalPrice: '$20/month',
    totalRating: 8.3,
    useCase: 'Perfect for students, researchers, academics, and knowledge workers',
    benefits: [
      'Accurate information with verified sources',
      'Efficient citation management',
      'Distraction-free reading experience',
      'Research organization and note-taking'
    ]
  },
  {
    id: 'design-wizard',
    name: 'Design Wizard',
    description: 'Creative toolkit for designers to enhance their design workflow',
    icon: Palette,
    color: 'from-pink-400 to-orange-500',
    tools: [
      {
        name: 'Midjourney',
        description: 'AI image generation and creation',
        category: 'AI Assistant',
        price: '$10/month',
        rating: 9.2,
        icon: Palette
      },
      {
        name: 'Figma Extensions',
        description: 'Design productivity plugins',
        category: 'Browser Extension',
        price: '$15/month',
        rating: 8.9,
        icon: Code
      },
      {
        name: 'ColorZilla',
        description: 'Color picker and palette generator',
        category: 'Browser Extension',
        price: 'Free',
        rating: 8.3,
        icon: Palette
      }
    ],
    totalPrice: '$25/month',
    totalRating: 8.8,
    useCase: 'Essential for UI/UX designers, graphic designers, and creative professionals',
    benefits: [
      'AI-powered image generation',
      'Enhanced design workflow efficiency',
      'Professional color management',
      'Seamless design tool integration'
    ]
  },
  {
    id: 'student-essentials',
    name: 'Student Essentials',
    description: 'Budget-friendly toolkit for students to enhance learning and productivity',
    icon: GraduationCap,
    color: 'from-yellow-400 to-orange-500',
    tools: [
      {
        name: 'Claude',
        description: 'AI study assistant and homework help',
        category: 'AI Assistant',
        price: '$20/month',
        rating: 8.5,
        icon: Zap
      },
      {
        name: 'Forest',
        description: 'Focus timer and productivity tracker',
        category: 'Browser Extension',
        price: '$3/month',
        rating: 8.6,
        icon: GraduationCap
      },
      {
        name: 'Momentum',
        description: 'Productivity dashboard and goal tracking',
        category: 'Browser Extension',
        price: '$3/month',
        rating: 8.4,
        icon: Users
      }
    ],
    totalPrice: '$26/month',
    totalRating: 8.5,
    useCase: 'Perfect for students of all levels, from high school to university',
    benefits: [
      '24/7 AI study assistance',
      'Improved focus and time management',
      'Goal tracking and motivation',
      'Affordable student budget options'
    ]
  }
]

export default function PerfectCombos() {
  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-4 neon-text"
        >
          Perfect Combos
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Pre-built workflow stacks curated by experts for maximum productivity
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {perfectCombos.map((combo, index) => (
          <motion.div
            key={combo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <Card className="glass-morphism h-full hover-glow border-white/10 overflow-hidden">
              <CardHeader className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${combo.color} opacity-10`} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full glass-morphism flex items-center justify-center">
                      <combo.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-semibold">{combo.totalRating}</span>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl font-bold mb-2">
                    {combo.name}
                  </CardTitle>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {combo.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-white/10">
                      {combo.tools.length} Tools
                    </Badge>
                    <span className="text-lg font-bold text-cyan-400">
                      {combo.totalPrice}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative">
                <div className="space-y-4">
                  {/* Tools List */}
                  <div className="space-y-3">
                    {combo.tools.map((tool, toolIndex) => (
                      <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.1) + (toolIndex * 0.05) }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
                      >
                        <div className="w-8 h-8 rounded-full glass-morphism flex items-center justify-center flex-shrink-0">
                          <tool.icon className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-sm truncate">
                              {tool.name}
                            </h4>
                            <span className="text-xs text-cyan-400">
                              {tool.price}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {tool.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Use Case */}
                  <div className="p-3 rounded-lg bg-white/5">
                    <h4 className="font-semibold text-sm mb-1 text-cyan-400">
                      Best For
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {combo.useCase}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-cyan-400">
                      Key Benefits
                    </h4>
                    {combo.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-green-400 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 group"
                  >
                    Get This Combo
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          { label: 'Active Combos', value: '5+', icon: Zap },
          { label: 'Happy Users', value: '50K+', icon: Users },
          { label: 'Avg. Rating', value: '8.6/10', icon: Star },
          { label: 'Money Saved', value: '40%', icon: DollarSign }
        ].map((stat, index) => (
          <Card key={stat.label} className="glass-morphism text-center">
            <CardContent className="p-6">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
              <div className="text-2xl font-bold neon-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  )
}