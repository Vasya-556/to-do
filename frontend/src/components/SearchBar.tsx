import { Input } from "@/src/components/ui/input"

type Props = {
    search: string,
    setSearch: (value: string) => void
}
    
const SearchBar = ({
    search,
    setSearch
}: Props) => {
    return (
        <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search"
            className=""
        />
    )
}

export {
    SearchBar
}