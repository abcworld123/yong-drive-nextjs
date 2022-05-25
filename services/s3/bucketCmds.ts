import fs from 'fs';
import { ListObjectsCommand, ListBucketsCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '@s3/s3Client';
import type { BucketParams, LocalWritedParams } from 'types/apis';
import type { ObjectInfo } from 'types/objects';

// bucket 리스트 가져오기
export async function getBucketListCmd() {
  try {
    const buckets = (await s3Client.send(new ListBucketsCommand({}))).Buckets;
    return { success: true, buckets: buckets || [] };
  } catch (err) {
    console.error('\n---\x1B[34m getBucketListCmd Error \x1B[0m---\n');
    console.error(err);
    return { success: false };
  }
}

// object 리스트 가져오기 (현재 폴더)
export async function getObjectListCmd(params: BucketParams) {
  try {
    params.Prefix = decodeURI(params.Prefix);
    const prefixLen = params.Prefix.length;
    const objects: ObjectInfo[] = [];
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


// object 업로드
export async function putObjectCmd(params: LocalWritedParams & MulterFile) {
  const { Bucket, Key, path } = params;
  const newParams = {
    Bucket,
    Key,
    Body: fs.createReadStream(path),
  };
  try {
    const data = await s3Client.send(new PutObjectCommand(newParams));
    if (!data.ETag) throw new Error();
    return { success: true };
  } catch (err) {
    console.error('\n---\x1B[34m putObjectCmd Error \x1B[0m---\n');
    console.error(err);
    return { success: false };
  } finally {
    fs.unlink(path, (err) => {
      if (err) console.error(err);
    });
  }
}
