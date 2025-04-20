import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import PropertyCard, { PropertyProps } from '@/components/PropertyCard';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

// Define mock properties with unique IDs and more reliable image URLs
const MOCK_PROPERTIES: PropertyProps[] = [
  {
    id: 1,
    title: "Luxury Beachfront Villa",
    location: "Malibu, California",
    distance: "50 miles away",
    dates: "Nov 12-17",
    price: 1250,
    rating: 4.98,
    isSuperHost: true,
    roomType: "Entire villa",
    beds: 4,
    baths: 3.5,
    amenities: ["Pool", "Ocean view", "Kitchen"],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
    ]
  },
  {
    id: 2,
    title: "Modern Mountain Retreat",
    location: "Aspen, Colorado",
    distance: "820 miles away",
    dates: "Jan 5-10",
    price: 875,
    rating: 4.95,
    isSuperHost: true,
    roomType: "Entire chalet",
    beds: 3,
    baths: 2,
    amenities: ["Ski-in/out", "Hot tub", "Fireplace"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
    ]
  },
  {
    id: 3,
    title: "Historic Townhouse",
    location: "Charleston, South Carolina",
    distance: "1,200 miles away",
    dates: "Dec 1-6",
    price: 425,
    rating: 4.92,
    isNew: true,
    roomType: "Entire townhouse",
    beds: 2,
    baths: 2.5,
    amenities: ["Historic district", "Patio", "Bikes"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
    ]
  },
  {
    id: 4,
    title: "Lakefront Paradise",
    location: "Lake Tahoe, Nevada",
    distance: "45 miles away",
    dates: "Aug 15-20",
    price: 650,
    rating: 4.88,
    roomType: "Entire cabin",
    beds: 3,
    baths: 2,
    amenities: ["Lake access", "Kayaks", "Deck"],
    images: [
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1575517111839-3a3843ee7c8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
    ]
  },
  {
    id: 5,
    title: "Desert Oasis",
    location: "Joshua Tree, California",
    distance: "165 miles away",
    dates: "Oct 8-13",
    price: 395,
    rating: 4.97,
    isSuperHost: true,
    roomType: "Entire house",
    beds: 2,
    baths: 1,
    amenities: ["Stargazing", "Hot tub", "Fire pit"],
    images: [
      "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1587095951604-b9c077441d76?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
    ]
  },
  {
    id: 6,
    title: "Tropical Villa",
    location: "Maui, Hawaii",
    distance: "2,680 miles away",
    dates: "Sep 20-25",
    price: 895,
    rating: 4.94,
    isSuperHost: true,
    roomType: "Entire villa",
    beds: 4,
    baths: 3,
    amenities: ["Ocean view", "Pool", "Beach access"],
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
    ]
  },
  {
    id: 7,
    title: "Urban Loft",
    location: "New York City, New York",
    distance: "2,120 miles away",
    dates: "Nov 1-6",
    price: 525,
    rating: 4.89,
    isNew: true,
    roomType: "Entire loft",
    beds: 1,
    baths: 1,
    amenities: ["City view", "Gym", "Doorman"],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
    ]
  },
  {
    id: 8,
    title: "Mountain View Cabin",
    location: "Breckenridge, Colorado",
    distance: "730 miles away",
    dates: "Dec 20-25",
    price: 475,
    rating: 4.96,
    roomType: "Entire cabin",
    beds: 2,
    baths: 1,
    amenities: ["Mountain view", "Hot tub", "Fireplace"],
    images: [
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
    ]
  },
  {
    id: 9,
    title: 'Modern Beachfront Villa',
    location: 'Malibu, California',
    distance: '50 miles away',
    dates: 'Nov 12-17',
    price: 350,
    rating: 4.98,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1610554675869-83c162b6059c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80'
    ]
  },
  {
    id: 10,
    title: 'Luxurious Cabin with Mountain View',
    location: 'Aspen, Colorado',
    distance: '820 miles away',
    dates: 'Jan 5-10',
    price: 275,
    rating: 4.85,
    images: [
      'https://images.unsplash.com/photo-1618767689160-da3fb3615148?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80'
    ]
  },
  {
    id: 11,
    title: 'Cozy Lakefront Cottage',
    location: 'Lake Tahoe, Nevada',
    distance: '45 miles away',
    dates: 'Dec 1-6',
    price: 195,
    rating: 4.75,
    images: [
      'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1615529162924-f8605388461d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80'
    ]
  },
  {
    id: 12,
    title: 'Modern Downtown Loft',
    location: 'Seattle, Washington',
    distance: '1,240 miles away',
    dates: 'Oct 22-27',
    price: 225,
    rating: 4.92,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80'
    ]
  }
];

