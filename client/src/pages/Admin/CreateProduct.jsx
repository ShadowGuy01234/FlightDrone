import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Reactapi } from "../../api";

const CreateProduct = () => {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [updateId, setUpdateId] = useState(null);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${Reactapi}/api/product/get-product`);
      if (data.success) {
        setProduct(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching products");
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${Reactapi}/api/category/get-category`);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching categories");
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${Reactapi}/api/product/create-product`,
        { name, price, description, image, category }
      );
      if (data.success) {
        toast.success(data.message);
        getAllProducts();
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating product");
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${Reactapi}/api/product/update-product/${updateId}`,
        { name, price, description, image, category }
      );
      if (data.success) {
        toast.success(data.message);
        getAllProducts();
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating product");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Reactapi}/api/product/delete-product/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        getAllProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product");
    }
  };

  const handleEditProduct = (product) => {
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setCategory(product.category);
    setUpdateId(product._id);
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setImage("");
    setCategory("");
    setUpdateId(null);
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  return (
    <Layout title="Manage Products" description="Create, Update, and Delete Products">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4">
          <AdminMenu />
        </div>
        <div className="md:w-3/4 p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">All Products</h2>
          <form
            onSubmit={updateId ? handleUpdateProduct : handleCreateProduct}
            className="bg-white shadow-md rounded-lg p-6 mb-6"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
              <input
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {updateId ? "Update Product" : "Create Product"}
            </button>
          </form>

          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {product.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4">{item.price}</td>
                  <td className="py-3 px-4">{item.description}</td>
                  <td className="py-3 px-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                  </td>
                  <td className="py-3 px-4">{item.category?.name}</td>
                  <td className="py-3 px-4">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                      onClick={() => handleEditProduct(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDeleteProduct(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
