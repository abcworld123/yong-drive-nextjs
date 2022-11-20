import { CopyObjectCommand, CopyObjectCommandInput } from '@aws-sdk/client-s3';
import { s3Client } from 'libs';
import { logError } from 'utils/logger';
import { deleteObjectCmd } from './delete';
import type { PasteBody } from 'types/apis';

// 복사 or 잘라내기 실행
export async function pasteObjectCmd({ bucket, mode, objects, pathFrom, pathTo }: PasteBody) {
  try {
    for (const key of objects) {
      const params: CopyObjectCommandInput = {
        Bucket: bucket,
        CopySource: encodeURI(`/${bucket}/${pathFrom}${key}`),
        Key: `${pathTo}${key}`,
      };
      console.log(params);
      await s3Client.send(new CopyObjectCommand(params));
    }
    if (mode === 'cut') {
      await deleteObjectCmd({ bucket, path: pathFrom, objects });
    }
    return { success: true };
  } catch (err) {
    logError('pasteObjectCmd', err);
    return { success: false };
  }

}
