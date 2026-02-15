import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Header from '@/components/Header';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import content from '@/content/privacy-policy.md?raw';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />

      <main className="container max-w-screen-xl mx-auto px-4 sm:px-6 pb-16">
        <div className="max-w-3xl mx-auto pt-6">
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <section className="py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12 border border-gray-200">
            <article className="prose prose-gray max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
