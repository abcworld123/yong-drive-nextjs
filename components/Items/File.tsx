import * as props from '@interfaces/Items.props';
import { FileIcon } from '@svg/MaterialIcons';

export default function File({ name, size }: props.File) {
  return (
    <div>
      <div className="border-[1px] border-gray-300 rounded-lg w-40 h-40 grid place-items-center ">
        <FileIcon size={100} fill="#707070" />
      </div>
      <div className="text-sm">
        <div className="text-center mt-3">
          {name}
        </div>
        <div className="text-center mt-3 text-neutral-400">
          {size}
        </div>
      </div>
    </div>
  );
}
