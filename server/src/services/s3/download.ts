import { GetObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { s3Client } from 'libs';
import { getObjectListCmd } from './get';
import type { Readable } from 'stream';
import type { DownloadRecursiveParams, DownloadSingleParams } from 'types/apis';

// single file 다운로드
export async function downloadFileCmd({ bucket, path, filename }: DownloadSingleParams) {
  const params: PutObjectCommandInput = {
    Bucket: bucket,
    Key: `${path}${filename}`,
  };
  try {
    const data = await s3Client.send(new GetObjectCommand(params));
    const body = data.Body as Readable;  // type: IncomingMessage
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
