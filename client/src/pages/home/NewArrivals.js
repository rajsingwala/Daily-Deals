import React, { useState, useEffect } from "react";
import { getProducts, getTotal } from "../../functions/product";
import LoadingCard from "../../components/card/LoadingCard";
import { Pagination } from "antd";
import ProductCard from "../../components/card/ProductCard";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalProduct, setTotalProduct] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  const loadAllProducts = () => {
    setLoading(true);
    getProducts("createdAt", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getTotal().then((res) => {
      setTotalProduct(res.data);
    });
  }, []);

  return (
    <>
      <div className="home_top_title">
        <h1>New Arrivals</h1>
      </div>
      {loading ? (
        <LoadingCard count={3} />
      ) : (
        <div className="home_top">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}
      <div className="pagination">
        <Pagination
          current={page}
          total={(totalProduct / 4) * 10}
          onChange={(value) => setPage(value)}
        />
      </div>
    </>
  );
};

export default NewArrivals;
