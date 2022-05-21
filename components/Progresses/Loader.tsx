import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';

interface LoaderProps {
  show: boolean;
}

export default function Loader({ show, ...props }: CircularProgressProps & LoaderProps) {
  return (
    <div className={`absolute top-1/2 left-1/2 -ml-[22px] -mt-[22px] ${show ? '' : 'hidden'}`}>
      <CircularProgress {...props} />
    </div>
  );
}
