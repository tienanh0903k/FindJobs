import { StarFilled, StarOutlined } from '@ant-design/icons';
import React from 'react';

const StarRating = ({ rate }: {
    rate: number
}) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <div key={index}>
      {index < rate ? <StarFilled /> : <StarOutlined />}
    </div>
  ));

  return (
    <div className="average mt-2">
      <div className="container-star flex w-30 h-8">{stars}</div>
    </div>
  );
};

export default StarRating;