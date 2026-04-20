// React for component creation
import React from 'react';
// React Native UI components
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// TypeScript interface for component props
interface TodoItemProps {
  title: string;
  completed: boolean;
  onPress: () => void;
}

// TodoItem component - displays a single todo item
// Demonstrates React best practices: component reusability and props
export const TodoItem: React.FC<TodoItemProps> = ({ title, completed, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.todoItem, completed && styles.todoItemCompleted]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.todoTitle, completed && styles.todoTitleCompleted]}>
        {title}
      </Text>
      {completed && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );
};

// Component-specific styles
const styles = StyleSheet.create({
  todoItem: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoItemCompleted: {
    backgroundColor: '#E8F5E9',
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  todoTitleCompleted: {
    color: '#2E7D32',
    textDecorationLine: 'line-through',
  },
  checkmark: {
    fontSize: 24,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginLeft: 12,
  },
});
