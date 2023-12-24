import { Express } from 'express';

import * as userMiddleware from '../../middlewares/client/user.middleware';

import { topicRoutes } from './topic.route';
import { songRoutes } from './song.route';
import { userRoutes } from './user.route';
import {favoriteSongRoutes} from './favorite-song.route';
import {searchRoutes} from './search.route';

const clientRoute = (app: Express): void => {
  app.use(userMiddleware.infoUser);
  
  app.use('/topics', topicRoutes);
  app.use('/songs', songRoutes);
  app.use('/user', userRoutes);
  app.use('/favorite-songs', favoriteSongRoutes);
  app.use('/search', searchRoutes);
};

export default clientRoute;