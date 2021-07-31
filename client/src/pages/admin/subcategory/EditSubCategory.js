import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserToken } from "../../../features/user/userSlice";
import { useParams, useHistory } from "react-router-dom";
import {
  getSubCategory,
  updateSubCategory,
} from "../../../functions/subcategory";
import { Select } from "antd";
import { toast } from "react-toastify";
import { getCategories } from "../../../functions/category";
import Admin from "../../../components/mobiledash/Admin";
const { Option } = Select;

const EditSubCategory = () => {
  const userToken = useSelector(selectUserToken);
  const { slug } = useParams();
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getSubCategory(slug)
      .then((res) => {
        setName(res.data.name);
        setParent(res.data.parent);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateSubCategory(slug, { name, parent }, userToken)
      .then((res) => {
        toast.success(`Updated to ${res.data.name} `);
        setName("");
        setParent("");
        history.push("/admin/subcategory");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          toast.error(err.response.data);
        }
      });
  };

  return (
    <>
      <div className="register">
        <div className="register_container">
          <div className="register_background"></div>
          <div className="register_content">
            <h1>Edit Category</h1>
          </div>
          <div className="register_form">
            <Select
              name="category"
              onChange={(value) => setParent(value)}
              value={parent}
              required
              autoFocus
              style={{ marginBottom: "1rem" }}
              className="subcategory_select"
            >
              {categories.length > 0 &&
                categories.map((cat) => (
                  <Option
                    value={cat._id}
                    key={cat._id}
                    className="subcategory_option"
                    selected={cat._id === parent}
                  >
                    {cat.name}
                  </Option>
                ))}
            </Select>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoFocus
            />

            <div className="register_btn" onClick={handleSubmit}>
              <span>Edit </span>
            </div>
          </div>
        </div>
      </div>

      <div className="register_mobile_side">
        <Admin />
      </div>

      <div className="register_mobile">
        <div className="register_container_mobile" style={{ height: "22rem" }}>
          <div className="register_background_mobile"></div>
          <div className="register_content_mobile">
            <h1>Edit Category</h1>
          </div>
          <div className="register_form_mobile">
            <Select
              name="category"
              onChange={(value) => setParent(value)}
              value={parent}
              required
              autoFocus
              style={{ marginBottom: "1rem" }}
              className="subcategory_select"
            >
              {categories.length > 0 &&
                categories.map((cat) => (
                  <Option
                    value={cat._id}
                    key={cat._id}
                    className="subcategory_option"
                    selected={cat._id === parent}
                  >
                    {cat.name}
                  </Option>
                ))}
            </Select>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoFocus
            />

            <div className="register_btn" onClick={handleSubmit}>
              <span>Edit </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSubCategory;
