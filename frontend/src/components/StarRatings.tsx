// StarRating.tsx
import React, { useState } from "react";

interface StarRatingProps {
  totalStars: number;
  initialRating: number;
  onRatingChange: (newRating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  totalStars,
  initialRating,
  onRatingChange,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (index: number) => {
    setRating(index + 1);
    onRatingChange(index + 1);
  };

  const handleStarHover = (index: number) => {
    setHoveredRating(index + 1);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleStarClick(index)}
          onMouseEnter={() => handleStarHover(index)}
          onMouseLeave={handleStarLeave}
          style={{
            cursor: "pointer",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            color: index < (hoveredRating || rating) ? "gold" : "lightgray",
          }}>
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
