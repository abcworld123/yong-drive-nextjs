import { DeleteObjectsCommand, type DeleteObjectsCommandInput } from '@aws-sdk/client-s3';
import { s3Client } from 'libs';
import { logError } from 'utils/logger';
import { getObjectListCmd } from './get';
import type { DeleteBody } from 'types/apis';

// object 삭제
export async function deleteObjectCmd({ bucket, path, objects }: DeleteBody) {
  const params: DeleteObjectsCommandInput = {
    Bucket: bucket,
    Delete: { Objects: objects.map((name) => ({ Key: `${path}${name}` })) },
  };
  try {
    await s3Client.send(new DeleteObjectsCommand(params));
    return { success: true };
  } catch (err) {
    logError('deleteObjectCmd', err);
    return { success: false };
  }
}

// 폴더 삭제
export async function deleteRecursiveCmd({ bucket, path, objects }: DeleteBody) {
  for (const name of objects) {
    if (name.at(-1) === '/') {
      const innerPath = `${path}${name}`;
      const innerObjects = (await getObjectListCmd({ bucket, path: innerPath })).objects.map(x => x.name);
      if (innerObjects.length === 0) continue;
      const { success } = await deleteRecursiveCmd({ bucket, path: innerPath, objects: innerObjects });
      if (!success) return { success: false };
    }
  }
  const data = await deleteObjectCmd({ bucket, path, objects });
  return data;
}
