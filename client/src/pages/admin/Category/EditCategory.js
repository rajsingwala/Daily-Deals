import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserToken } from "../../../features/user/userSlice";
import { useParams, useHistory } from "react-router-dom";
import { getCategory, updateCategory } from "../../../functions/category";
import { toast } from "react-toastify";
import Admin from "../../../components/mobiledash/Admin";

const EditCategory = () => {
  const userToken = useSelector(selectUserToken);
  const { slug } = useParams();
  const [name, setName] = useState("");
  const history = useHistory();

  useEffect(() => {
    getCategory(slug)
      .then((res) => {
        setName(res.data.name);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateCategory(slug, { name }, userToken)
      .then((res) => {
        toast.success(`Updated to ${res.data.name} `);
        setName("");
        history.push("/admin/category");
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
        <div className="register_container_mobile">
          <div className="register_background_mobile"></div>
          <div className="register_content_mobile">
            <h1>Edit Category</h1>
          </div>
          <div className="register_form_mobile">
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

export default EditCategory;
