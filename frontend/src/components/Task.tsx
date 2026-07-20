import { Task as TaskType } from "@/src/types/index";
import Link from "next/link";
import { Button } from "@/src/components/ui/button"
import { Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import {
    Trash,
    Pencil
} from "lucide-react"

type Props = {
    task: TaskType
    onToggle: (id: string) => void
    onDelete: (id: string) => void
}

const Task = ({
    task,
    onToggle,
    onDelete
}: Props) => {
    return (
        <Card className="h-full w-full bg-[var(--app-accent)]">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="truncate">
                    {task.title}
                </CardTitle>
                <Link href={`/tasks/${task.id}`} className="h-7 w-7">
                    <Pencil className="h-5 w-5"/>
                </Link>
            </CardHeader>
            <CardContent className="flex h-full flex-col space-y-2">

                <p className="truncate">{task.description}</p>
                <p>Status: {task.completed 
                    ? "Done"
                    : "Undone"
                }</p>

                <p>Priority: {task.priority}</p>
                <p className="truncate">Category: {task.category}</p>
                <p>Due: {task.due_date
                    ? new Date(task.due_date).toLocaleString()
                    : "-"
                }</p>

                <div className="flex items-center justify-between pt-4">
                    <Checkbox
                        className="
                            h-5 w-5
                            data-checked:!bg-[var(--app-primary)]
                            data-checked:!text-[var(--app-background)]
                            data-checked:!border-[var(--app-background)]
                        "
                        checked={task.completed ?? false}
                        onCheckedChange={() => onToggle(task.id)} 
                    />
                    <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => onDelete(task.id)}    
                    >
                        <Trash/>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export {
    Task
}