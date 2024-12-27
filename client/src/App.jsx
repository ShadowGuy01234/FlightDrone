
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Account from './pages/Account';
import Contact from './pages/Contact';
import Successful from './pages/Successful';
import Successful2 from './pages/Successful2';
import Store from './pages/Store';
import Store2 from './pages/Store2';
import Sensor from './components/Products/Sensor';
import Microboard from './components/Products/Microboard';
import Tools from './components/Products/Tools'
import Battery from './components/Products/Battery';
import Droneparts from './components/Products/Droneparts';
import Printing from './components/Products/Printing';
import Cart from './pages/Cart';
import Home from './pages/Home';
import './App.css'
import Navbar from './components/Nav/Nav';
import Footer from './components/Foot/Foot';
function App() {


// added

  return (
    <>
        
       <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="Successful" element={<Successful/>} />
        <Route path="srcSensor" element={<Sensor/>} />
        <Route path="/" element={<Home/>} />

        <Route path="cart" element={<Cart/>} />
        <Route path="Microboard" element={<Microboard/>} />
        <Route path="Printing" element={<Printing/>} />
        <Route path="Droneparts" element={<Droneparts/>} />
        <Route path="Battery" element={<Battery/>} />
        <Route path="Tools" element={<Tools/>} />
        <Route path="store" element={<Store/>} />
        <Route path="store2" element={<Store2/>} />
        <Route path="/signup" element={<Account/>} />
        <Route path="/Account/Successful2" element={<Successful2/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
      <Footer/>
    </Router>
        
    </>
  )
}

export default App
