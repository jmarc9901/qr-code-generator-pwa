// QR Code Generation Web Worker

// Try to import the required libraries
let librariesLoaded = false;
try {
    // Import the worker-compatible QR code library
    self.importScripts('libs/qrcode-worker-compatible.js');
    
    // Then import our worker wrapper which is designed for Web Workers
    self.importScripts('libs/qrcode-worker-wrapper.js');
    
    librariesLoaded = true;
    console.log('QR Worker: Libraries loaded successfully');
} catch (error) {
    console.error('Failed to load QR code libraries in worker:', error);
}

self.addEventListener('message', (e) => {
    console.log('QR Worker: Received message', e.data);
    
    // If libraries failed to load, send error back
    if (!librariesLoaded) {
        self.postMessage({
            success: false,
            error: 'QR code libraries not available in worker'
        });
        return;
    }
    
    const { data, options } = e.data;
    console.log('QR Worker: Processing QR code for data:', data.substring(0, 50) + '...');
    
    try {
        // Generate QR code data using the QRCode library
        // Use the worker wrapper's generateQRData method
        const result = QRCode.generateQRData(data, {
            width: options.size || 256,
            height: options.size || 256,
            color: {
                dark: options.foreground || '#000000',
                light: options.background || '#FFFFFF'
            },
            margin: options.margin || 4,
            errorCorrectionLevel: options.errorCorrectionLevel || 'M'
        });
        
        console.log('QR Worker: QR code generated successfully');
        
        // Send result back to main thread
        self.postMessage({
            success: true,
            modules: result.modules,
            moduleCount: result.moduleCount,
            options: result.options
        });
        
        console.log('QR Worker: Result sent back to main thread');
    } catch (error) {
        console.error('QR Worker: Error generating QR code:', error);
        // Send error back to main thread
        self.postMessage({
            success: false,
            error: error.message
        });
    }
});