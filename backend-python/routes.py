from fastapi import APIRouter, HTTPException, status, Body
from database import users_collection
from schemas import RegisterUser, LoginUser
from auth import hash_password, verify_password, create_token

from google.oauth2 import id_token
from google.auth.transport import requests
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")


# ---------------- REGISTER ----------------
@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: RegisterUser):

    existing = users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists"
        )

    if len(user.password) > 72:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be 72 characters or less"
        )

    hashed_password = hash_password(user.password)

    user_dict = user.dict()
    user_dict["password"] = hashed_password
    user_dict["provider"] = "local"   # 👈 important

    result = users_collection.insert_one(user_dict)

    return {
        "message": "User registered successfully",
        "user_id": str(result.inserted_id)
    }


# ---------------- LOGIN ----------------
@router.post("/login")
def login(user: LoginUser):

    db_user = users_collection.find_one({"email": user.email})

    if not db_user or db_user.get("provider") == "google":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    if len(user.password) > 72:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password too long"
        )

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    token = create_token({"email": user.email})

    return {
        "message": "Login successful",
        "token": token
    }


# ---------------- GOOGLE LOGIN ----------------
@router.post("/google-login")
def google_login(data: dict = Body(...)):

    token = data.get("token")

    try:
        # ✅ Verify Google token
        idinfo = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            GOOGLE_CLIENT_ID
        )

        email = idinfo["email"]
        name = idinfo.get("name")

        # ✅ Check if user exists
        user = users_collection.find_one({"email": email})

        if not user:
            users_collection.insert_one({
                "fullName": name,
                "email": email,
                "password": None,
                "age": 0,
                "occupation": "google_user",
                "mobile": "",
                "provider": "google"
            })

        jwt_token = create_token({"email": email})

        return {
            "message": "Google login successful",
            "token": jwt_token
        }

    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid Google token"
        )