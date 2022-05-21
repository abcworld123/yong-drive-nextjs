import { Bucket, ListObjectsCommandInput } from '@aws-sdk/client-s3';
import { ObjectInfo } from './objects';

export interface BucketParams extends ListObjectsCommandInput {
  Prefix: string;
  Delimiter: string;
}

export interface ReqBucketParams {
  query: BucketParams;
}

export interface ResBucketList {
  success: boolean;
  buckets?: Bucket[];
}

export interface ResObjectList {
  success: boolean;
  objects?: ObjectInfo[];
}
