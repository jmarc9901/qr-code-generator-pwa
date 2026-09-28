// QR Types Configuration
// The strings below are English fallbacks. The UI translates them via the translation files:
//   qrType.[type].name / qrType.[type].description
//   qrType.[type].field.[field].label / .placeholder
//   qrType.[type].field.[field].option.[value]
const QR_TYPES = {
	url: {
		id: 'url',
		name: 'URL', // Translated via qrType.url.name
		description: 'Web page link', // Translated via qrType.url.description
		icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
		category: 'web',
		fields: [
			{
				name: 'url',
				label: 'URL',
				type: 'url',
				placeholder: 'https://example.com',
				required: true
			}
		],
		generate: (data) => data.url
	},

	text: {
		id: 'text',
		name: 'Text', // Translated via qrType.text.name
		description: 'Custom free text', // Translated via qrType.text.description
		icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
		category: 'general',
		fields: [
			{
				name: 'text',
				label: 'Text',
				type: 'textarea',
				placeholder: 'Write your text here...',
				required: true,
				rows: 4
			}
		],
		generate: (data) => data.text
	},

	email: {
		id: 'email',
		name: 'Email', // Translated via qrType.email.name
		description: 'Email address', // Translated via qrType.email.description
		icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
		category: 'communication',
		fields: [
			{
				name: 'email',
				label: 'Email',
				type: 'email',
				placeholder: 'user@example.com',
				required: true
			},
			{
				name: 'subject',
				label: 'Subject',
				type: 'text',
				placeholder: 'Email subject'
			},
			{
				name: 'body',
				label: 'Body',
				type: 'textarea',
				placeholder: 'Email content...',
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
		description: 'Text message', // Translated via qrType.sms.description
		icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
		category: 'communication',
		fields: [
			{
				name: 'phone',
				label: 'Phone number',
				type: 'tel',
				placeholder: '+1 555 123 4567',
				required: true
			},
			{
				name: 'message',
				label: 'Message',
				type: 'textarea',
				placeholder: 'Write your message...',
				required: true,
				rows: 3
			}
		],
		generate: (data) => `sms:${data.phone}?body=${encodeURIComponent(data.message)}`
	},

	whatsapp: {
		id: 'whatsapp',
		name: 'WhatsApp', // Translated via qrType.whatsapp.name
		description: 'WhatsApp message', // Translated via qrType.whatsapp.description
		icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
		category: 'communication',
		fields: [
			{
				name: 'phone',
				label: 'Phone number',
				type: 'tel',
				placeholder: '+1 555 123 4567',
				required: true
			},
			{
				name: 'message',
				label: 'Message',
				type: 'textarea',
				placeholder: 'Write your message...',
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
		description: 'Telegram message', // Translated via qrType.telegram.description
		icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
		category: 'communication',
		fields: [
			{
				name: 'username',
				label: 'Username or number',
				type: 'text',
				placeholder: '@username or +1 555 123 4567',
				required: true
			},
			{
				name: 'message',
				label: 'Message',
				type: 'textarea',
				placeholder: 'Write your message...',
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
		name: 'Call', // Translated via qrType.call.name
		description: 'Make a phone call', // Translated via qrType.call.description
		icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
		category: 'communication',
		fields: [
			{
				name: 'phone',
				label: 'Phone number',
				type: 'tel',
				placeholder: '+1 555 123 4567',
				required: true
			}
		],
		generate: (data) => `tel:${data.phone}`
	},

	wifi: {
		id: 'wifi',
		name: 'WiFi', // Translated via qrType.wifi.name
		description: 'WiFi network configuration', // Translated via qrType.wifi.description
		icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0',
		category: 'network',
		fields: [
			{
				name: 'ssid',
				label: 'Network name (SSID)',
				type: 'text',
				placeholder: 'MyWiFi',
				required: true
			},
			{
				name: 'password',
				label: 'Password',
				type: 'password',
				placeholder: 'WiFi password'
			},
			{
				name: 'encryption',
				label: 'Encryption type',
				type: 'select',
				options: [
					{ value: 'WPA', label: 'WPA/WPA2/WPA3' },
					{ value: 'WEP', label: 'WEP' },
					{ value: 'nopass', label: 'No password' }
				],
				default: 'WPA'
			},
			{
				name: 'hidden',
				label: 'Hidden network',
				type: 'select',
				options: [
					{ value: 'false', label: 'No' },
					{ value: 'true', label: 'Yes' }
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
		name: 'Contact', // Translated via qrType.vcard.name
		description: 'Contact information (vCard)', // Translated via qrType.vcard.description
		icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
		category: 'contact',
		fields: [
			{
				name: 'firstName',
				label: 'First name',
				type: 'text',
				placeholder: 'John',
				required: true
			},
			{
				name: 'lastName',
				label: 'Last name',
				type: 'text',
				placeholder: 'Doe',
				required: true
			},
			{
				name: 'phone',
				label: 'Phone',
				type: 'tel',
				placeholder: '+1 555 123 4567'
			},
			{
				name: 'email',
				label: 'Email',
				type: 'email',
				placeholder: 'john@example.com'
			},
			{
				name: 'company',
				label: 'Company',
				type: 'text',
				placeholder: 'My Company'
			},
			{
				name: 'title',
				label: 'Job title',
				type: 'text',
				placeholder: 'Developer'
			},
			{
				name: 'website',
				label: 'Website',
				type: 'url',
				placeholder: 'https://example.com'
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
		name: 'Location', // Translated via qrType.location.name
		description: 'GPS coordinates', // Translated via qrType.location.description
		icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
		category: 'location',
		fields: [
			{
				name: 'latitude',
				label: 'Latitude',
				type: 'number',
				placeholder: '23.1136',
				step: '0.0001',
				required: true
			},
			{
				name: 'longitude',
				label: 'Longitude',
				type: 'number',
				placeholder: '-82.3666',
				step: '0.0001',
				required: true
			},
			{
				name: 'name',
				label: 'Place name',
				type: 'text',
				placeholder: 'Revolution Square'
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
		name: 'Event', // Translated via qrType.calendar.name
		description: 'Calendar event', // Translated via qrType.calendar.description
		icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
		category: 'events',
		fields: [
			{
				name: 'title',
				label: 'Event title',
				type: 'text',
				placeholder: 'Important meeting',
				required: true
			},
			{
				name: 'startDate',
				label: 'Start date',
				type: 'datetime-local',
				required: true
			},
			{
				name: 'endDate',
				label: 'End date',
				type: 'datetime-local'
			},
			{
				name: 'description',
				label: 'Description',
				type: 'textarea',
				placeholder: 'Event description...',
				rows: 3
			},
			{
				name: 'location',
				label: 'Location',
				type: 'text',
				placeholder: 'Main office'
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
		description: 'Bitcoin address for payments', // Translated via qrType.bitcoin.description
		icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
		category: 'payments',
		fields: [
			{
				name: 'address',
				label: 'Bitcoin address',
				type: 'text',
				placeholder: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
				required: true
			},
			{
				name: 'amount',
				label: 'Amount (BTC)',
				type: 'number',
				placeholder: '0.001',
				step: '0.00000001'
			},
			{
				name: 'label',
				label: 'Label',
				type: 'text',
				placeholder: 'Payment for services'
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
		description: 'Ethereum address for payments', // Translated via qrType.ethereum.description
		icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
		category: 'payments',
		fields: [
			{
				name: 'address',
				label: 'Ethereum address',
				type: 'text',
				placeholder: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
				required: true
			},
			{
				name: 'amount',
				label: 'Amount (ETH)',
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
		description: 'PayPal payment link', // Translated via qrType.paypal.description
		icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
		category: 'payments',
		fields: [
			{
				name: 'email',
				label: 'PayPal email',
				type: 'email',
				placeholder: 'user@paypal.com',
				required: true
			},
			{
				name: 'amount',
				label: 'Amount',
				type: 'number',
				placeholder: '10.00',
				step: '0.01'
			},
			{
				name: 'currency',
				label: 'Currency',
				type: 'select',
				options: [
					{ value: 'USD', label: 'USD - US dollar' },
					{ value: 'EUR', label: 'EUR - Euro' },
					{ value: 'CUP', label: 'CUP - Cuban peso' }
				],
				default: 'USD'
			},
			{
				name: 'description',
				label: 'Description',
				type: 'text',
				placeholder: 'Payment for services'
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
	web: { name: 'Web and Links', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9' },
	communication: { name: 'Communication', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8' },
	network: { name: 'Networks', icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01' },
	contact: { name: 'Contacts', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
	location: { name: 'Location', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
	events: { name: 'Events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
	payments: { name: 'Payments', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' },
	general: { name: 'General', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
};
