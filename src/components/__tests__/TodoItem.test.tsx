// Testing library for React Native components
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
// Component to test
import TodoItem from '../TodoItem';

describe('TodoItem', () => {
  // Test 1: Component renders correctly with title
  it('renders todo title correctly', () => {
    const { getByText } = render(
      <TodoItem
        title="Learn React Native"
        completed={false}
        onPress={() => {}}
      />
    );
    
    expect(getByText('Learn React Native')).toBeTruthy();
  });

  // Test 2: Checkmark is shown when todo is completed
  it('shows checkmark when completed', () => {
    const { getByText } = render(
      <TodoItem
        title="Learn React Native"
        completed={true}
        onPress={() => {}}
      />
    );
    
    expect(getByText('✓')).toBeTruthy();
  });

  // Test 3: Checkmark is not shown when todo is not completed
  it('does not show checkmark when not completed', () => {
    const { queryByText } = render(
      <TodoItem
        title="Learn React Native"
        completed={false}
        onPress={() => {}}
      />
    );
    
    expect(queryByText('✓')).toBeNull();
  });

  // Test 4: onPress callback is called when item is pressed
  it('calls onPress when item is pressed', () => {
    const onPressMock = jest.fn();
    
    const { getByText } = render(
      <TodoItem
        title="Learn React Native"
        completed={false}
        onPress={onPressMock}
      />
    );
    
    fireEvent.press(getByText('Learn React Native'));
    
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  // Test 5: Component renders with line-through styling when completed
  it('renders with completed styling when completed is true', () => {
    const { getByText } = render(
      <TodoItem
        title="Learn React Native"
        completed={true}
        onPress={() => {}}
      />
    );
    
    const titleElement = getByText('Learn React Native');
    const styleArray = titleElement.props.style;
    const hasStrikethrough = styleArray.some((styleItem: any) => 
      styleItem.textDecorationLine === 'line-through');

    expect(hasStrikethrough).toBe(true);
  });
});
