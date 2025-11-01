# RoundUPI Integration Guide

## Current Status Analysis

### ✅ What's Been Built:
1. **Web Frontend** (Next.js 15 + TypeScript)
   - Complete responsive web application
   - 12+ pages with all features
   - Modern UI with shadcn/ui components
   - TypeScript for type safety

2. **Backend API** (Node.js + Express + Prisma)
   - RESTful API endpoints
   - Database schema with 10+ models
   - Authentication system
   - CRUD operations for all entities

3. **Mobile App** (React Native + Expo)
   - Existing mobile app structure
   - Screen components for all features
   - Navigation setup
   - Basic UI components

### 🔄 Integration Status:
- **Database**: ✅ Shared (SQLite with Prisma)
- **API Layer**: ✅ Common backend for web and mobile
- **Authentication**: ✅ Shared auth system
- **Real-time**: ✅ Socket.io integration ready
- **Data Models**: ✅ Consistent across all platforms

## Integration Implementation

### 1. Shared API Integration

The web frontend and mobile app will use the same backend API. Here's how to integrate:

#### Web Integration (Already Implemented):
```typescript
// Example from login page
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})
```

#### Mobile Integration (React Native):
```javascript
// Add to mobile app screens
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Login Screen Integration
const handleLogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password
    });
    
    // Store token and navigate
    await AsyncStorage.setItem('authToken', response.data.token);
    navigation.navigate('Home');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### 2. Database Integration

Both web and mobile use the same Prisma database schema:

```prisma
// Shared schema (already implemented)
model User {
  id                String   @id @default(cuid())
  email             String   @unique
  name              String?
  phone             String?  @unique
  password          String?
  isVerified        Boolean  @default(false)
  isPremium         Boolean  @default(false)
  // ... other fields
}
```

### 3. Real-time Integration with Socket.io

#### Web Integration:
```typescript
// Already in src/lib/socket.ts
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

// Listen for real-time updates
socket.on('transaction-update', (data) => {
  // Update UI in real-time
});
```

#### Mobile Integration:
```javascript
// Add to mobile app
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

// Real-time transaction updates
socket.on('transaction-update', (data) => {
  // Update mobile UI
  Alert.alert('New Transaction', `₹${data.amount} rounded up`);
});
```

## Complete Integration Steps

### Step 1: Mobile App API Integration

Create a shared API service for the mobile app:

```javascript
// roundupi/services/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
});

// Request interceptor for auth
API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for errors
API.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error);
  }
);

export default API;
```

### Step 2: Update Mobile Screens

#### LoginScreen.js Update:
```javascript
// roundupi/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import API from '../services/api';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await API.post('/auth/login', { email, password });
      
      // Store credentials
      await AsyncStorage.setItem('authToken', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button 
        title={loading ? "Logging in..." : "Login"} 
        onPress={handleLogin}
        disabled={loading}
      />
    </View>
  );
};

export default LoginScreen;
```

### Step 3: Shared State Management

#### Web State (Zustand):
```typescript
// src/store/userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: any | null;
  setUser: (user: any) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);
```

#### Mobile State (React Context):
```javascript
// roundupi/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
    AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.multiRemove(['authToken', 'user']);
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
```

### Step 4: Real-time Features Integration

#### Web Real-time Updates:
```typescript
// src/hooks/useRealTimeUpdates.ts
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useUserStore } from '@/store/userStore';

export const useRealTimeUpdates = () => {
  const { user } = useUserStore();

  useEffect(() => {
    if (!user) return;

    const socket = io('http://localhost:3000');
    
    socket.on('connect', () => {
      console.log('Connected to real-time updates');
      socket.emit('join-user-room', user.id);
    });

    socket.on('transaction-update', (data) => {
      // Update transaction list
      // Show notification
    });

    socket.on('portfolio-update', (data) => {
      // Update portfolio values
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);
};
```

#### Mobile Real-time Updates:
```javascript
// roundupi/hooks/useRealTimeUpdates.js
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useUser } from '../context/UserContext';

export const useRealTimeUpdates = () => {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const socket = io('http://localhost:3000');
    
    socket.on('connect', () => {
      console.log('Mobile connected to real-time updates');
      socket.emit('join-user-room', user.id);
    });

    socket.on('transaction-update', (data) => {
      // Show mobile notification
      Alert.alert('New Round-up', `₹${data.amount} invested`);
    });

    socket.on('portfolio-update', (data) => {
      // Update mobile portfolio UI
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);
};
```

### Step 5: Navigation Integration

#### Web Navigation:
```typescript
// Already implemented in Next.js App Router
// Pages are automatically routed
```

#### Mobile Navigation:
```javascript
// Update mobile navigation to match web structure
// roundupi/navigation/MainNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import InvestmentsScreen from '../screens/InvestmentsScreen';
import GoalsScreen from '../screens/GoalsScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen 
        name="Transactions" 
        component={TransactionsScreen}
        options={{ tabBarLabel: 'Transactions' }}
      />
      <Tab.Screen 
        name="Investments" 
        component={InvestmentsScreen}
        options={{ tabBarLabel: 'Investments' }}
      />
      <Tab.Screen 
        name="Goals" 
        component={GoalsScreen}
        options={{ tabBarLabel: 'Goals' }}
      />
      <Tab.Screen 
        name="Analytics" 
        component={AnalyticsScreen}
        options={{ tabBarLabel: 'Analytics' }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Main" 
        component={MainTabs} 
        options={{ headerShown: false }}
      />
      {/* Other screens */}
    </Stack.Navigator>
  );
};

export default MainNavigator;
```

## Testing the Integration

### 1. Start the Backend:
```bash
cd /home/z/my-project
npm run dev
```

### 2. Test Web Frontend:
- Open http://localhost:3000
- Test login, dashboard, transactions, etc.

### 3. Test Mobile App:
```bash
cd /home/z/my-project/roundupi
npm start
```

### 4. Test Real-time Features:
- Make transactions in web app
- Check mobile app for real-time notifications
- Verify data consistency across platforms

## Benefits of This Integration

### ✅ **Single Source of Truth**
- One database for all platforms
- Consistent data models
- Shared business logic

### ✅ **Real-time Synchronization**
- Instant updates across web and mobile
- Socket.io for real-time features
- Consistent user experience

### ✅ **Shared Authentication**
- Single login system
- JWT tokens work across platforms
- Consistent security measures

### ✅ **Unified API**
- One backend to maintain
- Consistent endpoints
- Easier testing and debugging

### ✅ **Scalability**
- Easy to add new platforms
- Shared codebase reduces duplication
- Centralized business logic

## Next Steps

1. **Deploy Backend**: Deploy the Node.js backend to a cloud service
2. **Build Mobile Apps**: Build and deploy to app stores
3. **Add Push Notifications**: Implement mobile push notifications
4. **Add Offline Support**: Add offline capabilities to mobile app
5. **Performance Testing**: Test with multiple concurrent users
6. **Security Audit**: Conduct security review

This integration provides a complete, unified RoundUPI experience across web and mobile platforms with shared backend, real-time features, and consistent user experience.