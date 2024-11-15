import React, { useState, useCallback } from 'react';

// Custom hook
function useControllableState(defaultValue, valueProp, onChangeProp) {
  const [state, setState] = useState(defaultValue);
  const isControlled = valueProp !== undefined;

  const value = isControlled ? valueProp : state;

  const setValue = useCallback(
    (newValue) => {
      if (isControlled) {
        onChangeProp(newValue);  // Gọi callback khi component được kiểm soát
      } else {
        setState(newValue);  // Thay đổi state nội bộ khi component không được kiểm soát
      }
    },
    [isControlled, onChangeProp]
  );

  return [value, setValue];
}


export default useControllableState;


