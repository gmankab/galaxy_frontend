import { useContext, useEffect } from 'react';
import { BottomMenu } from '@/components/BottomMenu';
import { sectors_map } from '@/assets/images';
import { IRouteContext, RouteContext } from '@/context/routeContext';

export function SectorPicker() {
  const { setPage } = useContext(RouteContext) as IRouteContext;
  useEffect(() => {
    const svgObject = document.getElementById('sectors-svg') as HTMLObjectElement;

    const handleLoad = () => {
      const svgDoc = svgObject.contentDocument;
      if (svgDoc) {
        const elements = svgDoc.querySelectorAll('[id^="?_"]');
        elements.forEach((element) => {
          const svgElement = element as unknown as SVGGraphicsElement;

          const bbox = svgElement.getBBox();

          const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

          overlay.setAttribute('x', (bbox.x - 20).toString());
          overlay.setAttribute('y', (bbox.y - 20).toString());
          overlay.setAttribute('width', (bbox.width + 40).toString());
          overlay.setAttribute('height', (bbox.height + 40).toString());
          overlay.setAttribute('fill', 'transparent');
          overlay.setAttribute('cursor', 'pointer');

          svgDoc.documentElement.appendChild(overlay);

          const handleClick = () => {
            console.log(`Element ${element.id} clicked`);
            element.dispatchEvent(new Event('click'));
            // WHEN CLICK TO "?" ELEMENT OF SVG THERE SHOW ALERT BOX
            window.alert(`Element ${element.id} clicked`);
          };

          overlay.addEventListener('click', handleClick);
          overlay.addEventListener('touchend', handleClick);
        });
      }
    };

    if (svgObject) {
      svgObject.addEventListener('load', handleLoad);
    }

    return () => {
      if (svgObject) {
        svgObject.removeEventListener('load', handleLoad);
      }
    };
  }, []);

  return (
    <div className='sector-picker'>
      <div className='sector-picker-container'>
        <h2>Sector</h2>
        <object id='sectors-svg' data={sectors_map} type='image/svg+xml' aria-label='map'></object>
      </div>
      <BottomMenu onMapButtonClick={() => setPage('main')} />
    </div>
  );
}
