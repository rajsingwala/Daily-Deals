import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserEmail, selectUserToken } from "../features/user/userSlice";
import { selectCart, setCart } from "../features/cart/cartSlice";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { proceedCheckout } from "../functions/cart";
import numeral from "numeral";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "antd";
import { setCod } from "../features/cart/codSlice";

const Cart = () => {
  const [product, setProduct] = useState([]);
  const productCart = useSelector(selectCart);
  const userEmail = useSelector(selectUserEmail);
  const token = useSelector(selectUserToken);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setProduct(productCart);
  }, [productCart]);

  var myDate = new Date(
    new Date().getTime() + 7 * 24 * 60 * 60 * 1000
  ).toString();

  const handleCheckout = () => {
    history.push({
      pathname: "/login",
      state: { from: "/cart" },
    });
  };

  const getTotal = () => {
    return product.reduce((p, n) => {
      return p + n.price * n.count;
    }, 0);
  };

  const handleCount = (pro, e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > pro.quantity) {
      toast.error(`Max available quantity: ${pro.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === pro._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));

      dispatch(
        setCart({
          cart: cart,
        })
      );
    }
  };

  const handleRemove = (pro) => {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === pro) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(
        setCart({
          cart: cart,
        })
      );
    }
  };

  const handleProceedCheckout = () => {
    setLoading(true);
    proceedCheckout(productCart, token)
      .then((res) => {
        console.log(res);
        if (res.data.ok) history.push("/checkout");
        setLoading(false);
        dispatch(setCod({ cod: false }));
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleCash = () => {
    setLoading2(true);
    proceedCheckout(productCart, token)
      .then((res) => {
        console.log(res);
        if (res.data.ok) history.push("/checkout");
        setLoading2(false);
        dispatch(setCod({ cod: true }));
      })
      .catch((err) => {
        setLoading2(false);
        console.log(err);
      });
  };

  return (
    <div className="product_cart_page">
      <div className="product_cart_container">
        {/*********************left********************/}
        <div className="product_cart_left">
          <div className="product_cart_title">
            <h2 style={{ paddingTop: "0.1rem" }}>
              My Cart{" "}
              <span>
                {product && product.length > 0 ? `(${product.length})` : "(0)"}
              </span>
            </h2>
          </div>
          <div className="cart_hr" />
          {/****************left-mid***************/}
          {product && product.length > 0 ? (
            product.map((p) => (
              <>
                <div className="product_cart_mid" key={p._id}>
                  <div className="product_cart_mid_left">
                    <div className="product_cart_mid_left_img">
                      <img src={p.images[0].url} alt={p.title} />
                    </div>
                    <div className="product_cart_mid_left_counter">
                      <input
                        type="number"
                        value={p.count}
                        onChange={(e) => handleCount(p, e)}
                      />
                    </div>
                  </div>
                  <div className="product_cart_mid_mid">
                    <div className="product_cart_mid_mid_title">
                      <h3>{p.title}</h3>
                    </div>
                    <div className="product_cart_mid_mid_brand">
                      <h4 style={{ color: "gray" }}>{p.brand}</h4>
                    </div>
                    <div className="product_cart_mid_mid_color">
                      <div
                        style={{ backgroundColor: p.color }}
                        className="product_cart_mid_mid_color_circle"
                      />
                      <h4 style={{ color: p.color }}>{p.color}</h4>
                    </div>
                    <div className="product_cart_mid_mid_price">
                      <h4 style={{ fontWeight: "bold" }}>
                        ₹{numeral(p.price).format("0,0")}
                      </h4>
                    </div>
                    <div className="product_cart_mid_mid_remove">
                      <button
                        className="product_cart_mid_mid_remove_btn"
                        onClick={() => handleRemove(p._id)}
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>

                  {/*******mid-right*****/}
                  <div className="product_cart_mid_right">
                    <div className="product_cart_mid_right_arrive">
                      <h4>Delivery by {myDate.slice(0, 10)} </h4>
                    </div>
                    <div className="product_cart_mid_right_replacement">
                      <h5 style={{ color: "gray" }}>
                        {" "}
                        7 Days Replacement Policy
                      </h5>
                    </div>
                    <div className="product_cart_mid_shipping">
                      <h3>Shipping </h3>
                      {p.shipping === "Yes" ? (
                        <AiOutlineCheckCircle className="product_cart_mid_shipping_check" />
                      ) : (
                        <AiOutlineCloseCircle className="product_cart_mid_shipping_uncheck" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="cart_hr" />{" "}
              </>
            ))
          ) : (
            <div className="cart_no_product">
              <h2>No Products In Cart</h2>
              <Link
                to="/shop"
                style={{ marginTop: "0.4rem", marginLeft: "0.5rem" }}
              >
                Go For Shopping
              </Link>
            </div>
          )}{" "}
        </div>
        {/**********************right******************/}
        {product && product.length > 0 ? (
          <div className="product_cart_right">
            <div className="product_cart_title">
              <h2 style={{ paddingTop: "0.1rem" }}>ORDER SUMMARY</h2>
            </div>
            <div className="cart_hr_right" />
            <div className="product_cart_right_mid">
              {product && product.length > 0
                ? product.map((p) => (
                    <>
                      <div
                        className="product_cart_right_mid_content"
                        key={p._id}
                      >
                        <h4>
                          {p.title} ({p.color}) X {p.count} = ₹
                          {numeral(p.price * p.count).format("0,0")}{" "}
                        </h4>
                      </div>
                    </>
                  ))
                : null}
            </div>
            <div className="cart_hr_right" />
            <div className="product_cart_right_bottom">
              <h3 style={{ marginTop: "0.45rem" }}>
                TOTAL : ₹{numeral(getTotal()).format("0,0")}
              </h3>
            </div>
            <div className="cart_hr_right" />

            {/*********************left-order=bottom********************/}

            <div className="product_cart_bottom">
              {userEmail === null ? (
                <button
                  className="product_cart_bottom_order"
                  onClick={handleCheckout}
                >
                  Login For Checkout
                </button>
              ) : (
                <>
                  {" "}
                  <Button
                    className={
                      loading2
                        ? "product_cart_bottom_cash_loading"
                        : "product_cart_bottom_cash"
                    }
                    onClick={handleCash}
                    loading={loading2}
                  >
                    Pay Cash On Delivery
                  </Button>
                  <Button
                    className={
                      loading
                        ? "product_cart_bottom_order_loading"
                        : "product_cart_bottom_order"
                    }
                    onClick={handleProceedCheckout}
                    loading={loading}
                  >
                    Proceed To Checkout
                  </Button>
                </>
              )}
            </div>
          </div>
        ) : null}{" "}
      </div>
    </div>
  );
};

export default Cart;
