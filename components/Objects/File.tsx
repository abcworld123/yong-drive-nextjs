import { FileFC, FileProps } from 'types/Objects';
import { FileIcon } from '@svg/MaterialIcons';

export default function File({ name, size }: FileProps): FileFC {
  return (
    <div>
      <div className="border-[1px] border-gray-300 rounded-lg w-40 h-40 grid place-items-center select-none">
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
