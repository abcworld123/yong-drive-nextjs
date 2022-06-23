import type { DropzoneOptions } from 'react-dropzone';

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

export interface DropdownItem {
  name: string;
  action: () => void;
}

export interface DropdownProps {
  buttonName: string;
  items: DropdownItem[];
}

export interface DndWrapperProps {
  onDrop: DropzoneOptions['onDrop'];
  children: React.ReactElement;
}

export interface DndOverlayProps {
  show: boolean;
}
