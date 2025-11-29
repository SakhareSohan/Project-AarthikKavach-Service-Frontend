# CORS Configuration Required

## The Problem
Your frontend (`https://preview--aarthik-guardian-suite.lovable.app`) cannot access your backend API (`https://e7bbb8a4ae2e.ngrok-free.app`) due to CORS (Cross-Origin Resource Sharing) restrictions.

## Error You're Seeing
```
Access to fetch at 'https://e7bbb8a4ae2e.ngrok-free.app/api/v1/profile/...' 
from origin 'https://preview--aarthik-guardian-suite.lovable.app' 
has been blocked by CORS policy: Response to preflight request doesn't 
pass access control check: No 'Access-Control-Allow-Origin' header is 
present on the requested resource.
```

## Solution - Backend Configuration

You need to add CORS headers in your backend. Here are examples for different frameworks:

### Flask (Python)
```python
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# Option 1: Allow all origins (for development)
CORS(app)

# Option 2: Allow specific origin (recommended for production)
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://preview--aarthik-guardian-suite.lovable.app",
            "http://localhost:5173"  # For local development
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})
```

### Express (Node.js)
```javascript
const express = require('express');
const cors = require('cors');

const app = express();

// Option 1: Allow all origins (for development)
app.use(cors());

// Option 2: Allow specific origin (recommended for production)
app.use(cors({
  origin: [
    'https://preview--aarthik-guardian-suite.lovable.app',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
```

### FastAPI (Python)
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://preview--aarthik-guardian-suite.lovable.app",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Django (Python)
```python
# settings.py
INSTALLED_APPS = [
    # ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # ... other middleware
]

# Option 1: Allow all origins (for development)
CORS_ALLOW_ALL_ORIGINS = True

# Option 2: Allow specific origins (recommended for production)
CORS_ALLOWED_ORIGINS = [
    "https://preview--aarthik-guardian-suite.lovable.app",
    "http://localhost:5173",
]

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'origin',
]
```

## Ngrok Specific Configuration

If you're using **ngrok** (which you are), you might also need to:

1. **Start ngrok with custom headers:**
```bash
ngrok http 5000 --host-header=rewrite
```

2. **Or configure ngrok to add CORS headers:**
```bash
ngrok http 5000 --response-header-add="Access-Control-Allow-Origin:*"
```

## Quick Test
After configuring CORS, test with curl:
```bash
curl -X OPTIONS https://e7bbb8a4ae2e.ngrok-free.app/api/v1/profile/test \
  -H "Origin: https://preview--aarthik-guardian-suite.lovable.app" \
  -H "Access-Control-Request-Method: GET" \
  -v
```

You should see:
```
Access-Control-Allow-Origin: https://preview--aarthik-guardian-suite.lovable.app
```

## Production URLs to Add Later
When you deploy, also add these origins:
- Your production domain (if different from preview)
- Custom domain if you set one up

## Important Notes
1. **Never use `*` (allow all) in production** - specify exact origins
2. **Include both HTTP and HTTPS** versions if needed
3. **Restart your backend** after making CORS changes
4. **Check for middleware order** - CORS middleware should be first
