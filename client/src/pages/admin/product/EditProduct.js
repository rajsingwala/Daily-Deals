import React, { useState, useEffect } from "react";
import FileUpload from "../../../components/uploadFile/FileUpload";
import { Form, Button, Select, Input } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserToken } from "../../../features/user/userSlice";
import { getProduct, updateProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { toast } from "react-toastify";
import Admin from "../../../components/mobiledash/Admin";
const { Option } = Select;

const inititalState = {
  title: "",
  description: "",
  price: "",
  category: "",
  quantity: "",
  color: "",
  images: [],
  shipping: "",
  brand: "",
};

const EditProduct = () => {
  const history = useHistory();
  const userToken = useSelector(selectUserToken);
  const [values, setValues] = useState(inititalState);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  const {
    title,
    description,
    price,
    quantity,
    color,
    category,
    images,
    shipping,
    brand,
  } = values;

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((res) => {
      setCategories(res.data);
    });
  };

  const loadProduct = () => {
    getProduct(slug).then((res) => {
      setValues({ ...values, ...res.data });
      getCategorySubs(res.data.category._id).then((res) => {
        setSubOptions(res.data);
      });
      let arr = [];
      res.data.subs.map((s) => {
        arr.push(s._id);
      });
      setArrayOfSubs((prev) => arr);
    });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, userToken)
      .then(() => {
        setLoading(false);
        toast.success(`${slug} Updated`);
        history.push("/admin/all-products");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Product Update Failed");
      });
  };

  const handleCategoryChange = (value) => {
    setSubs([]);
    setArrayOfSubs([]);
    setSelectedCategory(value);
    getCategorySubs(value).then((res) => {
      console.log(res.data);
      setSubOptions(res.data);
    });
    if (category._id === value) {
      loadProduct();
    }
  };

  return (
    <>
      <div className="register_mobile_side">
        <Admin />
      </div>
      <div className="edit_product_parent">
        <div className="edit_product">
          <div className="product_background" />
          <div className="product_content">
            <h1>Edit Product</h1>
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
                  onChange={(value) =>
                    setValues({ ...values, shipping: value })
                  }
                  value={shipping === "Yes" ? "Yes" : "No"}
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
                  value={color}
                  name="color"
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
                  <Option value="Golden">Gold</Option>
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
                  value={selectedCategory ? selectedCategory : category._id}
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
                    placeholder="Select Sub-Category"
                    required
                    value={arrayOfSubs}
                    onChange={(value) => setArrayOfSubs(value)}
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
                Edit Product
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
