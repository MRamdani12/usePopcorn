import { useEffect, useState } from "react";
import { Button } from "./Button";
import { StarRating } from "./StarRating";
import { fetchJSON } from "../utility/fetchJSON";
import type { MovieDetailType } from "../types/MovieDetailType";
import { LoadAnimation } from "./LoadAnimation";
import { PlaceholderBox } from "./PlaceholderBox";
import type { WatchedMovieType } from "../types/WatchedMovieType";

type MovieDetailProps = {
    movieId: string;
    onAddWatchedMovie: (newMovie: WatchedMovieType) => void;
};

export function MovieDetail({ movieId, onAddWatchedMovie }: MovieDetailProps) {
    const [movieDetail, setMovieDetail] = useState<MovieDetailType | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        async function getMovieDetail() {
            try {
                setIsLoading(true);
                const data = await fetchJSON<MovieDetailType>(
                    `https://www.omdbapi.com/?i=${movieId}&apikey=${
                        import.meta.env.VITE_OMDB_API_KEY
                    }`,
                    { signal: controller.signal }
                );
                setMovieDetail(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
        const timer = window.setTimeout(() => {
            getMovieDetail().catch(console.error);
        }, 0);
        setIsOpen(true);

        return () => {
            setRating(0);
            controller.abort();
            clearTimeout(timer);
        };
    }, [movieId]);

    function handleAddWatched(e: React.MouseEvent<HTMLButtonElement>) {
        if (!movieDetail) return;
        e.stopPropagation();
        const newMovie = {
            id: crypto.randomUUID(),
            Title: movieDetail?.Title,
            Poster: movieDetail?.Poster,
            runtime: movieDetail?.Runtime,
            imdbRating: movieDetail?.imdbRating,
            userRating: rating,
        };

        setIsOpen(false);

        onAddWatchedMovie(newMovie);
    }

    return (
        <>
            {isOpen && (
                <div className="movie-detail">
                    {isLoading ? (
                        <PlaceholderBox height={100}>
                            <LoadAnimation />
                        </PlaceholderBox>
                    ) : (
                        <>
                            <header>
                                <div className="img-wrapper">
                                    <img
                                        src={movieDetail?.Poster}
                                        alt={movieDetail?.Title}
                                    />
                                </div>
                                <div className="movie-detail-summary">
                                    <h2>{movieDetail?.Title}</h2>
                                    <p>
                                        {movieDetail?.Released} •{" "}
                                        {movieDetail?.Runtime}
                                    </p>
                                    <p>{movieDetail?.Genre}</p>
                                    <p>
                                        {movieDetail?.imdbRating} IMDb rating
                                        ⭐️
                                    </p>
                                </div>
                            </header>
                            <div className="movie-detail-body">
                                <StarRating ratingFn={setRating} length={10} />
                                {rating ? (
                                    <Button onClick={handleAddWatched}>
                                        + Add To List
                                    </Button>
                                ) : null}
                                <div className="movie-detail-plot">
                                    {movieDetail?.Plot}
                                </div>
                            </div>
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(false);
                                }}
                                className="sidebar-close button-primary"
                            >
                                ← Close Movie Detail
                            </Button>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
