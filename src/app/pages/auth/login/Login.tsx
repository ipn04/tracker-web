import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@reducers/user/UserApi';
import './LoginStyle.scss';

function Login() {
  const [ loginMutation ] = useLoginMutation();
  const navigate = useNavigate();

  console.log('Login rendered');
  const handleLogin = async () => {
    try {
      const res = await loginMutation({
        email: 'test@example.com',
        password: 'password123'
      }).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const goToSignup = () => {
    navigate('/auth/signup');
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login</button>
      <button onClick={goToSignup}>Go to Sign Up</button>
    </div>
  );
}

export default Login;