import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

// App state interface
interface AppState {
  // Theme state
  isDarkMode: boolean
  toggleTheme: () => void

  // User preferences
  notificationsEnabled: boolean
  toggleNotifications: () => void

  // App state
  isFirstLaunch: boolean
  setFirstLaunch: (value: boolean) => void

  // Loading states
  isLoading: boolean
  setLoading: (loading: boolean) => void

  // Error state
  error: string | null
  setError: (error: string | null) => void
  clearError: () => void
}

// Create the store with persistence
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme state
      isDarkMode: false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      // User preferences
      notificationsEnabled: true,
      toggleNotifications: () =>
        set((state) => ({
          notificationsEnabled: !state.notificationsEnabled,
        })),

      // App state
      isFirstLaunch: true,
      setFirstLaunch: (value: boolean) => set({ isFirstLaunch: value }),

      // Loading states
      isLoading: false,
      setLoading: (loading: boolean) => set({ isLoading: loading }),

      // Error state
      error: null,
      setError: (error: string | null) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist certain fields
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        notificationsEnabled: state.notificationsEnabled,
        isFirstLaunch: state.isFirstLaunch,
      }),
    }
  )
)

// Selector hooks for better performance
export const useTheme = () =>
  useAppStore((state) => ({
    isDarkMode: state.isDarkMode,
    toggleTheme: state.toggleTheme,
  }))

export const useNotifications = () =>
  useAppStore((state) => ({
    notificationsEnabled: state.notificationsEnabled,
    toggleNotifications: state.toggleNotifications,
  }))

export const useAppLoading = () =>
  useAppStore((state) => ({
    isLoading: state.isLoading,
    setLoading: state.setLoading,
  }))

export const useAppError = () =>
  useAppStore((state) => ({
    error: state.error,
    setError: state.setError,
    clearError: state.clearError,
  }))
