'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  CreditCard, 
  Coffee, 
  ShoppingBag, 
  Car,
  Home,
  Utensils,
  Smartphone,
  Calendar,
  TrendingUp,
  DollarSign
} from 'lucide-react'

interface Transaction {
  id: string
  amount: number
  roundedAmount: number
  roundUpAmount: number
  description: string
  category: string
  merchantName: string
  transactionDate: string
  isProcessed: boolean
}

export default function TransactionsPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
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
      // Mock transaction data
      const mockTransactions: Transaction[] = [
        {
          id: '1',
          amount: 187,
          roundedAmount: 200,
          roundUpAmount: 13,
          description: 'Starbucks Coffee',
          category: 'dining',
          merchantName: 'Starbucks',
          transactionDate: '2024-01-15T10:30:00Z',
          isProcessed: true
        },
        {
          id: '2',
          amount: 488,
          roundedAmount: 500,
          roundUpAmount: 12,
          description: 'Amazon Purchase',
          category: 'shopping',
          merchantName: 'Amazon',
          transactionDate: '2024-01-15T09:15:00Z',
          isProcessed: true
        },
        {
          id: '3',
          amount: 147,
          roundedAmount: 150,
          roundUpAmount: 3,
          description: 'Uber Ride',
          category: 'transport',
          merchantName: 'Uber',
          transactionDate: '2024-01-14T20:45:00Z',
          isProcessed: true
        },
        {
          id: '4',
          amount: 299,
          roundedAmount: 300,
          roundUpAmount: 1,
          description: 'Grocery Store',
          category: 'groceries',
          merchantName: 'Big Bazaar',
          transactionDate: '2024-01-14T18:20:00Z',
          isProcessed: true
        },
        {
          id: '5',
          amount: 1250,
          roundedAmount: 1250,
          roundUpAmount: 0,
          description: 'Rent Payment',
          category: 'rent',
          merchantName: 'Property Manager',
          transactionDate: '2024-01-14T12:00:00Z',
          isProcessed: false
        }
      ]
      setTransactions(mockTransactions)
      setFilteredTransactions(mockTransactions)
    } catch (error) {
      console.error('Error parsing user data:', error)
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }, [router])

  useEffect(() => {
    let filtered = transactions

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.merchantName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(transaction => transaction.category === categoryFilter)
    }

    // Apply date filter
    if (dateFilter !== 'all') {
      const now = new Date()
      const transactionDate = new Date()
      
      switch (dateFilter) {
        case 'today':
          filtered = filtered.filter(transaction => {
            const transDate = new Date(transaction.transactionDate)
            return transDate.toDateString() === now.toDateString()
          })
          break
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          filtered = filtered.filter(transaction => {
            const transDate = new Date(transaction.transactionDate)
            return transDate >= weekAgo
          })
          break
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          filtered = filtered.filter(transaction => {
            const transDate = new Date(transaction.transactionDate)
            return transDate >= monthAgo
          })
          break
      }
    }

    setFilteredTransactions(filtered)
  }, [transactions, searchTerm, categoryFilter, dateFilter])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'dining':
        return <Coffee className="h-4 w-4" />
      case 'shopping':
        return <ShoppingBag className="h-4 w-4" />
      case 'transport':
        return <Car className="h-4 w-4" />
      case 'groceries':
        return <Utensils className="h-4 w-4" />
      case 'rent':
        return <Home className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'dining':
        return 'bg-blue-100 text-blue-800'
      case 'shopping':
        return 'bg-green-100 text-green-800'
      case 'transport':
        return 'bg-yellow-100 text-yellow-800'
      case 'groceries':
        return 'bg-purple-100 text-purple-800'
      case 'rent':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const totalRoundUps = transactions.reduce((sum, transaction) => sum + transaction.roundUpAmount, 0)
  const totalTransactions = transactions.length

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading transactions...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
            </div>
            <div className="flex items-center space-x-4">
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
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Round-ups</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalRoundUps.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">From {totalTransactions} transactions</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{(totalRoundUps * 0.7).toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">70% of total</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Round-up</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{(totalRoundUps / totalTransactions).toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Per transaction</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="search"
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="dining">Dining</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="groceries">Groceries</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Date Range</Label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transactions List */}
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                {filteredTransactions.length} transactions found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getCategoryColor(transaction.category)}`}>
                        {getCategoryIcon(transaction.category)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.merchantName}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{formatDate(transaction.transactionDate)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">₹{transaction.amount.toFixed(2)}</span>
                        <span className="text-sm text-gray-400">→</span>
                        <span className="text-sm font-medium">₹{transaction.roundedAmount.toFixed(2)}</span>
                      </div>
                      <div className="mt-1">
                        {transaction.isProcessed ? (
                          <Badge variant="secondary" className="text-green-700 bg-green-100">
                            +₹{transaction.roundUpAmount.toFixed(2)}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-yellow-700 bg-yellow-50">
                            Skipped
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredTransactions.length === 0 && (
                  <div className="text-center py-8">
                    <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No transactions found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}