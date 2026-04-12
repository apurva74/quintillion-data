from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router

app = FastAPI()

# ✅ ROOT ROUTE
@app.get("/")
def home():
    return {"message": "Backend is running successfully"}

# ✅ FIXED CORS
origins = [
    "http://localhost:3000",
    "https://quintillion-data.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)