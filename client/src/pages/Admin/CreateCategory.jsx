import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Reactapi } from "../../api";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [updateId, setUpdateId] = useState(null);

  const getallCategory = async () => {
    try {
      const { data } = await axios.get(`${Reactapi}/api/category/get-category`);
      if (data.success) {
        setCategory(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching categories");
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${Reactapi}/api/category/create-category`,
        { name }
      );
      if (data.success) {
        toast.success(data.message);
        getallCategory();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating category");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${Reactapi}/api/category/update-category/${updateId}`,
        { name }
      );
      if (data.success) {
        toast.success(data.message);
        getallCategory();
        setName("");

        setUpdateId(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating category");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Reactapi}/api/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        getallCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting category");
    }
  };

  const handleEditCategory = (cat) => {
    setName(cat.name);
    setUpdateId(cat._id);
  };

  useEffect(() => {
    getallCategory();
  }, []);

  return (
    <Layout
      title={"Manage Categories"}
      description={"Create, Update, and Delete Categories"}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4">
          <AdminMenu />
        </div>
        <div className="md:w-3/4 p-4">
          <h2 className="text-2xl font-bold mb-6 text-center">
            All Categories
          </h2>
          <form
            onSubmit={updateId ? handleUpdateCategory : handleCreateCategory}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Category Name
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {updateId ? "Update Category" : "Create Category"}
            </button>
          </form>

          <table className="table-auto w-full mt-6 bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {category.map((cat) => (
                <tr
                  key={cat._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{cat.name}</td>
                  <td className="py-3 px-6 text-center flex justify-center">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded mx-1 hover:bg-yellow-600"
                      onClick={() => handleEditCategory(cat)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded mx-1 hover:bg-red-600"
                      onClick={() => handleDeleteCategory(cat._id)}
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

export default CreateCategory;
