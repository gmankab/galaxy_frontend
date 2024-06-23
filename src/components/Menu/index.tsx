import { ReactElement } from 'react';
import css from './styles.module.css';
import { useToggle } from '@/hooks/useToggle';
import { Button } from '@/components/Button';

export interface MenuProps {
  content: ReactElement;
}

export function Menu({ content }: MenuProps) {
  const [open, toggle] = useToggle();

  return (
    <>
      <Button
        variant='top'
        intent='menu'
        onClick={toggle}
        state={open}
      />
      <div className={`${css.base} ${open ? css.on : css.off}`}>
        <img className={css.bg} />
        {content}
      </div>
    </>
  );
}
