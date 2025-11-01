'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  Shield,
  Plus,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  Star,
  Award,
  AlertTriangle,
  CheckCircle,
  Building2,
  Gold,
  Leaf,
  Zap
} from 'lucide-react'

interface Investment {
  id: string
  assetType: string
  assetName: string
  amount: number
  currentValue: number
  purchasePrice: number
  currentPrice: number
  returnPercentage: number
  purchaseDate: string
  isRedeemed: boolean
}

interface InvestmentOption {
  id: string
  name: string
  type: string
  category: string
  description: string
  minInvestment: number
  riskLevel: 'low' | 'medium' | 'high'
  expectedReturn: number
  features: string[]
  icon: any
  color: string
}

export default function InvestmentsPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [investments, setInvestments] = useState<Investment[]>([])
  const [investmentOptions, setInvestmentOptions] = useState<InvestmentOption[]>([])
  const [selectedInvestment, setSelectedInvestment] = useState<InvestmentOption | null>(null)
  const [investAmount, setInvestAmount] = useState('')
  const [isInvesting, setIsInvesting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
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
      
      // Mock investment data
      const mockInvestments: Investment[] = [
        {
          id: '1',
          assetType: 'liquid_fund',
          assetName: 'Axis Liquid Fund',
          amount: 5200,
          currentValue: 5366.40,
          purchasePrice: 100,
          currentPrice: 103.20,
          returnPercentage: 3.2,
          purchaseDate: '2024-01-01',
          isRedeemed: false
        },
        {
          id: '2',
          assetType: 'equity_fund',
          assetName: 'Nifty 50 ETF',
          amount: 4800,
          currentValue: 5217.60,
          purchasePrice: 200,
          currentPrice: 217.40,
          returnPercentage: 8.7,
          purchaseDate: '2024-01-01',
          isRedeemed: false
        },
        {
          id: '3',
          assetType: 'digital_gold',
          assetName: 'Digital Gold',
          amount: 2400,
          currentValue: 2522.40,
          purchasePrice: 6000,
          currentPrice: 6306,
          returnPercentage: 5.1,
          purchaseDate: '2024-01-01',
          isRedeemed: false
        }
      ]
      setInvestments(mockInvestments)

      // Mock investment options
      const mockOptions: InvestmentOption[] = [
        {
          id: '1',
          name: 'Axis Liquid Fund',
          type: 'liquid_fund',
          category: 'Liquid Funds',
          description: 'Low-risk fund with instant redemption. Perfect for emergency savings.',
          minInvestment: 100,
          riskLevel: 'low',
          expectedReturn: 7.5,
          features: ['Instant Redemption', 'Low Risk', 'High Liquidity'],
          icon: Building2,
          color: 'bg-blue-100 text-blue-800'
        },
        {
          id: '2',
          name: 'Nifty 50 ETF',
          type: 'equity_fund',
          category: 'Equity ETFs',
          description: 'Track Nifty 50 performance. Ideal for long-term growth.',
          minInvestment: 500,
          riskLevel: 'medium',
          expectedReturn: 12,
          features: ['Diversified', 'Low Cost', 'Tax Efficient'],
          icon: BarChart3,
          color: 'bg-green-100 text-green-800'
        },
        {
          id: '3',
          name: 'Digital Gold',
          type: 'digital_gold',
          category: 'Digital Gold',
          description: 'Invest in gold in small increments. Hedge against inflation.',
          minInvestment: 100,
          riskLevel: 'low',
          expectedReturn: 9,
          features: ['24K Gold', 'Secure Storage', 'Easy Redemption'],
          icon: Gold,
          color: 'bg-yellow-100 text-yellow-800'
        },
        {
          id: '4',
          name: 'Clean Energy Fund',
          type: 'impact_fund',
          category: 'Impact Funds',
          description: 'Invest in renewable energy projects. Make a positive impact.',
          minInvestment: 1000,
          riskLevel: 'high',
          expectedReturn: 15,
          features: ['ESG Focus', 'High Growth', 'Social Impact'],
          icon: Leaf,
          color: 'bg-green-100 text-green-800'
        }
      ]
      setInvestmentOptions(mockOptions)
    } catch (error) {
      console.error('Error parsing user data:', error)
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleInvest = async () => {
    if (!selectedInvestment || !investAmount) {
      setError('Please select an investment and enter an amount')
      return
    }

    const amount = Number(investAmount)
    if (amount < selectedInvestment.minInvestment) {
      setError(`Minimum investment amount is ₹${selectedInvestment.minInvestment}`)
      return
    }

    setIsInvesting(true)
    setSuccess('')
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSuccess(`Successfully invested ₹${amount} in ${selectedInvestment.name}`)
      setInvestAmount('')
      setSelectedInvestment(null)
    } catch (err) {
      setError('Investment failed. Please try again.')
    } finally {
      setIsInvesting(false)
    }
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'high':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return <Shield className="h-4 w-4" />
      case 'medium':
        return <AlertTriangle className="h-4 w-4" />
      case 'high':
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0)
  const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0)
  const totalReturns = totalCurrentValue - totalInvested
  const totalReturnPercentage = totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading investments...</p>
        </div>
      </div>
    )
  }

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
              <h1 className="text-2xl font-bold text-gray-900">Investments</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Activity className="h-4 w-4 mr-2" />
                View Statements
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalInvested.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Across {investments.length} investments</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalCurrentValue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Market value</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
                {totalReturns >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${totalReturns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalReturns >= 0 ? '+' : ''}₹{Math.abs(totalReturns).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">{totalReturnPercentage.toFixed(1)}% return</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Best Performer</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {investments.length > 0 ? Math.max(...investments.map(i => i.returnPercentage)).toFixed(1) + '%' : '0%'}
                </div>
                <p className="text-xs text-muted-foreground">Highest return</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="portfolio" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
              <TabsTrigger value="invest">Invest More</TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio" className="space-y-6">
              {/* Current Investments */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Investments</CardTitle>
                  <CardDescription>Your active investment holdings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {investments.map((investment) => (
                      <div key={investment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            {investment.assetType === 'liquid_fund' && <Building2 className="h-6 w-6 text-blue-600" />}
                            {investment.assetType === 'equity_fund' && <BarChart3 className="h-6 w-6 text-green-600" />}
                            {investment.assetType === 'digital_gold' && <Gold className="h-6 w-6 text-yellow-600" />}
                            {investment.assetType === 'impact_fund' && <Leaf className="h-6 w-6 text-green-600" />}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{investment.assetName}</p>
                            <p className="text-sm text-gray-500">Invested on {new Date(investment.purchaseDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm text-gray-500">₹{investment.amount.toLocaleString()}</span>
                            <span className="text-sm text-gray-400">→</span>
                            <span className="text-sm font-medium">₹{investment.currentValue.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {investment.returnPercentage >= 0 ? (
                              <TrendingUp className="h-3 w-3 text-green-600" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-600" />
                            )}
                            <span className={`text-xs font-medium ${investment.returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {investment.returnPercentage >= 0 ? '+' : ''}{investment.returnPercentage.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Portfolio Allocation */}
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Allocation</CardTitle>
                  <CardDescription>How your investments are distributed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {investments.map((investment) => {
                      const allocation = (investment.amount / totalInvested) * 100
                      return (
                        <div key={investment.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {investment.assetType === 'liquid_fund' && <Building2 className="h-4 w-4 text-blue-600" />}
                              {investment.assetType === 'equity_fund' && <BarChart3 className="h-4 w-4 text-green-600" />}
                              {investment.assetType === 'digital_gold' && <Gold className="h-4 w-4 text-yellow-600" />}
                              {investment.assetType === 'impact_fund' && <Leaf className="h-4 w-4 text-green-600" />}
                              <span className="text-sm font-medium">{investment.assetName}</span>
                            </div>
                            <span className="text-sm text-gray-600">{allocation.toFixed(1)}%</span>
                          </div>
                          <Progress value={allocation} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="invest" className="space-y-6">
              {success && (
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-700">{success}</AlertDescription>
                </Alert>
              )}
              
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Investment Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {investmentOptions.map((option) => {
                  const Icon = option.icon
                  const isSelected = selectedInvestment?.id === option.id
                  
                  return (
                    <Card 
                      key={option.id} 
                      className={`cursor-pointer transition-all ${
                        isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedInvestment(option)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${option.color}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{option.name}</CardTitle>
                              <CardDescription>{option.category}</CardDescription>
                            </div>
                          </div>
                          <Badge className={getRiskColor(option.riskLevel)}>
                            {getRiskIcon(option.riskLevel)}
                            <span className="ml-1">{option.riskLevel.toUpperCase()}</span>
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Min Investment:</span>
                            <span className="font-medium">₹{option.minInvestment}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Expected Return:</span>
                            <span className="font-medium text-green-600">{option.expectedReturn}%</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-3">
                            {option.features.map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Investment Form */}
              {selectedInvestment && (
                <Card>
                  <CardHeader>
                    <CardTitle>Invest in {selectedInvestment.name}</CardTitle>
                    <CardDescription>Enter the amount you want to invest</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Investment Amount (₹)</Label>
                        <Input
                          id="amount"
                          type="number"
                          min={selectedInvestment.minInvestment}
                          step="100"
                          value={investAmount}
                          onChange={(e) => setInvestAmount(e.target.value)}
                          placeholder={`Minimum: ₹${selectedInvestment.minInvestment}`}
                        />
                        <p className="text-sm text-gray-600">
                          Minimum investment: ₹{selectedInvestment.minInvestment}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Investment Summary</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Amount:</span>
                            <span>₹{investAmount || '0'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Expected Annual Return:</span>
                            <span className="text-green-600">{selectedInvestment.expectedReturn}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Risk Level:</span>
                            <Badge className={getRiskColor(selectedInvestment.riskLevel)}>
                              {selectedInvestment.riskLevel.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <Button onClick={handleInvest} disabled={isInvesting || !investAmount} className="w-full">
                        {isInvesting ? (
                          <>
                            <Clock className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Invest Now
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}