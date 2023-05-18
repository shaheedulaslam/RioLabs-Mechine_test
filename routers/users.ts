import express from 'express';
export const userRouter = express.Router();
import { home, 
        otpVerify, 
        postLogin, 
        register } from '../controller/userController'



userRouter.get('/',home)
userRouter.post('/register',register)
userRouter.post('/otpVerify',otpVerify)
userRouter.post('/postLogin',postLogin)