'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Star, 
  BookMarked, 
  TrendingUp, 
  Bell, 
  DollarSign, 
  Heart, 
  Share2,
  MessageCircle,
  ThumbsUp,
  Clock,
  AlertCircle
} from 'lucide-react'

interface Bookmark {
  id: string
  toolName: string
  category: string
  price: string
  rating: number
  addedAt: string
}

interface PriceAlert {
  id: string
  toolName: string
  currentPrice: string
  targetPrice: string
  alertType: 'drop' | 'rise'
  active: boolean
  createdAt: string
}

interface Review {
  id: string
  toolName: string
  userName: string
  rating: number
  comment: string
  createdAt: string
  helpful: number
  userAvatar: string
}

interface PriceHistory {
  date: string
  price: number
}

const mockBookmarks: Bookmark[] = [
  {
    id: '1',
    toolName: 'ChatGPT',
    category: 'AI Assistant',
    price: '$20/month',
    rating: 9.0,
    addedAt: '2024-01-15'
  },
  {
    id: '2',
    toolName: 'GitHub Copilot',
    category: 'Code AI',
    price: '$10/month',
    rating: 8.8,
    addedAt: '2024-01-10'
  },
  {
    id: '3',
    toolName: 'Grammarly',
    category: 'Browser Extension',
    price: '$12/month',
    rating: 8.8,
    addedAt: '2024-01-08'
  }
]

const mockPriceAlerts: PriceAlert[] = [
  {
    id: '1',
    toolName: 'ChatGPT',
    currentPrice: '$20/month',
    targetPrice: '$15/month',
    alertType: 'drop',
    active: true,
    createdAt: '2024-01-12'
  },
  {
    id: '2',
    toolName: 'Claude',
    currentPrice: '$20/month',
    targetPrice: '$18/month',
    alertType: 'drop',
    active: true,
    createdAt: '2024-01-10'
  }
]

const mockReviews: Review[] = [
  {
    id: '1',
    toolName: 'ChatGPT',
    userName: 'Sarah Johnson',
    rating: 5,
    comment: 'Excellent AI assistant for coding and writing. The response quality has improved significantly over time.',
    createdAt: '2024-01-14',
    helpful: 24,
    userAvatar: '/api/placeholder/40/40'
  },
  {
    id: '2',
    toolName: 'GitHub Copilot',
    userName: 'Mike Chen',
    rating: 4,
    comment: 'Great code completion tool, but sometimes suggests incorrect code. Overall very helpful for productivity.',
    createdAt: '2024-01-13',
    helpful: 18,
    userAvatar: '/api/placeholder/40/40'
  },
  {
    id: '3',
    toolName: 'Grammarly',
    userName: 'Emily Davis',
    rating: 5,
    comment: 'Essential tool for any writer. The grammar checking is accurate and the style suggestions are helpful.',
    createdAt: '2024-01-12',
    helpful: 31,
    userAvatar: '/api/placeholder/40/40'
  }
]

const mockPriceHistory: PriceHistory[] = [
  { date: '2024-01-01', price: 20 },
  { date: '2024-01-08', price: 20 },
  { date: '2024-01-15', price: 18 },
  { date: '2024-01-22', price: 16 },
  { date: '2024-01-29', price: 15 }
]

