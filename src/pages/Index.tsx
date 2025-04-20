
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import PropertyCard, { PropertyProps } from '@/components/PropertyCard';
import { cn } from '@/lib/utils';

const MOCK_PROPERTIES: PropertyProps[] = [
  {
    id: 1,
    title: 'Modern Beachfront Villa',
    location: 'Malibu, California',
    distance: '50 miles away',
    dates: 'Nov 12-17',
    price: 350,
    rating: 4.98,
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/0da70267-d9da-4efb-9123-2714b651c9af.jpeg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/80e77606-f487-4e0d-a9d4-259d3b2a865d.jpeg'
    ]
  },
  {
    id: 2,
    title: 'Luxurious Cabin with Mountain View',
    location: 'Aspen, Colorado',
    distance: '820 miles away',
    dates: 'Jan 5-10',
    price: 275,
    rating: 4.85,
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-40792948/original/bd32c473-605c-4ab7-9929-841ac67107cc.jpeg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-40792948/original/c2d740ea-3d06-4993-b869-75d6464a6697.jpeg'
    ]
  },
  {
    id: 3,
    title: 'Cozy Lakefront Cottage',
    location: 'Lake Tahoe, Nevada',
    distance: '45 miles away',
    dates: 'Dec 1-6',
    price: 195,
    rating: 4.75,
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/f69c345e-e95a-448e-8d0f-cacba691bbf2.jpeg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/8737b6fc-e7ee-4400-a64f-6015a69a38db.jpeg'
    ]
  },
  {
    id: 4,
    title: 'Modern Downtown Loft',
    location: 'Seattle, Washington',
    distance: '1,240 miles away',
    dates: 'Oct 22-27',
    price: 225,
    rating: 4.92,
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-29459696/original/e8b0a583-1eb5-475f-86a8-693fba2aad7c.jpeg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-29459696/original/4c661645-cf7d-4b98-8519-223805c82fbc.jpeg'
    ]
  },
  {
    id: 5,
    title: 'Tropical Beach House',
    location: 'Kihei, Hawaii',
    distance: '2,680 miles away',
    dates: 'Nov 15-20',
    price: 420,
    rating: 4.95,
    images: [
      'https://a0.muscache.com/im/pictures/e25a9b25-fa98-4160-bfd1-039287bf38b6.jpg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-42566460/original/00d2eebb-bad3-43ba-ad52-3eb88e698a48.jpeg'
    ]
  },
  {
    id: 6,
    title: 'Historic Brownstone',
    location: 'Boston, Massachusetts',
    distance: '2,120 miles away',
    dates: 'Dec 12-17',
    price: 285,
    rating: 4.88,
    images: [
      'https://a0.muscache.com/im/pictures/prohost-api/Hosting-32240386/original/fd195576-8282-4457-8f44-7d1c4d7e4a2b.jpeg',
      'https://a0.muscache.com/im/pictures/prohost-api/Hosting-32240386/original/86c735e6-9aaf-4b37-be56-a5b1d6a4b23a.jpeg'
    ]
  },
  {
    id: 7,
    title: 'Desert Oasis with Pool',
    location: 'Scottsdale, Arizona',
    distance: '820 miles away',
    dates: 'Nov 5-10',
    price: 315,
    rating: 4.97,
    images: [
      'https://a0.muscache.com/im/pictures/73c220b6-e292-4eb7-9a09-8ed95e018ad5.jpg',
      'https://a0.muscache.com/im/pictures/b48cbe2b-fbc8-47a6-a14e-7e5f94f38c8e.jpg'
    ]
  },
  {
    id: 8,
    title: 'Ski-in/Ski-out Chalet',
    location: 'Park City, Utah',
    distance: '730 miles away',
    dates: 'Jan 15-20',
    price: 390,
    rating: 4.92,
    images: [
      'https://a0.muscache.com/im/pictures/baab5524-b606-45c0-babf-3a0d81c2d297.jpg',
      'https://a0.muscache.com/im/pictures/d3d7659f-e66e-4aca-b4db-d0aa68d34713.jpg'
    ]
  }
];

const Index: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<PropertyProps[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate progressive loading of cards for a nice animation effect
    const showCards = async () => {
      setVisibleCards([]);
      
      // Start showing cards one by one with a slight delay
      for (let i = 0; i < MOCK_PROPERTIES.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setVisibleCards(prev => [...prev, MOCK_PROPERTIES[i]]);
      }
    };

    showCards();
    setTimeout(() => setLoaded(true), 500);
  }, []);

  return (
    <div className={cn(
      "flex flex-col min-h-screen transition-opacity duration-500",
      loaded ? "opacity-100" : "opacity-0"
    )}>
      <Header />
      <CategoryFilter />
      
      <main className="flex-grow pb-10 transition-all duration-300">
        <div className="container mx-auto px-4 md:px-8 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleCards.map((property, index) => (
              <div 
                key={property.id}
                className={cn(
                  "opacity-0 transform translate-y-4",
                  loaded && `animate-[fadeIn_0.5s_ease-out_${index * 0.1}s_forwards]`
                )}
                style={{
                  animationDelay: `${index * 0.05}s`,
                  animationFillMode: 'forwards'
                }}
              >
                <PropertyCard {...property} />
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:underline transition-all duration-200">Help Center</a></li>
                <li><a href="#" className="hover:underline transition-all duration-200">AirCover</a></li>
                <li><a href="#" className="hover:underline transition-all duration-200">Safety information</a></li>
                <li><a href="#" className="hover:underline transition-all duration-200">Supporting people with disabilities</a></li>
                <li><a href="#" className="hover:underline transition-all duration-200">Cancellation options</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Community</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:underline transition-all duration-200">Airbnb.org: disaster relief housing</a></li>
                <li><a href="#" className="hover:underline transition-all duration-200">Combating discrimination</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Hosting</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:underline transition-all duration-200">Airbnb your home</a></li>
                <li><a href="#" className="hover:underline transition-all duration-200">AirCover for Hosts</a></li>
                <li><a href="#" className="hover:underline transition-all duration-200">Hosting resources</a></li>
                <li><a href="#" className="hover:underline transition-all duration-200">Community forum</a></li>
                <li><a href="#" className="hover:underline transition-all duration-200">Hosting responsibly</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Airbnb</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:underline transition-all duration-200">Newsroom</a></li>
                <li><a href="#" className="hover:underline transition-all duration-200">New features</a></li>
                <li><a href="#" className="hover:underline transition-all duration-200">Careers</a></li>
                <li><a href="#" className="hover:underline transition-all duration-200">Investors</a></li>
                <li><a href="#" className="hover:underline transition-all duration-200">Gift cards</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-6 flex flex-col md:flex-row md:justify-between items-center">
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm mb-4 md:mb-0">
              <span>© 2025 Airbnb, Inc.</span>
              <div className="hidden md:flex gap-2">
                <span>·</span>
                <a href="#" className="hover:underline transition-all duration-200">Privacy</a>
                <span>·</span>
                <a href="#" className="hover:underline transition-all duration-200">Terms</a>
                <span>·</span>
                <a href="#" className="hover:underline transition-all duration-200">Sitemap</a>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">English (US)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">$ USD</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
