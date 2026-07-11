// Validation functions for the QR Generator app

window.QRValidation = {
	validateField(field, value) {
		switch (field.type) {
			case 'email':
				if (value && !QRUtils.isValidEmail(value)) {
					return { valid: false, message: `El campo "${field.label}" debe ser un email válido` };
				}
				break;
			case 'url':
				if (value && !QRUtils.isValidUrl(value)) {
					return { valid: false, message: `El campo "${field.label}" debe ser una URL válida` };
				}
				break;
			case 'tel':
				if (value && !QRUtils.isValidPhone(value)) {
					return { valid: false, message: `El campo "${field.label}" debe ser un número de teléfono válido` };
				}
				break;
			case 'number':
				if (value && (isNaN(value) || value < (field.min || 0))) {
					return { valid: false, message: `El campo "${field.label}" debe ser un número válido` };
				}
				break;
		}
		return { valid: true };
	},

	validateForm(currentQRType, getFormData) {
		try {
			if (!currentQRType) {
				return { valid: false, message: 'Selecciona un tipo de QR primero' };
			}
			const formData = getFormData();
			for (let field of currentQRType.fields) {
				const value = formData[field.name];
				if (field.required && (!value || value.trim() === '')) {
					return { valid: false, message: `El campo "${field.label}" es requerido` };
				}
				if (value) {
					const validation = this.validateField(field, value);
					if (!validation.valid) return validation;
				}
			}
			return { valid: true };
		} catch (error) {
			return { valid: false, message: 'Error en la validación del formulario' };
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
