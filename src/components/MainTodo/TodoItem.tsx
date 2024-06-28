/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useState } from 'react';
import cn from 'classnames';

import { LoaderTodo } from '../Loader/LoaderTodo';
import { Todo } from '../../types/Todo';
import { FormMain } from './TodoItem/FormMain';
import { ButtonMain } from './TodoItem/ButtonMain';

interface IProps {
  todo: Todo;
  loadingTodos: string[];
  checkTodo?: (id: string) => void;
  showError?: (err: string) => void;
}

export const TodoItem: FC<IProps> = ({
  todo,
  loadingTodos,
  checkTodo = () => {},
  showError = () => {},
}) => {
  const [editableTodoId, setEditableTodoId] = useState<string | null>(null);
  const [editableLoad, setEditableLoad] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);
  const [toglleLoad, setToglleLoad] = useState(false);

  const { title, completed = false, id } = todo;
  const isEditable = editableTodoId === id;
  const isLoading = deleteLoadingId === id || editableLoad;
  let clear;

  if (loadingTodos) {
    clear = loadingTodos.includes(todo.id);
  }

  const handleDoubleClick = () => {
    setEditableTodoId(id);
  };

  const handleCheckTodo = async (ids: string) => {
    setToglleLoad(true);
    await checkTodo(ids);
    setToglleLoad(false);
  };

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: completed,
      })}
      title="Change"
      key={id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => handleCheckTodo(id)}
          disabled={loadingTodos.includes(todo.id)}
        />
      </label>

      {isEditable ? (
        <>
          <FormMain
            id={id}
            completed={completed}
            title={title}
            editableTodoId={editableTodoId}
            setEditableTodoId={() => setEditableTodoId(null)}
            showError={showError}
            setEditableLoad={setEditableLoad}
          />
        </>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {title}
          </span>
          <ButtonMain
            id={id}
            showError={showError}
            onDeleteClick={() => setDeleteLoadingId(id)}
          />
        </>
      )}

      <LoaderTodo isLoading={isLoading} toglleLoad={toglleLoad} clear={clear} />
    </div>
  );
};
