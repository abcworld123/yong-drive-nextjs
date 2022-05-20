import { FolderFC, FolderProps } from 'types/Objects';
import FolderIcon from '@svg/FolderIcon';
import { Checkbox } from '@mui/material';
import { useState } from 'react';

export default function Folder({ name, dblClick }: FolderProps): FolderFC {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <div className={`object-icon ${checked ? 'object-icon-checked' : ''}`} onDoubleClick={dblClick}>
        <Checkbox className="-translate-x-14 -translate-y-14" sx={{position: 'absolute'}} value={checked} onClick={() => setChecked(!checked)} />
        <FolderIcon size={100} fill="#f9cd52" />
      </div>
      <div className="text-sm">
        <div className="text-center mt-5">
          {name}
        </div>
      </div>
    </div>
  );
}
