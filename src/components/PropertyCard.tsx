
import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

export interface PropertyProps {
  id: number;
  title: string;
  location: string;
  distance: string;
  dates: string;
  price: number;
  rating: number;
  images: string[];
  isSuperHost?: boolean;
  roomType?: string;
  beds?: number;
  baths?: number;
  amenities?: string[];
  isNew?: boolean;
}

const PropertyCard: React.FC<PropertyProps> = ({
  id,
  title,
  location,
  distance,
  dates,
  price,
  rating,
  images,
  isSuperHost,
  roomType,
  beds,
  baths,
  amenities,
  isNew
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // More reliable fallback images with high-quality photos
  const fallbackImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80"
  ];

  // Ensure we have images, use fallbacks if needed
  const displayImages = images && images.length > 0 ? 
    images.map((img, i) => img || fallbackImages[i % fallbackImages.length]) : 
    fallbackImages.slice(0, 3);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast(isFavorite ? "Removed from wishlist" : "Saved to wishlist", {
      description: location,
      duration: 3000,
    });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, index: number) => {
    const target = e.target as HTMLImageElement;
    target.src = fallbackImages[index % fallbackImages.length];
    console.log(`Replacing failed image with fallback: ${target.src}`);
  };

  return (
    <Card 
      className="overflow-hidden border-none shadow-none hover:cursor-pointer transition-transform duration-300 hover:scale-[1.02] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/property/${id}`)}
    >
      <CardContent className="p-0">
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent className="rounded-xl overflow-hidden">
              {displayImages.map((image, index) => (
                <CarouselItem key={`${id}-image-${index}`}>
                  <div className="aspect-square relative">
                    <img
                      src={image}
                      alt={`${title || location} - ${index + 1}`}
                      className="object-cover w-full h-full transition-all duration-300"
                      onError={(e) => handleImageError(e, index)}
                      loading="lazy"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {displayImages.length > 1 && isHovered && (
              <>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white h-7 w-7 opacity-90 hover:opacity-100" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white h-7 w-7 opacity-90 hover:opacity-100" />
              </>
            )}
            
            <button
              onClick={toggleFavorite}
              className="absolute top-3 right-3 z-10 transition-transform duration-200 hover:scale-110"
              aria-label={isFavorite ? "Remove from wishlist" : "Save to wishlist"}
            >
              <Heart className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white stroke-[2.5]'}`} />
            </button>
          </Carousel>
          
          <div className="mt-3">
            <div className="flex justify-between items-start">
              <div className="flex-grow">
                {isSuperHost && (
                  <span className="inline-block px-2 py-1 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-700 mb-1">
                    SUPERHOST
                  </span>
                )}
                {isNew && (
                  <span className="inline-block px-2 py-1 rounded-full text-[10px] font-semibold bg-teal-100 text-teal-700 mb-1 ml-1">
                    NEW
                  </span>
                )}
                <h3 className="font-medium text-black">{location}</h3>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 fill-current" />
                <span>{rating.toFixed(2)}</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm">{roomType}</p>
            <p className="text-gray-500 text-sm">{distance}</p>
            <p className="text-gray-500 text-sm">{dates}</p>
            <div className="mt-1 flex justify-between items-center">
              <p>
                <span className="font-semibold">${price}</span> night
              </p>
              {amenities && amenities.length > 0 && (
                <div className="text-xs text-gray-500">
                  {amenities.slice(0, 2).join(' • ')}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
