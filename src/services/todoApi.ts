// Axios for HTTP requests
import axios from 'axios';
// TypeScript interface for type safety
import { Todo } from '../types/todo';

// Base URL for JSONPlaceholder API
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Normalize todo data to ensure completed field is always boolean
// Handles API responses that might return strings instead of booleans
const normalizeTodo = (todo: any): Todo => ({
  ...todo,
  completed: typeof todo.completed === 'boolean' ? todo.completed : todo.completed === 'true' || todo.completed === true
});

// API service object with used operations
export const todoApi = {
  // GET: Fetch all todos from the API
  getAllTodos: async (): Promise<Todo[]> => {
    try {
      const response = await api.get<any[]>('/todos');
      return response.data.map(normalizeTodo);
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

};
