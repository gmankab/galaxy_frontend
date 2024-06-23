import { useState } from 'react';
import { clanSearchImage, clansMenuImage, clansWallImage } from '@/assets/images';
import { BottomMenu } from '@/components/BottomMenu';

export interface ClansMenuProps {
  onClose: () => void;
}

export function ClansMenu({ onClose }: ClansMenuProps) {
  const [searchText, setSearchText] = useState('');

  return (
    <div className='clans-menu'>
      <div className='clans-menu-content'>
        <input
          type='text'
          className='clan-search'
          style={{ backgroundImage: `url("${clanSearchImage}")` }}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder='Search Clans...'
        />
        <img src={clansMenuImage} alt='Clans Menu' className='clans-menu-image' />
      </div>
      <div className='clans-wall' style={{ backgroundImage: `url("${clansWallImage}")` }}></div>
      <BottomMenu onMapButtonClick={onClose} />
    </div>
  );
};
