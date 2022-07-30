import Router from "express";

import { postController } from "../controllers/postController";
import { IPost } from "../dto/post";

const router = Router();

router.post('/posts', postController.create);
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
router.put('/posts/:id', postController.update);
router.delete('/posts/:id', postController.delete);
router.post('/posts/:id/uploadPicture', postController.uploadPicture);

export {router as postRouter};
