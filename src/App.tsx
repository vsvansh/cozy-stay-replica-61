
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
import FeaturesOverview from "./pages/FeaturesOverview";
import { 
  MessageSquare, 
  Users, 
  Key, 
  Leaf, 
  Phone, 
  Badge, 
  ChartBar, 
  Volume2, 
  Calendar, 
  Gift, 
  Map, 
  UserRound 
} from 'lucide-react';

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
          
          {/* Features Pages */}
          <Route path="/features" element={<FeaturesOverview />} />
          <Route path="/features/community-qa" element={
            <ComingSoon 
              iconComponent={<MessageSquare size={48} className="text-rose-500" />} 
            />
          } />
          <Route path="/features/split-payment" element={
            <ComingSoon
              iconComponent={<Users size={48} className="text-rose-500" />} 
            />
          } />
          <Route path="/features/digital-key" element={
            <ComingSoon
              iconComponent={<Key size={48} className="text-rose-500" />} 
            />
          } />
          <Route path="/features/carbon-footprint" element={
            <ComingSoon
              iconComponent={<Leaf size={48} className="text-rose-500" />} 
            />
          } />
          <Route path="/features/emergency-contact" element={
            <ComingSoon
              iconComponent={<Phone size={48} className="text-rose-500" />} 
            />
          } />
          <Route path="/features/loyalty-program" element={
            <ComingSoon
              iconComponent={<Badge size={48} className="text-rose-500" />} 
            />
          } />
          <Route path="/features/smart-pricing" element={
            <ComingSoon
              iconComponent={<ChartBar size={48} className="text-rose-500" />} 
            />
          } />
          <Route path="/features/noise-detection" element={
            <ComingSoon
              iconComponent={<Volume2 size={48} className="text-rose-500" />} 
            />
          } />
          <Route path="/features/calendar-sync" element={
            <ComingSoon
              iconComponent={<Calendar size={48} className="text-rose-500" />} 
            />
          } />
          <Route path="/features/referral-rewards" element={
            <ComingSoon
              iconComponent={<Gift size={48} className="text-rose-500" />} 
            />
          } />
          <Route path="/features/interactive-map" element={
            <ComingSoon
              iconComponent={<Map size={48} className="text-rose-500" />} 
            />
          } />
          <Route path="/features/co-hosting" element={
            <ComingSoon
              iconComponent={<UserRound size={48} className="text-rose-500" />} 
            />
          } />
          
          <Route path="/ComingSoon" element={<ComingSoon />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
