import Swal from 'sweetalert2';

export function alertSuccess(msg: string) {
  return Swal.fire({
    icon: 'success',
    title: 'Success',
    text: msg,
  });
}

export function alertError(msg: string) {
  return Swal.fire({
    icon: 'error',
    title: 'Error',
    text: msg,
  });
}

export function alertWarn(title: string) {
  return Swal.fire({
    icon: 'warning',
    title: title,
  });
}
