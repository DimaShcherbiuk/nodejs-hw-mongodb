import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';

import { register, login, logout, refresh } from '../controllers/auth.js';
import { registerSchema, loginSchema } from '../validation/authSchema.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(register),
);

authRouter.post('/login', validateBody(loginSchema), ctrlWrapper(login));

authRouter.post('/logout', ctrlWrapper(logout));

authRouter.post('/refresh', ctrlWrapper(refresh));

export default authRouter;
