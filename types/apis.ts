import { Bucket, ListObjectsCommandInput } from '@aws-sdk/client-s3';
import { FileResObj, FolderResObj } from './Objects';

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
  folders?: FolderResObj[];
  files?: FileResObj[];
}
