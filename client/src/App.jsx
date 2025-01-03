import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Layout/Nav/Nav";
import Login from "./pages/auth/Login";
import Account from "./pages/auth/Register";
import Contact from "./pages/Contact";
import Successful from "./pages/LoginSuccess";
import Successful2 from "./pages/RegisterSuccess";
import Store from "./pages/Store";
import Home from "./pages/Home";
import "./App.css";
import Pagenotfound from "./pages/Pagenotfound";
import CartPage from "./pages/CartPage";
import Footer from "./components/Layout/Foot/Foot";
import Orders from "./pages/user/Orders";
import CheckoutPage from "./pages/CheckoutPage";
import Dashboard from "./pages/user/Dashboard";
import AdmDashboard from "./pages/Admin/AdminDashboard"

function App() {
  // added

  return (
    <>
      <Router>
        <Navbar />
        <Routes>


          /****************/
          <Route path="/dashboard/admin" element={<AdmDashboard />} />
          /****************/


          <Route path="/login" element={<Login />} />
          <Route path="/login-success" element={<Successful />} />
          <Route path="/" element={<Home />} />

         
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/dashboard/user/orders" element={<Orders />} />
          <Route path="/dashboard/user/profile" element={<Dashboard />} />

          <Route path="/store" element={<Store />} />
          <Route path="/signup" element={<Account />} />
          <Route path="/register-success" element={<Successful2 />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
