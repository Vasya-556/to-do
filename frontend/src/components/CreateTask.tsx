"use client"
import { useState } from "react"
import { taskService } from "@/src/services/index"
import { useRouter } from "next/navigation"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Label } from "./ui/label"

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
        <form className="flex w-full max-w-md flex-col gap-4" onSubmit={handleSubmit}>
            <Input
                maxLength={255}
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
                maxLength={255}
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
                Create
            </Button>
        </form>
    )
}

export {
    CreateTask
}