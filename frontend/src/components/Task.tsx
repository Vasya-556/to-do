import { Task as TaskType } from "@/src/types/index";
import Link from "next/link";

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
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.completed 
                ? "Done"
                : "Undone"
            }</p>
            <p>Priority: {task.priority}</p>
            <p>{task.category}</p>
            <p>{task.due_date}</p>
            <button
                onClick={() => onToggle(task.id)}    
            >
                Toggle
            </button>
            <button
                onClick={() => onDelete(task.id)}    
            >
                Delete
            </button>
            <Link href={`/tasks/${task.id}`}>
                Update
            </Link>
        </div>
    )
}

export {
    Task
}