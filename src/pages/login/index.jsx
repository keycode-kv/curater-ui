import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getData } from '../../services/users';
import { useUserStore } from '../../stores/users';

const LoginPage = () => {
    const { user, setUser } = useUserStore();

    const { loading, run } = useRequest(getData, {
        manual: true,
        onSuccess: result => {
          setUser(result.uid);
        },
        onError: e => {
          console.log(e);
        },
      });
    
      useEffect(() => {
        run();
      }, []);
    
      console.log({loading}, {user})

      return (<div>Login Page</div>)
}

const Login = () =>
  <Routes>
    <Route path="sign-up" element={<div>Sign up Page</div>} />
    <Route path="*" element={<LoginPage />} />
  </Routes>

export default Login;