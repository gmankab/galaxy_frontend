import css from './styles.module.css';

export interface MemberProps {
  name_id: string;
  logo?: string;
  count: number;
}

export function Member({ count, name_id }: MemberProps) {
  return (
    <div className={css.member}>
      <div className={css.lfPart}>
        <div className={css.userLogo}></div>
        <p className={css.nameId}>{name_id}</p>
      </div>
      <div>
        <p className={css.count}>{count}</p>
      </div>
    </div>
  );
};
