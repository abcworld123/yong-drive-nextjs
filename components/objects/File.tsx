import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import useHomeStore from 'hooks/store/useHomeStore';
import FileIcon from 'svg/FIleIcon';
import type { FileProps } from 'types/props';

export default function File({ name, size, click }: FileProps) {
  const { chkAll } = useHomeStore();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    click(name, checked);
  }, [name, checked]);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setChecked(chkAll);
  }, [chkAll]);

  return (
    <div>
      <div className={`object-icon ${checked ? 'object-icon-checked' : ''}`}>
        <Checkbox className="-translate-x-14 -translate-y-14" sx={{ position: 'absolute' }} checked={checked} onClick={() => setChecked(!checked)} />
        <FileIcon size={88} fill="#707070" />
      </div>
      <div className="text-sm">
        <div className="text-center mt-5">
          {name}
        </div>
        <div className="text-center mt-2 text-neutral-400">
          {size}
        </div>
      </div>
    </div>
  );
}
