import { AllCheckBox, DeleteButton, DownloadButton, UploadButton } from 'components/actions';

export default function Control() {
  return (
    <div className="flex gap-5">
      <AllCheckBox />
      <UploadButton />
      <DownloadButton />
      <DeleteButton />
    </div>
  );
}
