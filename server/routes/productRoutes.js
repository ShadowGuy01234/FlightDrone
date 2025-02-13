import express from 'express';
import { createProductContoller, getAllProductsController, getSingleProductController, deleteProductController, updateProductController, productCategoryController } from '../controllers/productController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin, createProductContoller);
router.get('/get-product', getAllProductsController);
router.get('/get-product/:slug', getSingleProductController);
router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController);
router.put('/update-product/:pid', requireSignIn, isAdmin, updateProductController);
router.get("/product-category/:slug", productCategoryController);



export default router;