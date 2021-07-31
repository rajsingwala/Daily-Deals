import React from "react";
import { List } from "antd";
import { Link } from "react-router-dom";
import { avgRating } from "../../functions/ratings";
import StarRating from "react-star-ratings";
import numeral from "numeral";

const ListProduct = ({ product }) => {
  const { price, shipping, color, brand, category, sold, quantity, subs, _id } =
    product;

  const data = [
    <div className="list_section">
      Price{" "}
      <div className="list_value">₹{price && numeral(price).format("0,0")}</div>
    </div>,
    <div className="list_section">
      Category{" "}
      <div className="list_value">
        <Link to={`/category/product/${category.slug}`}>
          {category && category.name}
        </Link>
      </div>
    </div>,
    <div className="list_section">
      Sub-Category{" "}
      <div className="list_value">
        {subs &&
          subs.map((sub) => (
            <div
              key={sub._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Link to={`/subcategory/product/${sub.slug}`}>{sub.name}</Link>
            </div>
          ))}{" "}
      </div>
    </div>,
    <div className="list_section">
      Shipping <div className="list_value">{shipping && shipping}</div>
    </div>,
    <div className="list_section">
      Color{" "}
      <div className="list_value">
        {" "}
        <div
          style={{
            backgroundColor: color && color.toLowerCase(),
            height: "20px",
            position: "absolute",
            marginLeft: "-2rem",
            width: "20px",
            borderRadius: "50%",
          }}
        ></div>
        {color}
      </div>
    </div>,
    <div className="list_section">
      Brand <div className="list_value">{brand && brand}</div>
    </div>,
    <div className="list_section">
      Available{" "}
      <div className="list_value">{quantity == sold ? "NO" : "YES"}</div>
    </div>,
  ];

  return (
    <>
      <div className="ratings">
        {product && product.ratings && product.ratings.length > 0 ? (
          <>
            <StarRating
              rating={avgRating(product)}
              starRatedColor="#ff9900"
              starDimension="30px"
              editing={false}
            />
            <span style={{ paddingBottom: "0.3rem" }}>
              ({product.ratings.length})
            </span>
          </>
        ) : (
          "No Ratings Yet"
        )}
      </div>
      <List
        loading={!price}
        size="large"
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
        bordered
      />
    </>
  );
};

export default ListProduct;
