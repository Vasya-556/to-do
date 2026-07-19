"use client"
import { useState } from "react"
import { taskService } from "@/src/services/index"
import { useRouter } from "next/navigation"

const CreateTask = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState(1)
    const [category, setCategory] = useState("")
    const [dueDate, setDueDate] = useState("")
    const router = useRouter()
    
    const handleSubmit = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault()

        await taskService.createTask({
            title,
            description: description || null,
            priority,
            category: category || null,
            due_date: dueDate || null
        })

        setTitle("")
        setDescription("")
        setPriority(1)
        setCategory("")
        setDueDate("")

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
                Create
            </button>
        </form>
    )
}

export {
    CreateTask
}