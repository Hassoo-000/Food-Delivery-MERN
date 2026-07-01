import userModel from "../models/userModel.js";

//  Add item to cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.userId);
    let cartData = userData.cartData || {}; // 👈 make sure it's always an object

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.userId, { cartData });
    res.json({ success: true, message: "Added To Cart", cartData });
  } catch (error) {
    console.log("Add to cart error:", error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.userId);
    let cartData = userData.cartData || {};

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
      if (cartData[req.body.itemId] <= 0) {
        delete cartData[req.body.itemId]; // remove item completely
      }
    }

    await userModel.findByIdAndUpdate(req.userId, { cartData });
    res.json({ success: true, message: "Removed From Cart", cartData });
  } catch (error) {
    console.log("Remove from cart error:", error);
    res.json({ success: false, message: "Error" });
  }
};

//  Get cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.userId);
    let cartData = userData.cartData || {}; //  fallback to empty
    res.json({ success: true, cartData });
  } catch (error) {
    console.log("Get cart error:", error);
    res.json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };
