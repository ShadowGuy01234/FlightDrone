import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import { API_URL } from "../../api";
import moment from "moment";
import { motion } from "framer-motion";
import {
  ClockIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UserIcon,
  CheckCircleIcon,
  ClockIcon as PendingIcon,
} from "@heroicons/react/24/outline";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();

  const getOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/getorders`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      const data = response.data;
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log("Get Orders Error:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Orders"} description={"Your Order History"}>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Orders</h1>
            <p className="text-gray-600">Track and manage your purchases</p>
          </motion.div>

          <div className="space-y-6">
            {orders?.map((order, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gray-50 p-4 border-b">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <ShoppingBagIcon className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Order ID</p>
                        <p className="font-medium">#{index + 1}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <UserIcon className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Customer</p>
                        <p className="font-medium">{order?.buyer?.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <ClockIcon className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="font-medium">{moment(order?.createdAt).format('MMM DD, YYYY')}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <CurrencyDollarIcon className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Payment Status</p>
                        <div className="flex items-center space-x-1">
                          {order?.payment?.razorpay_payment_id ? (
                            <>
                              <CheckCircleIcon className="h-4 w-4 text-green-500" />
                              <span className="text-green-500 font-medium">Paid</span>
                            </>
                          ) : (
                            <>
                              <PendingIcon className="h-4 w-4 text-orange-500" />
                              <span className="text-orange-500 font-medium">Pending</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="divide-y divide-gray-200">
                  {order?.products?.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-24 h-24 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-lg font-semibold text-gray-800 mb-1">
                          {item.name}
                        </h4>
                        <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                        <p className="text-gray-900 font-bold">
                          ₹{item.price.toLocaleString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-4 border-t">
                  <div className="flex justify-between items-center">
                    <div className="text-gray-600">
                      Total Items: {order?.products?.length}
                    </div>
                    <div className="text-gray-600">
                      Status: <span className="font-medium">{order?.status}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
