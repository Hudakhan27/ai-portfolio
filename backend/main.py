
from fastapi import FastAPI
from pydantic import BaseModel
import requests
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENROUTER_KEY = "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"

resume_data = """
Name: Huda Khan

Skills:
Python, FastAPI, React, MySQL, REST APIs

Projects:
1. AI Resume Builder
2. Pong Game using Python
3. AI Portfolio Chatbot

Experience:
Python Developer Intern
"""

class ChatRequest(BaseModel):
    message: str


@app.post("/chat")
def chat(req: ChatRequest):

    prompt = f"""
You are an AI assistant for a portfolio website.

Candidate Information:
{resume_data}

User Question:
{req.message}
"""

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "mistralai/mistral-7b-instruct",
            "messages": [
                {"role": "user", "content": prompt}
            ]
        }
    )

    data = response.json()

    reply = data["choices"][0]["message"]["content"]

    return {"reply": reply}
