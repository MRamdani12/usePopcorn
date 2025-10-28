import type { WatchedMovieType } from "../types/WatchedMovieType";
import { Button } from "./Button";

type WatchedMovieProps = {
    movie: WatchedMovieType;
    onDeleteMovie: (movieId: string) => void;
    onWatchedClick: (movieId: string) => void;
};

export function WatchedMovie({
    movie,
    onDeleteMovie,
    onWatchedClick,
}: WatchedMovieProps) {
    return (
        <div
            className="watched-movie"
            onClick={() => onWatchedClick(movie.imdbId)}
        >
            <Button
                onClick={(e) => {
                    e.stopPropagation();
                    onDeleteMovie(movie.id);
                }}
                className="button-close"
            >
                ✖
            </Button>
            <img src={movie.Poster} alt={movie.Title} />

            <div className="watched-movie-detail">
                <h3 className="watched-movie-title">{movie.Title}</h3>
                <p>imdbRating: {movie.imdbRating}</p>
                <p>Personal Rating: {movie.userRating}</p>
                <p>Duration: {movie.runtime}</p>
            </div>
        </div>
    );
}
