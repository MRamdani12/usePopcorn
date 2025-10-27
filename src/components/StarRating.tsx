import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { useState, type SetStateAction } from "react";

library.add(fas, far);

type StarRatingProps = {
    ratingFn?:
        | React.Dispatch<SetStateAction<number>>
        | ((rating: number) => void);
    color?: string;
    length?: number;
    size?: "2xs" | "xs" | "sm" | "lg" | "xl" | "2xl";
};

export function StarRating({
    ratingFn,
    color = "#EFBF04",
    length = 5,
    size = "xl",
}: StarRatingProps) {
    const [rating, setRating] = useState(0);
    const [tempRating, setTempRating] = useState(0);

    function handleRating(rating: number) {
        setRating(rating);
        if (ratingFn) ratingFn(rating);
    }

    return (
        <div className="star-rating">
            <div className="stars">
                {Array.from({ length }, (_, i) => {
                    const isFull = tempRating ? i < tempRating : i < rating;
                    return (
                        <button
                            onClick={() => handleRating(i + 1)}
                            onMouseEnter={() => setTempRating(i + 1)}
                            onMouseLeave={() => setTempRating(0)}
                            key={i}
                            className="star-style"
                        >
                            <FontAwesomeIcon
                                icon={[isFull ? "fas" : "far", "star"]}
                                size={size}
                                style={{ color: color }}
                            />
                        </button>
                    );
                })}
            </div>
            <p style={{ opacity: rating || tempRating ? "1" : "0" }}>
                {!tempRating ? rating : tempRating}
            </p>
        </div>
    );
}
