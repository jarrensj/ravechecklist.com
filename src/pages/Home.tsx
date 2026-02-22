import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCheck, ListChecks, ArrowRight, Clock, Users, SparkleIcon, Smartphone } from 'lucide-react';
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
              Create your personal checklist or autofill from popular festival templates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild onClick={handleGetStarted}>
                <Link to="/checklist">
                  Get Started on Web
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://apps.apple.com/us/app/rave-checklist/id6759148010" target="_blank" rel="noopener noreferrer">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Download iOS App
                </a>
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
                <CardTitle>Autofill from Templates</CardTitle>
                <CardDescription>Start with professionally curated festival checklists</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Quickly populate your checklist with items from popular festivals like Coachella, EDC, and Outside Lands.
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
        
        {/* CTA Section */}
        <section className="py-12 md:py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Organized?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Start using RaveChecklist today and never again arrive at a festival missing something important.
            </p>
            <Button size="lg" asChild onClick={handleGetStarted}>
              <Link to="/checklist">
                Create My Checklist
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
