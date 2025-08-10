import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/ui/Button'
import { useCreatePost, usePosts } from '@/hooks/useApi'
import { useTheme } from '@/lib/store'

export default function ExampleScreen() {
  // Typed search params
  const { id, title } = useLocalSearchParams()

  // Custom hooks for data and state
  const { data: posts, isLoading, error } = usePosts()
  const createPost = useCreatePost()
  const { isDarkMode, toggleTheme } = useTheme()

  // Handle post creation
  const handleCreatePost = () => {
    createPost.mutate(
      { title: 'New Example Post', content: 'This is an example post' },
      {
        onSuccess: () => {
          Alert.alert('Success', 'Post created successfully!')
        },
        onError: (error) => {
          Alert.alert('Error', error.message || 'Failed to create post')
        },
      }
    )
  }

  // Handle theme toggle
  const handleThemeToggle = () => {
    toggleTheme()
  }

  return (
    <SafeAreaView
      style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Stack.Screen
        options={{
          title:
            (typeof title === 'string' ? title : undefined) || 'Example Screen',
          headerStyle: {
            backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
          },
          headerTintColor: isDarkMode ? '#ffffff' : '#000000',
        }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        {/* Search Params Display */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
            Search Parameters
          </Text>
          <Text style={[styles.text, isDarkMode && styles.darkText]}>
            ID: {id || 'Not provided'}
          </Text>
          <Text style={[styles.text, isDarkMode && styles.darkText]}>
            Title: {title || 'Not provided'}
          </Text>
        </View>

        {/* Theme Toggle */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
            Theme Settings
          </Text>
          <Button
            title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
            variant="outline"
            onPress={handleThemeToggle}
            testID="theme-toggle-button"
            accessibilityLabel={`Switch to ${
              isDarkMode ? 'light' : 'dark'
            } mode`}
          />
        </View>

        {/* Posts Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
            Posts ({Array.isArray(posts) ? posts.length : 0})
          </Text>

          {/* Loading State */}
          {isLoading && (
            <View style={styles.centerContent}>
              <Text style={[styles.text, isDarkMode && styles.darkText]}>
                Loading posts...
              </Text>
            </View>
          )}

          {/* Error State */}
          {error && (
            <View style={styles.centerContent}>
              <Text
                style={[styles.errorText, isDarkMode && styles.darkErrorText]}>
                Error:{' '}
                {error instanceof Error ? error.message : 'Unknown error'}
              </Text>
            </View>
          )}

          {/* Empty State */}
          {!isLoading &&
            !error &&
            (!posts || !Array.isArray(posts) || posts.length === 0) && (
              <View style={styles.centerContent}>
                <Text style={[styles.text, isDarkMode && styles.darkText]}>
                  No posts found. Create your first post!
                </Text>
              </View>
            )}

          {/* Posts List */}
          {!isLoading &&
            !error &&
            posts &&
            Array.isArray(posts) &&
            posts.length > 0 && (
              <View style={styles.postsList}>
                {posts.slice(0, 5).map((post: any, index: number) => (
                  <View
                    key={post.id || index}
                    style={[styles.postItem, isDarkMode && styles.darkPostItem]}
                    accessibilityRole="button"
                    accessibilityLabel={`Post ${index + 1}: ${post.title}`}>
                    <Text
                      style={[styles.postTitle, isDarkMode && styles.darkText]}>
                      {post.title || `Post ${index + 1}`}
                    </Text>
                    <Text
                      style={[
                        styles.postContent,
                        isDarkMode && styles.darkText,
                      ]}>
                      {post.content || 'No content available'}
                    </Text>
                  </View>
                ))}
              </View>
            )}

          {/* Create Post Button */}
          <Button
            title="Create New Post"
            onPress={handleCreatePost}
            loading={createPost.isPending}
            disabled={createPost.isPending}
            testID="create-post-button"
            accessibilityLabel="Create a new post"
            style={styles.createButton}
          />
        </View>

        {/* Accessibility Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
            Accessibility Features
          </Text>
          <Text style={[styles.text, isDarkMode && styles.darkText]}>
            This screen demonstrates proper accessibility implementation:
          </Text>
          <Text style={[styles.text, isDarkMode && styles.darkText]}>
            • Proper accessibility roles and labels
          </Text>
          <Text style={[styles.text, isDarkMode && styles.darkText]}>
            • Loading, error, and empty states
          </Text>
          <Text style={[styles.text, isDarkMode && styles.darkText]}>
            • Typed search parameters
          </Text>
          <Text style={[styles.text, isDarkMode && styles.darkText]}>
            • Safe area handling
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000000',
  },
  darkText: {
    color: '#ffffff',
  },
  text: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
  },
  darkErrorText: {
    color: '#ff6b6b',
  },
  centerContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  postsList: {
    marginBottom: 16,
  },
  postItem: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  darkPostItem: {
    backgroundColor: '#2a2a2a',
    borderColor: '#404040',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000000',
  },
  postContent: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  createButton: {
    marginTop: 16,
  },
})
