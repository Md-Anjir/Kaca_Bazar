import React, { useState, useEffect } from "react";
import axios from "axios";
import SellerHeader from "../component/SellerHeader";
import Footer from "../component/Footer";
import shoppingbag from "../images/shopping-bag.png";

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const sellertoken = localStorage.getItem("sellertoken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/seller/orders",
          {
            headers: { Authorization: `Bearer ${sellertoken}` },
          }
        );
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [sellertoken]);

  const confirmOrder = async (orderId) => {
    try {
      await axios.patch(
        `http://localhost:3000/seller/orders/confirm/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${sellertoken}` },
        }
      );
      setOrders(
        orders.map((order) =>
          order.Order_ID === orderId
            ? { ...order, Order_Confirmed_Time: new Date().toISOString() }
            : order
        )
      );
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  const shipOrder = async (orderId) => {
    try {
      await axios.patch(
        `http://localhost:3000/seller/orders/ship/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${sellertoken}` },
        }
      );
      setOrders(
        orders.map((order) =>
          order.Order_ID === orderId
            ? { ...order, Shipped_Time: new Date().toISOString() }
            : order
        )
      );
    } catch (error) {
      console.error("Error shipping order:", error);
    }
  };

  return (
    <>
      <SellerHeader />
      <div className="flex-1 items-center">
        <div
          className="flex justify-center items-center p-4 flex-col py-9"
          style={{ backgroundColor: "green" }}
        >
          <div style={{ width: "50%", paddingRight: "20px" }}>
            <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>
              Your Orders
            </h1>
            <p style={{ fontSize: "20px", marginTop: "20px" }}>
              Manage your orders, track the status, and ensure timely delivery.
            </p>
            <img
              src={shoppingbag}
              alt="Orders GIF"
              style={{ marginTop: "50px", width: "150px" }}
            />
          </div>
        </div>
        <div className="container mx-auto py-6">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                    Total Price
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                    Payment Time
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                    Delivery Status
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.Order_ID}>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        {order.Order_ID}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        {order.Product_Name}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        {order.Quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        {order.Price}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.Order_Confirmed_Time
                              ? order.Shipped_Time
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.Order_Confirmed_Time
                            ? order.Shipped_Time
                              ? "Shipped"
                              : "Confirmed"
                            : "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        {order.Payment_Time
                          ? new Date(order.Payment_Time).toLocaleString()
                          : "No Payment"}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        {order.Delivered_Time
                          ? new Date(order.Delivered_Time).toLocaleString()
                          : "Not Delivered"}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        {!order.Order_Confirmed_Time && (
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => confirmOrder(order.Order_ID)}
                          >
                            Confirm Order
                          </button>
                        )}
                        {order.Order_Confirmed_Time && !order.Shipped_Time && (
                          <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => shipOrder(order.Order_ID)}
                          >
                            Ship Order
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-6 text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SellerOrders;
