# ⚡ Quick Start Guide

## 🚀 Get Your Digital Business Card Live in 5 Minutes!

### Step 1: Update Your Contact Info (2 minutes)
Open `app.js` and update lines 6-10:

```javascript
const CONFIG = {
    phone: '+919876543210',        // ← Your phone number
    email: 'anil@microsystem.com', // ← Your email
    whatsapp: '+919876543210',     // ← Your WhatsApp number
    address: 'https://maps.app.goo.gl/oXcpq6PGmiiR53vc8', // ← Your Google Maps link
};
```

Also update the vCard section (lines 13-20) with the same information.

---

### Step 2: Test Locally (1 minute)

**The server is already running!** Just open your browser:

👉 **http://localhost:8000**

Test these features:
- ✅ Click all action buttons (Call, WhatsApp, Email, SMS)
- ✅ Click address to open Google Maps
- ✅ Click QR code button to see QR code
- ✅ Click "Add to Contact" to download vCard
- ✅ Try the share button

---

### Step 3: Deploy (2 minutes)

#### Option A: Vercel (Easiest)
```bash
npx vercel
```
Follow the prompts, and you're live! 🎉

#### Option B: Netlify Drop
1. Go to https://app.netlify.com/drop
2. Drag and drop this entire folder
3. Done! Your site is live! 🎉

#### Option C: GitHub Pages
```bash
# Create a new repository on GitHub, then:
git init
git add .
git commit -m "Digital Business Card"
git remote add origin YOUR_REPO_URL
git push -u origin main

# Enable GitHub Pages in repository settings
```

---

### Step 4: Install on Your Phone (30 seconds)

1. Open your deployed URL on your phone
2. Look for "Add to Home Screen" option
3. Tap it and confirm
4. Open from home screen
5. **You now have your own business card app!** 📱

---

### Step 5: Share Your Card! 🎊

**Your digital business card is ready!**

Share it via:
- 📱 QR Code (tap QR button in app)
- 🔗 Direct URL (your deployment URL)
- 📧 Email signature
- 💬 Social media
- 🖨️ Print QR code on physical cards

---

## 🎯 That's It!

You now have a **premium, installable, offline-capable digital business card** that works on all devices!

---

## 📚 Need More Help?

- **Full Documentation**: See README.md
- **Testing Guide**: See TESTING.md
- **Deployment Details**: See DEPLOYMENT.md
- **Project Overview**: See PROJECT_SUMMARY.md

---

## ⚙️ Optional Enhancements

### Generate Better Icons (5 minutes)
1. Open `icon-generator.html` in your browser
2. Upload `logo.jpg`
3. Click "Generate Icons"
4. Download all sizes
5. Replace the SVG files in `icons/` folder with PNG files
6. Update `manifest.json` to use `.png` instead of `.svg`

### Add Custom Domain (10 minutes)
See DEPLOYMENT.md for instructions on adding your custom domain.

---

## 🆘 Troubleshooting

**Server not running?**
```bash
python -m http.server 8000
```

**Can't deploy?**
- Make sure you're in the project directory
- Check you have internet connection
- Try a different deployment platform

**Buttons not working?**
- Check browser console for errors
- Verify you updated contact info in app.js
- Make sure you're testing on http://localhost:8000 (not file://)

---

## ✅ Success Checklist

- [ ] Updated contact info in app.js
- [ ] Tested locally - all buttons work
- [ ] Deployed to production
- [ ] Tested on mobile device
- [ ] Installed to home screen
- [ ] Shared with first contact

---

**🎉 Enjoy your new digital business card!**

**No more paper cards • Always up-to-date • Eco-friendly • Professional**
