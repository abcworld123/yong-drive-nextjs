import { ListObjectsCommand, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { s3Client } from 'libs/s3Client';
import type { PassThrough } from 'stream';
import type { CreateFolderFormdata, UploadParams } from 'types/apis';

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

// 새 폴더 만들기
export async function createFolderCmd({ bucket, path, foldername }: CreateFolderFormdata) {
  const isExist = Boolean((await s3Client.send(new ListObjectsCommand({
    Bucket: bucket,
    Prefix: `${path}${foldername}/`,
    Delimiter: '/',
  }))).Contents);
  if (isExist) return { success: false, errMsg: '폴더가 이미 존재합니다.' };

  const params: PutObjectCommandInput = {
    Bucket: bucket,
    Key: `${path}${foldername}/`,
    Body: null,
  };
  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    return { success: true };
  } catch (err) {
    console.error('\n---\x1B[34m newFolderCmd Error \x1B[0m---\n');
    console.error(err);
    return { success: false };
  }
}
