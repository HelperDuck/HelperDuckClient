import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";

const Rating = ({ count, rating, color, onRating }: any) => {
  const [hoverRating, setHoverRating] = useState(0);
  const getColor = (index: any) => {
    if (hoverRating >= index) {
      return color.filled;
    } else if (!hoverRating && rating >= index) {
      return color.filled;
    }
    return color.unfilled;
  };
  const fireRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <Icon
          className="cursor-pointer"
          key={idx}
          icon="heroicons-solid:fire"
          height={40}
          width={40}
          onClick={() => onRating(idx)}
          style={{ color: getColor(idx) }}
          onMouseEnter={() => setHoverRating(idx)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ));
  }, [count, rating, hoverRating]);
  return <div className="rating">{fireRating}</div>;
};

Rating.defaultProps = {
  count: 5,
  rating: 0,
  color: {
    filled: "#ffaa00",
    unfilled: "#F5F5F7",
  },
};

export default Rating;
