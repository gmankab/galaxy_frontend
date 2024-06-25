import { Member } from './components/Member/index';

import css from './styles.module.css';

export function ClanPage() {
  return (
    <div className={css.wrapper}>
      <div className={css.page}>
        <h2 className={css.header}>
          CLAN
        </h2>
        <div className={css.avatar}>
          <div className={css.border}></div>
          <div className={css.ellipse}></div>
          <div className={css.form}></div>
        </div>
        <div className={css.profile}>
          <div className={css.clanName}>
            Clan name
          </div>
          <div className={css.clanLogo}>
          </div>
        </div>
        <div className={css.members}>
          <Member count={2000} name_id='Name1_id' />
          <Member count={1000} name_id='Name2_id' />
        </div>
        <div className={css.inviteFriends}>
          <span>
            invite a friend
          </span>
          <div className={css.inviteImg}></div>
        </div>
        <div className={css.leave}>Leave clan </div>
      </div>
    </div>
  );
}
