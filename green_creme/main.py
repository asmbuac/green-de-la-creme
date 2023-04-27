from fastapi import FastAPI
from routers import forum, blogs, accounts, comments, replies, likes
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(blogs.router)
app.include_router(forum.router)
app.include_router(accounts.router)
app.include_router(comments.router)
app.include_router(replies.router)
app.include_router(likes.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
