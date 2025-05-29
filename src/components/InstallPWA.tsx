import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Download, X } from 'lucide-react';

const InstallPWA: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    if (isInstalled) {
      console.log('App is already installed');
      return;
    }

    const handler = (e: Event) => {
      console.log('beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    // Force show install button after 5 seconds if not shown
    const timer = setTimeout(() => {
      if (!showInstallButton) {
        console.log('Forcing show install button');
        setShowInstallButton(true);
      }
    }, 5000);

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(timer);
    };
  }, [showInstallButton]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log('No deferred prompt available');
      // If no prompt is available, try to show a manual installation guide
      alert('برای نصب برنامه، لطفاً از منوی مرورگر گزینه "Add to Home Screen" را انتخاب کنید');
      return;
    }

    try {
      // Show the install prompt
      deferredPrompt.prompt();
      console.log('Install prompt shown');

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      console.log('User choice:', outcome);

      // We've used the prompt, and can't use it again, throw it away
      setDeferredPrompt(null);

      // Hide the install button
      if (outcome === 'accepted') {
        setShowInstallButton(false);
      }
    } catch (error) {
      console.error('Error showing install prompt:', error);
    }
  };

  const handleDismiss = () => {
    setShowInstallButton(false);
  };

  // Always show the install button in development
  if (process.env.NODE_ENV === 'development') {
    return (
      <Alert className="fixed bottom-4 left-4 right-4 z-50 bg-background shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <div>
              <AlertTitle>نصب برنامه</AlertTitle>
              <AlertDescription>
                برای دسترسی سریع‌تر، برنامه را روی دستگاه خود نصب کنید
              </AlertDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleInstallClick} size="sm">
              نصب
            </Button>
            <Button onClick={handleDismiss} variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Alert>
    );
  }

  if (!showInstallButton) return null;

  return (
    <Alert className="fixed bottom-4 left-4 right-4 z-50 bg-background shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <div>
            <AlertTitle>نصب برنامه</AlertTitle>
            <AlertDescription>
              برای دسترسی سریع‌تر، برنامه را روی دستگاه خود نصب کنید
            </AlertDescription>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleInstallClick} size="sm">
            نصب
          </Button>
          <Button onClick={handleDismiss} variant="ghost" size="icon">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Alert>
  );
};

export default InstallPWA; 