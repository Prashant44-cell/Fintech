@echo off
echo ======================================================================
echo    AI-RESISTANT CONTINUOUS HUMAN IDENTITY VERIFICATION PLATFORM
echo ======================================================================
echo  1. Starting FastAPI Server on http://localhost:8000 ...
echo  2. Starting Student/Client Portal on http://localhost:3000 ...
echo  3. Starting Server/Admin Portal on http://localhost:3001 ...
echo ======================================================================

start "FastAPI Server (Port 8000)" cmd /k "cd backend && python run.py"
start "Client Portal (Port 3000)" cmd /k "cd client-app && npm run dev"
start "Admin Portal (Port 3001)" cmd /k "cd admin-app && npm run dev"

echo Launch completed! Open http://localhost:3000 for Client & http://localhost:3001 for Admin.
