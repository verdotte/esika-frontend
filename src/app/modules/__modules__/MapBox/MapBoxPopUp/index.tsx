import { ReactElement } from 'react';
import { Popup } from 'react-map-gl';
import { IProperty } from 'app/modules/@Types';

interface IPopUpProps {
  property: IProperty | null;
  latitude: number;
  longitude: number;
  closePopUp: () => void;
}

const MapBoxPopUp = ({
  property,
  latitude,
  longitude,
  closePopUp,
}: IPopUpProps): ReactElement => {
  return (
    <Popup
      key={property?.propertyId}
      latitude={latitude}
      longitude={longitude}
      onClose={closePopUp}
    >
      <div>
        <p className="w-40 font-extrabold">{property?.title}</p>
        <p className="overflow-hidden break-words w-40 text-xs">
          {property?.description}
        </p>
      </div>
    </Popup>
  );
};

export default MapBoxPopUp;
