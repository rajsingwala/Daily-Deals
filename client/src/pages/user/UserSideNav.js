import React, { useState, useEffect } from "react";
import { Menu, Layout } from "antd";
import {
  HistoryOutlined,
  LockOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useHistory, useLocation } from "react-router";

const { Sider } = Layout;

const UserSideNav = () => {
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

  return (
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
  );
};

export default UserSideNav;
