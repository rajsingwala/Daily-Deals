import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaBox, FaBoxes, FaLock } from "react-icons/fa";
import { BsBoundingBox, BsBoundingBoxCircles } from "react-icons/bs";
import { RiCoupon3Line } from "react-icons/ri";
import { Menu, Layout, Input, Select } from "antd";
const { Content, Sider } = Layout;

const AdminSideNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const items = [
    {
      key: "1",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <AiOutlineDashboard />,
    },
    {
      key: "2",
      label: "Product",
      path: "/admin/product",
      icon: <FaBox />,
    },
    {
      key: "3",
      label: "Products",
      path: "/admin/all-products",
      icon: <FaBoxes />,
    },
    {
      key: "4",
      label: "Category",
      path: "/admin/category",
      icon: <BsBoundingBox />,
    },
    {
      key: "5",
      label: "Sub Category",
      path: "/admin/subcategory",
      icon: <BsBoundingBoxCircles />,
    },
    {
      key: "6",
      label: "Coupon",
      path: "/admin/coupon",
      icon: <RiCoupon3Line />,
    },
    {
      key: "7",
      label: "Password",
      path: "/admin/password",
      icon: <FaLock />,
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

export default AdminSideNav;
