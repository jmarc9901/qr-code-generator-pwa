// Spanish translations
export default {
    // Navigation
    'nav.install': 'Instalar',
    'nav.theme': 'Cambiar tema',
    
    // QR Type Selection
    'qrType.heading': 'Selecciona el Tipo de QR',
    'qrType.scan': 'Escanear Código QR',
    'qrType.batch': 'Generación de QR por Lotes',
    'qrType.cardLabel': '{name}: {description}',
    
    // QR Type Names and Descriptions
    'qrType.url.name': 'URL',
    'qrType.url.description': 'Enlace a una página web',
    'qrType.text.name': 'Texto',
    'qrType.text.description': 'Texto libre personalizado',
    'qrType.email.name': 'Email',
    'qrType.email.description': 'Dirección de correo electrónico',
    'qrType.sms.name': 'SMS',
    'qrType.sms.description': 'Mensaje de texto',
    'qrType.whatsapp.name': 'WhatsApp',
    'qrType.whatsapp.description': 'Mensaje de WhatsApp',
    'qrType.telegram.name': 'Telegram',
    'qrType.telegram.description': 'Mensaje de Telegram',
    'qrType.call.name': 'Llamada',
    'qrType.call.description': 'Realizar una llamada telefónica',
    'qrType.wifi.name': 'WiFi',
    'qrType.wifi.description': 'Configuración de red WiFi',
    'qrType.vcard.name': 'Contacto',
    'qrType.vcard.description': 'Información de contacto (vCard)',
    'qrType.location.name': 'Ubicación',
    'qrType.location.description': 'Coordenadas GPS',
    'qrType.calendar.name': 'Evento',
    'qrType.calendar.description': 'Evento de calendario',
    'qrType.bitcoin.name': 'Bitcoin',
    'qrType.bitcoin.description': 'Dirección de Bitcoin para pagos',
    'qrType.ethereum.name': 'Ethereum',
    'qrType.ethereum.description': 'Dirección de Ethereum para pagos',
    'qrType.paypal.name': 'PayPal',
    'qrType.paypal.description': 'Enlace de pago PayPal',
    
    // QR Generator Form
    'form.generate': 'Generar QR',
    'form.preview': 'Vista Previa',
    'form.close': 'Cerrar',
    
    // Preview Area
    'preview.heading': 'Vista Previa',
    'preview.download': 'Descargar',
    'preview.share': 'Compartir',
    'preview.placeholder': 'Selecciona un tipo y genera tu QR',
    
    // QR Info
    'info.type': 'Tipo:',
    'info.size': 'Tamaño:',
    'info.error': 'Corrección:',
    
    // QR Customization
    'customize.heading': '🎨 Personalizar QR',
    'customize.description': 'Haz tu QR único con colores personalizados, tamaño y efectos',
    'customize.basic': 'Básico',
    'customize.advanced': 'Avanzado',
    'customize.effects': 'Efectos',
    
    // Basic Customization
    'basic.size': 'Tamaño',
    'basic.error': 'Corrección de Errores',
    
    // Advanced Customization
    'advanced.foreground': 'Color Principal',
    'advanced.background': 'Color de Fondo',
    'advanced.margin': 'Margen',
    'advanced.style': 'Estilo de Puntos',
    
    // Effects Customization
    'effects.logo': 'Logo Central',
    'effects.gradient': 'Degradado',
    'upload.placeholder': 'Arrastra una imagen o haz clic para seleccionar',
    'upload.supported': 'PNG, JPG hasta 2MB',
    
    // Customization Actions
    'actions.reset': 'Restablecer',
    'actions.apply': 'Aplicar Cambios',
    'actions.remove': 'Eliminar',
    
    // Export options
    'export.label': 'Formato de Exportación:',
    'export.png': 'Código QR exportado como PNG',
    'export.svg': 'Código QR exportado como SVG',
    'export.pdf': 'Código QR exportado como PDF',
    'export.pdfTitle': 'Código QR: {type}',
    
    // Scanner
    'scanner.heading': 'Escanear Código QR',
    'scanner.start': 'Iniciar Cámara',
    'scanner.stop': 'Detener Cámara',
    'scanner.point': 'Apunta tu cámara a un código QR',
    'scanner.result': 'Contenido Escaneado',
    'scanner.copy': 'Copiar',
    'scanner.open': 'Abrir',
    'scanner.success': 'Código QR escaneado con éxito',
    
    // Batch Generation
    'batch.heading': 'Generación de QR por Lotes',
    'batch.label': 'Ingresa datos para múltiples códigos QR (uno por línea):',
    'batch.placeholder': 'Ingresa un dato de código QR por línea\nEjemplo:\nhttps://ejemplo.com\nhttps://google.com\nHola Mundo\nContacto: Juan Pérez',
    'batch.type': 'Tipo de QR:',
    'batch.size': 'Tamaño del QR:',
    'batch.error': 'Corrección de Errores:',
    'batch.generate': 'Generar Códigos QR por Lotes',
    'batch.download': 'Descargar Todos',
    'batch.results': 'Códigos QR Generados',
    'batch.download.single': 'Descargar',
    
    // Batch Generation Messages
    'batch.generate.error': 'Por favor, ingresa datos para los códigos QR',
    'batch.generate.errorInvalid': 'Por favor, ingresa datos válidos para los códigos QR',
    'batch.generate.errorSingle': 'Error al generar código QR {index}: {error}',
    'batch.generate.success': 'Generados {count} códigos QR',
    'batch.download.error': 'No hay códigos QR para descargar',
    'batch.download.successSingle': 'Código QR {index} descargado',
    'batch.download.successAll': 'Todos los códigos QR descargados como ZIP',
    'batch.download.errorAll': 'No hay códigos QR para descargar',
    'batch.download.error': 'Error al descargar códigos QR por lotes',
    
    // History
    'history.heading': 'Historial de QR',
    'history.clear': 'Limpiar Historial',
    
    // Footer
    'footer.title': 'Generador QR',
    'footer.description': 'Genera códigos QR sin internet. Funciona como PWA sin conexión.',
    'footer.features': 'Características',
    'footer.urls': 'Enlaces y sitios web',
    'footer.contacts': 'Contactos y WiFi',
    'footer.payments': 'Pagos y criptomonedas',
    'footer.email': 'Correo y mensajes',
    'footer.location': 'Ubicaciones GPS',
    'footer.events': 'Eventos y calendario',
    'footer.customization': 'Personalización avanzada',
    'footer.history': 'Historial y descargas',
    'footer.links': 'Enlaces',
    'footer.sourceCode': 'Código Fuente',
    'footer.reportIssue': 'Reportar Problema',
    'footer.license': 'Licencia',
    'footer.copyright': 'Generador QR. Código abierto bajo licencia MIT.',
    
    // Toast Messages
    'toast.success': 'Éxito',
    'toast.error': 'Error',
    'toast.warning': 'Advertencia',
    'toast.info': 'Información',
    'toast.default': 'Notificación',
    
    // Validation Messages
    'validation.selectType': 'Selecciona un tipo de QR primero',
    'validation.required': 'El campo "{field}" es obligatorio',
    'validation.email': 'El campo "{field}" debe ser un email válido',
    'validation.url': 'El campo "{field}" debe ser una URL válida',
    'validation.phone': 'El campo "{field}" debe ser un número de teléfono válido',
    'validation.number': 'El campo "{field}" debe ser un número válido',
    
    // Export Messages
    'export.error': 'No hay código QR para exportar',
    'export.unsupported': 'Formato de exportación no compatible',
    'export.errorDetail': 'Error al exportar código QR: {error}',
    
    // Other Messages
    'title': 'Generador de QR - Generador de Código QR Sin Internet | Crea Códigos QR Sin Conexión',
    'loading': 'Generando QR...',
    'camera.error': 'No se pudo acceder a la cámara. Por favor, asegúrate de haber otorgado permiso.',
    'qr.success': 'QR generado con éxito',
    'qr.error': 'Error al generar QR: {error}',
    'qr.dataError': 'No se pudieron generar los datos del QR',
    'copy.success': 'Copiado al portapapeles',
    'copy.error': 'Error al copiar al portapapeles',
    'validation.error': 'Error en la validación del formulario',
    'qr.errorLibrary': 'Librería QR no cargada. Intentando cargar...',
    'qr.errorLoad': 'No se pudo cargar la librería QR. Verifica tu conexión.',
    'qr.shareText': 'QR generado',
    'qr.shareError': 'Error al compartir QR',
    'upload.invalidType': 'Por favor selecciona un archivo de imagen válido',
    'upload.tooLarge': 'El archivo es demasiado grande. Máximo 2MB',
    'customize.reset': 'Personalización restablecida',
    'customize.applied': 'Cambios aplicados'
};