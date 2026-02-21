import os
import requests
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI

# ========================
# CONFIG
# ========================

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY,
)

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========================
# RESUME CONTEXT
# ========================

RESUME_CONTEXT = """
Huda Khan is an MCA student skilled in:

- Python
- FastAPI
- Machine Learning
- React
- Node.js
- Java
- MySQL
- REST API Development
- AI Projects

Projects:
1. AI Resume Builder
2. AI Portfolio Chatbot
3. Pong Game using Python

She is passionate about backend development and AI.
"""

# ========================
# ROUTES
# ========================

@app.get("/")
def home():
    return {"message": "Backend Running 🚀"}


# ========================
# CHAT ENDPOINT
# ========================

@app.post("/chat")
async def chat(data: dict):
    user_message = data.get("message")

    completion = client.chat.completions.create(
        model="openrouter/auto",
        messages=[
            {
                "role": "system",
                "content": f"""
You are an AI assistant answering questions about this person.

Resume:
{RESUME_CONTEXT}

Always answer based on the resume.
If question unrelated, respond politely.
"""
            },
            {
                "role": "user",
                "content": user_message
            }
        ],
    )

    reply = completion.choices[0].message.content
    return {"reply": reply}


# ========================
# FILE UPLOAD (Optional)
# ========================

@app.post("/upload")
async def upload(file: UploadFile = File(...)):

    url = "https://catbox.moe/user/api.php"

    response = requests.post(
        url,
        data={"reqtype": "fileupload"},
        files={"fileToUpload": (file.filename, file.file)},
    )

    return {"file_url": response.text}