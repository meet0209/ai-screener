# AI Screener - Quick Deploy Guide

## ✅ STATUS: Code on GitHub!
**Repository:** https://github.com/meet0209/ai-screener

---

## 🚀 DEPLOY NOW (30 minutes to live)

### Step 1: Setup Free Databases (10 min)

#### MongoDB Atlas:
1. Visit: https://www.mongodb.com/cloud/atlas/register
2. Sign up → Create free M0 cluster
3. Database Access → Add User:
   - Username: `admin`
   - Password: `admin123` (save this!)
4. Network Access → Add IP: `0.0.0.0/0` (allow all)
5. Connect → Get connection string:
   ```
   mongodb+srv://admin:admin123@cluster0.xxxxx.mongodb.net/ai-screener?retryWrites=true&w=majority
   ```

#### Upstash Redis:
1. Visit: https://console.upstash.com/
2. Sign up → Create database
3. Copy REST URL (it's like: `redis://default:xxx@xxx.upstash.io:6379`)

---

### Step 2: Deploy Backend to Render (10 min)

1. Visit: https://dashboard.render.com/
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect repository: `meet0209/ai-screener`
5. Configure:
   - **Name:** `ai-screener-api`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

6. **Add Environment Variables:**
   ```
   GEMINI_API_KEY=AIzaSyDmIChcHCIEfwv_L4MrLtAU8EgpEBclXSU
   MONGODB_URI=<paste-from-mongodb-atlas>
   REDIS_URL=<paste-from-upstash>
   JWT_SECRET=my-super-secret-jwt-key-2025
   NODE_ENV=production
   PORT=5000
   ```

7. Click "Create Web Service"
8. Wait 5-10 minutes for deployment
9. Copy your API URL (e.g., `https://ai-screener-api.onrender.com`)

---

### Step 3: Deploy Frontend to Render (10 min)

1. Same Render dashboard → "New +" → "Static Site"
2. Connect repository: `meet0209/ai-screener`
3. Configure:
   - **Name:** `ai-screener-app`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

4. **Add Environment Variable:**
   ```
   VITE_API_URL=<your-backend-url-from-step-2>
   ```
   Example: `VITE_API_URL=https://ai-screener-api.onrender.com`

5. Click "Create Static Site"
6. Wait 5-10 minutes
7. **YOUR APP IS LIVE!** 🎉

---

## 🎬 TEST IT LIVE

Your Frontend URL: `https://ai-screener-app.onrender.com`

**Try:**
1. Register a new account
2. Login
3. Upload a resume (any PDF)
4. See AI-generated summary (powered by Gemini!)

---

## 📹 RECORD VIDEO DEMO

### Quick Script (10-15 min video):

**1. Introduction (1 min)**
```
"Hi, this is AI Screener - an automated hiring platform with AI-powered resume screening.
I've integrated Google Gemini AI to replace OpenAI.
Let me show you the live application."
```

**2. Show GitHub Repo (2 min)**
- Open https://github.com/meet0209/ai-screener
- Show backend/src/services/geminiProvider.ts
- Explain Gemini integration

**3. Show Live App (5 min)**
- Open your Render URL
- Register → Login
- Upload resume
- Show AI summary generation
- Show it's using Gemini API

**4. Show Deployment (2 min)**
- Open Render dashboard
- Show both services running
- Show environment variables configured

**5. Conclusion (1 min)**
```
"The application is live, using Google Gemini for AI features.
All code is on GitHub and deployed to Render's free tier.
Ready for production use."
```

### Recording Tools:
- **OBS Studio:** https://obsproject.com/download (best quality)
- **Loom:** https://www.loom.com/ (easiest, max 5 min free)
- **Windows Game Bar:** Win + G (built-in)

---

## ✅ SUBMISSION CHECKLIST

- [x] Gemini API integrated
- [x] Code on GitHub
- [ ] MongoDB Atlas setup
- [ ] Upstash Redis setup
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Render
- [ ] App tested live
- [ ] Video recorded
- [ ] Submitted to client

---

## 📞 SUPPORT

**If deployment fails:**
- Check Render logs (click on your service → "Logs")
- Verify environment variables are correct
- Make sure MongoDB/Redis URLs are correct
- Render free tier may take 5-10 min to deploy

**Common Issues:**
- Build fails → Check package.json paths
- Can't connect to DB → Verify MongoDB allows all IPs (0.0.0.0/0)
- Frontend can't reach backend → Check VITE_API_URL matches backend URL

---

**Next:** Deploy databases → Deploy to Render → Record video → Submit! 🚀
