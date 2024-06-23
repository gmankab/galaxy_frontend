import { FC } from 'react';
import styles from './member.module.css';
import logo_skeleton from '@/assets/logo_skeleton.svg';

interface IProps {
  name_id: string;
  logo?: string;
  count: number;
}

const Member: FC<IProps> = ({ count, name_id, logo }) => {
  return (
    <div className={styles.member}>
      <div className={styles.lf_part}>
        <img src={logo || logo_skeleton} className={styles.user_logo} alt='' />
        <p className={styles.name_id}>{name_id}</p>
      </div>
      <div className={styles.rt_part}>
        <p className={styles.count}>{count}</p>
      </div>
    </div>
  );
};
export default Member;
