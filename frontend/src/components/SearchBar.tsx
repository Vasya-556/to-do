type Props = {
    search: string,
    setSearch: (value: string) => void
}
    
const SearchBar = ({
    search,
    setSearch
}: Props) => {
    return (
        <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search"
        />
    )
}

export {
    SearchBar
}