import React from "react";
import numeral from "numeral";
import { MdDelete } from "react-icons/md";
import { updateWishlist } from "../../../functions/wishlist";
import { toast } from "react-toastify";

const Order = ({ wishlist, token, loadWishlist }) => {
  const handleRemove = (productId, productTitle) => {
    updateWishlist(token, productId).then((res) => {
      loadWishlist();
      toast.success(`${productTitle} Removed`);
    });
  };

  return (
    <div className="wishlist_order">
      {wishlist.length > 0 &&
        wishlist.map((item) => (
          <div className="wishlist_order1">
            <div className="wishlist_delete_mobile">
              <MdDelete onClick={() => handleRemove(item?._id, item?.title)} />
            </div>
            <div className="history_suborder1_left">
              <img src={item?.images[0].url} alt={item?.title} />
            </div>
            <div className="history_suborder1_mid">
              <div className="history_suborder1_mid1">{item?.title}</div>
              <div className="history_suborder1_mid3">
                ₹{numeral(item?.price).format("0,0")}
              </div>
              <div className="history_suborder1_mid2">
                Color : {item?.color}
              </div>
              <div className="history_suborder1_mid2">
                Brand : {item?.brand}
              </div>
            </div>
            <div className="wishlist_delete">
              <MdDelete onClick={() => handleRemove(item?._id, item?.title)} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Order;
