type SearchProps = {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export function Search({ query, setQuery }: SearchProps) {
    return (
        <div className="search">
            <input
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                type="text"
                placeholder="Search"
            />
        </div>
    );
}
