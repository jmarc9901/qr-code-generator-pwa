/* global QR_TYPES */

// Main Application Logic
class QRGeneratorApp {
	constructor() {
		this.currentQRType = null;
		this.currentQRData = null;
		this.generatedQR = null;
		this.history = this.loadHistory();
		this.currentLanguage = this.getInitialLanguage();
		this.translations = {};
		
		// Import utility functions
		this.utils = window.QRUtils || null;
		this.validation = window.QRValidation || null;
		
		this.init();
	}

	// Initialize the app
	async init() {
		await this.loadTranslations();
		this.updateUILanguage();
		this.renderQRTypes();
		this.bindEvents();
		this.loadTheme();
	}

	// Initial language: ?lang= parameter, then saved choice, then browser language
	getInitialLanguage() {
		const supported = ['en', 'es', 'pt', 'fr', 'de'];

		try {
			const fromUrl = new URLSearchParams(window.location.search).get('lang');
			if (supported.includes(fromUrl)) return fromUrl;
		} catch (e) {
			console.error('Error reading language from URL:', e);
		}

		try {
			const saved = localStorage.getItem('language');
			if (supported.includes(saved)) return saved;
		} catch (e) {
			console.error('Error reading language preference:', e);
		}

		const browserLang = (navigator.language || navigator.userLanguage || '').split('-')[0].toLowerCase();
		return supported.includes(browserLang) ? browserLang : 'en'; // default to English
	}

	// Load translations
	async loadTranslations() {
		try {
			// For local file access, we need to handle the import differently
			if (window.location.protocol === 'file:') {
				// Load translations directly for file:// protocol
				this.translations = this.getDefaultTranslations(this.currentLanguage);
			} else {
				// Dynamically import the translation file based on current language
				const module = await import(`./langs/${this.currentLanguage}.js`);
				this.translations = module.default;
			}
		} catch (error) {
			console.error('Error loading translations:', error);
			// Fallback to English
			try {
				if (window.location.protocol === 'file:') {
					this.translations = this.getDefaultTranslations('en');
					this.currentLanguage = 'en';
				} else {
					const module = await import('./langs/en.js');
					this.translations = module.default;
					this.currentLanguage = 'en';
				}
			} catch (fallbackError) {
				console.error('Error loading fallback translations:', fallbackError);
				this.translations = this.getDefaultTranslations('en');
				this.currentLanguage = 'en';
			}
		}
	}

	// Get default translations for file:// protocol
	getDefaultTranslations(lang) {
		// This is a simplified version - in a real implementation, you would include all translations
		const translations = {
			en: {
				'nav.install': 'Install',
				'nav.theme': 'Toggle theme',
				'qrType.heading': 'Select QR Type',
				'qrType.scan': 'Scan QR Code',
				'qrType.batch': 'Batch QR Generation',
				'form.generate': 'Generate QR',
				'form.preview': 'Preview',
				'form.close': 'Close',
				'preview.heading': 'Preview',
				'preview.download': 'Download',
				'preview.share': 'Share',
				'preview.placeholder': 'Select a type and generate your QR',
				'customize.heading': '🎨 Customize QR',
				'customize.description': 'Make your QR unique with custom colors, size and effects',
				'customize.basic': 'Basic',
				'customize.advanced': 'Advanced',
				'customize.effects': 'Effects',
				'scanner.heading': 'Scan QR Code',
				'scanner.start': 'Start Camera',
				'scanner.stop': 'Stop Camera',
				'scanner.point': 'Point your camera at a QR code',
				'scanner.result': 'Scanned Content',
				'scanner.copy': 'Copy',
				'scanner.open': 'Open',
				'batch.heading': 'Batch QR Generation',
				'batch.label': 'Enter data for multiple QR codes (one per line):',
				'batch.placeholder': 'Enter one QR code data per line\\nExample:\\nhttps://example.com\\nhttps://google.com\\nHello World\\nContact: John Doe',
				'batch.type': 'QR Type:',
				'batch.size': 'QR Size:',
				'batch.error': 'Error Correction:',
				'batch.generate': 'Generate Batch QR Codes',
				'batch.download': 'Download All',
				'batch.results': 'Generated QR Codes',
				'history.heading': 'QR History',
				'history.clear': 'Clear History',
				'footer.title': 'QR Generator',
				'footer.description': 'Generate QR codes without internet. Works offline as PWA.',
				'footer.features': '🚀 Features',
				'footer.urls': '✨ URLs and web links',
				'footer.contacts': '📱 Contacts and WiFi',
				'footer.payments': '💳 Payments and cryptocurrencies',
				'footer.email': '📧 Email and messages',
				'footer.location': '📍 GPS locations',
				'footer.events': '📅 Events and calendar',
				'footer.customization': '🎨 Advanced customization',
				'footer.history': '💾 History and downloads',
				'footer.donations': '💝 Donations',
				'footer.support': 'Support the development of this free tool',
				'toast.success': 'Success',
				'toast.error': 'Error',
				'toast.warning': 'Warning',
				'toast.info': 'Information',
				'loading': 'Generating QR...',
				'camera.error': 'Could not access camera. Please ensure you have granted permission.',
				'qr.success': 'QR generated successfully',
				'qr.error': 'Error generating QR: {error}',
				'copy.success': 'Copied to clipboard',
				'copy.error': 'Failed to copy to clipboard',
				'title': 'QR Generator - Offline QR Code Generator | Create QR Codes Without Internet'
			},
			es: {
				'nav.install': 'Instalar',
				'nav.theme': 'Cambiar tema',
				'qrType.heading': 'Selecciona el Tipo de QR',
				'qrType.scan': 'Escanear Código QR',
				'qrType.batch': 'Generación de QR por Lotes',
				'form.generate': 'Generar QR',
				'form.preview': 'Vista Previa',
				'form.close': 'Cerrar',
				'preview.heading': 'Vista Previa',
				'preview.download': 'Descargar',
				'preview.share': 'Compartir',
				'preview.placeholder': 'Selecciona un tipo y genera tu QR',
				'customize.heading': '🎨 Personalizar QR',
				'customize.description': 'Haz tu QR único con colores personalizados, tamaño y efectos',
				'customize.basic': 'Básico',
				'customize.advanced': 'Avanzado',
				'customize.effects': 'Efectos',
				'scanner.heading': 'Escanear Código QR',
				'scanner.start': 'Iniciar Cámara',
				'scanner.stop': 'Detener Cámara',
				'scanner.point': 'Apunta tu cámara a un código QR',
				'scanner.result': 'Contenido Escaneado',
				'scanner.copy': 'Copiar',
				'scanner.open': 'Abrir',
				'batch.heading': 'Generación de QR por Lotes',
				'batch.label': 'Ingresa datos para múltiples códigos QR (uno por línea):',
				'batch.placeholder': 'Ingresa un dato de código QR por línea\\nEjemplo:\\nhttps://ejemplo.com\\nhttps://google.com\\nHola Mundo\\nContacto: Juan Pérez',
				'batch.type': 'Tipo de QR:',
				'batch.size': 'Tamaño del QR:',
				'batch.error': 'Corrección de Errores:',
				'batch.generate': 'Generar Códigos QR por Lotes',
				'batch.download': 'Descargar Todos',
				'batch.results': 'Códigos QR Generados',
				'history.heading': 'Historial de QR',
				'history.clear': 'Limpiar Historial',
				'footer.title': 'Generador de QR',
				'footer.description': 'Genera códigos QR sin internet. Funciona offline como PWA.',
				'footer.features': '🚀 Características',
				'footer.urls': '✨ URLs y enlaces web',
				'footer.contacts': '📱 Contactos y WiFi',
				'footer.payments': '💳 Pagos y criptomonedas',
				'footer.email': '📧 Email y mensajes',
				'footer.location': '📍 Ubicaciones GPS',
				'footer.events': '📅 Eventos y calendario',
				'footer.customization': '🎨 Personalización avanzada',
				'footer.history': '💾 Historial y descargas',
				'footer.donations': '💝 Donaciones',
				'footer.support': 'Apoya el desarrollo de esta herramienta gratuita',
				'toast.success': 'Éxito',
				'toast.error': 'Error',
				'toast.warning': 'Advertencia',
				'toast.info': 'Información',
				'loading': 'Generando QR...',
				'camera.error': 'No se pudo acceder a la cámara. Por favor, asegúrate de haber otorgado permiso.',
				'qr.success': 'QR generado con éxito',
				'qr.error': 'Error al generar QR: {error}',
				'copy.success': 'Copiado al portapapeles',
				'copy.error': 'Error al copiar al portapapeles',
				'title': 'Generador de QR - Generador de Código QR Sin Internet | Crea Códigos QR Sin Conexión'
			}
		};
		
		return translations[lang] || translations.en;
	}

