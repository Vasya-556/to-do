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
        <div className="flex justify-center">
            <UpdateTaskForm
                task={task}
            />
        </div>
    )
}

export default UpdateTask