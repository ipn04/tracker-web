import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { IRootState } from '@config/store';
import Login from '@pages/auth/login/Login';
import SignUp from '@pages/auth/sign-up/SignUp';

function AuthRouter() {
  const isLoggedIn = useSelector(({ User }: IRootState) => !!User.accessToken);

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
}

export default AuthRouter;
