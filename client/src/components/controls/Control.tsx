import { memo } from 'react';
import {
  AllCheckBox,
  CopyButton,
  CreateFolderButton,
  CutButton,
  DeleteButton,
  DownloadButton,
  PasteButton,
  UploadButton,
} from 'components/actions';
import { ProgressCircle } from 'components/layouts';

function Control() {
  return (
    <div className="flex gap-5">
      <AllCheckBox />
      <UploadButton />
      <CreateFolderButton />
      <PasteButton />
      <CutButton />
      <CopyButton />
      <DownloadButton />
      <DeleteButton />
      <ProgressCircle />
    </div>
  );
}

export default memo(Control);
