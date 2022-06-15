import { memo } from 'react';
import type { SvgProps } from 'types/props';

function DeleteIcon({ size, fill }: SvgProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 48 48" fill={fill}>
      <path d="M19.75 33.35 24 29.1 28.25 33.35 30.35 31.25 26.1 27 30.35 22.75 28.25 20.65 24 24.9 19.75 20.65 17.65 22.75 21.9 27 17.65 31.25ZM10.5 11V8H17.2L19.2 6H28.8L30.8 8H37.5V11ZM15 42Q13.8 42 12.9 41.1Q12 40.2 12 39V12H36V39Q36 40.2 35.1 41.1Q34.2 42 33 42Z" />
    </svg>
  );
}

export default memo(DeleteIcon);
