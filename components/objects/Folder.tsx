import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import useHomeStore from 'hooks/store/useHomeStore';
import FolderIcon from 'svg/icons/FIleIcon';
import type { FolderProps } from 'types/props';

export default function Folder({ name, click, dblClick }: FolderProps) {
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
      <div className={`object-icon ${checked ? 'object-icon-checked' : ''}`} onDoubleClick={() => dblClick(name)}>
        <Checkbox className="-translate-x-14 -translate-y-14" sx={{ position: 'absolute' }} checked={checked} onClick={() => setChecked(!checked)} />
        <FolderIcon size={88} fill="#f9cd52" />
      </div>
      <div className="text-sm">
        <div className="text-center mt-5">
          {name.slice(0, -1)}
        </div>
      </div>
    </div>
  );
}
