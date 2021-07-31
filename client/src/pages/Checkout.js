import React, { useEffect, useState } from "react";
import { getCart, removeCart, userAddress, userData } from "../functions/cart";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "antd";
import { selectUserToken } from "../features/user/userSlice";
import { setCart } from "../features/cart/cartSlice";
import { selectCod } from "../features/cart/codSlice";
import { setCouponRedux } from "../features/cart/couponSlice";
import { toast } from "react-toastify";
import numeral from "numeral";
import { applyCoupon } from "../functions/coupon";
import { useHistory } from "react-router-dom";
import { cashOrder } from "../functions/order";

const Checkout = () => {
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const [loadingEmpty, setLoadingEmpty] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [addressSaved, setAddressSaved] = useState(false);
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState("");
  const [discountError, SetDiscountError] = useState("");
  const [discountSuccess, SetDiscountSuccess] = useState("");
  const [origionalPrice, setOrigionalPrice] = useState("");

  const dispatch = useDispatch();
  const token = useSelector(selectUserToken);
  const cod = useSelector(selectCod);
  const history = useHistory();

  useEffect(() => {
    getCart(token).then((res) => {
      setProduct(res?.data?.products);
      setTotal(res?.data?.totalPrice);
      setPriceAfterDiscount(res?.data);
      setOrigionalPrice(res?.data);
    });
    userData(token).then((res) => {
      console.log(res.data);
      if (res.data.address !== "") {
        setAddress(res.data.address);
        setAddressSaved(true);
      }
    });
  }, []);

  useEffect(() => {
    if (priceAfterDiscount?.totalDiscount !== 0) {
      dispatch(setCouponRedux({ coupon: true }));
    }
  }, []);

  const handleremoveCart = () => {
    setLoadingEmpty(true);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    dispatch(setCart({ cart: [] }));
    removeCart(token).then((res) => {
      setProduct([]);
      setTotal(0);
      SetDiscountSuccess("");
      SetDiscountError("");
      setCoupon("");
      setOrigionalPrice("");
      setPriceAfterDiscount("");
      dispatch(setCouponRedux({ coupon: false }));
      toast.info("Cart is Empty , Continue Shopping");
    });
    setLoadingEmpty(false);
  };

  const handleAddress = () => {
    if (address === "") {
      toast.error("Address is Required");
      return;
    }

    setLoadingSave(true);
    userAddress({ address }, token).then((res) => {
      if (res.data.ok) setAddressSaved(true);
      setLoadingSave(false);
      toast.success("Address Updated");
    });
  };

  const handleCoupon = () => {
    setLoadingCoupon(true);
    applyCoupon(coupon, token).then((res) => {
      if (!res.data.err) {
        setPriceAfterDiscount(res.data);
        SetDiscountSuccess("Coupon Applied");
        dispatch(setCouponRedux({ coupon: true }));
      }
      if (res.data.err) {
        SetDiscountError(res.data.err);
      }
      setLoadingCoupon(false);
      console.log(res);
    });
  };

  const createCashOrder = (e) => {
    e.preventDefault();
    cashOrder(token).then((res) => {
      if (res.data.ok) {
        if (typeof window !== undefined) localStorage.removeItem("cart");
        dispatch(setCart({ cart: [] }));
        dispatch(setCouponRedux({ coupon: false }));
        removeCart(token);
        toast.success("Ordered Successfully");

        setTimeout(() => {
          history.push("/user/history");
        }, 5000);
      }
    });
  };

  return (
    <div className="product_cart_page">
      <div className="product_cart_container">
        {/*********************left********************/}
        <div className="product_cart_left">
          <div className="product_checkout_address">
            <h2>Delivery Address</h2>
          </div>

          <div className="checkout_address_input">
            <Input.TextArea
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
          <div className="checkout_address_btn">
            <Button onClick={handleAddress} loading={loadingSave}>
              SAVE
            </Button>
          </div>
          <div className="checkout_hr" />
          <div className="product_checkout_address">
            <h2>Apply Coupon</h2>
          </div>

          <div className="coupon_apply">
            <div className="checkout_address_input_coupon">
              <Input
                placeholder="enter code"
                value={coupon}
                onChange={(e) => {
                  SetDiscountSuccess("");
                  SetDiscountError("");
                  setPriceAfterDiscount(origionalPrice);
                  setCoupon(e.target.value.toUpperCase());
                  dispatch(setCouponRedux({ coupon: false }));
                }}
              />
            </div>
            <Button onClick={handleCoupon} loading={loadingCoupon}>
              APPLY
            </Button>
          </div>
          {discountError !== "" ? (
            <div className="invalid_coupon">
              {discountError && discountError}
              <span
                className="close_coupon"
                onClick={() => {
                  SetDiscountError("");
                  setCoupon("");
                }}
              >
                X
              </span>
            </div>
          ) : null}
          {discountSuccess !== "" ? (
            <div className="valid_coupon">
              {discountSuccess && discountSuccess}
              <span
                className="close_coupon"
                onClick={() => {
                  SetDiscountSuccess("");
                  setCoupon("");
                }}
              >
                X
              </span>
            </div>
          ) : null}
        </div>
        {/**********************right******************/}
        {product && product.length > 0 && (
          <div className="product_cart_right">
            <div className="product_cart_title">
              <h2 style={{ paddingTop: "0.1rem" }}>
                ORDER SUMMARY{" "}
                {`(${product?.length} ${
                  product?.length > 1 ? "Items" : "Item"
                })`}
              </h2>
            </div>
            <div className="cart_hr_right" />
            <div className="product_cart_right_mid">
              {product.length > 0
                ? product.map((p) => (
                    <>
                      <div
                        className="product_cart_right_mid_content"
                        key={p._id}
                      >
                        <h4>
                          {p.product.title} ({p.product.color}) X {p.count} = ₹
                          {numeral(p.price * p.count).format("0,0")}{" "}
                        </h4>
                      </div>
                    </>
                  ))
                : null}
            </div>
            <div className="cart_hr_right" />
            <div className="product_checkout_right_bottom">
              <h3 style={{ marginTop: "0.45rem" }}>
                {total ? `TOTAL : ₹${numeral(total).format("0,0")}` : null}
              </h3>
              <h3 style={{ marginTop: "0.45rem", color: "rgb(33,180,33)" }}>
                {priceAfterDiscount !== origionalPrice
                  ? `DISCOUNT : - ₹${numeral(
                      priceAfterDiscount?.totalDiscount
                    ).format("0,0")}`
                  : null}
              </h3>
              {priceAfterDiscount !== origionalPrice && (
                <div className="cart_hr_right" />
              )}
              <h3 style={{ marginTop: "0.45rem", color: "#146eb4" }}>
                {priceAfterDiscount !== origionalPrice
                  ? `FINAL TOTAL : ₹${numeral(
                      priceAfterDiscount?.discountedPrice
                    ).format("0,0")}`
                  : null}
              </h3>
            </div>
            <div className="cart_hr_right" />

            {/*********************left-order-bottom********************/}

            <div className="product_cart_bottom">
              {" "}
              <Button
                className="product_cart_bottom_empty"
                onClick={handleremoveCart}
                loading={loadingEmpty}
              >
                Empty Cart
              </Button>
              {cod ? (
                <Button
                  className={
                    addressSaved
                      ? "product_cart_bottom_order"
                      : "product_cart_bottom_order_disable"
                  }
                  disabled={!addressSaved}
                  onClick={createCashOrder}
                >
                  Place Order
                </Button>
              ) : (
                <Button
                  className={
                    addressSaved
                      ? "product_cart_bottom_order"
                      : "product_cart_bottom_order_disable"
                  }
                  disabled={!addressSaved}
                  onClick={() => history.push("/payment")}
                >
                  Place Order
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
