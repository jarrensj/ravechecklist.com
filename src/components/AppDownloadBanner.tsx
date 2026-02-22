import React, { useState } from 'react';
import { Smartphone, X } from 'lucide-react';

const AppDownloadBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-sky-600 text-white py-2 px-4">
      <div className="container max-w-screen-2xl mx-auto flex items-center justify-between">
        <a
          href="https://apps.apple.com/us/app/rave-checklist/id6759148010"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 mx-auto text-sm font-medium hover:underline cursor-pointer"
        >
          <Smartphone className="h-4 w-4" />
          Download our app on iOS
        </a>
        <button
          onClick={() => setDismissed(true)}
          className="ml-2 p-1 hover:bg-sky-700 rounded transition-colors flex-shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AppDownloadBanner;
