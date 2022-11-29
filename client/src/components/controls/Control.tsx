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
import styles from 'styles/Layouts.module.scss';

function Control() {
  return (
    <div className={styles.controlContainer}>
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
