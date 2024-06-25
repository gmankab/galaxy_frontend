import css from './styles.module.css';
import logo_skeleton from '@/assets/logo_skeleton.svg';

export interface ClanProps {
  title: string;
  logo?: string;
}

export function Clan({ title, logo }: ClanProps) {
  return (
    <div className={css.clan}>
      <div className={css.lfPart}>
        <img src={logo || logo_skeleton} alt='' />
        <p className={css.nameId}>{title}</p>
      </div>
      <div>
        <button type='button' className={css.plusBtn}>+</button>
      </div>
    </div>
  );
}
