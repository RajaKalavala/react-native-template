import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { Button } from '../Button'

describe('Button', () => {
  it('renders correctly with default props', () => {
    const { getByText, getByTestId } = render(
      <Button title="Test Button" testID="test-button" />
    )

    expect(getByText('Test Button')).toBeTruthy()
    expect(getByTestId('test-button')).toBeTruthy()
  })

  it('handles press events', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      <Button title="Test Button" onPress={onPress} testID="test-button" />
    )

    fireEvent.press(getByTestId('test-button'))
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('shows loading state', () => {
    const { getByText } = render(
      <Button title="Test Button" loading={true} testID="test-button" />
    )

    expect(getByText('Loading...')).toBeTruthy()
  })

  it('is disabled when loading', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      <Button
        title="Test Button"
        loading={true}
        onPress={onPress}
        testID="test-button"
      />
    )

    fireEvent.press(getByTestId('test-button'))
    expect(onPress).not.toHaveBeenCalled()
  })

  it('is disabled when disabled prop is true', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      <Button
        title="Test Button"
        disabled={true}
        onPress={onPress}
        testID="test-button"
      />
    )

    fireEvent.press(getByTestId('test-button'))
    expect(onPress).not.toHaveBeenCalled()
  })

  it('applies different variants correctly', () => {
    const { getByTestId, rerender } = render(
      <Button title="Primary" variant="primary" testID="primary-button" />
    )

    const primaryButton = getByTestId('primary-button')
    expect(primaryButton).toBeTruthy()

    rerender(
      <Button title="Secondary" variant="secondary" testID="secondary-button" />
    )
    const secondaryButton = getByTestId('secondary-button')
    expect(secondaryButton).toBeTruthy()

    rerender(
      <Button title="Outline" variant="outline" testID="outline-button" />
    )
    const outlineButton = getByTestId('outline-button')
    expect(outlineButton).toBeTruthy()
  })

  it('applies different sizes correctly', () => {
    const { getByTestId, rerender } = render(
      <Button title="Small" size="small" testID="small-button" />
    )

    const smallButton = getByTestId('small-button')
    expect(smallButton).toBeTruthy()

    rerender(<Button title="Medium" size="medium" testID="medium-button" />)
    const mediumButton = getByTestId('medium-button')
    expect(mediumButton).toBeTruthy()

    rerender(<Button title="Large" size="large" testID="large-button" />)
    const largeButton = getByTestId('large-button')
    expect(largeButton).toBeTruthy()
  })

  it('has proper accessibility props', () => {
    const { getByTestId } = render(
      <Button title="Accessible Button" testID="accessible-button" />
    )

    const button = getByTestId('accessible-button')
    expect(button.props.accessibilityRole).toBe('button')
    expect(button.props.accessibilityLabel).toBe('Accessible Button')
  })
})
