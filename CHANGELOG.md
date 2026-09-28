# Changelog

## [Unreleased]

### Added
- German translation (`de`), selectable in the language menu and through `?lang=de`

### Fixed
- Form labels, placeholders, dropdown options and validation messages were always Spanish, even in the English view (visible in the WiFi form). They now use translation keys in all four languages (en, es, pt, fr), with English fallbacks in `qr-types.js`
- Form title and share text now use the translated QR type name
- Update/online/offline toasts in `pwa.js` are translated
- Batch QR type dropdown is translated
- Saved language choice is now restored on load; `?lang=` links (used by the hreflang tags) now work
- Changing the language with a form open now re-renders the form and keeps the entered values

## [1.0.1] - 2026-07-11

### Fixed
- PayPal donation URL format (was using email as username)
- SVG export now generates actual QR code matrix, not placeholder text
- XSS vulnerabilities in batch display and toast messages
- Calendar event timezone offset (was shifting UTC)
- Camera scanner not stopping after QR detection
- PDF export race condition (onload after src)
- WiFi QR format (removed trailing double semicolon)
- vCard format (CRLF line endings, special character escaping)
- Batch generation now uses QR_TYPES generators instead of hardcoded switch
- Hardcoded Spanish strings replaced with i18n translation keys

### Added
- MIT LICENSE file
- .gitignore
- .editorconfig
- GitHub Actions CI/CD workflow (lint + deploy)
- CHANGELOG.md, CONTRIBUTING.md, SECURITY.md
- Content-Security-Policy meta tag
- OG social preview image
- PWA icons generated at all required sizes
- New i18n keys for validation, upload, and customization messages

### Changed
- Spanish toast/validation strings migrated to translation system
- utils.js and validation.js converted from broken ES modules to plain scripts
- Service Worker now pre-caches JSZip, jsPDF, icons, and utility scripts
- README fully rewritten with badges, QR type table, and project structure
- Footer redesigned (professional layout, GitHub links, no emojis)
- Canonical URLs updated to GitHub Pages domain
- ESLint config updated with correct global variables

### Removed
- Development test files (`test-*.html`)
- BATCH_QR_FIX_SUMMARY.md
- Donation section from footer
- Dead `setupDonationButtons()` method

## [1.0.0] - 2025-11-28

- Initial release
- 15 QR types supported
- PWA with offline support
- 4 languages (EN, ES, PT, FR)
- Batch QR generation
- QR scanner
- Dark/light theme
- Export to PNG, SVG, PDF
