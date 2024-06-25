import css from './css.module.css';
import logo_skeleton from '@/assets/logo_skeleton.svg';

export interface ClanProps {
  title: string;
  logo?: string;
}

export function Clan({ title, logo }: ClanProps) {
  return (
    <div className={css.clan}>
      <div className={css.lf_part}>
        <img src={logo || logo_skeleton} className={css.user_logo} alt='' />
        <p className={css.name_id}>{title}</p>
      </div>
      <div className={css.rt_part}>
        <button type='button' className={css.plusBtn}>+</button>
      </div>
    </div>
  );
}
