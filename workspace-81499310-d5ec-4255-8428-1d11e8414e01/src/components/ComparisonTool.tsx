'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search, Filter, Star, DollarSign, Shield, Users, Zap, Eye, BookMarked, TrendingUp } from 'lucide-react'

interface Tool {
  id: string
  name: string
  category: 'ai-assistant' | 'code-ai' | 'browser-extension'
  type: string
  description: string
  performanceScore: number
  featureCompleteness: number
  easeOfUse: number
  priceValue: number
  privacyScore: number
  communityRating: number
  price: string
  platforms: string[]
  website: string
  image: string
  pros: string[]
  cons: string[]
  features: string[]
  lastUpdated: string
  userCount: string
  company: string
}

const mockTools: Tool[] = [
  // AI Assistants (15 total)
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'ai-assistant',
    type: 'General AI Assistant',
    description: 'Advanced conversational AI for various tasks including writing, coding, and problem-solving.',
    performanceScore: 9,
    featureCompleteness: 8,
    easeOfUse: 10,
    priceValue: 7,
    privacyScore: 6,
    communityRating: 9,
    price: '$20/month',
    platforms: ['Web', 'Mobile', 'Desktop'],
    website: 'https://chat.openai.com',
    image: '/api/placeholder/300/200',
    pros: ['Excellent conversational abilities', 'Wide range of knowledge', 'Easy to use interface', 'Multimodal capabilities'],
    cons: ['Privacy concerns', 'Can be expensive', 'Limited offline capabilities', 'Occasional inaccuracies'],
    features: ['Chat interface', 'Code generation', 'Image analysis', 'File upload', 'Voice chat', 'Plugin support'],
    lastUpdated: '2024-01-15',
    userCount: '100M+',
    company: 'OpenAI'
  },
  {
    id: 'claude',
    name: 'Claude',
    category: 'ai-assistant',
    type: 'General AI Assistant',
    description: 'Anthropic\'s AI assistant focused on helpful, harmless, and honest interactions.',
    performanceScore: 9,
    featureCompleteness: 8,
    easeOfUse: 9,
    priceValue: 8,
    privacyScore: 8,
    communityRating: 8,
    price: '$20/month',
    platforms: ['Web', 'API'],
    website: 'https://claude.ai',
    image: '/api/placeholder/300/200',
    pros: ['Strong reasoning capabilities', 'Better privacy', 'Long context window', 'Constitutional AI'],
    cons: ['Less creative than ChatGPT', 'Limited platform support', 'Smaller community'],
    features: ['Chat interface', 'Document analysis', 'Code generation', 'Long conversations', 'Image analysis'],
    lastUpdated: '2024-01-12',
    userCount: '10M+',
    company: 'Anthropic'
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    category: 'ai-assistant',
    type: 'Multimodal AI Assistant',
    description: 'Google\'s advanced AI assistant with multimodal capabilities and deep integration with Google services.',
    performanceScore: 8,
    featureCompleteness: 9,
    easeOfUse: 8,
    priceValue: 9,
    privacyScore: 5,
    communityRating: 7,
    price: 'Free/$20/month',
    platforms: ['Web', 'Mobile', 'API'],
    website: 'https://gemini.google.com',
    image: '/api/placeholder/300/200',
    pros: ['Free tier available', 'Google ecosystem integration', 'Multimodal capabilities', 'Fast responses'],
    cons: ['Privacy concerns', 'Inconsistent performance', 'Limited advanced features in free tier'],
    features: ['Text generation', 'Image analysis', 'Code generation', 'Google Search integration', 'Multilingual support'],
    lastUpdated: '2024-01-10',
    userCount: '50M+',
    company: 'Google'
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    category: 'ai-assistant',
    type: 'Search AI',
    description: 'AI-powered search engine that provides accurate answers with citations.',
    performanceScore: 8,
    featureCompleteness: 7,
    easeOfUse: 9,
    priceValue: 9,
    privacyScore: 7,
    communityRating: 8,
    price: 'Free/$20/month',
    platforms: ['Web', 'Mobile'],
    website: 'https://perplexity.ai',
    image: '/api/placeholder/300/200',
    pros: ['Accurate information', 'Provides sources', 'Free tier available', 'Fast responses'],
    cons: ['Less conversational', 'Limited creative tasks', 'Can be slow at times'],
    features: ['Search with citations', 'Source verification', 'Follow-up questions', 'Topic exploration', 'Academic search'],
    lastUpdated: '2024-01-08',
    userCount: '5M+',
    company: 'Perplexity AI'
  },
  {
    id: 'character-ai',
    name: 'Character.AI',
    category: 'ai-assistant',
    type: 'Character Chat AI',
    description: 'AI platform for creating and interacting with character-based chatbots.',
    performanceScore: 7,
    featureCompleteness: 6,
    easeOfUse: 9,
    priceValue: 8,
    privacyScore: 6,
    communityRating: 7,
    price: 'Free/$10/month',
    platforms: ['Web', 'Mobile'],
    website: 'https://character.ai',
    image: '/api/placeholder/300/200',
    pros: ['Unique character experience', 'Creative interactions', 'Large character library', 'Free tier'],
    cons: ['Limited practical applications', 'Can be repetitive', 'Privacy concerns'],
    features: ['Character creation', 'Chat interactions', 'Voice chat', 'Character sharing', 'Group chats'],
    lastUpdated: '2024-01-05',
    userCount: '20M+',
    company: 'Character.AI'
  },
  {
    id: 'copilot',
    name: 'Microsoft Copilot',
    category: 'ai-assistant',
    type: 'Productivity AI',
    description: 'Microsoft\'s AI assistant integrated across Office 365 and Windows.',
    performanceScore: 8,
    featureCompleteness: 8,
    easeOfUse: 8,
    priceValue: 7,
    privacyScore: 6,
    communityRating: 7,
    price: 'Free/$20/month',
    platforms: ['Web', 'Windows', 'Mobile'],
    website: 'https://copilot.microsoft.com',
    image: '/api/placeholder/300/200',
    pros: ['Microsoft ecosystem integration', 'Office integration', 'Free tier available', 'Enterprise features'],
    cons: ['Privacy concerns', 'Limited to Microsoft ecosystem', 'Can be slow'],
    features: ['Document generation', 'Email assistance', 'Spreadsheet analysis', 'Presentation creation', 'Web search'],
    lastUpdated: '2024-01-03',
    userCount: '30M+',
    company: 'Microsoft'
  },
  {
    id: 'jasper',
    name: 'Jasper',
    category: 'ai-assistant',
    type: 'Content Creation AI',
    description: 'AI platform specifically designed for content creation and marketing.',
    performanceScore: 8,
    featureCompleteness: 7,
    easeOfUse: 8,
    priceValue: 5,
    privacyScore: 7,
    communityRating: 8,
    price: '$49/month',
    platforms: ['Web', 'API', 'Browser Extension'],
    website: 'https://jasper.ai',
    image: '/api/placeholder/300/200',
    pros: ['Marketing focused', 'Brand voice customization', 'Templates available', 'SEO optimization'],
    cons: ['Expensive', 'Limited to content creation', 'Learning curve'],
    features: ['Blog post generation', 'Marketing copy', 'Social media content', 'Email writing', 'SEO tools'],
    lastUpdated: '2024-01-01',
    userCount: '1M+',
    company: 'Jasper AI'
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'ai-assistant',
    type: 'Image Generation AI',
    description: 'AI-powered image generation tool known for high-quality artistic images.',
    performanceScore: 9,
    featureCompleteness: 6,
    easeOfUse: 7,
    priceValue: 6,
    privacyScore: 8,
    communityRating: 9,
    price: '$10/month',
    platforms: ['Web', 'Discord'],
    website: 'https://midjourney.com',
    image: '/api/placeholder/300/200',
    pros: ['High-quality images', 'Artistic styles', 'Active community', 'Regular updates'],
    cons: ['Discord-based interface', 'Limited control', 'Can be expensive', 'Steep learning curve'],
    features: ['Image generation', 'Style customization', 'Upscaling', 'Variation generation', 'Image editing'],
    lastUpdated: '2024-01-14',
    userCount: '15M+',
    company: 'Midjourney'
  },
  {
    id: 'runway',
    name: 'Runway',
    category: 'ai-assistant',
    type: 'Video Generation AI',
    description: 'AI platform for video generation, editing, and special effects.',
    performanceScore: 8,
    featureCompleteness: 8,
    easeOfUse: 7,
    priceValue: 5,
    privacyScore: 7,
    communityRating: 8,
    price: '$15/month',
    platforms: ['Web', 'Desktop'],
    website: 'https://runwayml.com',
    image: '/api/placeholder/300/200',
    pros: ['Video generation', 'Special effects', 'Green screen removal', 'Motion tracking'],
    cons: ['Expensive', 'Requires powerful hardware', 'Limited free tier', 'Steep learning curve'],
    features: ['Text-to-video', 'Image-to-video', 'Video editing', 'Motion tracking', 'Green screen'],
    lastUpdated: '2024-01-11',
    userCount: '2M+',
    company: 'Runway ML'
  },
  {
    id: 'suno',
    name: 'Suno',
    category: 'ai-assistant',
    type: 'Music Generation AI',
    description: 'AI platform for generating music and audio from text descriptions.',
    performanceScore: 7,
    featureCompleteness: 5,
    easeOfUse: 9,
    priceValue: 8,
    privacyScore: 8,
    communityRating: 8,
    price: 'Free/$10/month',
    platforms: ['Web'],
    website: 'https://suno.ai',
    image: '/api/placeholder/300/200',
    pros: ['Easy to use', 'Free tier available', 'Various music styles', 'Fast generation'],
    cons: ['Limited music length', 'Basic features', 'Quality varies', 'Limited instruments'],
    features: ['Music generation', 'Style selection', 'Lyric generation', 'Audio editing', 'Export options'],
    lastUpdated: '2024-01-09',
    userCount: '3M+',
    company: 'Suno AI'
  },
  {
    id: 'pi',
    name: 'Pi',
    category: 'ai-assistant',
    type: 'Personal AI Assistant',
    description: 'Personal AI assistant focused on emotional intelligence and supportive conversations.',
    performanceScore: 7,
    featureCompleteness: 6,
    easeOfUse: 9,
    priceValue: 10,
    privacyScore: 9,
    communityRating: 7,
    price: 'Free',
    platforms: ['Web', 'Mobile'],
    website: 'https://pi.ai',
    image: '/api/placeholder/300/200',
    pros: ['Free to use', 'Emotionally intelligent', 'Privacy-focused', 'Supportive conversations'],
    cons: ['Limited capabilities', 'Not for technical tasks', 'Small knowledge base', 'Slow responses'],
    features: ['Emotional support', 'Conversation history', 'Voice chat', 'Personalization', 'Mood tracking'],
    lastUpdated: '2024-01-07',
    userCount: '1M+',
    company: 'Inflection AI'
  },
  {
    id: 'grok',
    name: 'Grok',
    category: 'ai-assistant',
    type: 'Conversational AI',
    description: 'xAI\'s conversational AI with access to real-time information and witty responses.',
    performanceScore: 7,
    featureCompleteness: 7,
    easeOfUse: 8,
    priceValue: 6,
    privacyScore: 6,
    communityRating: 6,
    price: '$16/month',
    platforms: ['Web', 'X Platform'],
    website: 'https://grok.x.ai',
    image: '/api/placeholder/300/200',
    pros: ['Real-time information', 'Witty personality', 'X platform integration', 'Regular updates'],
    cons: ['Limited availability', 'Inconsistent performance', 'Privacy concerns', 'Expensive'],
    features: ['Real-time search', 'Conversational chat', 'Image analysis', 'X integration', 'News updates'],
    lastUpdated: '2024-01-06',
    userCount: '500K+',
    company: 'xAI'
  },
  {
    id: 'huggingchat',
    name: 'HuggingChat',
    category: 'ai-assistant',
    type: 'Open Source AI',
    description: 'Open-source AI chat interface with access to various open models.',
    performanceScore: 6,
    featureCompleteness: 7,
    easeOfUse: 8,
    priceValue: 10,
    privacyScore: 9,
    communityRating: 7,
    price: 'Free',
    platforms: ['Web', 'API'],
    website: 'https://huggingface.co/chat',
    image: '/api/placeholder/300/200',
    pros: ['Free and open source', 'Privacy-focused', 'Multiple models', 'Community driven'],
    cons: ['Variable quality', 'Limited features', 'Slower responses', 'Complex setup'],
    features: ['Multiple model access', 'Open source', 'API access', 'Model switching', 'Community models'],
    lastUpdated: '2024-01-04',
    userCount: '1M+',
    company: 'Hugging Face'
  },
  {
    id: 'you',
    name: 'You.com',
    category: 'ai-assistant',
    type: 'Search AI',
    description: 'AI-powered search engine with chat capabilities and privacy focus.',
    performanceScore: 7,
    featureCompleteness: 7,
    easeOfUse: 8,
    priceValue: 9,
    privacyScore: 8,
    communityRating: 7,
    price: 'Free/$15/month',
    platforms: ['Web', 'Mobile', 'Browser Extension'],
    website: 'https://you.com',
    image: '/api/placeholder/300/200',
    pros: ['Privacy-focused', 'Free tier available', 'Fast search', 'Clean interface'],
    cons: ['Limited advanced features', 'Smaller community', 'Inconsistent results'],
    features: ['AI search', 'Chat interface', 'Privacy mode', 'Web search', 'News aggregation'],
    lastUpdated: '2024-01-02',
    userCount: '2M+',
    company: 'You.com'
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    category: 'ai-assistant',
    type: 'Code AI Assistant',
    description: 'AI assistant specialized in coding and technical problem-solving.',
    performanceScore: 8,
    featureCompleteness: 7,
    easeOfUse: 7,
    priceValue: 9,
    privacyScore: 7,
    communityRating: 7,
    price: 'Free',
    platforms: ['Web', 'API'],
    website: 'https://deepseek.ai',
    image: '/api/placeholder/300/200',
    pros: ['Free to use', 'Strong coding capabilities', 'Fast responses', 'Multiple languages'],
    cons: ['Limited to coding', 'Basic interface', 'Limited documentation', 'Small community'],
    features: ['Code generation', 'Debugging help', 'Code explanation', 'Language support', 'API access'],
    lastUpdated: '2023-12-30',
    userCount: '1M+',
    company: 'DeepSeek'
  },
  {
    id: 'anthropic-claude-instant',
    name: 'Claude Instant',
    category: 'ai-assistant',
    type: 'Fast AI Assistant',
    description: 'Faster, more efficient version of Claude with quick response times.',
    performanceScore: 7,
    featureCompleteness: 6,
    easeOfUse: 9,
    priceValue: 9,
    privacyScore: 8,
    communityRating: 7,
    price: 'Free/$1/month',
    platforms: ['Web', 'API'],
    website: 'https://claude.ai',
    image: '/api/placeholder/300/200',
    pros: ['Very fast responses', 'Affordable', 'Privacy-focused', 'Easy to use'],
    cons: ['Limited capabilities', 'Shorter context', 'Less accurate', 'Basic features'],
    features: ['Quick chat', 'Basic code generation', 'Simple analysis', 'Mobile optimized', 'API access'],
    lastUpdated: '2023-12-28',
    userCount: '5M+',
    company: 'Anthropic'
  },
  // Code AI Tools
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'code-ai',
    type: 'Code Assistant',
    description: 'AI-powered code completion and generation tool that helps developers write better code faster.',
    performanceScore: 8,
    featureCompleteness: 9,
    easeOfUse: 8,
    priceValue: 6,
    privacyScore: 7,
    communityRating: 9,
    price: '$10/month',
    platforms: ['VS Code', 'JetBrains', 'Visual Studio'],
    website: 'https://github.com/features/copilot',
    image: '/api/placeholder/300/200',
    pros: ['Excellent code completion', 'Supports multiple languages', 'Integrates well with IDEs', 'Context-aware'],
    cons: ['Subscription required', 'Privacy concerns', 'Can suggest incorrect code', 'Resource intensive'],
    features: ['Code completion', 'Function generation', 'Documentation', 'Multi-language support', 'Chat integration'],
    lastUpdated: '2024-01-13',
    userCount: '1M+',
    company: 'GitHub/Microsoft'
  },
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'code-ai',
    type: 'AI Code Editor',
    description: 'AI-powered code editor designed for pair programming with AI.',
    performanceScore: 8,
    featureCompleteness: 8,
    easeOfUse: 8,
    priceValue: 7,
    privacyScore: 7,
    communityRating: 8,
    price: '$20/month',
    platforms: ['Windows', 'Mac', 'Linux'],
    website: 'https://cursor.sh',
    image: '/api/placeholder/300/200',
    pros: ['AI-first design', 'Excellent integration', 'Fast performance', 'Modern interface'],
    cons: ['Newer product', 'Limited ecosystem', 'Subscription required', 'Learning curve'],
    features: ['AI chat', 'Code generation', 'Refactoring', 'Debugging assistance', 'Multi-file editing'],
    lastUpdated: '2024-01-11',
    userCount: '100K+',
    company: 'Cursor'
  },
  {
    id: 'codeium',
    name: 'Codeium',
    category: 'code-ai',
    type: 'Code Assistant',
    description: 'Free AI-powered code completion and chat tool for developers.',
    performanceScore: 7,
    featureCompleteness: 8,
    easeOfUse: 8,
    priceValue: 10,
    privacyScore: 8,
    communityRating: 7,
    price: 'Free',
    platforms: ['VS Code', 'JetBrains', 'Vim', 'Emacs'],
    website: 'https://codeium.com',
    image: '/api/placeholder/300/200',
    pros: ['Completely free', 'Wide IDE support', 'Good performance', 'Privacy-focused'],
    cons: ['Less accurate than Copilot', 'Limited features', 'Smaller community', 'Basic chat'],
    features: ['Code completion', 'Chat interface', 'Multi-language', 'Explain code', 'Generate tests'],
    lastUpdated: '2024-01-09',
    userCount: '500K+',
    company: 'Codeium'
  },
  {
    id: 'tabnine',
    name: 'Tabnine',
    category: 'code-ai',
    type: 'Code Assistant',
    description: 'AI code completion tool with focus on privacy and enterprise features.',
    performanceScore: 7,
    featureCompleteness: 7,
    easeOfUse: 8,
    priceValue: 6,
    privacyScore: 9,
    communityRating: 6,
    price: '$12/month',
    platforms: ['VS Code', 'JetBrains', 'Eclipse', 'Visual Studio'],
    website: 'https://tabnine.com',
    image: '/api/placeholder/300/200',
    pros: ['Strong privacy', 'Enterprise features', 'Local deployment', 'Multiple IDEs'],
    cons: ['Expensive', 'Less accurate', 'Slow updates', 'Complex setup'],
    features: ['Code completion', 'Team sharing', 'Local models', 'Enterprise management', 'Privacy mode'],
    lastUpdated: '2024-01-07',
    userCount: '1M+',
    company: 'Tabnine'
  },
  {
    id: 'amazon-codewhisperer',
    name: 'Amazon CodeWhisperer',
    category: 'code-ai',
    type: 'Code Assistant',
    description: 'AWS AI coding companion that provides real-time code recommendations.',
    performanceScore: 7,
    featureCompleteness: 7,
    easeOfUse: 8,
    priceValue: 8,
    privacyScore: 8,
    communityRating: 7,
    price: 'Free/$10/month',
    platforms: ['VS Code', 'JetBrains', 'AWS Cloud9'],
    website: 'https://aws.amazon.com/codewhisperer',
    image: '/api/placeholder/300/200',
    pros: ['Free tier available', 'AWS integration', 'Security focused', 'Good documentation'],
    cons: ['Limited to AWS ecosystem', 'Less accurate', 'Fewer features', 'Enterprise focused'],
    features: ['Code completion', 'Security scanning', 'AWS service integration', 'Reference tracking', 'Code optimization'],
    lastUpdated: '2024-01-05',
    userCount: '500K+',
    company: 'Amazon'
  },
  // Browser Extensions (25 total)
  {
    id: 'grammarly',
    name: 'Grammarly',
    category: 'browser-extension',
    type: 'Writing Assistant',
    description: 'AI-powered writing assistant that helps improve grammar, spelling, and writing style.',
    performanceScore: 9,
    featureCompleteness: 8,
    easeOfUse: 10,
    priceValue: 6,
    privacyScore: 7,
    communityRating: 9,
    price: '$12/month',
    platforms: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    website: 'https://grammarly.com',
    image: '/api/placeholder/300/200',
    pros: ['Excellent grammar checking', 'Style improvements', 'Works everywhere', 'Real-time feedback'],
    cons: ['Premium features expensive', 'Can be intrusive', 'Privacy concerns', 'Limited offline'],
    features: ['Grammar checking', 'Style suggestions', 'Plagiarism detection', 'Tone detection', 'Vocabulary enhancement'],
    lastUpdated: '2024-01-14',
    userCount: '30M+',
    company: 'Grammarly'
  },
  {
    id: 'wappalyzer',
    name: 'Wappalyzer',
    category: 'browser-extension',
    type: 'Technology Detection',
    description: 'Identifies technologies used on websites, including frameworks, analytics tools, and more.',
    performanceScore: 9,
    featureCompleteness: 7,
    easeOfUse: 10,
    priceValue: 10,
    privacyScore: 8,
    communityRating: 8,
    price: 'Free',
    platforms: ['Chrome', 'Firefox', 'Edge', 'Safari', 'Opera'],
    website: 'https://wappalyzer.com',
    image: '/api/placeholder/300/200',
    pros: ['Completely free', 'Easy to use', 'Comprehensive detection', 'Regular updates'],
    cons: ['Limited to web technologies', 'No advanced features', 'Can be inaccurate', 'Basic interface'],
    features: ['Technology detection', 'Lead generation', 'Competitor analysis', 'Technology trends', 'API access'],
    lastUpdated: '2024-01-12',
    userCount: '5M+',
    company: 'Wappalyzer'
  },
  {
    id: 'lastpass',
    name: 'LastPass',
    category: 'browser-extension',
    type: 'Password Manager',
    description: 'Secure password manager that generates, stores, and autofills passwords.',
    performanceScore: 8,
    featureCompleteness: 9,
    easeOfUse: 9,
    priceValue: 6,
    privacyScore: 7,
    communityRating: 8,
    price: 'Free/$3/month',
    platforms: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'],
    website: 'https://lastpass.com',
    image: '/api/placeholder/300/200',
    pros: ['Cross-platform sync', 'Password generation', 'Secure sharing', 'Emergency access'],
    cons: ['Security incidents', 'Premium required for features', 'Can be slow', 'Complex setup'],
    features: ['Password storage', 'Auto-fill', 'Password generator', 'Secure notes', 'Sharing'],
    lastUpdated: '2024-01-10',
    userCount: '25M+',
    company: 'LastPass'
  },
  {
    id: 'evernote-web-clipper',
    name: 'Evernote Web Clipper',
    category: 'browser-extension',
    type: 'Note Taking',
    description: 'Save web pages, articles, and screenshots directly to your Evernote account.',
    performanceScore: 8,
    featureCompleteness: 7,
    easeOfUse: 9,
    priceValue: 6,
    privacyScore: 7,
    communityRating: 8,
    price: 'Free/$8/month',
    platforms: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    website: 'https://evernote.com/web-clipper',
    image: '/api/placeholder/300/200',
    pros: ['Easy clipping', 'Organization features', 'Search functionality', 'Cross-device sync'],
    cons: ['Premium required', 'Limited free tier', 'Can be slow', 'Interface changes'],
    features: ['Article clipping', 'Screenshot capture', 'Bookmarking', 'Annotation', 'Organization'],
    lastUpdated: '2024-01-08',
    userCount: '10M+',
    company: 'Evernote'
  },
  {
    id: 'honey',
    name: 'Honey',
    category: 'browser-extension',
    type: 'Shopping Assistant',
    description: 'Automatically finds and applies coupon codes when you shop online.',
    performanceScore: 8,
    featureCompleteness: 6,
    easeOfUse: 10,
    priceValue: 10,
    privacyScore: 6,
    communityRating: 8,
    price: 'Free',
    platforms: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'],
    website: 'https://joinhoney.com',
    image: '/api/placeholder/300/200',
    pros: ['Completely free', 'Automatic coupons', 'Cash back rewards', 'Price tracking'],
    cons: ['Privacy concerns', 'Not all stores supported', 'Can miss coupons', 'PayPal integration'],
    features: ['Coupon finding', 'Price tracking', 'Cash back', 'Rewards program', 'Shopping lists'],
    lastUpdated: '2024-01-06',
    userCount: '17M+',
    company: 'PayPal'
  },
  {
    id: 'adblock-plus',
    name: 'Adblock Plus',
    category: 'browser-extension',
    type: 'Ad Blocker',
    description: 'Block ads, pop-ups, and trackers for a faster, cleaner browsing experience.',
    performanceScore: 9,
    featureCompleteness: 8,
    easeOfUse: 10,
    priceValue: 10,
    privacyScore: 8,
    communityRating: 8,
    price: 'Free',
    platforms: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'],
    website: 'https://adblockplus.org',
    image: '/api/placeholder/300/200',
    pros: ['Completely free', 'Effective ad blocking', 'Customizable filters', 'Malware protection'],
    cons: ['Can break some websites', 'Acceptable ads feature', 'Limited support', 'Resource usage'],
    features: ['Ad blocking', 'Tracking protection', 'Malware blocking', 'Custom filters', 'Whitelisting'],
    lastUpdated: '2024-01-04',
    userCount: '100M+',
    company: 'Eyeo'
  },
  {
    id: 'dark-reader',
    name: 'Dark Reader',
    category: 'browser-extension',
    type: 'Appearance',
    description: 'Enable dark mode for any website to reduce eye strain and save battery life.',
    performanceScore: 9,
    featureCompleteness: 7,
    easeOfUse: 10,
    priceValue: 10,
    privacyScore: 10,
    communityRating: 9,
    price: 'Free',
    platforms: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'],
    website: 'https://darkreader.org',
    image: '/api/placeholder/300/200',
    pros: ['Completely free', 'Open source', 'Highly customizable', 'Improves readability'],
    cons: ['Can break some websites', 'Manual adjustments needed', 'Limited themes', 'Performance impact'],
    features: ['Dark mode', 'Brightness control', 'Contrast adjustment', 'Custom themes', 'Site settings'],
    lastUpdated: '2024-01-02',
    userCount: '10M+',
    company: 'Dark Reader Team'
  },
  {
    id: 'loomo',
    name: 'Loom',
    category: 'browser-extension',
    type: 'Screen Recording',
    description: 'Record quick videos of your screen and camera to share with anyone.',
    performanceScore: 8,
    featureCompleteness: 8,
    easeOfUse: 9,
    priceValue: 7,
    privacyScore: 7,
    communityRating: 8,
    price: 'Free/$8/month',
    platforms: ['Chrome', 'Firefox', 'Edge'],
    website: 'https://loom.com',
    image: '/api/placeholder/300/200',
    pros: ['Easy recording', 'Cloud storage', 'Sharing features', 'Transcription'],
    cons: ['Premium required', 'Limited free storage', 'Can be slow', 'Privacy concerns'],
    features: ['Screen recording', 'Camera recording', 'Transcription', 'Sharing', 'Analytics'],
    lastUpdated: '2023-12-31',
    userCount: '5M+',
    company: 'Loom'
  },
  {
    id: 'momentum',
    name: 'Momentum',
    category: 'browser-extension',
    type: 'Productivity',
    description: 'Replace your new tab page with a personal dashboard featuring to-do lists, weather, and inspiration.',
    performanceScore: 8,
    featureCompleteness: 7,
    easeOfUse: 10,
    priceValue: 8,
    privacyScore: 8,
    communityRating: 8,
    price: 'Free/$4/month',
    platforms: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    website: 'https://momentumdash.com',
    image: '/api/placeholder/300/200',
    pros: ['Beautiful interface', 'Motivational quotes', 'Weather integration', 'Todo list'],
    cons: ['Limited features in free', 'Can be distracting', 'Privacy concerns', 'Sync issues'],
    features: ['Daily quotes', 'Weather widget', 'Todo list', 'Focus timer', 'Custom backgrounds'],
    lastUpdated: '2023-12-29',
    userCount: '10M+',
    company: 'Momentum'
  },
  {
    id: 'forest',
    name: 'Forest',
    category: 'browser-extension',
    type: 'Productivity',
    description: 'Stay focused and plant real trees when you put down your phone.',
    performanceScore: 8,
    featureCompleteness: 6,
    easeOfUse: 9,
    priceValue: 7,
    privacyScore: 8,
    communityRating: 8,
    price: '$2/month',
    platforms: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    website: 'https://www.forestapp.cc',
    image: '/api/placeholder/300/200',
    pros: ['Gamified focus', 'Environmental impact', 'Cross-platform', 'Statistics'],
    cons: ['Premium required', 'Simple concept', 'Limited features', 'Can be cheated'],
    features: ['Focus timer', 'Tree planting', 'Statistics', 'Rewards', 'Custom sounds'],
    lastUpdated: '2023-12-27',
    userCount: '5M+',
    company: 'Forest'
  },
  {
    id: 'rescuetime',
    name: 'RescueTime',
    category: 'browser-extension',
    type: 'Productivity',
    description: 'Automatic time tracking and productivity improvement tool.',
    performanceScore: 8,
    featureCompleteness: 8,
    easeOfUse: 8,
    priceValue: 6,
    privacyScore: 7,
    communityRating: 7,
    price: 'Free/$12/month',
    platforms: ['Chrome', 'Firefox', 'Edge'],
    website: 'https://www.rescuetime.com',
    image: '/api/placeholder/300/200',
    pros: ['Automatic tracking', 'Detailed reports', 'Productivity scoring', 'Goal setting'],
    cons: ['Premium expensive', 'Can be invasive', 'Battery drain', 'Complex setup'],
    features: ['Time tracking', 'Productivity scoring', 'Goal setting', 'Reports', 'Offline time'],
    lastUpdated: '2023-12-25',
    userCount: '2M+',
    company: 'RescueTime'
  },
  {
    id: 'todoist',
    name: 'Todoist',
    category: 'browser-extension',
    type: 'Task Management',
    description: 'Organize your work and life with this simple yet powerful to-do list app.',
    performanceScore: 9,
    featureCompleteness: 8,
    easeOfUse: 9,
    priceValue: 6,
    privacyScore: 8,
    communityRating: 8,
    price: 'Free/$5/month',
    platforms: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    website: 'https://todoist.com',
    image: '/api/placeholder/300/200',
    pros: ['Cross-platform sync', 'Natural language input', 'Collaboration features', 'Templates'],
    cons: ['Premium required for features', 'Limited free tier', 'Can be slow', 'Interface changes'],
    features: ['Task management', 'Projects', 'Labels', 'Filters', 'Collaboration'],
    lastUpdated: '2023-12-23',
    userCount: '25M+',
    company: 'Todoist'
  },
  {
    id: 'notion-web-clipper',
    name: 'Notion Web Clipper',
    category: 'browser-extension',
    type: 'Note Taking',
    description: 'Save anything from the web to your Notion workspace.',
    performanceScore: 8,
    featureCompleteness: 7,
    easeOfUse: 9,
    priceValue: 7,
    privacyScore: 8,
    communityRating: 8,
    price: 'Free/$8/month',
    platforms: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    website: 'https://www.notion.so/web-clipper',
    image: '/api/placeholder/300/200',
    pros: ['Seamless integration', 'Organization features', 'Rich text clipping', 'Collaboration'],
    cons: ['Requires Notion account', 'Premium required', 'Limited features', 'Can be slow'],
    features: ['Web clipping', 'Article saving', 'Screenshot capture', 'Organization', 'Full-page save'],
    lastUpdated: '2023-12-21',
    userCount: '5M+',
    company: 'Notion'
  },
  {
    id: 'pocket',
    name: 'Pocket',
    category: 'browser-extension',
    type: 'Bookmark Manager',
    description: 'Save articles, videos, and stories to view later.',
    performanceScore: 9,
    featureCompleteness: 7,
    easeOfUse: 10,
    priceValue: 8,
    privacyScore: 7,
    communityRating: 8,
    price: 'Free/$5/month',
    platforms: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'],
    website: 'https://getpocket.com',
    image: '/api/placeholder/300/200',
    pros: ['Easy to use', 'Cross-platform sync', 'Offline access', 'Recommendations'],
    cons: ['Premium required for features', 'Limited organization', 'Can be slow', 'Basic interface'],
    features: ['Article saving', 'Offline reading', 'Tags', 'Search', 'Recommendations'],
    lastUpdated: '2023-12-19',
    userCount: '30M+',
    company: 'Mozilla'
  },
  {
    id: 'colorzilla',
    name: 'ColorZilla',
    category: 'browser-extension',
    type: 'Design Tool',
    description: 'Advanced eyedropper, color picker, gradient generator and more.',
    performanceScore: 8,
    featureCompleteness: 8,
    easeOfUse: 8,
    priceValue: 10,
    privacyScore: 9,
    communityRating: 8,
    price: 'Free',
    platforms: ['Chrome', 'Firefox', 'Edge'],
    website: 'https://www.colorzilla.com',
    image: '/api/placeholder/300/200',
    pros: ['Completely free', 'Advanced features', 'Color history', 'Gradient generator'],
    cons: ['Outdated interface', 'Limited updates', 'Firefox legacy', 'Basic support'],
    features: ['Eyedropper', 'Color picker', 'Gradient generator', 'Color analyzer', 'Palette creator'],
    lastUpdated: '2023-12-17',
    userCount: '2M+',
    company: 'ColorZilla'
  },
  {
    id: 'builtwith',
    name: 'BuiltWith',
    category: 'browser-extension',
    type: 'Technology Detection',
    description: 'Find out what websites are built with.',
    performanceScore: 8,
    featureCompleteness: 7,
    easeOfUse: 9,
    priceValue: 8,
    privacyScore: 7,
    communityRating: 7,
    price: 'Free/$15/month',
    platforms: ['Chrome', 'Firefox'],
    website: 'https://builtwith.com',
    image: '/api/placeholder/300/200',
    pros: ['Technology detection', 'Lead generation', 'Competitor analysis', 'Comprehensive data'],
    cons: ['Premium expensive', 'Limited free features', 'Can be inaccurate', 'Outdated data'],
    features: ['Technology profiling', 'Lead generation', 'Trends analysis', 'Contact finder', 'API access'],
    lastUpdated: '2023-12-15',
    userCount: '1M+',
    company: 'BuiltWith'
  },
  {
    id: 'session buddy',
    name: 'Session Buddy',
    category: 'browser-extension',
    type: 'Productivity',
    description: 'Manage your browser tabs and bookmarks by saving open tabs as sessions.',
    performanceScore: 8,
    featureCompleteness: 6,
    easeOfUse: 9,
    priceValue: 10,
    privacyScore: 9,
    communityRating: 7,
    price: 'Free',
    platforms: ['Chrome', 'Firefox', 'Edge'],
    website: 'https://sessionbuddy.com',
    image: '/api/placeholder/300/200',
    pros: ['Completely free', 'Session management', 'Tab organization', 'Backup and restore'],
    cons: ['Limited features', 'Basic interface', 'No cloud sync', 'Manual management'],
    features: ['Session saving', 'Tab management', 'Backup/restore', 'Search', 'Organization'],
    lastUpdated: '2023-12-13',
    userCount: '500K+',
    company: 'Session Buddy'
  },
  {
    id: 'print-friendly',
    name: 'Print Friendly & PDF',
    category: 'browser-extension',
    type: 'Utility',
    description: 'Remove ads, navigation, and junk before printing or saving as PDF.',
    performanceScore: 8,
    featureCompleteness: 6,
    easeOfUse: 9,
    priceValue: 10,
    privacyScore: 9,
    communityRating: 7,
    price: 'Free',
    platforms: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    website: 'https://www.printfriendly.com',
    image: '/api/placeholder/300/200',
    pros: ['Completely free', 'Easy to use', 'PDF generation', 'Content cleaning'],
    cons: ['Limited features', 'Basic interface', 'Can break formatting', 'No advanced options'],
    features: ['Ad removal', 'PDF generation', 'Content editing', 'Print preview', 'Image removal'],
    lastUpdated: '2023-12-11',
    userCount: '1M+',
    company: 'Print Friendly'
  },
  {
    id: 'grammarly-keyboard',
    name: 'Grammarly Keyboard',
    category: 'browser-extension',
    type: 'Writing Assistant',
    description: 'AI-powered keyboard that checks grammar and spelling as you type.',
    performanceScore: 8,
    featureCompleteness: 7,
    easeOfUse: 9,
    priceValue: 6,
    privacyScore: 6,
    communityRating: 7,
    price: '$12/month',
    platforms: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    website: 'https://grammarly.com/keyboard',
    image: '/api/placeholder/300/200',
    pros: ['Real-time checking', 'Works everywhere', 'Tone detection', 'Vocabulary help'],
    cons: ['Premium required', 'Privacy concerns', 'Can be slow', 'Limited to text fields'],
    features: ['Grammar checking', 'Spell checking', 'Tone detection', 'Vocabulary enhancement', 'Real-time feedback'],
    lastUpdated: '2023-12-09',
    userCount: '5M+',
    company: 'Grammarly'
  },
  {
    id: 'markdown-here',
    name: 'Markdown Here',
    category: 'browser-extension',
    type: 'Utility',
    description: 'Write email in Markdown and render it to look good before sending.',
    performanceScore: 7,
    featureCompleteness: 5,
    easeOfUse: 8,
    priceValue: 10,
    privacyScore: 10,
    communityRating: 7,
    price: 'Free',
    platforms: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    website: 'https://markdown-here.com',
    image: '/api/placeholder/300/200',
    pros: ['Completely free', 'Open source', 'Privacy focused', 'Useful for developers'],
    cons: ['Limited to email', 'Basic features', 'No updates', 'Niche audience'],
    features: ['Markdown rendering', 'CSS customization', 'Syntax highlighting', 'Preview mode', 'Email integration'],
    lastUpdated: '2023-12-07',
    userCount: '100K+',
    company: 'Markdown Here'
  },
  {
    id: 'vimium',
    name: 'Vimium',
    category: 'browser-extension',
    type: 'Productivity',
    description: 'The hacker\'s browser. Use the browser like vim.',
    performanceScore: 8,
    featureCompleteness: 7,
    easeOfUse: 5,
    priceValue: 10,
    privacyScore: 10,
    communityRating: 8,
    price: 'Free',
    platforms: ['Chrome', 'Firefox', 'Edge'],
    website: 'https://vimium.github.io',
    image: '/api/placeholder/300/200',
    pros: ['Completely free', 'Open source', 'Keyboard navigation', 'Highly customizable'],
    cons: ['Steep learning curve', 'Vim knowledge required', 'Can break websites', 'Not for beginners'],
    features: ['Keyboard navigation', 'Custom commands', 'Link hints', 'Scroll navigation', 'Search functionality'],
    lastUpdated: '2023-12-05',
    userCount: '500K+',
    company: 'Vimium'
  },
  {
    id: 'ublock-origin',
    name: 'uBlock Origin',
    category: 'browser-extension',
    type: 'Ad Blocker',
    description: 'An efficient blocker for Chromium and Firefox. Fast and lean.',
    performanceScore: 10,
    featureCompleteness: 9,
    easeOfUse: 8,
    priceValue: 10,
    privacyScore: 10,
    communityRating: 9,
    price: 'Free',
    platforms: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'],
    website: 'https://ublockorigin.com',
    image: '/api/placeholder/300/200',
    pros: ['Completely free', 'Open source', 'Very efficient', 'Advanced filtering'],
    cons: ['Complex interface', 'Technical knowledge required', 'Can break sites', 'No support'],
    features: ['Ad blocking', 'Tracking protection', 'Custom filters', 'Element picker', 'Advanced settings'],
    lastUpdated: '2023-12-03',
    userCount: '20M+',
    company: 'uBlock Origin'
  },
  {
    id: 'bitwarden',
    name: 'Bitwarden',
    category: 'browser-extension',
    type: 'Password Manager',
    description: 'Open source password management solution for individuals, teams, and business organizations.',
    performanceScore: 9,
    featureCompleteness: 9,
    easeOfUse: 8,
    priceValue: 9,
    privacyScore: 10,
    communityRating: 9,
    price: 'Free/$10/month',
    platforms: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'],
    website: 'https://bitwarden.com',
    image: '/api/placeholder/300/200',
    pros: ['Open source', 'Free tier generous', 'Cross-platform', 'Self-hosting option'],
    cons: ['Interface basic', 'Can be slow', 'Limited features', 'Community support'],
    features: ['Password storage', 'Auto-fill', 'Password generator', 'Secure sharing', '2FA'],
    lastUpdated: '2023-12-01',
    userCount: '5M+',
    company: 'Bitwarden'
  },
  {
    id: 'translate',
    name: 'Google Translate',
    category: 'browser-extension',
    type: 'Utility',
    description: 'Translate entire webpages with a single click.',
    performanceScore: 8,
    featureCompleteness: 6,
    easeOfUse: 10,
    priceValue: 10,
    privacyScore: 6,
    communityRating: 8,
    price: 'Free',
    platforms: ['Chrome', 'Firefox', 'Edge'],
    website: 'https://translate.google.com',
    image: '/api/placeholder/300/200',
    pros: ['Completely free', 'Easy to use', 'Many languages', 'Fast translation'],
    cons: ['Privacy concerns', 'Limited accuracy', 'Can break formatting', 'No offline mode'],
    features: ['Page translation', 'Text selection', 'Language detection', 'Voice translation', 'Dictionary'],
    lastUpdated: '2023-11-29',
    userCount: '500M+',
    company: 'Google'
  }
]

