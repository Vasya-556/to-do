import { UpdateTask as UpdateTaskForm } from "@/src/components/index";
import { taskService } from "@/src/services/index";

type Props = {
    params: Promise<{
        id: string
    }>
}

const UpdateTask = async ({
    params
}: Props) => {
    const { id } = await params
    const task = await taskService.getTask(id)

    return (
        <UpdateTaskForm
            task={task}
        />
    )
}

export default UpdateTask