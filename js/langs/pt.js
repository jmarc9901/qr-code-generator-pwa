// Portuguese translations
export default {
    // Navigation
    'nav.install': 'Instalar',
    'nav.theme': 'Alternar tema',
    
    // QR Type Selection
    'qrType.heading': 'Selecione o Tipo de QR',
    'qrType.scan': 'Escanear Código QR',
    'qrType.batch': 'Geração em Lote de QR',
    'qrType.cardLabel': '{name}: {description}',
    
    // QR Type Names and Descriptions
    'qrType.url.name': 'URL',
    'qrType.url.description': 'Link para página web',
    'qrType.text.name': 'Texto',
    'qrType.text.description': 'Texto livre personalizado',
    'qrType.email.name': 'Email',
    'qrType.email.description': 'Endereço de email',
    'qrType.sms.name': 'SMS',
    'qrType.sms.description': 'Mensagem de texto',
    'qrType.whatsapp.name': 'WhatsApp',
    'qrType.whatsapp.description': 'Mensagem do WhatsApp',
    'qrType.telegram.name': 'Telegram',
    'qrType.telegram.description': 'Mensagem do Telegram',
    'qrType.call.name': 'Chamada',
    'qrType.call.description': 'Fazer uma ligação telefônica',
    'qrType.wifi.name': 'WiFi',
    'qrType.wifi.description': 'Configuração de rede WiFi',
    'qrType.vcard.name': 'Contato',
    'qrType.vcard.description': 'Informações de contato (vCard)',
    'qrType.location.name': 'Localização',
    'qrType.location.description': 'Coordenadas GPS',
    'qrType.calendar.name': 'Evento',
    'qrType.calendar.description': 'Evento de calendário',
    'qrType.bitcoin.name': 'Bitcoin',
    'qrType.bitcoin.description': 'Endereço Bitcoin para pagamentos',
    'qrType.ethereum.name': 'Ethereum',
    'qrType.ethereum.description': 'Endereço Ethereum para pagamentos',
    'qrType.paypal.name': 'PayPal',
    'qrType.paypal.description': 'Link de pagamento PayPal',
    
    // QR Generator Form
    'form.generate': 'Gerar QR',
    'form.preview': 'Visualização',
    'form.close': 'Fechar',
    
    // Preview Area
    'preview.heading': 'Visualização',
    'preview.download': 'Baixar',
    'preview.share': 'Compartilhar',
    'preview.placeholder': 'Selecione um tipo e gere seu QR',
    
    // QR Info
    'info.type': 'Tipo:',
    'info.size': 'Tamanho:',
    'info.error': 'Correção:',
    
    // QR Customization
    'customize.heading': '🎨 Personalizar QR',
    'customize.description': 'Torne seu QR único com cores personalizadas, tamanho e efeitos',
    'customize.basic': 'Básico',
    'customize.advanced': 'Avançado',
    'customize.effects': 'Efeitos',
    
    // Basic Customization
    'basic.size': 'Tamanho',
    'basic.error': 'Correção de Erros',
    
    // Advanced Customization
    'advanced.foreground': 'Cor Principal',
    'advanced.background': 'Cor de Fundo',
    'advanced.margin': 'Margem',
    'advanced.style': 'Estilo dos Pontos',
    
    // Effects Customization
    'effects.logo': 'Logo Central',
    'effects.gradient': 'Gradiente',
    'upload.placeholder': 'Arraste uma imagem ou clique para selecionar',
    'upload.supported': 'PNG, JPG até 2MB',
    
    // Customization Actions
    'actions.reset': 'Redefinir',
    'actions.apply': 'Aplicar Alterações',
    'actions.remove': 'Remover',
    
    // Export options
    'export.label': 'Formato de Exportação:',
    'export.png': 'Código QR exportado como PNG',
    'export.svg': 'Código QR exportado como SVG',
    'export.pdf': 'Código QR exportado como PDF',
    'export.pdfTitle': 'Código QR: {type}',
    
    // Scanner
    'scanner.heading': 'Escanear Código QR',
    'scanner.start': 'Iniciar Câmera',
    'scanner.stop': 'Parar Câmera',
    'scanner.point': 'Aponte sua câmera para um código QR',
    'scanner.result': 'Conteúdo Escaneado',
    'scanner.copy': 'Copiar',
    'scanner.open': 'Abrir',
    'scanner.success': 'Código QR escaneado com sucesso',
    
    // Batch Generation
    'batch.heading': 'Geração em Lote de QR',
    'batch.label': 'Digite dados para múltiplos códigos QR (um por linha):',
    'batch.placeholder': 'Digite um dado de código QR por linha\nExemplo:\nhttps://exemplo.com\nhttps://google.com\nOlá Mundo\nContato: João Silva',
    'batch.type': 'Tipo de QR:',
    'batch.size': 'Tamanho do QR:',
    'batch.error': 'Correção de Erros:',
    'batch.generate': 'Gerar Códigos QR em Lote',
    'batch.download': 'Baixar Todos',
    'batch.results': 'Códigos QR Gerados',
    'batch.download.single': 'Baixar',
    
    // Batch Generation Messages
    'batch.generate.error': 'Por favor, insira dados para os códigos QR',
    'batch.generate.errorInvalid': 'Por favor, insira dados válidos para os códigos QR',
    'batch.generate.errorSingle': 'Erro ao gerar código QR {index}: {error}',
    'batch.generate.success': 'Gerados {count} códigos QR',
    'batch.download.error': 'Nenhum código QR para baixar',
    'batch.download.successSingle': 'Código QR {index} baixado',
    'batch.download.successAll': 'Todos os códigos QR baixados como ZIP',
    'batch.download.errorAll': 'Nenhum código QR para baixar',
    'batch.download.error': 'Erro ao baixar códigos QR em lote',
    
    // History
    'history.heading': 'Histórico de QR',
    'history.clear': 'Limpar Histórico',
    
    // Footer
    'footer.title': 'Gerador QR',
    'footer.description': 'Gere códigos QR sem internet. Funciona como PWA offline.',
    'footer.features': 'Recursos',
    'footer.urls': 'URLs e links da web',
    'footer.contacts': 'Contatos e WiFi',
    'footer.payments': 'Pagamentos e criptomoedas',
    'footer.email': 'E-mail e mensagens',
    'footer.location': 'Localizações GPS',
    'footer.events': 'Eventos e calendário',
    'footer.customization': 'Personalização avançada',
    'footer.history': 'Histórico e downloads',
    'footer.links': 'Links',
    'footer.sourceCode': 'Código Fonte',
    'footer.reportIssue': 'Reportar Problema',
    'footer.license': 'Licença',
    'footer.copyright': 'Gerador QR. Código aberto sob licença MIT.',
    
    // Toast Messages
    'toast.success': 'Sucesso',
    'toast.error': 'Erro',
    'toast.warning': 'Aviso',
    'toast.info': 'Informação',
    'toast.default': 'Notificação',
    
    // Validation Messages
    'validation.selectType': 'Selecione um tipo de QR primeiro',
    'validation.required': 'O campo "{field}" é obrigatório',
    'validation.email': 'O campo "{field}" deve ser um email válido',
    'validation.url': 'O campo "{field}" deve ser uma URL válida',
    'validation.phone': 'O campo "{field}" deve ser um número de telefone válido',
    'validation.number': 'O campo "{field}" deve ser um número válido',
    
    // Export Messages
    'export.error': 'Nenhum código QR para exportar',
    'export.unsupported': 'Formato de exportação não suportado',
    'export.errorDetail': 'Erro ao exportar código QR: {error}',
    
    // Other Messages
    'title': 'Gerador de QR - Gerador de Código QR Offline | Crie Códigos QR Sem Internet',
    'loading': 'Gerando QR...',
    'camera.error': 'Não foi possível acessar a câmera. Certifique-se de ter concedido permissão.',
    'qr.success': 'QR gerado com sucesso',
    'qr.error': 'Erro ao gerar QR: {error}',
    'qr.dataError': 'Não foi possível gerar dados do QR',
    'copy.success': 'Copiado para a área de transferência',
    'copy.error': 'Falha ao copiar para a área de transferência',
    'validation.error': 'Erro de validação do formulário',
    'qr.errorLibrary': 'Biblioteca QR não carregada. Tentando carregar...',
    'qr.errorLoad': 'Não foi possível carregar a biblioteca QR. Verifique sua conexão.',
    'qr.shareText': 'QR gerado',
    'qr.shareError': 'Erro ao compartilhar QR',
    'upload.invalidType': 'Selecione um arquivo de imagem válido',
    'upload.tooLarge': 'Arquivo muito grande. Máximo 2MB',
    'customize.reset': 'Personalização redefinida',
    'customize.applied': 'Alterações aplicadas'
};