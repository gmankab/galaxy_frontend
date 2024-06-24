import css from './css.module.css';
import { Member } from './member/index';

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
          <div className={css.clan_name}>
            Clan name
          </div>
          <div className={css.clan_logo}>
          </div>
        </div>
        <div className={css.members}>
          <Member count={2000} name_id='Name1_id' />
          <Member count={1000} name_id='Name2_id' />

        </div>
        <div className={css.invite_friends}>
          <span>
            invite a friend
          </span>
          <div className={css.invite_img}></div>
        </div>
        <div className={css.leave}>Leave clan </div>
      </div>

    </div>
  );
}
