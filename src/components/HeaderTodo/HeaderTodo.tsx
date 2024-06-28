import { FC, useContext, useState } from 'react';
import classNames from 'classnames';

import { TodoContext, TodoDispatch } from '../../Context/TodoContext';
import { FormHeader } from '../HeaderTodo/FormHeader';
import { Todo } from '../../types/Todo';
import { updateTodo } from '../../api/todos';

interface IProps {
  showError: (err: string) => void;
  setTempTodo: (todo: Todo | null) => void;
  setLoadingTodos: (todoId: string[]) => void;
}

export const HeaderTodo: FC<IProps> = ({
  showError,
  setTempTodo,
  setLoadingTodos,
}) => {
  const [load, setLoad] = useState(false);
  const { todos, allCompleted } = useContext(TodoContext);
  const dispatch = useContext(TodoDispatch);

  const handleToggleAll = async () => {
    const todosToUpdate = allCompleted
      ? todos.map(todo => ({ ...todo, completed: false }))
      : todos
          .filter(todo => !todo.completed)
          .map(todo => ({ ...todo, completed: true }));

    const todoIds = todosToUpdate.map(todo => todo.id);

    setLoadingTodos(todoIds);
    setLoad(true);
    try {
      await Promise.all(
        todosToUpdate.map(({ id, title, completed }) =>
          updateTodo({
            id,
            title,
            completed,
          }),
        ),
      );

      dispatch({ type: 'CHECK_ALL_TODO' });
    } catch {
      showError('Unable to update a todo');
    } finally {
      setLoad(false);
      setLoadingTodos([]);
    }
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
          disabled={load}
        />
      )}

      <FormHeader
        showError={showError}
        setTempTodo={setTempTodo}
        setLoadingTodos={setLoadingTodos}
      />
    </header>
  );
};
