import { FC, useContext } from 'react';

import { TodoContext } from '../../Context/TodoContext';
import { ButtonFooter } from './ButtonFooter';
import { FILTER_LINKS } from '../../utils/constants';
import { FilterFooter } from './FilterTodo';

interface IProps {
  showError: (err: string) => void;
  setLoadingTodos: (ids: string[]) => void;
}

export const FooterTodo: FC<IProps> = ({ showError, setLoadingTodos }) => {
  const { numberNotComplete } = useContext(TodoContext);
  const numberQuantity = numberNotComplete > 1 ? ' items' : ' item';

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {numberNotComplete}
        {numberQuantity} left
      </span>

      <FilterFooter items={FILTER_LINKS} />

      <ButtonFooter showError={showError} setLoadingTodos={setLoadingTodos} />
    </footer>
  );
};
