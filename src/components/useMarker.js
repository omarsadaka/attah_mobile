import {useState, useEffect, useCallback} from 'react';
import MapConfig from '../utils/mapConfig';

const useMarker = (location, ref, otherFunctions) => {
  const [markerCoords, setMarkerCoords] = useState(
    location || MapConfig.DEFAULT_REGION,
  );
  useEffect(() => {
    ref.current = {getCurrentMarkerPos, ...otherFunctions};
  }, [getCurrentMarkerPos, ref, otherFunctions]);
  const getCurrentMarkerPos = useCallback(() => {
    return markerCoords;
  }, [markerCoords]);

  return [setMarkerCoords, markerCoords];
};

export default useMarker;
