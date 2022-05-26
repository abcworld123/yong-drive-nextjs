import Checkbox from '@mui/material/Checkbox';
import { useContext, useEffect, useState } from 'react';
import FolderIcon from '@svg/FolderIcon';
import { HomeContext } from 'pages/[bucket]/[[...path]]';
import type { FolderFC, FolderProps } from 'types/reactTypes';

export default function Folder({ name, click, dblClick }: FolderProps): FolderFC {
  const { chkAll } = useContext(HomeContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    click(name, checked);
  }, [name, checked]);

  useEffect(() => {
    setChecked(chkAll);
  }, [chkAll]);

  return (
    <div>
      <div className={`object-icon ${checked ? 'object-icon-checked' : ''}`} onDoubleClick={() => dblClick(name)}>
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
