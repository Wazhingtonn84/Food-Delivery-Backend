import userModel from "../models/userModel.js"

//add items to user cart
const addToCart = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.user.userId;

        if (!itemId) {
            return res.status(400).json({ success: false, message: "itemId is required." });
        }

        const userData = await userModel.findById(userId);
        console.log("User ID:", userId);
        console.log("Item ID:", itemId);

        let cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added to cart successfully!" });
    } catch (error) {
        console.error("Add to cart error:", error);
        res.status(500).json({ success: false, message: "Error adding to cart" });
    }
};


//remove itesm from user cart
const removeFromCart = async (req, res)=>{
    try{
        // let userData= await userModel.findById(req.user.userId);
        // console.log(userData)
        // let cartData = await userData.cartData;
        // console.log(cartData)
        // if(cartData[req.user.itemId]>0){
        //     cartData[req.user.itemId] -= 1;
        // }
        // await userModel.findByIdAndUpdate(req.user.userId, {cartData});
        // res.json({success: true, message:"Removed from cart succesfully!!"})
        const { itemId } = req.body;
        if (!itemId) return res.status(400).json({ success: false, message: "Item ID is required." });

        let userData = await userModel.findById(req.user.userId);
        let cartData = userData.cartData || {};

        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.user.userId, { cartData });
        res.json({ success: true, message: "Removed from cart successfully!" });
    }catch(error){
        console.log(error);
        res.json({success: false, message: "Error removing from cart"})
    }
}

//fetch user cart data
const getCart = async (req, res)=>{
    try{
        // let userData = await userModel.findById(req.user.userId)
        // let cartData = await userData.cartData;
        // res.json({success: true, cartData})
        let userData = await userModel.findById(req.user.userId);
        let cartData = userData.cartData || {};
        res.json({ success: true, cartData });
    }catch(error){
        console.log(error)
        res.json({success: false, message: "Error fetching cart"})
    }
}


export {addToCart, removeFromCart, getCart}