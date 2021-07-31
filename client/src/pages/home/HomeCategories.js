import React, { useEffect, useState } from "react";
import { getCategories } from "../../functions/category";
import { Link } from "react-router-dom";
import { getSubCategories } from "../../functions/subcategory";
import { Spin, Space } from "antd";

const HomeCategories = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategories().then((res) => {
      setCategory(res.data);
    });
  }, []);

  return (
    <div className="home_categories">
      <div className="home_categories_title">
        <h1>Search By Category</h1>
      </div>
      <div className="home_categories_container">
        <div className="home_categories_content">
          {category && category.length > 0 ? (
            category.map((cat) => (
              <Link to={`/category/product/${cat.slug}`} key={cat._id}>
                <div className="home_categories_content_btn">{cat.name}</div>
              </Link>
            ))
          ) : (
            <Space size="middle" style={{ textAlign: "center" }}>
              <Spin />
            </Space>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeCategories;
