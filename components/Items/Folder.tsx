import * as props from '@interfaces/Items.props';
import { FolderIcon } from '@svg/MaterialIcons';

export default function Folder({ name }: props.Folder) {
  return (
    <div>
      <div className="border-[1px] border-gray-300 rounded-lg w-40 h-40 grid place-items-center ">
        <FolderIcon size={100} fill="#f9cd52" />
      </div>
      <div className="text-sm">
        <div className="text-center mt-3">
          {name}
        </div>
      </div>
    </div>
  );
}