# Services Directory

This directory contains all frontend service files that interact with backend APIs.

## Structure

```
src/services/
├── portfolioService.ts    # Portfolio holdings and management
├── chatService.ts         # AI chat functionality
├── riskService.ts         # Risk evaluation and RPN calculations
├── newsService.ts         # Market news and updates
├── reportsService.ts      # Report generation and downloads
└── README.md             # This file
```

## API Configuration

All backend URLs are centralized in `/src/config/api.ts`. **Never hardcode API URLs in service files.**

### Quick Start

```typescript
// Import API endpoints
import { API_ENDPOINTS, buildApiUrl } from '@/config/api';

// Method 1: Using helper function (recommended)
const url = buildApiUrl('PORTFOLIO', '/holdings');

// Method 2: Direct concatenation
const url = `${API_ENDPOINTS.CHAT}/messages`;
```

## Development Setup

### 1. Using Environment Variables (Recommended)

Create `.env` in project root:

```env
# Development
VITE_PORTFOLIO_API=http://localhost:3001/api
VITE_NEWS_API=http://localhost:3002/api
VITE_CHAT_API=http://localhost:3007/api
VITE_RISK_EVAL_API=http://localhost:3004/api
```

### 2. Manual Configuration

Edit `/src/config/api.ts` and modify the `DEV_URLS` or `PROD_URLS` objects.

## Connecting Real Backends

### Step 1: Get Your Backend URLs

Contact your backend team or check your deployment platform for actual API URLs:
- Production: `https://api.aarthikkavach.com/*`
- Staging: `https://staging-api.aarthikkavach.com/*`

### Step 2: Update Configuration

**Option A: Environment Variables** (Best for production)

In your hosting platform (Vercel, Netlify, etc.), set:
```
VITE_PORTFOLIO_API=https://api.aarthikkavach.com/portfolio
VITE_NEWS_API=https://api.aarthikkavach.com/news
...
```

**Option B: Update api.ts** (For quick testing)

Edit `PROD_URLS` in `/src/config/api.ts`:
```typescript
const PROD_URLS = {
  PORTFOLIO: 'https://api.aarthikkavach.com/portfolio',
  // ... update other URLs
};
```

### Step 3: Test Endpoints

```typescript
import { getEndpointsDebug } from '@/config/api';

// In your console or dev tools
console.log(getEndpointsDebug());
```

## Available Services

| Endpoint | Description | Example Usage |
|----------|-------------|---------------|
| `PORTFOLIO` | Holdings, positions, transactions | `getPortfolioHoldings()` |
| `NEWS` | Market news, updates | `getMarketNews()` |
| `RESEARCH` | Analysis, insights | `getResearchReports()` |
| `RISK_EVAL` | RPN, risk metrics | `analyzePortfolioRisk()` |
| `VISUALIZATION` | Chart data | `getChartData()` |
| `REPORTS` | Generate/download reports | `generateReport()` |
| `CHAT` | AI assistant | `sendChatMessage()` |
| `MARKET_DATA` | Real-time prices | `getMarketData()` |
| `NOTIFICATIONS` | User alerts | `getNotifications()` |

## Error Handling

Always wrap API calls in try-catch:

```typescript
try {
  const holdings = await getPortfolioHoldings();
  // Handle success
} catch (error) {
  console.error('Failed to fetch holdings:', error);
  // Show user-friendly error message
}
```

## Authentication

If your backend requires authentication, add token to headers:

```typescript
const token = localStorage.getItem('auth_token');

const response = await fetch(url, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
```

## Mock Data vs Real APIs

Currently, the app uses mock data from `/src/lib/mockData.ts`. When connecting real backends:

1. Replace mock imports with service imports
2. Update components to use async service calls
3. Add loading states and error handling
4. Remove mock data files (optional)

## Integrating Real Profile API

### Step-by-Step Guide to Connect Profile API

This guide shows you how to replace mock profile data with real API calls.

#### Step 1: Create Profile Service

Create or update `src/services/profileService.ts`:

