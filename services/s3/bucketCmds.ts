import { PassThrough } from 'stream';
import { ListObjectsCommand, ListBucketsCommand, DeleteObjectsCommand, DeleteObjectsCommandInput } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { s3Client } from '@s3/s3Client';
import type { BucketParams, DeleteFormdata, ObjectInfo, UploadParams } from 'types/apis';

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
export async function uploadCmd({ Bucket, Key }: UploadParams, fileStream: PassThrough) {
  const params = { Bucket, Key, Body: fileStream };
  try {
    const upload = new Upload({ client: s3Client, params });
    await upload.done();
    return { success: true };
  } catch (err) {
    console.error('\n---\x1B[34m uploadCmd Error \x1B[0m---\n');
    console.error(err);
    return { success: false };
  }
}

// object 삭제
export async function deleteObjectCmd({ Bucket, asPath, objects }: DeleteFormdata) {
  const data: DeleteObjectsCommandInput = {
    Bucket: Bucket,
    Delete: { Objects: objects.map((name) => ({ Key: `${asPath}${name}` })) },
  };
  try {
    const res = await s3Client.send(new DeleteObjectsCommand(data));
    console.log(res);
    return { success: true };
  } catch (err) {
    console.error('\n---\x1B[34m deleteObjectCmd Error \x1B[0m---\n');
    console.error(err);
    return { success: false };
  }
}
