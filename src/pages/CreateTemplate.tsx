
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ChecklistItem, EventInfo, categories } from '@/utils/data';
import Header from '@/components/Header';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ArrowLeft, Calendar, Clock, MapPin, Music, PlusCircle } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Template name must be at least 3 characters.",
  }),
  eventName: z.string().min(2, {
    message: "Event name is required.",
  }),
  date: z.string().min(2, {
    message: "Event date is required.",
  }),
  location: z.string().min(2, {
    message: "Location is required.",
  }),
  startTime: z.string().min(2, {
    message: "Start time is required.",
  }),
});

const CreateTemplate: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [newItemText, setNewItemText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      eventName: "",
      date: "",
      location: "",
      startTime: "",
    },
  });

  const handleAddItem = () => {
    if (newItemText.trim() === '') {
      toast({
        title: "Error",
        description: "Item text cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      text: newItemText,
      category: selectedCategory,
      isCompleted: false
    };

    setItems([...items, newItem]);
    setNewItemText('');
    
    toast({
      title: "Item added",
      description: newItemText,
    });
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (items.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one item to your checklist",
        variant: "destructive",
      });
      return;
    }

    const eventInfo: EventInfo = {
      name: values.eventName,
      date: values.date,
      location: values.location,
      startTime: values.startTime,
    };

    // In a real app, this would save to a database
    // For now, we'll just show a success message and redirect
    toast({
      title: "Template created",
      description: "Your custom template has been created successfully!",
    });
    
    // Navigate back to templates page after a short delay
    setTimeout(() => {
      navigate('/templates');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto pb-12">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={() => navigate('/templates')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Templates
          </Button>
          
          <h1 className="text-3xl font-bold">Create Custom Template</h1>
          <p className="text-gray-600">Build your perfect festival checklist from scratch</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Template Details</CardTitle>
                    <CardDescription>
                      Basic information about your template
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Template Name</FormLabel>
                          <FormControl>
                            <Input placeholder="My Festival Template" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is how your template will appear to others
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="eventName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Name</FormLabel>
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <Music className="h-5 w-5 text-gray-400" />
                                <Input placeholder="Festival Name" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Date</FormLabel>
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-5 w-5 text-gray-400" />
                                <Input placeholder="Event Date" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <MapPin className="h-5 w-5 text-gray-400" />
                                <Input placeholder="Event Location" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gates Open</FormLabel>
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-5 w-5 text-gray-400" />
                                <Input placeholder="Start Time" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Checklist Items</CardTitle>
                    <CardDescription>
                      Add items to your festival checklist
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <div className="grid gap-2 flex-1">
                        <FormLabel htmlFor="item-text">New Item</FormLabel>
                        <Input
                          id="item-text"
                          placeholder="Add an item to your checklist..."
                          value={newItemText}
                          onChange={(e) => setNewItemText(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <FormLabel htmlFor="category">Category</FormLabel>
                        <select
                          id="category"
                          className="h-10 rounded-md border border-input bg-background px-3 py-2"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="grid gap-2">
                        <FormLabel>&nbsp;</FormLabel>
                        <Button type="button" onClick={handleAddItem}>
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Current Items ({items.length})</h4>
                      {items.length === 0 ? (
                        <p className="text-gray-500 italic">No items added yet. Add some items to create your checklist.</p>
                      ) : (
                        <ul className="space-y-2">
                          {items.map((item) => {
                            const category = categories.find(c => c.id === item.category);
                            return (
                              <li key={item.id} className="flex items-center justify-between p-2 border rounded-md">
                                <div className="flex items-center space-x-2">
                                  <span className={`inline-block w-3 h-3 rounded-full ${category?.color.split(' ')[0]}`}></span>
                                  <span>{item.text}</span>
                                  <span className="text-sm text-gray-500">({category?.name})</span>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleRemoveItem(item.id)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  Remove
                                </Button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardFooter className="flex justify-between pt-6">
                    <Button variant="outline" type="button" onClick={() => navigate('/templates')}>
                      Cancel
                    </Button>
                    <Button type="submit">Create Template</Button>
                  </CardFooter>
                </Card>
              </form>
            </Form>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  How your template will look
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="aspect-video w-full overflow-hidden bg-gray-100 rounded-md flex items-center justify-center">
                    <Music className="h-16 w-16 text-gray-300" />
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg">{form.watch("name") || "Template Name"}</h3>
                    <p className="text-sm text-gray-500">{form.watch("location") || "Event Location"}</p>
                  </div>
                  
                  <div className="text-sm">
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{form.watch("date") || "Event Date"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{form.watch("startTime") || "Gates Open"}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <h4 className="font-medium mb-2">Items by Category</h4>
                    {items.length === 0 ? (
                      <p className="text-gray-500 italic text-sm">No items added yet</p>
                    ) : (
                      <ul className="space-y-1 text-sm">
                        {Object.entries(
                          items.reduce((acc, item) => {
                            acc[item.category] = (acc[item.category] || 0) + 1;
                            return acc;
                          }, {} as Record<string, number>)
                        ).map(([category, count]) => {
                          const categoryInfo = categories.find(c => c.id === category);
                          return (
                            <li key={category} className="flex items-center justify-between">
                              <span className="capitalize">{categoryInfo?.name}</span>
                              <span className="text-gray-500">{count} item{count !== 1 ? 's' : ''}</span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateTemplate;
