import Layout from "../components/Layout/Layout";
import { useAuth } from "../Context/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/cart";
import { API_URL } from "../api";
import axios from "axios";

const Cart = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { cart, setCart } = useCart();

  const totalPrices = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price;
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
    });
  };

  const removeCardItem = (id) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === id);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  const handlePayment = async () => {
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    const response = await axios.post(
      `${API_URL}/api/payment/order`,
      {
        amount: totalAmount,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;

    if (!data.success) {
      alert("Error creating Razorpay order");
      return;
    }

    const options = {
      key: "rzp_test_mn0PTHHGYdjsI8", // Replace with your Razorpay Key
      amount: data.order.amount,
      currency: data.order.currency,
      name: "E-Commerce Store",
      description: "Order Payment",
      image: "/logo.png",
      order_id: data.order.id,
      handler: async (response) => {
        try {
          const verifyResponse = await axios.post(
            `${API_URL}/api/payment/verify`,
            {
              response,
              products: cart,
              buyer: auth?.user?.id,
              address: auth?.user?.address,
              totalPrice: totalAmount,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const verifyData = verifyResponse.data;
          if (verifyData.success) {
            // Update cart and remove items
            setCart([]);
            localStorage.removeItem("cart");

            alert("Payment Successful");
            navigate("/dashboard/user/orders"); // Redirect after payment success
          } else {
            alert("Payment Verification Failed");
          }
        } catch (error) {
          console.error(error);
        }
      },
      prefill: {
        name: auth?.user?.name || "Guest",
        email: auth?.user?.email || "guest@example.com",
        contact: auth?.user?.phone,
      },
      theme: {
        color: "#3399cc",
      },
      method: {
        netbanking: true,
        card: true,
        upi: true,
        wallet: true,
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <Layout title={"Cart"} description={"Cart"}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{`Hello ${
          auth?.user?.name || "Guest"
        }, Your Cart Items`}</h1>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-3/4 px-2">
            {cart?.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap mb-4 p-2 border rounded shadow"
              >
                <div className="w-full md:w-1/3 p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="w-full md:w-2/3 p-2">
                  <h4 className="text-xl font-semibold">{item.name}</h4>
                  <p className="text-gray-700">{item.description}</p>
                  <p className="text-lg font-bold">Price: {item.price}</p>
                  <button
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={() => removeCardItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div>
              <div className="w-full md:w-1/4 px-2">
                <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
                <h4 className="text-lg font-semibold mb-4">
                  Total: {totalPrices()}
                </h4>
                {auth?.user?.address ? (
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold">Current Address</h4>
                    <p className="text-gray-700">{auth?.user?.address}</p>
                    <button
                      className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                ) : (
                  <div className="mb-4">
                    {auth?.token ? (
                      <button
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Add Address
                      </button>
                    ) : (
                      <button
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                      >
                        Login to Checkout
                      </button>
                    )}
                  </div>
                )}
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  onClick={handlePayment}
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
