import { memo } from 'react';
import {
  AllCheckBox,
  CreateFolderButton,
  DeleteButton,
  DownloadButton,
  UploadButton,
} from 'components/actions';
import { ProgressCircle } from 'components/layouts';

function Control() {
  return (
    <div className="flex gap-5">
      <AllCheckBox />
      <UploadButton />
      <CreateFolderButton />
      <DownloadButton />
      <DeleteButton />
      <ProgressCircle />
    </div>
  );
}

export default memo(Control);
