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
import { MovieDetail } from "./MovieDetail";
import { fetchJSON } from "../utility/fetchJSON";
import type { WatchedMovieType } from "../types/WatchedMovieType";

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
    const [selectedId, setSelectedId] = useState("");
    const [watchedMovie, setWatchedMovie] = useState<WatchedMovieType[]>(() => {
        const watchedData = localStorage.getItem("watched_data");
        return watchedData ? JSON.parse(watchedData) : [];
    });
    const sidebarRef = useRef<HTMLDivElement>(null);

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
                setIsLoading(false);
            } catch (error) {
                if (typeof error === "string") {
                    setError(error);
                } else if (error instanceof Error) {
                    if (error.message.includes("abort")) return;
                    setError(error.message);
                }
            }
        }

        fetchData();
        return () => {
            setError("");
            controller.abort();
            setMovieList([]);
        };
    }, [query]);

    useEffect(() => {
        if (!isSidebarOpen) return;

        function clickOutside(e: MouseEvent) {
            const target = e.target as HTMLElement;
            if (
                !target.classList.contains("movie-overlay") &&
                sidebarRef.current &&
                !sidebarRef.current.contains(target)
            ) {
                setIsSidebarOpen(false);
            }
        }

        const timeout = setTimeout(() => {
            document.addEventListener("click", clickOutside);
        }, 350);

        return () => {
            clearTimeout(timeout);
            document.removeEventListener("click", clickOutside);
        };
    }, [isSidebarOpen]);

    useEffect(() => {
        localStorage.setItem("watched_data", JSON.stringify(watchedMovie));
    }, [watchedMovie]);

    function handleMovieClick(id: string) {
        setIsSidebarOpen(true);
        setSelectedId(id);
    }

    function handleAddMovie(newMovie: WatchedMovieType) {
        setWatchedMovie([...watchedMovie, newMovie]);
    }

    function handleRemoveMovie(movieId: string) {
        const newMovie = watchedMovie.filter((m) => m.id !== movieId);

        setWatchedMovie(newMovie);
    }

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
                    {watchedMovie.map((m) => {
                        return (
                            <WatchedMovie
                                onDeleteMovie={handleRemoveMovie}
                                key={m.id}
                                movie={m}
                            />
                        );
                    })}
                </div>
                {selectedId && (
                    <MovieDetail
                        onAddWatchedMovie={handleAddMovie}
                        movieId={selectedId}
                    />
                )}
                <Button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="sidebar-close button-primary"
                >
                    ← Close Watched List
                </Button>
            </Sidebar>
            <Main>
                <Search query={query} setQuery={setQuery} />
                {String(isLoading)}

                <MoviesList>
                    {movieList &&
                        movieList.map((m) => {
                            return (
                                <Movie
                                    onMovieClick={handleMovieClick}
                                    key={m.imdbID}
                                    movie={m}
                                />
                            );
                        })}
                    {isLoading && !error && (
                        <PlaceholderBox>
                            <LoadAnimation />
                        </PlaceholderBox>
                    )}
                    {error && <PlaceholderBox>{error}</PlaceholderBox>}
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
