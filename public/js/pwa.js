// PWA functionality
class PWA {
	constructor() {
		this.isInstalled = false;
		this.deferredPrompt = null;
		
		this.init();
	}

	init() {
		// Only register service worker if we're not on file:// protocol
		if (window.location.protocol !== 'file:') {
			this.registerServiceWorker();
		}
		this.setupInstallPrompt();
		this.checkInstallation();
		this.setupUpdateNotification();
	}

	// Register Service Worker
	async registerServiceWorker() {
		if ('serviceWorker' in navigator) {
			try {
				const registration = await navigator.serviceWorker.register('/sw.js');
				console.log('Service Worker registered:', registration);

				// Handle updates
				registration.addEventListener('updatefound', () => {
					const newWorker = registration.installing;
					newWorker.addEventListener('statechange', () => {
						if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
							this.showUpdateNotification();
						}
					});
				});

				// Handle controller change
				navigator.serviceWorker.addEventListener('controllerchange', () => {
					console.log('New service worker activated');
					window.location.reload();
				});

			} catch (error) {
				console.error('Service Worker registration failed:', error);
			}
		}
	}

	// Setup install prompt
	setupInstallPrompt() {
		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault();
			this.deferredPrompt = e;
			this.showInstallButton();
		});

		window.addEventListener('appinstalled', () => {
			this.isInstalled = true;
			this.hideInstallButton();
			this.deferredPrompt = null;
			console.log('PWA installed successfully');
		});
	}

	// Check if app is installed
	checkInstallation() {
		// Check if running in standalone mode
		if (window.matchMedia('(display-mode: standalone)').matches) {
			this.isInstalled = true;
			this.hideInstallButton();
		}

		// Check if running in fullscreen mode
		if (window.navigator.standalone === true) {
			this.isInstalled = true;
			this.hideInstallButton();
		}
	}

	// Show install button
	showInstallButton() {
		const installBtn = document.getElementById('installBtn');
		if (installBtn) {
			installBtn.style.display = 'flex';
			installBtn.addEventListener('click', () => this.installApp());
		}
	}

	// Hide install button
	hideInstallButton() {
		const installBtn = document.getElementById('installBtn');
		if (installBtn) {
			installBtn.style.display = 'none';
		}
	}

	// Install app
	async installApp() {
		if (!this.deferredPrompt) {
			console.log('No install prompt available');
			return;
		}

		try {
			this.deferredPrompt.prompt();
			const { outcome } = await this.deferredPrompt.userChoice;
			
			if (outcome === 'accepted') {
				console.log('User accepted the install prompt');
			} else {
				console.log('User dismissed the install prompt');
			}
			
			this.deferredPrompt = null;
			this.hideInstallButton();
		} catch (error) {
			console.error('Error during installation:', error);
		}
	}

	// Show update notification
	showUpdateNotification() {
		if (window.qrApp) {
			window.qrApp.showToast('info', window.qrApp.t('pwa.updateAvailable'));
		}
	}

	// Setup update notification
	setupUpdateNotification() {
		// Listen for service worker updates
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.addEventListener('message', (event) => {
				if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
					this.showUpdateNotification();
				}
			});
		}
	}

	// Check for updates
	async checkForUpdates() {
		if ('serviceWorker' in navigator) {
			try {
				const registration = await navigator.serviceWorker.getRegistration();
				if (registration) {
					await registration.update();
				}
			} catch (error) {
				console.error('Error checking for updates:', error);
			}
		}
	}

	// Request notification permission
	async requestNotificationPermission() {
		if ('Notification' in window) {
			const permission = await Notification.requestPermission();
			return permission === 'granted';
		}
		return false;
	}

	// Show notification
	showNotification(title, options = {}) {
		if ('Notification' in window && Notification.permission === 'granted') {
			const defaultOptions = {
				icon: '/assets/icons/android-chrome-192x192.png',
				badge: '/assets/icons/favicon-32x32.png',
				vibrate: [100, 50, 100],
				...options
			};

			return new Notification(title, defaultOptions);
		}
	}

	// Share content
	async shareContent(data) {
		if (navigator.share) {
			try {
				await navigator.share(data);
				return true;
			} catch (error) {
				console.error('Error sharing:', error);
				return false;
			}
		}
		return false;
	}

	// Get network status
	getNetworkStatus() {
		return navigator.onLine;
	}

	// Listen for network changes
	setupNetworkListener() {
		window.addEventListener('online', () => {
			console.log('Network is online');
			if (window.qrApp) {
				window.qrApp.showToast('success', window.qrApp.t('pwa.online'));
			}
		});

		window.addEventListener('offline', () => {
			console.log('Network is offline');
			if (window.qrApp) {
				window.qrApp.showToast('warning', window.qrApp.t('pwa.offline'));
			}
		});
	}

	// Get device info
	getDeviceInfo() {
		return {
			userAgent: navigator.userAgent,
			platform: navigator.platform,
			language: navigator.language,
			onLine: navigator.onLine,
			standalone: window.navigator.standalone,
			displayMode: this.getDisplayMode()
		};
	}

	// Get display mode
	getDisplayMode() {
		if (window.matchMedia('(display-mode: standalone)').matches) {
			return 'standalone';
		}
		if (window.matchMedia('(display-mode: fullscreen)').matches) {
			return 'fullscreen';
		}
		if (window.matchMedia('(display-mode: minimal-ui)').matches) {
			return 'minimal-ui';
		}
		return 'browser';
	}

	// Cache management
	async clearCache() {
		if ('caches' in window) {
			try {
				const cacheNames = await caches.keys();
				await Promise.all(
					cacheNames.map(cacheName => caches.delete(cacheName))
				);
				console.log('Cache cleared');
				return true;
			} catch (error) {
				console.error('Error clearing cache:', error);
				return false;
			}
		}
		return false;
	}

	// Get cache size
	async getCacheSize() {
		if ('caches' in window) {
			try {
				const cacheNames = await caches.keys();
				let totalSize = 0;

				for (const cacheName of cacheNames) {
					const cache = await caches.open(cacheName);
					const keys = await cache.keys();
					
					for (const request of keys) {
						const response = await cache.match(request);
						if (response) {
							const blob = await response.blob();
							totalSize += blob.size;
						}
					}
				}

				return totalSize;
			} catch (error) {
				console.error('Error getting cache size:', error);
				return 0;
			}
		}
		return 0;
	}

	// Format bytes
	formatBytes(bytes) {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}

	// Get app info
	getAppInfo() {
		return {
			name: 'QR Generator',
			version: '1.0.0',
			description: 'Offline QR code generator',
			author: 'QR Generator Team',
			repository: 'https://github.com/qr-generator/app'
		};
	}

	// Export PWA data
	exportPWAData() {
		return {
			deviceInfo: this.getDeviceInfo(),
			appInfo: this.getAppInfo(),
			isInstalled: this.isInstalled,
			networkStatus: this.getNetworkStatus(),
			displayMode: this.getDisplayMode()
		};
	}
}

// Initialize PWA when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
	window.pwa = new PWA();
});
