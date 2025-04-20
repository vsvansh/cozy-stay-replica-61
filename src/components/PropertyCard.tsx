
import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card 
      className="overflow-hidden border-none shadow-none hover:cursor-pointer transition-transform duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div className="relative">
          <div className="relative">
            <AspectRatio ratio={1} className="bg-muted">
              <img
                src={images[currentImageIndex]}
                alt={title}
                className={cn(
                  "object-cover w-full h-full rounded-xl transition-all duration-300",
                  isHovered ? "scale-105" : "scale-100"
                )}
              />
            </AspectRatio>
            
            {images.length > 1 && isHovered && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white w-7 h-7 rounded-full flex items-center justify-center shadow-md opacity-90 hover:opacity-100 transition-opacity duration-200"
                  aria-label="Previous image"
                >
                  <span className="font-semibold">&lt;</span>
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white w-7 h-7 rounded-full flex items-center justify-center shadow-md opacity-90 hover:opacity-100 transition-opacity duration-200"
                  aria-label="Next image"
                >
                  <span className="font-semibold">&gt;</span>
                </button>
              </>
            )}
            
            <button
              onClick={toggleFavorite}
              className="absolute top-3 right-3 z-10 transition-transform duration-200 hover:scale-110"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`h-6 w-6 ${isFavorite ? 'fill-airbnb-red text-airbnb-red' : 'text-white stroke-[2]'}`} />
            </button>
          </div>
          
          <div className="mt-3">
            <div className="flex justify-between">
              <h3 className="font-medium text-airbnb-black">{location}</h3>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 fill-current" />
                <span>{rating.toFixed(1)}</span>
              </div>
            </div>
            <p className="text-airbnb-light text-sm">{distance}</p>
            <p className="text-airbnb-light text-sm">{dates}</p>
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
