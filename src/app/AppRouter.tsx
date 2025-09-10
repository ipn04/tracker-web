import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Navigate,
  Route,
  Routes,
  useLocation
} from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';

// import ClientRouter from '@components/client/ClientRouter';
// import ErrorRouter from '@components/error/ErrorRouter';
import { IRootState } from '@config/store';
import AuthRouter from '@pages/auth/AuthRouter';
// import {
//   useGetAppConfigAndFiltersMutation,
// } from '@reducers/app/AppApi';
import { useLazyGetUserQuery } from '@reducers/user/UserApi';
import LoadingBlock from '@shared/utils/LoadingBlock';
// import useAppTheme from '@shared/hooks/useAppTheme';
// import LoadingBlock from '@shared/utils/LoadingBlock';

// import 'react-toastify/dist/ReactToastify.css';

const Wrapper = ({ children }: { children?: any }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    if (location.hash) return;
    document.documentElement.scrollTo(0, 0);
  }, [ location.pathname, location.hash ]);

  return children;
};

function AppRouter() {
  // const { initializeTheme } = useAppTheme();

  const [ loading, setLoading ] = useState(true);

  const isLoggedIn = useSelector(({ User }: IRootState) => !!User.accessToken);
  const [ getUserDetailsRequest ] = useLazyGetUserQuery();
  // const [ getAppConfigAndFiltersRequest ] = useGetAppConfigAndFiltersMutation();

  // component did mount
  useEffect(() => {
    const onMount = async () => {
      // initializeTheme();

      if (isLoggedIn) {
        await getUserDetailsRequest();
        // await getAppConfigAndFiltersRequest({}).unwrap();
      }

      setLoading(false);
    };

    onMount();
  }, []);

  if (loading) return <LoadingBlock enabled />;

  return (
    <Wrapper>
      <Routes>
        {/* <Route path="/*" element={<ClientRouter />} /> */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="auth/*" element={<AuthRouter />} />

        {/* <Route path="/errors/*" element={<ErrorRouter />} /> */}
      </Routes>

      {/* <ToastContainer position="bottom-right" theme="dark" autoClose={3000} /> */}
    </Wrapper>
  );
}

export default AppRouter;
