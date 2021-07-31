import React, { useState } from "react";
import { Input, Modal } from "antd";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";

const RatingModal = ({
  modalVisible,
  handleModal,
  product,
  changeRating,
  star,
}) => {
  const { _id } = product;

  const handleOk = () => {
    handleModal();
    toast.info("Thanks For Your Review");
  };

  return (
    <div>
      <Modal
        title="Leave Your Review"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleModal}
        centered
      >
        <div style={{ marginBottom: "1rem" }}>
          <StarRatings
            rating={star}
            starRatedColor="#ff9900"
            changeRating={changeRating}
            numberOfStars={5}
            name={_id}
            isSelectable={true}
            starDimension="30px"
          />
        </div>
      </Modal>
    </div>
  );
};

export default RatingModal;
