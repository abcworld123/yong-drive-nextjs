export interface BucketProps {
  name: string;
  dblClick: () => void;
}

export interface FileProps {
  name: string;
  size: string;
}

export interface FolderProps {
  name: string;
  dblClick: () => void;
}

export interface FileResObj {
  name: string;
  size: number;
}

export interface FolderResObj {
  name: string;
}

export type BucketFC = React.ReactElement<BucketProps>;
export type FileFC = React.ReactElement<FileProps>;
export type FolderFC = React.ReactElement<FolderProps>;
