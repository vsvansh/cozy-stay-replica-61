
import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export interface PropertyProps {
  id: number;
  title: string;
  location: string;
  distance: string;
  dates: string;
  price: number;
  rating: number;
  images: string[];
}

const PropertyCard: React.FC<PropertyProps> = ({
  id,
  title,
  location,
  distance,
  dates,
  price,
  rating,
  images
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast(isFavorite ? "Removed from favorites" : "Added to favorites", {
      description: location,
      duration: 3000,
    });
  };

  return (
    <Card 
      className="overflow-hidden border-none shadow-none hover:cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => toast(`Selected: ${title}`, { description: location })}
    >
      <CardContent className="p-0">
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent className="rounded-xl overflow-hidden">
              {images.map((image, index) => (
                <CarouselItem key={`${id}-image-${index}`}>
                  <div className="aspect-square relative">
                    <img
                      src={image}
                      alt={`${title} - ${index + 1}`}
                      className="object-cover w-full h-full transition-all duration-300"
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
            <div className="flex justify-between">
              <h3 className="font-medium text-black">{location}</h3>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 fill-current" />
                <span>{rating.toFixed(1)}</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm">{distance}</p>
            <p className="text-gray-500 text-sm">{dates}</p>
            <p className="mt-1">
              <span className="font-semibold">${price}</span> night
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
