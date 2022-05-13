import Swal from 'sweetalert2';

export function alertError(msg: string) {
  return Swal.fire({
    icon: 'error',
    title: 'Error',
    text: msg,
  });
}
