'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Settings, 
  Save, 
  RefreshCw, 
  Shield, 
  Bell,
  DollarSign,
  Target,
  Coffee,
  ShoppingBag,
  Car,
  Home,
  Utensils,
  Smartphone
} from 'lucide-react'

interface RoundUpSettings {
  id: string
  userId: string
  roundingRule: string
  maxDailyAmount: number
  isActive: boolean
  skipCategories: string[]
}

interface Category {
  id: string
  name: string
  icon: any
  color: string
}

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState<RoundUpSettings>({
    id: '',
    userId: '',
    roundingRule: 'nearest_10',
    maxDailyAmount: 100,
    isActive: true,
    skipCategories: ['rent']
  })
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const categories: Category[] = [
    { id: 'dining', name: 'Dining', icon: Coffee, color: 'bg-blue-100 text-blue-800' },
    { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: 'bg-green-100 text-green-800' },
    { id: 'transport', name: 'Transport', icon: Car, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'groceries', name: 'Groceries', icon: Utensils, color: 'bg-purple-100 text-purple-800' },
    { id: 'rent', name: 'Rent', icon: Home, color: 'bg-red-100 text-red-800' },
    { id: 'utilities', name: 'Utilities', icon: Smartphone, color: 'bg-indigo-100 text-indigo-800' }
  ]

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/login')
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      
      // Mock settings data
      const mockSettings: RoundUpSettings = {
        id: '1',
        userId: parsedUser.id,
        roundingRule: 'nearest_10',
        maxDailyAmount: 100,
        isActive: true,
        skipCategories: ['rent']
      }
      setSettings(mockSettings)
    } catch (error) {
      console.error('Error parsing user data:', error)
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleSave = async () => {
    setIsSaving(true)
    setSuccess('')
    setError('')

    try {
      const response = await fetch('/api/settings/roundup', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(settings)
      })

      if (response.ok) {
        setSuccess('Settings saved successfully!')
      } else {
        setError('Failed to save settings')
      }
    } catch (err) {
      setError('An error occurred while saving settings')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCategoryToggle = (categoryId: string) => {
    setSettings(prev => ({
      ...prev,
      skipCategories: prev.skipCategories.includes(categoryId)
        ? prev.skipCategories.filter(cat => cat !== categoryId)
        : [...prev.skipCategories, categoryId]
    }))
  }

  const getRoundingRuleDescription = (rule: string) => {
    switch (rule) {
      case 'nearest_1':
        return 'Round to nearest ₹1 (e.g., ₹93.50 → ₹94)'
      case 'nearest_5':
        return 'Round to nearest ₹5 (e.g., ₹93 → ₹95)'
      case 'nearest_10':
        return 'Round to nearest ₹10 (e.g., ₹93 → ₹100)'
      default:
        return 'Round to nearest ₹10'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Round-Up Settings</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={handleSave} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Settings'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
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

          {/* Round-Up Settings */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Round-Up Rules
              </CardTitle>
              <CardDescription>
                Configure how your transactions are rounded up for investment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="roundingRule">Rounding Rule</Label>
                <Select 
                  value={settings.roundingRule} 
                  onValueChange={(value) => setSettings(prev => ({ ...prev, roundingRule: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rounding rule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nearest_1">Round to nearest ₹1</SelectItem>
                    <SelectItem value="nearest_5">Round to nearest ₹5</SelectItem>
                    <SelectItem value="nearest_10">Round to nearest ₹10</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-600">{getRoundingRuleDescription(settings.roundingRule)}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxDailyAmount">Maximum Daily Round-Up Amount</Label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">₹</span>
                  <Input
                    id="maxDailyAmount"
                    type="number"
                    min="0"
                    max="1000"
                    value={settings.maxDailyAmount}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      maxDailyAmount: Number(e.target.value) 
                    }))}
                    className="w-32"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  We'll stop rounding up once you reach this amount in a single day
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Round-Ups</Label>
                  <p className="text-sm text-gray-600">Turn round-ups on or off</p>
                </div>
                <Switch
                  checked={settings.isActive}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, isActive: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Skip Categories */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="h-5 w-5 mr-2" />
                Skip Categories
              </CardTitle>
              <CardDescription>
                Select categories to skip from round-up calculations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category) => {
                  const Icon = category.icon
                  const isSkipped = settings.skipCategories.includes(category.id)
                  
                  return (
                    <div
                      key={category.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        isSkipped 
                          ? 'border-red-200 bg-red-50' 
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                      onClick={() => handleCategoryToggle(category.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${category.color}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{category.name}</p>
                            <p className="text-sm text-gray-500">
                              {isSkipped ? 'Will be skipped' : 'Will be rounded up'}
                            </p>
                          </div>
                        </div>
                        <Badge variant={isSkipped ? "destructive" : "secondary"}>
                          {isSkipped ? 'Skipped' : 'Active'}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Transactions in skipped categories won't be rounded up. Rent is typically skipped by default.
              </p>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Round-Up Preview
              </CardTitle>
              <CardDescription>
                See how your settings will affect real transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Coffee Shop</span>
                      <Badge className="bg-blue-100 text-blue-800">Dining</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Original: ₹87.50</p>
                      <p>Rounded: ₹{settings.roundingRule === 'nearest_1' ? '88' : settings.roundingRule === 'nearest_5' ? '90' : '90'}</p>
                      <p className="font-medium text-green-600">
                        Round-up: ₹{settings.roundingRule === 'nearest_1' ? '0.50' : settings.roundingRule === 'nearest_5' ? '2.50' : '2.50'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Grocery Store</span>
                      <Badge className="bg-purple-100 text-purple-800">Groceries</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Original: ₹342.75</p>
                      <p>Rounded: ₹{settings.roundingRule === 'nearest_1' ? '343' : settings.roundingRule === 'nearest_5' ? '345' : '350'}</p>
                      <p className="font-medium text-green-600">
                        Round-up: ₹{settings.roundingRule === 'nearest_1' ? '0.25' : settings.roundingRule === 'nearest_5' ? '2.25' : '7.25'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Rent Payment</span>
                    <Badge className="bg-red-100 text-red-800">Rent</Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Original: ₹12,500.00</p>
                    <p className="font-medium text-red-600">Will be skipped (no round-up)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Security & Control</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Your round-up settings are securely stored and you can modify them at any time. 
                  We'll never round up a transaction without your explicit consent through these settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}