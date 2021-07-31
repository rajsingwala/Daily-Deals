import React from "react";
import Order from "./Order";

const HistoryMobile = ({ order }) => {
  return (
    <div className="history_mobile">
      <h1 className={order.length > 0 ? "history_title" : "history_title no"}>
        {order.length > 0
          ? `Your Order${order.length > 1 ? "s" : ""}`
          : "No Orders"}
      </h1>
      <Order order={order} />
    </div>
  );
};

export default HistoryMobile;
