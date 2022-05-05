import { handleError } from 'actions';
import { setUserInfo } from 'actions/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios, { setupAxiosInterceptorsRequest, setupAxiosInterceptorsResponse } from 'services/axios';

const useInitApp = () => {
  const dispatch = useDispatch();
  const accessToken = localStorage.accessToken;
  const [initialized, setInitialized] = useState(false);

  if (!initialized) {
    if (accessToken) {
      setupAxiosInterceptorsRequest(axios, accessToken);
      const storedProfile = JSON.parse(localStorage.profile);
      dispatch(setUserInfo(accessToken, storedProfile));
    }

    setupAxiosInterceptorsResponse(axios, (error) => {
      dispatch(handleError(error?.response));
      return Promise.reject(error);
    });

    setInitialized(true);
  }
};

export default useInitApp;
