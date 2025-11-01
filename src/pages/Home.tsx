import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCheck, ListChecks, ArrowRight, Clock, Users, SparkleIcon, Smartphone, Download, Zap } from 'lucide-react';
import JSConfetti from 'js-confetti';

const Home: React.FC = () => {
  const handleGetStarted = () => {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ['✅'],
      emojiSize: 30,
      confettiNumber: 50,
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      
      <main className="container max-w-screen-xl mx-auto px-4 sm:px-6 pb-16">
        {/* Hero Section */}
        <section className="py-12 md:py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-32 h-32 mx-auto mb-6">
              <img src="/unicorn.png" alt="Unicorn" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Plan Your Perfect Festival Experience
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Never forget important items for your next festival, rave, or concert with RaveChecklist. 
              Stay organized with customizable checklists and ready-to-use templates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild onClick={handleGetStarted}>
                <Link to="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/templates">
                  Browse Templates
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12 md:py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need for Festival Prep</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CheckCheck className="h-12 w-12 text-sky-600 mb-2" />
                <CardTitle>Custom Checklists</CardTitle>
                <CardDescription>Create and manage your own personalized checklist for any event</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Add, edit, and organize items by category to make sure you're prepared for any festival experience.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <ListChecks className="h-12 w-12 text-sky-600 mb-2" />
                <CardTitle>Ready-to-Use Templates</CardTitle>
                <CardDescription>Start with professionally curated festival checklists</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Browse our collection of templates for different festival types, customize them, and save time on preparation.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-sky-600 mb-2" />
                <CardTitle>What Others Are Bringing</CardTitle>
                <CardDescription>
                  Discover trending items from the community and brand-sponsored checklists and deals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get inspired by what fellow ravers are packing. Browse checklists curated by our friends or popular brands.
                </p>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* Add to Homescreen Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="bg-sky-600 rounded-full p-4">
                    <Smartphone className="h-10 w-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl mb-2">Add to Your Homescreen</CardTitle>
                <CardDescription className="text-lg text-gray-700">
                  Access RaveChecklist instantly, even offline! Install our app for the best experience.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="bg-white rounded-lg p-4 shadow-sm mb-3">
                      <Download className="h-8 w-8 text-sky-600 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Easy Install</h3>
                      <p className="text-sm text-gray-600">One tap to add to your phone</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-lg p-4 shadow-sm mb-3">
                      <Zap className="h-8 w-8 text-sky-600 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Works Offline</h3>
                      <p className="text-sm text-gray-600">Access your lists anywhere</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-lg p-4 shadow-sm mb-3">
                      <SparkleIcon className="h-8 w-8 text-sky-600 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">Native Feel</h3>
                      <p className="text-sm text-gray-600">App-like experience</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold mb-3 text-center">How to Install:</h4>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-sky-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                      <p><strong>iPhone/iPad:</strong> Tap the Share button <span className="inline-block">📤</span>, then "Add to Home Screen"</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-sky-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                      <p><strong>Android:</strong> Tap the menu (⋮), then "Add to Home screen" or "Install app"</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-sky-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                      <p><strong>Desktop:</strong> Look for the install icon <span className="inline-block">➕</span> in your browser's address bar</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 md:py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Organized?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Start using RaveChecklist today and never again arrive at a festival missing something important.
            </p>
            <Button size="lg" asChild onClick={handleGetStarted}>
              <Link to="/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
