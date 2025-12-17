@echo off
echo ================================
echo DeepNeurax Content Seeder
echo ================================
echo.

set /p TOKEN="Enter your Strapi API Token (from Settings > API Tokens): "

if "%TOKEN%"=="" (
    echo.
    echo ERROR: No token provided!
    echo Please create a token first:
    echo 1. Go to http://localhost:1337/admin
    echo 2. Settings ^> API Tokens
    echo 3. Create new token with Full Access
    echo.
    pause
    exit /b 1
)

echo.
echo Starting seed process...
echo.

set STRAPI_API_TOKEN=%TOKEN%
node seed.js

echo.
echo ================================
echo Done!
echo ================================
echo.
echo Don't forget to:
echo 1. Go to Content Manager
echo 2. Publish all created entries
echo.
pause
