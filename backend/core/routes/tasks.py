from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from ..dependencies import get_db
from ..models import Task
from ..schemas import TaskCreate, TaskResponse, TaskUpdate

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.get("/", response_model=list[TaskResponse])
def get_tasks(
        search: str | None = None,
        completed: str = Query("all", enum=["all", "done", "undone"]),
        sort_priority: str | None = Query(None, enum=["asc", "desc"]),
        db: Session = Depends(get_db)
    ):
    query = db.query(Task)

    if search:
        query = query.filter(
            Task.title.ilike(f"%{search}%") |
            Task.description.ilike(f"%{search}%")
        )

    if completed == "done":
        query = query.filter(Task.completed == True)

    elif completed == "undone":
        query = query.filter(Task.completed == False)

    if sort_priority == "asc":
        query = query.order_by(Task.priority.asc())

    elif sort_priority == "desc":
        query = query.order_by(Task.priority.desc())

    return query.all()

@router.post("/", response_model=TaskResponse)
def create_task(
        task: TaskCreate,
        db: Session = Depends(get_db)
    ):
    new_task = Task(**task.model_dump())

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task

@router.delete("/{task_id}")
def delete_task(
        task_id: str,
        db: Session = Depends(get_db)
    ):
    task = (
        db.query(Task)
        .filter(Task.id == task_id)
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    db.delete(task)
    db.commit()

    return {
        "message": "Task deleted"
    }

@router.patch("/{task_id}", response_model=TaskResponse)
def update_task(
        task_id: str,
        task_data: TaskUpdate,
        db: Session = Depends(get_db)
    ):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    for key, value in task_data.model_dump(exclude_unset=True).items():
        setattr(task, key, value)

    db.commit()
    db.refresh(task)

    return task

@router.patch("/toggle/{task_id}", response_model=TaskResponse)
def toggle_task(
        task_id: str,
        db: Session = Depends(get_db)
    ):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    task.completed = not task.completed

    db.commit()
    db.refresh(task)

    return task