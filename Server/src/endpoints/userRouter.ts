import Router from "express";

import { userController } from "../controllers/userController";
import { body, validationResult } from 'express-validator';

const router = Router();

router.post('/signin',
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  userController.signIn);
router.post('/login', userController.logIn);
router.get('/users', userController.getAll);


export {router as userRouter};