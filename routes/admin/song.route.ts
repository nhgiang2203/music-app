import { Router } from "express";
import multer from "multer";

import * as uploadCloud from "../../middlewares/admin/uploadToCloudinary.middleware";
import * as controller from "../../controllers/admin/song.controller";

const router = Router();
const upload = multer();

router.get('/', controller.index);
router.get('/create', controller.create);
router.post('/create', upload.fields([
  { name: "avatar", maxCount: 1 }, 
  { name: "audio", maxCount: 1 }
]), uploadCloud.uploadFields, controller.createPost);
router.get('/edit/:id', controller.edit);
router.patch('/edit/:id', upload.fields([
  { name: "avatar", maxCount: 1 }, 
  { name: "audio", maxCount: 1 }
]), uploadCloud.uploadFields, controller.editPatch);

export const songRoutes = router;