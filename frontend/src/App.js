import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import SellerLogin from "./pages/SellerLogin"
import SellerRegister from "./pages/SellerRegister"
import Contact from "./pages/Contact"
import TermsAndConditions from "./pages/TermsAndConditions"
import AboutUs from "./pages/AboutUs"
import FAQs from "./pages/FAQs"
import Seller from "./pages/Seller"
import SellerUpdateProfile from "./pages/SellerUpdateProfile"
import SellerOrders from "./pages/SellerOrders"
import FarmerLogin from "./pages/FarmerLogin"
import FarmerRegister from "./pages/FarmerRegister"
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/sellerregister" element={<SellerRegister/>}></Route>
        <Route path="/sellerlogin" element={<SellerLogin/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/termsandconditions" element={<TermsAndConditions/>}></Route>
        <Route path="/aboutus" element={<AboutUs/>}></Route>
        <Route path="/faqs" element={<FAQs/>}></Route>
        <Route path="/seller" element={<Seller/>}></Route>
        <Route path="/seller/update-profile" element={<SellerUpdateProfile/>}></Route>
        <Route path="/seller/orders" element={<SellerOrders/>}></Route>
        <Route path="/farmerlogin" element={<FarmerLogin/>}></Route>
        <Route path="/farmerregister" element={<FarmerRegister/>}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
