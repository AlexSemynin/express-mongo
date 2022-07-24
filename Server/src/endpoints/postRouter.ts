import Router from "express";

import { postController } from "../controllers/postController";

const router = Router();

router.post('/posts', postController.create);
router.get('/posts', postController.getAll);
router.get('/posts/:id', postController.getOne);
router.put('/posts/:id', postController.update);
router.delete('/posts/:id', postController.delete);
router.post('/posts/:id/uploadPicture', postController.uploadPicture);

export {router as postRouter};
