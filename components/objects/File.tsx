import Checkbox from '@mui/material/Checkbox';
import { useContext, useEffect, useState } from 'react';
import { HomeContext } from 'pages/[bucket]/[[...path]]';
import FileIcon from 'svg/FIleIcon';
import type { FileFC, FileProps } from 'types/reactTypes';

export default function File({ name, size, click }: FileProps): FileFC {
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
      <div className={`object-icon ${checked ? 'object-icon-checked' : ''}`}>
        <Checkbox className="-translate-x-14 -translate-y-14" sx={{position: 'absolute'}} checked={checked} onClick={() => setChecked(!checked)} />
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