	// Translate a key
	t(key, params = {}) {
		let translation = this.translations[key] || key;
		
		// Replace parameters in the translation
		Object.keys(params).forEach(param => {
			translation = translation.replace(`{${param}}`, params[param]);
		});
		
		return translation;
	}

	// Translation lookup that falls back to the English default in QR_TYPES
	tOr(key, fallback) {
		return this.translations[key] || fallback;
	}

	getTypeName(type) {
		return this.tOr(`qrType.${type.id}.name`, type.name);
	}

	getTypeDescription(type) {
		return this.tOr(`qrType.${type.id}.description`, type.description);
	}

	getFieldLabel(type, field) {
		return this.tOr(`qrType.${type.id}.field.${field.name}.label`, field.label);
	}

	getFieldPlaceholder(type, field) {
		return this.tOr(`qrType.${type.id}.field.${field.name}.placeholder`, field.placeholder || '');
	}

	getOptionLabel(type, field, option) {
		return this.tOr(`qrType.${type.id}.field.${field.name}.option.${option.value}`, option.label);
	}

	// Update UI language
	updateUILanguage() {
		// Update the HTML lang attribute
		document.documentElement.lang = this.currentLanguage;
		
		// Update language selector if it exists
		const langSelector = document.getElementById('languageSelector');
		if (langSelector) {
			langSelector.value = this.currentLanguage;
		}
		
		// Update all elements with data-i18n attributes
		const elements = document.querySelectorAll('[data-i18n]');
		elements.forEach(element => {
			const key = element.getAttribute('data-i18n');
			const params = {};
			
			// Check for parameters in data-i18n-params attribute
			const paramsAttr = element.getAttribute('data-i18n-params');
			if (paramsAttr) {
				try {
					Object.assign(params, JSON.parse(paramsAttr));
				} catch (e) {
					console.error('Error parsing i18n params:', e);
				}
			}
			
			element.textContent = this.t(key, params);
		});
		
		// Update placeholders
		const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
		placeholderElements.forEach(element => {
			const key = element.getAttribute('data-i18n-placeholder');
			element.placeholder = this.t(key);
		});
		
		// Update titles/aria-labels
		const titleElements = document.querySelectorAll('[data-i18n-title]');
		titleElements.forEach(element => {
			const key = element.getAttribute('data-i18n-title');
			const translated = this.t(key);
			element.title = translated;
			if (element.hasAttribute('aria-label')) {
				element.setAttribute('aria-label', translated);
			}
		});
	}

	// Change language
	async changeLanguage(lang) {
		if (lang === this.currentLanguage) return;
		
		this.currentLanguage = lang;
		await this.loadTranslations();
		this.updateUILanguage();
		// Re-render QR types to update their names and descriptions
		this.renderQRTypes();

		// Re-render an open form in the new language without losing what was typed
		if (this.currentQRType) {
			const selectedCard = document.querySelector(`[data-type="${this.currentQRType.id}"]`);
			if (selectedCard) selectedCard.classList.add('selected');

			const form = document.getElementById('qrForm');
			const values = {};
			this.currentQRType.fields.forEach(field => {
				const input = form.elements[field.name];
				if (input) values[field.name] = input.value;
			});
			this.renderForm();
			this.currentQRType.fields.forEach(field => {
				const input = form.elements[field.name];
				if (input && field.name in values) input.value = values[field.name];
			});
		}

		// Save language preference
		try {
			localStorage.setItem('language', lang);
		} catch (e) {
			console.error('Error saving language preference:', e);
		}
	}

	// Render QR Types Grid
	renderQRTypes() {
		const grid = document.getElementById('qrTypeGrid');
		if (!grid) return;

		grid.innerHTML = '';

		Object.values(QR_TYPES).forEach(type => {
			const card = this.createQRTypeCard(type);
			grid.appendChild(card);
		});
	}

