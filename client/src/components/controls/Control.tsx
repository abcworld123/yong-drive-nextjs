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
import { useClipboardStore } from 'hooks/stores';

function Control() {
  const clipboard = useClipboardStore(state => state.mode);

  return (
    <div className="flex gap-5">
      <AllCheckBox />
      <UploadButton />
      <CreateFolderButton />
      <CutButton />
      <CopyButton />
      <PasteButton />
      <DownloadButton />
      <DeleteButton />
      <ProgressCircle />
    </div>
  );
}

export default memo(Control);
