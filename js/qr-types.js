// QR Types Configuration
// Note: Names and descriptions are now translated via the translation system
// Translation keys follow the pattern: qrType.[type].name and qrType.[type].description
const QR_TYPES = {
	url: {
		id: 'url',
		name: 'URL', // Translated via qrType.url.name
		description: 'Enlace a una página web', // Translated via qrType.url.description
		icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
		category: 'web',
		fields: [
			{
				name: 'url',
				label: 'URL',
				type: 'url',
				placeholder: 'https://ejemplo.com',
				required: true
			}
		],
		generate: (data) => data.url
	},

	text: {
		id: 'text',
		name: 'Texto', // Translated via qrType.text.name
		description: 'Texto libre personalizado', // Translated via qrType.text.description
		icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
		category: 'general',
		fields: [
			{
				name: 'text',
				label: 'Texto',
				type: 'textarea',
				placeholder: 'Escribe tu texto aquí...',
				required: true,
				rows: 4
			}
		],
		generate: (data) => data.text
	},

	email: {
		id: 'email',
		name: 'Email', // Translated via qrType.email.name
		description: 'Dirección de correo electrónico', // Translated via qrType.email.description
		icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
		category: 'communication',
		fields: [
			{
				name: 'email',
				label: 'Email',
				type: 'email',
				placeholder: 'usuario@ejemplo.com',
				required: true
			},
			{
				name: 'subject',
				label: 'Asunto',
				type: 'text',
				placeholder: 'Asunto del email'
			},
			{
				name: 'body',
				label: 'Cuerpo',
				type: 'textarea',
				placeholder: 'Contenido del email...',
				rows: 3
			}
		],
		generate: (data) => {
			let mailto = `mailto:${data.email}`;
			const params = [];
			if (data.subject) params.push(`subject=${encodeURIComponent(data.subject)}`);
			if (data.body) params.push(`body=${encodeURIComponent(data.body)}`);
			if (params.length > 0) mailto += '?' + params.join('&');
			return mailto;
		}
	},

	sms: {
		id: 'sms',
		name: 'SMS', // Translated via qrType.sms.name
		description: 'Mensaje de texto', // Translated via qrType.sms.description
		icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
		category: 'communication',
		fields: [
			{
				name: 'phone',
				label: 'Número de teléfono',
				type: 'tel',
				placeholder: '+53 5 123 4567',
				required: true
			},
			{
				name: 'message',
				label: 'Mensaje',
				type: 'textarea',
				placeholder: 'Escribe tu mensaje...',
				required: true,
				rows: 3
			}
		],
		generate: (data) => `sms:${data.phone}?body=${encodeURIComponent(data.message)}`
	},

	whatsapp: {
		id: 'whatsapp',
		name: 'WhatsApp', // Translated via qrType.whatsapp.name
		description: 'Mensaje de WhatsApp', // Translated via qrType.whatsapp.description
		icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
		category: 'communication',
		fields: [
			{
				name: 'phone',
				label: 'Número de teléfono',
				type: 'tel',
				placeholder: '+53 5 123 4567',
				required: true
			},
			{
				name: 'message',
				label: 'Mensaje',
				type: 'textarea',
				placeholder: 'Escribe tu mensaje...',
				rows: 3
			}
		],
		generate: (data) => {
			let whatsapp = `https://wa.me/${data.phone.replace(/\D/g, '')}`;
			if (data.message) {
				whatsapp += `?text=${encodeURIComponent(data.message)}`;
			}
			return whatsapp;
		}
	},

	telegram: {
		id: 'telegram',
		name: 'Telegram', // Translated via qrType.telegram.name
		description: 'Mensaje de Telegram', // Translated via qrType.telegram.description
		icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
		category: 'communication',
		fields: [
			{
				name: 'username',
				label: 'Usuario o número',
				type: 'text',
				placeholder: '@usuario o +53 5 123 4567',
				required: true
			},
			{
				name: 'message',
				label: 'Mensaje',
				type: 'textarea',
				placeholder: 'Escribe tu mensaje...',
				rows: 3
			}
		],
		generate: (data) => {
			let telegram = `https://t.me/${data.username.replace('@', '')}`;
			if (data.message) {
				telegram += `?text=${encodeURIComponent(data.message)}`;
			}
			return telegram;
		}
	},

	call: {
		id: 'call',
		name: 'Llamada', // Translated via qrType.call.name
		description: 'Realizar una llamada telefónica', // Translated via qrType.call.description
		icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
		category: 'communication',
		fields: [
			{
				name: 'phone',
				label: 'Número de teléfono',
				type: 'tel',
				placeholder: '+53 5 123 4567',
				required: true
			}
		],
		generate: (data) => `tel:${data.phone}`
	},

	wifi: {
		id: 'wifi',
		name: 'WiFi', // Translated via qrType.wifi.name
		description: 'Configuración de red WiFi', // Translated via qrType.wifi.description
		icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0',
		category: 'network',
		fields: [
			{
				name: 'ssid',
				label: 'Nombre de la red (SSID)',
				type: 'text',
				placeholder: 'MiWiFi',
				required: true
			},
			{
				name: 'password',
				label: 'Contraseña',
				type: 'password',
				placeholder: 'Contraseña WiFi'
			},
			{
				name: 'encryption',
				label: 'Tipo de encriptación',
				type: 'select',
				options: [
					{ value: 'WPA', label: 'WPA/WPA2/WPA3' },
					{ value: 'WEP', label: 'WEP' },
					{ value: 'nopass', label: 'Sin contraseña' }
				],
				default: 'WPA'
			},
			{
				name: 'hidden',
				label: 'Red oculta',
				type: 'select',
				options: [
					{ value: 'false', label: 'No' },
					{ value: 'true', label: 'Sí' }
				],
				default: 'false'
			}
		],
		generate: (data) => {
			let wifi = `WIFI:S:${data.ssid};T:${data.encryption};`;
			if (data.password) {
				wifi += `P:${data.password};`;
			}
			if (data.hidden === 'true') {
				wifi += 'H:true;';
			}
			return wifi;
		}
	},

	vcard: {
		id: 'vcard',
		name: 'Contacto', // Translated via qrType.vcard.name
		description: 'Información de contacto (vCard)', // Translated via qrType.vcard.description
		icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
		category: 'contact',
		fields: [
			{
				name: 'firstName',
				label: 'Nombre',
				type: 'text',
				placeholder: 'Juan',
				required: true
			},
			{
				name: 'lastName',
				label: 'Apellido',
				type: 'text',
				placeholder: 'Pérez',
				required: true
			},
			{
				name: 'phone',
				label: 'Teléfono',
				type: 'tel',
				placeholder: '+53 5 123 4567'
			},
			{
				name: 'email',
				label: 'Email',
				type: 'email',
				placeholder: 'juan@ejemplo.com'
			},
			{
				name: 'company',
				label: 'Empresa',
				type: 'text',
				placeholder: 'Mi Empresa'
			},
			{
				name: 'title',
				label: 'Cargo',
				type: 'text',
				placeholder: 'Desarrollador'
			},
			{
				name: 'website',
				label: 'Sitio web',
				type: 'url',
				placeholder: 'https://ejemplo.com'
			}
		],
		generate: (data) => {
			const esc = (s) => (s || '').replace(/[\\;,]/g, '\\$&').replace(/\n/g, '\\n');
			let vcard = 'BEGIN:VCARD\r\nVERSION:3.0\r\n';
			vcard += `FN:${esc(data.firstName)} ${esc(data.lastName)}\r\n`;
			vcard += `N:${esc(data.lastName)};${esc(data.firstName)};;;\r\n`;
			if (data.phone) vcard += `TEL:${esc(data.phone)}\r\n`;
			if (data.email) vcard += `EMAIL:${data.email}\r\n`;
			if (data.company) vcard += `ORG:${esc(data.company)}\r\n`;
			if (data.title) vcard += `TITLE:${esc(data.title)}\r\n`;
			if (data.website) vcard += `URL:${data.website}\r\n`;
			vcard += 'END:VCARD';
			return vcard;
		}
	},

	location: {
		id: 'location',
		name: 'Ubicación', // Translated via qrType.location.name
		description: 'Coordenadas GPS', // Translated via qrType.location.description
		icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
		category: 'location',
		fields: [
			{
				name: 'latitude',
				label: 'Latitud',
				type: 'number',
				placeholder: '23.1136',
				step: '0.0001',
				required: true
			},
			{
				name: 'longitude',
				label: 'Longitud',
				type: 'number',
				placeholder: '-82.3666',
				step: '0.0001',
				required: true
			},
			{
				name: 'name',
				label: 'Nombre del lugar',
				type: 'text',
				placeholder: 'Plaza de la Revolución'
			}
		],
		generate: (data) => {
			let geo = `geo:${data.latitude},${data.longitude}`;
			if (data.name) {
				geo += `?q=${encodeURIComponent(data.name)}`;
			}
			return geo;
		}
	},

	calendar: {
		id: 'calendar',
		name: 'Evento', // Translated via qrType.calendar.name
		description: 'Evento de calendario', // Translated via qrType.calendar.description
		icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
		category: 'events',
		fields: [
			{
				name: 'title',
				label: 'Título del evento',
				type: 'text',
				placeholder: 'Reunión importante',
				required: true
			},
			{
				name: 'startDate',
				label: 'Fecha de inicio',
				type: 'datetime-local',
				required: true
			},
			{
				name: 'endDate',
				label: 'Fecha de fin',
				type: 'datetime-local'
			},
			{
				name: 'description',
				label: 'Descripción',
				type: 'textarea',
				placeholder: 'Descripción del evento...',
				rows: 3
			},
			{
				name: 'location',
				label: 'Ubicación',
				type: 'text',
				placeholder: 'Oficina principal'
			}
		],
		generate: (data) => {
			const formatDate = (dateStr) => {
				return dateStr.replace(/[-:]/g, '').replace('T', 'T');
			};

			let ics = 'BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\n';
			ics += `SUMMARY:${data.title}\n`;
			ics += `DTSTART:${formatDate(data.startDate)}\n`;
			if (data.endDate) {
				ics += `DTEND:${formatDate(data.endDate)}\n`;
			}
			if (data.description) {
				ics += `DESCRIPTION:${data.description.replace(/\n/g, '\\n')}\n`;
			}
			if (data.location) {
				ics += `LOCATION:${data.location}\n`;
			}
			ics += 'END:VEVENT\nEND:VCALENDAR';
			return ics;
		}
	},

	bitcoin: {
		id: 'bitcoin',
		name: 'Bitcoin', // Translated via qrType.bitcoin.name
		description: 'Dirección de Bitcoin para pagos', // Translated via qrType.bitcoin.description
		icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
		category: 'payments',
		fields: [
			{
				name: 'address',
				label: 'Dirección Bitcoin',
				type: 'text',
				placeholder: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
				required: true
			},
			{
				name: 'amount',
				label: 'Cantidad (BTC)',
				type: 'number',
				placeholder: '0.001',
				step: '0.00000001'
			},
			{
				name: 'label',
				label: 'Etiqueta',
				type: 'text',
				placeholder: 'Pago por servicios'
			}
		],
		generate: (data) => {
			let bitcoin = `bitcoin:${data.address}`;
			const params = [];
			if (data.amount) params.push(`amount=${data.amount}`);
			if (data.label) params.push(`label=${encodeURIComponent(data.label)}`);
			if (params.length > 0) bitcoin += '?' + params.join('&');
			return bitcoin;
		}
	},

	ethereum: {
		id: 'ethereum',
		name: 'Ethereum', // Translated via qrType.ethereum.name
		description: 'Dirección de Ethereum para pagos', // Translated via qrType.ethereum.description
		icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
		category: 'payments',
		fields: [
			{
				name: 'address',
				label: 'Dirección Ethereum',
				type: 'text',
				placeholder: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
				required: true
			},
			{
				name: 'amount',
				label: 'Cantidad (ETH)',
				type: 'number',
				placeholder: '0.1',
				step: '0.000000000000000001'
			}
		],
		generate: (data) => {
			let ethereum = `ethereum:${data.address}`;
			if (data.amount) {
				ethereum += `?value=${data.amount}`;
			}
			return ethereum;
		}
	},

	paypal: {
		id: 'paypal',
		name: 'PayPal', // Translated via qrType.paypal.name
		description: 'Enlace de pago PayPal', // Translated via qrType.paypal.description
		icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
		category: 'payments',
		fields: [
			{
				name: 'email',
				label: 'Email de PayPal',
				type: 'email',
				placeholder: 'usuario@paypal.com',
				required: true
			},
			{
				name: 'amount',
				label: 'Cantidad',
				type: 'number',
				placeholder: '10.00',
				step: '0.01'
			},
			{
				name: 'currency',
				label: 'Moneda',
				type: 'select',
				options: [
					{ value: 'USD', label: 'USD - Dólar estadounidense' },
					{ value: 'EUR', label: 'EUR - Euro' },
					{ value: 'CUP', label: 'CUP - Peso cubano' }
				],
				default: 'USD'
			},
			{
				name: 'description',
				label: 'Descripción',
				type: 'text',
				placeholder: 'Pago por servicios'
			}
		],
		generate: (data) => {
			let paypal = `https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${encodeURIComponent(data.email)}`;
			if (data.amount) paypal += `&amount=${data.amount}`;
			if (data.currency) paypal += `&currency_code=${data.currency}`;
			if (data.description) paypal += `&item_name=${encodeURIComponent(data.description)}`;
			return paypal;
		}
	}
};

const QR_CATEGORIES = {
	web: { name: 'Web y Enlaces', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9' },
	communication: { name: 'Comunicación', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8' },
	network: { name: 'Redes', icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01' },
	contact: { name: 'Contactos', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
	location: { name: 'Ubicación', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
	events: { name: 'Eventos', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
	payments: { name: 'Pagos', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' },
	general: { name: 'General', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
};
