import { Router } from 'express';
import * as controller from '../../controllers/client/song.controller';

import * as authMiddleware from '../../middlewares/client/auth.middleware';

const router: Router = Router();

router.get('/:slugTopic', controller.list);
router.get('/detail/:slugSong', controller.detail);
router.patch('/like/:typeLike/:idSong', authMiddleware.requireAuth, controller.like);
router.patch('/favorite/:typeFavorite/:idSong', authMiddleware.requireAuth, controller.favorite);
router.patch('/listen/:idSong', controller.listen);

export const songRoutes: Router = router;