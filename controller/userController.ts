import { Request, Response } from 'express';
import Usermodel from '../model/userRegister';
import nodemailer from 'nodemailer'
import { SessionData } from 'express-session';
import bcrypt from 'bcrypt';

interface CustomSession extends SessionData {
    signup?: true;
    logg?:true;
    loginError?: boolean;
  }
  
// email engine
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });
  


// home entering
export const home:any = async(req:Request, res:Response)=>{
try {
if((req.session as CustomSession).logg = true){
res.status(200).json({result:"welcome home 🖐"})
}
} catch (error) {
res.status(400).json({result:"Session has been destroyed please login 🚫",error})
}
}

// user registering
export const register = async(req:Request ,res: Response)=>{
const { name, email, password, confirmPass }: { name: string, email: string, password: string, confirmPass: string } = req.body;
if (!name || !email || !password || !confirmPass) {
    return res.status(422).json({ result: 'Please fill all the fields 🚫'});
  }
  try {
const userExist = await Usermodel.findOne({email:email} as {email:string})
if(userExist){
    return res.status(422).json({result:"Email already Exists ❗"})
}else if(password !== confirmPass){
    return res.status(400).json({result:"password are not same ❌"})
}else{
    const val:any = Math.floor(1000+Math.random() * 9000);
    res.cookie("otp",val)
    await transporter.sendMail({
        to: email,
        from: 'riolabzsamble@gmail.com',
        subject: 'Signup Verification',
        html: `<h4>This is your token for OTP Verification:</h4><h2>${val}</h2>`
    })
    res.status(200).json({result:"Otp has been shared ✅"})
}
  } catch (error) {
    console.log(error);
    res.status(400).json({result :"Can't Sign Up...Something went wrong ❌"}) 
  }
}

// otp verifying while register
export const otpVerify = async(req:Request , res:Response)=>{   
try {
const { name, email, password, confirmPass }:any = req.body
const token = req.cookies.otp
if(token == req.body.otp){ 
const user:any = new Usermodel({
    name:name,
    email:email,
    password:password
})
console.log(user);
await user.save();
res.status(200).json({result:"User has been Created 👍"})
}
} catch (error) {
console.log(error);
res.status(400).json({result:"User can't sign up..🚫" ,error})
}
}


// user login postmethod
export const postLogin = async(req:Request , res:Response)=>{
    try {
        const {email,password}: {email:string,password:string}= req.body
        const user = await Usermodel.findOne({email:email} as {email:string})
        console.log(user);
        if(user){
        const data =  await bcrypt.compare(password,user.password)
        if(data){
            (req.session as CustomSession).logg = true
            res.status(200).json({result:"user has been logged..Welcome to Home..🤝"})
        }
        }else{
            res.status(400).json({result:"You can't login..Something went wrong..❌"});
            (req.session as CustomSession).loginError = true
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({result:"user can't login..Something went wrong..❌",error});
    }
}


