import React from "react";
import { Card, Skeleton } from "antd";

const LoadingCard = ({ count }) => {
  const countSkeleton = () => {
    let array = [];
    for (let i = 0; i < count; ++i) {
      array.push(
        <Card key={i}>
          <Skeleton active />
        </Card>
      );
    }
    return array;
  };

  return <div className="loading_skeleton ">{countSkeleton()}</div>;
};

export default LoadingCard;
