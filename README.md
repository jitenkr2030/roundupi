# RoundUPI - Complete Web & Mobile Application

A comprehensive micro-investment platform that automatically rounds up UPI transactions and invests the difference, available as both web and mobile applications.

## 🚀 **Project Overview**

RoundUPI transforms daily spending into smart investments through automatic round-ups. Users can connect their UPI transactions, set customizable rounding rules, and invest in diverse asset classes including liquid funds, equity ETFs, digital gold, and impact funds.

## 📱 **Applications**

### **Web Application** (Next.js 15 + TypeScript)
- **Homepage**: Feature-rich landing page with dashboard preview
- **Authentication**: Secure login/signup with JWT tokens
- **Dashboard**: Real-time portfolio overview and statistics
- **Transactions**: Complete transaction history with filtering
- **Settings**: Customizable round-up rules and preferences
- **Investments**: Portfolio management and asset allocation
- **Goals**: Savings goal creation and tracking
- **Analytics**: Performance metrics and risk analysis
- **Premium**: Subscription management and exclusive features
- **Community**: Forum and educational resources
- **Profile**: User account management

### **Mobile Application** (React Native + Expo)
- **Cross-platform**: Works on both iOS and Android
- **Native Features**: Push notifications, biometric authentication
- **Real-time Updates**: Live transaction and portfolio updates
- **Offline Support**: Basic functionality without internet
- **Same Features**: Parity with web application features

## 🏗️ **Architecture**

### **Backend** (Node.js + Express + Prisma)
- **API Layer**: RESTful endpoints for all operations
- **Database**: SQLite with comprehensive schema (10+ models)
- **Authentication**: JWT-based with bcrypt password hashing
- **Real-time**: Socket.io for live updates
- **Security**: Input validation, error handling, rate limiting

### **Shared Components**
- **Database**: Single SQLite database for all platforms
- **API**: Common backend serving web and mobile
- **Authentication**: Shared auth system across platforms
- **Real-time**: Socket.io integration for instant updates
- **Business Logic**: Centralized in backend services

## 📊 **Key Features**

### **Smart Round-Up Engine**
- **Adaptive Rounding**: Auto-round to nearest ₹1/₹5/₹10
- **Custom Rules**: Create personalized rounding preferences
- **Transaction Detection**: Sync with UPI apps via SMS/bank APIs
- **Round-Up Preview**: Confirm before investing

### **Investment Hub**
- **Diverse Assets**: Liquid funds, equity ETFs, digital gold, impact funds
- **Goal-Based Buckets**: Auto-allocate round-ups to specific goals
- **Auto-Rebalancing**: Quarterly portfolio optimization
- **Instant Redemption**: Quick access to funds

### **UPI Integration**
- **Custom UPI ID**: `@roundupi` for payments
- **Bill Payments**: AutoPay + round-up for utilities
- **Merchant Network**: QR code payments with cashback

### **Analytics & Insights**
- **Portfolio Snapshot**: Real-time value and returns
- **Goal Tracker**: Visual progress indicators
- **Spending Insights**: Analysis of saving opportunities
- **Risk Metrics**: Volatility, Sharpe ratio, diversification

### **Premium Features**
- **Advanced Analytics**: Portfolio heat maps, sector allocation
- **50+ Mutual Funds**: Extended investment options
- **Priority Support**: Dedicated relationship manager
- **Tax Optimization**: ELSS recommendations and tax saving

## 🛠️ **Technology Stack**

### **Frontend**
- **Web**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Mobile**: React Native, Expo, Native Base
- **State Management**: Zustand (web), React Context (mobile)
- **Charts**: Recharts (web), React Native Chart Kit (mobile)

### **Backend**
- **Runtime**: Node.js, Express.js
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT, bcryptjs
- **Real-time**: Socket.io
- **Validation**: Zod schemas

### **DevOps**
- **Package Manager**: npm
- **Code Quality**: ESLint, TypeScript
- **Database Migrations**: Prisma
- **Testing**: Jest (ready for implementation)

## 📁 **Project Structure**

```
roundupi/
├── 📱 Mobile App (React Native + Expo)
│   ├── screens/           # All screen components
│   ├── navigation/        # Navigation setup
│   ├── services/          # API integration
│   ├── context/           # State management
│   ├── hooks/             # Custom React hooks
│   └── assets/            # Images, icons
│
├── 🌐 Web App (Next.js + TypeScript)
│   ├── src/app/           # Next.js app router pages
│   ├── src/components/    # React components
│   ├── src/lib/           # Utilities and database
│   ├── src/hooks/         # Custom React hooks
│   └── public/           # Static assets
│
├── 🗄️ Backend (Shared)
│   ├── src/app/api/       # API routes
│   ├── prisma/           # Database schema
│   ├── lib/              # Shared utilities
│   └── server.ts         # Express server
│
└── 📚 Documentation
    ├── INTEGRATION_GUIDE.md
    └── README.md
```

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Expo CLI (for mobile development)
- SQLite (included with Prisma)

### **Installation**

1. **Clone and install dependencies**
```bash
# Clone repository
git clone https://github.com/jitenkr2030/roundupi.git
cd roundupi

# Install web app dependencies
npm install

# Install mobile app dependencies
cd roundupi
npm install
```

2. **Set up database**
```bash
# Push database schema
npm run db:push

# Generate Prisma client
npm run db:generate
```

3. **Start development servers**

