import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import FolderIcon from '@svg/FolderIcon';
import type { FolderFC, FolderProps } from 'types/objects';

export default function Folder({ name, dblClick, click, chkAll }: FolderProps): FolderFC {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    click(name, checked);
  }, [checked, click, name]);

  useEffect(() => {
    setChecked(chkAll);
  }, [chkAll]);

  return (
    <div>
      <div className={`object-icon ${checked ? 'object-icon-checked' : ''}`} onDoubleClick={dblClick}>
        <Checkbox className="-translate-x-14 -translate-y-14" sx={{position: 'absolute'}} checked={checked} onClick={() => setChecked(!checked)} />
        <FolderIcon size={88} fill="#f9cd52" />
      </div>
      <div className="text-sm">
        <div className="text-center mt-5">
          {name}
        </div>
      </div>
    </div>
  );
}
