import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(null);
  // const URL="https://ecommercerezlocker.onrender.com";
  const URL = "http://localhost:3000";

  useEffect(() => {
    async function loadData() {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await getCart(storedToken);
      }
    }
    loadData();
  }, []);

  const addToCart = async (itemId) => {
    console.log("Adding item to cart:", itemId); // Debugging line
    console.log("Current cart items:", cartItems); // Debugging line
    console.log("Available products:", products); // Debugging line

    if (!cartItems[itemId]) {
      console.warn(`Item with ID ${itemId} not found in cartItems.`); // Debugging line
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      const response = await axios.post(
        `${URL}/api/cart/addcart`,
        { itemId },
        { headers: { token } },
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      const response = await axios.post(
        `${URL}/api/cart/deletecart`,
        { itemId },
        { headers: { token } },
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    }
  };

  const getCart = async (token) => {
    const response = await axios.get(`${URL}/api/cart/getcart`, {
      headers: { token },
    });
    console.log("Fetched cart data:", response.data.cartData); // Debugging line
    setCartItems(response.data.cartData);
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find(
          (totalproduct) => totalproduct._id === item,
        );
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        } else {
          console.warn(`Item with ID ${item} not found in products.`);
        }
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`${URL}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.data);
        setLoading(false);
      } else {
        toast.error(response.data.message);
      }
    };
    fetchProduct();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        removeFromCart,
        addToCart,
        setCartItems,
        cartItems,
        getTotalCartAmount,
        token,
        setToken,
        URL,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
