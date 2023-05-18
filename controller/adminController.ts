import { Request, Response } from 'express';
import { SessionData } from 'express-session';
import { productModel } from '../model/products';
import Usermodel from '../model/userRegister';


interface CustomSession extends SessionData {
  admin?: boolean;
  loginError?: boolean;
}

// admin Login here
export const adminpost:any = async (req: Request, res: Response) => {
  try {
    const reqmail: string = req.body.email;
    const reqpass: string = req.body.password;
    const email: string = process.env.adminEmail ?? '';
    const pass: string = process.env.adminPass ?? '';

    if (email === reqmail && pass === reqpass) {
     ( req.session as CustomSession).admin = true;
      res.status(200).json({result:"Admin had logined ✅"})
    } else {
      (req.session as CustomSession).loginError = true;
      res.status(500).json({result:"Invalid Email Or PassWord ❌"});
    }
  } catch (error) {
    console.log(error);
  }
};

// admin adding a product
 export const addProduct:any = async(req:Request, res:Response)=>{
  try {
    if(( req.session as CustomSession).admin=true){

      const {prodName,price,description,category} = req.body
      const addProduct:any = new productModel({
       name:prodName,
       price:price,
       description:description,
       Category:category
      })
      await addProduct.save()
      res.status(200).json({result:`product added to ${category} category..✅`})
    }
  } catch (error) {
    res.status(400).json({result : "product not added Something error ❌",error})
    console.log(error);   
  }}

  // admin editing the product
  export const editProduct = async (req:Request , res: Response)=>{
    try {
    if(( req.session as CustomSession).admin=true){
    const prodId:any = req.params.id
    const {prodName,price,description,category} =req.body
    const updateProd:any = await productModel.updateOne({_id:prodId},
      {
        $set:{
          name:prodName,
          price:price,
          description:description,
          Category:category
      }})
      console.log(updateProd);
      res.status(200).json({result:"product has been updated ✌"})  
    }
    } catch (error) {
      console.log(error);
      res.status(400).json({result:"product not updated something error ❌",error}) 
    }
  }


  // admin deleting product
  export const deleteProduct = async (req:Request, res:Response)=>{
  try {
    if(( req.session as CustomSession).admin=true){
      const prodId:any = req.params.id
      const deleteProduct:any = await productModel.deleteOne({_id:prodId})
      console.log(deleteProduct);
      res.status(201).json({result:"product has been deleted 🤷‍♀️"})
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({result:"product can't delete..error has been found ❌",error})
  }
  }


  // listing all the users 

  export const allUsers:any = async(req:Request , res:Response)=>{
    try {
  if(( req.session as CustomSession).admin=true){
    const users:any = await Usermodel.find()
    console.log(users);
    res.status(200).json({result:"all the users are here 👉 ",users})
  }
    } catch (error) {
      console.log(error);
      res.status(400).json({result:"users can't find,..error has been found ❌",error}) 
    }  
  }


