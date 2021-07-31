import React, { useEffect, useState } from "react";
import { Menu, Layout, Input } from "antd";
import {
  HistoryOutlined,
  LockOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../../features/user/userSlice";
import User from "../../components/mobiledash/User";
const { Content, Sider } = Layout;

const Password = () => {
  const [password, setPassword] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const items = [
    {
      key: "1",
      label: "History",
      path: "/user/history",
      icon: <HistoryOutlined />,
    },
    {
      key: "2",
      label: "Password",
      path: "/user/password",
      icon: <LockOutlined />,
    },
    {
      key: "3",
      label: "Wishlist",
      path: "/user/wishlist",
      icon: <HeartOutlined />,
    },
  ];

  const [selectedKey, setSelectedKey] = useState(
    items.find((_item) => location.pathname.startsWith(_item.path)).key
  );

  const onClickMenu = (item) => {
    const clicked = items.find((_item) => _item.key === item.key);
    history.push(clicked?.path);
  };

  useEffect(() => {
    setSelectedKey(
      items.find((_item) => location.pathname.startsWith(_item.path)).key
    );
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      toast.error("Password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be atleast 6 length long");
      return;
    }

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        toast.success("Password Updated");
        setPassword("");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="password">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <Menu
            theme="dark"
            selectedKeys={[selectedKey]}
            mode="inline"
            theme="light"
            onClick={onClickMenu}
            style={{ width: "200px" }}
          >
            {items.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div className="register_container4">
              <div className="register_background"></div>
              <div className="register_content3">
                <h1>Update Password</h1>
              </div>
              <div className="register_form2">
                <Input.Password
                  placeholder="Enter New Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoFocus
                />

                <div className="register_btn" onClick={handleSubmit}>
                  <span>UPDATE</span>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>

      <div className="register_user_mobile_side">
        <User />
      </div>
      <div className="register_container4_mobile">
        <div className="register_background_mobile"></div>
        <div className="register_content3_mobile">
          <h1>Update Password</h1>
        </div>
        <div className="register_form2_mobile">
          <Input.Password
            placeholder="Enter New Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoFocus
          />

          <div className="register_btn" onClick={handleSubmit}>
            <span>UPDATE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
