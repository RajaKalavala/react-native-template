import { QueryClient } from '@tanstack/react-query'

// Create a client with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Retry failed requests 3 times
      retry: 3,
      // Retry delay increases exponentially
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Stale time - data is considered fresh for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Cache time - keep data in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
      // Refetch on window focus
      refetchOnWindowFocus: false,
      // Refetch on reconnect
      refetchOnReconnect: true,
      // Refetch on mount
      refetchOnMount: true,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
      // Retry delay for mutations
      retryDelay: 1000,
    },
  },
})

// Note: Global error handling can be done through React Query DevTools
// or by wrapping components with error boundaries
