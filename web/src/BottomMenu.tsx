// src/BottomMenu.tsx
import React from 'react';
import { bottomMenuImage, mapButtonImage } from './assets/images';

interface BottomMenuProps {
  onMapButtonClick: () => void;
}

const BottomMenu: React.FC<BottomMenuProps> = ({ onMapButtonClick }) => {
  return (
    <div className="bottom-menu">
      <img src={bottomMenuImage} alt="Bottom Menu" className="bottom-menu-image" />
      <div
        className="map-button"
        style={{ backgroundImage: `url(${mapButtonImage})` }}
        onClick={onMapButtonClick}
      ></div>
    </div>
  );
};

export default BottomMenu;


