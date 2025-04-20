
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PropertyDetails from "./pages/PropertyDetails";
import ComingSoon from "./pages/ComingSoon";
import Login from "./pages/Login";
import Host from "./pages/Host";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/host" element={<Host />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<ComingSoon title="Sign up" />} />
          <Route path="/help" element={<ComingSoon title="Help Center" />} />
          <Route path="/experiences" element={<ComingSoon title="Experiences" />} />
          <Route path="/online-experiences" element={<ComingSoon title="Online Experiences" />} />
          <Route path="/ComingSoon" element={<ComingSoon />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
