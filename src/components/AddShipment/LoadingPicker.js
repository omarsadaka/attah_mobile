import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Picker from '../Picker';

const LoadingPicker = ({
  provider,
  isSearch,
  param,
  refresh,
  newAddress,
  ...rest
}) => {
  const addressList = useSelector(state => state.list.addressList);
  const [content, setContent] = useState({
    data: [],
    isLoading: true,
  });
  useEffect(() => {
    getData(param);
    return () => {};
  }, [getData, param, refresh]);
  const getData = useCallback(
    async par => {
      setContent(prev => ({...prev, isLoading: true}));
      if (provider) {
        const data = await provider(par);
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
      marginVertical={3}
      isSearch={isSearch}
      processing={content.isLoading}
      label="name"
      value="id"
      data={
        newAddress
          ? [
              {address_details: newAddress.address_details, id: newAddress.id},
              ...content.data,
            ]
          : content.data
      }
      {...rest}
    />
  );
};

export default LoadingPicker;
