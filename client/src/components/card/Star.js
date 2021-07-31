import React from "react";
import StarRatings from "react-star-ratings";

const Star = ({ starClick, numberOfStars }) => {
  return (
    <StarRatings
      numberOfStars={numberOfStars}
      changeRating={() => starClick(numberOfStars)}
      starRatedColor="#ff9900"
      starEmptyColor="#ff9900"
      starHoverColor="#ff9900"
      starDimension="20px"
      starSpacing="1px"
    />
  );
};

export default Star;
