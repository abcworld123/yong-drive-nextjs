import type { ObjectInfo } from './services';

type checkHandler = (name: string, isChecked: boolean) => void;

export interface HomeProps {
  bucket: string;
  path: string;
}

export interface BucketProps {
  name: string;
  dblClick: (bucketName: string) => void;
}

export interface ObjectProps {
  click: checkHandler;
  dblClick: (folder: string) => void;
}

export interface FolderProps {
  name: string;
  click: checkHandler;
  dblClick: (name: string) => void;
}

export interface FileProps {
  name: string;
  size: string;
  click: checkHandler;
}

export interface SvgProps {
  size?: number;
  fill?: string;
}

export interface HomeContextProps {
  bucket: string;
  path: string;
  objects: ObjectInfo[];
  chkAll: boolean;
  toggleChkAll: () => void;
  reload: () => void;
}

export interface DndOverlayProps {
  isDragAccept: boolean;
}
