# Quick Start Guide

Get up and running with the React Native template in under 5 minutes!

## ⚡ Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm start
```

### 3. Open in Simulator/Emulator

- **iOS**: Press `i` in terminal or run `npm run ios`
- **Android**: Press `a` in terminal or run `npm run android`
- **Web**: Press `w` in terminal or run `npm run web`

## 🎯 What's Included

### ✅ Ready to Use

- **Expo Router** - File-based navigation
- **React Query** - Server state management
- **Zustand** - Client state management
- **TypeScript** - Type safety
- **Testing Setup** - Jest + React Native Testing Library
- **UI Components** - Reusable Button component
- **API Layer** - Type-safe HTTP client
- **Error Handling** - Centralized error management

### 📁 Key Files

```
app/
├── _layout.tsx          # Root layout with providers
├── (tabs)/             # Tab navigation
├── example.tsx         # Example route (demo)
└── +not-found.tsx      # 404 page

components/
├── ui/
│   └── Button.tsx      # Reusable button component
└── __tests__/          # Component tests

hooks/
└── useApi.ts           # API hooks with React Query

lib/
├── api.ts              # HTTP client
├── store.ts            # Zustand store
├── queryClient.ts      # React Query config
└── queryKeys.ts        # Query key management
```

## 🚀 Next Steps

### 1. Explore the Example Route

Visit `/example` in your app to see:

- Typed search parameters
- Loading/error states
- Theme switching
- API integration
- Accessibility features

### 2. Create Your First Route

```typescript
// app/my-route.tsx
import React from 'react'
import { View, Text } from 'react-native'
import { Stack } from 'expo-router'

export default function MyRoute() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Stack.Screen options={{ title: 'My Route' }} />
      <Text>Hello from my route!</Text>
    </View>
  )
}
```

### 3. Add a UI Component

```typescript
// components/ui/MyComponent.tsx
import React, { memo } from 'react'
import { View, Text } from 'react-native'

interface MyComponentProps {
  title: string
  testID?: string
}

const MyComponent = memo<MyComponentProps>(({ title, testID }) => {
  return (
    <View testID={testID}>
      <Text>{title}</Text>
    </View>
  )
})

MyComponent.displayName = 'MyComponent'

export { MyComponent }
export type { MyComponentProps }
```

### 4. Create a Custom Hook

```typescript
// hooks/useMyHook.ts
import { useState, useEffect } from 'react'

interface UseMyHookReturn {
  data: unknown
  loading: boolean
  error: string | null
}

export const useMyHook = (): UseMyHookReturn => {
  const [data, setData] = useState<unknown>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Your hook logic here
    setLoading(false)
  }, [])

  return { data, loading, error }
}
```

### 5. Add API Integration

```typescript
// lib/api.ts - Add your endpoints
export const api = {
  // ... existing endpoints
  myFeature: {
    getData: () => apiClient.get('/my-feature'),
    createData: (data: unknown) => apiClient.post('/my-feature', data),
  },
}

// hooks/useApi.ts - Add your hooks
export const useMyFeatureData = () => {
  const { setError } = useAppError()

  return useQuery({
    queryKey: queryKeys.myFeature.data(),
    queryFn: api.myFeature.getData,
    onError: (error) => {
      setError(error instanceof Error ? error.message : 'Failed to fetch data')
    },
  })
}
```

## 🧪 Testing

### Run Tests

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
```

### Write Tests

```typescript
// components/ui/__tests__/MyComponent.test.tsx
import React from 'react'
import { render } from '@testing-library/react-native'
import { MyComponent } from '../MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    const { getByText } = render(<MyComponent title="Test" />)
    expect(getByText('Test')).toBeTruthy()
  })
})
```

## 🔧 Development Commands

| Command             | Description              |
| ------------------- | ------------------------ |
| `npm start`         | Start development server |
| `npm run ios`       | iOS simulator            |
| `npm run android`   | Android emulator         |
| `npm run web`       | Web browser              |
| `npm run typecheck` | TypeScript checking      |
| `npm run lint`      | ESLint                   |
| `npm test`          | Run tests                |
| `npm run clean`     | Clear cache              |

## 📚 Learn More

- **Architecture**: See `README.md` for detailed architecture guide
- **Setup**: See `SETUP_GUIDE.md` for complete setup instructions
- **Cursor Rules**: Check `.cursor/rules/` for development guidelines

## 🆘 Need Help?

1. Check the **Console** for error messages
2. Run `npm run typecheck` to find TypeScript errors
3. Run `npm run lint` to find code style issues
4. Check the **Documentation** in README.md and SETUP_GUIDE.md

## 🎉 You're Ready!

Your React Native app is now set up with:

- ✅ Modern architecture
- ✅ Type safety
- ✅ State management
- ✅ API integration
- ✅ Testing setup
- ✅ Performance optimizations

Start building your app by modifying the routes in `app/` and adding components in `components/`!
