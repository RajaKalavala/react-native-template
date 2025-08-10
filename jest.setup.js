import '@testing-library/jest-native/extend-expect'

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    canGoBack: jest.fn(() => true),
  }),
  useLocalSearchParams: () => ({}),
  Link: 'Link',
  Stack: {
    Screen: 'Stack.Screen',
  },
  Tabs: {
    Screen: 'Tabs.Screen',
  },
}))

// Mock expo-constants
jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      apiUrl: 'https://api.example.com',
    },
  },
}))

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

// Mock expo-font
jest.mock('expo-font', () => ({
  useFonts: jest.fn(() => [true]),
}))

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
}))

// Silence the warning: Animated: `useNativeDriver` is not supported
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')
  Reanimated.default.call = () => {}
  return Reanimated
})

// Global test utilities
global.console = {
  ...console,
  // Uncomment to ignore a specific log level
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  error: jest.fn(),
}
