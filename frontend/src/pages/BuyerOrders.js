import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../component/Header";
import Footer from "../component/Footer";
import shoppingbag from "../images/shopping-bag.png";

function BuyerOrders() {
  const [orders, setOrders] = useState([]);
  const buyertoken = localStorage.getItem("buyertoken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/buyer/orders", {
          headers: { Authorization: `Bearer ${buyertoken}` },
        });
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [buyertoken]);

  const handlePayment = async (orderId) => {
    try {
      await axios.patch(`http://localhost:3000/buyer/orders/pay/${orderId}`, {}, {
        headers: { Authorization: `Bearer ${buyertoken}` },
      });
      // Update the order list with the new payment status
      setOrders(orders.map(order => 
        order.Order_ID === orderId ? { ...order, Payment_Time: new Date().toISOString() } : order
      ));
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto py-6">
      
        <div className="overflow-x-auto">
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
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Order ID</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Product Name</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Quantity</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Total Price</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Confirmed</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Shipped</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Delivered</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Payment Status</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.Order_ID}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{order.Order_ID}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{order.Product_Name}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{order.Quantity}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{order.Price}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      {order.Order_Confirmed_Time ? new Date(order.Order_Confirmed_Time).toLocaleString() : "No"}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      {order.Shipped_Time ? new Date(order.Shipped_Time).toLocaleString() : "No"}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      {order.Delivered_Time ? new Date(order.Delivered_Time).toLocaleString() : "No"}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      {order.Payment_Time ? new Date(order.Payment_Time).toLocaleString() : "Pending"}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      {!order.Payment_Time && (
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handlePayment(order.Order_ID)}
                        >
                          Pay Now
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-500">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BuyerOrders;
