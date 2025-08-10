import { z } from 'zod'

// Base API configuration
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com'

// Common response schemas
export const ErrorResponseSchema = z.object({
  message: z.string(),
  code: z.string().optional(),
})

export const SuccessResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown(),
})

// HTTP client with error handling
class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    schema?: z.ZodSchema<T>
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`
        )
      }

      const data = await response.json()

      if (schema) {
        return schema.parse(data)
      }

      return data as T
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`Validation error: ${error.message}`)
      }
      throw error
    }
  }

  async get<T>(endpoint: string, schema?: z.ZodSchema<T>): Promise<T> {
    return this.request(endpoint, { method: 'GET' }, schema)
  }

  async post<T>(
    endpoint: string,
    body: unknown,
    schema?: z.ZodSchema<T>
  ): Promise<T> {
    return this.request(
      endpoint,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
      schema
    )
  }

  async put<T>(
    endpoint: string,
    body: unknown,
    schema?: z.ZodSchema<T>
  ): Promise<T> {
    return this.request(
      endpoint,
      {
        method: 'PUT',
        body: JSON.stringify(body),
      },
      schema
    )
  }

  async delete<T>(endpoint: string, schema?: z.ZodSchema<T>): Promise<T> {
    return this.request(endpoint, { method: 'DELETE' }, schema)
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL)

// Type-safe API functions
export const api = {
  // Example user endpoints
  users: {
    getProfile: () => apiClient.get('/users/profile'),
    updateProfile: (data: unknown) => apiClient.put('/users/profile', data),
  },

  // Example posts endpoints
  posts: {
    getAll: () => apiClient.get('/posts'),
    getById: (id: string) => apiClient.get(`/posts/${id}`),
    create: (data: unknown) => apiClient.post('/posts', data),
    update: (id: string, data: unknown) => apiClient.put(`/posts/${id}`, data),
    delete: (id: string) => apiClient.delete(`/posts/${id}`),
  },
}
