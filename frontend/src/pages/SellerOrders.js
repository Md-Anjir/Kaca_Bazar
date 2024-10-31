import React, { useState, useEffect } from "react";
import axios from "axios";
import SellerHeader from "../component/SellerHeader";
import Footer from "../component/Footer";
import gif from "../images/logo.gif";

function SellerOrders() {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the server when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/seller/orders"); // Replace with actual API endpoint
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <SellerHeader />

      <div className="flex-1 items-center">
        <div
          className="flex justify-center items-center p-4 flex-col py-9"
          style={{ backgroundColor: "green" }}
        >
          <div style={{ width: "50%", paddingRight: "20px" }}>
            <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>Your Orders</h1>
            <p style={{ fontSize: "20px", marginTop: "20px" }}>
              Manage your orders, track the status, and ensure timely delivery.
            </p>
            <img
              src={gif}
              alt="Orders GIF"
              style={{ marginTop: "50px", width: "150px" }}
            />
          </div>
        </div>

        {/* Orders Table */}
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
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.order_id}>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        {order.order_id}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        {order.product_name}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        {order.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        ${order.total_price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-gray-500"
                    >
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
