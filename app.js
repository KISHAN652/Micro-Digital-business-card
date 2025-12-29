// ===================================
// CONFIGURATION
// ===================================
const CONFIG = {
    name: 'Anil Jani',
    title: 'Founder & Owner',
    company: 'Micro System',
    phone: '+89 0987-2345-09', // Update with actual phone number
    email: 'info@microsystem.com', // Update with actual email
    whatsapp: '+919099074864', // Update with actual WhatsApp number
    address: 'https://maps.app.goo.gl/oXcpq6PGmiiR53vc8',
    website: window.location.href,

    // vCard data
    vcard: {
        firstName: 'Anil',
        lastName: 'Jani',
        organization: 'Micro System',
        title: 'Founder & Owner',
        workPhone: '+89 0987-2345-09',
        email: 'info@microsystem.com',
        url: window.location.href
    }
};

// ===================================
// DOM ELEMENTS
// ===================================
const elements = {
    // Action buttons
    callBtn: document.getElementById('callBtn'),
    whatsappBtn: document.getElementById('whatsappBtn'),
    emailBtn: document.getElementById('emailBtn'),
    smsBtn: document.getElementById('smsBtn'),
    addressBtn: document.getElementById('addressBtn'),

    // Bottom actions
    qrBtn: document.getElementById('qrBtn'),
    shareBtn: document.getElementById('shareBtn'),
    contactBtn: document.getElementById('contactBtn'),
    moreBtn: document.getElementById('moreBtn'),

    // Modals
    qrModal: document.getElementById('qrModal'),
    closeQrModal: document.getElementById('closeQrModal'),
    qrCode: document.getElementById('qrCode'),

    // Install prompt
    installPrompt: document.getElementById('installPrompt'),
    installBtn: document.getElementById('installBtn'),
    dismissInstall: document.getElementById('dismissInstall')
};

// ===================================
// PWA INSTALLATION
// ===================================
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Show install prompt immediately when page loads
    if (!localStorage.getItem('installDismissed')) {
        elements.installPrompt.classList.add('active');
    }
});

// Detect iOS specifically
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// Handle iOS Initial Prompt
window.addEventListener('load', () => {
    if (isIOS && !window.matchMedia('(display-mode: standalone)').matches) {
        if (!localStorage.getItem('installDismissed')) {
            elements.installPrompt.classList.add('active');
            const installBtn = document.getElementById('installBtn');
            if (installBtn) installBtn.textContent = 'How to Install?';
        }
    }
});

elements.installBtn?.addEventListener('click', async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    console.log(`User response to install prompt: ${outcome}`);
    deferredPrompt = null;
    elements.installPrompt.classList.remove('active');
});

elements.dismissInstall?.addEventListener('click', () => {
    elements.installPrompt.classList.remove('active');
    localStorage.setItem('installDismissed', 'true');
});

window.addEventListener('appinstalled', () => {
    console.log('PWA installed successfully');
    elements.installPrompt.classList.remove('active');
});

// ===================================
// SERVICE WORKER REGISTRATION
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// ===================================
// ACTION BUTTON HANDLERS
// ===================================
elements.callBtn?.addEventListener('click', () => {
    window.location.href = `tel:${CONFIG.phone}`;
    addHapticFeedback();
});

elements.whatsappBtn?.addEventListener('click', () => {
    const message = encodeURIComponent(`Hello ${CONFIG.name}, I found your digital business card!`);
    window.location.href = `https://wa.me/${CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`;
    addHapticFeedback();
});

elements.emailBtn?.addEventListener('click', () => {
    const subject = encodeURIComponent('Contact from Digital Business Card');
    const body = encodeURIComponent(`Hello ${CONFIG.name},\n\nI found your digital business card and would like to connect.\n\nBest regards`);
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
    addHapticFeedback();
});

elements.smsBtn?.addEventListener('click', () => {
    const message = encodeURIComponent(`Hello ${CONFIG.name}, I found your digital business card!`);
    window.location.href = `sms:${CONFIG.phone}${/iPhone|iPad|iPod/i.test(navigator.userAgent) ? '&' : '?'}body=${message}`;
    addHapticFeedback();
});

elements.addressBtn?.addEventListener('click', () => {
    window.open(CONFIG.address, '_blank');
    addHapticFeedback();
});

// ===================================
// QR CODE MODAL
// ===================================
elements.qrBtn?.addEventListener('click', () => {
    showQRCode();
    addHapticFeedback();
});

elements.closeQrModal?.addEventListener('click', () => {
    elements.qrModal.classList.remove('active');
});

elements.qrModal?.addEventListener('click', (e) => {
    if (e.target === elements.qrModal) {
        elements.qrModal.classList.remove('active');
    }
});

function showQRCode() {
    // Clear previous QR code
    elements.qrCode.innerHTML = '';

    // Calculate responsive size (max 256, min 160)
    const size = Math.min(256, Math.max(160, window.innerWidth - 140));

    // Generate new QR code
    new QRCode(elements.qrCode, {
        text: CONFIG.website,
        width: size,
        height: size,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    elements.qrModal.classList.add('active');
}

// Download QR Code
document.getElementById('downloadQrBtn')?.addEventListener('click', () => {
    addHapticFeedback();

    try {
        // Get the QR code canvas
        const qrCanvas = elements.qrCode.querySelector('canvas');

        if (qrCanvas) {
            // Convert canvas to blob and download
            qrCanvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${CONFIG.name.replace(/\s+/g, '_')}_QR_Code.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                showToast('✅ QR Code downloaded!');
            }, 'image/png');
        } else {
            showToast('❌ QR Code not found');
        }
    } catch (error) {
        console.error('Download error:', error);
        showToast('❌ Download failed');
    }
});

