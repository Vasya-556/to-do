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
        <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-4">
                <SearchBar
                    search={search}
                    setSearch={setSearch}
                />
                <div className="flex gap-4">
                    <StatusFilter
                        completed={completed}
                        setCompleted={setCompleted}
                    />
                    <PrioritySort
                        sortPriority={sortPriority}
                        setSortPriority={setSortPriority}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {
                    tasks.map((task) => (
                        <div
                            className="w-[300px]"
                            key={task.id}
                        >
                            <Task
                                task={task}
                                onToggle={handleToggle}
                                onDelete={handleDelete}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export {
    Tasks
}