	createQRTypeCard(type) {
		const card = document.createElement('div');
		card.className = 'qr-type-card';
		card.dataset.type = type.id;
		card.tabIndex = 0; // Make card focusable
		card.setAttribute('role', 'button'); // Accessibility
		
		// Use translation keys for name and description
		const typeName = this.getTypeName(type);
		const typeDesc = this.getTypeDescription(type);
		
		card.setAttribute('aria-label', this.t('qrType.cardLabel', { name: typeName, description: typeDesc })); // Accessibility

		card.innerHTML = `
			<div class="qr-type-card-header">
				<svg class="qr-type-icon" viewBox="0 0 24 24" fill="currentColor">
					<path d="${type.icon}"/>
				</svg>
				<div>
					<h3>${typeName}</h3>
					<p>${typeDesc}</p>
				</div>
			</div>
		`;

		card.addEventListener('click', () => this.selectQRType(type));
		card.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				this.selectQRType(type);
			}
		});
		return card;
	}

	// QR Type Selection
	selectQRType(type) {
		document.querySelectorAll('.qr-type-card').forEach(card => {
			card.classList.remove('selected');
		});

		const selectedCard = document.querySelector(`[data-type="${type.id}"]`);
		if (selectedCard) {
			selectedCard.classList.add('selected');
		}

		this.currentQRType = type;
		this.showGeneratorForm();
		this.renderForm();
	}

	// Show/Hide Generator Form
	showGeneratorForm() {
		document.getElementById('qrGeneratorSection').style.display = 'block';
		document.getElementById('qrCustomization').style.display = 'block';

		document.getElementById('qrGeneratorSection').scrollIntoView({
			behavior: 'smooth'
		});
	}

	hideGeneratorForm() {
		document.getElementById('qrGeneratorSection').style.display = 'none';
		document.getElementById('qrCustomization').style.display = 'none';

		document.querySelectorAll('.qr-type-card').forEach(card => {
			card.classList.remove('selected');
		});

		this.currentQRType = null;
		this.currentQRData = null;
		this.generatedQR = null;
	}

	// Render Form Fields
	renderForm() {
		if (!this.currentQRType) return;

		const form = document.getElementById('qrForm');
		const title = document.getElementById('formTitle');

		title.textContent = this.getTypeName(this.currentQRType);
		form.innerHTML = '';

		this.currentQRType.fields.forEach(field => {
			const fieldElement = this.createFormField(field);
			form.appendChild(fieldElement);
		});
	}

	createFormField(field) {
		const group = document.createElement('div');
		group.className = 'form-group';

		const label = document.createElement('label');
		label.htmlFor = field.name;
		label.textContent = this.getFieldLabel(this.currentQRType, field);
		if (field.required) {
			label.innerHTML += ' <span style="color: var(--danger-color);">*</span>';
		}

		const input = this.createInput(field);

		group.appendChild(label);
		group.appendChild(input);

		return group;
	}

	createInput(field) {
		let input;

		switch (field.type) {
			case 'textarea':
				input = document.createElement('textarea');
				input.rows = field.rows || 3;
				break;
			case 'select':
				input = document.createElement('select');
				field.options.forEach(option => {
					const optionElement = document.createElement('option');
					optionElement.value = option.value;
					optionElement.textContent = this.getOptionLabel(this.currentQRType, field, option);
					if (option.value === field.default) {
						optionElement.selected = true;
					}
					input.appendChild(optionElement);
				});
				break;
			default:
				input = document.createElement('input');
				input.type = field.type;
		}

		input.id = field.name;
		input.name = field.name;
		input.className = 'form-control';
		input.placeholder = this.getFieldPlaceholder(this.currentQRType, field);
		input.required = field.required || false;

		return input;
	}

	// Form Data Handling
	getFormData() {
		const form = document.getElementById('qrForm');
		const formData = new FormData(form);
		const data = {};

		for (let [key, value] of formData.entries()) {
			data[key] = this.sanitizeInput(value);
		}

		return data;
	}

	// Sanitize user input
	sanitizeInput(input) {
		// Use validation module if available
		if (this.validation && this.validation.sanitizeInput) {
			return this.validation.sanitizeInput(input);
		}
		
		// Fallback to original sanitization
		if (typeof input !== 'string') return input;

		// Remove potentially dangerous characters
		return input
			.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
			.replace(/<[^>]*>/g, '')
			.trim();
	}

	validateForm() {
		// Use validation module if available
		if (this.validation && this.validation.validateForm) {
			const result = this.validation.validateForm(this.currentQRType, () => this.getFormData(), this.getValidationContext());
			if (!result.valid) {
				this.showToast('error', result.message);
				return false;
			}
			return true;
		}
		
		// Fallback to original validation
		try {
			if (!this.currentQRType) {
				this.showToast('error', this.t('validation.selectType'));
				return false;
			}

			const formData = this.getFormData();

			for (let field of this.currentQRType.fields) {
				const value = formData[field.name];

				// Check required fields
				if (field.required && (!value || value.trim() === '')) {
					this.showToast('error', this.t('validation.required', { field: this.getFieldLabel(this.currentQRType, field) }));
					return false;
				}

				// Type-specific validation
				if (value && !this.validateField(field, value)) {
					return false;
				}
			}

			return true;
		} catch (error) {
			this.showToast('error', this.t('validation.error'));
			return false;
		}
	}

	// Translation helpers handed to the validation module
	getValidationContext() {
		return {
			t: (key, params) => this.t(key, params),
			label: (field) => this.getFieldLabel(this.currentQRType, field)
		};
	}

	// Validate individual field
	validateField(field, value) {
		// Use validation module if available
		if (this.validation && this.validation.validateField) {
			const result = this.validation.validateField(field, value, this.getValidationContext());
			if (!result.valid) {
				this.showToast('error', result.message);
				return false;
			}
			return true;
		}
		
		// Fallback to original validation
		switch (field.type) {
			case 'email': {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(value)) {
					this.showToast('error', this.t('validation.email', { field: this.getFieldLabel(this.currentQRType, field) }));
					return false;
				}
				break;
			}
			case 'url':
				try {
					new URL(value);
				} catch {
					this.showToast('error', this.t('validation.url', { field: this.getFieldLabel(this.currentQRType, field) }));
					return false;
				}
				break;
			case 'tel': {
				const phoneRegex = /^[+]?[0-9\s\-()]{7,}$/;
				if (!phoneRegex.test(value)) {
					this.showToast('error', this.t('validation.phone', { field: this.getFieldLabel(this.currentQRType, field) }));
					return false;
				}
				break;
			}
			case 'number':
				if (isNaN(value) || value < (field.min || 0)) {
					this.showToast('error', this.t('validation.number', { field: this.getFieldLabel(this.currentQRType, field) }));
					return false;
				}
				break;
		}
		return true;
	}

	// QR Generation
	async generateQR() {
		if (!this.validateForm()) {
			return;
		}

		// Check if QRCode library is available
		if (typeof QRCode === 'undefined') {
			console.error('QRCode library not available');
			this.showToast('error', this.t('qr.errorLibrary'));

			await this.loadQRCodeLibrary();

			if (typeof QRCode === 'undefined') {
				this.showToast('error', this.t('qr.errorLoad'));
				return;
			}
		}

		this.showLoading(true);

		try {
			const formData = this.getFormData();
			const qrData = this.currentQRType.generate(formData);

			if (!qrData || qrData.trim() === '') {
				throw new Error(this.t('qr.dataError'));
			}

			const options = this.getQROptions();
			const qrImage = await this.createQRCode(qrData, options);

			this.generatedQR = {
				type: this.getTypeName(this.currentQRType),
				data: qrData,
				image: qrImage,
				timestamp: new Date().toISOString(),
				options: options
			};

			this.displayQR();
			this.saveToHistory();
			this.showToast('success', this.t('qr.success'));

		} catch (error) {
			console.error('Error generating QR:', error);
			this.showToast('error', this.t('qr.error', { error: error.message }));
		} finally {
			this.showLoading(false);
		}
	}

	getQROptions() {
		const qrSize = document.getElementById('qrSize');
		const qrErrorLevel = document.getElementById('qrErrorLevel');
		const qrForeground = document.getElementById('qrForeground');
		const qrBackground = document.getElementById('qrBackground');
		const qrMargin = document.getElementById('qrMargin');

		const options = {
			size: qrSize ? parseInt(qrSize.value) : 256,
			errorCorrectionLevel: qrErrorLevel ? qrErrorLevel.value : 'M',
			foreground: qrForeground ? qrForeground.value : '#000000',
			background: qrBackground ? qrBackground.value : '#FFFFFF',
			margin: qrMargin ? parseInt(qrMargin.value) : 4
		};

		return options;
	}

	async createQRCode(data, options) {
        // Check if Web Workers are supported and we're not on file:// protocol
        if (typeof Worker !== 'undefined' && window.location.protocol !== 'file:') {
            return new Promise((resolve, reject) => {
                try {
                    // Create Web Worker
                    const worker = new Worker('js/qr-worker.js');
                    
                    // Send data to worker
                    worker.postMessage({ data, options });
                    
                    // Listen for response from worker
                    worker.onmessage = (e) => {
                        const result = e.data;
                        worker.terminate(); // Clean up worker
                        
                        if (result.success) {
                            // Generate the actual image from the QR data in the main thread
                            const imageDataURL = this.generateQRImageFromData(result);
                            resolve(imageDataURL);
                        } else {
                            console.warn('Web Worker failed, falling back to main thread:', result.error);
                            // Fallback to original method
                            this.createQRCodeFallback(data, options).then(resolve).catch(reject);
                        }
                    };
                    
                    // Handle worker errors
                    worker.onerror = (error) => {
                        worker.terminate();
                        console.warn('Web Worker error, falling back to main thread:', error);
                        // Fallback to original method
                        this.createQRCodeFallback(data, options).then(resolve).catch(reject);
                    };
                    
                    // Set timeout for worker (increased to 30 seconds for complex QR codes)
                    setTimeout(() => {
                        worker.terminate();
                        console.warn('Web Worker timeout, falling back to main thread');
                        // Fallback to original method
                        this.createQRCodeFallback(data, options).then(resolve).catch(reject);
                    }, 30000); // 30 second timeout
                } catch (error) {
                    console.warn('Error creating Web Worker, falling back to main thread:', error);
                    // Fallback to original method
                    this.createQRCodeFallback(data, options).then(resolve).catch(reject);
                }
            });
        } else {
            // Fallback for browsers that don't support Web Workers or when on file:// protocol
            return this.createQRCodeFallback(data, options);
        }
    }
	
	// Generate QR image from data (used when Web Worker returns QR data)
    generateQRImageFromData(result) {
        // Handle the new data structure from the Web Worker
        if (result.modules && result.moduleCount) {
            // This is data from the Web Worker
            const modules = result.modules;
            const moduleCount = result.moduleCount;
            const options = result.options || {};
            
            // Create canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas size
            const size = options.width || 256;
            canvas.width = size;
            canvas.height = size;
            
            const cellSize = Math.floor(size / moduleCount);
            const margin = options.margin || 4;
            
            // Fill background
            ctx.fillStyle = options.color?.light || '#FFFFFF';
            ctx.fillRect(0, 0, size, size);
            
            // Draw QR code from modules data
            ctx.fillStyle = options.color?.dark || '#000000';
            
            for (let row = 0; row < moduleCount; row++) {
                for (let col = 0; col < moduleCount; col++) {
                    if (modules[row][col]) {
                        const x = margin + col * cellSize;
                        const y = margin + row * cellSize;
                        ctx.fillRect(x, y, cellSize, cellSize);
                    }
                }
            }
            
            // Convert to data URL
            return canvas.toDataURL('image/png');
        } else {
            // Handle the old format or direct QR data
            const qrData = result.qrData || result;
            const options = result.options || {};
            
            // Create canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas size
            const size = options.width || 256;
            canvas.width = size;
            canvas.height = size;
            
            // Get QR module count
            const moduleCount = qrData.getModuleCount();
            const cellSize = Math.floor(size / moduleCount);
            const margin = options.margin || 4;
            
            // Fill background
            ctx.fillStyle = options.color?.light || '#FFFFFF';
            ctx.fillRect(0, 0, size, size);
            
            // Draw QR code
            ctx.fillStyle = options.color?.dark || '#000000';
            
            for (let row = 0; row < moduleCount; row++) {
                for (let col = 0; col < moduleCount; col++) {
                    if (qrData.isDark(row, col)) {
                        const x = margin + col * cellSize;
                        const y = margin + row * cellSize;
                        ctx.fillRect(x, y, cellSize, cellSize);
                    }
                }
            }
            
            // Convert to data URL
            return canvas.toDataURL('image/png');
        }
    }
	
	// Fallback method for QR code generation
	async createQRCodeFallback(data, options) {
		return new Promise((resolve, reject) => {
			try {
				// Check if QRCode library is available
				if (typeof QRCode === 'undefined') {
					reject(new Error('QRCode library not loaded'));
					return;
				}

				// Validate data
				if (!data || data.trim() === '') {
					reject(new Error('No data provided for QR code'));
					return;
				}

				console.log('Creating QR with options:', options);
				console.log('QRCode library type:', typeof QRCode);

				// Get all customization options with defaults
				const qrOptions = {
					width: options.size || 256,
					errorCorrectionLevel: options.errorCorrectionLevel || 'M',
					color: {
						dark: options.foreground || '#000000',
						light: options.background || '#FFFFFF'
					},
					margin: options.margin || 4
				};

				console.log('QR Options being applied:', qrOptions);

				// Add logo if available
				const logoImage = document.getElementById('logoImage');
				if (logoImage && logoImage.src && !logoImage.src.includes('data:,')) {
					qrOptions.logo = logoImage.src;
					qrOptions.logoWidth = Math.floor(qrOptions.width * 0.2);
					qrOptions.logoHeight = Math.floor(qrOptions.width * 0.2);
					console.log('Logo applied:', logoImage.src);
				}

				// Add gradient if enabled
				const gradientStart = document.getElementById('gradientStart')?.value;
				const gradientEnd = document.getElementById('gradientEnd')?.value;
				
				if (gradientStart && gradientEnd && gradientStart !== gradientEnd) {
					qrOptions.color = {
						dark: gradientStart,
						light: options.background || '#FFFFFF'
					};
					console.log('Gradient applied:', gradientStart, 'to', gradientEnd);
				}

				console.log('Final QR options:', qrOptions);

				// Try to generate QR with callback style first
				if (typeof QRCode.toDataURL === 'function') {
					QRCode.toDataURL(data, qrOptions, (err, url) => {
						if (err) {
							console.error('QRCode generation error:', err);
							reject(err);
						} else {
							console.log('QR generated successfully with callback');
							resolve(url);
						}
					});
				} else {
					// Fallback for non-callback style
					try {
						const url = QRCode.toDataURL(data, qrOptions);
						console.log('QR generated successfully without callback');
						resolve(url);
					} catch (error) {
						console.error('QRCode generation error (non-callback):', error);
						reject(error);
					}
				}
			} catch (error) {
				console.error('Error in createQRCode:', error);
				reject(error);
			}
		});
	}

	displayQR() {
		if (!this.generatedQR) return;

		const preview = document.getElementById('qrPreview');
		const info = document.getElementById('qrInfo');
		const downloadBtn = document.getElementById('downloadBtn');
		const shareBtn = document.getElementById('shareBtn');

		preview.innerHTML = `<img src="${this.generatedQR.image}" alt="QR Code" class="qr-image">`;

		document.getElementById('qrTypeInfo').textContent = this.generatedQR.type;
		document.getElementById('qrSizeInfo').textContent = `${this.generatedQR.options.size}x${this.generatedQR.options.size}`;
		document.getElementById('qrErrorInfo').textContent = this.generatedQR.options.errorCorrectionLevel;
		info.style.display = 'block';

		downloadBtn.disabled = false;
		shareBtn.disabled = false;
	}

	// Download QR
	async downloadQR() {
		if (!this.generatedQR) return;

		// Load FileSaver if not available
		if (typeof saveAs === 'undefined') {
			await this.loadFileSaver();
		}

		// Convert data URL to blob and save
		const response = await fetch(this.generatedQR.image);
		const blob = await response.blob();
		saveAs(blob, `qr-${this.currentQRType.id}-${Date.now()}.png`);
	}

	// Load FileSaver dynamically
	async loadFileSaver() {
		return new Promise((resolve) => {
			if (typeof saveAs !== 'undefined') {
				resolve();
				return;
			}

			const script = document.createElement('script');
			script.src = 'js/libs/FileSaver.min.js'; // Use local version instead of CDN
			script.onload = () => resolve();
			script.onerror = () => resolve(); // Continue without FileSaver
			document.head.appendChild(script);
		});
	}

	// Share QR
	async shareQR() {
		if (!this.generatedQR) return;

		if (navigator.share) {
			try {
				const response = await fetch(this.generatedQR.image);
				const blob = await response.blob();
				const file = new File([blob], 'qr-code.png', { type: 'image/png' });

				await navigator.share({
					title: 'QR Code',
					text: `${this.t('qr.shareText')}: ${this.getTypeName(this.currentQRType)}`,
					files: [file]
				});
			} catch (error) {
				console.error('Error sharing:', error);
				this.showToast('error', this.t('qr.shareError'));
			}
		} else {
			this.copyToClipboard(this.generatedQR.data);
		}
	}

	async copyToClipboard(text) {
		try {
			await navigator.clipboard.writeText(text);
			this.showToast('success', this.t('copy.success'));
		} catch (error) {
			console.error('Error copying to clipboard:', error);
			this.showToast('error', this.t('copy.error'));
		}
	}

	// History Management
	saveToHistory() {
		if (!this.generatedQR) return;

		const historyItem = {
			...this.generatedQR,
			id: Date.now().toString()
		};

		this.history.unshift(historyItem);

		if (this.history.length > 20) {
			this.history = this.history.slice(0, 20);
		}

		this.saveHistory();
	}

	loadHistory() {
		try {
			const saved = localStorage.getItem('qr-history');
			return saved ? JSON.parse(saved) : [];
		} catch (error) {
			console.error('Error loading history:', error);
			return [];
		}
	}

	saveHistory() {
		try {
			localStorage.setItem('qr-history', JSON.stringify(this.history));
		} catch (error) {
			console.error('Error saving history:', error);
		}
	}

	// Theme Management
	loadTheme() {
		const savedTheme = localStorage.getItem('theme') || 'light';
		document.documentElement.setAttribute('data-theme', savedTheme);
	}

	toggleTheme() {
		const currentTheme = document.documentElement.getAttribute('data-theme');
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);
	}

	// Loading State
	showLoading(show) {
		const overlay = document.getElementById('loadingOverlay');
		if (overlay) {
			overlay.style.display = show ? 'flex' : 'none';
		}
	}

	// Show toast notifications
	showToast(type, message) {
		const container = document.getElementById('toastContainer');
		if (!container) return;

		const toast = document.createElement('div');
		toast.className = `toast ${type}`;
		toast.innerHTML = `
			<div class="toast-header">
				<span class="toast-title">${this.getToastTitle(type)}</span>
				<button class="toast-close" onclick="this.parentElement.parentElement.remove()">
					<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
						<path d="M6 18L18 6M6 6l12 12"/>
					</svg>
				</button>
			</div>
			<div class="toast-message"></div>
		`;
		toast.querySelector('.toast-message').textContent = message;

		container.appendChild(toast);

		setTimeout(() => {
			if (toast.parentElement) {
				toast.remove();
			}
		}, 5000);
	}

	getToastTitle(type) {
		switch (type) {
			case 'success': return this.t('toast.success');
			case 'error': return this.t('toast.error');
			case 'warning': return this.t('toast.warning');
			case 'info': return this.t('toast.info');
			default: return this.t('toast.default');
		}
	}

	// Event Binding
	bindEvents() {
		document.getElementById('qrForm')?.addEventListener('submit', (e) => {
			e.preventDefault();
			this.generateQR();
		});

		document.getElementById('previewBtn')?.addEventListener('click', () => {
			this.generateQR();
		});

		document.getElementById('generateBtn')?.addEventListener('click', (e) => {
			e.preventDefault();
			this.generateQR();
		});

		document.getElementById('closeForm')?.addEventListener('click', () => {
			this.hideGeneratorForm();
		});

		document.getElementById('downloadBtn')?.addEventListener('click', () => {
			this.downloadQR();
		});

		document.getElementById('shareBtn')?.addEventListener('click', () => {
			this.shareQR();
		});

		document.getElementById('themeToggle')?.addEventListener('click', () => {
			this.toggleTheme();
		});

		document.getElementById('qrMargin')?.addEventListener('input', (e) => {
			document.getElementById('qrMarginValue').textContent = e.target.value;
		});

		// Customization tabs
		this.setupCustomizationTabs();

		// Color picker sync
		this.setupColorPickers();

		// Logo upload
		this.setupLogoUpload();

		// Customization actions
		document.getElementById('resetCustomization')?.addEventListener('click', () => {
			this.resetCustomization();
		});

		document.getElementById('applyCustomization')?.addEventListener('click', () => {
			this.applyCustomization();
		});

		// Export buttons
		document.getElementById('exportPNG')?.addEventListener('click', () => {
			this.exportQR('png');
		});

		document.getElementById('exportSVG')?.addEventListener('click', () => {
			this.exportQR('svg');
		});

		document.getElementById('exportPDF')?.addEventListener('click', () => {
			this.exportQR('pdf');
		});

		this.setCurrentYear();

		// Show scanner button
		const showScannerBtn = document.getElementById('showScannerBtn');
		showScannerBtn?.addEventListener('click', () => {
			this.showQRScanner();
		});

		// Show batch QR generation button
		const showBatchBtn = document.getElementById('showBatchBtn');
		showBatchBtn?.addEventListener('click', () => {
			this.showBatchQRGeneration();
		});

		// Keyboard navigation
		this.setupKeyboardNavigation();

		// Language selector
		const langSelector = document.getElementById('languageSelector');
		if (langSelector) {
			langSelector.addEventListener('change', (e) => {
				this.changeLanguage(e.target.value);
			});
		}
	}

	// Setup customization tabs
	setupCustomizationTabs() {
		const tabBtns = document.querySelectorAll('.tab-btn');
		const tabContents = document.querySelectorAll('.tab-content');

		tabBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				const tabName = btn.dataset.tab;

				// Remove active class from all tabs
				tabBtns.forEach(b => b.classList.remove('active'));
				tabContents.forEach(c => c.classList.remove('active'));

				// Add active class to clicked tab
				btn.classList.add('active');
				document.getElementById(`${tabName}-tab`).classList.add('active');
			});
		});
	}

	// Setup color pickers
	setupColorPickers() {
		const foregroundPicker = document.getElementById('qrForeground');
		const foregroundText = document.getElementById('qrForegroundText');
		const backgroundPicker = document.getElementById('qrBackground');
		const backgroundText = document.getElementById('qrBackgroundText');

		// Sync color picker with text input
		foregroundPicker?.addEventListener('input', (e) => {
			foregroundText.value = e.target.value;
		});

		foregroundText?.addEventListener('input', (e) => {
			if (e.target.value.match(/^#[0-9A-F]{6}$/i)) {
				foregroundPicker.value = e.target.value;
			}
		});

		backgroundPicker?.addEventListener('input', (e) => {
			backgroundText.value = e.target.value;
		});

		backgroundText?.addEventListener('input', (e) => {
			if (e.target.value.match(/^#[0-9A-F]{6}$/i)) {
				backgroundPicker.value = e.target.value;
			}
		});
	}

	// Setup logo upload
	setupLogoUpload() {
		const fileUploadArea = document.getElementById('fileUploadArea');
		const logoUpload = document.getElementById('logoUpload');
		const logoPreview = document.getElementById('logoPreview');
		const removeLogo = document.getElementById('removeLogo');

		// Drag and drop
		fileUploadArea?.addEventListener('dragover', (e) => {
			e.preventDefault();
			fileUploadArea.classList.add('dragover');
		});

		fileUploadArea?.addEventListener('dragleave', () => {
			fileUploadArea.classList.remove('dragover');
		});

		fileUploadArea?.addEventListener('drop', (e) => {
			e.preventDefault();
			fileUploadArea.classList.remove('dragover');
			const files = e.dataTransfer.files;
			if (files.length > 0) {
				this.handleLogoFile(files[0]);
			}
		});

		// File input change
		logoUpload?.addEventListener('change', (e) => {
			if (e.target.files.length > 0) {
				this.handleLogoFile(e.target.files[0]);
			}
		});

		// Remove logo
		removeLogo?.addEventListener('click', () => {
			logoUpload.value = '';
			logoPreview.style.display = 'none';
			fileUploadArea.style.display = 'block';
		});
	}

	// Handle logo file
	handleLogoFile(file) {
		if (!file.type.startsWith('image/')) {
			this.showToast('error', this.t('upload.invalidType'));
			return;
		}

		if (file.size > 2 * 1024 * 1024) { // 2MB limit
			this.showToast('error', this.t('upload.tooLarge'));
			return;
		}

		const reader = new FileReader();
		reader.onload = (e) => {
			const logoImage = document.getElementById('logoImage');
			const logoPreview = document.getElementById('logoPreview');
			const fileUploadArea = document.getElementById('fileUploadArea');

			logoImage.src = e.target.result;
			logoPreview.style.display = 'block';
			fileUploadArea.style.display = 'none';
		};
		reader.readAsDataURL(file);
	}

	// Reset customization
	resetCustomization() {
		document.getElementById('qrSize').value = '256';
		document.getElementById('qrErrorLevel').value = 'M';
		document.getElementById('qrForeground').value = '#000000';
		document.getElementById('qrForegroundText').value = '#000000';
		document.getElementById('qrBackground').value = '#FFFFFF';
		document.getElementById('qrBackgroundText').value = '#FFFFFF';
		document.getElementById('qrMargin').value = '4';
		document.getElementById('qrMarginValue').textContent = '4';
		document.getElementById('qrStyle').value = 'square';
		document.getElementById('gradientStart').value = '#2563eb';
		document.getElementById('gradientEnd').value = '#1d4ed8';
		document.getElementById('gradientDirection').value = 'horizontal';

		// Reset logo
		document.getElementById('logoUpload').value = '';
		document.getElementById('logoPreview').style.display = 'none';
		document.getElementById('fileUploadArea').style.display = 'block';

		this.showToast('success', this.t('customize.reset'));
	}

	// Apply customization
	applyCustomization() {
		if (this.generatedQR) {
			this.generateQR(); // Regenerate with new settings
		}
		this.showToast('success', this.t('customize.applied'));
	}

	// Load QRCode library dynamically
	async loadQRCodeLibrary() {
		return new Promise((resolve) => {
			// Check if already loaded
			if (typeof QRCode !== 'undefined') {
				resolve();
				return;
			}

			const script = document.createElement('script');
			script.src = 'js/libs/qrcode.min.js';
			script.onload = () => {
				resolve();
			};
			script.onerror = () => {
				console.error('QRCode library failed to load from local assets');
				resolve();
			};
			document.head.appendChild(script);
		});
	}

	// Set current year
	setCurrentYear() {
		const yearSpan = document.getElementById('currentYear');
		if (yearSpan) {
			yearSpan.textContent = new Date().getFullYear();
		}
	}

	// QR Scanner functionality
	initQRScanner() {
		const startBtn = document.getElementById('startScannerBtn');
		const stopBtn = document.getElementById('stopScannerBtn');
		const video = document.getElementById('scannerVideo');
		const canvas = document.getElementById('scannerCanvas');
		const resultContent = document.getElementById('resultContent');
		const scannerResult = document.getElementById('scannerResult');
		const copyBtn = document.getElementById('copyResultBtn');
		const openBtn = document.getElementById('openResultBtn');
		
		let stream = null;
		
		startBtn?.addEventListener('click', async () => {
			try {
				stream = await navigator.mediaDevices.getUserMedia({ 
					video: { facingMode: 'environment' } 
				});
				this._scannerStream = stream;
				video.srcObject = stream;
				startBtn.disabled = true;
				stopBtn.disabled = false;
				
				// Start scanning
				this.scanQRCode(video, canvas);
			} catch (err) {
				console.error('Error accessing camera:', err);
				this.showToast('error', this.t('camera.error'));
			}
		});
		
		stopBtn?.addEventListener('click', () => {
			if (stream) {
				stream.getTracks().forEach(track => track.stop());
				stream = null;
			}
			startBtn.disabled = false;
			stopBtn.disabled = true;
			scannerResult.style.display = 'none';
		});
		
		copyBtn?.addEventListener('click', () => {
			const text = resultContent.textContent;
			if (text) {
				navigator.clipboard.writeText(text).then(() => {
					this.showToast('success', this.t('copy.success'));
				}).catch(err => {
					console.error('Failed to copy:', err);
					this.showToast('error', this.t('copy.error'));
				});
			}
		});
		
		openBtn?.addEventListener('click', () => {
			const text = resultContent.textContent;
			if (text) {
				try {
					// Try to parse as URL
					new URL(text);
					window.open(text, '_blank');
				} catch {
					// If not a URL, show as alert
					alert(text);
				}
			}
		});
	}
	
	scanQRCode(video, canvas) {
		if (!video || !canvas) return;
		
		const ctx = canvas.getContext('2d');
		
		const scan = () => {
			if (video.readyState === video.HAVE_ENOUGH_DATA) {
				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;
				ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
				
				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				const code = jsQR(imageData.data, imageData.width, imageData.height);
				
				if (code) {
					// QR code detected
					const resultContent = document.getElementById('resultContent');
					const scannerResult = document.getElementById('scannerResult');
					
					if (resultContent && scannerResult) {
						resultContent.textContent = code.data;
						scannerResult.style.display = 'block';
						
						// Stop scanning
						if (this._scannerStream) {
							this._scannerStream.getTracks().forEach(track => track.stop());
						}
						
						const startBtn = document.getElementById('startScannerBtn');
						const stopBtn = document.getElementById('stopScannerBtn');
						if (startBtn && stopBtn) {
							startBtn.disabled = false;
							stopBtn.disabled = true;
						}
						
						this.showToast('success', this.t('scanner.success'));
					}
					return;
				}
			}
			
			// Continue scanning
			requestAnimationFrame(scan);
		};
		
		scan();
	}
	
	// Show QR scanner section
	showQRScanner() {
		const scannerSection = document.getElementById('qrScannerSection');
		if (scannerSection) {
			scannerSection.style.display = 'block';
			scannerSection.scrollIntoView({ behavior: 'smooth' });
			this.initQRScanner();
		}
	}

	// Download individual batch QR
	async downloadBatchQR(index) {
		if (!this.batchGeneratedCodes || !this.batchGeneratedCodes[index]) {
			this.showToast('error', this.t('batch.download.error'));
			return;
		}

		const qrCode = this.batchGeneratedCodes[index];
		
		// Load FileSaver if not available
		if (typeof saveAs === 'undefined') {
			await this.loadFileSaver();
		}

		// Convert data URL to blob and save
		const response = await fetch(qrCode.image);
		const blob = await response.blob();
		const filename = `batch-qr-${index + 1}-${Date.now()}.png`;
		saveAs(blob, filename);
		
		this.showToast('success', this.t('batch.download.successSingle', { index: index + 1 }));
	}

	// Convert QR code to SVG
	qrToSVG(data, options = {}) {
		const size = options.size || 256;
		const foreground = options.foreground || '#000000';
		const background = options.background || '#FFFFFF';
		const margin = options.margin || 4;

		const tempDiv = document.createElement('div');
		tempDiv.style.position = 'absolute';
		tempDiv.style.left = '-9999px';
		document.body.appendChild(tempDiv);

		try {
			const qr = new QRCode(tempDiv, {
				text: data,
				width: size,
				errorCorrectionLevel: options.errorCorrectionLevel || 'M',
				color: { dark: foreground, light: background }
			});

			const qrData = qr._oQRCode;
			if (!qrData) throw new Error('QR Code not generated');

			const moduleCount = qrData.getModuleCount();
			const cellSize = Math.floor((size - 2 * margin) / moduleCount);
			const offset = Math.floor((size - moduleCount * cellSize) / 2);

			let rects = '';
			for (let row = 0; row < moduleCount; row++) {
				for (let col = 0; col < moduleCount; col++) {
					if (qrData.isDark(row, col)) {
						const x = offset + col * cellSize;
						const y = offset + row * cellSize;
						rects += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${foreground}"/>`;
					}
				}
			}

			const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="${background}"/>${rects}</svg>`;
			return `data:image/svg+xml;base64,${btoa(svg)}`;
		} finally {
			document.body.removeChild(tempDiv);
		}
	}

	// Download all batch QRs as ZIP
	async downloadAllBatchQRs() {
		if (!this.batchGeneratedCodes || this.batchGeneratedCodes.length === 0) {
			this.showToast('error', this.t('batch.download.errorAll'));
			return;
		}

		try {
			// Load JSZip if not available
			if (typeof JSZip === 'undefined') {
				await this.loadJSZip();
			}

			const zip = new JSZip();
			
			// Add each QR code to the ZIP
			for (let i = 0; i < this.batchGeneratedCodes.length; i++) {
				const qrCode = this.batchGeneratedCodes[i];
				const response = await fetch(qrCode.image);
				const blob = await response.blob();
				zip.file(`qr-${i + 1}.png`, blob);
			}

			// Generate and download ZIP
			const content = await zip.generateAsync({ type: 'blob' });
			
			// Load FileSaver if not available
			if (typeof saveAs === 'undefined') {
				await this.loadFileSaver();
			}
			
			saveAs(content, `batch-qrs-${Date.now()}.zip`);
			
			this.showToast('success', this.t('batch.download.successAll'));
		} catch (error) {
			console.error('Error downloading batch QRs:', error);
			this.showToast('error', this.t('batch.download.error'));
		}
	}

	// Load JSZip dynamically
	async loadJSZip() {
		return new Promise((resolve) => {
			if (typeof JSZip !== 'undefined') {
				resolve();
				return;
			}

			const script = document.createElement('script');
			script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
			script.integrity = 'sha512-XMVd2n9g32bQfPmf2M5i0HNYfQGVNbV5MdT5iFsEBlk0OkNfy+Bg2nZJvtx/fLXz1szpW/KYx/nG/rus79BYUA==';
			script.crossOrigin = 'anonymous';
			script.onload = () => resolve();
			script.onerror = () => resolve(); // Continue without JSZip
			document.head.appendChild(script);
		});
	}

	// Export QR code in different formats
	async exportQR(format) {
		if (!this.generatedQR) {
			this.showToast('error', this.t('export.error'));
			return;
		}

		try {
			switch (format) {
				case 'png':
					await this.exportAsPNG();
					break;
				case 'svg':
					await this.exportAsSVG();
					break;
				case 'pdf':
					await this.exportAsPDF();
					break;
				default:
					this.showToast('error', this.t('export.unsupported'));
			}
		} catch (error) {
			console.error('Error exporting QR code:', error);
			this.showToast('error', this.t('export.errorDetail', { error: error.message }));
		}
	}

	// Export as PNG
	async exportAsPNG() {
		// Load FileSaver if not available
		if (typeof saveAs === 'undefined') {
			await this.loadFileSaver();
		}

		// Convert data URL to blob and save
		const response = await fetch(this.generatedQR.image);
		const blob = await response.blob();
		const filename = `qr-${this.currentQRType.id}-${Date.now()}.png`;
		saveAs(blob, filename);

		this.showToast('success', this.t('export.png'));
	}

	// Export as SVG
	async exportAsSVG() {
		// Load FileSaver if not available
		if (typeof saveAs === 'undefined') {
			await this.loadFileSaver();
		}

		// Generate SVG data
		const svgData = this.qrToSVG(this.generatedQR.data, this.generatedQR.options);
		
		// Convert data URL to blob
		const response = await fetch(svgData);
		const blob = await response.blob();
		const filename = `qr-${this.currentQRType.id}-${Date.now()}.svg`;
		saveAs(blob, filename);

		this.showToast('success', this.t('export.svg'));
	}

	// Export as PDF
	async exportAsPDF() {
		// Load jsPDF if not available
		if (typeof jspdf !== 'undefined' && typeof jspdf.jsPDF !== 'undefined') {
			const { jsPDF } = jspdf;
			
			// Create PDF
			const pdf = new jsPDF();
			
			// Add QR code image to PDF
			const img = new Image();
			img.onload = () => {
				pdf.addImage(img, 'PNG', 10, 10, 100, 100);
				pdf.text(this.t('export.pdfTitle', { type: this.generatedQR.type }), 10, 120);
				pdf.save(`qr-${this.currentQRType.id}-${Date.now()}.pdf`);
				this.showToast('success', this.t('export.pdf'));
			};
			img.src = this.generatedQR.image;
		} else {
			// Load jsPDF dynamically
			const script = document.createElement('script');
			script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
			script.onload = async () => {
				const { jsPDF } = window.jspdf;
				
				// Create PDF
				const pdf = new jsPDF();
				
				// Add QR code image to PDF
				const img = new Image();
				img.onload = () => {
					pdf.addImage(img, 'PNG', 10, 10, 100, 100);
					pdf.text(this.t('export.pdfTitle', { type: this.generatedQR.type }), 10, 120);
					pdf.save(`qr-${this.currentQRType.id}-${Date.now()}.pdf`);
					this.showToast('success', this.t('export.pdf'));
				};
				img.src = this.generatedQR.image;
			};
			document.head.appendChild(script);
		}
	}

	// Show batch QR generation section
	showBatchQRGeneration() {
		const batchSection = document.getElementById('batchQRSection');
		if (batchSection) {
			batchSection.style.display = 'block';
			batchSection.scrollIntoView({ behavior: 'smooth' });
			this.initBatchQRGeneration();
		}
	}

	// Initialize batch QR generation functionality
	initBatchQRGeneration() {
		const generateBtn = document.getElementById('generateBatchBtn');
		const downloadBtn = document.getElementById('downloadBatchBtn');
		const batchData = document.getElementById('batchData');
		const batchResults = document.getElementById('batchResults');
		const batchResultsGrid = document.getElementById('batchResultsGrid');

		generateBtn?.addEventListener('click', async () => {
			const data = batchData.value.trim();
			if (!data) {
				this.showToast('error', this.t('batch.generate.error'));
				return;
			}

			const lines = data.split('\n').filter(line => line.trim() !== '');
			if (lines.length === 0) {
				this.showToast('error', this.t('batch.generate.errorInvalid'));
				return;
			}

			// Get options
			const qrType = document.getElementById('batchQRType').value;
			const size = parseInt(document.getElementById('batchSize').value);
			const errorLevel = document.getElementById('batchErrorLevel').value;

			const options = {
				size: size,
				errorCorrectionLevel: errorLevel,
				foreground: '#000000',
				background: '#FFFFFF',
				margin: 4
			};

			// Clear previous results
			batchResultsGrid.innerHTML = '';
			batchResults.style.display = 'block';

			// Generate QR codes
			const generatedCodes = [];
			for (let i = 0; i < lines.length; i++) {
				const line = lines[i].trim();
				if (!line) continue;

				try {
					// Generate QR code based on type using the proper QR_TYPES generator
					let qrData = line;
					if (QR_TYPES[qrType] && QR_TYPES[qrType].generate) {
						qrData = QR_TYPES[qrType].generate({ url: line, text: line, email: line, ssid: line, phone: line, firstName: line });
					}

					const qrImage = await this.createQRCode(qrData, options);

					generatedCodes.push({
						data: line,
						image: qrImage,
						options: options
					});

					// Create result item
					const resultItem = document.createElement('div');
					resultItem.className = 'result-item';
					const imgContainer = document.createElement('div');
					imgContainer.innerHTML = `<img src="${qrImage}" alt="QR Code ${i + 1}" />`;
					resultItem.appendChild(imgContainer.firstElementChild);
					const dataDiv = document.createElement('div');
					dataDiv.className = 'result-data';
					dataDiv.textContent = line.substring(0, 30) + (line.length > 30 ? '...' : '');
					resultItem.appendChild(dataDiv);
					const actionsDiv = document.createElement('div');
					actionsDiv.className = 'result-actions';
					const dlBtn = document.createElement('button');
					dlBtn.className = 'btn btn-small btn-primary';
					dlBtn.textContent = this.t('batch.download.single');
					dlBtn.addEventListener('click', () => this.downloadBatchQR(i));
					actionsDiv.appendChild(dlBtn);
					resultItem.appendChild(actionsDiv);

					batchResultsGrid.appendChild(resultItem);

				} catch (error) {
					console.error('Error generating QR code:', error);
					this.showToast('error', this.t('batch.generate.errorSingle', { index: i + 1, error: error.message }));
				}
			}

			// Enable download all button
			if (generatedCodes.length > 0) {
				downloadBtn.disabled = false;
				this.batchGeneratedCodes = generatedCodes;
			} else {
				downloadBtn.disabled = true;
				this.batchGeneratedCodes = [];
			}

			this.showToast('success', this.t('batch.generate.success', { count: generatedCodes.length }));
		});

		// Download all button
		downloadBtn?.addEventListener('click', () => {
			this.downloadAllBatchQRs();
		});
	}

	// Setup keyboard navigation
	setupKeyboardNavigation() {
		// Add keyboard navigation for QR type cards
		const qrTypeGrid = document.getElementById('qrTypeGrid');
		if (qrTypeGrid) {
			qrTypeGrid.addEventListener('keydown', (e) => {
				const cards = Array.from(qrTypeGrid.querySelectorAll('.qr-type-card'));
				const currentIndex = cards.indexOf(document.activeElement);
				
				switch (e.key) {
					case 'ArrowRight':
						if (currentIndex < cards.length - 1) {
							cards[currentIndex + 1].focus();
							e.preventDefault();
						}
						break;
					case 'ArrowLeft':
						if (currentIndex > 0) {
							cards[currentIndex - 1].focus();
							e.preventDefault();
						}
						break;
					case 'ArrowDown':
						if (currentIndex < cards.length - 1) {
							cards[currentIndex + 1].focus();
							e.preventDefault();
						}
						break;
					case 'ArrowUp':
						if (currentIndex > 0) {
							cards[currentIndex - 1].focus();
							e.preventDefault();
						}
						break;
					case 'Enter':
					case ' ':
						if (document.activeElement.classList.contains('qr-type-card')) {
							const type = document.activeElement.dataset.type;
							if (type && QR_TYPES[type]) {
								this.selectQRType(QR_TYPES[type]);
								e.preventDefault();
							}
						}
						break;
				}
			});
		}

		// Add keyboard shortcuts
		document.addEventListener('keydown', (e) => {
			// Ctrl+Enter to generate QR
			if (e.ctrlKey && e.key === 'Enter' && this.currentQRType) {
				this.generateQR();
				e.preventDefault();
			}
			
			// Escape to close form
			if (e.key === 'Escape' && document.getElementById('qrGeneratorSection').style.display !== 'none') {
				this.hideGeneratorForm();
				e.preventDefault();
			}
		});
	}
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
	window.qrApp = new QRGeneratorApp();
});
