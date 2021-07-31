import React, { useEffect, useState } from "react";
import { getSubCategories } from "../../functions/subcategory";
import { Spin, Space } from "antd";
import { Link } from "react-router-dom";

const HomeSubs = () => {
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    getSubCategories().then((res) => {
      setSubCategory(res.data);
    });
  }, []);

  return (
    <div className="home_categories">
      <div className="home_categories_title">
        <h1>Search By Sub-Category</h1>
      </div>
      <div className="home_categories_container">
        <div className="home_categories_content">
          {subCategory && subCategory.length > 0 ? (
            subCategory.map((cat, i) => (
              <Link to={`/subcategory/product/${cat.slug}`} key={cat._id}>
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

export default HomeSubs;
