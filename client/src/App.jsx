import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Layout/Nav/Nav";
import Login from "./pages/auth/Login";
import Account from "./pages/auth/Register";
import Contact from "./pages/Contact";
import Successful from "./pages/LoginSuccess";
import Successful2 from "./pages/RegisterSuccess";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import "./App.css";
import Pagenotfound from "./pages/Pagenotfound";
import Footer from "./components/Layout/Foot/Foot";
function App() {
  // added

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/login-success" element={<Successful />} />
          <Route path="/" element={<Home />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/store" element={<Store />} />
          <Route path="/signup" element={<Account />} />
          <Route path="/register-success" element={<Successful2 />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
