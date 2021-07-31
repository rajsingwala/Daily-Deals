import React, { useEffect, useState } from "react";
import { Layout, Input, Select, Form, Menu } from "antd";
import { useHistory } from "react-router-dom";
import { getCategories } from "../../../functions/category";
import {
  createSubCategory,
  getSubCategories,
  removeSubCategory,
} from "../../../functions/subcategory";
import { useSelector } from "react-redux";
import { selectUserToken } from "../../../features/user/userSlice";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaBox, FaBoxes, FaLock } from "react-icons/fa";
import { BsBoundingBox, BsBoundingBoxCircles } from "react-icons/bs";
import { RiCoupon3Line } from "react-icons/ri";
import { LoadingOutlined } from "@ant-design/icons";
import Admin from "../../../components/mobiledash/Admin";

const { Content, Sider } = Layout;
const { Option } = Select;

const Category = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [name, setName] = useState("");
  const userToken = useSelector(selectUserToken);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [keyboard, setKeyboard] = useState("");

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

  useEffect(() => {
    loadCategories();
    loadSubcategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((res) => {
      setCategories(res.data);
    });
  };

  const loadSubcategories = () => {
    getSubCategories().then((res) => {
      setSubCategories(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createSubCategory({ name, parent: category }, userToken)
      .then((res) => {
        loadSubcategories();
        setName("");
        toast.success(`${res.data.name} is created`);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm(`Do you want to Delete ${slug}?`)) {
      removeSubCategory(slug, userToken)
        .then((res) => {
          loadSubcategories();
          toast.success(`${slug} Deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };

  const searchChange = (e) => {
    e.preventDefault();
    setKeyboard(e.target.value.toLowerCase());
  };

  const handleSearch = (keyboard) => (item) =>
    item.name.toLowerCase().includes(keyboard);

  return (
    <div className="password">
      <Admin />
      <Layout style={{ minHeight: "100vh" }}>
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

        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div className="register_container3">
              <div className="register_background"></div>
              <div className="register_content3">
                <h1>Add New Sub-Category</h1>
              </div>
              <div className="register_form2">
                <Select
                  name="category"
                  className="subcategory_select"
                  style={{ marginBottom: "1rem" }}
                  onChange={(value) => setCategory(value)}
                  defaultValue="Select Category"
                  required
                  autoFocus
                >
                  {categories.length > 0 &&
                    categories.map((cat) => (
                      <Option value={cat._id} key={cat._id}>
                        {cat.name}
                      </Option>
                    ))}
                </Select>
                <Input
                  placeholder="Add Sub-Category"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />

                <div className="register_btn" onClick={handleSubmit}>
                  <span>ADD </span>
                </div>
              </div>
            </div>
            <div className="categories_line" />
            <div className="category_search">
              <Input
                placeholder="Search Category"
                value={keyboard}
                onChange={searchChange}
                type="search"
              />
            </div>
            <div className="categories">
              {subCategories.length > 0 ? (
                subCategories.filter(handleSearch(keyboard)).map((item, i) => (
                  <div
                    className={i % 2 === 0 ? "category_even" : "category_odd"}
                    key={item._id}
                  >
                    <div className="category_name"> {item.name} </div>
                    <div className="category_action">
                      <div className="category_edit">
                        {" "}
                        <Link to={`/admin/subcategory/${item.slug}`}>
                          <FaEdit />
                        </Link>
                      </div>
                      <div className="category_delete">
                        {" "}
                        <AiOutlineDelete
                          onClick={() => handleRemove(item.slug)}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="spinner_item">
                  <LoadingOutlined className="spinner_loader" />
                </div>
              )}
            </div>
          </Content>
        </Layout>
      </Layout>

      <div className="register_container3_mobile">
        <div className="register_background_mobile"></div>
        <div className="register_content3_mobile">
          <h1>Add New Sub-Category</h1>
        </div>
        <div className="register_form2_mobile">
          <Select
            name="category"
            className="subcategory_select"
            style={{ marginBottom: "1rem" }}
            onChange={(value) => setCategory(value)}
            defaultValue="Select Category"
            required
            autoFocus
          >
            {categories.length > 0 &&
              categories.map((cat) => (
                <Option value={cat._id} key={cat._id}>
                  {cat.name}
                </Option>
              ))}
          </Select>
          <Input
            placeholder="Add Sub-Category"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />

          <div className="register_btn" onClick={handleSubmit}>
            <span>ADD </span>
          </div>
        </div>
      </div>
      <div className="categories_line_mobile" style={{ marginTop: "2rem" }} />
      <div className="category_search_mobile">
        <Input
          placeholder="Search Category"
          value={keyboard}
          onChange={searchChange}
          type="search"
        />
      </div>
      <div className="categories_mobile">
        {subCategories.length > 0 ? (
          subCategories.filter(handleSearch(keyboard)).map((item, i) => (
            <div
              className={i % 2 === 0 ? "category_even" : "category_odd"}
              key={item._id}
            >
              <div className="category_name"> {item.name} </div>
              <div className="category_action">
                <div className="category_edit">
                  {" "}
                  <Link to={`/admin/subcategory/${item.slug}`}>
                    <FaEdit />
                  </Link>
                </div>
                <div className="category_delete">
                  {" "}
                  <AiOutlineDelete onClick={() => handleRemove(item.slug)} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="spinner_item">
            <LoadingOutlined className="spinner_loader" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
