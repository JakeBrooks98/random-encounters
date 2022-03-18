

export const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <form action="/Monsters" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden"></span>
        </label>
        <input
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Search Monsters"
            name="s"
        />
        <button type="submit">Search</button>
    </form>
);
