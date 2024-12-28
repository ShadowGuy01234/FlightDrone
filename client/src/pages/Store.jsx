import ItemScroller from "../components/component/Store-Scroller/ItemScroller";
import ProductCard from "../components/component/StoreProd/ProductCard";
import ProductGrid from "../components/component/Store/ProductGrid";
import MainComponent from "../components/component/Store/MainCompo";
import axios from "axios";
import { API_URL } from "../api";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/cart";

const Store = () => {
  const [product, setProduct] = useState([]);
  const { cart, setCart } = useCart();
  const Navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/product/get-product`);
      if (data.success) {
        setProduct(data.products);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching products");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      {/* <ItemScroller />
      <div className="flex flex-wrap justify-around">
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div> */}

      
        <MainComponent />
       
   

      {/* <div>
        <div className="w-full">
          <div className="text-center text-2xl font-bold my-4">
            All Products
          </div>
          <div className="flex flex-wrap justify-center">
            {product.map((product) => (
              <div
                key={product._id}
                className="card m-2 w-72 bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={product.image}
                  className="w-full h-48 object-cover"
                  alt={product.name}
                />
                <div className="p-4">
                  <h5 className="text-lg font-semibold">{product.name}</h5>
                  <p className="text-gray-600">${product.price}</p>
                  <button
                    onClick={() => Navigate(`/product/${product.slug}`)}
                    className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded mt-2"
                  >
                    View Details
                  </button>
                  <button
                    className="btn btn-secondary bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2"
                    onClick={() => {
                      setCart([...cart, product]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, product])
                      );
                      toast.success("Product Added to Cart");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Store;
