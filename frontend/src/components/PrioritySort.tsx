import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/src/components/ui/select"

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
        <Select
            value={sortPriority ?? "none"}
            onValueChange={(value) => setSortPriority(
                value === "none"
                    ? undefined
                    : value as "asc" | "desc"
            )}
        >
            <SelectTrigger className="w-40">
                <SelectValue 
                    render={() => {
                        if (sortPriority === "asc") {
                            return <span>Ascending</span>
                        }
                        else if (sortPriority === "desc"){
                            return <span>Descending</span>
                        }
                        return <span>None</span>
                    }}
                />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
        </Select>
    )
}

export {
    PrioritySort
}