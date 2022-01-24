import ReactMapGL, { NavigationControl } from 'react-map-gl';
import { ReactElement, SetStateAction, useState } from 'react';
import keys from 'app/modules/utils/configs/keys';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import { IProperty } from 'app/modules/@Types';
import MapBoxMarker from './MapBoxMarker/index';
import MapBoxPopUp from './MapBoxPopUp/index';
import CloseVector from '../_vectors/closeVector';

interface ICoordinates {
  longitude: number;
  latitude: number;
  zoom: number;
}

interface Props {
  property: IProperty | null;
  isLoading: boolean;
  onClick: () => void;
}

const MapBox = ({
  property,
  isLoading,
  onClick,
}: Props): ReactElement => {
  const [coordinates] = useState({
    lng: 32.58252,
    lat: 0.347596,
  });
  const [displayPupUp, setDisplayPopUp] = useState(true);

  const [viewport, setViewport] = useState<ICoordinates>({
    longitude: coordinates.lng,
    latitude: coordinates.lat,
    zoom: 12,
  });

  const togglePopUp = () => {
    if (displayPupUp) setDisplayPopUp(false);
    else {
      setDisplayPopUp(true);
    }
  };

  return (
    <div className="mt-4 mx-auto">
      <ShowWidget
        condition={!isLoading}
        fallback={
          <div className="w-full h-full mt-3 sm:mt-0 bg-gray-200 animate-pulse" />
        }
      >
        <ReactMapGL
          {...viewport}
          mapStyle={keys.MAPBOX_CUSTOM_STYLE_URL}
          mapboxApiAccessToken={keys.MAPBOX_ACCESS_TOKEN}
          width="100%"
          height="50vh"
          onViewportChange={(
            viewport: SetStateAction<ICoordinates>,
          ): void => {
            setViewport(viewport);
          }}
        >
          <NavigationControl className="right-4 top-4" />
          <div onClick={onClick} aria-hidden>
            <CloseVector className="text-black bg-white shadow-xl rounded-lg mt-4 ml-4 cursor-pointer" />
          </div>
          <MapBoxMarker
            latitude={coordinates.lat}
            longitude={coordinates.lng}
            onClick={togglePopUp}
          />
          {displayPupUp && (
            <MapBoxPopUp
              property={property}
              latitude={coordinates.lat}
              longitude={coordinates.lng}
              onClose={togglePopUp}
            />
          )}
        </ReactMapGL>
      </ShowWidget>
    </div>
  );
};

export default MapBox;
