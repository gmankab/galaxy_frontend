import { useState } from 'react';
import css from './css.module.css';

// export interface UserDataType{
//   color:0|1|2|3|4
//   shape:0|1|2|3|4
//   figure:0

// }

// const default_user_data:UserDataType={
//   color:0,
//   figure:0,
//   shape:0
// }
// const colors:string[]= [
//   '#FF5050',
//   '#FFCE50',
//   '#50FFC0',
//   '#5081FF',
//   '#FF50CE',

// ]

export function ClanCreate() {
  const [clan_name, setClanName] = useState('');
  // const [user_data, setUserData]=useState<UserDataType>(default_user_data)
  return (
    <div className={css.wrapper}>
      <div className={css.page}>
        <h2 className={css.name}>CLAN CREATOR</h2>
        <span style={{
          fontSize: '13px',
        }}
        >
          Choose name:
        </span>
        <input type='text' className={css.enter_name} value={clan_name}onChange={e => setClanName(e.target.value)} placeholder='Click here to name your clan' />
        <span style={{
          fontSize: '13px',
        }}
        >
          Create logo:
        </span>
        <div className={css.avatar}>
          <img className={css.border} />
          <img className={css.ellipse} />
          <img className={css.shape} />
          <img className={css.figure} />
        </div>
        <div className={css.edit_block}>
          <div className={css.block}>
            <div className={`${css.edit_elem} ${css.active}`}>
              <img className={css.shape0} />
            </div>
            <div className={css.edit_elem}>
              <img className={css.shape1} />
            </div>
            <div className={css.edit_elem}>
              <img className={css.shape2} />
            </div>
            <div className={css.edit_elem}>
              <img className={css.shape3} />
            </div>
            <div className={css.edit_elem}>
              <img className={css.shape4} />
            </div>
          </div>
          <div className={css.block}>
            <div className={css.edit_elem}>
              <img className={css.color0} />
            </div>
            <div className={css.edit_elem}>
              <img className={css.color1} />
            </div>
            <div className={css.edit_elem}>
              <img className={css.color2} />
            </div>
            <div className={`${css.edit_elem} ${css.active}`}>
              <img className={css.color3} />
            </div>
            <div className={css.edit_elem}>
              <img className={css.color4} />
            </div>

          </div>
          <div className={css.block}>
            <div className={`${css.edit_elem} ${css.active}`}>
              <img className={css.figure0} />
            </div>
          </div>
        </div>
        <div className={css.create}>
          Create clan
        </div>
        <div className={css.cancel}>
          Cancel
        </div>
      </div>

    </div>
  );
}
