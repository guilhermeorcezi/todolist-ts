import React from 'react';
import { FaCheck, FaPen, FaTimes } from 'react-icons/fa';
import { useTodo, ITodo } from '../../context/TodoListContext';
import { Container } from './styles';

interface TodoProps {
  todo: ITodo;
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
  const { removeTodo, findTodo, checkTodo } = useTodo();

  return (
    <Container key={todo.id}>
      <button type="button" onClick={e => checkTodo(todo.id)}>
        <FaCheck className={todo.status ? 'button-done' : ''} size={21} />
      </button>
      <p className={todo.status ? 'p-done' : ''}>{todo.content}</p>
      <div className="icons">
        <button type="button" onClick={e => findTodo(todo)} className="edit">
          <FaPen size={18} />
        </button>
        <button
          type="button"
          onClick={e => removeTodo(todo.id)}
          className="delete"
        >
          <FaTimes size={18} />
        </button>
      </div>
    </Container>
  );
};

export default Todo;
