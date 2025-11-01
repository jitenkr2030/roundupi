import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Check if phone already exists
    if (phone) {
      const existingPhone = await db.user.findUnique({
        where: { phone }
      })

      if (existingPhone) {
        return NextResponse.json(
          { message: 'User with this phone number already exists' },
          { status: 409 }
        )
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await db.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        isVerified: false
      },
      include: {
        portfolio: true,
        roundUpSettings: true,
        kyc: true
      }
    })

    // Create default portfolio
    await db.portfolio.create({
      data: {
        userId: user.id,
        totalInvested: 0,
        currentValue: 0,
        totalReturns: 0,
        returnPercentage: 0
      }
    })

    // Create default round-up settings
    await db.roundUpSettings.create({
      data: {
        userId: user.id,
        roundingRule: 'nearest_10',
        maxDailyAmount: 100,
        isActive: true,
        skipCategories: JSON.stringify(['rent']) // Skip rent payments by default
      }
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    // Create a simple token (in production, use JWT)
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64')

    return NextResponse.json({
      message: 'Account created successfully',
      token,
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'An error occurred during signup' },
      { status: 500 }
    )
  }
}