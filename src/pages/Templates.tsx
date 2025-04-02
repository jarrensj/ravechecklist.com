
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { templates } from '@/utils/data';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { PlusCircle, Music, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Templates: React.FC = () => {
  // Sort templates by date (closest upcoming events first)
  const sortedTemplates = [...templates].sort((a, b) => {
    // Extract month and year from date strings
    const getDateInfo = (dateStr: string) => {
      const months = {
        'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
        'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
      };
      
      // Handle date ranges like "April 11-13 & 18-20, 2025" or "May 31 - Jun 1, 2025"
      const monthMatch = dateStr.match(/^(\w+)/);
      const yearMatch = dateStr.match(/(\d{4})/);
      
      if (monthMatch && yearMatch) {
        const monthStr = monthMatch[1];
        const month = months[monthStr as keyof typeof months] ?? 0;
        const year = parseInt(yearMatch[1]);
        return { month, year };
      }
      
      return { month: 0, year: 3000 }; // Default far future date if parsing fails
    };
    
    const dateA = getDateInfo(a.event.date);
    const dateB = getDateInfo(b.event.date);
    
    // Sort by year first, then by month
    if (dateA.year !== dateB.year) {
      return dateA.year - dateB.year;
    }
    
    return dateA.month - dateB.month;
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Festival Checklist Templates</h1>
          <p className="text-gray-600">Choose a pre-made template or create your own custom festival checklist</p>
        </div>
        
        <Alert className="mb-6 border-sky-200 bg-sky-50">
          <Sparkles className="h-5 w-5 text-sky-600" />
          <AlertTitle className="text-sky-800">Coming Soon!</AlertTitle>
          <AlertDescription className="text-sky-700">
            Users can create and share their templates for others to use
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTemplates.map(template => (
            <Card key={template.id} className="overflow-hidden transition-all hover:shadow-md">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={template.thumbnail} 
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="h-5 w-5 text-sky-600" />
                  {template.name}
                </CardTitle>
                <CardDescription>{template.event.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 mb-4">
                  <div><strong>When:</strong> {template.event.date}</div>
                  <div><strong>Gates Open:</strong> {template.event.startTime}</div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Items</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(
                      template.items.reduce((acc, item) => {
                        acc[item.category] = (acc[item.category] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([category, count]) => (
                      <TableRow key={category}>
                        <TableCell className="capitalize">{category}</TableCell>
                        <TableCell className="text-right">{count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link to={`/templates/${template.id}`}>Use This Template</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {/* Create Custom Template Card - Coming Soon */}
          <Card className="border-dashed border-2 border-gray-300 flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-sky-600/80 flex items-center justify-center z-10">
              <div className="bg-white text-sky-700 py-1 px-8 font-bold text-xl w-full text-center transform rotate-12">
                COMING SOON
              </div>
            </div>
            <PlusCircle className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">Create Custom Template</h3>
            <p className="text-gray-500 text-center mb-6">Build your own festival checklist from scratch</p>
            <Button variant="outline" disabled>
              Get Started
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Templates;
