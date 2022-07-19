import type { ObjectInfo } from './services';
import type { NextApiRequest } from 'next';

// param, formdata types
export interface BucketParams {
  bucket: string;
  path: string;
}

export interface UploadParams {
  bucket: string;
  path: string;
  filename: string;
}

export interface CreateFolderFormdata {
  bucket: string;
  path: string;
  foldername: string;
}

export interface DownloadFormdata {
  bucket: string;
  path: string;
  filenames: string[];
}

export interface DeleteFormdata {
  bucket: string;
  path: string;
  objects: string[];
}

// response types
export interface ResDefault {
  success: boolean;
}

// response types
export interface ResWithErrMsg extends ResDefault {
  errMsg?: string;
}

export interface ResBucketList extends ResDefault {
  buckets?: Bucket[];
}

export interface ResObjectList extends ResDefault {
  objects?: ObjectInfo[];
}

// etc
interface Bucket {
  Name: string;
  CreationDate: string;
}
