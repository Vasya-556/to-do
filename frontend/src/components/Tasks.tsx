"use client"

import { useEffect, useState } from "react";
import { taskService } from "@/src/services/index";
import { Task as TaskType } from "@/src/types/index";
import { Task, 
    SearchBar,
    StatusFilter,
    PrioritySort
} from "@/src/components/index";

const Tasks = () => {
    const [tasks, setTasks] = useState<TaskType[]>([])
    const [search, setSearch] = useState("")
    const [completed, setCompleted] = useState<
        "all" | "done" | "undone"
    >("all")
    const [sortPriority, setSortPriority] = useState<
        "asc" | "desc" | undefined
    >()

    const loadTasks = () => {
        taskService.getTasks(
            search,
            completed,
            sortPriority
        )
        .then(setTasks)
        console.log(tasks)
    }

    const handleToggle = async (id: string) => {
        await taskService.toggleTask(id)
        loadTasks()
    }

    const handleDelete = async (id: string) => {
        await taskService.deleteTask(id)
        loadTasks()
    }

    useEffect(() => {
        loadTasks()
    }, [
        search,
        completed,
        sortPriority
    ])

    return (
        <>
            <SearchBar
                search={search}
                setSearch={setSearch}
            />
            <StatusFilter
                completed={completed}
                setCompleted={setCompleted}
            />
            <PrioritySort
                sortPriority={sortPriority}
                setSortPriority={setSortPriority}
            />

            {
                tasks.map((task) => (
                    <div
                        key={task.id}
                    >
                        <Task
                            task={task}
                            onToggle={handleToggle}
                            onDelete={handleDelete}
                        />
                        <br/>
                    </div>
                ))
            }
        </>
    )
}

export {
    Tasks
}