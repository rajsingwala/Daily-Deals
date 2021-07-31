import React from "react";
import numeral from "numeral";
import { Select } from "antd";

const { Option } = Select;

const Order = ({ orders, changeStatus }) => {
  return (
    <div className="admin_dashboard_order">
      {orders.length > 0 &&
        orders.map((pro) => (
          <div className="admin_dashboard_order1" key={pro?._id}>
            <div className="admin_dashboard_order2">
              {pro?.products?.length > 0 &&
                pro?.products.map((item) => (
                  <div className="admin_dashboard_order3" key={item?._id}>
                    <div className="admin_dashboard_order2_left">
                      <img
                        src={item?.product.images[0].url}
                        alt={item?.product.title}
                      />
                    </div>
                    <div className="admin_dashboard_order2_mid">
                      <p className="history_suborder1_mid1">
                        {item?.product.title}
                      </p>
                      <p className="history_suborder1_mid2">
                        Brand : {item?.product?.brand}
                      </p>
                      <p className="history_suborder1_mid1">
                        Price : ₹
                        {numeral(item?.product?.price * item?.count).format(
                          "0,0"
                        )}
                      </p>
                      <p className="history_suborder1_mid2">
                        Quantity : {item?.count}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="admin_dashboard_order_last">
              <p className="history_suborder1_mid2">
                Order Id : {pro?.paymentIntent?.id}
              </p>
              <p className="history_suborder1_mid2">
                Ordered On :{" "}
                {pro?.paymentIntent?.payment_method_types[0].toUpperCase() ===
                "CARD"
                  ? new Date(
                      pro?.paymentIntent?.created * 1000
                    ).toLocaleString()
                  : new Date(pro?.paymentIntent?.created).toLocaleString()}
              </p>
              <p className="history_suborder1_mid1">
                Payment : {pro?.paymentIntent?.status.toUpperCase()}
              </p>
              <p className="history_suborder1_mid1">
                Amount Payable : ₹
                {numeral(pro?.paymentIntent?.amount / 100).format("0,0")}
              </p>
              <Select
                onChange={(value) => changeStatus(pro?._id, value)}
                defaultValue={pro?.orderStatus}
              >
                <Option value="Not Processed">Not Processed</Option>
                <Option value="Processing">Processing</Option>
                <Option value="Dispatched">Dispatched</Option>
                <Option value="Cancelled">Cancelled</Option>
                <Option value="Completed">Completed</Option>
              </Select>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Order;
