/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { TodoContext, TodoDispatch } from '../../Context/TodoContext';
import { FilterContext } from '../../Context/FilterContext';
import { Todo } from '../../types/Todo';
import { updateTodo } from '../../api/todos';
import { TodoItem } from './TodoItem';

type TProps = {
  tempTodo: Todo | null;
  loadingTodos: string[];
  showError: (err: string) => void;
};

export const MainTodo: FC<TProps> = ({ tempTodo, loadingTodos, showError }) => {
  const { filteredTodos } = useContext(FilterContext);
  const { todos } = useContext(TodoContext);
  const dispatch = useContext(TodoDispatch);

  const checkTodo = async (id: string) => {
    try {
      const index = todos.findIndex(todo => todo.id === id);

      const updatedTodo = {
        ...todos[index],
        completed: !todos[index].completed,
      };

      await updateTodo(updatedTodo);

      dispatch({ type: 'CHECK_TODO', payload: id });
    } catch {
      showError('Unable to update a todo');
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup>
        {filteredTodos.map(todo => (
          <CSSTransition key={todo.id} timeout={300} classNames="item">
            <TodoItem
              key={todo.id}
              todo={todo}
              loadingTodos={loadingTodos}
              checkTodo={checkTodo}
              showError={showError}
            />
          </CSSTransition>
        ))}
        {tempTodo && (
          <CSSTransition key={tempTodo.id} timeout={300} classNames="temp-item">
            <TodoItem todo={tempTodo} loadingTodos={loadingTodos} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </section>
  );
};
