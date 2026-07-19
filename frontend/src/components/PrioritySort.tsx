type Props = {
    sortPriority: "asc" | "desc" | undefined
    setSortPriority: (
        value: "asc" | "desc" | undefined
    ) => void
}

const PrioritySort = ({
    sortPriority,
    setSortPriority
}: Props) => {
    return (
        <select
            value={sortPriority ?? ""}
            onChange={(e) => setSortPriority(e.target.value as "asc" | "desc" | undefined)}
        >
            <option value="">None</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>
    )
}

export {
    PrioritySort
}