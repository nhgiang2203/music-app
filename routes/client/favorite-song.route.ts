import { Router } from 'express';
import * as controller from '../../controllers/client/favorite-song.controller';

import * as authMiddleware from '../../middlewares/client/auth.middleware';

const router: Router = Router();

router.get('/', controller.index);


export const favoriteSongRoutes: Router = router;