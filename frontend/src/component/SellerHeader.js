import { Link } from "react-router-dom";
import logo from "../images/KacaBazarLogo.png";
import seller from "../images/agent.png";

export default function SellerHeader() {
  return (
    <>
      {/* Seller Header Component */}
      <div className="bg-white">
        <div className="border py-3 px-6">
          <div className="flex justify-between">
            {/* Logo */}
            <div className="flex items-center py-0 px-1">
              <Link to="/seller">
                <img
                  src={logo}
                  alt="Kaca Bazar Logo"
                  style={{ width: "110px", height: "50px", padding: "0" }}
                />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="ml-6 flex flex-1 gap-3">
              <input
                type="text"
                className="w-full rounded-md border border-[#DDE2E4] px-3 py-2 text-sm"
                placeholder="Search on Kaca Bazar"
              />
            </div>

            {/* Seller Links */}
            <div className="flex gap-x-2">
              {/* Update Profile */}
              <div
                className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100"
                onClick={() => (window.location.href = "/seller/update-profile")}
              >
                <img
                  src={seller}
                  alt="seller"
                  style={{ width: "30px", height: "30px", padding: "0" }}
                />
                <span className="text-sm font-medium">Update Profile</span>
              </div>

              {/* Sales */}
              <div
                className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100"
                onClick={() => (window.location.href = "/seller/sales")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path
                    fillRule="evenodd"
                    d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">Sales</span>
              </div>

              {/* Orders */}
              <div
                className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100"
                onClick={() => (window.location.href = "/seller/orders")}
              >
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                    5
                  </span>
                </div>
                <span className="text-sm font-medium">Orders</span>
              </div>

              {/* Logout */}
              <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-gray-100">
                <Link to="/seller/logout" className="text-blue-500">
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}