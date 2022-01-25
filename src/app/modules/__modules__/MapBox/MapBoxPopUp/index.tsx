import { ReactElement } from 'react';
import { Popup } from 'react-map-gl';
import { IProperty } from 'app/modules/@Types';

interface IPopUpProps {
  property: IProperty | null;
  latitude: number;
  longitude: number;
  onClose: () => void;
}

const MapBoxPopUp = ({
  property,
  latitude,
  longitude,
  onClose,
}: IPopUpProps): ReactElement => {
  return (
    <Popup
      key={property?.propertyId}
      latitude={latitude}
      longitude={longitude}
      onClose={onClose}
    >
      <p className="w-40 font-extrabold">{property?.title}</p>
      <p className="overflow-hidden break-words w-40 text-xs">
        {property?.description}
      </p>
    </Popup>
  );
};

export default MapBoxPopUp;
