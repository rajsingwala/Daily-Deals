import React, { useState, useEffect } from "react";
import { getProducts, getTotal } from "../../functions/product";
import LoadingCard from "../../components/card/LoadingCard";
import ProductCard from "../../components/card/ProductCard";
import { Pagination } from "antd";

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalProduct, setTotalProduct] = useState(0);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getTotal().then((res) => {
      setTotalProduct(res.data);
    });
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProducts("sold", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="home_top_title" style={{ marginTop: "1rem" }}>
        <h1>Best Seller</h1>
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
          onChange={(value) => setPage(value)}
          total={(totalProduct / 4) * 10}
        />
      </div>
    </>
  );
};

export default BestSeller;
