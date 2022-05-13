import { ListObjectsCommand } from '@aws-sdk/client-s3';
import { s3Client } from '@s3/s3Client';
import { BucketParams } from 'types/apis';
import { FileResObj, FolderResObj } from 'types/Objects';

export const getObjectListCmd = async (bucketParams: BucketParams) => {
  try {
    const folders: FolderResObj[] = [];
    const files: FileResObj[] = [];
    const data = await s3Client.send(new ListObjectsCommand(bucketParams));
    
    data.CommonPrefixes.forEach((x) => {
      folders.push({ name: x.Prefix });
    });
    data.Contents.forEach((x) => {
      files.push({ name: x.Key, size: x.Size });
    });
    // todo throw new Error();
    return { folders, files };
  } catch (err) {
    console.error('--- getObjectListCmd Error ---');
    console.error(err);
  }
};
