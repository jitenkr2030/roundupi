'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowUpRight, 
  TrendingUp, 
  PiggyBank, 
  Target, 
  Shield, 
  Star, 
  Users, 
  BookOpen, 
  Bell, 
  Settings, 
  Plus,
  LogOut,
  User,
  CreditCard,
  BarChart3,
  PieChart,
  Activity,
  DollarSign
} from 'lucide-react'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

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

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">RoundUPI</h1>
              </div>
              <nav className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-blue-600 bg-blue-50 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Investments</a>
                <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Goals</a>
                <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Analytics</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name || user.email}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back, {user.name || 'User'}!</h2>
            <p className="mt-2 text-gray-600">Here's your investment overview and recent activity</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹12,450</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹13,210</div>
                <p className="text-xs text-muted-foreground">+6.1% returns</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Round-ups Today</CardTitle>
                <PiggyBank className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹47</div>
                <p className="text-xs text-muted-foreground">12 transactions</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Goals Progress</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">3 active goals</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Round-ups</CardTitle>
                    <CardDescription>Your latest micro-investments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Starbucks Coffee</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">+₹7</p>
                          <p className="text-xs text-muted-foreground">₹187 → ₹200</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Amazon Shopping</p>
                          <p className="text-xs text-muted-foreground">5 hours ago</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">+₹12</p>
                          <p className="text-xs text-muted-foreground">₹488 → ₹500</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Uber Ride</p>
                          <p className="text-xs text-muted-foreground">Yesterday</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">+₹3</p>
                          <p className="text-xs text-muted-foreground">₹147 → ₹150</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Investment Performance</CardTitle>
                    <CardDescription>Your portfolio performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Liquid Funds</span>
                        <div className="text-right">
                          <p className="text-sm font-medium">₹5,200</p>
                          <p className="text-xs text-green-600">+3.2%</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Equity ETFs</span>
                        <div className="text-right">
                          <p className="text-sm font-medium">₹4,800</p>
                          <p className="text-xs text-green-600">+8.7%</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Digital Gold</span>
                        <div className="text-right">
                          <p className="text-sm font-medium">₹2,400</p>
                          <p className="text-xs text-green-600">+5.1%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="goals" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Savings Goals</CardTitle>
                  <CardDescription>Track your progress towards financial goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Emergency Fund</span>
                      <span className="text-sm text-muted-foreground">₹8,000/₹10,000</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">New Laptop</span>
                      <span className="text-sm text-muted-foreground">₹15,000/₹50,000</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Vacation Fund</span>
                      <span className="text-sm text-muted-foreground">₹4,500/₹25,000</span>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>
                  
                  <Button className="w-full mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Goal
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Your recent round-up transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Starbucks Coffee</p>
                          <p className="text-xs text-muted-foreground">Today, 2:30 PM</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">+₹7</p>
                        <p className="text-xs text-muted-foreground">Invested</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Amazon Shopping</p>
                          <p className="text-xs text-muted-foreground">Today, 11:15 AM</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">+₹12</p>
                        <p className="text-xs text-muted-foreground">Invested</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Uber Ride</p>
                          <p className="text-xs text-muted-foreground">Yesterday, 8:45 PM</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">+₹3</p>
                        <p className="text-xs text-muted-foreground">Invested</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Overview</CardTitle>
                  <CardDescription>Your investment portfolio breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">41.7%</p>
                        <p className="text-sm text-blue-800">Liquid Funds</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">38.5%</p>
                        <p className="text-sm text-green-800">Equity ETFs</p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <p className="text-2xl font-bold text-yellow-600">19.3%</p>
                        <p className="text-sm text-yellow-800">Digital Gold</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">0.5%</p>
                        <p className="text-sm text-purple-800">Impact Funds</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold mb-3">Asset Allocation</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Liquid Funds</span>
                          <span className="text-sm font-medium">₹5,200</span>
                        </div>
                        <Progress value={41.7} className="h-2" />
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Equity ETFs</span>
                          <span className="text-sm font-medium">₹4,800</span>
                        </div>
                        <Progress value={38.5} className="h-2" />
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Digital Gold</span>
                          <span className="text-sm font-medium">₹2,400</span>
                        </div>
                        <Progress value={19.3} className="h-2" />
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Impact Funds</span>
                          <span className="text-sm font-medium">₹50</span>
                        </div>
                        <Progress value={0.5} className="h-2" />
                      </div>
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