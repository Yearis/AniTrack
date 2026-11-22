import { Star } from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useLists } from "../../hooks/useLists";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Review.module.css";

export default function Review({ maxStars = 5, animeId }) {
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
        <div className={styles.container}>
            {Array.from({ length: maxStars }, (_, index) => {
                const starValue = index + 1;
                const isFilled = starValue <= (tempRating || savedRating);

                return (
                    <button
                        key={starValue}
                        type="button"
                        className={styles.starBtn}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClick(starValue);
                        }}
                        onMouseEnter={() => handleMouseEnter(starValue)}
                        onMouseLeave={handleMouseLeave}
                        title={`Rate ${starValue} / ${maxStars}`}
                    >
                        <Star
                            size={16}
                            color={isFilled ? "#fbbf24" : "var(--text-muted)"}
                            fill={isFilled ? "#fbbf24" : "none"}
                            className={styles.starIcon}
                        />
                    </button>
                );
            })}
        </div>
    );
}
