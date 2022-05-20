import { FileFC, FileProps } from 'types/Objects';
import FileIcon from '@svg/FIleIcon';
import { useState } from 'react';
import { Checkbox } from '@mui/material';

export default function File({ name, size }: FileProps): FileFC {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <div className={`object-icon ${checked ? 'object-icon-checked' : ''}`}>
        <Checkbox className="-translate-x-14 -translate-y-14" sx={{position: 'absolute'}} value={checked} onClick={() => setChecked(!checked)} />
        <FileIcon size={100} fill="#707070" />
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
