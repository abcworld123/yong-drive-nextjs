import { S3Client } from '@aws-sdk/client-s3';
import config from 'config';

const { accessKeyId, secretAccessKey } = config.aws;

export const s3Client = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
