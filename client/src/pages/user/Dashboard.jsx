import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../Context/auth";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../api";
import { motion } from "framer-motion";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaLock, 
  FaQuestion, 
  FaEdit, 
  FaTimes,
  FaCheckCircle 
} from 'react-icons/fa';

const Dashboard = () => {
  const { auth, setAuth } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
  });

  useEffect(() => {
    if (auth?.user) {
      setFormData({
        name: auth.user.name || "",
        email: auth.user.email || "",
        phone: auth.user.phone || "",
        address: auth.user.address || "",
        answer: auth.user.answer || "",
        password: "",
      });
    }
  }, [auth?.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (!formData.name || !formData.email || !formData.phone) {
        toast.error("Name, Email and Phone are required");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address");
        return;
      }

      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        toast.error("Please enter a valid 10-digit phone number");
        return;
      }

      const { data } = await axios.put(`${API_URL}/api/auth/profile`, {
        ...formData,
        userId: auth.user._id,
      });

      if (data?.success) {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully");
        setEditing(false);
      }
    } catch (error) {
      console.log("Profile update error:", error);
      toast.error(error.response?.data?.message || "Something went wrong while updating profile");
    } finally {
      setLoading(false);
    }
  };

  const InfoCard = ({ icon: Icon, label, value }) => (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center space-x-3 mb-3">
        <Icon className="text-blue-500 text-xl" />
        <span className="text-gray-600 font-medium">{label}</span>
      </div>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </motion.div>
  );

  return (
    <Layout title={"Dashboard"} description={"User Dashboard"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
         
          <div className="col-span-12 md:col-span-9">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center space-x-3">
                    <FaUser className="text-blue-500 text-2xl" />
                    <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                      editing 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-blue-500 hover:bg-blue-600'
                    } text-white transition-colors duration-300`}
                    onClick={() => setEditing(!editing)}
                    disabled={loading}
                  >
                    {editing ? (
                      <>
                        <FaTimes className="text-lg" />
                        <span>Cancel</span>
                      </>
                    ) : (
                      <>
                        <FaEdit className="text-lg" />
                        <span>Edit Profile</span>
                      </>
                    )}
                  </motion.button>
                </div>

                {!editing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoCard icon={FaUser} label="Name" value={auth?.user?.name} />
                    <InfoCard icon={FaEnvelope} label="Email" value={auth?.user?.email} />
                    <InfoCard icon={FaPhone} label="Phone" value={auth?.user?.phone} />
                    <InfoCard icon={FaMapMarkerAlt} label="Address" value={auth?.user?.address} />
                  </div>
                ) : (
                  <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <div>
                          <label className="flex items-center space-x-2 text-gray-700 mb-2">
                            <FaUser className="text-blue-500" />
                            <span>Full Name</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your name"
                          />
                        </div>

                        <div>
                          <label className="flex items-center space-x-2 text-gray-700 mb-2">
                            <FaEnvelope className="text-blue-500" />
                            <span>Email Address</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email"
                          />
                        </div>

                        <div>
                          <label className="flex items-center space-x-2 text-gray-700 mb-2">
                            <FaLock className="text-blue-500" />
                            <span>Password (optional)</span>
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter new password"
                          />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className="flex items-center space-x-2 text-gray-700 mb-2">
                            <FaPhone className="text-blue-500" />
                            <span>Phone Number</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your phone number"
                          />
                        </div>

                        <div>
                          <label className="flex items-center space-x-2 text-gray-700 mb-2">
                            <FaMapMarkerAlt className="text-blue-500" />
                            <span>Address</span>
                          </label>
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your address"
                          ></textarea>
                        </div>

                        <div>
                          <label className="flex items-center space-x-2 text-gray-700 mb-2">
                            <FaQuestion className="text-blue-500" />
                            <span>Security Question</span>
                          </label>
                          <input
                            type="text"
                            name="answer"
                            value={formData.answer}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="What is your favourite color?"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={loading}
                        className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                      >
                        {loading ? (
                          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                        ) : (
                          <FaCheckCircle className="text-lg" />
                        )}
                        <span>Update Profile</span>
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
