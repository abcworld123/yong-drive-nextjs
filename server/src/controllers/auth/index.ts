import { default as _authController } from './auth';
import { default as checkController } from './check';
import { default as loginController } from './login';

const authController = {
  auth: _authController,
  check: checkController,
  login: loginController,
};

export default authController;
