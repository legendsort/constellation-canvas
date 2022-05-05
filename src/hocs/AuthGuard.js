import React, { memo } from 'react';
import { Redirect } from 'react-router-dom';
import { LINKS } from 'utils/constants';

function AuthGuard({ children }) {
  const accessToken = localStorage.accessToken;

  if (!accessToken) {
    return <Redirect to={LINKS.register} />;
  }

  return children;
}

export default memo(AuthGuard);
