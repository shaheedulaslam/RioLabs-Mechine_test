import express from 'express';
export const adminRouter = express.Router();
import { adminpost,
addProduct, 
editProduct,
deleteProduct,
allUsers} from '../controller/adminController'




adminRouter.post('/adminRegister',adminpost)
adminRouter.post('/addProduct',addProduct)
adminRouter.put('/editProduct/:id',editProduct)
adminRouter.delete('deleteProduct/:id',deleteProduct)
adminRouter.get('/allUsers', allUsers)