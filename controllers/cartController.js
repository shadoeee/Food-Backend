import userModel from "../models/userModel.js"

// add items to user cart
const addToCart = async (req, res) => {
    try {
        // Find the user by _id
        let userData = await userModel.findById({_id: req.body.userId });

        // Extract cartdata from userData
        let cartData = await userData.cartData;

        // Update the cartdata with the new item
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        // Update the user's cartdata
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        // Return success response
        return res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { $set: { cartData } });
        return res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData:cartData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};



export {addToCart, removeFromCart, getCart}