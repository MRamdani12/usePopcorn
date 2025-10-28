import type { WatchedMovieType } from "../types/WatchedMovieType";
import { Button } from "./Button";

type WatchedMovieProps = {
    movie: WatchedMovieType;
    onDeleteMovie: (movieId: string) => void;
};

export function WatchedMovie({ movie, onDeleteMovie }: WatchedMovieProps) {
    return (
        <div className="watched-movie">
            <Button
                onClick={(e) => {
                    e.stopPropagation();
                    onDeleteMovie(movie.id);
                }}
                className="button-close"
            >
                ✖
            </Button>
            <img src={movie.Poster} alt="" />

            <div className="watched-movie-detail">
                <h3 className="watched-movie-title">{movie.Title}</h3>
                <p>imdbRating: {movie.imdbRating}</p>
                <p>Personal Rating: {movie.userRating}</p>
                <p>Duration: {movie.runtime}</p>
            </div>
        </div>
    );
}
