import css from './styles.module.css';

export function OrientationWarning() {
  return (
    <div className={css.base}>
      <span>Пожалуйста, поверните устройство в вертикальное положение.</span>
    </div>
  );
};
