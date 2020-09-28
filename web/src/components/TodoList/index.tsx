import React from 'react';
import { useTodo } from '../../context/TodoListContext';

import Todo from '../Todo';

import { EmptyList } from './styles';

const TodoList: React.FC = () => {
  const { todo } = useTodo();

  return todo.length ? (
    <ul>
      {todo.map(item => {
        return <Todo todo={item} key={item.id} />;
      })}
    </ul>
  ) : (
    <EmptyList>Vázio</EmptyList>
  );
};

export default TodoList;
