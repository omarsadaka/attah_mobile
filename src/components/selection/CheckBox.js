import React, { useCallback, useEffect } from 'react';
import { CheckBoxGroup, AppCheckBox } from '../../common';

const CheckBox = ({ data, onSelect, setSelected, initialValue }) => {
  const onChange = useCallback(
    (values) => {
      console.log("valuesvaluesvalues ", values)
      // if (values.length > 0)
        //   setSelected(true);
        onSelect(values);
    },
    [onSelect, initialValue],
  );
  useEffect(() => {
    if (initialValue) {
      onSelect(initialValue);
    }
  }, [initialValue])
  return (
    <CheckBoxGroup {...{ initialValue }} {...{ onChange }} margin={10}>
      {data &&
        data.map((item) => (
          <AppCheckBox
            // marginVertical={5}
            key={item.id}
            label={item.name}
            value={item.id}
          />
        ))}
    </CheckBoxGroup>
  );
};

export default CheckBox;
