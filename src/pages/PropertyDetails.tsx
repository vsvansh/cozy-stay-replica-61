
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Star, Share, Award, Home, MapPin, Users, Bed, Bath, Calendar, ExternalLink } from 'lucide-react';
import { PropertyProps } from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Header from '@/components/Header';
import DateRangePicker from '@/components/DateRangePicker';
import { addDays } from 'date-fns';
import type { DateRange } from 'react-day-picker';

const PropertyDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [numGuests, setNumGuests] = useState(2);
  const property = MOCK_PROPERTIES.find(p => p.id === Number(id));
  
  const [dateRange, setDateRange] = useState<DateRange>({
    from: addDays(new Date(), 1),
    to: addDays(new Date(), 6),
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast(isFavorite ? "Removed from favorites" : "Added to favorites", {
      description: property?.title,
      duration: 3000,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title || "Airbnb listing",
        text: `Check out this amazing place in ${property?.location}`,
        url: window.location.href,
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href);
        toast("Link copied to clipboard", {
          description: "You can now share it with friends",
          duration: 3000,
        });
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast("Link copied to clipboard", {
        description: "You can now share it with friends",
        duration: 3000,
      });
    }
  };

  const handleReserve = () => {
    if (!dateRange.from || !dateRange.to) {
      toast("Please select dates first", {
        description: "You need to pick a date range for your stay",
        duration: 3000,
      });
      return;
    }
    
    toast("Reservation confirmed!", {
      description: `Your stay is booked for ${numGuests} guests`,
      duration: 3000,
    });
  };

  const handleGuestsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNumGuests(parseInt(e.target.value, 10));
  };

  const calculateTotalNights = (): number => {
    if (!dateRange.from || !dateRange.to) return 5; // Default if no selection
    const diffTime = Math.abs(dateRange.to.getTime() - dateRange.from.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = (): number => {
    const nights = calculateTotalNights();
    const subtotal = property ? property.price * nights : 0;
    const cleaningFee = 75;
    const serviceFee = 120;
    return subtotal + cleaningFee + serviceFee;
  };

  // Fallback image
  const fallbackImage = "https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/0da70267-d9da-4efb-9123-2714b651c9af.jpeg";

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <div className="w-full max-w-3xl animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded-xl mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="h-32 bg-gray-200 rounded-xl mb-6"></div>
          <div className="h-40 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Property not found</h1>
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  const photos = property.images && property.images.length > 0 
    ? property.images 
    : [fallbackImage, fallbackImage, fallbackImage, fallbackImage, fallbackImage];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-6 flex-grow">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 mb-4 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to listings
          </Link>
          
          {/* Property Title */}
          <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-bold">{property.title}</h1>
          </div>
          
          {/* Property Meta & Actions */}
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-current text-black mr-1" />
                <span className="font-semibold">{property.rating.toFixed(2)}</span>
              </div>
              <span className="mx-1">•</span>
              <span className="text-gray-700">{property.location}</span>
            </div>
            
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <button 
                onClick={handleShare}
                className="flex items-center gap-1 text-gray-800 hover:text-black transition-colors"
              >
                <Share className="h-4 w-4" />
                <span>Share</span>
              </button>
              
              <button 
                onClick={toggleFavorite}
                className="flex items-center gap-1 text-gray-800 hover:text-black transition-colors"
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{isFavorite ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>
          
          {/* Photo Gallery */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 rounded-xl overflow-hidden">
              {photos.length > 0 && (
                <div className="md:col-span-1 aspect-square relative">
                  <img 
                    src={photos[0]} 
                    alt={property.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackImage;
                    }}
                  />
                </div>
              )}
              
              <div className="hidden md:grid grid-cols-2 gap-2">
                {photos.slice(1, 5).map((photo, idx) => (
                  <div key={idx} className="aspect-square relative">
                    <img 
                      src={photo} 
                      alt={`${property.title} ${idx + 2}`} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = fallbackImage;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mobile Carousel */}
            <div className="block md:hidden mt-2">
              <Carousel className="w-full">
                <CarouselContent>
                  {photos.slice(1).map((photo, idx) => (
                    <CarouselItem key={idx}>
                      <div className="aspect-square relative">
                        <img 
                          src={photo} 
                          alt={`${property.title} ${idx + 2}`} 
                          className="w-full h-full object-cover rounded-xl"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = fallbackImage;
                          }}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white h-7 w-7" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white h-7 w-7" />
              </Carousel>
            </div>
          </div>
          
          {/* Property Info & Booking */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Property Details */}
            <div className="md:col-span-2 space-y-6">
              {/* Host Info */}
              <div>
                <h2 className="text-xl font-bold mb-2">
                  {property.roomType} hosted by Airbnb Host
                  {property.isSuperHost && (
                    <span className="ml-2 inline-flex items-center text-sm font-medium text-rose-600">
                      <Award className="h-4 w-4 mr-1" /> Superhost
                    </span>
                  )}
                </h2>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600">
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {property.beds && property.beds * 2} guests
                  </span>
                  <span className="flex items-center">
                    <Bed className="h-4 w-4 mr-2" />
                    {property.beds} beds
                  </span>
                  <span className="flex items-center">
                    <Bath className="h-4 w-4 mr-2" />
                    {property.baths} baths
                  </span>
                </div>
              </div>
              
              <Separator />
              
              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-4">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Great location</h3>
                    <p className="text-gray-600 text-sm">95% of recent guests gave the location a 5-star rating.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-4">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Free cancellation before check-in</h3>
                    <p className="text-gray-600 text-sm">Cancel before check-in for a partial refund.</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Description */}
              <div>
                <h2 className="text-xl font-bold mb-4">About this place</h2>
                <p className="text-gray-700 leading-relaxed">
                  Experience this {property.roomType?.toLowerCase()} in {property.location}, located just {property.distance?.toLowerCase()}. 
                  This well-appointed home features {property.beds} comfortable beds, {property.baths} bathrooms, and amenities 
                  including {property.amenities?.join(', ')}.
                </p>
              </div>
              
              <Separator />
              
              {/* Amenities */}
              <div>
                <h2 className="text-xl font-bold mb-4">What this place offers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.amenities?.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="mr-4">
                        <ExternalLink className="h-5 w-5 text-gray-500" />
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              {/* Location */}
              <div>
                <h2 className="text-xl font-bold mb-4">Where you'll be</h2>
                <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-center h-64">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                    <p className="font-medium">{property.location}</p>
                    <p className="text-gray-600 text-sm">{property.distance}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Booking Card */}
            <div className="md:col-span-1">
              <Card className="sticky top-24 border rounded-xl shadow-lg overflow-hidden p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-2xl font-bold">${property.price}</span>
                    <span className="text-gray-600"> night</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-current text-black mr-1" />
                    <span>{property.rating.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="p-4 border-b">
                    <DateRangePicker 
                      dateRange={dateRange} 
                      onDateRangeChange={setDateRange} 
                    />
                  </div>
                  <div className="p-4">
                    <label htmlFor="guests" className="block text-xs font-bold uppercase mb-1">GUESTS</label>
                    <select 
                      id="guests" 
                      value={numGuests}
                      onChange={handleGuestsChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'guest' : 'guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-airbnb-red hover:bg-airbnb-red/90 text-white py-3"
                  onClick={handleReserve}
                >
                  Reserve
                </Button>
                
                <div className="text-center text-gray-500 text-sm">
                  You won't be charged yet
                </div>
                
                <div className="space-y-3 pt-4">
                  <div className="flex justify-between">
                    <span className="underline">
                      ${property.price} x {calculateTotalNights()} nights
                    </span>
                    <span>${property.price * calculateTotalNights()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">Cleaning fee</span>
                    <span>$75</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">Service fee</span>
                    <span>$120</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total before taxes</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add the mock properties data used in Index.tsx
const MOCK_PROPERTIES = [
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
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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

export default PropertyDetails;
