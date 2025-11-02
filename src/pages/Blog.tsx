import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      
      <main className="container max-w-screen-xl mx-auto px-4 sm:px-6 pb-16">
        {/* Hero Section */}
        <section className="py-12 md:py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Festival Tips & Insights
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Expert advice, guides, and inspiration to help you make the most of your festival experience.
            </p>
          </div>
        </section>
        
        {/* Empty State */}
        <section className="py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-md p-12 border-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Coming Soon
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We're working on bringing you valuable festival tips, guides, and insights. Check back soon!
              </p>
              <Button size="lg" asChild>
                <Link to="/checklist">
                  Start Planning Your Festival
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
