import { ListBucketsCommand, ListObjectsCommand, ListObjectsCommandInput } from '@aws-sdk/client-s3';
import { s3Client } from 'libs/s3Client';
import type { BucketParams, ObjectInfo } from 'types/apis';

// bucket 리스트 가져오기
export async function getBucketListCmd() {
  try {
    const data = await s3Client.send(new ListBucketsCommand({}));
    const buckets = data.Buckets;
    return { success: true, buckets: buckets || [] };
  } catch (err) {
    console.error('\n---\x1B[34m getBucketListCmd Error \x1B[0m---\n');
    console.error(err);
    return { success: false };
  }
}

// object 리스트 가져오기 (현재 폴더)
export async function getObjectListCmd({ bucket, path }: BucketParams) {
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
    console.error('\n---\x1B[34m getObjectListCmd Error \x1B[0m---\n');
    console.error(err);
    return { success: false };
  }
}
