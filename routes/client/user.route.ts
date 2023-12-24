import { Router } from 'express';
import * as validate from '../../validates/client/user.validate';

import * as controller from '../../controllers/client/user.controller';
const router: Router = Router();

router.get('/register', controller.register);
router.post('/register', validate.registerPost, controller.registerPost);
router.get('/login', controller.login);
router.post('/login', controller.loginPost);
router.get('/logout', controller.logout);

export const userRoutes: Router = router;