const categories = [
  { value: 'all', label: 'All Tools' },
  { value: 'ai-assistant', label: 'AI Assistants' },
  { value: 'code-ai', label: 'Code AI' },
  { value: 'browser-extension', label: 'Browser Extensions' }
]

const criteria = [
  { key: 'performanceScore', label: 'Performance', icon: Zap },
  { key: 'featureCompleteness', label: 'Features', icon: Eye },
  { key: 'easeOfUse', label: 'Ease of Use', icon: Users },
  { key: 'priceValue', label: 'Price Value', icon: DollarSign },
  { key: 'privacyScore', label: 'Privacy', icon: Shield },
  { key: 'communityRating', label: 'Community', icon: Star }
]

export default function ComparisonTool() {
  const [tools, setTools] = useState<Tool[]>(mockTools)
  const [filteredTools, setFilteredTools] = useState<Tool[]>(mockTools)
  const [selectedTools, setSelectedTools] = useState<Tool[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('communityRating')

  useEffect(() => {
    let filtered = tools

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort by selected criteria
    filtered = [...filtered].sort((a, b) => {
      const aValue = a[sortBy as keyof Tool] as number
      const bValue = b[sortBy as keyof Tool] as number
      return bValue - aValue
    })

    setFilteredTools(filtered)
  }, [tools, searchTerm, selectedCategory, sortBy])

  const handleToolSelect = (tool: Tool) => {
    if (selectedTools.find(t => t.id === tool.id)) {
      setSelectedTools(selectedTools.filter(t => t.id !== tool.id))
    } else if (selectedTools.length < 3) {
      setSelectedTools([...selectedTools, tool])
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400'
    if (score >= 6) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-4 neon-text">Interactive Comparison Tool</h2>
        <p className="text-muted-foreground">Compare AI tools and browser extensions side-by-side</p>
        <div className="mt-4 flex justify-center gap-4 text-sm text-muted-foreground">
          <span>{tools.filter(t => t.category === 'ai-assistant').length} AI Assistants</span>
          <span>{tools.filter(t => t.category === 'code-ai').length} Code AI Tools</span>
          <span>{tools.filter(t => t.category === 'browser-extension').length} Browser Extensions</span>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="glass-morphism mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-white/10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-background/50 border-white/10">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-background/50 border-white/10">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {criteria.map(criterion => (
                  <SelectItem key={criterion.key} value={criterion.key}>
                    {criterion.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tool List */}
        <div className="lg:col-span-1">
          <Card className="glass-morphism h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Available Tools ({filteredTools.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[480px] custom-scrollbar">
                <div className="space-y-3">
                  {filteredTools.map(tool => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedTools.find(t => t.id === tool.id)
                          ? 'border-cyan-400 bg-cyan-400/10'
                          : 'border-white/10 hover:border-cyan-400/50'
                      }`}
                      onClick={() => handleToolSelect(tool)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{tool.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {tool.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {tool.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400" />
                          <span className="text-sm">{tool.communityRating}</span>
                        </div>
                        <span className="text-sm text-cyan-400">{tool.price}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Comparison View */}
        <div className="lg:col-span-2">
          {selectedTools.length === 0 ? (
            <Card className="glass-morphism h-[600px] flex items-center justify-center">
              <div className="text-center">
                <BookMarked className="h-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Select Tools to Compare</h3>
                <p className="text-muted-foreground">Choose up to 3 tools from the list to see detailed comparison</p>
              </div>
            </Card>
          ) : (
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Comparison ({selectedTools.length}/3)</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTools([])}
                    className="border-cyan-400 text-cyan-400"
                  >
                    Clear All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[520px] custom-scrollbar">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedTools.map(tool => (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                      >
                        <div className="p-4 rounded-lg glass-morphism">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-lg">{tool.name}</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToolSelect(tool)}
                              className="text-red-400 hover:text-red-300"
                            >
                              ×
                            </Button>
                          </div>
                          
                          <Badge variant="secondary" className="mb-3">
                            {tool.type}
                          </Badge>
                          
                          <p className="text-sm text-muted-foreground mb-4">
                            {tool.description}
                          </p>

                          <div className="space-y-3">
                            {criteria.map(criterion => {
                              const Icon = criterion.icon
                              const score = tool[criterion.key as keyof Tool] as number
                              return (
                                <div key={criterion.key} className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{criterion.label}</span>
                                  </div>
                                  <span className={`font-semibold ${getScoreColor(score)}`}>
                                    {score}/10
                                  </span>
                                </div>
                              )
                            })}
                          </div>

                          <div className="mt-4 pt-4 border-t border-white/10">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-muted-foreground">Price</span>
                              <span className="text-sm font-semibold text-cyan-400">
                                {tool.price}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Platforms</span>
                              <div className="flex gap-1">
                                {tool.platforms.slice(0, 3).map(platform => (
                                  <Badge key={platform} variant="outline" className="text-xs">
                                    {platform}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}