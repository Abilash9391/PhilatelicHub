import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBox } from "react-icons/fa";
import { toast } from "react-toastify";
import Statistics from "../Components/Statistics";
import Chartdata from "../Components/Chartdata";
import Income from "../Components/Income";

const Order = ({}) => {
  const [orders, setOrders] = useState([]);
  // const URL = "https://ecommercerezlocker.onrender.com";
  const URL = "http://localhost:3000";

  const fetchOrders = async () => {
    try {
      const response = await axios.post(`${URL}/api/order/listorder`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch orders.");
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  const onChangeHandler = async (event, orderId) => {
    const response = await axios.post(`${URL}/api/order/status`, {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchOrders();
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <h4 className="header flex justify-center">Order Page</h4>
        <div className="flex w-full flex-col items-center justify-evenly gap-5 py-5 md:flex-row">
          <div className="flex flex-col gap-5">
            <Statistics orders={orders} />
            <Income orders={orders} />
          </div>
          <div>
            <Chartdata orders={orders} />
          </div>
        </div>

        <div className="mt-5 overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="table_container">
                <th className="table_horizontal hidden sm:flex">Package</th>
                <th className="table_horizontal">Order</th>
                <th className="table_horizontal">Items</th>
                <th className="table_horizontal">Price</th>
                <th className="table_horizontal">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((data, i) => {
                return (
                  <tr
                    key={i}
                    className="border-b-2 border-tetiary p-6 text-left"
                  >
                    <td className="hidden border-r-2 border-tetiary p-1 text-white sm:table-cell">
                      <FaBox />
                    </td>
                    <td className="table_content border-r-2">
                      <div className="p-2">
                        <p>
                          {data.items.map((item, index) => {
                            if (index === data.items.length - 1) {
                              return item.name + " x " + item.quantity;
                            } else {
                              return item.name + " x " + item.quantity + " , ";
                            }
                          })}
                        </p>
                      </div>
                      <hr className="w-full" />
                      <div className=" ">
                        <h5>{data.name}</h5>
                        <div>
                          <p>
                            {data.address.street +
                              " , " +
                              data.address.city +
                              " , " +
                              data.address.country +
                              " , " +
                              data.address.zipcode}
                          </p>
                        </div>
                        <p>{data.number}</p>
                      </div>
                    </td>
                    <td className="table_content border-r-2">
                      {data.items.length}
                    </td>
                    <td className="table_content border-r-2">${data.amount}</td>
                    <td className="table_content border-r-2">
                      <select
                        onChange={(event) => onChangeHandler(event, data._id)}
                        value={data.status}
                        name="status"
                        className="max-w-20 rounded-full bg-primary p-1 font-playfair text-sm text-white xl:max-w-32"
                      >
                        <option value="Product Loading">Product Loading</option>
                        <option value="Out for Delivery">
                          Out for Delivery
                        </option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Order;
