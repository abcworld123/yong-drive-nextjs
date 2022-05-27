import type { SvgProps } from 'types/props';

export default function FolderIcon({ size, fill }: SvgProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 48 48" fill={fill}>
      <path d="M7.05 40q-1.2 0-2.1-.925-.9-.925-.9-2.075V11q0-1.15.9-2.075Q5.85 8 7.05 8h14l3 3h17q1.15 0 2.075.925.925.925.925 2.075v23q0 1.15-.925 2.075Q42.2 40 41.05 40Zm0-29v26h34V14H22.8l-3-3H7.05Zm0 0v26Z" />
    </svg>
  );
}
