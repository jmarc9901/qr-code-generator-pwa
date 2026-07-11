// English translations
export default {
    // Navigation
    'nav.install': 'Install',
    'nav.theme': 'Toggle theme',
    
    // QR Type Selection
    'qrType.heading': 'Select QR Type',
    'qrType.scan': 'Scan QR Code',
    'qrType.batch': 'Batch QR Generation',
    'qrType.cardLabel': '{name}: {description}',
    
    // QR Type Names and Descriptions
    'qrType.url.name': 'URL',
    'qrType.url.description': 'Web page link',
    'qrType.text.name': 'Text',
    'qrType.text.description': 'Custom free text',
    'qrType.email.name': 'Email',
    'qrType.email.description': 'Email address',
    'qrType.sms.name': 'SMS',
    'qrType.sms.description': 'Text message',
    'qrType.whatsapp.name': 'WhatsApp',
    'qrType.whatsapp.description': 'WhatsApp message',
    'qrType.telegram.name': 'Telegram',
    'qrType.telegram.description': 'Telegram message',
    'qrType.call.name': 'Call',
    'qrType.call.description': 'Make a phone call',
    'qrType.wifi.name': 'WiFi',
    'qrType.wifi.description': 'WiFi network configuration',
    'qrType.vcard.name': 'Contact',
    'qrType.vcard.description': 'Contact information (vCard)',
    'qrType.location.name': 'Location',
    'qrType.location.description': 'GPS coordinates',
    'qrType.calendar.name': 'Event',
    'qrType.calendar.description': 'Calendar event',
    'qrType.bitcoin.name': 'Bitcoin',
    'qrType.bitcoin.description': 'Bitcoin address for payments',
    'qrType.ethereum.name': 'Ethereum',
    'qrType.ethereum.description': 'Ethereum address for payments',
    'qrType.paypal.name': 'PayPal',
    'qrType.paypal.description': 'PayPal payment link',
    
    // QR Generator Form
    'form.generate': 'Generate QR',
    'form.preview': 'Preview',
    'form.close': 'Close',
    
    // Preview Area
    'preview.heading': 'Preview',
    'preview.download': 'Download',
    'preview.share': 'Share',
    'preview.placeholder': 'Select a type and generate your QR',
    
    // QR Info
    'info.type': 'Type:',
    'info.size': 'Size:',
    'info.error': 'Correction:',
    
    // QR Customization
    'customize.heading': '🎨 Customize QR',
    'customize.description': 'Make your QR unique with custom colors, size and effects',
    'customize.basic': 'Basic',
    'customize.advanced': 'Advanced',
    'customize.effects': 'Effects',
    
    // Basic Customization
    'basic.size': 'Size',
    'basic.error': 'Error Correction',
    
    // Advanced Customization
    'advanced.foreground': 'Foreground Color',
    'advanced.background': 'Background Color',
    'advanced.margin': 'Margin',
    'advanced.style': 'Dot Style',
    
    // Effects Customization
    'effects.logo': 'Center Logo',
    'effects.gradient': 'Gradient',
    'upload.placeholder': 'Drag an image or click to select',
    'upload.supported': 'PNG, JPG up to 2MB',
    
    // Customization Actions
    'actions.reset': 'Reset',
    'actions.apply': 'Apply Changes',
    'actions.remove': 'Remove',
    
    // Export options
    'export.label': 'Export Format:',
    'export.png': 'QR code exported as PNG',
    'export.svg': 'QR code exported as SVG',
    'export.pdf': 'QR code exported as PDF',
    'export.pdfTitle': 'QR Code: {type}',
    
    // Scanner
    'scanner.heading': 'Scan QR Code',
    'scanner.start': 'Start Camera',
    'scanner.stop': 'Stop Camera',
    'scanner.point': 'Point your camera at a QR code',
    'scanner.result': 'Scanned Content',
    'scanner.copy': 'Copy',
    'scanner.open': 'Open',
    'scanner.success': 'QR code scanned successfully',
    
    // Batch Generation
    'batch.heading': 'Batch QR Generation',
    'batch.label': 'Enter data for multiple QR codes (one per line):',
    'batch.placeholder': 'Enter one QR code data per line\nExample:\nhttps://example.com\nhttps://google.com\nHello World\nContact: John Doe',
    'batch.type': 'QR Type:',
    'batch.size': 'QR Size:',
    'batch.error': 'Error Correction:',
    'batch.generate': 'Generate Batch QR Codes',
    'batch.download': 'Download All',
    'batch.results': 'Generated QR Codes',
    'batch.download.single': 'Download',
    
    // Batch Generation Messages
    'batch.generate.error': 'Please enter data for QR codes',
    'batch.generate.errorInvalid': 'Please enter valid data for QR codes',
    'batch.generate.errorSingle': 'Error generating QR code {index}: {error}',
    'batch.generate.success': 'Generated {count} QR codes',
    'batch.download.error': 'No QR codes to download',
    'batch.download.successSingle': 'QR code {index} downloaded',
    'batch.download.successAll': 'All QR codes downloaded as ZIP',
    'batch.download.errorAll': 'No QR codes to download',
    'batch.download.error': 'Error downloading batch QRs',
    
    // History
    'history.heading': 'QR History',
    'history.clear': 'Clear History',
    
    // Footer
    'footer.title': 'QR Generator',
    'footer.description': 'Generate QR codes without internet. Works offline as PWA.',
    'footer.features': 'Features',
    'footer.urls': 'URLs and web links',
    'footer.contacts': 'Contacts and WiFi',
    'footer.payments': 'Payments and cryptocurrencies',
    'footer.email': 'Email and messages',
    'footer.location': 'GPS locations',
    'footer.events': 'Events and calendar',
    'footer.customization': 'Advanced customization',
    'footer.history': 'History and downloads',
    'footer.links': 'Links',
    'footer.sourceCode': 'Source Code',
    'footer.reportIssue': 'Report Issue',
    'footer.license': 'License',
    'footer.copyright': 'QR Generator. Open source under MIT License.',
    
    // Toast Messages
    'toast.success': 'Success',
    'toast.error': 'Error',
    'toast.warning': 'Warning',
    'toast.info': 'Information',
    'toast.default': 'Notification',
    
    // Validation Messages
    'validation.selectType': 'Select a QR type first',
    'validation.required': 'The field "{field}" is required',
    'validation.email': 'The field "{field}" must be a valid email',
    'validation.url': 'The field "{field}" must be a valid URL',
    'validation.phone': 'The field "{field}" must be a valid phone number',
    'validation.number': 'The field "{field}" must be a valid number',
    
    // Export Messages
    'export.error': 'No QR code to export',
    'export.unsupported': 'Unsupported export format',
    'export.errorDetail': 'Error exporting QR code: {error}',
    
    // Other Messages
    'title': 'QR Generator - Offline QR Code Generator | Create QR Codes Without Internet',
    'loading': 'Generating QR...',
    'camera.error': 'Could not access camera. Please ensure you have granted permission.',
    'qr.success': 'QR generated successfully',
    'qr.error': 'Error generating QR: {error}',
    'qr.dataError': 'Could not generate QR data',
    'copy.success': 'Copied to clipboard',
    'copy.error': 'Failed to copy to clipboard',
    'validation.error': 'Form validation error',
    'qr.errorLibrary': 'QR library not loaded. Attempting to load...',
    'qr.errorLoad': 'Could not load QR library. Check your connection.',
    'qr.shareText': 'Generated QR',
    'qr.shareError': 'Error sharing QR',
    'upload.invalidType': 'Please select a valid image file',
    'upload.tooLarge': 'File is too large. Maximum 2MB',
    'customize.reset': 'Customization reset',
    'customize.applied': 'Changes applied'
};