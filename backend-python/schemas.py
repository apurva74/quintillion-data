from pydantic import BaseModel, EmailStr

class RegisterUser(BaseModel):
    fullName: str
    email: EmailStr
    password: str
    age: int
    occupation: str
    mobile: str

class LoginUser(BaseModel):
    email: EmailStr
    password: str
