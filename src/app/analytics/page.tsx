'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Activity,
  Calendar,
  Download,
  RefreshCw,
  DollarSign,
  Target,
  Award,
  Clock,
  Zap,
  Shield,
  Star,
  AlertTriangle
} from 'lucide-react'

interface AnalyticsData {
  portfolioValue: number
  totalReturns: number
  returnPercentage: number
  monthlyData: Array<{
    month: string
    value: number
    returns: number
  }>
  assetAllocation: Array<{
    name: string
    value: number
    percentage: number
    color: string
  }>
  topPerformers: Array<{
    name: string
    return: number
    value: number
  }>
  riskMetrics: {
    sharpeRatio: number
    volatility: number
    maxDrawdown: number
  }
  goalProgress: Array<{
    name: string
    progress: number
    target: number
    current: number
  }>
}

export default function AnalyticsPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('1y')
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
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
      
      // Mock analytics data
      const mockData: AnalyticsData = {
        portfolioValue: 13210,
        totalReturns: 760,
        returnPercentage: 6.1,
        monthlyData: [
          { month: 'Jan', value: 10000, returns: 0 },
          { month: 'Feb', value: 10200, returns: 200 },
          { month: 'Mar', value: 10500, returns: 500 },
          { month: 'Apr', value: 10800, returns: 800 },
          { month: 'May', value: 11200, returns: 1200 },
          { month: 'Jun', value: 11500, returns: 1500 },
          { month: 'Jul', value: 11800, returns: 1800 },
          { month: 'Aug', value: 12100, returns: 2100 },
          { month: 'Sep', value: 12500, returns: 2500 },
          { month: 'Oct', value: 12800, returns: 2800 },
          { month: 'Nov', value: 13000, returns: 3000 },
          { month: 'Dec', value: 13210, returns: 3210 }
        ],
        assetAllocation: [
          { name: 'Liquid Funds', value: 5200, percentage: 39.4, color: '#3B82F6' },
          { name: 'Equity ETFs', value: 4800, percentage: 36.3, color: '#10B981' },
          { name: 'Digital Gold', value: 2400, percentage: 18.2, color: '#F59E0B' },
          { name: 'Impact Funds', value: 810, percentage: 6.1, color: '#8B5CF6' }
        ],
        topPerformers: [
          { name: 'Nifty 50 ETF', return: 8.7, value: 4800 },
          { name: 'Digital Gold', return: 5.1, value: 2400 },
          { name: 'Axis Liquid Fund', return: 3.2, value: 5200 }
        ],
        riskMetrics: {
          sharpeRatio: 1.8,
          volatility: 12.5,
          maxDrawdown: -5.2
        },
        goalProgress: [
          { name: 'Emergency Fund', progress: 80, target: 10000, current: 8000 },
          { name: 'New Laptop', progress: 30, target: 50000, current: 15000 },
          { name: 'Vacation Fund', progress: 18, target: 25000, current: 4500 }
        ]
      }
      
      setAnalyticsData(mockData)
    } catch (error) {
      console.error('Error parsing user data:', error)
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const getRiskColor = (value: number, type: 'sharpe' | 'volatility' | 'drawdown') => {
    if (type === 'sharpe') {
      return value > 1.5 ? 'text-green-600' : value > 1.0 ? 'text-yellow-600' : 'text-red-600'
    } else if (type === 'volatility') {
      return value < 10 ? 'text-green-600' : value < 20 ? 'text-yellow-600' : 'text-red-600'
    } else {
      return value > -3 ? 'text-green-600' : value > -10 ? 'text-yellow-600' : 'text-red-600'
    }
  }

  const getPerformanceRating = (returnPercentage: number) => {
    if (returnPercentage > 10) return { rating: 'Excellent', color: 'bg-green-100 text-green-800', icon: Star }
    if (returnPercentage > 5) return { rating: 'Good', color: 'bg-blue-100 text-blue-800', icon: TrendingUp }
    if (returnPercentage > 0) return { rating: 'Average', color: 'bg-yellow-100 text-yellow-800', icon: Activity }
    return { rating: 'Poor', color: 'bg-red-100 text-red-800', icon: AlertTriangle }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No analytics data available</p>
        </div>
      </div>
    )
  }

  const performanceRating = getPerformanceRating(analyticsData.returnPercentage)
  const RatingIcon = performanceRating.icon

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-4">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Performance Analytics</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 Month</SelectItem>
                  <SelectItem value="3m">3 Months</SelectItem>
                  <SelectItem value="6m">6 Months</SelectItem>
                  <SelectItem value="1y">1 Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{analyticsData.portfolioValue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Current market value</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
                {analyticsData.totalReturns >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${analyticsData.totalReturns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analyticsData.totalReturns >= 0 ? '+' : ''}₹{Math.abs(analyticsData.totalReturns).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Absolute returns</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Return %</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${analyticsData.returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analyticsData.returnPercentage >= 0 ? '+' : ''}{analyticsData.returnPercentage.toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">Percentage return</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Performance</CardTitle>
                <RatingIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Badge className={performanceRating.color}>
                  {performanceRating.rating}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">Overall rating</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="allocation">Allocation</TabsTrigger>
              <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Portfolio Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Growth</CardTitle>
                  <CardDescription>Your portfolio value over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Interactive chart showing portfolio growth</p>
                      <p className="text-sm text-gray-500 mt-2">From ₹10,000 to ₹13,210 (32.1% growth)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Goal Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Goal Progress</CardTitle>
                  <CardDescription>Track your savings goals progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.goalProgress.map((goal, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{goal.name}</span>
                          <span className="text-sm text-gray-600">{goal.progress.toFixed(1)}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>₹{goal.current.toLocaleString()}</span>
                          <span>₹{goal.target.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              {/* Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                  <CardDescription>Your best performing investments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.topPerformers.map((performer, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Award className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{performer.name}</p>
                            <p className="text-sm text-gray-500">Value: ₹{performer.value.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${performer.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {performer.return >= 0 ? '+' : ''}{performer.return.toFixed(1)}%
                          </p>
                          <p className="text-xs text-gray-500">Returns</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Return Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Absolute Returns</span>
                      <span className="font-medium">₹{analyticsData.totalReturns.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annualized Returns</span>
                      <span className="font-medium">{(analyticsData.returnPercentage * 0.8).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Outperformance</span>
                      <span className="font-medium text-green-600">+2.1%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Time Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Best Month</span>
                      <span className="font-medium">December (+₹410)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Worst Month</span>
                      <span className="font-medium">January (+₹0)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Monthly Return</span>
                      <span className="font-medium">₹268</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="allocation" className="space-y-6">
              {/* Asset Allocation */}
              <Card>
                <CardHeader>
                  <CardTitle>Asset Allocation</CardTitle>
                  <CardDescription>How your investments are distributed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Pie chart showing asset allocation</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {analyticsData.assetAllocation.map((asset, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <div className="flex items-center space-x-2">
                              <div 
                                className="w-4 h-4 rounded-full" 
                                style={{ backgroundColor: asset.color }}
                              ></div>
                              <span className="font-medium">{asset.name}</span>
                            </div>
                            <span className="font-medium">{asset.percentage.toFixed(1)}%</span>
                          </div>
                          <Progress value={asset.percentage} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>₹{asset.value.toLocaleString()}</span>
                            <span>{asset.percentage.toFixed(1)}% of portfolio</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Diversification Score */}
              <Card>
                <CardHeader>
                  <CardTitle>Diversification Analysis</CardTitle>
                  <CardDescription>How well-diversified your portfolio is</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">Good</div>
                      <p className="text-sm text-gray-600">Diversification Score</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">4</div>
                      <p className="text-sm text-gray-600">Asset Classes</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">Low</div>
                      <p className="text-sm text-gray-600">Concentration Risk</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="risk" className="space-y-6">
              {/* Risk Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Metrics</CardTitle>
                  <CardDescription>Key risk indicators for your portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold mb-2">{analyticsData.riskMetrics.sharpeRatio}</div>
                      <p className="text-sm text-gray-600 mb-1">Sharpe Ratio</p>
                      <Badge className={getRiskColor(analyticsData.riskMetrics.sharpeRatio, 'sharpe')}>
                        {analyticsData.riskMetrics.sharpeRatio > 1.5 ? 'Excellent' : analyticsData.riskMetrics.sharpeRatio > 1.0 ? 'Good' : 'Poor'}
                      </Badge>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold mb-2">{analyticsData.riskMetrics.volatility}%</div>
                      <p className="text-sm text-gray-600 mb-1">Volatility</p>
                      <Badge className={getRiskColor(analyticsData.riskMetrics.volatility, 'volatility')}>
                        {analyticsData.riskMetrics.volatility < 10 ? 'Low' : analyticsData.riskMetrics.volatility < 20 ? 'Medium' : 'High'}
                      </Badge>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold mb-2">{analyticsData.riskMetrics.maxDrawdown}%</div>
                      <p className="text-sm text-gray-600 mb-1">Max Drawdown</p>
                      <Badge className={getRiskColor(analyticsData.riskMetrics.maxDrawdown, 'drawdown')}>
                        {analyticsData.riskMetrics.maxDrawdown > -3 ? 'Low' : analyticsData.riskMetrics.maxDrawdown > -10 ? 'Medium' : 'High'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Assessment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Overall Risk Level</span>
                      <Badge className="bg-green-100 text-green-800">Low to Medium</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Risk Capacity</span>
                      <Badge className="bg-blue-100 text-blue-800">High</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Risk Tolerance</span>
                      <Badge className="bg-purple-100 text-purple-800">Moderate</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Stress Test Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Market Crash (-30%)</span>
                      <span className="font-medium text-red-600">-18.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recession Scenario</span>
                      <span className="font-medium text-yellow-600">-12.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Inflation Shock</span>
                      <span className="font-medium text-green-600">+8.7%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}