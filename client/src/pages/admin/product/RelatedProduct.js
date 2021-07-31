import { Button } from "antd";
import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/card/ProductCard";

const RelatedProduct = ({ relatedProduct }) => {
  const [more, setMore] = useState(4);

  const loadMore = () => {
    setMore((prev) => prev + 4);
  };

  return (
    <div className="related_product">
      <div className="related_line" />
      <div className="related_product_title">
        {relatedProduct.length > 0 ? (
          <h1>Related Products</h1>
        ) : (
          <h1>No Products</h1>
        )}
      </div>
      <div className="home_top" style={{ marginTop: "1rem" }}>
        {relatedProduct && relatedProduct.length > 0
          ? relatedProduct
              .slice(0, more)
              .map((product) => (
                <ProductCard product={product} key={product._id} />
              ))
          : null}
      </div>
      {more < relatedProduct.length ? (
        <div className="load_more_div">
          <div className="load_more">
            <Button onClick={loadMore}>Load More</Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RelatedProduct;
