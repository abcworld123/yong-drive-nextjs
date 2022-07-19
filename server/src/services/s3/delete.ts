import { DeleteObjectsCommand, DeleteObjectsCommandInput } from '@aws-sdk/client-s3';
import { s3Client } from 'libs/s3Client';
import { getObjectListCmd } from './get';
import type { DeleteFormdata } from 'types/apis';

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

// 폴더 삭제
export async function deleteRecursiveCmd({ bucket, path, objects }: DeleteFormdata) {
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
