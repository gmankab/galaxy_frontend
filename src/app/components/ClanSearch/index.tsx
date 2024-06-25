import { useState } from 'react';
import { Clan } from './components/Clan';

import css from './styles.module.css';

export function ClanSearch() {
  const [searchText, setSearchText] = useState('');

  return (
    <div className={css.wrapper}>
      <div className={css.page}>
        <h2 className={css.pageTitle}>
          CLAN
        </h2>
        <div className={css.inputBox}>
          <p className={css.inputTitle}>Choose clan:</p>
          <input
            type='text'
            className={css.inputSearch}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder='Search'
          />
        </div>
        <div className={/* TODO css.clanBox */ ''}>
          <p className={css.clanTitle}>Top clans:</p>
          <div className={css.clanList}>
            <Clan title='Clan_id' />
          </div>
        </div>
        <div className={css.clanCreate}>
          <p>
            or create your clan:
          </p>
          <button type='button' className={css.createBtn}>
            Create clan
          </button>
        </div>
      </div>
    </div>
  );
}
