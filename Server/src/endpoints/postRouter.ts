import Router from "express";

import { postController } from "../controllers/postController";
import { jwtMiddleware } from '../middleware/auth.middleware';

const router = Router();

//#region not auth
/**
 * GET /api/posts
 * @tags Посты
 * @summary получить все посты
 * @return {object} 200 - success response - application/json
 * @example response - 200 - success response example
 * [
 *   {
 *     "_id": "62dd210a082c0a0cb268e696",
 *     "title": "The light",
 *     "author": "email@domain.com",
 *     "picture": "31cb069f-3870-4464-a194-ef3a8bfd2cc1.png",
 *     "content?": "casdchiudaifur iuncmasdlkcm asdio"
 *   }
 * ]
 */
router.get('/posts', postController.getAll);
/**
 * GET /api/posts/{id}
 * @tags Посты
 * @summary получить пост по id
 * @param {string} id - id поста
 */
router.get('/posts/:id', postController.getOne);
//#endregion

//#region auth
router.post('/posts', jwtMiddleware, postController.create);
router.put('/posts/:id', jwtMiddleware, postController.update);
router.delete('/posts/:id', jwtMiddleware, postController.delete);
router.post('/posts/:id/uploadPicture', jwtMiddleware, postController.uploadPicture);
//#endregion

export {router as postRouter};
