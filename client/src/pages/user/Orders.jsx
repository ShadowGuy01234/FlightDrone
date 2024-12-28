import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import { API_URL } from "../../api";
import moment from "moment";
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
      console.log("Orders Data:", data);
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
    <Layout title={"Orders"} description={"Orders"}>
      <div>
        <div className="container mx-auto p-3">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/4">
              <div className="text-center text-xl font-bold mb-4">All Orders</div>
              {orders?.map((order, index) => {
                return (
                  <div key={index} className="border shadow mb-4">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border-b">Order ID</th>
                          <th className="py-2 px-4 border-b">Status</th>
                          <th className="py-2 px-4 border-b">Buyer</th>
                          <th className="py-2 px-4 border-b">Time</th>
                          <th className="py-2 px-4 border-b">Payment</th>
                          <th className="py-2 px-4 border-b">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2 px-4 border-b">{index + 1}</td>
                          <td className="py-2 px-4 border-b">{order?.status}</td>
                          <td className="py-2 px-4 border-b">{order?.buyer?.name}</td>
                          <td className="py-2 px-4 border-b">{moment(order?.createdAt).fromNow()}</td>
                          <td className="py-2 px-4 border-b">
                            {order?.payment?.razorpay_payment_id ? (
                              <span className="text-green-500">Paid</span>
                            ) : (
                              <span className="text-red-500">Pending</span>
                            )}
                          </td>
                          <td className="py-2 px-4 border-b">{order?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    {order?.products?.map((item, index) => (
                      <div key={index} className="flex p-2 border-t">
                        <div className="w-1/4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-auto"
                          />
                        </div>
                        <div className="w-3/4 pl-4">
                          <h4 className="text-lg font-semibold">{item.name}</h4>
                          <p>{item.description}</p>
                          <p className="font-bold">Price: {item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
