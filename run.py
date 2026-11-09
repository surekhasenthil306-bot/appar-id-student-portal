"""
Unified Application Runner for APAAR Student Portal
Serves both React Frontend and FastAPI Backend on a single port/URL.
"""
import os
import sys
import subprocess
import webbrowser

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(ROOT_DIR, "backend")
DIST_DIR = os.path.join(ROOT_DIR, "dist")

def check_frontend_build():
    if not os.path.exists(DIST_DIR) or not os.path.exists(os.path.join(DIST_DIR, "index.html")):
        print("[*] Building frontend assets...")
        subprocess.run(["npm.cmd", "run", "build"], cwd=ROOT_DIR, check=True)
        print("[+] Frontend build completed successfully.")

def main():
    check_frontend_build()
    
    # Ensure backend directory is in python module search path
    if BACKEND_DIR not in sys.path:
        sys.path.insert(0, BACKEND_DIR)
    
    port = int(os.getenv("PORT", 8000))
    url = f"http://localhost:{port}"

    print("=" * 70)
    print("  APAAR STUDENT PORTAL - UNIFIED FULL-STACK APPLICATION")
    print("=" * 70)
    print(f"  [+] Unified URL: {url}")
    print(f"  [+] Frontend:    {url}/")
    print(f"  [+] API Docs:    {url}/docs")
    print(f"  [+] Health:      {url}/health")
    print("=" * 70)
    print("  Press CTRL+C to stop the server at any time.\n")

    import uvicorn
    uvicorn.run("main:app", app_dir=BACKEND_DIR, host="0.0.0.0", port=port, reload=False)

if __name__ == "__main__":
    main()
