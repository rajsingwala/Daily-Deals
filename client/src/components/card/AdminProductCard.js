import React from "react";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";
import numeral from "numeral";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug, price } = product;

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
        <Link to={`/admin/product/edit/${slug}`} className="edit_link">
          <EditOutlined className="admin_card_edit_icon" />
        </Link>,
        <DeleteOutlined
          className="admin_card_delete_icon"
          onClick={() => handleRemove(slug)}
        />,
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

export default AdminProductCard;
