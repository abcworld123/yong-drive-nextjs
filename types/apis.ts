import type { ObjectInfo } from './objects';
import type { Bucket } from '@aws-sdk/client-s3';
import type { NextApiRequest } from 'next';

// param types
export interface BucketParams {
  Bucket: string;
  Prefix: string;
  Delimiter: string;
}

export interface LocalWriteParams {
  Bucket: string;
  Key: string;
  file: File;
}

export type LocalWritedParams = Omit<LocalWriteParams, 'file'>;

// request types
export interface ReqBucket extends OverrideNextApiRequest {
  query: BucketParams;
}

export interface ReqLocalWrite extends NextApiRequest {
  body: LocalWritedParams;
  file: MulterFile;
}

// response types
export interface ResBucketList {
  success: boolean;
  buckets?: Bucket[];
}

export interface ResObjectList {
  success: boolean;
  objects?: ObjectInfo[];
}
