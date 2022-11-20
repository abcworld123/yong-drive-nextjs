import { default as createController } from './create';
import { default as deleteController } from './delete';
import { default as downloadController } from './download';
import { default as getController } from './get';
import { default as pasteController } from './paste';
import { default as uploadController } from './upload';

const objectController = {
  create: createController,
  delete: deleteController,
  download: downloadController,
  get: getController,
  paste: pasteController,
  upload: uploadController,
};

export default objectController;
