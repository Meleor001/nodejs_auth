import { Router } from "express"
import ProductController from "../controllers/ProductController.js"

const router = new Router()


router.get("/products" , ProductController.getProducts )
router.post("/addproduct" , ProductController.addProduct)
// router.patch("/product/:id")
// router.put("/product/:id")
// router.delete("/deleteproduct/:id")


export default router;