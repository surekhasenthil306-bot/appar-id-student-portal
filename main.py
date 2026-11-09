"""
main.py — FastAPI Application Entry Point for APAAR Portal Backend
===================================================================
BEGINNER EXPLANATION:
  This file starts the FastAPI server.
  - Creates the SQLite database tables automatically on launch.
  - Adds CORS middleware so your React frontend (on port 3000) can communicate
    with this backend (on port 8000) without browser security blocks.
  - Registers all the route groups (/auth, /students, /documents, etc.).
  - Provides a welcoming root endpoint '/' and health check '/health'.
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from database import engine, Base
import models  # Ensures all tables are registered before create_all

# Import all modular routers
from routers.auth import router as auth_router
from routers.students import router as students_router
from routers.documents import router as documents_router
from routers.notifications import router as notifications_router
from routers.verification import router as verification_router
from routers.grievances import router as grievances_router

# 1. Initialize SQLite Database Tables
Base.metadata.create_all(bind=engine)

# 2. Initialize FastAPI Application
app = FastAPI(
    title="APAAR Student Portal API",
    description=(
        "Government of India • Ministry of Education & AICTE Student Depository Simulation.\n"
        "Educational & demonstration backend supporting student profiling, 12-digit APAAR verification, "
        "document tracking, AICTE notifications, and grievance resolution."
    ),
    version="1.0.0",
    docs_url="/docs",      # Interactive Swagger UI documentation
    redoc_url="/redoc"    # Alternative ReDoc documentation
)

# 3. Configure CORS (Cross-Origin Resource Sharing)
# Allows the React frontend running on Vite (localhost:3000) to make API requests
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Attach Routers to the App
app.include_router(auth_router)
app.include_router(students_router)
app.include_router(documents_router)
app.include_router(notifications_router)
app.include_router(verification_router)
app.include_router(grievances_router)


@app.get("/api", tags=["Root"])
@app.get("/api/status", tags=["Root"])
def root_status():
    """
    Root status endpoint displaying API operational parameters and legal disclaimer.
    """
    return {
        "portal": "APAAR Portal Backend Service",
        "authority": "Ministry of Education & AICTE Simulation",
        "institution": "Sri Krishna College of Engineering and Technology, Coimbatore",
        "status": "online",
        "version": "1.0.0",
        "documentation": "/docs",
        "disclaimer": (
            "This service is an educational demonstration prototype. "
            "Verification and credit transfer ledger operations are simulated locally "
            "and do not interface with production UIDAI / National Academic Depository infrastructure."
        ),
        "endpoints": {
            "authentication": "/auth/login, /auth/register, /auth/me",
            "students": "/students/me, /students/{apaar_id}",
            "documents": "/documents/my, /documents/",
            "notifications": "/notifications/",
            "verification": "/verification/{apaar_id}, /verification/status/me",
            "grievances": "/grievances/my, /grievances/"
        }
    }


@app.get("/health", tags=["Root"])
def health_check():
    """Health check endpoint for status monitoring."""
    return {"status": "healthy", "database": "sqlite_connected"}


# Locate frontend dist directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "dist"))
ASSETS_DIR = os.path.join(DIST_DIR, "assets")

if os.path.exists(ASSETS_DIR):
    app.mount("/assets", StaticFiles(directory=ASSETS_DIR), name="assets")


@app.get("/{full_path:path}", include_in_schema=False)
async def serve_frontend(full_path: str):
    """
    Serves the React frontend Single Page Application (SPA).
    - If a specific static asset exists, serve it.
    - Otherwise, serve index.html for client-side routing.
    """
    file_path = os.path.join(DIST_DIR, full_path)
    if full_path and os.path.isfile(file_path):
        return FileResponse(file_path)
    
    index_file = os.path.join(DIST_DIR, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return {"message": "Frontend build not found. Please run 'npm run build'."}


if __name__ == "__main__":
    import uvicorn
    # Runs backend server on port 8000
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
