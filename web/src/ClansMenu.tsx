
// src/ClansMenu.tsx
import React, { useState } from 'react';
import { clansMenuImage, clansWallImage, clanSearchImage } from './assets/images';
import BottomMenu from './BottomMenu';

interface ClansMenuProps {
  onClose: () => void;
}

const ClansMenu: React.FC<ClansMenuProps> = ({ onClose }) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSearchText(text);
    console.log(text);
  };

  return (
    <div className="clans-menu">
      <div className="clans-menu-content">
        <input
          type="text"
          className="clan-search"
          style={{ backgroundImage: `url(${clanSearchImage})` }}
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search Clans..."
        />
        <img src={clansMenuImage} alt="Clans Menu" className="clans-menu-image" />
      </div>
      <div className="clans-wall" style={{ backgroundImage: `url(${clansWallImage})` }}></div>
      <BottomMenu onMapButtonClick={onClose} />
    </div>
  );
};

export default ClansMenu;

