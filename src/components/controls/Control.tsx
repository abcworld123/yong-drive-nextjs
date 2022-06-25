import { memo } from 'react';
import {
  AllCheckBox,
  CreateFolderButton,
  DeleteButton,
  DownloadButton,
  UploadButton,
} from 'components/actions';

function Control() {
  return (
    <div className="flex gap-5">
      <AllCheckBox />
      <UploadButton />
      <CreateFolderButton />
      <DownloadButton />
      <DeleteButton />
    </div>
  );
}

export default memo(Control);
