import { bottomMenuImage, mapButtonImage } from '@/assets/images';

export interface BottomMenuProps {
  onMapButtonClick: () => void;
}

export function BottomMenu({ onMapButtonClick }: BottomMenuProps) {
  return (
    <div className='bottom-menu'>
      <img src={bottomMenuImage} alt='Bottom Menu' className='bottom-menu-image' />
      <div
        className='map-button'
        style={{ backgroundImage: `url(${mapButtonImage})` }}
        onClick={onMapButtonClick}
      >
      </div>
    </div>
  );
};
