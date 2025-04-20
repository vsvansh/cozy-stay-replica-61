
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import PropertyCard, { PropertyProps } from '@/components/PropertyCard';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

// Define mock properties with unique IDs
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
      "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/704c15d9-2d1e-42a8-b9d4-3da9f2c45026?im_w=1200",
      "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/1e20dfa7-5f47-4c13-b564-78b19e6e6936?im_w=1200",
      "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/e757d701-f649-4f8e-a7f3-754e4654e38c?im_w=1200"
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
      "https://a0.muscache.com/im/pictures/miso/Hosting-39934917/original/227ad875-f49a-432f-9e92-65aac4e03931.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-39934917/original/cb4f5fb5-8f92-4102-9987-4c4c87337fb5.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-39934917/original/d25f0490-c82b-4f66-ac46-1770c3063c21.jpeg?im_w=1200"
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
      "https://a0.muscache.com/im/pictures/miso/Hosting-52800305/original/3ae97076-6969-49da-8a20-f461b4b86903.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-52800305/original/4c6745e7-cf0f-4214-8661-7e1847fef6cd.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-52800305/original/62b30615-73e3-44c2-a2f5-a45e8df0e2b5.jpeg?im_w=1200"
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
      "https://a0.muscache.com/im/pictures/miso/Hosting-45465864/original/3d966c94-4c87-479c-8f68-89b4788b5b89.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-45465864/original/51e2f5e7-0b28-4ee0-a87b-c0d722c55778.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-45465864/original/c8333044-6276-4b47-9f0b-ed8662947ea4.jpeg?im_w=1200"
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
      "https://a0.muscache.com/im/pictures/miso/Hosting-53733023/original/2a3e7893-8d24-4475-947f-6f8dd32798b2.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-53733023/original/ec41d0a9-0609-409c-b45b-3405a7759415.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-53733023/original/570b726f-df84-4erb-8df6-0c892cf8aa4f.jpeg?im_w=1200"
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
      "https://a0.muscache.com/im/pictures/miso/Hosting-40018740/original/d8a4a18a-d244-433a-b05b-0c9679b5d2a1.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-40018740/original/da951ef7-3c5f-42d6-8abb-95c5ca7f75f2.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-40018740/original/c9ea0977-c739-4a78-ac26-aa8e22f495b1.jpeg?im_w=1200"
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
      "https://a0.muscache.com/im/pictures/miso/Hosting-664806628366134108/original/6e4e0af6-c23e-4707-b132-174b17506bb6.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-664806628366134108/original/1d5d8517-ea13-4f54-9947-61a5165c63c1.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-664806628366134108/original/356c3ba3-6e10-4e67-9fda-c26ded4f85d6.jpeg?im_w=1200"
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
      "https://a0.muscache.com/im/pictures/miso/Hosting-715639287846526749/original/2ce2a8d0-69c7-4b2b-a0ef-9c9d465067ea.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-715639287846526749/original/f3f28f3c-19c0-4140-89d9-4809e8e0d1f5.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-715639287846526749/original/51f56c62-61ad-45c7-9a66-494159ee6ee1.jpeg?im_w=1200"
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
      'https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/0da70267-d9da-4efb-9123-2714b651c9af.jpeg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/80e77606-f487-4e0d-a9d4-259d3b2a865d.jpeg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/f69c345e-e95a-448e-8d0f-cacba691bbf2.jpeg'
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
      'https://a0.muscache.com/im/pictures/miso/Hosting-40792948/original/bd32c473-605c-4ab7-9929-841ac67107cc.jpeg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-40792948/original/c2d740ea-3d06-4993-b869-75d6464a6697.jpeg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-40792948/original/8737b6fc-e7ee-4400-a64f-6015a69a38db.jpeg'
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
      'https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/f69c345e-e95a-448e-8d0f-cacba691bbf2.jpeg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/8737b6fc-e7ee-4400-a64f-6015a69a38db.jpeg',
      'https://a0.muscache.com/im/pictures/e25a9b25-fa98-4160-bfd1-039287bf38b6.jpg'
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
      'https://a0.muscache.com/im/pictures/miso/Hosting-29459696/original/e8b0a583-1eb5-475f-86a8-693fba2aad7c.jpeg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-29459696/original/4c661645-cf7d-4b98-8519-223805c82fbc.jpeg',
      'https://a0.muscache.com/im/pictures/prohost-api/Hosting-32240386/original/fd195576-8282-4457-8f44-7d1c4d7e4a2b.jpeg'
    ]
  },
  {
    id: 13,
    title: 'Tropical Beach House',
    location: 'Kihei, Hawaii',
    distance: '2,680 miles away',
    dates: 'Nov 15-20',
    price: 420,
    rating: 4.95,
    images: [
      'https://a0.muscache.com/im/pictures/e25a9b25-fa98-4160-bfd1-039287bf38b6.jpg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-42566460/original/00d2eebb-bad3-43ba-ad52-3eb88e698a48.jpeg',
      'https://a0.muscache.com/im/pictures/baab5524-b606-45c0-babf-3a0d81c2d297.jpg'
    ]
  },
  {
    id: 14,
    title: 'Historic Brownstone',
    location: 'Boston, Massachusetts',
    distance: '2,120 miles away',
    dates: 'Dec 12-17',
    price: 285,
    rating: 4.88,
    images: [
      'https://a0.muscache.com/im/pictures/prohost-api/Hosting-32240386/original/fd195576-8282-4457-8f44-7d1c4d7e4a2b.jpeg',
      'https://a0.muscache.com/im/pictures/prohost-api/Hosting-32240386/original/86c735e6-9aaf-4b37-be56-a5b1d6a4b23a.jpeg',
      'https://a0.muscache.com/im/pictures/73c220b6-e292-4eb7-9a09-8ed95e018ad5.jpg'
    ]
  },
  {
    id: 15,
    title: 'Desert Oasis with Pool',
    location: 'Scottsdale, Arizona',
    distance: '820 miles away',
    dates: 'Nov 5-10',
    price: 315,
    rating: 4.97,
    images: [
      'https://a0.muscache.com/im/pictures/73c220b6-e292-4eb7-9a09-8ed95e018ad5.jpg',
      'https://a0.muscache.com/im/pictures/b48cbe2b-fbc8-47a6-a14e-7e5f94f38c8e.jpg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/0da70267-d9da-4efb-9123-2714b651c9af.jpeg'
    ]
  },
  {
    id: 16,
    title: 'Ski-in/Ski-out Chalet',
    location: 'Park City, Utah',
    distance: '730 miles away',
    dates: 'Jan 15-20',
    price: 390,
    rating: 4.92,
    images: [
      'https://a0.muscache.com/im/pictures/baab5524-b606-45c0-babf-3a0d81c2d297.jpg',
      'https://a0.muscache.com/im/pictures/d3d7659f-e66e-4aca-b4db-d0aa68d34713.jpg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-40792948/original/bd32c473-605c-4ab7-9929-841ac67107cc.jpeg'
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
