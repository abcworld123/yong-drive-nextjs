import * as props from '@interfaces/MaterialIcon.props';

function MaterialIcon({ size, fill, children }: props.MaterialIcon) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 48 48" fill={fill}>
      {children}
    </svg>
  );
}

export function FolderIcon({ size, fill }: props.Svg) {
  return (
    <MaterialIcon size={size} fill={fill}>
      <path d="M7.05 40q-1.2 0-2.1-.925-.9-.925-.9-2.075V11q0-1.15.9-2.075Q5.85 8 7.05 8h14l3 3h17q1.15 0 2.075.925.925.925.925 2.075v23q0 1.15-.925 2.075Q42.2 40 41.05 40Zm0-29v26h34V14H22.8l-3-3H7.05Zm0 0v26Z" />
    </MaterialIcon>
  );
}

export function FileIcon({ size, fill }: props.Svg) {
  return (
    <MaterialIcon size={size} fill={fill}>
      <path d="M15.95 35.5h16.1v-3h-16.1Zm0-8.5h16.1v-3h-16.1ZM11 44q-1.2 0-2.1-.9Q8 42.2 8 41V7q0-1.2.9-2.1Q9.8 4 11 4h18.05L40 14.95V41q0 1.2-.9 2.1-.9.9-2.1.9Zm16.55-27.7V7H11v34h26V16.3ZM11 7v9.3V7v34V7Z" />
    </MaterialIcon>
  );
}
