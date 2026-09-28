// Validation functions for the QR Generator app

// English defaults, used when the caller does not pass a translation context.
// Keys match the validation.* keys in js/langs/*.js.
const DEFAULT_MESSAGES = {
	'validation.selectType': 'Select a QR type first',
	'validation.required': 'The field "{field}" is required',
	'validation.email': 'The field "{field}" must be a valid email',
	'validation.url': 'The field "{field}" must be a valid URL',
	'validation.phone': 'The field "{field}" must be a valid phone number',
	'validation.number': 'The field "{field}" must be a valid number',
	'validation.error': 'Form validation error'
};

// ctx = { t(key, params) => string, label(field) => string }, both optional.
function resolveContext(ctx = {}) {
	return {
		t: ctx.t || ((key, params = {}) => {
			let message = DEFAULT_MESSAGES[key] || key;
			Object.keys(params).forEach(param => {
				message = message.replace(`{${param}}`, params[param]);
			});
			return message;
		}),
		label: ctx.label || ((field) => field.label)
	};
}

window.QRValidation = {
	validateField(field, value, ctx) {
		const { t, label } = resolveContext(ctx);
		const params = { field: label(field) };

		switch (field.type) {
			case 'email':
				if (value && !QRUtils.isValidEmail(value)) {
					return { valid: false, message: t('validation.email', params) };
				}
				break;
			case 'url':
				if (value && !QRUtils.isValidUrl(value)) {
					return { valid: false, message: t('validation.url', params) };
				}
				break;
			case 'tel':
				if (value && !QRUtils.isValidPhone(value)) {
					return { valid: false, message: t('validation.phone', params) };
				}
				break;
			case 'number':
				if (value && (isNaN(value) || value < (field.min || 0))) {
					return { valid: false, message: t('validation.number', params) };
				}
				break;
		}
		return { valid: true };
	},

	validateForm(currentQRType, getFormData, ctx) {
		const { t, label } = resolveContext(ctx);

		try {
			if (!currentQRType) {
				return { valid: false, message: t('validation.selectType') };
			}
			const formData = getFormData();
			for (let field of currentQRType.fields) {
				const value = formData[field.name];
				if (field.required && (!value || value.trim() === '')) {
					return { valid: false, message: t('validation.required', { field: label(field) }) };
				}
				if (value) {
					const validation = this.validateField(field, value, ctx);
					if (!validation.valid) return validation;
				}
			}
			return { valid: true };
		} catch (error) {
			return { valid: false, message: t('validation.error') };
		}
	},

	sanitizeInput(input) {
		if (typeof input !== 'string') return input;
		return input
			.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
			.replace(/<[^>]*>/g, '')
			.trim();
	}
};
