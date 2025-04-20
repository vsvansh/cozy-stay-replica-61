
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

interface ComingSoonProps {
  title?: string;
  iconComponent?: React.ReactNode;
  description?: string;
}

const featureDescriptions: Record<string, { description: string, eta: string }> = {
  'community-qa': { 
    description: 'Ask questions and see answers from past guests or hosts to get real insights about properties.',
    eta: 'Coming mid-2025'
  },
  'split-payment': { 
    description: 'Group travel made easier. Share the cost and let everyone pay their portion individually.',
    eta: 'Coming Q2 2025'
  },
  'digital-key': { 
    description: 'Secure, time-limited access codes for contact-free check-in, no need to meet in person.',
    eta: 'Coming Q3 2025'
  },
  'carbon-footprint': { 
    description: 'Calculate and offset your travel impact when booking to make more sustainable choices.',
    eta: 'Coming late 2025'
  },
  'emergency-contact': { 
    description: 'Quick access to local emergency services, embassy contacts, or Airbnb support.',
    eta: 'Coming Q1 2025'
  },
  'loyalty-program': { 
    description: 'Monthly subscription for discounted stays, premium support, and exclusive property access.',
    eta: 'Coming mid-2025'
  },
  'smart-pricing': { 
    description: 'AI-powered tool suggesting optimal pricing based on demand, season, and local events.',
    eta: 'Coming Q2 2025'
  },
  'noise-detection': { 
    description: 'Smart device integration that alerts hosts if sound levels exceed established thresholds.',
    eta: 'Coming late 2025'
  },
  'calendar-sync': { 
    description: 'Synchronize availability across multiple booking platforms to prevent double bookings.',
    eta: 'Coming Q2 2025'
  },
  'referral-rewards': { 
    description: 'Invite friends and both get discount coupons or travel credit for future bookings.',
    eta: 'Coming Q1 2025'
  },
  'interactive-map': { 
    description: 'Advanced map with radius-based filters, budget sliders, and themed property clusters.',
    eta: 'Coming mid-2025'
  },
  'co-hosting': { 
    description: 'Manage listings with teams, assign specific roles, and track cleaning and maintenance tasks.',
    eta: 'Coming Q4 2025'
  }
};

const ComingSoon: React.FC<ComingSoonProps> = ({ title: propTitle, iconComponent, description: propDescription }) => {
  const location = useLocation();
  const params = useParams();
  const [title, setTitle] = useState(propTitle || 'Feature');
  const [description, setDescription] = useState(propDescription || 'This feature is coming soon!');
  const [eta, setEta] = useState('Coming soon');
  
  useEffect(() => {
    // Extract title from query params or path
    const searchParams = new URLSearchParams(location.search);
    const queryTitle = searchParams.get('title');
    
    if (queryTitle) {
      setTitle(queryTitle);
    } else {
      // Try to determine feature from path
      const path = location.pathname.split('/');
      const featureId = path[path.length - 1];
      
      if (featureDescriptions[featureId]) {
        const featureName = featureId
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        setTitle(featureName);
        setDescription(featureDescriptions[featureId].description);
        setEta(featureDescriptions[featureId].eta);
      }
    }
  }, [location, propTitle, propDescription]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center px-4 py-16 max-w-2xl mx-auto">
          {iconComponent && (
            <div className="flex justify-center mb-4">
              {iconComponent}
            </div>
          )}
          
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-gray-600 mb-2">{description}</p>
          <p className="text-gray-500 italic mb-8">{eta}</p>
          
          <div className="p-4 bg-gray-50 rounded-lg mb-8">
            <p className="text-sm text-gray-600">
              We're actively developing this feature. Want early access? 
              <a href="#" className="text-rose-500 font-medium ml-1 hover:underline">
                Join our waitlist
              </a>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Button>
            </Link>
            <Link to="/help">
              <Button variant="default" className="gap-2 bg-rose-500 hover:bg-rose-600">
                Learn more
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
