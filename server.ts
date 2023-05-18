import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
const app = express();
dotenv.config()
import { userRouter } from './routers/users';
import { adminRouter } from './routers/admin';
import session from 'express-session';
import cookieParser  from 'cookie-parser'




mongoose.connect(process.env.MONGO_URL as string)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongooose'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(session({ secret: "RioLabs", 
cookie: { maxAge: 600000000 },
saveUninitialized:true,
resave:false}))

app.use('/',userRouter)
app.use('/admin',adminRouter)




app.listen(process.env.PORT || 3001,()=>{
    console.log(`server connected${process.env.PORT}`);  
})