const Index: React.FC = () => {
  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [roomTypeFilter, setRoomTypeFilter] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      let filteredProperties = [...MOCK_PROPERTIES];
      
      // Apply price filter
      if (priceFilter) {
        filteredProperties = filteredProperties.filter(prop => prop.price <= priceFilter);
      }
      
      // Apply room type filter
      if (roomTypeFilter) {
        filteredProperties = filteredProperties.filter(prop => prop.roomType === roomTypeFilter);
      }
      
      setProperties(filteredProperties);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [priceFilter, roomTypeFilter]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <CategoryFilter />
      
      <main className="flex-grow pb-10">
        <div className="container mx-auto px-4 md:px-8 mt-8">
          <div className="mb-6 flex flex-wrap gap-4">
            <select
              className="px-4 py-2 border rounded-full text-sm hover:border-gray-400 transition-colors duration-200"
              onChange={(e) => setPriceFilter(e.target.value ? Number(e.target.value) : null)}
              defaultValue=""
            >
              <option value="">Price range</option>
              <option value="500">Under $500</option>
              <option value="1000">Under $1,000</option>
              <option value="1500">Under $1,500</option>
            </select>

            <select
              className="px-4 py-2 border rounded-full text-sm hover:border-gray-400 transition-colors duration-200"
              onChange={(e) => setRoomTypeFilter(e.target.value || null)}
              defaultValue=""
            >
              <option value="">Property type</option>
              <option value="Entire villa">Villa</option>
              <option value="Entire chalet">Chalet</option>
              <option value="Entire cabin">Cabin</option>
              <option value="Entire loft">Loft</option>
              <option value="Entire townhouse">Townhouse</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 8 }).map((_, index) => (
                <div key={`skeleton-${index}`} className="animate-pulse">
                  <Skeleton className="aspect-square w-full rounded-xl" />
                  <div className="mt-3 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              ))
            ) : (
              properties.map((property, index) => (
                <div 
                  key={`property-${property.id}-${index}`}
                  className={cn(
                    "opacity-0",
                    "animate-[fadeIn_0.5s_ease-out_forwards]"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PropertyCard {...property} />
                </div>
              ))
            )}
          </div>
          
          {!loading && properties.length === 0 && (
            <div className="text-center py-10">
              <h3 className="text-xl font-medium mb-2">No properties found</h3>
              <p className="text-gray-500">Try adjusting your filters to find more options</p>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/help" className="hover:underline transition-all duration-200">Help Center</Link></li>
                <li><Link to="/ComingSoon?title=AirCover" className="hover:underline transition-all duration-200">AirCover</Link></li>
                <li><Link to="/ComingSoon?title=Safety Information" className="hover:underline transition-all duration-200">Safety information</Link></li>
                <li><Link to="/ComingSoon?title=Accessibility" className="hover:underline transition-all duration-200">Supporting people with disabilities</Link></li>
                <li><Link to="/ComingSoon?title=Cancellation Options" className="hover:underline transition-all duration-200">Cancellation options</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Community</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/ComingSoon?title=Disaster Relief Housing" className="hover:underline transition-all duration-200">Airbnb.org: disaster relief housing</Link></li>
                <li><Link to="/ComingSoon?title=Anti-Discrimination" className="hover:underline transition-all duration-200">Combating discrimination</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Hosting</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/host" className="hover:underline transition-all duration-200">Airbnb your home</Link></li>
                <li><Link to="/ComingSoon?title=AirCover for Hosts" className="hover:underline transition-all duration-200">AirCover for Hosts</Link></li>
                <li><Link to="/ComingSoon?title=Hosting Resources" className="hover:underline transition-all duration-200">Hosting resources</Link></li>
                <li><Link to="/ComingSoon?title=Community Forum" className="hover:underline transition-all duration-200">Community forum</Link></li>
                <li><Link to="/ComingSoon?title=Responsible Hosting" className="hover:underline transition-all duration-200">Hosting responsibly</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Airbnb</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/ComingSoon?title=Newsroom" className="hover:underline transition-all duration-200">Newsroom</Link></li>
                <li><Link to="/ComingSoon?title=New Features" className="hover:underline transition-all duration-200">New features</Link></li>
                <li><Link to="/ComingSoon?title=Careers" className="hover:underline transition-all duration-200">Careers</Link></li>
                <li><Link to="/ComingSoon?title=Investors" className="hover:underline transition-all duration-200">Investors</Link></li>
                <li><Link to="/ComingSoon?title=Gift Cards" className="hover:underline transition-all duration-200">Gift cards</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-6 flex flex-col md:flex-row md:justify-between items-center">
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm mb-4 md:mb-0">
              <span>© 2025 Airbnb, Inc.</span>
              <div className="hidden md:flex gap-2">
                <span>·</span>
                <Link to="/ComingSoon?title=Privacy" className="hover:underline transition-all duration-200">Privacy</Link>
                <span>·</span>
                <Link to="/ComingSoon?title=Terms" className="hover:underline transition-all duration-200">Terms</Link>
                <span>·</span>
                <Link to="/ComingSoon?title=Sitemap" className="hover:underline transition-all duration-200">Sitemap</Link>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <button className="text-sm font-medium hover:underline">English (US)</button>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-sm font-medium hover:underline">$ USD</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
