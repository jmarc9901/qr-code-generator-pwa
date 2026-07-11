// QRCode.js Worker Wrapper - Provides toDataURL function for Web Workers
// This wrapper uses the official QRCode.js library to generate QR codes as data URLs in a Web Worker

(function() {
    'use strict';
    
    // Check if QRCode is available
    if (typeof QRCode === 'undefined') {
        console.error('QRCode library not loaded');
        return;
    }
    
    // Store the original QRCode constructor
    var OriginalQRCode = QRCode;
    
    // Create a wrapper that provides toDataURL functionality without DOM access
    var QRCodeWorkerWrapper = function(element, options) {
        // In a worker, we only support string elements (the text to encode)
        if (typeof element === 'string') {
            // Create a QRCode instance without a DOM element
            this._qrCode = new OriginalQRCode(options);
            this._qrCode.makeCode(element);
        } else if (typeof element === 'object' && element !== null) {
            // If element is an options object
            this._qrCode = new OriginalQRCode(element);
        } else {
            this._qrCode = new OriginalQRCode(null, options);
        }
    };
    
    // Add toDataURL method to the wrapper that works in a Web Worker
    QRCodeWorkerWrapper.prototype.toDataURL = function(options) {
        options = options || {};
        
        // Get the QR code data
        var qrData = this._qrCode._oQRCode;
        if (!qrData) {
            throw new Error('QR Code not generated');
        }
        
        // Since we can't use canvas in a Web Worker, we'll return the raw data
        // and let the main thread create the image
        return {
            qrData: qrData,
            options: options
        };
    };
    
    // Add static method for generating QR codes in a Web Worker
    QRCodeWorkerWrapper.generateQRData = function(text, options) {
        try {
            console.log('Worker Wrapper: Generating QR code for text:', text.substring(0, 50) + '...');
            
            // Create QR code instance
            var qrCode = new OriginalQRCode(options);
            qrCode.makeCode(text);
            
            // Get the QR data
            var qrData = qrCode._oQRCode;
            console.log('Worker Wrapper: QR data generated, module count:', qrData.getModuleCount());
            
            // Return the raw QR data in a serializable format
            // We need to extract the module data since the QR object itself may not be serializable
            var moduleCount = qrData.getModuleCount();
            var modules = [];
            
            // Extract module data
            for (var i = 0; i < moduleCount; i++) {
                modules[i] = [];
                for (var j = 0; j < moduleCount; j++) {
                    modules[i][j] = qrData.isDark(i, j);
                }
            }
            
            console.log('Worker Wrapper: Modules data extracted');
            
            return {
                modules: modules,
                moduleCount: moduleCount,
                options: options
            };
        } catch (error) {
            console.error('Worker Wrapper: Error in generateQRData:', error);
            throw error;
        }
    };
    
    // Replace the global QRCode with our worker wrapper
    self.QRCode = QRCodeWorkerWrapper;
    
    // Keep the original available
    self.OriginalQRCode = OriginalQRCode;
    
    console.log('QRCode worker wrapper loaded successfully');
})();