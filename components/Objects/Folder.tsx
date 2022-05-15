import { FolderFC, FolderProps } from 'types/Objects';
import FolderIcon from '@svg/FolderIcon';
import { useRouter } from 'next/router';

export default function Folder({ name, path }: FolderProps): FolderFC {
  const router = useRouter();
  return (
    <div>
      <div className="border-[1px] border-gray-300 rounded-lg w-40 h-40 grid place-items-center select-none" onDoubleClick={() => router.push(path)}>
        <FolderIcon size={100} fill="#f9cd52" />
      </div>
      <div className="text-sm">
        <div className="text-center mt-5">
          {name}
        </div>
      </div>
    </div>
  );
}
