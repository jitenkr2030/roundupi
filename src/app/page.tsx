'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ArrowUpRight, TrendingUp, PiggyBank, Target, Shield, Star, Users, BookOpen, Bell, Settings, Plus } from 'lucide-react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">RoundUPI</h1>
              </div>
              <nav className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Investments</a>
                <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Goals</a>
                <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Analytics</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">Login</Button>
              <Button size="sm">Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Transform Your Daily Spending</span>
            <span className="block text-blue-600 mt-2">Into Smart Investments</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            RoundUPI automatically rounds up your UPI transactions and invests the difference. 
            Start building wealth with every payment you make.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started Free
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900">Your Investment Dashboard</h3>
            <p className="mt-4 text-lg text-gray-600">Track your round-ups and watch your wealth grow</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹12,450</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Value</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
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

          {/* Goals Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              </CardContent>
            </Card>

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
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900">Why Choose RoundUPI?</h3>
            <p className="mt-4 text-lg text-gray-600">Smart features designed for Indian investors</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <PiggyBank className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Smart Round-Up Engine</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Auto-round transactions to nearest ₹1/₹5/₹10. Set custom rules and limits for complete control.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Diverse Investment Options</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Invest in liquid funds, equity ETFs, digital gold, and impact funds. All SEBI-compliant.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Goal-Based Investing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create specific goals and auto-allocate round-ups. Track progress with visual indicators.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Bank-Grade Security</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  End-to-end encryption, biometric authentication, and SEBI/RBI compliance.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Premium Features</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Advanced analytics, 50+ mutual funds, priority support, and tax optimization.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Community & Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Earn badges, participate in forums, and get rewarded for referrals and achievements.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white">Ready to Start Your Investment Journey?</h3>
          <p className="mt-4 text-xl text-blue-100">
            Join thousands of Indians who are building wealth one round-up at a time.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" variant="secondary">
              Sign Up Free
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">RoundUPI</h4>
              <p className="text-gray-400 text-sm">
                Transform daily spending into smart investments with India's leading micro-investment platform.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">How it Works</a></li>
                <li><a href="#" className="hover:text-white">Investment Options</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Compliance</a></li>
                <li><a href="#" className="hover:text-white">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>&copy; 2024 RoundUPI. All rights reserved. SEBI Registered. RBI Compliant.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}