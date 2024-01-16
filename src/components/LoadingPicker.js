import React, {useCallback, useEffect, useState} from 'react';
import Picker from './Picker';
const LoadingPicker = ({provider, isSearch, param, address, ...rest}) => {
  const [content, setContent] = useState({
    data: [],
    isLoading: true,
  });

  useEffect(() => {
    getData(param);
  }, [getData, param]);

  const getData = useCallback(
    async par => {
      setContent(prev => ({...prev, isLoading: true}));
      if (provider) {
        const data = await provider(par);
        // console.log("data in provide ========================", data.length)
        setContent({
          data,
          isLoading: false,
        });
      } else {
        setContent(prev => ({...prev, isLoading: false}));
      }
    },
    [provider],
  );

  return (
    <Picker
      isSearch={isSearch}
      marginVertical={3}
      processing={content.isLoading}
      label="name"
      value="id"
      address={address}
      data={content.data}
      {...{param}}
      {...rest}
    />
  );
};

LoadingPicker.defaultProps = {
  isSearch: true,
  address: false,
};
export default LoadingPicker;
