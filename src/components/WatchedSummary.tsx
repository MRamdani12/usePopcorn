type WatchedSummaryProps = {
    movieCount: number;
    avgImdbRating: number;
    avgUserRating: number;
    avgRuntime: number;
};

export function WatchedSummary({
    movieCount,
    avgImdbRating,
    avgUserRating,
    avgRuntime,
}: WatchedSummaryProps) {
    return (
        <div className="watched-summary">
            <h2>Movie Watched</h2>
            <div className="d-flex flex-center">
                <p>#️⃣ {movieCount} movies</p>
                <p>⭐️ {avgImdbRating.toFixed(2)}</p>
                <p>🌟 {avgUserRating.toFixed(2)}</p>
                <p>⏳ {avgRuntime.toFixed(2)} min</p>
            </div>
        </div>
    );
}
