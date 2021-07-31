import React, { useEffect, useState } from "react";
import Admin from "../../../components/mobiledash/Admin";
import AdminSideNav from "../AdminSideNav";
import { Layout } from "antd";
import { getOrder, updateStatus } from "../../../functions/admin";
import { useSelector } from "react-redux";
import { selectUserToken } from "../../../features/user/userSlice";
import { toast } from "react-toastify";
import Order from "./Order";

const { Content } = Layout;

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  const token = useSelector(selectUserToken);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    getOrder(token).then((res) => {
      setOrders(res.data);
      console.log(res.data);
    });
  };

  const changeStatus = (orderId, orderStatus) => {
    updateStatus(token, orderId, orderStatus).then((res) => {
      toast.success("Status Updated");
      loadOrder();
    });
  };

  return (
    <div className="password">
      <Admin />
      <Layout style={{ minHeight: "100vh" }}>
        <AdminSideNav />
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div className="admin_dashboard">
              {/************ title ***********/}
              <div className="admin_dashboard_title">
                <h2>Admin Dashboard</h2>
              </div>

              {/************* content **********/}
              <Order orders={orders} changeStatus={changeStatus} />
            </div>
          </Content>
        </Layout>
      </Layout>
      {/************* mobile *************/}
      <div className="admin_dashboard_mobile">
        <div className="admin_dashboard_title">
          <h2>Admin Dashboard</h2>
        </div>
        <Order orders={orders} changeStatus={changeStatus} />
      </div>
    </div>
  );
};

export default AdminDashboard;
