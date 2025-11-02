import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { templates } from '@/utils/data';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { PlusCircle, Music, Sparkles, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { format } from 'date-fns';

const Templates: React.FC = () => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  // Sort templates by startDate - upcoming events first, past events at the end
  const sortedTemplates = [...templates].sort((a, b) => {
    if (!a.event.startDate || !b.event.startDate) {
      return 0; // Handle cases where dates might be missing
    }
    
    const now = new Date();
    const aIsPast = a.event.startDate < now;
    const bIsPast = b.event.startDate < now;
    
    // If one is past and one is upcoming, upcoming comes first
    if (aIsPast && !bIsPast) return 1;
    if (!aIsPast && bIsPast) return -1;
    
    // If both are upcoming or both are past, sort chronologically
    return a.event.startDate.getTime() - b.event.startDate.getTime();
  });
  
  // Format date range for display
  const formatDateRange = (startDate?: Date, endDate?: Date) => {
    if (!startDate) return "Date TBD";
    
    if (!endDate || startDate.getTime() === endDate.getTime()) {
      return format(startDate, 'MMM d, yyyy');
    }
    
    if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
      return `${format(startDate, 'MMM d')} - ${format(endDate, 'd, yyyy')}`;
    }
    
    if (startDate.getFullYear() === endDate.getFullYear()) {
      return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
    }
    
    return `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}`;
  };
  
  const now = new Date();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container max-w-screen-2xl mx-auto px-4 sm:px-6 pb-12">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Rave and Festival Checklist Templates</h1>
          <p className="text-gray-600">Choose a pre-made template or <Link to="/checklist" className="text-sky-600 hover:text-sky-800">create your own custom festival checklist</Link></p>
        </div>
        
        <Alert className="mb-6 border-sky-200 bg-sky-50">
          <Sparkles className="h-5 w-5 text-sky-600" />
          <AlertTitle className="text-sky-800">Coming Soon!</AlertTitle>
          <AlertDescription className="text-sky-700">
            Users can create and share their templates for others to use
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {sortedTemplates.map(template => {
            const isPast = template.event.startDate && template.event.startDate < now;
            
            return (
              <Card key={template.id} className={`overflow-hidden transition-all hover:shadow-md ${isPast ? 'opacity-60' : ''}`}>
                {template.thumbnail && (
                  <div className="aspect-video w-full overflow-hidden relative">
                    {isPast && <div className="absolute inset-0 bg-gray-500/20 z-10"></div>}
                    <Link to={`/templates/${template.id}`}>
                      <img 
                        src={template.thumbnail} 
                        alt={template.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </Link>
                  </div>
                )}
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Music className="h-4 w-4 sm:h-5 sm:w-5 text-sky-600" />
                    {template.name}
                  </CardTitle>
                  <CardDescription>{template.event.location}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="text-xs sm:text-sm text-gray-600 mb-4">
                    <div>
                      <strong>When:</strong> {template.event.startDate && template.event.endDate ? 
                        formatDateRange(template.event.startDate, template.event.endDate) : 
                        template.event.date}
                    </div>
                    <div><strong>Gates Open:</strong> {template.event.startTime}</div>
                  </div>
                  
                  <Collapsible 
                    open={categoriesOpen} 
                    onOpenChange={setCategoriesOpen}
                    className="border rounded-md overflow-hidden"
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 sm:px-4 sm:py-3 text-left text-sm bg-slate-50">
                      <span className="font-medium">Categories</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${categoriesOpen ? 'transform rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-3 border-t">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs">Category</TableHead>
                            <TableHead className="text-right text-xs">Items</TableHead>
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
                              <TableCell className="capitalize text-xs py-2">{category}</TableCell>
                              <TableCell className="text-right text-xs py-2">{count}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
                <CardFooter className="p-4 sm:p-6 pt-0">
                  <Button className="w-full text-sm" asChild>
                    <Link to={`/templates/${template.id}`}>Use This Template</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
          
          {/* Create Custom Template Card - Coming Soon */}
          <Card className="border-dashed border-2 border-gray-300 flex flex-col items-center justify-center p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-sky-600/80 flex items-center justify-center z-10">
              <div className="bg-white text-sky-700 py-1 px-4 sm:px-8 font-bold text-lg sm:text-xl w-full text-center transform rotate-12">
                COMING SOON
              </div>
            </div>
            <PlusCircle className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-4" />
            <h3 className="text-lg sm:text-xl font-medium text-gray-600 mb-2">Create Custom Template</h3>
            <p className="text-sm text-gray-500 text-center mb-6">Build your own festival checklist from scratch</p>
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
