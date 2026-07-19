import { fetcher } from "@/src/utils/index"
import { Task } from "@/src/types/index"

const getTasks = (
    search?: string,
    completed?: "all" | "done" | "undone",
    sortPriority?: "asc" | "desc",
): Promise<Task[]> => {
    const params = new URLSearchParams()

    if (search){
        params.append("search", search)
    }

    if (completed){
        params.append("completed", completed)
    }

    if (sortPriority){
        params.append("sort_priority", sortPriority)
    }

    const query = params.toString()
    return fetcher<Task[]>({
        url: `/tasks${query 
            ? `?${query}` 
            : ""}`,
        method: "GET"
    })
}

const getTask = (id: string):Promise<Task> => {
    return fetcher<Task>({
        url: `/tasks/${id}`,
        method: "GET"
    })
}

const createTask = (
    task: Omit<Task, "id" | "completed" | "created_at" | "updated_at">
) => {
    return fetcher<Task>({
        url: `/tasks/`,
        method: "POST",
        body: JSON.stringify(task)
    })
}

const updateTask = (
    id: string,
    task: Partial<Task>
) => {
    return fetcher<Task>({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: JSON.stringify(task)
    })
}

const toggleTask = (
    id: string
): Promise<Task> => {
    return fetcher<Task>({
        url: `/tasks/toggle/${id}`,
        method: "PATCH"
    })
}

const deleteTask = (
    id: string
): Promise<{ message: string }> => {
    return fetcher<{ message: string }>({
        url: `/tasks/${id}`,
        method: "DELETE"
    })
}

export {
    getTasks,
    getTask,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
}