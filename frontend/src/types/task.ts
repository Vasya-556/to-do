type Task = {
    id: string
    title: string
    description: string | null
    completed: boolean
    priority: number
    category: string | null
    due_date: string | null
    created_at: string
    updated_at: string
}

export type {
    Task
}