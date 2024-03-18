import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '../store/auth';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  let location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location, alert: "로그인이 필요합니다." }}replace />;
  }

  return children;
};

export default PrivateRoute;
