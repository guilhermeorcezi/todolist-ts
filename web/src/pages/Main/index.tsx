import React from 'react';
import TodoList from '../../components/TodoList';
import TodoForm from '../../components/TodoForm';

import { Container, Header } from './styles';

const Main: React.FC = () => {
  return (
    <>
      <Header>
        <strong>ToDo List</strong>
      </Header>
      <Container>
        <div>
          <TodoForm />
          <TodoList />
        </div>
      </Container>
    </>
  );
};

export default Main;
