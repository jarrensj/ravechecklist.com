import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />

      <main className="container max-w-screen-xl mx-auto px-4 sm:px-6 pb-16">
        {/* Back Button */}
        <div className="max-w-3xl mx-auto pt-6">
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <section className="py-12 md:py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Last updated: February 14, 2026
            </p>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-8">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12 border border-gray-200">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-600 mb-6">
                RaveChecklist ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we handle information in connection with our mobile application and website (collectively, the "Service").
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Data We Collect</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Mobile Application</h3>
              <p className="text-gray-600 mb-4">
                Our mobile app is designed with privacy as a core principle. <strong>We do not collect, store, or transmit any personal information to external servers.</strong>
              </p>
              <p className="text-gray-600 mb-4">
                All data you create in the app is stored locally on your device only:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                <li>Checklists and checklist items you create</li>
                <li>Categories and custom category configurations</li>
                <li>Item notes and completion status</li>
                <li>App preferences and settings</li>
              </ul>
              <p className="text-gray-600 mb-6">
                This data is stored using your device's local storage (AsyncStorage) and is never transmitted to our servers or any third parties. When you uninstall the app, all locally stored data is permanently deleted.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Website</h3>
              <p className="text-gray-600 mb-6">
                Our website similarly stores checklist data locally in your browser's storage. We do not require account creation or collect personal information.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Analytics and Tracking</h2>
              <p className="text-gray-600 mb-6">
                We do not use any analytics services, tracking pixels, or third-party tracking tools in our mobile application. Your usage of the app remains completely private.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Third-Party Services</h2>
              <p className="text-gray-600 mb-6">
                Our mobile app does not integrate with any third-party services, cloud storage providers, or external APIs. All functionality operates entirely on your device.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Permissions</h2>
              <p className="text-gray-600 mb-4">
                The mobile app requests minimal permissions:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                <li><strong>Clipboard Access:</strong> Used only when you explicitly choose to export or import checklist data. This allows you to copy your checklist data to share with others or paste data from another source.</li>
              </ul>
              <p className="text-gray-600 mb-6">
                We do not access your camera, photos, location, contacts, microphone, or any other sensitive device features.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Data Sharing</h2>
              <p className="text-gray-600 mb-6">
                We do not sell, trade, or otherwise transfer your data to third parties. Since all your data is stored locally on your device, we have no access to it.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Data Security</h2>
              <p className="text-gray-600 mb-6">
                Your data is as secure as your device itself. Since we don't transmit or store your data on external servers, there is no risk of server-side data breaches affecting your information.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Children's Privacy</h2>
              <p className="text-gray-600 mb-6">
                Our Service is not directed to children under 13. We do not knowingly collect personal information from children under 13. Since we don't collect personal information from any users, this concern does not apply to our Service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Your Rights</h2>
              <p className="text-gray-600 mb-4">
                Since all data is stored locally on your device, you have complete control over it:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                <li><strong>Access:</strong> All your data is visible within the app at any time</li>
                <li><strong>Export:</strong> You can export your data using the app's built-in export feature</li>
                <li><strong>Delete:</strong> You can delete individual items, clear all data within the app, or uninstall the app to remove all data</li>
                <li><strong>Portability:</strong> Export your data and import it on another device</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Changes to This Policy</h2>
              <p className="text-gray-600 mb-6">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Contact Us</h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about this Privacy Policy, please contact us at:{' '}
                <a href="mailto:contact@sneakerdevs.com" className="text-sky-600 hover:text-sky-700 underline">
                  contact@sneakerdevs.com
                </a>
              </p>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
