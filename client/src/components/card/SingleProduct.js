import React, { useEffect, useState } from "react";
import Loader from "../loading/Loader";
import { Card, Tabs, Tooltip } from "antd";
import { useHistory } from "react-router-dom";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import ReactImageMagnify from "react-image-magnify";
import ListProduct from "./ListProduct";
import { useSelector } from "react-redux";
import {
  selectUserEmail,
  selectUserToken,
} from "../../features/user/userSlice";
import RatingModal from "../modal/RatingModal";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { setCart } from "../../features/cart/cartSlice";
import { setVisible, selectVisible } from "../../features/cart/drawerSlice";
import { createWishlist } from "../../functions/wishlist";
import { toast } from "react-toastify";
const { TabPane } = Tabs;

const SingleProduct = ({ product, changeRating, star }) => {
  const { title, images, description, slug, _id } = product;
  const [index, setIndex] = useState(0);
  const userEmail = useSelector(selectUserEmail);
  const history = useHistory();
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const visible = useSelector(selectVisible);
  const token = useSelector(selectUserToken);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const myRef = React.createRef();

  const handleTab = (i) => {
    setIndex(i);
    const images = myRef.current.children;
    for (let j = 0; j < images.length; ++j) {
      images[j].className = images[j].className.replace("active", "");
    }
    images[i].className = "active";
  };

  const handlePage = () => {
    history.push({
      pathname: "/login",
      state: { from: `/product/${slug}` },
    });
  };

  const [tooltip, setTooltip] = useState("CLICK TO ADD");

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

  const handleWishlist = (e) => {
    e.preventDefault();
    createWishlist(token, product?._id).then((res) => {
      toast.success("Added to Wishlist");
      history.push("/user/wishlist");
    });
  };

  return (
    <>
      {title ? (
        <div className="product_container">
          <div className="product_left">
            <div className="big_img">
              <ReactImageMagnify
                className="big_img_i"
                {...{
                  smallImage: {
                    alt: "Wristwatch by Ted Baker London",
                    height: 480,
                    width: 450,
                    isFluidWidth: false,
                    src: images[index].url,
                  },
                  largeImage: {
                    src: images[index].url,
                    width: 1500,
                    height: 1500,
                  },
                  enlargedImageContainerClassName: "enlarge_container",
                  imageClassName: "img_fit",
                }}
              />
            </div>
            <div className="thumb" ref={myRef}>
              {images.map((img, i) => (
                <img
                  src={img.url}
                  alt=""
                  key={i}
                  onClick={() => handleTab(i)}
                />
              ))}
            </div>
          </div>

          <div className="product_right">
            <Card
              style={{ width: "100%" }}
              actions={[
                <>
                  <HeartOutlined
                    className="product_cart_heart"
                    onClick={handleWishlist}
                  />
                  ADD TO WISHLIST
                </>,
                <>
                  <Tooltip title={tooltip}>
                    <div onClick={handleCart}>
                      <ShoppingCartOutlined className="product_cart" /> <br />
                      ADD TO CART
                    </div>
                  </Tooltip>
                </>,
                <>
                  {userEmail === null ? (
                    <div onClick={handlePage}>
                      <StarOutlined className="product_cart_heart" />
                      <div>Login For Rating</div>
                    </div>
                  ) : (
                    <div onClick={handleModal}>
                      <StarOutlined className="product_cart_heart" />
                      <div>Leave Rating</div>
                    </div>
                  )}
                </>,
              ]}
            >
              <Meta title={title} />
              <ListProduct product={product} />
            </Card>
          </div>
          <div className="tabs">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Description" key="1">
                <div className="description">
                  {description.split("\n").map((des, i) => (
                    <ul key={i}>
                      <li>{des}</li>
                    </ul>
                  ))}
                </div>
              </TabPane>
              <TabPane tab="More" key="2">
                If you have any Query Contact us on +91-9010203010
              </TabPane>
            </Tabs>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <RatingModal
        modalVisible={modalVisible}
        handleModal={handleModal}
        product={product}
        changeRating={changeRating}
        star={star}
      />
    </>
  );
};

export default SingleProduct;
