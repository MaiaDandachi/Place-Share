import { useState, useRef, useEffect, useCallback } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]); // prevents this array from being reinitialized when this function runs again.

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);

      const httpAbortCtrll = new AbortController(); //api supported in browsers.
      activeHttpRequests.current.push(httpAbortCtrll);

      try {
        const response = await fetch(url, {
          method, // method: method
          body,
          headers,
          signal: httpAbortCtrll.signal, // links the request to the aborctrl.
        });

        const responseData = await response.json(); // parse the response from the server.

        //   keeps every controller except for the controller used for this httpreq when the request completes.
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrll
        );

        if (!response.ok) {
          // if the response I get from the server is 400ish or 500ish status code.
          throw new Error(responseData.message); //trigger the catch block
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);

        setIsLoading(false);
        throw err; // so the component that uses this hook receives an error.
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    //   clean up function(componentWillUnmount)
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading: isLoading, error, sendRequest, clearError };
};
