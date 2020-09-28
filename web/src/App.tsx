import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Main from './pages/Main';
import GlobalStyle from './styles/global';
import { TodoListProvider } from './context/TodoListContext';

const App: React.FC = () => {
  return (
    <>
      <TodoListProvider>
        <Main />
        <ToastContainer />
        <GlobalStyle />
      </TodoListProvider>
    </>
  );
};

export default App;
