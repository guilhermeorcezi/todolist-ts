import React, { useCallback, useState, useEffect } from 'react';
import { FaPlus, FaCheck } from 'react-icons/fa';
import { Form } from './styles';
import { useTodo } from '../../context/TodoListContext';

const TodoForm: React.FC = () => {
  const { addTodo, editTodo, editContent, editModeState } = useTodo();

  const [content, setContent] = useState('');

  useEffect(() => {
    if (editModeState.editMode && editTodo) {
      setContent(editTodo.content);
    } else {
      setContent('');
    }
  }, [editModeState.editMode, editTodo]);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      if (editModeState.editMode) {
        editContent(content);
      } else {
        addTodo(content);
        setContent('');
      }
    },
    [addTodo, content, editContent, editModeState.editMode],
  );

  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Novo Item"
        value={content}
        required
        onChange={e => setContent(e.target.value)}
      />
      <button type="submit">
        {editModeState.editMode ? (
          <FaCheck color="#FFF" size={14} />
        ) : (
          <FaPlus color="#FFF" size={14} />
        )}
      </button>
    </Form>
  );
};

export default TodoForm;
