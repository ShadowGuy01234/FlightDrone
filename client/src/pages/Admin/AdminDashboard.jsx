import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import Widget from "../../components/Layout/Widgets";
import { useAuth } from "../../Context/auth";
import "./adminpg.css";
const AdminDashboard = () => {
  const { auth } = useAuth();
  return (

    <Layout title={"AdminDashboard"} description={"AdminDashboard"}>
      <div className="container-admin">
          <div className="colm-1">
            <AdminMenu />
          </div>
          {/* <div className="colm-2">
            <div className="card w-75 p-3">
              <h4> Name:{auth?.user?.name}</h4>
              <h4> Email:{auth?.user?.email}</h4>
              <h4> Contact:{auth?.user?.phone}</h4>
            </div>
          </div> */}
        <div className="colm-2">
          <h1>Dashboard</h1>
          {/* <Widget/> */}
        </div>

      </div>

    </Layout>
  );
};

export default AdminDashboard;
