import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import InstallPWA from "./components/InstallPWA";
import { NoteProvider } from "./contexts/NoteContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NoteProvider>
        <Toaster />
        <Sonner position="top-center" dir="rtl" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <InstallPWA />
        </BrowserRouter>
      </NoteProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
