import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import UserSideNav from "../UserSideNav";
import { useHistory } from "react-router-dom";
import User from "../../../components/mobiledash/User";
import { getOrder } from "../../../functions/order";
import HistoryMobile from "./HistoryMobile";
import Order from "./Order";
import { useSelector } from "react-redux";
import { selectUserToken } from "../../../features/user/userSlice";

const { Content } = Layout;

const History = () => {
  const [order, setOrder] = useState([]);

  const token = useSelector(selectUserToken);
  const history = useHistory();

  useEffect(() => {
    getOrder(token).then((res) => {
      setOrder(res.data);
    });
  }, []);

  return (
    <div className="history">
      <Layout style={{ minHeight: "100vh" }}>
        <UserSideNav />
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div className="history_container">
              <h1
                className={
                  order.length > 0 ? "history_title" : "history_title no"
                }
              >
                {order.length > 0
                  ? `Your Order${order.length > 1 ? "s" : ""}`
                  : "No Orders"}
              </h1>

              <Order order={order} />
            </div>
          </Content>
        </Layout>
      </Layout>

      <div className="register_user_mobile_side">
        <User />
      </div>
      <HistoryMobile order={order} />
    </div>
  );
};

export default History;
