import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const DefaultButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: '#e0e0ea',
  fontSize: '1.1em',
  color: '#222',
  '&:hover': {
    backgroundColor: '#c0c0ca',
  },
})) as typeof MainButton;

export default function MainButton({ children, ...props }: ButtonProps) {
  return (
    <DefaultButton variant="contained" size="small" {...props}>
      {children}
    </DefaultButton>
  );
}
