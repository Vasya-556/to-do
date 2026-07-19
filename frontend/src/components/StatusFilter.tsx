type Props = {
    completed: "all" | "done" | "undone"
    setCompleted: (
        value: "all" | "done" | "undone"
    ) => void
}

const StatusFilter = ({
    completed,
    setCompleted
}: Props) => {
    return (
        <select
            value={completed}
            onChange={(e) => 
                setCompleted(
                    e.target.value as 
                    "all" | "done" | "undone"
                )
            }
        >
            <option value="all">All</option>
            <option value="done">Done</option>
            <option value="undone">Undone</option>
        </select>
    )
}

export {
    StatusFilter
}