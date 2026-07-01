import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    console.log("📥 Incoming order:", req.body);

    // create and save order
   const newOrder = orderModel({
    userId: req.userId,   // ✅ take from token middleware
    items: req.body.items,
    amount: req.body.amount,
    address: req.body.address
})


    await newOrder.save();

    // clear cart
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // safety: check items exist
    if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
      return res.json({ success: false, message: "No items in order" });
    }

    // stripe line items
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name || "Unnamed Item",
        },
        // ✅ Stripe requires amount in smallest unit (paise/cents)
        unit_amount: Math.round(Number(item.price) * 100 * 80),
      },
      quantity: item.quantity || 1,
    }));

    // add delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    console.log("🧾 Stripe line items:", line_items);

    // create stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    console.log("✅ Stripe session created:", session.url);

    return res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("❌ placeOrder error:", error.message);
    return res.json({ success: false, message: error.message || "Error" });
  }
};

const verifyOrder = async (req,res)=>{
  const {orderId, success} = req.body
  try {
    if(success=="true"){
      await orderModel.findByIdAndUpdate(orderId, {payment: true});
      res.json({success:true, message:"Paid"})
    }
    else{
      await orderModel.findByIdAndDelete(orderId)
      res.json({success:false, message:"Not Paid"})
    }
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
  }
}

// user order for frontend
const userOrders = async (req,res)=>{
  try {
    const orders = await orderModel.find({userId:req.userId})
    res.json({success:true, data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
    
  }
}

// show order list on admin pannel
const listOrder = async (req,res)=>{
  try {
    const orders = await orderModel.find({})
  res.json({success:true, data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
  }
}

const updateStatus = async (req,res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status})
    res.json({success:true, message:"Status Updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
  }
}

export { placeOrder,verifyOrder, userOrders, listOrder, updateStatus };
