@echo off
echo ======================================================================
echo    NEXUS BLOCKBANK - AI-POWERED BLOCKCHAIN CORE BANKING PLATFORM
echo ======================================================================
echo  1. Starting FastAPI Core Banking Engine on http://localhost:8000 ...
echo  2. Starting Customer Banking Portal on http://localhost:3000 ...
echo  3. Starting Central Bank Regulatory Command Center on http://localhost:3001 ...
echo ======================================================================

start "FastAPI Core Banking (Port 8000)" cmd /k "cd backend && python run.py"
start "Customer Banking Portal (Port 3000)" cmd /k "cd client-app && npm run dev"
start "Central Bank Command Center (Port 3001)" cmd /k "cd admin-app && npm run dev"

echo Launch completed! Open http://localhost:3000 for Customer Banking & http://localhost:3001 for Central Bank Regulatory Node.
