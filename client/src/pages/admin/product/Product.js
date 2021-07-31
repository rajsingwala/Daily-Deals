import React, { useEffect, useState } from "react";
import { Layout, Form, Button, Input, Select } from "antd";
import { useHistory } from "react-router-dom";
import AdminSideNav from "../AdminSideNav";
import { useSelector } from "react-redux";
import { selectUserToken } from "../../../features/user/userSlice";
import { createProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { toast } from "react-toastify";
import FileUpload from "../../../components/uploadFile/FileUpload";
import Admin from "../../../components/mobiledash/Admin";

const { Option } = Select;

const { Content } = Layout;

const inititalState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  quantity: "",
  color: "",
  images: [],
  shipping: "",
  brand: "",
};

const Product = () => {
  const history = useHistory();
  const userToken = useSelector(selectUserToken);
  const [values, setValues] = useState(inititalState);
  const [subOptions, setSubOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    quantity,
    color,
    images,
    shipping,
    brand,
  } = values;

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((res) => {
      setValues({ ...values, categories: res.data });
    });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    createProduct(values, userToken)
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast.success(`${res.data.title} Created`);
        setValues({ ...values, images: [] });
        history.push("/admin/all-products");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value) => {
    setValues({ ...values, subs: [], category: value });
    getCategorySubs(value).then((res) => {
      console.log(res.data);
      setSubOptions(res.data);
    });
  };

  return (
    <div className="password">
      <Admin />
      <Layout style={{ minHeight: "100vh" }}>
        <AdminSideNav />
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div className="product">
              <div className="product_background" />
              <div className="product_content">
                <h1>Add Product</h1>
              </div>
              <div className="product_line" />
              <div className="product_form">
                <Form layout="horizontal">
                  <Form.Item>
                    <Input
                      placeholder="Enter Title"
                      autoFocus
                      name="title"
                      value={title}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input.TextArea
                      placeholder="Enter Description"
                      name="description"
                      value={description}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      placeholder="Enter Price"
                      type="number"
                      name="price"
                      value={price}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Select
                      className="subcategory_select"
                      defaultValue="Select Shipping"
                      onChange={(value) =>
                        setValues({ ...values, shipping: value })
                      }
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item>
                    <Input
                      placeholder="Enter Quantity"
                      type="number"
                      name="quantity"
                      value={quantity}
                      onChange={handleChange}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Select
                      className="subcategory_select"
                      onChange={(value) =>
                        setValues({ ...values, color: value })
                      }
                      defaultValue="Select Color"
                    >
                      <Option value="Red">Red</Option>
                      <Option value="Blue">Blue</Option>
                      <Option value="Yellow">Yellow</Option>
                      <Option value="Green">Green</Option>
                      <Option value="Orange">Orange</Option>
                      <Option value="Pink">Pink</Option>
                      <Option value="Brown">Brown</Option>
                      <Option value="Black">Black</Option>
                      <Option value="White">White</Option>
                      <Option value="Silver">Silver</Option>
                      <Option value="Gold">Golden</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Input
                      placeholder="Enter Brand"
                      name="brand"
                      value={brand}
                      onChange={handleChange}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Select
                      name="category"
                      onChange={(value) => handleCategoryChange(value)}
                      className="subcategory_select"
                      defaultValue="Select Category"
                      required
                    >
                      {categories.length > 0 &&
                        categories.map((cat) => (
                          <Option value={cat._id} key={cat._id}>
                            {cat.name}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>

                  <Form.Item>
                    {subOptions?.length > 0 ? (
                      <Select
                        className="subcategory_select"
                        mode="multiple"
                        onChange={(value) =>
                          setValues({ ...values, subs: value })
                        }
                        placeholder="Select Sub-Category"
                        required
                        value={subs}
                      >
                        {subOptions.map((opt) => (
                          <Option key={opt._id} value={opt._id}>
                            {opt.name}
                          </Option>
                        ))}
                      </Select>
                    ) : (
                      <div className="no_subs">No Sub-Category Yet</div>
                    )}
                  </Form.Item>

                  <Form.Item>
                    <FileUpload values={values} setValues={setValues} />
                  </Form.Item>
                </Form>

                <div className="product_btn">
                  <Button onClick={handleSubmit} loading={loading}>
                    ADD PRODUCT
                  </Button>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>

      <div className="product_mobile">
        <div className="product_background" />
        <div className="product_content">
          <h1>Add Product</h1>
        </div>
        <div className="product_line" />
        <div className="product_form">
          <Form layout="horizontal">
            <Form.Item>
              <Input
                placeholder="Enter Title"
                autoFocus
                name="title"
                value={title}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Input.TextArea
                placeholder="Enter Description"
                name="description"
                value={description}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Enter Price"
                type="number"
                name="price"
                value={price}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Select
                className="subcategory_select"
                defaultValue="Select Shipping"
                onChange={(value) => setValues({ ...values, shipping: value })}
              >
                <Option value="Yes">Yes</Option>
                <Option value="No">No</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Input
                placeholder="Enter Quantity"
                type="number"
                name="quantity"
                value={quantity}
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item>
              <Select
                className="subcategory_select"
                onChange={(value) => setValues({ ...values, color: value })}
                defaultValue="Select Color"
              >
                <Option value="Red">Red</Option>
                <Option value="Blue">Blue</Option>
                <Option value="Yellow">Yellow</Option>
                <Option value="Green">Green</Option>
                <Option value="Orange">Orange</Option>
                <Option value="Pink">Pink</Option>
                <Option value="Brown">Brown</Option>
                <Option value="Black">Black</Option>
                <Option value="White">White</Option>
                <Option value="Silver">Silver</Option>
                <Option value="Golden">Golden</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Enter Brand"
                name="brand"
                value={brand}
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item>
              <Select
                name="category"
                onChange={(value) => handleCategoryChange(value)}
                className="subcategory_select"
                defaultValue="Select Category"
                required
              >
                {categories.length > 0 &&
                  categories.map((cat) => (
                    <Option value={cat._id} key={cat._id}>
                      {cat.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item>
              {subOptions?.length > 0 ? (
                <Select
                  className="subcategory_select"
                  mode="multiple"
                  onChange={(value) => setValues({ ...values, subs: value })}
                  placeholder="Select Sub-Category"
                  required
                  value={subs}
                >
                  {subOptions.map((opt) => (
                    <Option key={opt._id} value={opt._id}>
                      {opt.name}
                    </Option>
                  ))}
                </Select>
              ) : (
                <div className="no_subs">No Sub-Category Yet</div>
              )}
            </Form.Item>

            <Form.Item>
              <FileUpload values={values} setValues={setValues} />
            </Form.Item>
          </Form>

          <div className="product_btn">
            <Button onClick={handleSubmit} loading={loading}>
              ADD PRODUCT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
