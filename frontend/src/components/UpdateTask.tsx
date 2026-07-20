"use client"
import { useState } from "react"
import { taskService } from "@/src/services/index"
import { useRouter } from "next/navigation"
import { Task } from "@/src/types/index"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Label } from "./ui/label"

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
        <form className="flex w-full max-w-md flex-col gap-4" onSubmit={handleSubmit}>
            <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex flex-row gap-2">
                <Label>Priority:</Label>
                <Input
                    type="number"
                    min={1}
                    max={10}
                    value={priority}
                    onChange={(e) => setPriority(Number(e.target.value))}
                />
            </div>
            <Input
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <Input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <Button 
                variant="outline"
                type="submit"
                className="bg-[var(--app-primary)] hover:bg-[var(--app-secondary)]"
            >
                Update
            </Button>
        </form>
    )
}

export {
    UpdateTask
}