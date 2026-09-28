# QR Generator Offline

**Offline QR Code Generator** — A fully featured Progressive Web App that creates QR codes for URLs, contacts, WiFi, payments, and more. Works entirely without an internet connection.

![License: MIT](https://img.shields.io/badge/license-MIT-blue)
![PWA](https://img.shields.io/badge/PWA-ready-green)
![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

---

## Features

- **15 QR types**: URL, Text, Email, SMS, WhatsApp, Telegram, Call, WiFi, Contact (vCard), Location, Calendar, Bitcoin, Ethereum, PayPal
- **Fully offline**: Service Worker caches all assets. Works without internet after first visit.
- **Installable PWA**: Add to home screen on mobile and desktop.
- **QR Scanner**: Decode QR codes using your device camera (via jsQR).
- **Batch generation**: Create multiple QR codes at once, download as ZIP.
- **Customization**: Foreground/background colors, gradient support, error correction level, margin, dot styles, center logo overlay.
- **Export**: Download as PNG, SVG, or PDF.
- **History**: Stores last 20 generated QR codes in localStorage.
- **Dark/Light theme**: Toggle with persistent preference.
- **i18n**: English, Spanish, Portuguese, French, German.
- **Privacy-first**: No data sent to servers. No analytics. No tracking. Everything runs client-side.
- **Keyboard accessible**: ARIA labels, semantic HTML, full keyboard navigation.

## Quick Start

```bash
git clone https://github.com/jmarc9901/qr-code-generator-pwa.git
cd qr-code-generator-pwa
npx serve public
```

Open `http://localhost:3000` in your browser.

> **Note**: PWA features (Service Worker) require serving via HTTP(S). The `file://` protocol won't register the Service Worker.

## Project Structure

```
public/
├── index.html                  # Application entry point
├── manifest.json               # PWA manifest
├── sw.js                       # Service Worker (offline caching)
├── sitemap.xml                 # SEO sitemap
├── css/
│   ├── style.css               # Stylesheet
│   └── style.min.css           # Minified stylesheet
├── js/
│   ├── app.js                  # Main application logic
│   ├── qr-types.js             # QR type definitions (15 types)
│   ├── pwa.js                  # PWA lifecycle management
│   ├── qr-worker.js            # Web Worker for QR generation
│   ├── utils.js                # Utility functions
│   ├── validation.js           # Form validation
│   └── langs/                  # Translation files (en, es, pt, fr)
├── libs/                       # Vendored third-party libraries
│   ├── qrcode.min.js           # QRCode.js
│   ├── qrcode-wrapper.js       # toDataURL wrapper for QRCode.js
│   ├── qrcode-worker-compatible.js  # Worker-compatible QRCode.js
│   ├── qrcode-worker-wrapper.js     # Worker wrapper
│   ├── FileSaver.min.js        # File download library
│   └── jsQR.min.js             # QR decoding library
└── assets/
    ├── img/logo.png            # Application logo
    └── icons/                  # PWA icons (16px to 512px)
```

## Supported QR Types

| Type | ID | Format |
|------|----|--------|
| URL | `url` | Direct URL |
| Text | `text` | Free text |
| Email | `email` | `mailto:` with subject and body |
| SMS | `sms` | `sms:` with phone and message |
| WhatsApp | `whatsapp` | `https://wa.me/` |
| Telegram | `telegram` | `https://t.me/` |
| Call | `call` | `tel:` |
| WiFi | `wifi` | `WIFI:S:...;T:...;P:...;` |
| Contact | `vcard` | vCard 3.0 format |
| Location | `location` | `geo:` coordinates |
| Calendar | `calendar` | iCalendar `VEVENT` |
| Bitcoin | `bitcoin` | BIP-21 URI |
| Ethereum | `ethereum` | EIP-681 URI |
| PayPal | `paypal` | PayPal donation link |

## Development

```bash
npm install
npm run lint        # Run ESLint
npx serve public    # Start local server
```

### Adding a new QR type

1. Add the type definition to `public/js/qr-types.js` (fields, generator function).
2. Add translation keys to all 4 language files in `public/js/langs/`.
3. Add a shortcut in `public/manifest.json` (optional).

## Deployment

Deploy the `public/` directory to any static hosting:

- **GitHub Pages**: Push to `main`, the included CI workflow deploys automatically.
- **Netlify**: Connect repo, set publish directory to `public`.
- **Vercel**: Import project, set output directory to `public`.

## Tech Stack

- **HTML5** · **CSS3** (Custom Properties, Dark Mode)
- **JavaScript ES6+** (vanilla, no frameworks)
- **PWA** (Service Worker, Cache API, Manifest)
- **Web Worker** (off-thread QR generation)
- **QRCode.js** · **jsQR** · **FileSaver.js** · **JSZip** · **jsPDF**

## License

[MIT](LICENSE)

## Author

**Juan Marcos Bravo Medina** — [GitHub](https://github.com/jmarc9901)
