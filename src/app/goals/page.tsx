'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  ArrowLeft, 
  Target, 
  Plus, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  PiggyBank,
  Home,
  Car,
  Plane,
  BookOpen,
  Shield,
  Award,
  Clock,
  Edit,
  Trash2,
  CheckCircle
} from 'lucide-react'

interface SavingsGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  targetDate: string
  category: string
  allocation: any
  isActive: boolean
  createdAt: string
}

interface GoalFormData {
  name: string
  targetAmount: number
  targetDate: string
  category: string
  allocation: {
    liquid_fund: number
    equity_fund: number
    digital_gold: number
    impact_fund: number
  }
}

export default function GoalsPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [goals, setGoals] = useState<SavingsGoal[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingGoal, setEditingGoal] = useState<SavingsGoal | null>(null)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const [formData, setFormData] = useState<GoalFormData>({
    name: '',
    targetAmount: 0,
    targetDate: '',
    category: 'emergency',
    allocation: {
      liquid_fund: 70,
      equity_fund: 20,
      digital_gold: 10,
      impact_fund: 0
    }
  })

  const goalCategories = [
    { id: 'emergency', name: 'Emergency Fund', icon: Shield, color: 'bg-blue-100 text-blue-800' },
    { id: 'laptop', name: 'New Laptop', icon: BookOpen, color: 'bg-purple-100 text-purple-800' },
    { id: 'vacation', name: 'Vacation', icon: Plane, color: 'bg-green-100 text-green-800' },
    { id: 'car', name: 'Car', icon: Car, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'home', name: 'Home Down Payment', icon: Home, color: 'bg-red-100 text-red-800' },
    { id: 'education', name: 'Education', icon: BookOpen, color: 'bg-indigo-100 text-indigo-800' }
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
      
      // Mock goals data
      const mockGoals: SavingsGoal[] = [
        {
          id: '1',
          name: 'Emergency Fund',
          targetAmount: 10000,
          currentAmount: 8000,
          targetDate: '2024-06-30',
          category: 'emergency',
          allocation: { liquid_fund: 80, equity_fund: 10, digital_gold: 10, impact_fund: 0 },
          isActive: true,
          createdAt: '2024-01-01'
        },
        {
          id: '2',
          name: 'New Laptop',
          targetAmount: 50000,
          currentAmount: 15000,
          targetDate: '2024-12-31',
          category: 'laptop',
          allocation: { liquid_fund: 30, equity_fund: 50, digital_gold: 20, impact_fund: 0 },
          isActive: true,
          createdAt: '2024-01-15'
        },
        {
          id: '3',
          name: 'Vacation Fund',
          targetAmount: 25000,
          currentAmount: 4500,
          targetDate: '2025-03-31',
          category: 'vacation',
          allocation: { liquid_fund: 40, equity_fund: 30, digital_gold: 30, impact_fund: 0 },
          isActive: true,
          createdAt: '2024-02-01'
        }
      ]
      setGoals(mockGoals)
    } catch (error) {
      console.error('Error parsing user data:', error)
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleCreateGoal = async () => {
    if (!formData.name || !formData.targetAmount || !formData.targetDate) {
      setError('Please fill in all required fields')
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newGoal: SavingsGoal = {
        id: Date.now().toString(),
        name: formData.name,
        targetAmount: formData.targetAmount,
        currentAmount: 0,
        targetDate: formData.targetDate,
        category: formData.category,
        allocation: formData.allocation,
        isActive: true,
        createdAt: new Date().toISOString()
      }

      setGoals([...goals, newGoal])
      setSuccess('Goal created successfully!')
      setIsDialogOpen(false)
      resetForm()
    } catch (err) {
      setError('Failed to create goal')
    }
  }

  const handleEditGoal = (goal: SavingsGoal) => {
    setEditingGoal(goal)
    setFormData({
      name: goal.name,
      targetAmount: goal.targetAmount,
      targetDate: goal.targetDate,
      category: goal.category,
      allocation: goal.allocation
    })
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleUpdateGoal = async () => {
    if (!editingGoal) return

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const updatedGoals = goals.map(goal => 
        goal.id === editingGoal.id 
          ? { ...goal, ...formData }
          : goal
      )
      
      setGoals(updatedGoals)
      setSuccess('Goal updated successfully!')
      setIsDialogOpen(false)
      setIsEditing(false)
      setEditingGoal(null)
      resetForm()
    } catch (err) {
      setError('Failed to update goal')
    }
  }

  const handleDeleteGoal = async (goalId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const updatedGoals = goals.filter(goal => goal.id !== goalId)
      setGoals(updatedGoals)
      setSuccess('Goal deleted successfully!')
    } catch (err) {
      setError('Failed to delete goal')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      targetAmount: 0,
      targetDate: '',
      category: 'emergency',
      allocation: {
        liquid_fund: 70,
        equity_fund: 20,
        digital_gold: 10,
        impact_fund: 0
      }
    })
  }

  const getCategoryInfo = (categoryId: string) => {
    return goalCategories.find(cat => cat.id === categoryId) || goalCategories[0]
  }

  const getProgressPercentage = (current: number, target: number) => {
    return target > 0 ? (current / target) * 100 : 0
  }

  const getDaysRemaining = (targetDate: string) => {
    const target = new Date(targetDate)
    const now = new Date()
    const diffTime = target.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 75) return 'bg-green-500'
    if (percentage >= 50) return 'bg-blue-500'
    if (percentage >= 25) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading goals...</p>
        </div>
      </div>
    )
  }

  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const totalCurrentAmount = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const overallProgress = totalTargetAmount > 0 ? (totalCurrentAmount / totalTargetAmount) * 100 : 0

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
              <h1 className="text-2xl font-bold text-gray-900">Savings Goals</h1>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Goal
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{isEditing ? 'Edit Goal' : 'Create New Goal'}</DialogTitle>
                  <DialogDescription>
                    Set a savings goal and track your progress towards achieving it.
                  </DialogDescription>
                </DialogHeader>
                
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
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Goal Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Emergency Fund"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {goalCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="targetAmount">Target Amount (₹)</Label>
                      <Input
                        id="targetAmount"
                        type="number"
                        min="0"
                        value={formData.targetAmount}
                        onChange={(e) => setFormData(prev => ({ ...prev, targetAmount: Number(e.target.value) }))}
                        placeholder="10000"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="targetDate">Target Date</Label>
                      <Input
                        id="targetDate"
                        type="date"
                        value={formData.targetDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, targetDate: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Asset Allocation (%)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="liquid">Liquid Funds</Label>
                        <Input
                          id="liquid"
                          type="number"
                          min="0"
                          max="100"
                          value={formData.allocation.liquid_fund}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            allocation: { ...prev.allocation, liquid_fund: Number(e.target.value) }
                          }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="equity">Equity Funds</Label>
                        <Input
                          id="equity"
                          type="number"
                          min="0"
                          max="100"
                          value={formData.allocation.equity_fund}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            allocation: { ...prev.allocation, equity_fund: Number(e.target.value) }
                          }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="gold">Digital Gold</Label>
                        <Input
                          id="gold"
                          type="number"
                          min="0"
                          max="100"
                          value={formData.allocation.digital_gold}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            allocation: { ...prev.allocation, digital_gold: Number(e.target.value) }
                          }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="impact">Impact Funds</Label>
                        <Input
                          id="impact"
                          type="number"
                          min="0"
                          max="100"
                          value={formData.allocation.impact_fund}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            allocation: { ...prev.allocation, impact_fund: Number(e.target.value) }
                          }))}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={isEditing ? handleUpdateGoal : handleCreateGoal}>
                      {isEditing ? 'Update Goal' : 'Create Goal'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Overall Progress */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Overall Progress
              </CardTitle>
              <CardDescription>
                Track your progress across all savings goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{goals.length}</div>
                  <p className="text-sm text-gray-600">Active Goals</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">₹{totalCurrentAmount.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Total Saved</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{overallProgress.toFixed(1)}%</div>
                  <p className="text-sm text-gray-600">Overall Progress</p>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>₹{totalCurrentAmount.toLocaleString()} / ₹{totalTargetAmount.toLocaleString()}</span>
                </div>
                <Progress value={overallProgress} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Goals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => {
              const categoryInfo = getCategoryInfo(goal.category)
              const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount)
              const daysRemaining = getDaysRemaining(goal.targetDate)
              const Icon = categoryInfo.icon
              
              return (
                <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${categoryInfo.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <CardTitle className="text-lg">{goal.name}</CardTitle>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => handleEditGoal(goal)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteGoal(goal.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription>{categoryInfo.name}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{progress.toFixed(1)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>₹{goal.currentAmount.toLocaleString()}</span>
                        <span>₹{goal.targetAmount.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{daysRemaining} days left</span>
                      </div>
                      <Badge variant={progress >= 75 ? "default" : "secondary"}>
                        {progress >= 75 ? "On Track" : progress >= 50 ? "Good" : "Needs Attention"}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-700">Asset Allocation</p>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        <div className="flex justify-between">
                          <span>Liquid:</span>
                          <span>{goal.allocation.liquid_fund}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Equity:</span>
                          <span>{goal.allocation.equity_fund}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Gold:</span>
                          <span>{goal.allocation.digital_gold}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Impact:</span>
                          <span>{goal.allocation.impact_fund}%</span>
                        </div>
                      </div>
                    </div>
                    
                    {progress >= 100 && (
                      <div className="flex items-center justify-center p-2 bg-green-50 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-green-700">Goal Achieved!</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
          
          {goals.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Goals Yet</h3>
                <p className="text-gray-600 mb-4">Create your first savings goal to start tracking your progress</p>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Goal
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}