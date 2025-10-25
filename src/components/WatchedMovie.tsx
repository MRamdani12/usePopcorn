type WatchedMovieProps = {
    imdbID: string | number;
    Title: string;
    Year: string | number;
    Poster: string;
    runtime: number;
    imdbRating: number;
    userRating: number;
};

export function WatchedMovie({ movie }: { movie: WatchedMovieProps }) {
    return (
        <div className="watched-movie">
            <img src={movie.Poster} alt="" />

            <div className="watched-movie-detail">
                <h3 className="watched-movie-title">{movie.Title}</h3>
                <p>imdbRating: {movie.imdbRating}</p>
                <p>Personal Rating: {movie.userRating}</p>
                <p>Duration: {movie.runtime} min</p>
            </div>
        </div>
    );
}
