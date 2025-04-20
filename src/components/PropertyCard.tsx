
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

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast(isFavorite ? "Removed from favorites" : "Added to favorites", {
      description: location,
      duration: 3000,
    });
  };

  // Fallback image in case the original fails to load
  const fallbackImage = "https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/0da70267-d9da-4efb-9123-2714b651c9af.jpeg";

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
              {images.map((image, index) => (
                <CarouselItem key={`${id}-image-${index}`}>
                  <div className="aspect-square relative">
                    <img
                      src={image || fallbackImage}
                      alt={`${title} - ${index + 1}`}
                      className="object-cover w-full h-full transition-all duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = fallbackImage;
                      }}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {images.length > 1 && isHovered && (
              <>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white h-7 w-7 opacity-90 hover:opacity-100" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white h-7 w-7 opacity-90 hover:opacity-100" />
              </>
            )}
            
            <button
              onClick={toggleFavorite}
              className="absolute top-3 right-3 z-10 transition-transform duration-200 hover:scale-110"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
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
