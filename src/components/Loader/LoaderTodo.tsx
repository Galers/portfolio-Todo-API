import { FC } from 'react';
import cn from 'classnames';

interface IProps {
  isLoading: boolean;
  toglleLoad: boolean;
  clear?: boolean;
}

export const LoaderTodo: FC<IProps> = ({ isLoading, toglleLoad, clear }) => {
  return (
    <div
      data-cy="TodoLoader"
      className={cn('modal overlay', {
        'is-active': isLoading || toglleLoad || clear,
      })}
    >
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  );
};
