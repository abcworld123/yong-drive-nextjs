import axios from 'axios';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useSessionStore } from 'hooks/stores';
import { shakeOutsideClick } from 'utils/alerts';
import type { ResLogin } from 'types/apis';

export default function Login() {
  useEffect(() => {
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
        const { data } = await axios.post<ResLogin>('/api/login', { pw });
        if (!data.success) Swal.showValidationMessage('비밀번호가 일치하지 않습니다.');
        else useSessionStore.setState({ isLogin: true });
      },
    });
  }, []);

  return null;
}
