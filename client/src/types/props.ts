import type { DownloadBody } from './apis';
import type { GetServerSidePropsContext } from 'next';
import type { DropzoneOptions } from 'react-dropzone';

type checkHandler = (name: string) => void;

export interface HomeProps {
  bucket: string;
  path: string;
}

export interface BucketProps {
  name: string;
  intoBucket: (bucket: string) => void;
}

export interface ObjectProps {
  check: checkHandler;
  intoFolder: (folder: string) => void;
}

export interface FolderProps {
  name: string;
  check: checkHandler;
  checked: boolean;
  checkMode: boolean;
  intoFolder: (name: string) => void;
}

export interface FileProps {
  name: string;
  check: checkHandler;
  checked: boolean;
  checkMode: boolean;
  size: string;
}

export interface DownloaderProps {
  body: DownloadBody;
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

// ssr
export interface HomeServerSideContext extends GetServerSidePropsContext {
  query: {
    bucket: string;
    path?: string[];
  };
}
