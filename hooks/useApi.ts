import { api } from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'
import { useAppError } from '@/lib/store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// Hook for fetching user profile
export const useUserProfile = () => {
  const { setError } = useAppError()

  return useQuery({
    queryKey: queryKeys.users.profile(),
    queryFn: api.users.getProfile,
  })
}

// Hook for updating user profile
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient()
  const { setError } = useAppError()

  return useMutation({
    mutationFn: api.users.updateProfile,
    onSuccess: () => {
      // Invalidate and refetch user profile
      queryClient.invalidateQueries({ queryKey: queryKeys.users.profile() })
    },
    onError: (error) => {
      setError(
        error instanceof Error ? error.message : 'Failed to update user profile'
      )
    },
  })
}

// Hook for fetching posts
export const usePosts = (filters?: Record<string, unknown>) => {
  const { setError } = useAppError()

  return useQuery({
    queryKey: queryKeys.posts.list(filters || {}),
    queryFn: api.posts.getAll,
  })
}

// Hook for fetching a single post
export const usePost = (id: string) => {
  const { setError } = useAppError()

  return useQuery({
    queryKey: queryKeys.posts.detail(id),
    queryFn: () => api.posts.getById(id),
    enabled: !!id,
  })
}

// Hook for creating a post
export const useCreatePost = () => {
  const queryClient = useQueryClient()
  const { setError } = useAppError()

  return useMutation({
    mutationFn: api.posts.create,
    onSuccess: () => {
      // Invalidate posts list
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() })
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : 'Failed to create post')
    },
  })
}

// Hook for updating a post
export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  const { setError } = useAppError()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) =>
      api.posts.update(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate specific post and posts list
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.detail(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() })
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : 'Failed to update post')
    },
  })
}

// Hook for deleting a post
export const useDeletePost = () => {
  const queryClient = useQueryClient()
  const { setError } = useAppError()

  return useMutation({
    mutationFn: api.posts.delete,
    onSuccess: (_, id) => {
      // Remove from cache and invalidate list
      queryClient.removeQueries({ queryKey: queryKeys.posts.detail(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() })
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : 'Failed to delete post')
    },
  })
}
