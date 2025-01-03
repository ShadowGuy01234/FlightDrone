import { motion } from "framer-motion";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../Context/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/cart";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

const Cart = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { cart, setCart } = useCart();

  const totalPrices = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price * (item.quantity || 1);
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
    });
  };
  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem("PushPakCart", JSON.stringify(updatedCart));
  };
  const removeItem = (id) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === id);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("PushPakCart", JSON.stringify(myCart));
  };


  return (
    <Layout title="Cart" description="Your shopping cart">
      <div className="container mx-auto p-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-4"
        >
          <h1 className="text-2xl font-bold">
            {`Hello ${auth?.user?.name || "Guest"}, Your Cart`}
          </h1>
      
        </motion.div>

        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-3/4 px-2">
            {cart?.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-lg shadow p-8 text-center"
              >
                <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/store")}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                >
                  Browse Products
                </motion.button>
              </motion.div>
            ) : (
              cart?.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-wrap mb-4 p-4 bg-white rounded-lg shadow"
                >
                  <div className="w-full md:w-1/3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                  <div className="w-full md:w-2/3 p-4">
                    <h4 className="text-xl font-semibold">{item.name}</h4>
                    <p className="text-gray-600 mb-2">{item.description}</p>
                    <p className="text-lg font-bold mb-4">₹{item.price}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item._id, (item.quantity || 1) - 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <FiMinus className="w-5 h-5" />
                        </button>
                        <span className="w-8 text-center">{item.quantity || 1}</span>
                        <button
                          onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <FiPlus className="w-5 h-5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                   
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full md:w-1/4 px-2"
            >
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
                <h4 className="text-lg font-semibold mb-4">
                  Total: {totalPrices()}
                </h4>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  >
                    Proceed to Checkout
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/store")}
                    className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-50"
                  >
                    Add More Items
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
