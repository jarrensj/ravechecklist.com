import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { ArrowLeft, Mail, HelpCircle, Smartphone, RefreshCw, Download, Trash2, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    icon: Smartphone,
    question: "Where is my data stored?",
    answer: "All your data is stored locally on your device. We don't have servers that store your checklists - everything stays on your phone or in your browser. This means your data is private and only accessible to you."
  },
  {
    icon: RefreshCw,
    question: "Will my data sync between devices?",
    answer: "Since all data is stored locally, it doesn't automatically sync between devices. However, you can use the Import/Export feature to manually transfer your checklists between devices by copying and pasting the exported data."
  },
  {
    icon: Trash2,
    question: "What happens if I uninstall the app?",
    answer: "If you uninstall the app, all your locally stored data will be permanently deleted. We recommend exporting your checklists before uninstalling if you want to keep them."
  },
  {
    icon: Download,
    question: "How do I backup my checklists?",
    answer: "Use the Import/Export feature in the app. Tap the export button to copy your checklist data to your clipboard, then paste it somewhere safe (like a notes app or email to yourself). You can import this data later to restore your checklists."
  },
  {
    icon: Share2,
    question: "Can I share my checklist with friends?",
    answer: "Yes! Use the export feature to copy your checklist data, then share it via any messaging app. Your friends can then import it into their own RaveChecklist app."
  },
  {
    icon: HelpCircle,
    question: "Why did my checklist disappear?",
    answer: "Checklists are stored in your browser's or app's local storage. They can be lost if you clear your browser data, use private/incognito mode, or uninstall the app. Always export important checklists as a backup."
  }
];

const Support: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />

      <main className="container max-w-screen-xl mx-auto px-4 sm:px-6 pb-16">
        {/* Hero Section */}
        <section className="py-12 md:py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Support
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find answers to common questions and get help with RaveChecklist.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                      <faq.icon className="h-5 w-5 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Storage Info */}
        <section className="py-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-sky-50 rounded-lg p-8 border border-sky-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About Local Storage
              </h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  RaveChecklist is built with a <strong>local-first</strong> approach. This means:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your checklists are stored directly on your device</li>
                  <li>No account or sign-up required</li>
                  <li>Your data is completely private - we can't see it</li>
                  <li>The app works offline</li>
                  <li>No servers to go down or data breaches to worry about</li>
                </ul>
                <p>
                  The tradeoff is that you're responsible for backing up your data if you want to keep it. Use the export feature regularly to save your checklists!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Still Need Help?
              </h2>
              <p className="text-gray-600 mb-6">
                Can't find what you're looking for? Reach out and we'll get back to you as soon as we can.
              </p>
              <Button size="lg" asChild>
                <a href="mailto:contact@sneakerdevs.com">
                  <Mail className="mr-2 h-5 w-5" />
                  contact@sneakerdevs.com
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Back Button */}
        <section className="py-8">
          <div className="max-w-3xl mx-auto">
            <Button variant="outline" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Support;
