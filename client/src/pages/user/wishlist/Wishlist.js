import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import User from "../../../components/mobiledash/User";
import UserSideNav from "../UserSideNav";
import { useSelector } from "react-redux";
import { selectUserToken } from "../../../features/user/userSlice";
import { getWishlist } from "../../../functions/wishlist";
import Order from "./Order";

const { Content } = Layout;

const History = () => {
  const [wishlist, setWishlist] = useState([]);

  const token = useSelector(selectUserToken);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    getWishlist(token).then((res) => {
      console.log("wishlist", res.data.wishlist);
      setWishlist(res.data.wishlist);
    });
  };

  return (
    <div className="wishlist">
      <Layout style={{ minHeight: "100vh" }}>
        <UserSideNav />
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div className="history_container">
              <h1
                className={
                  wishlist.length > 0 ? "history_title" : "history_title no"
                }
              >
                {wishlist.length > 0 ? "WishList" : "No Items"}
              </h1>

              <Order
                wishlist={wishlist}
                token={token}
                loadWishlist={loadWishlist}
              />
            </div>
          </Content>
        </Layout>
      </Layout>

      <div className="register_user_mobile_side">
        <User />
        <div className="history_container">
          <h1
            className={
              wishlist.length > 0 ? "history_title" : "history_title no"
            }
          >
            {wishlist.length > 0 ? "WishList" : "No Items"}
          </h1>

          <Order
            wishlist={wishlist}
            token={token}
            loadWishlist={loadWishlist}
          />
        </div>
      </div>
    </div>
  );
};

export default History;
