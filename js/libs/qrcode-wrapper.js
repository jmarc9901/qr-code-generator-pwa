// QRCode.js Wrapper - Provides toDataURL function
// This wrapper uses the official QRCode.js library to generate QR codes as data URLs

(function() {
    'use strict';
    
    // Check if QRCode is available
    if (typeof QRCode === 'undefined') {
        console.error('QRCode library not loaded');
        return;
    }
    
    // Store the original QRCode constructor
    var OriginalQRCode = QRCode;
    
    // Create a wrapper that provides toDataURL functionality
    var QRCodeWrapper = function(element, options) {
        // If element is a string, treat it as text and create a temporary div
        if (typeof element === 'string') {
            this._tempDiv = document.createElement('div');
            this._tempDiv.style.position = 'absolute';
            this._tempDiv.style.left = '-9999px';
            this._tempDiv.style.top = '-9999px';
            document.body.appendChild(this._tempDiv);
            
            this._qrCode = new OriginalQRCode(this._tempDiv, options);
            this._qrCode.makeCode(element);
        } else {
            this._qrCode = new OriginalQRCode(element, options);
        }
    };
    
    // Add toDataURL method to the wrapper
    QRCodeWrapper.prototype.toDataURL = function(options) {
        options = options || {};
        
        // Get the QR code data
        var qrData = this._qrCode._oQRCode;
        if (!qrData) {
            throw new Error('QR Code not generated');
        }
        
        // Create canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        
        // Set canvas size
        var size = options.width || 256;
        canvas.width = size;
        canvas.height = size;
        
        // Get QR module count
        var moduleCount = qrData.getModuleCount();
        var cellSize = Math.floor(size / moduleCount);
        var margin = options.margin || 4;
        
        // Fill background
        ctx.fillStyle = options.color?.light || '#FFFFFF';
        ctx.fillRect(0, 0, size, size);
        
        // Draw QR code
        ctx.fillStyle = options.color?.dark || '#000000';
        
        for (var row = 0; row < moduleCount; row++) {
            for (var col = 0; col < moduleCount; col++) {
                if (qrData.isDark(row, col)) {
                    var x = margin + col * cellSize;
                    var y = margin + row * cellSize;
                    ctx.fillRect(x, y, cellSize, cellSize);
                }
            }
        }
        
        // Convert to data URL
        return canvas.toDataURL('image/png');
    };
    
    // Add static toDataURL method
    QRCodeWrapper.toDataURL = function(text, options, callback) {
        try {
            var wrapper = new QRCodeWrapper(text, options);
            var dataURL = wrapper.toDataURL(options);
            
            // Clean up temporary div
            if (wrapper._tempDiv) {
                document.body.removeChild(wrapper._tempDiv);
            }
            
            if (callback) {
                callback(null, dataURL);
            }
            return dataURL;
        } catch (error) {
            if (callback) {
                callback(error);
            }
            throw error;
        }
    };
    
    // Replace the global QRCode with our wrapper
    window.QRCode = QRCodeWrapper;
    
    // Keep the original available
    window.OriginalQRCode = OriginalQRCode;
    
    console.log('QRCode wrapper loaded successfully with toDataURL support');
})();