**Web Application:**
```bash
# Start web app with hot reload
npm run dev
```
Visit: http://localhost:3000

**Mobile Application:**
```bash
# Start Expo development server
cd roundupi
npm start
```
Scan QR code with Expo Go app

### **API Testing**
The backend API runs on `http://localhost:3000/api` with endpoints:
- `/api/auth/login` - User authentication
- `/api/auth/signup` - User registration
- `/api/transactions` - Transaction management
- `/api/investments` - Investment operations
- `/api/goals` - Savings goals
- `/api/analytics` - Performance data
- `/api/settings` - User preferences

## 🔗 **Integration Features**

### **Real-time Synchronization**
- **Transactions**: Instant updates across web and mobile
- **Portfolio**: Live value changes reflected everywhere
- **Goals**: Progress updates in real-time
- **Notifications**: Push notifications on mobile, browser notifications on web

### **Shared Authentication**
- **Single Sign-on**: Login once, access everywhere
- **JWT Tokens**: Secure authentication across platforms
- **Session Management**: Consistent user sessions
- **Security**: Centralized auth logic

### **Unified Data Model**
- **Consistent Schema**: Same database structure
- **API Responses**: Standardized data formats
- **Business Logic**: Centralized in backend
- **Validation**: Uniform input validation

## 🎯 **Core Workflows**

### **1. User Onboarding**
```
Signup → KYC Verification → Bank Account Link → Set Round-up Rules → Start Investing
```

### **2. Daily Round-up Process**
```
UPI Transaction → Detect Amount → Apply Round-up Rule → Confirm Investment → Update Portfolio
```

### **3. Goal Achievement**
```
Create Goal → Set Target → Allocate Round-ups → Track Progress → Celebrate Achievement
```

### **4. Premium Upgrade**
```
Browse Features → Select Plan → Payment Processing → Unlock Premium → Access Enhanced Features
```

## 🔒 **Security Features**

### **Authentication**
- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Secure, expiring tokens
- **Session Management**: Secure cookie handling
- **Rate Limiting**: Prevent brute force attacks

### **Data Protection**
- **Encryption**: End-to-end encryption for sensitive data
- **Validation**: Input sanitization and type checking
- **HTTPS**: Secure communication (production)
- **Privacy**: GDPR/CCPA compliant data handling

### **Financial Security**
- **SEBI Compliance**: Investment regulations adherence
- **Bank-grade Security**: Financial industry standards
- **Audit Trails**: Complete transaction logging
- **Fraud Detection**: Anomaly monitoring

## 📈 **Performance Features**

### **Optimizations**
- **Lazy Loading**: Components load on demand
- **Caching**: Redis for frequently accessed data
- **Database Indexing**: Optimized query performance
- **CDN**: Static asset delivery

### **Real-time Features**
- **Socket.io**: Instant updates
- **Push Notifications**: Mobile alerts
- **Live Charts**: Real-time data visualization
- **Background Sync**: Offline data synchronization

## 🎨 **UI/UX Features**

### **Design System**
- **Consistent Branding**: RoundUPI identity across platforms
- **Responsive Design**: Works on all screen sizes
- **Accessibility**: WCAG compliant interfaces
- **Dark/Light Mode**: Theme support

### **User Experience**
- **Intuitive Navigation**: Clear user flows
- **Loading States**: Progress indicators
- **Error Handling**: User-friendly error messages
- **Feedback**: Visual and haptic feedback

## 🧪 **Testing**

### **Testing Strategy**
- **Unit Tests**: Jest for individual components
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Complete user workflows
- **Performance Tests**: Load and stress testing

### **Test Coverage**
- **Frontend**: React component testing
- **Backend**: API route testing
- **Database**: Schema validation
- **Security**: Penetration testing

## 🚀 **Deployment**

### **Web Application**
```bash
# Build for production
npm run build

# Start production server
npm start
```

### **Mobile Application**
```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android
```

### **Backend**
- **Cloud Platform**: AWS/Azure/GCP
- **Database**: Managed PostgreSQL (production)
- **CDN**: Asset delivery optimization
- **Monitoring**: Application performance tracking

## 📊 **Analytics & Monitoring**

### **User Analytics**
- **Behavior Tracking**: User interaction analysis
- **Funnel Analysis**: Conversion optimization
- **Retention Metrics**: User engagement tracking
- **Performance Metrics**: Application speed monitoring

### **Business Intelligence**
- **Transaction Volume**: Round-up processing metrics
- **Portfolio Growth**: Asset under management
- **User Acquisition**: Marketing effectiveness
- **Revenue Tracking**: Premium subscription analytics

## 🔧 **Development Workflow**

### **Git Workflow**
- **Feature Branching**: Isolated development
- **Pull Requests**: Code review process
- **CI/CD**: Automated testing and deployment
- **Version Control**: Semantic versioning

### **Code Quality**
- **ESLint**: Code style enforcement
- **TypeScript**: Type safety
- **Prettier**: Code formatting
- **Husky**: Git hooks

## 🤝 **Contributing**

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### **Development Guidelines**
- **Follow TypeScript best practices**
- **Use existing UI components**
- **Write comprehensive tests**
- **Update documentation**

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 **Support**

For support and questions:
- **Documentation**: Check the `/docs` folder
- **Issues**: Create an issue on GitHub
- **Discussions**: Join community conversations
- **Email**: Contact development team

---

**Built with ❤️ for Indian investors**  
*Transforming daily spending into smart investments*