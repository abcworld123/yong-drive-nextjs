import Button from '@mui/material/Button';
import { memo } from 'react';
import type { ButtonProps } from '@mui/material/Button';

const buttonStyle = {
  backgroundColor: '#e0e0ea',
  fontSize: '1.1em',
  color: '#222',
  '&:hover': {
    backgroundColor: '#c0c0ca',
  },
};

function MainButton<C extends React.ElementType>({ children, ...props }: ButtonProps<C, { component?: C }>) {
  return (
    <Button variant="contained" size="small" sx={buttonStyle} {...props}>
      {children}
    </Button>
  );
}

export default memo(MainButton);
