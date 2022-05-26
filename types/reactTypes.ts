import { ObjectInfo } from './apis';

type checkHandler = (name: string, isChecked: boolean) => void;

export interface HomeProps {
  bucket: string;
  path: string;
}

export interface ControlProps {
  chkSet: Set<string>;
}

export interface BucketProps {
  name: string;
  dblClick: (bucket: string) => void;
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

export type ControlFC = React.ReactElement<ControlProps>;
export type BucketFC = React.ReactElement<BucketProps>;
export type FolderFC = React.ReactElement<FolderProps>;
export type FileFC = React.ReactElement<FileProps>;
export type SvgFC = React.ReactElement<SvgProps>;
