import axios from 'axios';
import { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoApi = {
  // Get all todos
  getAllTodos: async (): Promise<Todo[]> => {
    try {
      const response = await api.get<Todo[]>('/todos');
      return response.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  // Get a single todo by ID
  getTodoById: async (id: number): Promise<Todo> => {
    try {
      const response = await api.get<Todo>(`/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching todo ${id}:`, error);
      throw error;
    }
  },

  // Create a new todo
  createTodo: async (todo: CreateTodoInput): Promise<Todo> => {
    try {
      const response = await api.post<Todo>('/todos', {
        ...todo,
        userId: todo.userId || 1,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },

  // Update an existing todo
  updateTodo: async (todo: UpdateTodoInput): Promise<Todo> => {
    try {
      const response = await api.put<Todo>(`/todos/${todo.id}`, todo);
      return response.data;
    } catch (error) {
      console.error(`Error updating todo ${todo.id}:`, error);
      throw error;
    }
  },

  // Delete a todo
  deleteTodo: async (id: number): Promise<void> => {
    try {
      await api.delete(`/todos/${id}`);
    } catch (error) {
      console.error(`Error deleting todo ${id}:`, error);
      throw error;
    }
  },
};
