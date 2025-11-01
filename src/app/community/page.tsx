'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  ArrowLeft, 
  Users, 
  MessageSquare, 
  BookOpen, 
  TrendingUp, 
  Award,
  Search,
  Plus,
  Heart,
  Share2,
  Bookmark,
  Filter,
  Calendar,
  Eye,
  Star,
  Clock,
  User,
  GraduationCap,
  Lightbulb,
  Target,
  Shield
} from 'lucide-react'

interface ForumPost {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
    level: string
  }
  category: string
  tags: string[]
  likes: number
  replies: number
  views: number
  createdAt: string
  isTrending?: boolean
  isFeatured?: boolean
}

interface EducationalResource {
  id: string
  title: string
  description: string
  type: 'article' | 'video' | 'course' | 'guide'
  category: string
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  author: string
  rating: number
  enrolled: number
  thumbnail: string
}

interface CommunityMember {
  id: string
  name: string
  avatar: string
  level: string
  badges: string[]
  joinedAt: string
  contributions: number
}

export default function CommunityPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('forum')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const router = useRouter()

  const forumPosts: ForumPost[] = [
    {
      id: '1',
      title: 'How I saved ₹50,000 in 6 months using RoundUPI',
      content: 'I wanted to share my success story with the community. Using the round-up feature consistently...',
      author: {
        name: 'Rajesh Kumar',
        avatar: 'https://i.pravatar.cc/150?img=1',
        level: 'Gold Member'
      },
      category: 'success-stories',
      tags: ['success', 'saving-tips', 'roundup'],
      likes: 156,
      replies: 23,
      views: 1205,
      createdAt: '2024-01-15',
      isTrending: true,
      isFeatured: true
    },
    {
      id: '2',
      title: 'Best mutual funds for long-term investment in 2024',
      content: 'Looking for recommendations on equity mutual funds for long-term investment. Any suggestions?',
      author: {
        name: 'Priya Sharma',
        avatar: 'https://i.pravatar.cc/150?img=2',
        level: 'Silver Member'
      },
      category: 'investment-advice',
      tags: ['mutual-funds', 'long-term', 'equity'],
      likes: 89,
      replies: 45,
      views: 856,
      createdAt: '2024-01-14'
    },
    {
      id: '3',
      title: 'Tax saving strategies with ELSS funds',
      content: 'Can someone explain how ELSS funds help in tax saving under Section 80C?',
      author: {
        name: 'Amit Patel',
        avatar: 'https://i.pravatar.cc/150?img=3',
        level: 'Bronze Member'
      },
      category: 'tax-planning',
      tags: ['tax-saving', 'elss', 'section-80c'],
      likes: 67,
      replies: 31,
      views: 623,
      createdAt: '2024-01-13'
    }
  ]

  const educationalResources: EducationalResource[] = [
    {
      id: '1',
      title: 'Complete Guide to Mutual Fund Investing',
      description: 'Learn everything about mutual funds, from basics to advanced strategies',
      type: 'course',
      category: 'investing-basics',
      duration: '2 hours',
      difficulty: 'beginner',
      author: 'RoundUPI Team',
      rating: 4.8,
      enrolled: 2541,
      thumbnail: '/course1.jpg'
    },
    {
      id: '2',
      title: 'Understanding Risk and Return',
      description: 'Master the concepts of investment risk and how to balance it with returns',
      type: 'video',
      category: 'risk-management',
      duration: '15 minutes',
      difficulty: 'intermediate',
      author: 'Dr. Sarah Johnson',
      rating: 4.6,
      enrolled: 1876,
      thumbnail: '/video1.jpg'
    },
    {
      id: '3',
      title: 'Tax Planning for Investors',
      description: 'Comprehensive guide to tax-efficient investing in India',
      type: 'guide',
      category: 'tax-planning',
      duration: '30 minutes',
      difficulty: 'advanced',
      author: 'CA Rajiv Mehta',
      rating: 4.9,
      enrolled: 3120,
      thumbnail: '/guide1.jpg'
    }
  ]

  const communityMembers: CommunityMember[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      avatar: 'https://i.pravatar.cc/150?img=1',
      level: 'Gold Member',
      badges: ['Top Contributor', 'Helpful', 'Expert'],
      joinedAt: '2023-06-15',
      contributions: 156
    },
    {
      id: '2',
      name: 'Priya Sharma',
      avatar: 'https://i.pravatar.cc/150?img=2',
      level: 'Silver Member',
      badges: ['Rising Star', 'Knowledgeable'],
      joinedAt: '2023-08-20',
      contributions: 89
    },
    {
      id: '3',
      name: 'Amit Patel',
      avatar: 'https://i.pravatar.cc/150?img=3',
      level: 'Bronze Member',
      badges: ['Newbie'],
      joinedAt: '2024-01-10',
      contributions: 23
    }
  ]

  const categories = [
    { id: 'all', name: 'All Topics', icon: MessageSquare },
    { id: 'success-stories', name: 'Success Stories', icon: TrendingUp },
    { id: 'investment-advice', name: 'Investment Advice', icon: Target },
    { id: 'tax-planning', name: 'Tax Planning', icon: BookOpen },
    { id: 'market-news', name: 'Market News', icon: TrendingUp },
    { id: 'tips-tricks', name: 'Tips & Tricks', icon: Lightbulb }
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

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.icon : MessageSquare
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Gold Member':
        return 'bg-yellow-100 text-yellow-800'
      case 'Silver Member':
        return 'bg-gray-100 text-gray-800'
      case 'Bronze Member':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading community...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Community</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Community Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Community Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,543</div>
                <p className="text-xs text-muted-foreground">Active investors</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Forum Posts</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,847</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resources</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">Educational content</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Stories</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">892</div>
                <p className="text-xs text-muted-foreground">Shared achievements</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="forum">Forum</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
            </TabsList>

            <TabsContent value="forum" className="space-y-6">
              {/* Category Filter */}
              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => {
                      const Icon = category.icon
                      return (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category.id)}
                          className="flex items-center space-x-2"
                        >
                          <Icon className="h-4 w-4" />
                          <span>{category.name}</span>
                        </Button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Forum Posts */}
              <div className="space-y-4">
                {forumPosts.map((post) => {
                  const CategoryIcon = getCategoryIcon(post.category)
                  return (
                    <Card key={post.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              {post.isFeatured && (
                                <Badge className="bg-purple-100 text-purple-800">
                                  <Star className="h-3 w-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                              {post.isTrending && (
                                <Badge className="bg-orange-100 text-orange-800">
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                  Trending
                                </Badge>
                              )}
                              <Badge className="bg-blue-100 text-blue-800">
                                <CategoryIcon className="h-3 w-3 mr-1" />
                                {categories.find(cat => cat.id === post.category)?.name}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
                            <CardDescription className="line-clamp-2">{post.content}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={post.author.avatar} />
                                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{post.author.name}</p>
                                <Badge className={getLevelColor(post.author.level)} variant="outline">
                                  {post.author.level}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{post.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="h-3 w-3" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{post.replies}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-3">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="education" className="space-y-6">
              {/* Educational Resources */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {educationalResources.map((resource) => (
                  <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getDifficultyColor(resource.difficulty)}>
                          {resource.difficulty.charAt(0).toUpperCase() + resource.difficulty.slice(1)}
                        </Badge>
                        <Badge variant="outline">
                          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Duration:</span>
                          <span>{resource.duration}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Author:</span>
                          <span>{resource.author}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Rating:</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span>{resource.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Enrolled:</span>
                          <span>{resource.enrolled.toLocaleString()} students</span>
                        </div>
                        
                        <Button className="w-full mt-4">
                          <GraduationCap className="h-4 w-4 mr-2" />
                          Start Learning
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="members" className="space-y-6">
              {/* Community Members */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communityMembers.map((member) => (
                  <Card key={member.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{member.name}</CardTitle>
                          <Badge className={getLevelColor(member.level)} variant="outline">
                            {member.level}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Joined:</span>
                          <span>{new Date(member.joinedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Contributions:</span>
                          <span>{member.contributions}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Badges:</p>
                          <div className="flex flex-wrap gap-1">
                            {member.badges.map((badge, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Message
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <User className="h-3 w-3 mr-1" />
                            Profile
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}