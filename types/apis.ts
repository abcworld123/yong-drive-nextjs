import { ObjectInfo } from './services';
import type { Bucket } from '@aws-sdk/client-s3';
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

// request types
type OverrideNextApiRequest = Omit<NextApiRequest, 'query'>;

export interface ReqBucket extends OverrideNextApiRequest {
  query: BucketParams;
}

export interface ReqUploadObject extends OverrideNextApiRequest {
  query: UploadParams;
}

export interface ReqDownloadObjects extends OverrideNextApiRequest {
  body: DownloadFormdata;
}

export interface ReqDeleteObjects extends OverrideNextApiRequest {
  body: DeleteFormdata;
}

// response types
export interface ResDefault {
  success: boolean;
}

export interface ResBucketList extends ResDefault {
  buckets?: Bucket[];
}

export interface ResObjectList extends ResDefault {
  objects?: ObjectInfo[];
}
