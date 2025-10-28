type SearchProps = {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    searchRef: React.Ref<HTMLInputElement>;
};

export function Search({ query, setQuery, searchRef }: SearchProps) {
    return (
        <div className="search">
            <input
                ref={searchRef}
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                type="text"
                placeholder="Search"
            />
        </div>
    );
}
