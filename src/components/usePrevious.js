import {useEffect, useRef} from 'react';

const usePrevious = value => {
console.log("🚀 ~ file: usePrevious.js ~ line 4 ~ value", value)
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
    console.log("🚀 ~ file: usePrevious.js ~ line 11 ~ useEffect ~ current", ref.current)
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
};

export default usePrevious;
