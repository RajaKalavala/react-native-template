# React Native Template with Expo Router

A production-ready React Native template built with Expo Router, following best practices for architecture, performance, and developer experience.

## 🚀 Features

- **Expo Router**: File-based routing with TypeScript support
- **React Query**: Server state management with caching and synchronization
- **Zustand**: Lightweight client state management with persistence
- **TypeScript**: Strict type checking throughout the application
- **Testing**: Jest + React Native Testing Library setup
- **Performance**: Optimized for lists, images, and re-renders
- **Accessibility**: Built-in accessibility support
- **Error Handling**: Centralized error management
- **API Layer**: Type-safe HTTP client with Zod validation

## 📁 Project Structure

```
react-native-template/
├── app/                    # Expo Router routes
│   ├── (tabs)/            # Tab navigation
│   ├── _layout.tsx        # Root layout
│   └── +not-found.tsx     # 404 page
├── components/            # Shared UI components
│   ├── ui/               # Primitive/reusable components
│   └── ...               # Composite components
├── hooks/                # Custom hooks (use*.ts)
├── lib/                  # Core utilities
│   ├── api.ts           # HTTP client
│   ├── queryKeys.ts     # React Query keys
│   ├── queryClient.ts   # React Query configuration
│   └── store.ts         # Zustand store
├── constants/           # App-wide constants
├── assets/             # Static assets
└── scripts/            # Build scripts
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_API_URL=https://your-api-url.com
```

### 3. Start Development Server

```bash
# Start Expo development server
npm start

# Or use specific platforms
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser
```

### 4. Development Workflow

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Testing
npm run test
npm run test:watch

# Clear cache and restart
npm run clean
```

## 🏗️ Architecture Guidelines

### File Naming Conventions

- **Routes**: `app/**/*.tsx` (Expo Router conventions)
- **Components**: `PascalCase.tsx` in `components/`
- **Hooks**: `use*.ts` in `hooks/`
- **UI Components**: `components/ui/PascalCase.tsx`

### Component Structure

```typescript
// components/ui/Example.tsx
import React, { memo } from 'react'
import { View, Text } from 'react-native'

interface ExampleProps {
  title: string
  testID?: string
}

const Example = memo<ExampleProps>(({ title, testID }) => {
  return (
    <View testID={testID}>
      <Text>{title}</Text>
    </View>
  )
})

Example.displayName = 'Example'

export { Example }
export type { ExampleProps }
```

### Hook Structure

```typescript
// hooks/useExample.ts
import { useState, useEffect } from 'react'

interface UseExampleReturn {
  data: unknown
  loading: boolean
  error: string | null
}

export const useExample = (): UseExampleReturn => {
  // Implementation
}
```

### API Integration

```typescript
// Using React Query hooks
import { usePosts, useCreatePost } from '@/hooks/useApi'

const MyComponent = () => {
  const { data: posts, isLoading, error } = usePosts()
  const createPost = useCreatePost()

  const handleCreate = () => {
    createPost.mutate({ title: 'New Post' })
  }
}
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

```typescript
// components/ui/__tests__/Example.test.tsx
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Example } from '../Example'

describe('Example', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Example title="Test" />)
    expect(getByText('Test')).toBeTruthy()
  })
})
```

## 📱 Performance Best Practices

### Lists

- Use `FlatList` for long lists
- Implement `keyExtractor` and `getItemLayout`
- Memoize list items with `React.memo`

### Images

- Use `expo-image` for optimized image loading
- Implement lazy loading for large lists

### Re-renders

- Use `React.memo` for expensive components
- Implement `useCallback` and `useMemo` strategically
- Avoid inline objects/functions in render

## 🔧 Available Scripts

| Script       | Description                     |
| ------------ | ------------------------------- |
| `start`      | Start Expo development server   |
| `android`    | Start Android development build |
| `ios`        | Start iOS development build     |
| `web`        | Start web development build     |
| `lint`       | Run ESLint                      |
| `typecheck`  | Run TypeScript type checking    |
| `test`       | Run Jest tests                  |
| `test:watch` | Run tests in watch mode         |
| `clean`      | Clear cache and restart         |

## 🚀 Deployment

### Building for Production

```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Build for both platforms
eas build --platform all
```

### Publishing Updates

```bash
# Publish to Expo
eas update --branch production
```

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)

## 🤝 Contributing

1. Follow the established architecture patterns
2. Write tests for new components and hooks
3. Ensure TypeScript strict mode compliance
4. Follow the naming conventions
5. Add proper error handling

## 📄 License

This project is licensed under the MIT License.
