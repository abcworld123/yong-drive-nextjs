export interface FileProps {
  name: string;
  size: string;
}

export interface FolderProps {
  name: string;
}

export interface FileResObj {
  name: string;
  size: number;
}

export interface FolderResObj {
  name: string;
}

export type FileFC = React.ReactElement<FileProps>;
export type FolderFC = React.ReactElement<FolderProps>;
