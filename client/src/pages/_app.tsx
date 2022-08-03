import 'styles/globals.scss';
import Head from 'next/head';
import { useCallback, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useSessionStore } from 'hooks/stores';
import Loader from 'svg/Loader';
import { alertError, shakeOutsideClick } from 'utils/alerts';
import api from 'utils/api';
import type { AppProps } from 'next/app';
import type { ResCheck, ResLogin } from 'types/apis';

function App({ Component, pageProps }: AppProps) {
  const isLogin = useSessionStore(state => state.isLogin);

  const login = useCallback(() => {
    Swal.fire({
      icon: 'info',
      title: '비밀번호 입력',
      input: 'password',
      backdrop: true,
      focusConfirm: false,
      allowEscapeKey: false,
      confirmButtonText: '확인',
      showLoaderOnConfirm: true,
      allowOutsideClick: shakeOutsideClick,
      preConfirm: async (pw: string) => {
        pw = pw.trim();
        if (!pw) Swal.showValidationMessage('비밀번호를 입력해주세요.');
        const { data } = await api.post<ResLogin>('/auth/login', { pw });
        if (!data.success) Swal.showValidationMessage('비밀번호가 일치하지 않습니다.');
        else useSessionStore.setState({ isLogin: true });
      },
    });
  }, []);

  const check = useCallback(async () => {
    try {
      const { data } = await api.get<ResCheck>('/auth/check');
      useSessionStore.setState({ isLogin: data.success });
    } catch (err) {
      alertError(err.message);
    }
  }, []);

  useEffect(() => {
    check();
  }, []);

  useEffect(() => {
    if (isLogin === false) {
      login();
    }
  }, [isLogin]);

  return (
    <>
      <Head>
        <title>yong-drive</title>
      </Head>
      {
        isLogin === true
          ? <Component {...pageProps} />
          : <Loader size={150} />
      }
    </>
  );
}

export default App;