// Share QR Code
document.getElementById('shareQrBtn')?.addEventListener('click', async () => {
    addHapticFeedback();

    try {
        const qrCanvas = elements.qrCode.querySelector('canvas');

        if (qrCanvas) {
            // Convert canvas to blob
            qrCanvas.toBlob(async (blob) => {
                const file = new File([blob], `${CONFIG.name}_QR_Code.png`, { type: 'image/png' });

                // Try Web Share API
                if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                    try {
                        await navigator.share({
                            title: `${CONFIG.name} - Digital Business Card`,
                            text: `Scan this QR code to view ${CONFIG.name}'s digital business card`,
                            files: [file]
                        });
                        console.log('QR Code shared successfully');
                    } catch (shareError) {
                        if (shareError.name !== 'AbortError') {
                            console.error('Share error:', shareError);
                            // Fallback: download instead
                            downloadQRCodeFallback(qrCanvas);
                        }
                    }
                } else {
                    // Fallback: download instead
                    downloadQRCodeFallback(qrCanvas);
                }
            }, 'image/png');
        } else {
            showToast('❌ QR Code not found');
        }
    } catch (error) {
        console.error('Share error:', error);
        showToast('❌ Share failed');
    }
});

// Fallback download function
function downloadQRCodeFallback(canvas) {
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${CONFIG.name.replace(/\s+/g, '_')}_QR_Code.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showToast('📥 QR Code downloaded (share not supported)');
    }, 'image/png');
}

// ===================================
// SHARE FUNCTIONALITY
// ===================================
elements.shareBtn?.addEventListener('click', async () => {
    addHapticFeedback();

    const shareData = {
        title: `${CONFIG.name} - ${CONFIG.title}`,
        text: `Check out ${CONFIG.name}'s digital business card from ${CONFIG.company}`,
        url: CONFIG.website
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
            console.log('Shared successfully');
        } else {
            // Fallback: Copy to clipboard
            await navigator.clipboard.writeText(CONFIG.website);
            showToast('Link copied to clipboard!');
        }
    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error('Error sharing:', error);
            // Fallback: Copy to clipboard
            try {
                await navigator.clipboard.writeText(CONFIG.website);
                showToast('Link copied to clipboard!');
            } catch (clipboardError) {
                console.error('Clipboard error:', clipboardError);
            }
        }
    }
});

// ===================================
// ADD TO CONTACT (vCard)
// ===================================
elements.contactBtn?.addEventListener('click', () => {
    downloadVCard();
    addHapticFeedback();
});

function downloadVCard() {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${CONFIG.vcard.firstName} ${CONFIG.vcard.lastName}
N:${CONFIG.vcard.lastName};${CONFIG.vcard.firstName};;;
ORG:${CONFIG.vcard.organization}
TITLE:${CONFIG.vcard.title}
TEL;TYPE=WORK,VOICE:${CONFIG.vcard.workPhone}
EMAIL;TYPE=WORK:${CONFIG.vcard.email}
URL:${CONFIG.vcard.url}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${CONFIG.vcard.firstName}_${CONFIG.vcard.lastName}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Contact saved!');
}

// ===================================
// DOWNLOAD APP (MORE OPTIONS)
// ===================================
elements.moreBtn?.addEventListener('click', async () => {
    addHapticFeedback();

    console.log('Download App clicked');
    console.log('deferredPrompt available:', !!deferredPrompt);
    console.log('Display mode:', window.matchMedia('(display-mode: standalone)').matches ? 'standalone' : 'browser');

    // Try to trigger install prompt
    if (deferredPrompt) {
        try {
            console.log('Showing install prompt...');
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response: ${outcome}`);

            if (outcome === 'accepted') {
                showToast('✅ App installing...');
                deferredPrompt = null;
            } else {
                showToast('❌ Installation cancelled');
            }
        } catch (error) {
            console.error('Install prompt error:', error);
            showToast('Error showing install prompt');
        }
    } else {
        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('App already installed');
            showToast('✅ App already installed!');
        } else {
            console.log('Install prompt not available - showing manual instructions');

            // Detect browser and show specific instructions
            const userAgent = navigator.userAgent.toLowerCase();
            const isiOSDevice = /iphone|ipad|ipod/.test(userAgent);
            let message = '';

            if (isiOSDevice) {
                message = '📱 Safari: Tap "Share" (⬆️) → then "Add to Home Screen"';
            } else if (userAgent.includes('chrome') && !userAgent.includes('edg')) {
                message = '📱 Chrome: Menu (⋮) → Install app';
            } else if (userAgent.includes('edg')) {
                message = '📱 Edge: Menu (⋯) → Apps → Install this site as an app';
            } else {
                message = '📱 Browser menu → Add to Home Screen / Install';
            }

            showToast(message, 6000);
        }
    }
});

// ===================================
// UTILITY FUNCTIONS
// ===================================
function addHapticFeedback() {
    if ('vibrate' in navigator) {
        navigator.vibrate(10);
    }
}

function showToast(message, duration = 3000) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.95);
        color: #000;
        padding: 12px 24px;
        border-radius: 24px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: toastIn 0.3s ease;
        max-width: 80%;
        text-align: center;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Add toast animations
const style = document.createElement('style');
style.textContent = `
    @keyframes toastIn {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes toastOut {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
    }
`;
document.head.appendChild(style);

// ===================================
// KEYBOARD SHORTCUTS
// ===================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        elements.qrModal.classList.remove('active');
        elements.installPrompt.classList.remove('active');
    }
});

// ===================================
// ANALYTICS (Optional)
// ===================================
function trackEvent(category, action, label) {
    // Implement analytics tracking here
    console.log('Event:', category, action, label);
}

// Track page view
trackEvent('Page', 'View', 'Digital Business Card');

console.log('Digital Business Card PWA loaded successfully!');
