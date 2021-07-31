import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserToken } from "../../../features/user/userSlice";
import AdminSideNav from "../AdminSideNav";
import Admin from "../../../components/mobiledash/Admin";
import { Input, Form } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  deleteCoupon,
  getCoupon,
  createCoupon,
} from "../../../functions/coupon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const { Content } = Layout;

const initialState = {
  name: "",
  expiry: new Date(),
  coupon: "",
};

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [keyboard, setKeyboard] = useState("");
  const [values, setValues] = useState(initialState);

  const { name, expiry, discount } = values;

  const history = useHistory();
  const token = useSelector(selectUserToken);

  useEffect(() => {
    loadCoupon();
  }, []);

  const loadCoupon = () => {
    getCoupon().then((res) => setCoupons(res.data));
  };

  const searchChange = (e) => {
    e.preventDefault();
    setKeyboard(e.target.value.toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createCoupon(values, token)
      .then((res) => {
        console.log(res.data);
        setValues({ ...values, name: "", expiry: new Date(), discount: "" });
        loadCoupon();
        toast.success(`${res.data.name} Created`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm(`Do you want to delete ${slug}`)) {
      deleteCoupon(slug, token).then((res) => {
        console.log(res.data);
        loadCoupon();
        toast.success(`${res.data.name} Deleted`);
      });
    }
  };

  const handleSearch = (keyboard) => (c) =>
    c.name.toLowerCase().includes(keyboard);

  return (
    <div className="password">
      <Admin />
      <Layout style={{ minHeight: "100vh" }}>
        <AdminSideNav />
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div className="coupon_container">
              <div className="register_background"></div>
              <div className="register_content3">
                <h1>Add New Coupon</h1>
              </div>
              <div className="register_form2">
                <Form>
                  <Form.Item>
                    <Input
                      type="text"
                      placeholder="enter coupon name"
                      value={name}
                      onChange={(e) =>
                        setValues({ ...values, name: e.target.value })
                      }
                      autoFocus
                      required
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      type="number"
                      placeholder="discount %"
                      value={discount}
                      onChange={(e) =>
                        setValues({ ...values, discount: e.target.value })
                      }
                      required
                      max={80}
                    />
                  </Form.Item>
                  <Form.Item>
                    <DatePicker
                      selected={expiry}
                      value={expiry}
                      onChange={(date) =>
                        setValues({ ...values, expiry: date })
                      }
                      required
                      popperPlacement="top-start"
                    />
                  </Form.Item>
                </Form>
                <div className="register_btn" onClick={handleSubmit}>
                  <span>ADD </span>
                </div>
              </div>
            </div>
            <div className="categories_line" />
            <div className="coupon_length_div">
              <div className="coupon_length">
                {coupons.length > 0
                  ? `${coupons.length} ${
                      coupons.length > 1 ? "Coupons " : "Coupon"
                    }`
                  : null}
              </div>
            </div>
            <div className="category_search">
              <Input
                placeholder="Search Coupon"
                value={keyboard}
                onChange={searchChange}
                type="search"
              />
            </div>

            <div className="all_coupons">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Expiry Date</th>
                    <th>Discount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.length > 0
                    ? coupons.filter(handleSearch(keyboard)).map((c) => (
                        <tr key={c._id}>
                          <td>{c.name}</td>
                          <td>{new Date(c.expiry).toLocaleDateString()}</td>
                          <td>{c.discount}%</td>
                          <td>
                            {" "}
                            <div className="coupon_action">
                              <div className="category_edit">
                                {" "}
                                <Link to={`/admin/coupon/${c.slug}`}>
                                  <FaEdit />
                                </Link>
                              </div>
                              <div className="category_delete">
                                {" "}
                                <AiOutlineDelete
                                  onClick={() => handleRemove(c.slug)}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>

            {/* <div className="categories">
              {coupons.length > 0 ? (
                coupons.filter(handleSearch(keyboard)).map((item, i) => (
                  <div
                    className={i % 2 === 0 ? "category_even" : "category_odd"}
                    key={item._id}
                  >
                    <div className="category_name"> {item.name} </div>
                    <div className="category_name">
                      {" "}
                      {new Date(item.expiry).toLocaleDateString()}
                    </div>
                    <div className="category_action">
                      <div className="category_edit">
                        {" "}
                        <Link to={`/admin/coupon/${item.slug}`}>
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
            </div> */}
          </Content>
        </Layout>
      </Layout>

      {/*******************************mobile********************************/}
      <div className="coupon_container_mobile">
        <div className="register_background_mobile"></div>
        <div className="register_content3_mobile">
          <h1>Add New Coupon</h1>
        </div>
        <div className="register_form2_mobile">
          <Form>
            <Form.Item>
              <Input
                type="text"
                placeholder="enter coupon name"
                value={name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                autoFocus
                required
              />
            </Form.Item>
            <Form.Item>
              <Input
                type="number"
                placeholder="discount %"
                value={discount}
                onChange={(e) =>
                  setValues({ ...values, discount: e.target.value })
                }
                required
                max={80}
              />
            </Form.Item>
            <Form.Item>
              <DatePicker
                selected={expiry}
                value={expiry}
                onChange={(date) => setValues({ ...values, expiry: date })}
                required
                popperPlacement="top-start"
              />
            </Form.Item>
          </Form>
          <div className="register_btn" onClick={handleSubmit}>
            <span>ADD </span>
          </div>
        </div>
      </div>
      <div className="categories_line_mobile" style={{ marginTop: "2rem" }} />
      <div className="category_search_mobile">
        <Input
          placeholder="Search Coupon"
          value={keyboard}
          onChange={searchChange}
          type="search"
        />
      </div>

      <div className="all_coupons_mobile">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Expiry Date</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length > 0
              ? coupons.filter(handleSearch(keyboard)).map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{new Date(c.expiry).toLocaleDateString()}</td>
                    <td>{c.discount}%</td>
                    <td>
                      {" "}
                      <div className="coupon_action">
                        <div className="category_edit">
                          {" "}
                          <Link to={`/admin/coupon/${c.slug}`}>
                            <FaEdit />
                          </Link>
                        </div>
                        <div className="category_delete">
                          {" "}
                          <AiOutlineDelete
                            onClick={() => handleRemove(c.slug)}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>

      {/* <div className="categories_mobile">
        {coupons.length > 0 ? (
          coupons.filter(handleSearch(keyboard)).map((item, i) => (
            <div
              className={i % 2 === 0 ? "category_even" : "category_odd"}
              key={item._id}
            >
              <div className="category_name"> {item.name} </div>
              <div className="category_name">
                {" "}
                {new Date(item.expiry).toLocaleDateString()}
              </div>
              <div className="category_action">
                <div className="category_edit">
                  {" "}
                  <Link to={`/admin/coupon/${item.slug}`}>
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
      </div> */}
    </div>
  );
};

export default Coupon;
