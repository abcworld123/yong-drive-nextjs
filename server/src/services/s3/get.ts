import { ListBucketsCommand, ListObjectsCommand, type ListObjectsCommandInput } from '@aws-sdk/client-s3';
import { s3Client } from 'libs';
import { logError } from 'utils/logger';
import type { GetBody, ObjectInfo } from 'types/apis';

// bucket 리스트 가져오기
export async function getBucketListCmd() {
  try {
    const data = await s3Client.send(new ListBucketsCommand({}));
    const buckets = data.Buckets;
    return { success: true, buckets: buckets || [] };
  } catch (err) {
    logError('getBucketListCmd', err);
    return { success: false };
  }
}

// object 리스트 가져오기 (현재 폴더)
export async function getObjectListCmd({ bucket, path }: GetBody) {
  try {
    const prefixLen = path.length;
    const objects: ObjectInfo[] = [];
    const params: ListObjectsCommandInput = {
      Bucket: bucket,
      Prefix: decodeURI(path),
      Delimiter: '/',
    };
    const data = await s3Client.send(new ListObjectsCommand(params));
    data.CommonPrefixes?.forEach((x) => {
      const name = x.Prefix.slice(prefixLen);
      if (name) objects.push({ type: 'folder', name });
    });
    data.Contents?.forEach((x) => {
      const name = x.Key.slice(prefixLen);
      if (name) objects.push({ type: 'file', name, size: x.Size });
    });
    return { success: true, objects };
  } catch (err) {
    logError('getObjectListCmd', err);
    return { success: false };
  }
}
