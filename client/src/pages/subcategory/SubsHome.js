import React, { useEffect, useState } from "react";
import { getSubCategory, getProductBySub } from "../../functions/subcategory";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/card/ProductCard";
import { Space, Spin, Button } from "antd";
import LoadingCard from "../../components/card/LoadingCard";

const CategoryHome = () => {
  const [subCategory, setSubCategory] = useState({});
  const [product, setProduct] = useState([]);
  const [load, setLoad] = useState(4);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    getSubCategory(slug).then((res) => {
      setSubCategory(res.data);
      getProductBySub(slug).then((result) => {
        setProduct(result.data);
        setLoading(false);
      });
    });
  }, []);

  const handleLoad = () => {
    setLoad((prev) => prev + 4);
  };

  return (
    <div className="category_home">
      <div className="category_home_title">
        <h1>
          {product.length > 0 ? (
            product.length
          ) : (
            <Space size="middle">
              <Spin />
            </Space>
          )}{" "}
          Products Found in{" "}
          {subCategory.name ? (
            `"${subCategory.name}"`
          ) : (
            <Space size="middle">
              <Spin />
            </Space>
          )}
        </h1>
      </div>
      <div className="category_home_container">
        {loading ? <LoadingCard count={4} /> : null}
        <div className="category_home_content">
          {product && product.length > 0
            ? product
                .slice(0, load)
                .map((p) => <ProductCard product={p} key={p._id} />)
            : null}
        </div>
      </div>
      {load < product.length ? (
        <div className="load_more_div">
          <div className="load_more">
            <Button onClick={handleLoad}>Load More</Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CategoryHome;
