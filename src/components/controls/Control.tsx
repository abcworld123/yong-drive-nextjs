import { memo } from 'react';
import { AllCheckBox, DeleteButton, DownloadButton, UploadButton } from 'components/actions';

function Control() {
  return (
    <div className="flex gap-5">
      <AllCheckBox />
      <UploadButton />
      <DownloadButton />
      <DeleteButton />
    </div>
  );
}

export default memo(Control);
