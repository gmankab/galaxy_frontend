import styles from './clan-page.module.css';
import Member from './member/Member';
import clan_avatar_border from '@/assets/Clan_avatar_border.svg';
import ellipse from '@/assets/Ellipse_9.svg';
import clan_avatar_form from '@/assets/Clan_avatar_form.svg';
import clan_avatar from '@/assets/Clan_avatar.svg';
import invite_friend from '@/assets/invite_frined.svg';

function ClanPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <h2 className={styles.header}>
          CLAN
        </h2>
        <div className={styles.avatar}>
          <img className={styles.border} src={clan_avatar_border} alt='' />
          <img className={styles.ellipse} src={ellipse} alt='' />
          <img className={styles.form} src={clan_avatar_form} alt='' />
        </div>
        <div className={styles.profile}>
          <div className={styles.clan_name}>
            Clan name
          </div>
          <div className={styles.clan_logo}>
            <img src={clan_avatar} alt='' />
          </div>
        </div>
        <div className={styles.members}>
          <Member count={2000} name_id='Name1_id' />
          <Member count={1000} name_id='Name2_id' />

        </div>
        <div className={styles.invite_friends}>
          <span>
            invite a friend
          </span>
          <img className={styles.invite_img} src={invite_friend} alt='' />
        </div>
        <div className={styles.leave}>Leave clan </div>
      </div>

    </div>
  );
}
export default ClanPage;
