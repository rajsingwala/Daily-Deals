import React, { useState, useEffect } from "react";
import { getProduct, productStar } from "../../../functions/product";
import { useParams } from "react-router-dom";
import SingleProduct from "../../../components/card/SingleProduct";
import RelatedProduct from "../product/RelatedProduct";
import { useSelector } from "react-redux";
import {
  selectUserId,
  selectUserToken,
} from "../../../features/user/userSlice";
import { relatedProduct } from "../../../functions/product";
import Loader from "../../../components/loading/Loader";

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [star, setStar] = useState(0);
  const { slug } = useParams();
  const userToken = useSelector(selectUserToken);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    loadProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && userId) {
      let existingRating = product.ratings.find(
        (ele) => ele.postedBy.toString() === userId
      );
      existingRating && setStar(existingRating.star);
    }
  });

  const changeRating = (newRating, name) => {
    setStar(newRating);
    console.table(newRating, name);
    productStar(name, newRating, userToken).then((res) => {
      console.log(res.data);
      loadProduct();
    });
  };

  const loadProduct = () => {
    getProduct(slug).then((res) => {
      console.log(res);
      setProduct(res.data);
      relatedProduct(res.data._id, "createdAt", "desc").then((res) => {
        setRelatedProducts(res.data);
      });
    });
  };

  return (
    <>
      {product ? (
        <div className="product_page">
          <SingleProduct
            product={product}
            changeRating={changeRating}
            star={star}
          />
          <RelatedProduct relatedProduct={relatedProducts} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProductPage;
