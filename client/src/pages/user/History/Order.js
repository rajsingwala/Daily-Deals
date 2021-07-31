import React from "react";
import numeral from "numeral";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "./Invoice";
import { useHistory } from "react-router-dom";

const Order = ({ order }) => {
  const showInvoice = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="invoice.pdf"
      style={{ color: "#fff" }}
      className="history_pdf"
    >
      Download Invoice
    </PDFDownloadLink>
  );

  const history = useHistory();

  return (
    <div className="history_order_list">
      {order.length > 0 &&
        order.map((item) => (
          <div className="history_order1" key={item?._id}>
            <div className="history_suborder">
              {item?.products.length > 0 &&
                item?.products?.map((pro) => (
                  <div
                    key={pro?._id}
                    className="history_suborder1"
                    onClick={() =>
                      history.push(`/product/${pro?.product?.slug}`)
                    }
                  >
                    <div className="history_suborder1_left">
                      <img
                        src={pro?.product?.images[0].url}
                        alt={pro?.product?.title}
                      />
                    </div>
                    <div className="history_suborder1_mid">
                      <div className="history_suborder1_mid1">
                        {pro?.product?.title}
                      </div>
                      <div className="history_suborder1_mid3">
                        ₹
                        {numeral(pro?.product?.price * pro?.count).format(
                          "0,0"
                        )}
                      </div>
                      <div className="history_suborder1_mid2">
                        Color : {pro?.product?.color}
                      </div>
                      <div className="history_suborder1_mid2">
                        Brand : {pro?.product?.brand}
                      </div>
                      <div className="history_suborder1_mid2">
                        Quantity : {pro?.count}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="history_suborder_right">
              <p className="history_order_on">Status : {item?.orderStatus}</p>
              <p>
                Ordered On :{" "}
                {item?.paymentIntent?.payment_method_types[0].toUpperCase() ===
                "CARD"
                  ? new Date(
                      item?.paymentIntent?.created * 1000
                    ).toLocaleString()
                  : new Date(item?.paymentIntent?.created).toLocaleString()}
              </p>
              <p>Payment : {item?.paymentIntent?.status.toUpperCase()}</p>
              <p>
                Method :{" "}
                {item?.paymentIntent?.payment_method_types[0].toUpperCase()}
              </p>
              <p className="history_order_on">
                Amount Payable : ₹
                {numeral(item?.paymentIntent?.amount / 100).format("0,0")}
              </p>
              <div className="history_download">
                <span>{showInvoice(item)}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Order;
