import React, { useState, useEffect } from "react";
import { Drawer, Space, Menu } from "antd";
import { useSelector } from "react-redux";
import { selectUserName, selectUserRole } from "../../features/user/userSlice";
import { FaBars, FaBox, FaBoxes, FaLock } from "react-icons/fa";
import { AiOutlineClose, AiOutlineDashboard } from "react-icons/ai";
import { BsBoundingBox, BsBoundingBoxCircles } from "react-icons/bs";
import { RiCoupon3Line } from "react-icons/ri";
import { useHistory, useLocation } from "react-router-dom";

const Admin = () => {
  const [visible, setVisible] = useState(false);
  const userName = useSelector(selectUserName);
  const userRole = useSelector(selectUserRole);
  const history = useHistory();
  const location = useLocation();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
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
    <div className="mobile_side">
      <Space>
        <div onClick={showDrawer} className="drawer_bar">
          <FaBars />
        </div>
      </Space>
      <Drawer
        title={`${userName} Dashboard`}
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <div onClick={onClose} className="mobile_side_close">
          <AiOutlineClose style={{ cursor: "pointer" }} />
        </div>
        <Menu
          selectedKeys={[selectedKey]}
          mode="inline"
          theme="light"
          onClick={onClickMenu}
          className="mobile_menu"
        >
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </div>
  );
};

export default Admin;
