'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft, 
  User, 
  Settings, 
  Shield, 
  Bell, 
  CreditCard, 
  Award,
  Star,
  Edit,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Target,
  TrendingUp,
  Badge as BadgeIcon,
  LogOut,
  Save,
  Eye,
  EyeOff
} from 'lucide-react'

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  upiId: string
  isVerified: boolean
  isPremium: boolean
  premiumExpiresAt?: string
  joinedAt: string
  lastLogin: string
  kycStatus: 'pending' | 'verified' | 'rejected'
  badges: Array<{
    id: string
    name: string
    description: string
    icon: string
    earnedAt: string
  }>
  stats: {
    totalInvested: number
    totalReturns: number
    goalsCompleted: number
    referralCount: number
  }
}

interface SecuritySettings {
  twoFactorEnabled: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  biometricEnabled: boolean
}

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const router = useRouter()

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    upiId: ''
  })

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    emailNotifications: true,
    smsNotifications: true,
    biometricEnabled: false
  })

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
      
      // Mock profile data
      const mockProfile: UserProfile = {
        id: parsedUser.id,
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@email.com',
        phone: '+91 98765 43210',
        upiId: 'rajesh@roundupi',
        isVerified: true,
        isPremium: true,
        premiumExpiresAt: '2024-12-31',
        joinedAt: '2023-06-15',
        lastLogin: '2024-01-15',
        kycStatus: 'verified',
        badges: [
          {
            id: '1',
            name: 'Early Adopter',
            description: 'Joined in the first month',
            icon: '🚀',
            earnedAt: '2023-06-15'
          },
          {
            id: '2',
            name: 'Goal Crusher',
            description: 'Completed 5 savings goals',
            icon: '🎯',
            earnedAt: '2023-12-01'
          },
          {
            id: '3',
            name: 'Premium Member',
            description: 'Upgraded to Premium',
            icon: '⭐',
            earnedAt: '2023-08-20'
          }
        ],
        stats: {
          totalInvested: 12450,
          totalReturns: 760,
          goalsCompleted: 3,
          referralCount: 5
        }
      }

      setProfileData({
        name: mockProfile.name,
        email: mockProfile.email,
        phone: mockProfile.phone,
        upiId: mockProfile.upiId
      })
    } catch (error) {
      console.error('Error parsing user data:', error)
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleSaveProfile = async () => {
    setIsSaving(true)
    setSuccess('')
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setSuccess('Profile updated successfully!')
      setIsEditing(false)
      
      // Update user data
      if (user) {
        const updatedUser = { ...user, ...profileData }
        setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }
    } catch (err) {
      setError('Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    router.push('/login')
  }

  const getKYCStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            </div>
            <div className="flex items-center space-x-4">
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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Profile Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                        <AvatarFallback className="text-2xl">{profileData.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h2 className="text-2xl font-bold">{profileData.name}</h2>
                        {user?.isPremium && (
                          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 mb-1">{profileData.email}</p>
                      <p className="text-gray-600 mb-3">{profileData.phone}</p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-500">Joined June 2023</span>
                        </div>
                        <Badge className={getKYCStatusColor('verified')}>
                          <Shield className="h-3 w-3 mr-1" />
                          KYC Verified
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹12,450</div>
                    <p className="text-xs text-muted-foreground">Lifetime investment</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">₹760</div>
                    <p className="text-xs text-muted-foreground">+6.1% returns</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">Achievements</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Referrals</CardTitle>
                    <BadgeIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">Friends invited</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and account management</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <CreditCard className="h-6 w-6" />
                      <span className="text-sm">Payment Methods</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <Shield className="h-6 w-6" />
                      <span className="text-sm">KYC Status</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <Bell className="h-6 w-6" />
                      <span className="text-sm">Notifications</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <Star className="h-6 w-6" />
                      <span className="text-sm">Premium</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Personal Information</CardTitle>
                    <Button 
                      variant={isEditing ? "outline" : "default"}
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? (
                        <>
                          <Eye className="h-4 w-4 mr-2" />
                          View Mode
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="upi">UPI ID</Label>
                      <Input
                        id="upi"
                        value={profileData.upiId}
                        onChange={(e) => setProfileData(prev => ({ ...prev, upiId: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile} disabled={isSaving}>
                        {isSaving ? (
                          <>
                            <Save className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Account Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>Email Verification</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>Phone Verification</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-gray-400" />
                      <span>KYC Status</span>
                    </div>
                    <Badge className={getKYCStatusColor('verified')}>Verified</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-gray-400" />
                      <span>Premium Status</span>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">Active</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-600">Receive security alerts via email</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-gray-600">Receive security alerts via SMS</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Biometric Authentication</Label>
                        <p className="text-sm text-gray-600">Use fingerprint or face recognition</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your account password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="show-password"
                      checked={showPassword}
                      onChange={(e) => setShowPassword(e.target.checked)}
                    />
                    <Label htmlFor="show-password" className="text-sm">Show password</Label>
                  </div>
                  
                  <Button className="w-full">Change Password</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="badges" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Achievements</CardTitle>
                  <CardDescription>Badges and rewards you've earned on your investment journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        name: 'Early Adopter',
                        description: 'Joined RoundUPI in the first month',
                        icon: '🚀',
                        earnedAt: '2023-06-15',
                        rarity: 'legendary'
                      },
                      {
                        name: 'Goal Crusher',
                        description: 'Completed 5 savings goals',
                        icon: '🎯',
                        earnedAt: '2023-12-01',
                        rarity: 'epic'
                      },
                      {
                        name: 'Premium Member',
                        description: 'Upgraded to Premium subscription',
                        icon: '⭐',
                        earnedAt: '2023-08-20',
                        rarity: 'rare'
                      },
                      {
                        name: 'Consistent Saver',
                        description: 'Saved for 30 consecutive days',
                        icon: '💰',
                        earnedAt: '2023-07-15',
                        rarity: 'common'
                      },
                      {
                        name: 'Social Butterfly',
                        description: 'Referred 5 friends to RoundUPI',
                        icon: '🦋',
                        earnedAt: '2023-09-10',
                        rarity: 'uncommon'
                      },
                      {
                        name: 'Knowledge Seeker',
                        description: 'Completed 10 educational courses',
                        icon: '📚',
                        earnedAt: '2023-11-20',
                        rarity: 'rare'
                      }
                    ].map((badge, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardHeader className="text-center">
                          <div className="text-4xl mb-2">{badge.icon}</div>
                          <CardTitle className="text-lg">{badge.name}</CardTitle>
                          <CardDescription>{badge.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center">
                            <Badge 
                              className={
                                badge.rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                                badge.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                                badge.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                                badge.rarity === 'uncommon' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                              }
                            >
                              {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-2">
                              Earned on {new Date(badge.earnedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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