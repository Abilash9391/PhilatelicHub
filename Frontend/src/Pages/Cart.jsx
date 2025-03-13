import { React, useContext } from "react";
import { ProductContext } from "../Context/ProductContext";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
import ButtonGreen from "../Components/Button/ButtonGreen";

const Cart = () => {
  const {
    cartItems,
    item,
    products,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
  } = useContext(ProductContext);
  if (!cartItems) {
    return <div>Loading...</div>;
}

  return (
   
  
    <div className="bg-background">
      <div className="container">
        <h1 className="flex items-center justify-center py-10 pt-8 font-raleway text-4xl uppercase tracking-widest text-white">
          CART
        </h1>
        <div className="grid min-h-[50vh] w-full grid-cols-1 bg-tetiary md:grid-cols-3">
          <div className="col-span-2 w-full bg-secondary">
            
            {products.map((product) => {
              if (cartItems[product._id] > 0) {
                return (
                  <div key={product._id}>
                    <div className="relative ml-10 flex py-6">
                      <div className="relative h-[120px] w-[120px] overflow-hidden rounded-xl bg-lightgrey">
                        <img
                          src={product.imageFile}
                          alt="productImg"
                          className="h-full w-full rounded-xl object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between px-5">
                        <div className="flex flex-col gap-1.5 font-lora text-white">
                          <div className="flex gap-3 md:gap-20">
                            <p>{product.name}</p>
                            <p>$ {product.price * cartItems[product._id]}</p>
                          </div>

                          <p>{product.category}</p>
                        </div>
                        <div className="flex h-10 w-32 items-center justify-between gap-2 rounded-full bg-secondary">
                          <FaMinus
                            onClick={() => removeFromCart(product._id)}
                            className="ml-1 h-6 w-6 cursor-pointer rounded-full bg-red-500 p-1 text-white"
                          />
                          <p className="font-libre text-white">
                            {cartItems[product._id]}
                          </p>
                          <FaPlus
                            onClick={() => addToCart(product._id)}
                            className="mr-1 h-6 w-6 cursor-pointer rounded-full bg-green-500 p-1 text-white"
                          />
                        </div>
                      </div>
                    </div>
                    <hr className="border border-tetiary" />
                  </div>
                );
              }
            })}
            {getTotalCartAmount() <= 0 && (
              <p className="ml-10 py-6 font-playfair text-2xl text-white md:text-4xl">
                Does your cart feel empty ?
                <Link to="/product">
                  <span className="text-primary"> Shop More</span>
                </Link>
              </p>
            )}
          </div>
          <div className="h-60 min-h-[300px] px-10 py-5 font-lora text-xl">
            <h1 className="text-3xl">Summary</h1>
            <div className="flex flex-col gap-y-3 pt-4">
              <div className="flex justify-between">
                <p>Subtotal :</p>
                <p>$ {getTotalCartAmount()}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping Fee :</p>
                <p>$ {getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
            </div>

            <div className="flex justify-between pt-5">
              <p>Total :</p>
              <p>
                $ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </p>
            </div>
            <div className="mt-5 flex justify-center">
              <Link to="/order">
                <ButtonGreen
                  Text_Color={"white"}
                  Font={"raleway"}
                  Padding_Y={"16px"}
                  Padding_X={"32px"}
                  Text={"Proceed to Checkout"}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
