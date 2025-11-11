import { useEffect, useState } from "react";
import type { MovieType } from "../types/MovieType";
import { fetchJSON } from "../utility/fetchJSON";

interface OMDbResponse {
    Search: MovieType[];
    totalResults: string;
    Response: "True" | "False";
    Error?: string;
}

export function useMovies(query: string): [boolean, string, MovieType[]] {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [movieList, setMovieList] = useState<MovieType[]>([]);

    useEffect(() => {
        const controller = new AbortController();

        if (query.length <= 2) {
            setMovieList([]);
            return;
        }

        async function fetchData() {
            try {
                setIsLoading(true);

                const data = await fetchJSON<OMDbResponse>(
                    `https://www.omdbapi.com/?apikey=${
                        import.meta.env.VITE_OMDB_API_KEY
                    }&s=${query}`,
                    { signal: controller.signal }
                );

                if (data.Error) throw new Error("Movie not found");
                setMovieList(data.Search);
                setIsLoading(false);
            } catch (error) {
                if (typeof error === "string") {
                    setError(error);
                } else if (error instanceof Error) {
                    if (error.message.includes("abort")) return;
                    if (error.message.includes("401")) {
                        setError(
                            "It looks like my API key has reached 1000 request, try again tomorrow!"
                        );
                        return;
                    }
                    setError(error.message);
                }
            }
        }

        fetchData();
        return () => {
            setError("");
            controller.abort();
            setMovieList([]);
            setIsLoading(false);
        };
    }, [query]);

    return [isLoading, error, movieList];
}
