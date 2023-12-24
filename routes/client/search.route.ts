import { Router } from 'express';
import * as controller from '../../controllers/client/search.controller';

import * as authMiddleware from '../../middlewares/client/auth.middleware';

const router: Router = Router();

router.get('/:type', controller.result);


export const searchRoutes: Router = router;