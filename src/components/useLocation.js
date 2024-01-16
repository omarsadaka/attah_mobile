import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import I18n from 'i18next';
import Location from '../utils/Location';
import MapConfig from '../utils/mapConfig';

const useLocation = () => {
  const [location, setLocation] = useState({
    location: null,
    error: false,
  });

  const IsGpsOn = useSelector((state) => state.location.IsGpsOn);
  const IsLocationOn = useSelector((state) => state.location.IsLocationOn);
  useEffect(() => {
    console.log('use location ============ ', IsGpsOn);
    if (!IsLocationOn) {
      setLocation({
        location: MapConfig.LOCATIONPH,
        error: I18n.t('enableLocation'),
      });
    } else if (!IsGpsOn) {
      setLocation({
        location: MapConfig.LOCATIONPH,
        error: I18n.t('enableGps'),
      });
    } else {
      Location.getLatestLocation((location) => {
        setLocation({
          location,
          error: false,
        });
      });
    }
  }, [IsGpsOn, IsLocationOn]);

  return location;
};

export default useLocation;
