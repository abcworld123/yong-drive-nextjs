import {
  ListObjectsCommand,
  ListBucketsCommand,
  DeleteObjectsCommand,
  DeleteObjectsCommandInput,
  PutObjectCommandInput,
  ListObjectsCommandInput,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { s3Client } from 'libs/s3Client';
import type { IncomingMessage } from 'http';
import type { PassThrough } from 'stream';
import type {
  DeleteFormdata,
  UploadParams,
  BucketParams,
  DownloadSingleFormdata,
  DownloadRecursiveParams,
} from 'types/apis';
import type { ObjectInfo } from 'types/services';

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

// object 업로드
export async function uploadObjectCmd({ bucket, path, filename }: UploadParams, fileStream: PassThrough) {
  const params: PutObjectCommandInput = {
    Bucket: bucket,
    Key: `${path}${filename}`,
    Body: fileStream,
  };
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

// single file 다운로드
export async function downloadFileCmd({ bucket, path, filename }: DownloadSingleFormdata) {
  const params: PutObjectCommandInput = {
    Bucket: bucket,
    Key: `${path}${filename}`,
  };
  try {
    const data = await s3Client.send(new GetObjectCommand(params));
    const body = data.Body as IncomingMessage;
    const size = data.ContentLength;
    return { success: true, body, size };
  } catch (err) {
    console.error('\n---\x1B[34m downloadObjectCmd Error \x1B[0m---\n');
    console.error(err);
    return { success: false };
  }
}

// multiple objects 다운로드
export async function* downloadRecursiveCmd({ bucket, baseSrc, path, filenames }: DownloadRecursiveParams) {
  for (let filename of filenames) {
    filename = path + filename;
    try {
      if (filename.at(-1) === '/') {  // 폴더
        const foldername = filename;
        const { success, objects } = await getObjectListCmd({ bucket, path: baseSrc + foldername });
        if (!success) throw new Error();
        const filenamesInFoler = objects.map((object) => object.name);
        yield* downloadRecursiveCmd({ bucket, baseSrc, path: foldername, filenames: filenamesInFoler });
      } else {  // 파일
        const { success, body } = await downloadFileCmd({ bucket, path: baseSrc, filename });
        if (!success) throw new Error();
        yield { success: true, body, filename };
      }
    } catch (err) {
      yield { success: false };
    }
  }
}

// object 삭제
export async function deleteObjectCmd({ bucket, path, objects }: DeleteFormdata) {
  const params: DeleteObjectsCommandInput = {
    Bucket: bucket,
    Delete: { Objects: objects.map((name) => ({ Key: `${path}${name}` })) },
  };
  try {
    const data = await s3Client.send(new DeleteObjectsCommand(params));
    return { success: true };
  } catch (err) {
    console.error('\n---\x1B[34m deleteObjectCmd Error \x1B[0m---\n');
    console.error(err);
    return { success: false };
  }
}
