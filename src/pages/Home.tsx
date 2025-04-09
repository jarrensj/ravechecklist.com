
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCheck, ListChecks, ArrowRight, Clock, Users, SparkleIcon, Zap, Heart } from 'lucide-react';
import JSConfetti from 'js-confetti';

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleGetStarted = () => {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ['✅'],
      emojiSize: 30,
      confettiNumber: 50,
    });
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      
      <main className="container max-w-screen-xl mx-auto px-4 sm:px-6 pb-16">
        {/* Hero Section */}
        <section className="py-12 md:py-20 text-center">
          <div className={`max-w-3xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6 flex justify-center">
              <SparkleIcon className="h-16 w-16 text-sky-500 animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative">
              Plan Your Perfect Festival Experience
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Never forget important items for your next festival, rave, or concert with RaveChecklist. 
              Stay organized with customizable checklists and ready-to-use templates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                asChild 
                onClick={handleGetStarted}
                className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Link to="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="transition-all duration-300 hover:bg-sky-100 hover:border-sky-300"
              >
                <Link to="/templates">
                  Browse Templates
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className={`py-12 md:py-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold text-center mb-12 relative">
            Everything You Need for Festival Prep
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-sky-400 rounded-full"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card 
              className={`border-2 border-gray-200 transition-all duration-300 ${activeCard === 0 ? 'scale-105 border-sky-400 shadow-lg' : 'hover:shadow-md'}`}
              onMouseEnter={() => setActiveCard(0)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <CardHeader>
                <CheckCheck className={`h-12 w-12 text-sky-600 mb-2 transition-transform duration-500 ${activeCard === 0 ? 'rotate-12' : ''}`} />
                <CardTitle>Custom Checklists</CardTitle>
                <CardDescription>Create and manage your own personalized checklist for any event</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Add, edit, and organize items by category to make sure you're prepared for any festival experience.
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`border-2 border-gray-200 transition-all duration-300 ${activeCard === 1 ? 'scale-105 border-sky-400 shadow-lg' : 'hover:shadow-md'}`}
              onMouseEnter={() => setActiveCard(1)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <CardHeader>
                <ListChecks className={`h-12 w-12 text-sky-600 mb-2 transition-transform duration-500 ${activeCard === 1 ? 'rotate-12' : ''}`} />
                <CardTitle>Ready-to-Use Templates</CardTitle>
                <CardDescription>Start with professionally curated festival checklists</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Browse our collection of templates for different festival types, customize them, and save time on preparation.
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`border-2 border-gray-200 transition-all duration-300 ${activeCard === 2 ? 'scale-105 border-sky-400 shadow-lg' : 'hover:shadow-md'}`}
              onMouseEnter={() => setActiveCard(2)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <CardHeader>
                <Clock className={`h-12 w-12 text-sky-600 mb-2 transition-transform duration-500 ${activeCard === 2 ? 'rotate-12' : ''}`} />
                <CardTitle>Recent Templates</CardTitle>
                <CardDescription>Quick access to your recently used templates</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Easily pick up where you left off with history tracking for your most frequently used checklists.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Stats Section - New */}
        <section className={`py-12 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-2xl mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Trusted by Festival-Goers Worldwide</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Zap className="h-10 w-10 text-amber-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-800 mb-2">1000+</div>
                <p className="text-gray-600">Ready-made Templates</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Users className="h-10 w-10 text-sky-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-800 mb-2">50,000+</div>
                <p className="text-gray-600">Happy Users</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Heart className="h-10 w-10 text-rose-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-800 mb-2">99%</div>
                <p className="text-gray-600">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className={`py-12 md:py-16 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-sky-100 to-indigo-100 p-10 rounded-2xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to Get Organized?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Start using RaveChecklist today and never again arrive at a festival missing something important.
            </p>
            <Button 
              size="lg" 
              asChild 
              onClick={handleGetStarted}
              className="transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600"
            >
              <Link to="/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
