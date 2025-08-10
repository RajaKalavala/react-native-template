import React, { memo } from 'react'
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  loading?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
  testID?: string
}

const Button = memo<ButtonProps>(
  ({
    title,
    variant = 'primary',
    size = 'medium',
    loading = false,
    style,
    textStyle,
    testID,
    disabled,
    ...props
  }) => {
    const buttonStyle = [
      styles.base,
      styles[variant],
      styles[size],
      disabled && styles.disabled,
      style,
    ]

    const textStyleArray = [
      styles.text,
      styles[`${variant}Text`],
      styles[`${size}Text`],
      disabled && styles.disabledText,
      textStyle,
    ]

    return (
      <TouchableOpacity
        style={buttonStyle}
        disabled={disabled || loading}
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{ disabled: disabled || loading }}
        {...props}>
        <Text style={textStyleArray}>{loading ? 'Loading...' : title}</Text>
      </TouchableOpacity>
    )
  }
)

Button.displayName = 'Button'

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  // Variants
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#F2F2F7',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },

  // Sizes
  small: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 32,
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  large: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    minHeight: 56,
  },

  // Text styles
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#000000',
  },
  outlineText: {
    color: '#007AFF',
  },

  // Size text styles
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },

  // Disabled states
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
})

export { Button }
export type { ButtonProps }
