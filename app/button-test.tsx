import { Stack } from 'expo-router'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/ui/Button'

export default function ButtonTestScreen() {
  const [loading, setLoading] = useState(false)

  const handlePress = () => {
    Alert.alert('Button Pressed', 'The button was pressed successfully!')
  }

  const handleLoadingPress = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      Alert.alert('Loading Complete', 'The loading operation finished!')
    }, 2000)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Button Component Test',
        }}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Button Component Test</Text>
        <Text style={styles.subtitle}>
          Testing different variants and states of the Button component
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Variants</Text>

          <Button
            title="Primary Button"
            variant="primary"
            onPress={handlePress}
            testID="primary-button"
            style={styles.button}
          />

          <Button
            title="Secondary Button"
            variant="secondary"
            onPress={handlePress}
            testID="secondary-button"
            style={styles.button}
          />

          <Button
            title="Outline Button"
            variant="outline"
            onPress={handlePress}
            testID="outline-button"
            style={styles.button}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sizes</Text>

          <Button
            title="Small Button"
            size="small"
            onPress={handlePress}
            testID="small-button"
            style={styles.button}
          />

          <Button
            title="Medium Button"
            size="medium"
            onPress={handlePress}
            testID="medium-button"
            style={styles.button}
          />

          <Button
            title="Large Button"
            size="large"
            onPress={handlePress}
            testID="large-button"
            style={styles.button}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>States</Text>

          <Button
            title="Loading Button"
            loading={loading}
            onPress={handleLoadingPress}
            testID="loading-button"
            style={styles.button}
          />

          <Button
            title="Disabled Button"
            disabled={true}
            onPress={handlePress}
            testID="disabled-button"
            style={styles.button}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accessibility</Text>
          <Text style={styles.description}>
            All buttons include proper accessibility props:
          </Text>
          <Text style={styles.description}>• accessibilityRole="button"</Text>
          <Text style={styles.description}>
            • accessibilityLabel (from title)
          </Text>
          <Text style={styles.description}>
            • accessibilityState for disabled state
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
  button: {
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
})
