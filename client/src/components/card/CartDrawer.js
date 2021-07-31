import React from "react";
import { Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { selectCart } from "../../features/cart/cartSlice";
import { selectVisible, setVisible } from "../../features/cart/drawerSlice";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const visible = useSelector(selectVisible);

  return (
    <Drawer
      visible={visible}
      onClose={() => {
        dispatch(setVisible({ visible: false }));
      }}
      title={`Cart (${cart && cart.length})`}
    >
      <div className="drawer_cart">
        {cart &&
          cart.length > 0 &&
          cart.map((p) => (
            <div className="drawer_cart_content" key={p._id}>
              <div className="drawer_cart_img">
                <img src={p.images[0].url} alt={p.title} />
              </div>
              <p style={{ textAlign: "center" }}>
                {p.title} ({p.color}) X {p.count}
              </p>
            </div>
          ))}
        <div className="drawer_cart_btn">
          <Link to="/cart">
            <div
              className="drawer_cart_button"
              onClick={() => dispatch(setVisible({ visible: false }))}
            >
              My Cart
            </div>
          </Link>
        </div>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
