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
export interface ResDefault {
  success: boolean;
}

export interface ResBucketList extends ResDefault {
  buckets?: Bucket[];
}

export interface ResObjectList extends ResDefault {
  objects?: ObjectInfo[];
}

// etc
export interface ObjectInfo {
  type: string;
  name: string;
  size?: number;
}
