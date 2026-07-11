// French translations
export default {
    // Navigation
    'nav.install': 'Installer',
    'nav.theme': 'Changer de thème',
    
    // QR Type Selection
    'qrType.heading': 'Sélectionnez le Type de QR',
    'qrType.scan': 'Scanner un Code QR',
    'qrType.batch': 'Génération de QR par Lots',
    'qrType.cardLabel': '{name}: {description}',
    
    // QR Type Names and Descriptions
    'qrType.url.name': 'URL',
    'qrType.url.description': 'Lien vers une page web',
    'qrType.text.name': 'Texte',
    'qrType.text.description': 'Texte libre personnalisé',
    'qrType.email.name': 'Email',
    'qrType.email.description': 'Adresse email',
    'qrType.sms.name': 'SMS',
    'qrType.sms.description': 'Message texte',
    'qrType.whatsapp.name': 'WhatsApp',
    'qrType.whatsapp.description': 'Message WhatsApp',
    'qrType.telegram.name': 'Telegram',
    'qrType.telegram.description': 'Message Telegram',
    'qrType.call.name': 'Appel',
    'qrType.call.description': 'Passer un appel téléphonique',
    'qrType.wifi.name': 'WiFi',
    'qrType.wifi.description': 'Configuration réseau WiFi',
    'qrType.vcard.name': 'Contact',
    'qrType.vcard.description': 'Informations de contact (vCard)',
    'qrType.location.name': 'Emplacement',
    'qrType.location.description': 'Coordonnées GPS',
    'qrType.calendar.name': 'Événement',
    'qrType.calendar.description': 'Événement de calendrier',
    'qrType.bitcoin.name': 'Bitcoin',
    'qrType.bitcoin.description': 'Adresse Bitcoin pour les paiements',
    'qrType.ethereum.name': 'Ethereum',
    'qrType.ethereum.description': 'Adresse Ethereum pour les paiements',
    'qrType.paypal.name': 'PayPal',
    'qrType.paypal.description': 'Lien de paiement PayPal',
    
    // QR Generator Form
    'form.generate': 'Générer un QR',
    'form.preview': 'Aperçu',
    'form.close': 'Fermer',
    
    // Preview Area
    'preview.heading': 'Aperçu',
    'preview.download': 'Télécharger',
    'preview.share': 'Partager',
    'preview.placeholder': 'Sélectionnez un type et générez votre QR',
    
    // QR Info
    'info.type': 'Type :',
    'info.size': 'Taille :',
    'info.error': 'Correction :',
    
    // QR Customization
    'customize.heading': '🎨 Personnaliser le QR',
    'customize.description': 'Rendez votre QR unique avec des couleurs personnalisées, une taille et des effets',
    'customize.basic': 'Basique',
    'customize.advanced': 'Avancé',
    'customize.effects': 'Effets',
    
    // Basic Customization
    'basic.size': 'Taille',
    'basic.error': 'Correction d\'Erreurs',
    
    // Advanced Customization
    'advanced.foreground': 'Couleur Principale',
    'advanced.background': 'Couleur d\'Arrière-plan',
    'advanced.margin': 'Marge',
    'advanced.style': 'Style des Points',
    
    // Effects Customization
    'effects.logo': 'Logo Central',
    'effects.gradient': 'Dégradé',
    'upload.placeholder': 'Faites glisser une image ou cliquez pour sélectionner',
    'upload.supported': 'PNG, JPG jusqu\'à 2 Mo',
    
    // Customization Actions
    'actions.reset': 'Réinitialiser',
    'actions.apply': 'Appliquer les Changements',
    'actions.remove': 'Supprimer',
    
    // Export options
    'export.label': 'Format d\'Exportation :',
    'export.png': 'Code QR exporté au format PNG',
    'export.svg': 'Code QR exporté au format SVG',
    'export.pdf': 'Code QR exporté au format PDF',
    'export.pdfTitle': 'Code QR : {type}',
    
    // Scanner
    'scanner.heading': 'Scanner un Code QR',
    'scanner.start': 'Démarrer la Caméra',
    'scanner.stop': 'Arrêter la Caméra',
    'scanner.point': 'Pointez votre caméra vers un code QR',
    'scanner.result': 'Contenu Scanné',
    'scanner.copy': 'Copier',
    'scanner.open': 'Ouvrir',
    'scanner.success': 'Code QR scanné avec succès',
    
    // Batch Generation
    'batch.heading': 'Génération de QR par Lots',
    'batch.label': 'Entrez les données pour plusieurs codes QR (une par ligne) :',
    'batch.placeholder': 'Entrez une donnée de code QR par ligne\nExemple :\nhttps://exemple.com\nhttps://google.com\nBonjour le Monde\nContact : Jean Dupont',
    'batch.type': 'Type de QR :',
    'batch.size': 'Taille du QR :',
    'batch.error': 'Correction d\'Erreurs :',
    'batch.generate': 'Générer des Codes QR par Lots',
    'batch.download': 'Tout Télécharger',
    'batch.results': 'Codes QR Générés',
    'batch.download.single': 'Télécharger',
    
    // Batch Generation Messages
    'batch.generate.error': 'Veuillez entrer des données pour les codes QR',
    'batch.generate.errorInvalid': 'Veuillez entrer des données valides pour les codes QR',
    'batch.generate.errorSingle': 'Erreur lors de la génération du code QR {index} : {error}',
    'batch.generate.success': '{count} codes QR générés',
    'batch.download.error': 'Aucun code QR à télécharger',
    'batch.download.successSingle': 'Code QR {index} téléchargé',
    'batch.download.successAll': 'Tous les codes QR téléchargés au format ZIP',
    'batch.download.errorAll': 'Aucun code QR à télécharger',
    'batch.download.error': 'Erreur lors du téléchargement des codes QR par lots',
    
    // History
    'history.heading': 'Historique des QR',
    'history.clear': 'Effacer l\'Historique',
    
    // Footer
    'footer.title': 'Générateur de QR',
    'footer.description': 'Générez des codes QR sans internet. Fonctionne hors ligne comme PWA.',
    'footer.features': 'Fonctionnalités',
    'footer.urls': 'URLs et liens web',
    'footer.contacts': 'Contacts et WiFi',
    'footer.payments': 'Paiements',
    'footer.email': 'Email et messages',
    'footer.location': 'Emplacements GPS',
    'footer.events': 'Événements et calendrier',
    'footer.customization': 'Personnalisation avancée',
    'footer.history': 'Historique et téléchargements',
    'footer.links': 'Liens',
    'footer.sourceCode': 'Code Source',
    'footer.reportIssue': 'Signaler un Problème',
    'footer.license': 'Licence',
    'footer.copyright': 'Générateur de QR. Open source sous licence MIT.',
    
    // Toast Messages
    'toast.success': 'Succès',
    'toast.error': 'Erreur',
    'toast.warning': 'Avertissement',
    'toast.info': 'Information',
    'toast.default': 'Notification',
    
    // Validation Messages
    'validation.selectType': 'Sélectionnez d\'abord un type de QR',
    'validation.required': 'Le champ "{field}" est requis',
    'validation.email': 'Le champ "{field}" doit être un email valide',
    'validation.url': 'Le champ "{field}" doit être une URL valide',
    'validation.phone': 'Le champ "{field}" doit être un numéro de téléphone valide',
    'validation.number': 'Le champ "{field}" doit être un nombre valide',
    
    // Export Messages
    'export.error': 'Aucun code QR à exporter',
    'export.unsupported': 'Format d\'exportation non pris en charge',
    'export.errorDetail': 'Erreur lors de l\'exportation du code QR : {error}',
    
    // Other Messages
    'title': 'Générateur de QR - Générateur de Code QR Hors Ligne | Créez des Codes QR Sans Internet',
    'loading': 'Génération du QR...',
    'camera.error': 'Impossible d\'accéder à la caméra. Veuillez vous assurer d\'avoir accordé la permission.',
    'qr.success': 'QR généré avec succès',
    'qr.error': 'Erreur lors de la génération du QR : {error}',
    'qr.dataError': 'Impossible de générer les données du QR',
    'copy.success': 'Copié dans le presse-papiers',
    'copy.error': 'Échec de la copie dans le presse-papiers',
    'validation.error': 'Erreur de validation du formulaire',
    'qr.errorLibrary': 'Bibliothèque QR non chargée. Tentative de chargement...',
    'qr.errorLoad': 'Impossible de charger la bibliothèque QR. Vérifiez votre connexion.',
    'qr.shareText': 'QR généré',
    'qr.shareError': 'Erreur lors du partage du QR',
    'upload.invalidType': 'Veuillez sélectionner un fichier image valide',
    'upload.tooLarge': 'Fichier trop volumineux. Maximum 2MB',
    'customize.reset': 'Personnalisation réinitialisée',
    'customize.applied': 'Modifications appliquées'
};