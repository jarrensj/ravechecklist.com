import React, { useState } from 'react';
import { Smartphone, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const AppDownloadBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (dismissed) return null;

  return (
    <>
      <div className="bg-sky-600 text-white py-2 px-4">
        <div className="container max-w-screen-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setDialogOpen(true)}
            className="flex items-center gap-2 mx-auto text-sm font-medium hover:underline cursor-pointer"
          >
            <Smartphone className="h-4 w-4" />
            Download our app on iOS
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="ml-2 p-1 hover:bg-sky-700 rounded transition-colors flex-shrink-0"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-center">iOS App Coming Soon</DialogTitle>
            <DialogDescription className="text-center">
              We're working on bringing RaveChecklist to your iPhone. Stay tuned for updates!
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppDownloadBanner;
