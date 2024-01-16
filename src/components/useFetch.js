import { useState, useEffect, useCallback } from 'react';

const useFetch = (action, params) => {
  const [content, setContent] = useState({
    data: null,
    isLoading: false,
  });
  const fetch = useCallback(async () => {
    try {
      setContent((prev) => ({
        ...prev,
        isLoading: true,
      }));
      if (action) {
        const data = await action(params);

        setContent({
          isLoading: false,
          data,
        });
      } else {
        setContent((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }, [action]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  return { ...content, refresh: fetch };
};

export default useFetch;
