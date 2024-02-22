import React from "react";
import { TbStarFilled } from "react-icons/tb";
import { TbStarHalfFilled } from "react-icons/tb";
function RatingStars({ rating }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStars = rating - fullStars;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<TbStarFilled className="text-yellow-500 text-lg" />);
  }
  if (halfStars) {
    stars.push(<TbStarHalfFilled className="text-yellow-500 text-lg" />);
  }

  while (stars.length < 5) {
    stars.push(<TbStarFilled className="text-neutral-300 text-lg" />);
  }
  return (
    <div className="rating ">
      {stars.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
    </div>
  );
}

export default RatingStars;
