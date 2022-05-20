import { ListObjectsCommand, ListBucketsCommand } from '@aws-sdk/client-s3';
import { s3Client } from '@s3/s3Client';
import { BucketParams } from 'types/apis';
import { ObjectInfo } from 'types/Objects';

export const getBucketListCmd = async () => {
  try {
    const buckets = (await s3Client.send(new ListBucketsCommand({}))).Buckets;
    return { success: true, buckets: buckets || [] };
  } catch (err) {
    console.error('\n---\x1B[34m getBucketListCmd Error \x1B[0m---\n');
    console.error(err);
    return { success: false };
  }
};

export const getObjectListCmd = async (bucketParams: BucketParams) => {
  try {
    bucketParams.Prefix = decodeURI(bucketParams.Prefix);
    const prefixLen = bucketParams.Prefix.length;
    const objects: ObjectInfo[] = [];
    const data = await s3Client.send(new ListObjectsCommand(bucketParams));

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
};
