import {toast}from "react-toastify";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import { useEffect, useState } from "react";
import moment from "moment";
import { Reactapi } from "../../api";
import { Select } from "antd";

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();

  const getOrders = async () => {
    try {
      const response = await axios.get(`${Reactapi}/api/auth/all-orders`, {
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

  const handleChange = async (value, orderId) => {
    try {
      const response = await axios.put(
        `${Reactapi}/api/auth/order-status/${orderId}`,
        {
          status: value,
        }
      );
      const data = response.data;
      if (data.success) {
        toast.success(data.message);
        getOrders();
      }
    } catch (error) {
      console.log("Change Status Error:", error);
    }
  };

  return (
    <Layout title={"Admin Orders"} description={"Manage Orders"}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-8 md:mb-0">
              <AdminMenu />
            </div>
            <div className="md:w-3/4">
              <h1 className="text-2xl font-bold mb-6 text-center">
                All Orders
              </h1>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <div
                    key={index}
                    className="mb-6 bg-white shadow-md rounded-lg overflow-hidden"
                  >
                    <table className="table-auto w-full text-left border-collapse">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 border">Order ID</th>
                          <th className="px-4 py-2 border">Status</th>
                          <th className="px-4 py-2 border">Buyer</th>
                          <th className="px-4 py-2 border">Time</th>
                          <th className="px-4 py-2 border">Payment</th>
                          <th className="px-4 py-2 border">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 border">{index + 1}</td>
                          <td className="px-4 py-2 border">
                            <Select
                              defaultValue={order?.status}
                              style={{ width: 120 }}
                              onChange={(value) =>
                                handleChange(value, order._id)
                              }
                            >
                              {status.map((item, index) => (
                                <Select.Option key={index} value={item}>
                                  {item}
                                </Select.Option>
                              ))}
                            </Select>
                          </td>
                          <td className="px-4 py-2 border">
                            {order?.buyer?.name}
                          </td>
                          <td className="px-4 py-2 border">
                            {moment(order?.createdAt).fromNow()}
                          </td>
                          <td className="px-4 py-2 border">
                            {order?.payment?.razorpay_payment_id ? (
                              <span className="text-green-500">Paid</span>
                            ) : (
                              <span className="text-red-500">Pending</span>
                            )}
                          </td>
                          <td className="px-4 py-2 border">
                            {order?.products?.length}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {order?.products?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 border-t"
                      >
                        <div className="w-24 h-24">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="object-cover w-full h-full rounded-md"
                          />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            {item.description}
                          </p>
                          <p className="text-sm font-medium">
                            Price: ${item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600">
                  No orders found. Please try again later.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
