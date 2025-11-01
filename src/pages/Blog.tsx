import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Essential Festival Packing Guide 2025',
    excerpt: 'Discover the must-have items for your next festival adventure. From weather-appropriate gear to festival essentials, we\'ve got you covered.',
    author: 'Sarah Johnson',
    date: '2025-10-28',
    readTime: '5 min read',
    category: 'Guides',
    image: '/placeholder.svg'
  },
  {
    id: '2',
    title: 'Top 10 Festival Safety Tips',
    excerpt: 'Stay safe and have fun! Learn the essential safety tips every festival-goer should know before heading to their next event.',
    author: 'Mike Chen',
    date: '2025-10-25',
    readTime: '7 min read',
    category: 'Safety',
    image: '/placeholder.svg'
  },
  {
    id: '3',
    title: 'How to Create the Perfect Festival Checklist',
    excerpt: 'Master the art of festival preparation with our comprehensive guide to creating customized checklists that work for you.',
    author: 'Emily Rodriguez',
    date: '2025-10-20',
    readTime: '6 min read',
    category: 'Tips & Tricks',
    image: '/placeholder.svg'
  },
  {
    id: '4',
    title: 'Best Festival Fashion Trends This Season',
    excerpt: 'Express yourself with the hottest festival fashion trends. From neon accessories to sustainable fashion choices.',
    author: 'Alex Kim',
    date: '2025-10-15',
    readTime: '4 min read',
    category: 'Fashion',
    image: '/placeholder.svg'
  },
  {
    id: '5',
    title: 'Camping at Festivals: A Beginner\'s Guide',
    excerpt: 'New to festival camping? Learn everything you need to know about setting up camp, staying comfortable, and making the most of your experience.',
    author: 'Jordan Taylor',
    date: '2025-10-10',
    readTime: '8 min read',
    category: 'Guides',
    image: '/placeholder.svg'
  },
  {
    id: '6',
    title: 'Festival Food Hacks: Save Money and Eat Well',
    excerpt: 'Discover clever ways to eat well at festivals without breaking the bank. Tips on what to bring and how to prepare.',
    author: 'Sarah Johnson',
    date: '2025-10-05',
    readTime: '5 min read',
    category: 'Tips & Tricks',
    image: '/placeholder.svg'
  }
];

const Blog: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

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
        
        {/* Blog Posts Grid */}
        <section className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card 
                key={post.id} 
                className="flex flex-col border-2 border-gray-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 duration-200"
              >
                <div className="aspect-video w-full overflow-hidden bg-gray-200">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardHeader className="flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2 line-clamp-2 hover:text-sky-600 transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardFooter className="flex flex-col gap-3 pt-0">
                  <div className="flex items-center justify-between w-full text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-sky-600 hover:text-sky-700">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 md:py-16 text-center">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 border-2 border-gray-200">
            <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Festival?</h2>
            <p className="text-lg text-gray-600 mb-6">
              Put these tips into action with our comprehensive festival checklist tools.
            </p>
            <Button size="lg" asChild>
              <Link to="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
