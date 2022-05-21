import { CircularProgress } from '@mui/material';

interface LoaderProps {
  show: boolean;
}

export default function Loader({ show }: LoaderProps) {
  return (
    <div className={`absolute top-1/2 left-1/2 -ml-[22px] -mt-[22px] ${show ? '' : 'hidden'}`}>
      <CircularProgress />
    </div>
  );
}
