import type { WatchedMovieType } from "../types/WatchedMovieType";

export function WatchedMovie({ movie }: { movie: WatchedMovieType }) {
    return (
        <div className="watched-movie">
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
