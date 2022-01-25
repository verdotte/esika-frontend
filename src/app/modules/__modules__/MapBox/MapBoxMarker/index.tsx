import { ReactElement } from 'react';
import { Marker } from 'react-map-gl';
import LocationVector from 'app/modules/__modules__/_vectors/LocationVector';

interface IMarkerProps {
  latitude: number;
  longitude: number;
  onClick: () => void;
}

const MapBoxMarker = ({
  latitude,
  longitude,
  onClick,
}: IMarkerProps): ReactElement => {
  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
      onClick={onClick}
    >
      <LocationVector className="text-red-600 h-10 w-10 animate-bounce cursor-pointer" />
    </Marker>
  );
};

export default MapBoxMarker;
