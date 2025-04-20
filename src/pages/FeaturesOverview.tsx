
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewHeader from '@/components/NewHeader';
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
import { Button } from '@/components/ui/button';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  path: string;
  eta: string;
}

const features: Feature[] = [
  {
    id: 'community-qa',
    title: 'Community Q&A',
    description: 'Ask questions and see answers from past guests or hosts.',
    icon: MessageSquare,
    path: '/features/community-qa',
    eta: 'Coming mid-2025'
  },
  {
    id: 'split-payment',
    title: 'Split Payment with Friends',
    description: 'Group travel? Allow guests to share the cost and pay individually.',
    icon: Users,
    path: '/features/split-payment',
    eta: 'Coming Q2 2025'
  },
  {
    id: 'digital-key',
    title: 'Digital Key / Smart Lock',
    description: 'Hosts can send secure, time-limited codes for check-in without meeting in person.',
    icon: Key,
    path: '/features/digital-key',
    eta: 'Coming Q3 2025'
  },
  {
    id: 'carbon-footprint',
    title: 'Carbon Footprint Calculator',
    description: 'Let users see and offset their travel impact when booking.',
    icon: Leaf,
    path: '/features/carbon-footprint',
    eta: 'Coming late 2025'
  },
  {
    id: 'emergency-contact',
    title: 'Emergency Contact Button',
    description: 'Quick access to local emergency services, embassy, or Airbnb support.',
    icon: Phone,
    path: '/features/emergency-contact',
    eta: 'Coming Q1 2025'
  },
  {
    id: 'loyalty-program',
    title: 'Subscription or Loyalty Program',
    description: '"Airbnb Pass": Monthly fee for discounted stays or exclusive access.',
    icon: Badge,
    path: '/features/loyalty-program',
    eta: 'Coming mid-2025'
  },
  {
    id: 'smart-pricing',
    title: 'AI-Powered Smart Pricing Tool',
    description: 'Suggest best pricing based on demand, season, events nearby.',
    icon: ChartBar,
    path: '/features/smart-pricing',
    eta: 'Coming Q2 2025'
  },
  {
    id: 'noise-detection',
    title: 'Noise & Party Detection',
    description: 'Integration with smart devices that alert if sound exceeds a threshold.',
    icon: Volume2,
    path: '/features/noise-detection',
    eta: 'Coming late 2025'
  },
  {
    id: 'calendar-sync',
    title: 'Live Availability & Calendar Sync',
    description: 'Sync across platforms like Vrbo, Booking.com, etc.',
    icon: Calendar,
    path: '/features/calendar-sync',
    eta: 'Coming Q2 2025'
  },
  {
    id: 'referral-rewards',
    title: 'Referral & Reward System',
    description: 'Invite a friend and both get discount coupons or travel credit.',
    icon: Gift,
    path: '/features/referral-rewards',
    eta: 'Coming Q1 2025'
  },
  {
    id: 'interactive-map',
    title: 'Interactive Map View with Filters',
    description: 'Advanced map with filters, budget range slider, or theme clusters.',
    icon: Map,
    path: '/features/interactive-map',
    eta: 'Coming mid-2025'
  },
  {
    id: 'co-hosting',
    title: 'Co-Hosting Dashboard',
    description: 'Hosts can manage listings with teams, assign roles, and track tasks.',
    icon: UserRound,
    path: '/features/co-hosting',
    eta: 'Coming Q4 2025'
  },
];

const FeaturesOverview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <NewHeader />
      
      <main className="flex-grow container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-4">Upcoming Features</h1>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          We're constantly improving our platform with new features to enhance your experience.
          Here's a sneak peek at what we're working on.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start mb-4">
                <div className="bg-rose-100 p-3 rounded-lg">
                  <feature.icon className="h-6 w-6 text-rose-500" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.eta}</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 min-h-[60px]">{feature.description}</p>
              
              <Button 
                onClick={() => navigate(feature.path)}
                className="w-full bg-rose-500 hover:bg-rose-600"
              >
                Learn more
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FeaturesOverview;
