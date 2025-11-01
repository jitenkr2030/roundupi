'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  ArrowLeft, 
  Star, 
  Crown, 
  Zap, 
  Shield, 
  TrendingUp, 
  BarChart3, 
  PieChart,
  Target,
  Award,
  CheckCircle,
  X,
  CreditCard,
  Calendar,
  Users,
  Headphones,
  FileText,
  Bell,
  Gift,
  Diamond,
  Sparkles
} from 'lucide-react'

interface PremiumFeature {
  id: string
  name: string
  description: string
  icon: any
  category: string
  isPopular?: boolean
}

interface SubscriptionPlan {
  id: string
  name: string
  price: number
  period: string
  features: string[]
  popular?: boolean
  savings?: string
}

export default function PremiumPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<string>('pro_monthly')
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const premiumFeatures: PremiumFeature[] = [
    {
      id: '1',
      name: 'Advanced Analytics',
      description: 'Portfolio heat maps, sector allocation, and performance vs benchmarks',
      icon: BarChart3,
      category: 'analytics'
    },
    {
      id: '2',
      name: '50+ Mutual Funds',
      description: 'Access to small-cap, mid-cap, and international funds',
      icon: TrendingUp,
      category: 'investments'
    },
    {
      id: '3',
      name: 'Priority Support',
      description: 'Dedicated relationship manager and instant chat support',
      icon: Headphones,
      category: 'support'
    },
    {
      id: '4',
      name: 'Tax Optimization',
      description: 'ELSS fund recommendations and tax-saving strategies',
      icon: FileText,
      category: 'tax'
    },
    {
      id: '5',
      name: 'Real-time Alerts',
      description: 'Instant notifications for market movements and opportunities',
      icon: Bell,
      category: 'alerts'
    },
    {
      id: '6',
      name: 'Exclusive Research',
      description: 'In-depth market analysis and investment reports',
      icon: PieChart,
      category: 'research'
    },
    {
      id: '7',
      name: 'Higher Limits',
      description: 'Increased daily round-up limits and investment caps',
      icon: Target,
      category: 'limits'
    },
    {
      id: '8',
      name: 'Early Access',
      description: 'Be first to try new features and investment products',
      icon: Sparkles,
      category: 'access'
    }
  ]

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'forever',
      features: [
        'Basic rounding rules',
        '3 investment options',
        'Standard analytics',
        'Email support'
      ]
    },
    {
      id: 'pro_monthly',
      name: 'Pro',
      price: 99,
      period: 'month',
      popular: true,
      features: [
        'All premium features',
        '50+ mutual funds',
        'Advanced analytics',
        'Priority support',
        'Tax optimization',
        'Real-time alerts',
        'Higher limits',
        'Early access'
      ]
    },
    {
      id: 'pro_yearly',
      name: 'Pro',
      price: 999,
      period: 'year',
      savings: 'Save 15%',
      features: [
        'All premium features',
        '50+ mutual funds',
        'Advanced analytics',
        'Priority support',
        'Tax optimization',
        'Real-time alerts',
        'Higher limits',
        'Early access',
        '2 months free'
      ]
    }
  ]

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/login')
      return
    }

    try {
      setUser(JSON.parse(userData))
    } catch (error) {
      console.error('Error parsing user data:', error)
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleUpgrade = async (planId: string) => {
    setIsUpgrading(true)
    setSuccess('')
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSuccess('Successfully upgraded to Premium! Enjoy all the exclusive features.')
      
      // Update user status
      if (user) {
        const updatedUser = { ...user, isPremium: true }
        setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }
    } catch (err) {
      setError('Upgrade failed. Please try again.')
    } finally {
      setIsUpgrading(false)
    }
  }

  const getFeatureIcon = (icon: any) => {
    const Icon = icon
    return <Icon className="h-6 w-6" />
  }

  const getFeatureColor = (category: string) => {
    switch (category) {
      case 'analytics':
        return 'bg-blue-100 text-blue-800'
      case 'investments':
        return 'bg-green-100 text-green-800'
      case 'support':
        return 'bg-purple-100 text-purple-800'
      case 'tax':
        return 'bg-orange-100 text-orange-800'
      case 'alerts':
        return 'bg-red-100 text-red-800'
      case 'research':
        return 'bg-indigo-100 text-indigo-800'
      case 'limits':
        return 'bg-yellow-100 text-yellow-800'
      case 'access':
        return 'bg-pink-100 text-pink-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading premium features...</p>
        </div>
      </div>
    )
  }

  const isPremium = user?.isPremium || false

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-4">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">RoundUPI Premium</h1>
            </div>
            {isPremium && (
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <Crown className="h-3 w-3 mr-1" />
                Premium Member
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <Crown className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Unlock Premium Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get access to advanced analytics, exclusive investment options, priority support, and much more. 
              Take your investment journey to the next level.
            </p>
          </div>

          {success && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <AlertDescription className="text-green-700">{success}</AlertDescription>
            </Alert>
          )}
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="features" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-8">
              {/* Premium Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {premiumFeatures.map((feature) => {
                  const Icon = feature.icon
                  return (
                    <Card key={feature.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getFeatureColor(feature.category)}`}>
                            {getFeatureIcon(Icon)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{feature.name}</CardTitle>
                            <CardDescription className="text-sm">{feature.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm text-gray-500">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Premium Exclusive
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Feature Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Free vs Premium Comparison</CardTitle>
                  <CardDescription>See what you get with Premium</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { feature: 'Investment Options', free: '3', premium: '50+' },
                      { feature: 'Analytics', free: 'Basic', premium: 'Advanced' },
                      { feature: 'Support', free: 'Email', premium: 'Priority + Chat' },
                      { feature: 'Tax Optimization', free: '❌', premium: '✅' },
                      { feature: 'Real-time Alerts', free: '❌', premium: '✅' },
                      { feature: 'Daily Round-up Limit', free: '₹100', premium: '₹500' },
                      { feature: 'Early Access', free: '❌', premium: '✅' },
                      { feature: 'Exclusive Research', free: '❌', premium: '✅' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{item.feature}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-600">{item.free}</span>
                          <span className="text-green-600 font-medium">{item.premium}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-8">
              {/* Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {subscriptionPlans.map((plan) => (
                  <Card key={plan.id} className={`relative ${plan.popular ? 'ring-2 ring-purple-600 shadow-lg' : ''}`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-purple-600 text-white px-3 py-1">
                          <Star className="h-3 w-3 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">₹{plan.price}</span>
                        <span className="text-gray-600">/{plan.period}</span>
                      </div>
                      {plan.savings && (
                        <Badge className="bg-green-100 text-green-800 mt-2">
                          {plan.savings}
                        </Badge>
                      )}
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className="w-full mt-6" 
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => handleUpgrade(plan.id)}
                        disabled={isUpgrading || (isPremium && plan.id !== 'free')}
                      >
                        {isUpgrading ? (
                          <>
                            <CreditCard className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : isPremium && plan.id !== 'free' ? (
                          'Current Plan'
                        ) : plan.price === 0 ? (
                          'Current Plan'
                        ) : (
                          `Upgrade to ${plan.name}`
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* FAQ Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      question: 'Can I cancel anytime?',
                      answer: 'Yes, you can cancel your Premium subscription at any time. You\'ll continue to have access until the end of your billing period.'
                    },
                    {
                      question: 'What payment methods are accepted?',
                      answer: 'We accept all major credit cards, debit cards, UPI, and net banking for Premium subscriptions.'
                    },
                    {
                      question: 'Is there a free trial?',
                      answer: 'Yes, we offer a 7-day free trial for all new Premium users. No credit card required.'
                    },
                    {
                      question: 'How do I access Premium features?',
                      answer: 'Once you upgrade, all Premium features are immediately available in your dashboard and throughout the app.'
                    }
                  ].map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                      <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="benefits" className="space-y-8">
              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                      Maximize Returns
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Access 50+ mutual funds including small-cap, mid-cap, and international funds. 
                      Get personalized recommendations based on your risk profile.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">Professional fund selection</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">Tax-optimized investments</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">Higher return potential</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-blue-600" />
                      Priority Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Get dedicated support from our relationship managers. Instant chat support and 
                      priority resolution for all your queries.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">24/7 priority support</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">Dedicated relationship manager</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">Fast issue resolution</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                      Advanced Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Deep insights into your portfolio with advanced analytics, performance benchmarks, 
                      and detailed risk analysis.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">Portfolio heat maps</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">Sector allocation analysis</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">Performance vs benchmarks</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="h-5 w-5 mr-2 text-red-600" />
                      Stay Ahead
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Real-time alerts for market movements, investment opportunities, and important 
                      portfolio updates.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">Real-time market alerts</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">Investment opportunities</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">Portfolio notifications</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Testimonials */}
              <Card>
                <CardHeader>
                  <CardTitle>What Our Premium Members Say</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        "The advanced analytics helped me optimize my portfolio and increase returns by 15%!"
                      </p>
                      <p className="text-xs text-gray-500">- Rajesh K., Premium Member</p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        "Priority support is amazing. My relationship manager helped me save ₹50,000 in taxes!"
                      </p>
                      <p className="text-xs text-gray-500">- Priya M., Premium Member</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}