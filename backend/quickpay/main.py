from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message: Hello World"}

@app.get("/greet/{name}")
async def greet(name: Optional[str] = "User", age: int = 0) -> dict:
    return {"message": f"Hello, {name}!"} 