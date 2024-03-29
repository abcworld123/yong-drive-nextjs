import { ListObjectsCommand, PutObjectCommand, type PutObjectCommandInput } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { s3Client } from 'libs';
import { logError } from 'utils/logger';
import type { PassThrough } from 'stream';
import type { CreateFolderBody, UploadParams } from 'types/apis';

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
    logError('uploadCmd', err);
    return { success: false };
  }
}

// 새 폴더 만들기
export async function createFolderCmd({ bucket, path, foldername }: CreateFolderBody) {
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
    await s3Client.send(new PutObjectCommand(params));
    return { success: true };
  } catch (err) {
    logError('newFolderCmd', err);
    return { success: false };
  }
}
