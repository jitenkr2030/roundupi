import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(request: NextRequest) {
  try {
    const { roundingRule, maxDailyAmount, isActive, skipCategories } = await request.json()

    // Validate input
    if (!roundingRule || maxDailyAmount === undefined || isActive === undefined) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate rounding rule
    const validRoundingRules = ['nearest_1', 'nearest_5', 'nearest_10']
    if (!validRoundingRules.includes(roundingRule)) {
      return NextResponse.json(
        { message: 'Invalid rounding rule' },
        { status: 400 }
      )
    }

    // Validate max daily amount
    if (maxDailyAmount < 0 || maxDailyAmount > 1000) {
      return NextResponse.json(
        { message: 'Max daily amount must be between 0 and 1000' },
        { status: 400 }
      )
    }

    // For demo purposes, we'll use a fixed user ID
    // In production, you'd get this from the authenticated user
    const userId = 'demo-user-id'

    // Update or create round-up settings
    const settings = await db.roundUpSettings.upsert({
      where: { userId },
      create: {
        userId,
        roundingRule,
        maxDailyAmount,
        isActive,
        skipCategories: JSON.stringify(skipCategories || [])
      },
      update: {
        roundingRule,
        maxDailyAmount,
        isActive,
        skipCategories: JSON.stringify(skipCategories || [])
      }
    })

    return NextResponse.json({
      message: 'Settings updated successfully',
      settings: {
        ...settings,
        skipCategories: JSON.parse(settings.skipCategories)
      }
    })

  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json(
      { message: 'An error occurred while updating settings' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // For demo purposes, we'll use a fixed user ID
    // In production, you'd get this from the authenticated user
    const userId = 'demo-user-id'

    const settings = await db.roundUpSettings.findUnique({
      where: { userId }
    })

    if (!settings) {
      return NextResponse.json(
        { message: 'Settings not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      settings: {
        ...settings,
        skipCategories: JSON.parse(settings.skipCategories)
      }
    })

  } catch (error) {
    console.error('Settings fetch error:', error)
    return NextResponse.json(
      { message: 'An error occurred while fetching settings' },
      { status: 500 }
    )
  }
}