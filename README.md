# 📱 Micro System - Digital Business Card PWA

A modern, premium Progressive Web App (PWA) digital business card for **Anil Jani**, Founder & Owner at Micro System.

## ✨ Features

### 🎨 Premium Design
- **Full-cover logo background** with dark gradient overlay
- **Mobile-first responsive design** optimized for all devices
- **Smooth animations** and micro-interactions
- **Dark theme** with modern aesthetics
- **Premium glassmorphic effects**

### 📞 Quick Actions
- **Phone Call** - Direct calling functionality
- **WhatsApp** - Quick messaging on WhatsApp
- **Email** - Send email with pre-filled template
- **SMS** - Text messaging capability

### 📍 Location
- **Google Maps Integration** - Direct link to business address
- One-tap navigation to location

### 📲 Smart Features
- **Add to Contact** - Download vCard (.vcf) file
- **Share Card** - Web Share API with fallback to clipboard
- **QR Code** - Generate and display shareable QR code
- **PWA Installation** - Install as native app on mobile/desktop

### ⚡ PWA Capabilities
- **Offline Support** - Works without internet connection
- **Fast Performance** - Cached resources for instant loading
- **Installable** - Add to home screen on iOS and Android
- **App-like Experience** - Standalone display mode
- **Push Notifications** - Ready for future notifications (optional)

## 🚀 Quick Start

### 1. Setup Icons
Open `icon-generator.html` in your browser:
1. Select the `logo.jpg` file
2. Click "Generate Icons"
3. Download all generated icons
4. Place them in the `icons/` folder

### 2. Update Contact Information
Edit `app.js` and update the `CONFIG` object:

```javascript
const CONFIG = {
    name: 'Anil Jani',
    title: 'Founder & Owner',
    company: 'Micro System',
    phone: '+919876543210',        // Update this
    email: 'anil@microsystem.com', // Update this
    whatsapp: '+919876543210',     // Update this
    address: 'https://maps.app.goo.gl/oXcpq6PGmiiR53vc8',
    // ... rest of config
};
```

### 3. Deploy

#### Option A: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Option B: Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy
```

#### Option C: GitHub Pages
1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select branch and root folder
4. Save and wait for deployment

## 📁 Project Structure

```
micro-digital-business-card/
├── index.html              # Main HTML file
├── styles.css              # All styles
├── app.js                  # JavaScript functionality
├── manifest.json           # PWA manifest
├── service-worker.js       # Service worker for offline support
├── logo.jpg                # Company logo (background image)
├── qrcode.min.js          # QR code library
├── icon-generator.html     # Utility to generate icons
├── icons/                  # PWA icons (72, 96, 128, 144, 152, 192, 384, 512)
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png
│   ├── icon-384.png
│   └── icon-512.png
├── screenshots/            # PWA screenshots (optional)
│   ├── screenshot-1.png
│   └── screenshot-2.png
└── README.md              # This file
```

## 🎨 Customization

### Change Colors
Edit CSS variables in `styles.css`:

```css
:root {
    --color-accent: #3b82f6;        /* Primary accent color */
    --color-accent-hover: #2563eb;  /* Hover state */
    /* ... other colors */
}
```

### Change Logo Background
Replace `logo.jpg` with your own image. For best results:
- Use high-resolution image (at least 1080px wide)
- Ensure good contrast for text overlay
- Consider the gradient overlay effect

### Modify Layout
All layout components are in `index.html` with corresponding styles in `styles.css`.

## 📱 Testing PWA

### Desktop (Chrome/Edge)
1. Open DevTools (F12)
2. Go to Application tab
3. Check Manifest and Service Workers
4. Use Lighthouse for PWA audit

### Mobile
1. Open in mobile browser
2. Look for "Add to Home Screen" prompt
3. Install and test offline functionality

### PWA Checklist
- ✅ HTTPS (required for production)
- ✅ Valid manifest.json
- ✅ Service worker registered
- ✅ Icons in all required sizes
- ✅ Responsive design
- ✅ Offline support

## 🔧 Troubleshooting

### Icons not showing
1. Ensure all icon files exist in `icons/` folder
2. Check file names match manifest.json
3. Clear browser cache and reload

### Service Worker not registering
1. Must be served over HTTPS (or localhost)
2. Check browser console for errors
3. Verify service-worker.js path

### Install prompt not appearing
1. PWA criteria must be met (HTTPS, manifest, service worker)
2. User must visit site at least twice
3. Some browsers have different install UX

## 🌐 Browser Support

- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Safari (iOS 11.3+)
- ✅ Firefox (Desktop & Mobile)
- ✅ Samsung Internet
- ✅ Opera

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Support

For issues or questions, please contact:
- **Email**: anil@microsystem.com
- **Phone**: +91 9876543210

---

**Built with ❤️ using HTML, CSS, and JavaScript**

*No frameworks, no dependencies, just pure web technologies!*
