import pytest, os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from fastapi.testclient import TestClient

from core.main import core
from core.database import Base
from core.dependencies import get_db
from dotenv import load_dotenv

load_dotenv()

TEST_DATABASE_URL = os.getenv("TEST_DATABASE_URL")

engine = create_engine(TEST_DATABASE_URL)

TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

@pytest.fixture()
def db():
    Base.metadata.create_all(
        bind=engine
    )

    db = TestingSessionLocal()

    try:
        yield db
    finally:
        db.close()

        Base.metadata.drop_all(
            bind=engine
        )

@pytest.fixture()
def client(db):
    def override_get_db():
        try:
            yield db
        finally:
            pass

    core.dependency_overrides[get_db] = override_get_db

    with TestClient(core) as client:
        yield client

    core.dependency_overrides.clear()

def test_get_tasks_empty(client):
    response = client.get("/tasks/")

    assert response.status_code == 200
    assert response.json() == []

def test_create_task(client):
    response = client.post(
        "/tasks/",
        json={
            "title": "Test task",
            "description": "Description",
            "priority": 5,
            "category": "Work"
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert data["title"] == "Test task"
    assert data["priority"] == 5
    assert data["completed"] is False

def test_get_tasks(client):
    client.post(
        "/tasks/",
        json={
            "title": "Task 1",
            "priority": 1
        }
    )

    response = client.get("/tasks/")

    assert response.status_code == 200
    assert len(response.json()) == 1

def test_delete_task(client):
    create = client.post(
        "/tasks/",
        json={
            "title": "Delete me",
            "priority": 1
        }
    )

    task_id = create.json()["id"]

    response = client.delete(
        f"/tasks/{task_id}"
    )

    assert response.status_code == 200

    tasks = client.get("/tasks/").json()

    assert len(tasks) == 0

def test_search_tasks(client):
    client.post(
        "/tasks/",
        json={
            "title": "Shopping list",
            "description": "Buy milk",
            "priority": 2
        }
    )

    client.post(
        "/tasks/",
        json={
            "title": "Programming",
            "description": "Write code",
            "priority": 3
        }
    )

    response = client.get(
        "/tasks/?search=milk"
    )

    assert response.status_code == 200

    tasks = response.json()

    assert len(tasks) == 1
    assert tasks[0]["title"] == "Shopping list"

def test_toggle_task_done(client):
    create = client.post(
        "/tasks/",
        json={
            "title": "Complete me",
            "priority": 1
        }
    )

    task_id = create.json()["id"]

    response = client.patch(
        f"/tasks/toggle/{task_id}"
    )

    assert response.status_code == 200

    assert response.json()["completed"] is True

def test_filter_done_tasks(client):
    done = client.post(
        "/tasks/",
        json={
            "title": "Done task",
            "priority": 1
        }
    )

    done_id = done.json()["id"]

    client.patch(
        f"/tasks/toggle/{done_id}"
    )

    client.post(
        "/tasks/",
        json={
            "title": "Undone task",
            "priority": 2
        }
    )

    response = client.get(
        "/tasks/?completed=done"
    )

    tasks = response.json()

    assert len(tasks) == 1
    assert tasks[0]["completed"] is True

def test_filter_undone_tasks(client):
    response = client.get(
        "/tasks/?completed=undone"
    )

    assert response.status_code == 200

    assert response.json() == []

def test_filter_all_tasks(client):
    client.post(
        "/tasks/",
        json={
            "title": "Task",
            "priority": 1
        }
    )

    response = client.get(
        "/tasks/?completed=all"
    )

    assert response.status_code == 200
    assert len(response.json()) == 1

def test_priority_range_min(client):
    response = client.post(
        "/tasks/",
        json={
            "title": "Low priority",
            "priority": 1
        }
    )

    assert response.status_code == 200
    assert response.json()["priority"] == 1

def test_priority_range_max(client):
    response = client.post(
        "/tasks/",
        json={
            "title": "High priority",
            "priority": 10
        }
    )

    assert response.status_code == 200
    assert response.json()["priority"] == 10

def test_priority_too_low(client):
    response = client.post(
        "/tasks/",
        json={
            "title": "Invalid",
            "priority": 0
        }
    )

    assert response.status_code == 422

def test_priority_too_high(client):
    response = client.post(
        "/tasks/",
        json={
            "title": "Invalid",
            "priority": 11
        }
    )

    assert response.status_code == 422

def test_sort_priority_ascending(client):
    client.post(
        "/tasks/",
        json={
            "title": "High",
            "priority": 10
        }
    )

    client.post(
        "/tasks/",
        json={
            "title": "Low",
            "priority": 1
        }
    )

    response = client.get(
        "/tasks/?sort_priority=asc"
    )

    tasks = response.json()

    assert tasks[0]["priority"] == 1
    assert tasks[1]["priority"] == 10

def test_sort_priority_descending(client):
    client.post(
        "/tasks/",
        json={
            "title": "Low",
            "priority": 1
        }
    )

    client.post(
        "/tasks/",
        json={
            "title": "High",
            "priority": 10
        }
    )

    response = client.get(
        "/tasks/?sort_priority=desc"
    )

    tasks = response.json()

    assert tasks[0]["priority"] == 10
    assert tasks[1]["priority"] == 1

def test_get_nonexistent_task(client):
    response = client.get(
        "/tasks/00000000-0000-0000-0000-000000000000"
    )

    assert response.status_code == 404

def test_delete_nonexistent_task(client):
    response = client.delete(
        "/tasks/00000000-0000-0000-0000-000000000000"
    )

    assert response.status_code == 404

def test_toggle_nonexistent_task(client):
    response = client.patch(
        "/tasks/toggle/00000000-0000-0000-0000-000000000000"
    )

    assert response.status_code == 404