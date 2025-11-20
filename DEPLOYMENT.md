# AI Screener - Deployment Guide

## 🚀 Quick Deployment Status

**✅ Gemini API Integrated**
- Replaced OpenA with Google Gemini API
- Using Gemini 1.5 Flash model
- API Key configured

**✅ Code Ready for Deployment**
- Backend uses tsx for ES modules
- Frontend React + Vite ready
- Docker-compose available

---

## 🎯 Next Steps to Deploy Live

### Option 1: Render.com (Recommended - FREE)

**Backend:**
1. Go to https://render.com
2. "New" → "Web Service"
3. Connect GitHub repo: `meet0209/ai-screener`
4. Settings:
   - Name: `ai-screener-backend`
   - Environment: `Node`
   - Build: `cd backend && npm install`
   - Start: `cd backend && npm run start`
   - Instance: Free

5. **Environment Variables:**
   ```
   GEMINI_API_KEY=AIzaSyDmIChcHCIEfwv_L4MrLtAU8EgpEBclXSU
   MONGODB_URI=(Get from MongoDB Atlas - free)
   REDIS_URL=(Get from Upstash - free)
   JWT_SECRET=super-secret-change-in-prod
   NODE_ENV=production
   ```

**Frontend:**
1. Same process but choose "Static Site"
2. Build: `cd frontend && npm install && npm run build`
3. Publish: `frontend/dist`

### Option 2: Railway.app (Easiest - FREE)

1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub"
3. Select `ai-screener` repo
4. Auto-detects docker-compose
5. Add environment variables
6. Deploy!

### Option 3: Vercel (Frontend) + Render (Backend)

**Frontend on Vercel:**
```bash
cd frontend
vercel --prod
```

**Backend on Render:** (same as Option 1)

---

## 📊 Free Database Setup

### MongoDB Atlas (Required)
1. Go to https://cloud.mongodb.com/
2. Create free cluster
3. Get connection string
4. Add to MONGODB_URI

### Upstash Redis (Required)
1. Go to https://upstash.com/
2. Create free database  
3. Get connection string
4. Add to REDIS_URL

---

## 🎬 For Video Demo

**Show:**
1. GitHub repo with code
2. Deployment platform dashboard
3. Live URL working
4. Features demo:
   - User registration
   - Resume upload
   - AI screening
   - Results display

**Recording:**
- Use OBS Studio or Loom
- 10-15 minute walkthrough
- Show code + live site

---

## ⏰ Timeline

- **Now:** Push to GitHub
- **Next 2 hours:** Deploy to Render/Railway
- **Tomorrow:** Record video demonstration
- **Monday:** Submit to client

**Your deadline: Tuesday** ✅ On track!
