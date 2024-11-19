// AdminMain.js
import React from "react";

function AdminMain() {
  return (
    <main className="container mx-auto my-8 p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Overview Cards Section */}
        <div className="bg-blue-500 text-white p-4 rounded shadow">
          <h5 className="text-lg font-bold">Total Products</h5>
          <h2 className="text-2xl">1,245</h2>
        </div>
        <div className="bg-green-500 text-white p-4 rounded shadow">
          <h5 className="text-lg font-bold">Total Orders</h5>
          <h2 className="text-2xl">5,783</h2>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded shadow">
          <h5 className="text-lg font-bold">Total Customers</h5>
          <h2 className="text-2xl">3,432</h2>
        </div>
        <div className="bg-red-500 text-white p-4 rounded shadow">
          <h5 className="text-lg font-bold">Revenue</h5>
          <h2 className="text-2xl">$123,456</h2>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="mt-8">
        <div className="bg-slate-700 text-white p-4 rounded shadow">
          <h5 className="text-lg font-bold">Recent Orders</h5>
          <table className="w-full mt-4">
            <thead>
              <tr>
                <th className="text-left">Order ID</th>
                <th className="text-left">Customer</th>
                <th className="text-left">Date</th>
                <th className="text-left">Status</th>
                <th className="text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#12345</td>
                <td>John Doe</td>
                <td>2024-09-24</td>
                <td><span className="bg-green-500 text-white px-2 py-0 rounded text-center">Completed</span></td>
                <td>$250</td>
              </tr>
              <tr>
                <td>#12346</td>
                <td>Jane Smith</td>
                <td>2024-09-23</td>
                <td><span className="bg-yellow-500 text-white px-2 py-0 rounded text bg-center">Pending</span></td>
                <td>$150</td>
              </tr>
              <tr>
                <td>#12347</td>
                <td>Mike Johnson</td>
                <td>2024-09-22</td>
                <td><span className="bg-red-500 text-white px-2 py-0 rounded text-center">Cancelled</span></td>
                <td>$300</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Selling Products Section */}
      <div className="mt-8">
        <div className="bg-gray-800 text-white p-4 rounded shadow">
          <h5 className="text-lg font-bold">Top Selling Products</h5>
          <ul className="mt-4">
            <li className="flex justify-between items-center py-2">
              Product A
              <span className="bg-blue-500 text-white px-2 py-1 rounded">150 Sales</span>
            </li>
            <li className="flex justify-between items-center py-2">
              Product B
              <span className="bg-blue-500 text-white px-2 py-1 rounded">120 Sales</span>
            </li>
            <li className="flex justify-between items-center py-2">
              Product C
              <span className="bg-blue-500 text-white px-2 py-1 rounded">90 Sales</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default AdminMain;
