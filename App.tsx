// React hooks for state management and side effects
import React, { useState, useEffect } from 'react';

// React Native UI components
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

// Custom API service for REST calls
import { todoApi } from './src/services/todoApi';

// Custom component for todo items
import { TodoItem } from './src/components/TodoItem';


export default function App() {
  // State management
  const [todos, setTodos] = useState<any[]>([]); // List of todos
  const [loading, setLoading] = useState(true); // Loading state for API calls
  const [error, setError] = useState(''); // Error message state

  // Load todos from API when component mounts
  useEffect(() => {
    loadTodos();
  }, []);

  // Fetch todos from REST API
  const loadTodos = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await todoApi.getAllTodos();
      // Take first 10 todos and sort completed items to bottom
      setTodos(data.slice(0, 10).sort((a, b) => Number(a.completed) - Number(b.completed)));
    } catch (err) {
      setError('Failed to load todos');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle todo completion status with optimistic UI update
  const toggleComplete = async (todo: any) => {
    // Convert completed to boolean (handles string/boolean from API)
    const completed = typeof todo.completed === 'boolean' ? todo.completed : todo.completed === 'true' || todo.completed === true;
    const newCompleted = !completed;
    
    // Create new array with updated todo
    const updatedTodos = todos.map((item) => {
      if (item.id === todo.id) {
        // Create new object with updated completed status
        const newItem = { ...item };
        newItem.completed = newCompleted;
        return newItem;
      }
      return item;
    });
    
    // Sort: completed items go to bottom
    updatedTodos.sort((a, b) => {
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;
      return 0;
    });
    
    // Update UI immediately for instant feedback
    setTodos(updatedTodos);
    
    // Then sync with API in background
    try {
      await todoApi.updateTodo({
        id: todo.id,
        completed: newCompleted,
      });
    } catch (err) {
      console.error('Error updating todo:', err);
      // Revert on error if needed
      const revertedTodos = todos.map((item) => {
        if (item.id === todo.id) {
          const newItem = { ...item };
          newItem.completed = completed;
          return newItem;
        }
        return item;
      });
      revertedTodos.sort((a, b) => {
        if (a.completed && !b.completed) return 1;
        if (!a.completed && b.completed) return -1;
        return 0;
      });
      setTodos(revertedTodos);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native To-do App</Text>
      
      {/* Conditional rendering: loading spinner, error message, or todo list */}
      {loading ? (
        <ActivityIndicator style={styles.loading} size="large" color="#007AFF" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TodoItem
              title={item.title}
              completed={item.completed}
              onPress={() => toggleComplete(item)}
            />
          )}
        />
      )}
      
      <StatusBar style="auto" />
    </View>
  );
}

// StyleSheet for styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loading: {
    marginTop: 50,
  },
  error: {
    color: '#FF3B30',
    fontSize: 16,
    marginTop: 20,
  },
});
