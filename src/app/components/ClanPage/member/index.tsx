import css from './css.module.css';
import logo_skeleton from '@/assets/logo_skeleton.svg';

export interface MemberProps {
  name_id: string;
  logo?: string;
  count: number;
}

export function Member({ count, name_id, logo }: MemberProps) {
  return (
    <div className={css.member}>
      <div className={css.lf_part}>
        <img src={logo || logo_skeleton} className={css.user_logo} alt='' />
        <p className={css.name_id}>{name_id}</p>
      </div>
      <div className={css.rt_part}>
        <p className={css.count}>{count}</p>
      </div>
    </div>
  );
};
