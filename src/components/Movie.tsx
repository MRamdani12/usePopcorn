import type { MovieType } from "../types/MovieType";

export function Movie({ movie }: { movie: MovieType }) {
    return (
        <div className="movie">
            <div className="movie-overlay">
                <p className="movie-name">{movie.Title}</p>
                <div className="movie-year">{movie.Year}</div>
            </div>
            <img
                src={movie.Poster}
                alt={movie.Title}
                className="movie-poster"
            />
        </div>
    );
}
