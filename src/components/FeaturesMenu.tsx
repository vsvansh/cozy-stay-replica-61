
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const features = [
  { id: 'community-qa', name: 'Community Q&A', path: '/features/community-qa', icon: MessageSquare },
  { id: 'split-payment', name: 'Split Payment with Friends', path: '/features/split-payment', icon: Users },
  { id: 'digital-key', name: 'Digital Key / Smart Lock', path: '/features/digital-key', icon: Key },
  { id: 'carbon-footprint', name: 'Carbon Footprint Calculator', path: '/features/carbon-footprint', icon: Leaf },
  { id: 'emergency-contact', name: 'Emergency Contact', path: '/features/emergency-contact', icon: Phone },
  { id: 'loyalty-program', name: 'Subscription or Loyalty Program', path: '/features/loyalty-program', icon: Badge },
  { id: 'smart-pricing', name: 'Smart Pricing Tool', path: '/features/smart-pricing', icon: ChartBar },
  { id: 'noise-detection', name: 'Noise & Party Detection', path: '/features/noise-detection', icon: Volume2 },
  { id: 'calendar-sync', name: 'Calendar Sync', path: '/features/calendar-sync', icon: Calendar },
  { id: 'referral-rewards', name: 'Referral & Reward System', path: '/features/referral-rewards', icon: Gift },
  { id: 'interactive-map', name: 'Interactive Map View', path: '/features/interactive-map', icon: Map },
  { id: 'co-hosting', name: 'Co-Hosting Dashboard', path: '/features/co-hosting', icon: UserRound },
];

const FeaturesMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-white text-black hover:bg-gray-100 border-gray-300">
          Features
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 max-h-96 overflow-y-auto">
        <DropdownMenuLabel>New Features</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {features.map((feature) => (
            <DropdownMenuItem
              key={feature.id}
              className="cursor-pointer px-4 py-2.5"
              onClick={() => navigate(feature.path)}
            >
              <feature.icon className="mr-2 h-4 w-4" />
              <span>{feature.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FeaturesMenu;
