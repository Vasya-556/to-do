"use client"
import { useState } from "react"
import { taskService } from "@/src/services/index"
import { useRouter } from "next/navigation"
import { Task } from "@/src/types/index"

type Props = {
    task: Task
}

const UpdateTask = ({
    task
}: Props) => {
    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description ?? "")
    const [priority, setPriority] = useState(task.priority)
    const [category, setCategory] = useState(task.category ?? "")
    const [dueDate, setDueDate] = useState(task.due_date 
        ? task.due_date.slice(0,16)
        : ""
    )
    const router = useRouter()
    
    const handleSubmit = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault()

        await taskService.updateTask(
            task.id,
            {
                title,
                description: description || null,
                priority,
                category: category || null,
                due_date: dueDate || null
            }
        )

        router.push("/")
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <label>Priority:</label>
            <input
                type="number"
                min={1}
                max={10}
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
            />
            <input
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button>
                Update
            </button>
        </form>
    )
}

export {
    UpdateTask
}