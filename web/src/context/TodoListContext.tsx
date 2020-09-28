import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

export interface ITodo {
  id: number;
  content: string;
  status: boolean;
}

interface IEditMode {
  editMode: boolean;
  todo: ITodo | null;
}

interface TodoContextData {
  todo: ITodo[];
  editModeState: IEditMode;
  editTodo: ITodo | undefined;
  addTodo(content: string): Promise<void>;
  removeTodo(id: number): Promise<void>;
  findTodo(todo: object): void;
  editContent(content: string): Promise<void>;
  checkTodo(id: number): Promise<void>;
}

const TodoListContext = createContext<TodoContextData>({} as TodoContextData);

const TodoListProvider: React.FC = ({ children }) => {
  const [todo, setTodo] = useState<ITodo[]>([]);
  const [editModeState, setEditModeState] = useState<IEditMode>({
    editMode: false,
    todo: null,
  });

  const [editTodo, setEditTodo] = useState<ITodo>();

  useEffect(() => {
    async function loadTodo(): Promise<void> {
      const response = await api.get('/todos');
      setTodo(response.data);
    }
    loadTodo();
  }, []);

  async function addTodo(content: string): Promise<void> {
    if (
      todo
        .map((todo: ITodo) => todo.content.toLowerCase())
        .some(todo => todo === content.toLowerCase())
    ) {
      toast.error('Erro ao criar novo ToDo');
    } else {
      const response = await api.post('/todos', { content });
      setTodo([...todo, response.data]);
    }
  }

  async function removeTodo(id: number): Promise<void> {
    await api.delete(`/todos/${id}`);

    setTodo(todo.filter(todo => todo.id !== id));
  }

  function findTodo(todo: ITodo): void {
    setEditModeState({
      editMode: todo !== editModeState.todo,
      todo,
    });

    setEditTodo(todo);
  }

  async function editContent(content: string): Promise<void> {
    if (
      todo
        .map(todo => todo.content.toLowerCase())
        .some(todo => todo === content.toLowerCase())
    ) {
      toast.error('Erro ao editar todo');
    } else if (
      todo.map(todo => todo).some(todo => todo.id === editModeState.todo?.id)
    ) {
      const response = await api.patch(`/todos/${editModeState.todo?.id}`, {
        content,
      });
      setEditModeState({ editMode: false, todo: null });
      const todoId = response.data[0].id;
      const todoContent = response.data[0].content;

      const todoUpdated = todo.map(todoItem =>
        todoItem.id === todoId
          ? { ...todoItem, content: todoContent }
          : todoItem,
      );

      setTodo(todoUpdated);
    }
  }

  async function checkTodo(id: number): Promise<void> {
    await api.put(`/todos/${id}`);

    const todoUpdated = todo.map(todoItem =>
      todoItem.id === id ? { ...todoItem, status: true } : todoItem,
    );

    setTodo(todoUpdated);
  }

  return (
    <TodoListContext.Provider
      value={{
        todo,
        editModeState,
        addTodo,
        removeTodo,
        findTodo,
        editContent,
        editTodo,
        checkTodo,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};

function useTodo(): TodoContextData {
  const context = useContext(TodoListContext);

  if (!context)
    throw new Error('useTodo must be used within an TodoListContext');

  return context;
}

export { TodoListProvider, useTodo };
