import css from './css.module.css';

export interface MemberProps {
  name_id: string;
  logo?: string;
  count: number;
}

export function Member({ count, name_id, logo }: MemberProps) {
  return (
    <div className={css.member}>
      <div className={css.lf_part}>
        <div className={css.user_logo} ></div>
        <p className={css.name_id}>{name_id}</p>
      </div>
      <div className={css.rt_part}>
        <p className={css.count}>{count}</p>
      </div>
    </div>
  );
};
