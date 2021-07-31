import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Tooltip } from "antd";
import { avgRating } from "../../functions/ratings";
import StarRating from "react-star-ratings";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../features/cart/cartSlice";
import numeral from "numeral";
import { setVisible, selectVisible } from "../../features/cart/drawerSlice";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { title, description, images, slug, price, quantity } = product;

  const [tooltip, setTooltip] = useState("CLICK TO ADD");
  const visible = useSelector(selectVisible);

  const dispatch = useDispatch();

  const handleCart = () => {
    let cart = [];

    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("cart")) {
        cart = JSON.parse(window.localStorage.getItem("cart"));
      }

      cart.push({ ...product, count: 1 });

      let unique = _.uniqWith(cart, _.isEqual);

      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip("ADDED");
      dispatch(
        setCart({
          cart: unique,
        })
      );

      dispatch(setVisible({ visible: true }));
    }
  };

  return (
    <Card
      className="admin_card"
      hoverable
      cover={
        <Link to={`/product/${slug}`} className="edit_link">
          <img
            alt={title && title}
            src={images && images.length && images[0].url}
            className="admin_card_image"
          />
        </Link>
      }
      actions={[
        <>
          {product && product.ratings && product.ratings.length > 0 ? (
            <>
              <StarRating
                rating={avgRating(product)}
                starRatedColor="#ff9900"
                starDimension="20px"
                starSpacing="2px"
                editing={false}
              />
              <span style={{ paddingBottom: "0.3rem" }}>
                ({product.ratings.length})
              </span>
            </>
          ) : (
            "No Ratings Yet"
          )}
        </>,

        <div>
          {quantity !== 0 ? (
            <Tooltip title={tooltip}>
              <div onClick={handleCart} className="product_card_add">
                <ShoppingCartOutlined className="product_cart" /> ADD TO CART
              </div>
            </Tooltip>
          ) : (
            <div className="product_card_disable">Out Of Stock</div>
          )}
        </div>,
      ]}
    >
      <Link to={`/product/${slug}`} className="edit_link">
        <Meta
          title={
            <span>
              {title && title} <br />{" "}
              <h4>{`₹${price && numeral(price).format("0,0")}`}</h4>
            </span>
          }
          description={description && `${description.slice(0, 100)}...`}
        />
      </Link>
    </Card>
  );
};

export default ProductCard;
