import 'styles/globals.scss';
import axios from 'axios';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { Login } from 'components/common';
import { useSessionStore } from 'hooks/stores';
import Loader from 'svg/Loader';
import type { AppProps } from 'next/app';
import type { ResCheck } from 'types/apis';

function App({ Component, pageProps }: AppProps) {
  const isLogin = useSessionStore(state => state.isLogin);
  const [isLoading, setIsLoading] = useState(true);

  const check = useCallback(async () => {
    const { data } = await axios.get<ResCheck>('/api/auth/check');
    useSessionStore.setState({ isLogin: data.success });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    check();
  }, []);

  return (
    <>
      <Head>
        <title>yong-drive</title>
      </Head>
      {
        (isLoading || isLogin === null)
          ? <Loader size={150} />
          : (
            isLogin
              ? <Component {...pageProps} />
              : <Login />
          )
      }
    </>
  );
}

export default App;
