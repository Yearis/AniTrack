import { Star } from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useLists } from "../hooks/useLists";
import { useAuth } from "../hooks/useAuth";

export default function Review({ maxStars, animeId }) {
    const { id: paramId } = useParams();
    const id = animeId || paramId;

    const { reviews, rateAnime } = useLists();
    const { user } = useAuth();
    const navigate = useNavigate();

    const savedRating =
        reviews.find((r) => String(r.anime_id) === String(id))?.rating || 0;

    const [tempRating, setTempRating] = useState(0);

    async function handleClick(index) {
        if (!user) {
            navigate("/login");
            return;
        }

        setTempRating(index);
        try {
            await rateAnime(id, index);
        } catch (err) {
            console.error("Failed to save rating:", err.message);
        }
    }

    function handleMouseEnter(index) {
        setTempRating(index);
    }

    function handleMouseLeave() {
        setTempRating(0);
    }

    return (
        <div className="review-stars-container">
            {Array.from({ length: maxStars }, (_, index) => {
                const starValue = index + 1;
                const isFilled = starValue <= (tempRating || savedRating);

                return (
                    <button
                        key={starValue}
                        style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: "2px",
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClick(starValue);
                        }}
                        onMouseEnter={() => handleMouseEnter(starValue)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Star
                            size={16}
                            color={isFilled ? "#fbbf24" : "#71717a"}
                            fill={isFilled ? "#fbbf24" : "none"}
                        />
                    </button>
                );
            })}
        </div>
    );
}