export default function InteractiveFeatures() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(mockBookmarks)
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>(mockPriceAlerts)
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [newAlert, setNewAlert] = useState({ toolName: '', targetPrice: '', alertType: 'drop' as const })
  const [newReview, setNewReview] = useState({ toolName: '', rating: 5, comment: '' })

  const handleAddAlert = () => {
    if (newAlert.toolName && newAlert.targetPrice) {
      const alert: PriceAlert = {
        id: Date.now().toString(),
        toolName: newAlert.toolName,
        currentPrice: '$20/month', // This would come from API
        targetPrice: `$${newAlert.targetPrice}/month`,
        alertType: newAlert.alertType,
        active: true,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setPriceAlerts([...priceAlerts, alert])
      setNewAlert({ toolName: '', targetPrice: '', alertType: 'drop' })
    }
  }

  const handleAddReview = () => {
    if (newReview.toolName && newReview.comment) {
      const review: Review = {
        id: Date.now().toString(),
        toolName: newReview.toolName,
        userName: 'Current User',
        rating: newReview.rating,
        comment: newReview.comment,
        createdAt: new Date().toISOString().split('T')[0],
        helpful: 0,
        userAvatar: '/api/placeholder/40/40'
      }
      setReviews([review, ...reviews])
      setNewReview({ toolName: '', rating: 5, comment: '' })
    }
  }

  const handleRemoveBookmark = (id: string) => {
    setBookmarks(bookmarks.filter(b => b.id !== id))
  }

  const handleToggleAlert = (id: string) => {
    setPriceAlerts(priceAlerts.map(alert => 
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ))
  }

  const handleHelpful = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review
    ))
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-4 neon-text"
        >
          Interactive Features
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Rate, bookmark, and track prices of your favorite AI tools
        </motion.p>
      </div>

      <Tabs defaultValue="bookmarks" className="w-full">
        <TabsList className="grid w-full grid-cols-3 glass-morphism">
          <TabsTrigger value="bookmarks" className="flex items-center gap-2">
            <BookMarked className="w-4 h-4" />
            Bookmarks
          </TabsTrigger>
          <TabsTrigger value="price-tracker" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Price Tracker
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Reviews
          </TabsTrigger>
        </TabsList>

        {/* Bookmarks Tab */}
        <TabsContent value="bookmarks" className="space-y-6">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookMarked className="w-5 h-5" />
                Your Bookmarks ({bookmarks.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] custom-scrollbar">
                <div className="space-y-4">
                  {bookmarks.map((bookmark) => (
                    <motion.div
                      key={bookmark.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 rounded-lg glass-morphism"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full glass-morphism flex items-center justify-center">
                          <Heart className="w-6 h-6 text-red-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{bookmark.toolName}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">{bookmark.category}</Badge>
                            {renderStars(bookmark.rating)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{bookmark.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRemoveBookmark(bookmark.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Remove
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                  
                  {bookmarks.length === 0 && (
                    <div className="text-center py-8">
                      <BookMarked className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No bookmarks yet. Start adding your favorite tools!</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Price Tracker Tab */}
        <TabsContent value="price-tracker" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Price Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {priceAlerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg glass-morphism"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{alert.toolName}</h4>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${alert.active ? 'bg-green-400' : 'bg-gray-400'}`} />
                          <span className="text-sm text-muted-foreground">
                            {alert.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Current: {alert.currentPrice}
                        </span>
                        <span className="text-cyan-400">
                          Target: {alert.targetPrice}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant={alert.alertType === 'drop' ? 'default' : 'secondary'}>
                          {alert.alertType === 'drop' ? 'Price Drop' : 'Price Rise'}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleAlert(alert.id)}
                        >
                          {alert.active ? 'Disable' : 'Enable'}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4">
                  <h4 className="font-semibold mb-3">Create New Alert</h4>
                  <div className="space-y-3">
                    <Input
                      placeholder="Tool name"
                      value={newAlert.toolName}
                      onChange={(e) => setNewAlert({...newAlert, toolName: e.target.value})}
                      className="bg-background/50"
                    />
                    <Input
                      placeholder="Target price (e.g., 15)"
                      value={newAlert.targetPrice}
                      onChange={(e) => setNewAlert({...newAlert, targetPrice: e.target.value})}
                      className="bg-background/50"
                    />
                    <div className="flex gap-2">
                      <Button
                        variant={newAlert.alertType === 'drop' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setNewAlert({...newAlert, alertType: 'drop'})}
                      >
                        Price Drop
                      </Button>
                      <Button
                        variant={newAlert.alertType === 'rise' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setNewAlert({...newAlert, alertType: 'rise'})}
                      >
                        Price Rise
                      </Button>
                      <Button onClick={handleAddAlert} className="ml-auto">
                        Create Alert
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Price Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg glass-morphism">
                    <h4 className="font-semibold mb-2">ChatGPT Price History</h4>
                    <div className="space-y-2">
                      {mockPriceHistory.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{item.date}</span>
                          <span className="font-semibold">${item.price}/month</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-green-400/10 rounded-lg border border-green-400/20">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-400">
                          Price dropped 25% this month!
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg glass-morphism text-center">
                      <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-400" />
                      <div className="text-2xl font-bold text-green-400">25%</div>
                      <div className="text-sm text-muted-foreground">Avg. Savings</div>
                    </div>
                    <div className="p-4 rounded-lg glass-morphism text-center">
                      <Bell className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
                      <div className="text-2xl font-bold text-cyan-400">12</div>
                      <div className="text-sm text-muted-foreground">Active Alerts</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Community Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px] custom-scrollbar">
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <motion.div
                          key={review.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-lg glass-morphism"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full glass-morphism flex items-center justify-center flex-shrink-0">
                              <span className="text-sm font-semibold">
                                {review.userName.charAt(0)}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold">{review.userName}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Reviewed {review.toolName}
                                  </p>
                                </div>
                                <div className="text-right">
                                  {renderStars(review.rating)}
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {review.createdAt}
                                  </p>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {review.comment}
                              </p>
                              <div className="flex items-center gap-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleHelpful(review.id)}
                                  className="text-muted-foreground hover:text-cyan-400"
                                >
                                  <ThumbsUp className="w-4 h-4 mr-1" />
                                  Helpful ({review.helpful})
                                </Button>
                                <Button variant="ghost" size="sm" className="text-muted-foreground">
                                  <Share2 className="w-4 h-4 mr-1" />
                                  Share
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Write Review
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Tool name"
                    value={newReview.toolName}
                    onChange={(e) => setNewReview({...newReview, toolName: e.target.value})}
                    className="bg-background/50"
                  />
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-6 h-6 cursor-pointer ${
                            star <= newReview.rating 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-400'
                          }`}
                          onClick={() => setNewReview({...newReview, rating: star})}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Comment</label>
                    <textarea
                      placeholder="Share your experience..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                      className="w-full p-3 rounded-lg bg-background/50 border border-white/10 text-sm resize-none"
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleAddReview} className="w-full">
                    Post Review
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-morphism mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Review Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold neon-text">4.6</div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {renderStars(4.6)}
                      </div>
                      <p className="text-sm text-muted-foreground">Average Rating</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold text-cyan-400">1,234</div>
                        <div className="text-xs text-muted-foreground">Total Reviews</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-green-400">89%</div>
                        <div className="text-xs text-muted-foreground">Positive</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}