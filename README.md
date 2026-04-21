# ☁️ Techofy Clouds — Coming Soon Page

Professional coming soon page with 3D animations, email waitlist, Telegram notifications, and live subscriber count.

---

## 📁 Project Structure

```
techofy-clouds/
├── index.html          ← Main frontend page
├── api/
│   ├── subscribe.js    ← POST /api/subscribe
│   └── count.js        ← GET  /api/count
├── package.json
├── vercel.json
└── README.md
```

---

## 🚀 Deployment on Vercel

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/techofy-clouds.git
git push -u origin main
```

### Step 2 — Import on Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repo
3. Click **Deploy** (no build settings needed)

### Step 3 — Set up Vercel KV (for subscriber storage)
1. In your Vercel project → **Storage** tab
2. Click **Create Database** → choose **KV**
3. Name it `techofy-kv` → **Create**
4. Click **Connect to Project** → connect your project
5. Vercel auto-adds the `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN` env vars

### Step 4 — Redeploy
After connecting KV, redeploy from Vercel dashboard (Deployments → Redeploy).

---

## ✅ Features

- 🎨 **3D CSS Animation** — rotating cube with orbiting rings
- 🌌 **Particle Background** — connected dot network animation
- 📧 **Email Subscription** — stored in Vercel KV (Redis)
- 🔔 **Telegram Notifications** — instant alert on new subscriber
- 👥 **Live Subscriber Count** — shown on page in real-time
- 🎉 **Confetti Animation** — on successful subscription
- 📱 **Fully Responsive** — mobile-first design
- ⚡ **No duplicate signups** — Redis Set prevents doubles

---

## 🔧 Telegram Config

Bot token and chat ID are hardcoded in `api/subscribe.js`.
To change them, edit the top of that file:

```js
const TELEGRAM_TOKEN  = 'YOUR_BOT_TOKEN';
const TELEGRAM_CHATID = 'YOUR_CHAT_ID';
```

---

## 📊 Viewing All Subscribers

In your Vercel KV dashboard, you can run:
```
SMEMBERS tc:subs
```
to see all subscribed emails.

---

Made with ❤️ for Techofy Clouds
