import { Button, ButtonProps } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { useCallback, useRef, useState } from 'react';
import type { DropdownProps } from 'types/props';

const buttonStyle = {
  backgroundColor: '#e0e0ea',
  fontSize: '1.1em',
  color: '#222',
  '&:hover': {
    backgroundColor: '#c0c0ca',
  },
};

export default function Dropdown<C extends React.ElementType>({ buttonName, items, ...props }: ButtonProps<C, { component?: C }> & DropdownProps) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleMenuItemClick = useCallback((action: () => void) => {
    action();
    setOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setOpen(open => !open);
  }, []);

  return (
    <>
      <Button variant="contained" size="small" sx={buttonStyle} ref={anchorRef} onClick={handleToggle} {...props}>
        {buttonName}
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} transition>
        {({ TransitionProps }) => (
          <Grow style={{ transformOrigin: 'left top' }} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList>
                  { items.map(({ name, action }) => (
                    <MenuItem key={name} onClick={() => handleMenuItemClick(action)}>{name}</MenuItem>
                  )) }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
