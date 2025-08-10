# React Native Template Setup Guide

This guide provides detailed step-by-step instructions for setting up and initializing a React Native app using this template.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (v18 or higher)

   ```bash
   # Check your Node.js version
   node --version

   # If you need to install or update Node.js, visit:
   # https://nodejs.org/
   ```

2. **npm** or **yarn**

   ```bash
   # Check npm version
   npm --version

   # Or check yarn version
   yarn --version
   ```

3. **Expo CLI**

   ```bash
   # Install Expo CLI globally
   npm install -g @expo/cli

   # Verify installation
   expo --version
   ```

### Platform-Specific Requirements

#### For iOS Development

- **macOS** (required for iOS development)
- **Xcode** (latest version from App Store)
- **iOS Simulator** (comes with Xcode)
- **CocoaPods** (for native dependencies)
  ```bash
  sudo gem install cocoapods
  ```

#### For Android Development

- **Android Studio** (latest version)
- **Android SDK** (API level 33 or higher)
- **Android Emulator** (set up through Android Studio)
- **Java Development Kit (JDK)** (version 11 or higher)

#### For Web Development

- **Modern web browser** (Chrome, Firefox, Safari, Edge)

## 🚀 Initial Setup

### Step 1: Clone or Download the Template

```bash
# Option 1: Clone from Git repository
git clone <repository-url>
cd react-native-template

# Option 2: Download and extract ZIP file
# Then navigate to the project directory
cd react-native-template
```

### Step 2: Install Dependencies

```bash
# Install all dependencies
npm install

# Or if using yarn
yarn install
```

### Step 3: Environment Configuration

1. **Create Environment File**

   ```bash
   # Create .env file in the root directory
   touch .env
   ```

2. **Add Environment Variables**

   ```env
   # API Configuration
   EXPO_PUBLIC_API_URL=https://your-api-url.com

   # Optional: Add other environment variables as needed
   EXPO_PUBLIC_APP_NAME=My React Native App
   EXPO_PUBLIC_VERSION=1.0.0
   ```

### Step 4: Verify Installation

```bash
# Check if everything is set up correctly
npm run typecheck

# Should complete without errors
```

## 🏃‍♂️ Running the App

### Development Server

```bash
# Start the Expo development server
npm start

# This will open the Expo DevTools in your browser
# You'll see a QR code and options for different platforms
```

### Platform-Specific Commands

```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web Browser
npm run web
```

### Using Expo Go App

1. **Install Expo Go** on your physical device

   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Scan QR Code**
   - Open Expo Go app
   - Scan the QR code displayed in your terminal or browser
   - The app will load on your device

## 🛠️ Development Workflow

### Daily Development Commands

```bash
# Start development server
npm start

# Type checking (run before commits)
npm run typecheck

# Linting (run before commits)
npm run lint

# Testing
npm run test
npm run test:watch

# Clear cache if you encounter issues
npm run clean
```

### Code Quality Checks

Before committing code, run these commands:

```bash
# 1. Type checking
npm run typecheck

# 2. Linting
npm run lint

# 3. Tests
npm run test

# 4. Build verification (optional)
npm run build
```

## 📱 Platform Setup

### iOS Setup

1. **Install Xcode**

   - Download from Mac App Store
   - Install Command Line Tools: `xcode-select --install`

2. **Set up iOS Simulator**

   ```bash
   # Open iOS Simulator
   open -a Simulator

   # Or start from command line
   npm run ios
   ```

3. **Install iOS Dependencies**
   ```bash
   # Install CocoaPods dependencies
   cd ios && pod install && cd ..
   ```

### Android Setup

1. **Install Android Studio**

   - Download from [developer.android.com](https://developer.android.com/studio)
   - Install Android SDK (API level 33+)

2. **Set up Android Emulator**

   - Open Android Studio
   - Go to AVD Manager
   - Create a new virtual device

3. **Set Environment Variables**

   ```bash
   # Add to your shell profile (.bashrc, .zshrc, etc.)
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

4. **Start Android Emulator**

   ```bash
   # List available emulators
   emulator -list-avds

   # Start specific emulator
   emulator -avd <emulator-name>

   # Or use the npm script
   npm run android
   ```

## 🧪 Testing Setup

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- Button.test.tsx
```

### Writing Tests

1. **Component Tests**

   ```typescript
   // components/ui/__tests__/MyComponent.test.tsx
   import React from 'react'
   import { render, fireEvent } from '@testing-library/react-native'
   import { MyComponent } from '../MyComponent'

   describe('MyComponent', () => {
     it('renders correctly', () => {
       const { getByText } = render(<MyComponent title="Test" />)
       expect(getByText('Test')).toBeTruthy()
     })
   })
   ```

2. **Hook Tests**

   ```typescript
   // hooks/__tests__/useMyHook.test.ts
   import { renderHook } from '@testing-library/react-native'
   import { useMyHook } from '../useMyHook'

   describe('useMyHook', () => {
     it('returns expected values', () => {
       const { result } = renderHook(() => useMyHook())
       expect(result.current.data).toBeDefined()
     })
   })
   ```

## 🔧 Troubleshooting

### Common Issues

1. **Metro Bundler Issues**

   ```bash
   # Clear Metro cache
   npm run clean

   # Or manually
   npx expo start --clear
   ```

2. **iOS Build Issues**

   ```bash
   # Clean iOS build
   cd ios && xcodebuild clean && cd ..

   # Reinstall pods
   cd ios && pod install && cd ..
   ```

3. **Android Build Issues**

   ```bash
   # Clean Android build
   cd android && ./gradlew clean && cd ..

   # Clear Android cache
   npx react-native start --reset-cache
   ```

4. **Dependency Issues**
   ```bash
   # Remove node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

### Performance Issues

1. **Slow Development Server**

   ```bash
   # Use specific port
   npx expo start --port 8081

   # Use tunnel mode
   npx expo start --tunnel
   ```

2. **Large Bundle Size**
   - Check for unused dependencies
   - Use dynamic imports where appropriate
   - Optimize images and assets

## 📦 Building for Production

### EAS Build Setup

1. **Install EAS CLI**

   ```bash
   npm install -g @expo/eas-cli
   ```

2. **Login to Expo**

   ```bash
   eas login
   ```

3. **Configure EAS**

   ```bash
   eas build:configure
   ```

4. **Build for Platforms**

   ```bash
   # iOS
   eas build --platform ios

   # Android
   eas build --platform android

   # Both
   eas build --platform all
   ```

### Local Builds

```bash
# iOS
npx expo run:ios --configuration Release

# Android
npx expo run:android --variant release
```

## 📚 Next Steps

After completing the setup:

1. **Explore the Codebase**

   - Review the project structure
   - Understand the architecture patterns
   - Check out example components and hooks

2. **Start Developing**

   - Create new routes in `app/`
   - Add components in `components/`
   - Create hooks in `hooks/`

3. **Set up Your API**

   - Update `lib/api.ts` with your endpoints
   - Configure environment variables
   - Test API integration

4. **Customize the App**
   - Update app configuration in `app.json`
   - Modify theme and styling
   - Add your branding

## 🆘 Getting Help

- **Documentation**: Check the main README.md
- **Expo Docs**: [docs.expo.dev](https://docs.expo.dev/)
- **React Native Docs**: [reactnative.dev](https://reactnative.dev/)
- **Community**: [Expo Discord](https://chat.expo.dev/)

## 📝 Notes

- Always run `npm run typecheck` before committing
- Keep components under 150 lines of code
- Use TypeScript strict mode
- Follow the established naming conventions
- Write tests for new features
- Handle loading, error, and empty states
