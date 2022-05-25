import type { ObjectInfo } from './reactTypes';
import type { Bucket } from '@aws-sdk/client-s3';
import type { NextApiRequest } from 'next';

// param types
export interface BucketParams {
  Bucket: string;
  Prefix: string;
  Delimiter: string;
}

export interface UploadParams {
  Bucket: string;
  Key: string;
}

// request types
type OverrideNextApiRequest = Omit<NextApiRequest, 'query'>;

export interface ReqBucket extends OverrideNextApiRequest {
  query: BucketParams;
}

export interface ReqUpload extends OverrideNextApiRequest {
  query: UploadParams;
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
