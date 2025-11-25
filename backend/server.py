from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import random

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Candidate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    role: str
    skills: List[str]
    experience_years: int
    location: str
    salary_min: int
    salary_max: int
    status: str  # New, Interviewing, Hired, Rejected
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CandidateCreate(BaseModel):
    name: str
    email: str
    phone: str
    role: str
    skills: List[str]
    experience_years: int
    location: str
    salary_min: int
    salary_max: int
    status: str = "New"

class CandidateUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    role: Optional[str] = None
    skills: Optional[List[str]] = None
    experience_years: Optional[int] = None
    location: Optional[str] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    status: Optional[str] = None

# Routes
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: dict):
    status_obj = StatusCheck(client_name=input.get("client_name", "Unknown"))
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj

# Candidate Routes
@api_router.get("/candidates", response_model=List[Candidate])
async def get_candidates():
    candidates = await db.candidates.find({}, {"_id": 0}).to_list(1000)
    for c in candidates:
        if isinstance(c.get('created_at'), str):
            c['created_at'] = datetime.fromisoformat(c['created_at'])
    return candidates

@api_router.post("/candidates", response_model=Candidate)
async def create_candidate(candidate: CandidateCreate):
    candidate_obj = Candidate(**candidate.model_dump())
    doc = candidate_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.candidates.insert_one(doc)
    return candidate_obj

@api_router.put("/candidates/{candidate_id}", response_model=Candidate)
async def update_candidate(candidate_id: str, update_data: CandidateUpdate):
    # Filter out None values
    update_dict = {k: v for k, v in update_data.model_dump().items() if v is not None}
    
    if not update_dict:
        raise HTTPException(status_code=400, detail="No data to update")

    result = await db.candidates.update_one(
        {"id": candidate_id},
        {"$set": update_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Candidate not found")
        
    updated_candidate = await db.candidates.find_one({"id": candidate_id}, {"_id": 0})
    if isinstance(updated_candidate.get('created_at'), str):
        updated_candidate['created_at'] = datetime.fromisoformat(updated_candidate['created_at'])
        
    return updated_candidate

@api_router.delete("/candidates/{candidate_id}")
async def delete_candidate(candidate_id: str):
    result = await db.candidates.delete_one({"id": candidate_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return {"message": "Candidate deleted successfully"}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_db_client():
    # Clear existing data to ensure Indian context data is loaded
    # In a real app, we wouldn't drop everything on startup, but for this demo request it's necessary
    # to replace the old dummy data with the new Indian context data.
    # We'll check if the first record is "Sarah Chen" (old data) to decide whether to wipe.
    
    first_candidate = await db.candidates.find_one({})
    if first_candidate and first_candidate.get("name") == "Sarah Chen":
        logger.info("Detected old dummy data. Clearing database for new Indian context data...")
        await db.candidates.delete_many({})
    
    count = await db.candidates.count_documents({})
    if count == 0:
        logger.info("Seeding database with Indian context candidates...")
        dummy_data = [
            {
                "name": "Aarav Patel",
                "email": "aarav.patel@example.in",
                "phone": "+91 98765 43210",
                "role": "Senior Frontend Engineer",
                "skills": ["React", "TypeScript", "Next.js", "Tailwind CSS"],
                "experience_years": 6,
                "location": "Bengaluru, Karnataka",
                "salary_min": 2500000,
                "salary_max": 3500000,
                "status": "Interviewing"
            },
            {
                "name": "Diya Sharma",
                "email": "diya.sharma@example.in",
                "phone": "+91 99887 76655",
                "role": "Product Manager",
                "skills": ["Agile", "JIRA", "Product Strategy", "User Research"],
                "experience_years": 8,
                "location": "Gurugram, Haryana",
                "salary_min": 3000000,
                "salary_max": 4500000,
                "status": "New"
            },
            {
                "name": "Rohan Gupta",
                "email": "rohan.gupta@example.in",
                "phone": "+91 91234 56789",
                "role": "UX Designer",
                "skills": ["Figma", "Prototyping", "User Testing", "Adobe XD"],
                "experience_years": 4,
                "location": "Mumbai, Maharashtra",
                "salary_min": 1500000,
                "salary_max": 2200000,
                "status": "Hired"
            },
            {
                "name": "Ananya Reddy",
                "email": "ananya.reddy@example.in",
                "phone": "+91 88776 65544",
                "role": "Backend Developer",
                "skills": ["Python", "FastAPI", "PostgreSQL", "Docker"],
                "experience_years": 5,
                "location": "Hyderabad, Telangana",
                "salary_min": 2000000,
                "salary_max": 2800000,
                "status": "Rejected"
            },
            {
                "name": "Vikram Singh",
                "email": "vikram.singh@example.in",
                "phone": "+91 77665 54433",
                "role": "Data Scientist",
                "skills": ["Python", "TensorFlow", "SQL", "Machine Learning"],
                "experience_years": 3,
                "location": "Pune, Maharashtra",
                "salary_min": 1800000,
                "salary_max": 2400000,
                "status": "New"
            },
            {
                "name": "Meera Iyer",
                "email": "meera.iyer@example.in",
                "phone": "+91 99001 12233",
                "role": "DevOps Engineer",
                "skills": ["AWS", "Kubernetes", "Terraform", "CI/CD"],
                "experience_years": 7,
                "location": "Chennai, Tamil Nadu",
                "salary_min": 2800000,
                "salary_max": 4000000,
                "status": "Interviewing"
            },
            {
                "name": "Arjun Nair",
                "email": "arjun.nair@example.in",
                "phone": "+91 98112 23344",
                "role": "Marketing Manager",
                "skills": ["SEO", "Content Strategy", "Google Analytics", "Social Media"],
                "experience_years": 5,
                "location": "Noida, UP",
                "salary_min": 1500000,
                "salary_max": 2000000,
                "status": "New"
            },
            {
                "name": "Sanya Malhotra",
                "email": "sanya.m@example.in",
                "phone": "+91 97223 34455",
                "role": "Sales Representative",
                "skills": ["CRM", "Negotiation", "Lead Generation", "B2B Sales"],
                "experience_years": 2,
                "location": "Delhi, NCR",
                "salary_min": 800000,
                "salary_max": 1200000,
                "status": "New"
            }
        ]
        
        for data in dummy_data:
            candidate_obj = Candidate(**data)
            doc = candidate_obj.model_dump()
            doc['created_at'] = doc['created_at'].isoformat()
            await db.candidates.insert_one(doc)
        logger.info(f"Seeded {len(dummy_data)} candidates with Indian context.")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
