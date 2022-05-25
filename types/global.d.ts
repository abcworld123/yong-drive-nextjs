export {};

declare global {
  type OverrideNextApiRequest = Omit<NextApiRequest, 'query'>;
  type MulterFile = Express.Multer.file;
}
