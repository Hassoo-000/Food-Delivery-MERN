import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");

  const url = "http://localhost:4000";

  // ✅ Add to Cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = { ...(prev || {}) };
      if (!updated[itemId]) {
        updated[itemId] = 1;
      } else {
        updated[itemId] += 1;
      }
      return updated;
    });

    if (token) {
      try {
        const response = await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
        if (response.data.cartData) {
          setCartItems(response.data.cartData);
        }
      } catch (err) {
        console.error("Error syncing addToCart:", err);
      }
    }
  };

  // ✅ Remove from Cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = { ...(prev || {}) };
      if (updated[itemId]) {
        updated[itemId] -= 1;
        if (updated[itemId] <= 0) {
          delete updated[itemId];
        }
      }
      return updated;
    });

    if (token) {
      try {
        const response = await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );
        if (response.data.cartData) {
          setCartItems(response.data.cartData);
        }
      } catch (err) {
        console.error("Error syncing removeFromCart:", err);
      }
    }
  };

  // ✅ Total Cart Amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // ✅ Fetch food list
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data || []);
    } catch (err) {
      console.error("Error fetching food list:", err);
    }
  };

  // ✅ Load cart data from backend
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      setCartItems(response.data.cartData || {});
    } catch (err) {
      console.error("Error loading cart:", err);
      setCartItems({});
    }
  };

  // ✅ Initialize
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
