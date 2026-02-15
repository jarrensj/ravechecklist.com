
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import Footer from "./components/Footer";
import AppDownloadBanner from "./components/AppDownloadBanner";
import React from "react";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/">
        <TooltipProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <AppDownloadBanner />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/checklist" element={<Dashboard />} />
                <Route path="/blog" element={<Blog />} />
                {/* Redirects for backward compatibility */}
                <Route path="/dashboard" element={<Navigate to="/checklist" replace />} />
                <Route path="/templates" element={<Navigate to="/checklist" replace />} />
                <Route path="/templates/:id" element={<Navigate to="/checklist" replace />} />
                <Route path="/templates/detail/:id" element={<Navigate to="/checklist" replace />} />
                <Route path="/index" element={<Navigate to="/checklist" replace />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
