import { Nav } from "./Nav";
import { Main } from "./Main";
import { MoviesList } from "./MoviesList";
import { Movie } from "./Movie";
import { Search } from "./Search";
import { Sidebar } from "./Sidebar";
import { WatchedSummary } from "./WatchedSummary";
import { WatchedMovie } from "./WatchedMovie";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { DarkModeToggle } from "./DarkModeToggle";
import type { MovieType } from "../types/MovieType";
import { PlaceholderBox } from "./PlaceholderBox";
import { LoadAnimation } from "./LoadAnimation";

const tempWatchedData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: "tt0088763",
        Title: "Back to the Future",
        Year: "1985",
        Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
    {
        imdbID: "tt088763",
        Title: "Back to the Future",
        Year: "1985",
        Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
    {
        imdbID: "tt008763",
        Title: "Back to the Future",
        Year: "1985",
        Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
    {
        imdbID: "t0088763",
        Title: "Back to the Future",
        Year: "1985",
        Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
    {
        imdbID: "tt0083",
        Title: "Back to the Future",
        Year: "1985",
        Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];

interface OMDbResponse {
    Search: MovieType[];
    totalResults: string;
    Response: "True" | "False";
    Error?: string;
}

export default function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [movieList, setMovieList] = useState<MovieType[]>([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const sidebarRef = useRef<HTMLDivElement>(null);

    async function fetchJSON<T>(...args: Parameters<typeof fetch>): Promise<T> {
        const res = await fetch(...args);
        console.log(...res.headers);
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        return res.json() as Promise<T>;
    }

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
                    `http://www.omdbapi.com/?apikey=${
                        import.meta.env.VITE_OMDB_API_KEY
                    }&s=${query}`,
                    { signal: controller.signal }
                );

                if (data.Error) throw new Error("Movie not found");

                setMovieList(data.Search);
            } catch (error) {
                if (typeof error === "string") {
                    setError(error);
                } else if (error instanceof Error) {
                    if (error.message.includes("abort")) return;
                    setError(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchData().catch((err) => console.error(err));
        return () => {
            setError("");
            controller.abort();
        };
    }, [query]);

    useEffect(() => {
        function clickOutsideSidebar(e: MouseEvent) {
            const target = e.target as HTMLElement;
            if (
                isSidebarOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(target)
            ) {
                setIsSidebarOpen(false);
            }
        }
        const timeout = setTimeout(() => {
            document.addEventListener("click", clickOutsideSidebar);
        }, 350);

        return () => {
            clearTimeout(timeout);
            document.removeEventListener("click", clickOutsideSidebar);
        };
    });

    return (
        <>
            <Nav>
                <Logo />
                <Button onClick={() => setIsSidebarOpen(true)}>
                    Watched List
                </Button>
            </Nav>
            <Sidebar sidebarRef={sidebarRef} isSidebarOpen={isSidebarOpen}>
                <WatchedSummary />
                <div className="watched-movie-wrapper">
                    {tempWatchedData.map((m) => {
                        return <WatchedMovie key={m.imdbID} movie={m} />;
                    })}
                </div>
                <div className="movie-detail"></div>
                <Button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="sidebar-close button-primary"
                >
                    ← Close Watched List
                </Button>
            </Sidebar>
            <Main>
                <Search query={query} setQuery={setQuery} />
                <MoviesList>
                    {movieList &&
                        movieList.map((m) => {
                            return <Movie key={m.imdbID} movie={m} />;
                        })}
                    {isLoading && !error && (
                        <PlaceholderBox>
                            <LoadAnimation />
                        </PlaceholderBox>
                    )}
                    {error && <PlaceholderBox>Error: {error}</PlaceholderBox>}
                    {!query && !error && (
                        <PlaceholderBox>
                            Try searching for something!
                        </PlaceholderBox>
                    )}
                    {query.length <= 2 && query.length >= 1 && (
                        <PlaceholderBox>
                            Input need to be more than 1-2 character(s)
                        </PlaceholderBox>
                    )}
                </MoviesList>
            </Main>
            <DarkModeToggle />
        </>
    );
}
