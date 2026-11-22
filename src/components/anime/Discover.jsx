import { useDiscover } from "../../hooks/useDiscover";
import Loader from "../ui/Loader";
import ErrorMessage from "../ui/ErrorMessage";
import AnimeCard from "./AnimeCard";
import List from "../ui/List";
import { Flame, Sparkles, Trophy } from "lucide-react";
import styles from "./Discover.module.css";

export default function Discover() {
    const {
        results: trendingAnime,
        isLoading: trendingLoading,
        error: trendingError,
    } = useDiscover("TRENDING_DESC");

    const {
        results: popularAnime,
        isLoading: popularLoading,
        error: popularError,
    } = useDiscover("POPULARITY_DESC");

    const {
        results: highestRatedAnime,
        isLoading: highestRatedLoading,
        error: highestRatedError,
    } = useDiscover("SCORE_DESC");

    return (
        <div className={styles.discover}>
            {/* Trending */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <Flame size={20} className={styles.flameIcon} />
                    <h3 className={styles.sectionTitle}>Trending Anime</h3>
                </div>

                {trendingLoading && <Loader content="trending animes" />}
                {!trendingLoading && !trendingError && (
                    <List
                        items={trendingAnime}
                        ItemComponent={AnimeCard}
                        className={styles.horizontalList}
                    />
                )}
                {trendingError && <ErrorMessage message={trendingError} />}
            </section>

            {/* Popular */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <Sparkles size={20} className={styles.sparkleIcon} />
                    <h3 className={styles.sectionTitle}>All-Time Popular</h3>
                </div>

                {popularLoading && <Loader content="popular animes" />}
                {!popularLoading && !popularError && (
                    <List
                        items={popularAnime}
                        ItemComponent={AnimeCard}
                        className={styles.horizontalList}
                    />
                )}
                {popularError && <ErrorMessage message={popularError} />}
            </section>

            {/* Highest Rated */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <Trophy size={20} className={styles.trophyIcon} />
                    <h3 className={styles.sectionTitle}>Top Rated Anime</h3>
                </div>

                {highestRatedLoading && <Loader content="top rated animes" />}
                {!highestRatedLoading && !highestRatedError && (
                    <List
                        items={highestRatedAnime}
                        ItemComponent={AnimeCard}
                        className={styles.horizontalList}
                    />
                )}
                {highestRatedError && <ErrorMessage message={highestRatedError} />}
            </section>
        </div>
    );
}
