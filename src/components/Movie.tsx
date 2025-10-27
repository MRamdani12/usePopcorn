import type { MovieType } from "../types/MovieType";

type MovieProps = {
    movie: MovieType;
    onMovieClick: (id: string) => void;
};

export function Movie({ movie, onMovieClick }: MovieProps) {
    return (
        <div className="movie" onClick={() => onMovieClick(movie.imdbID)}>
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
