import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/src/components/ui/select"

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
        <Select
            value={completed}
            onValueChange={(value) => 
                setCompleted(
                    value as "all" | "done" | "undone"
                )
            }
        >
            <SelectTrigger className="w-40">
                <SelectValue 
                    render={() => {
                        if (completed === "done") {
                            return <span>Done</span>
                        }
                        else if (completed === "undone"){
                            return <span>Undone</span>
                        }
                        return <span>All</span>
                    }}
                />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="undone">Undone</SelectItem>
            </SelectContent>
        </Select>
    )
}

export {
    StatusFilter
}