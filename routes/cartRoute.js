import express from "express"
import { addToCart, removeFromCart, getCart} from "../controllers/cartController.js"
import authMiddleware from "../middleware/auth.js"

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart)
cartRouter.post("/get",authMiddleware, getCart)
cartRouter.post("/remove",authMiddleware, removeFromCart)

export default cartRouter