```typescript
import { API_ENDPOINTS, buildApiUrl } from '@/config/api';

export interface UserProfile {
  user: {
    name: string;
    email: string;
    image_url: string;
  };
  user_profile: {
    age: number;
    gender: string;
    profession: string;
    designation?: string;
    job_level?: string;
    is_primary_earner: boolean;
  };
  user_financial_profile: {
    income_per_month: number;
    expenditure: number;
    additional_expenses?: number;
    living_cost?: number;
    invest_per_month?: number;
    saving_per_month?: number;
    saving_rate?: number;
    risk_tolerance: 'low' | 'moderate' | 'high';
    invest_cycle_date: string;
  };
  exchanges: string[];
  portfolio_snapshot: {
    equity_value_inr: number;
    mf_value_inr: number;
    total_portfolio_value_inr: number;
    snapshot_date: string;
  };
}

export const getProfile = async (): Promise<UserProfile> => {
  const url = buildApiUrl('PORTFOLIO', '/profile');
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Add auth token if needed:
      // 'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch profile: ${response.statusText}`);
  }

  return response.json();
};

export const updateFinancialProfile = async (data: UserProfile['user_financial_profile']): Promise<UserProfile> => {
  const url = buildApiUrl('PORTFOLIO', '/profile');
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add auth token if needed:
      // 'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update profile: ${response.statusText}`);
  }

  return response.json();
};
```

#### Step 2: Update Profile Page Component

Modify `src/pages/Profile.tsx` to use the service:

```typescript
import { useState, useEffect } from 'react';
import { getProfile, updateFinancialProfile } from '@/services/profileService';
import type { UserProfile } from '@/services/profileService';
// ... other imports

export default function Profile() {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await getProfile();
        setProfileData(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleFinancialProfileSubmit = async (data: any) => {
    try {
      const updatedProfile = await updateFinancialProfile(data);
      setProfileData(updatedProfile);
      toast({
        title: "Success",
        description: "Financial profile updated successfully",
      });
      setShowEditForm(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast({
        title: "Error",
        description: "Failed to update financial profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>No profile data available</div>;
  }

  const { user, user_profile, user_financial_profile, exchanges, portfolio_snapshot } = profileData;

  // Rest of your component code...
}
```

#### Step 3: Update TopBar Component

Modify `src/components/layout/TopBar.tsx` to use real profile data:

```typescript
import { useState, useEffect } from 'react';
import { getProfile } from '@/services/profileService';
import type { UserProfile } from '@/services/profileService';

export default function TopBar() {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfileData(data);
      } catch (err) {
        console.error('Failed to fetch profile for TopBar:', err);
      }
    };

    fetchProfile();
  }, []);

  const user = profileData?.user || { name: 'User', image_url: '', email: '' };

  // Rest of your component code using user data...
}
```

#### Step 4: Update Dashboard Page

Modify `src/pages/Dashboard.tsx` to use real profile data:

```typescript
import { useState, useEffect } from 'react';
import { getProfile } from '@/services/profileService';
import type { UserProfile } from '@/services/profileService';

export default function Dashboard() {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfileData(data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    fetchProfile();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = profileData?.user.name.split(' ')[0] || 'User';

  // Rest of your component code...
}
```

#### Step 5: Configure API Endpoint

Update `src/config/api.ts` to include your profile API endpoint:

```typescript
const DEV_URLS = {
  PORTFOLIO: process.env.VITE_PORTFOLIO_API || 'http://localhost:3001/api',
  // ... other URLs
};

const PROD_URLS = {
  PORTFOLIO: process.env.VITE_PORTFOLIO_API || 'https://api.aarthikkavach.com/portfolio',
  // ... other URLs
};
```

#### Step 6: Test the Integration

1. Start your backend API server
2. Update the API URL in `.env` or `api.ts`
3. Test GET request: Navigate to the Profile page and verify data loads
4. Test POST request: Update financial profile and verify changes are saved
5. Check network tab in browser DevTools for API calls
6. Verify error handling by stopping the backend server

#### Common Issues and Solutions

**Issue**: CORS errors
**Solution**: Configure your backend to allow requests from your frontend origin

**Issue**: 401 Unauthorized
**Solution**: Add authentication token to request headers (see examples above)

**Issue**: Data not updating after POST
**Solution**: Make sure to refetch profile data after successful POST or update state directly

**Issue**: Type errors
**Solution**: Ensure your TypeScript interfaces match the actual API response structure

## Need Help?

- Check `/src/config/api.ts` for all available endpoints
- See example services in this directory
- Run `getEndpointsDebug()` to verify configuration
