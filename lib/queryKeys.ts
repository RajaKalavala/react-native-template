// Centralized query keys for React Query
// This ensures consistent key structure across the app

export const queryKeys = {
  // User-related queries
  users: {
    all: ['users'] as const,
    profile: () => [...queryKeys.users.all, 'profile'] as const,
    byId: (id: string) => [...queryKeys.users.all, id] as const,
  },

  // Posts-related queries
  posts: {
    all: ['posts'] as const,
    lists: () => [...queryKeys.posts.all, 'list'] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.posts.lists(), filters] as const,
    details: () => [...queryKeys.posts.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.posts.details(), id] as const,
  },

  // Comments-related queries
  comments: {
    all: ['comments'] as const,
    byPost: (postId: string) =>
      [...queryKeys.comments.all, 'byPost', postId] as const,
  },

  // Settings-related queries
  settings: {
    all: ['settings'] as const,
    theme: () => [...queryKeys.settings.all, 'theme'] as const,
    notifications: () => [...queryKeys.settings.all, 'notifications'] as const,
  },
} as const
