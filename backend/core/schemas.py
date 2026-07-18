from pydantic import BaseModel
from datetime import datetime
from uuid import UUID

class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    completed: bool = False
    priority: int = 1
    category: str | None = None
    due_date: datetime | None = None

class TaskResponse(TaskCreate):
    id: UUID
    completed: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_atributes = True

class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    priority: int | None = None
    category: str | None = None
    due_date: datetime | None = None
    completed: bool | None = None
