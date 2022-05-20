type checkHandler = (name: string, isChecked: boolean) => void;

export interface BucketProps {
  name: string;
  dblClick: () => void;
}

export interface FileProps {
  name: string;
  size: string;
  click: checkHandler;
  chkAll: boolean;
}

export interface FolderProps {
  name: string;
  click: checkHandler;
  chkAll: boolean;
  dblClick: () => void;
}

export interface ObjectProps {
  list: ObjectInfo[];
  click: checkHandler;
  chkAll: boolean;
  dblClick: (folder: string) => void;
}

export interface ObjectInfo {
  type: string;
  name: string;
  size?: number;
}

export type BucketFC = React.ReactElement<BucketProps>;
export type FileFC = React.ReactElement<FileProps>;
export type FolderFC = React.ReactElement<FolderProps>;
