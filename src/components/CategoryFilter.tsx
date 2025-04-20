
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type Category = {
  id: number;
  name: string;
  icon: string;
};

const categories: Category[] = [
  { id: 1, name: 'Amazing views', icon: '🏞️' },
  { id: 2, name: 'Beach', icon: '🏖️' },
  { id: 3, name: 'Cabins', icon: '🏡' },
  { id: 4, name: 'Trending', icon: '🔥' },
  { id: 5, name: 'Lakefront', icon: '⛰️' },
  { id: 6, name: 'Ski-in/out', icon: '🎿' },
  { id: 7, name: 'Mansions', icon: '🏘️' },
  { id: 8, name: 'Pools', icon: '🏊' },
  { id: 9, name: 'Islands', icon: '🏝️' },
  { id: 10, name: 'Tropical', icon: '🌴' },
  { id: 11, name: 'Countryside', icon: '🌾' },
  { id: 12, name: 'Historical homes', icon: '🏛️' },
  { id: 13, name: 'Design', icon: '🎨' },
  { id: 14, name: 'Tiny homes', icon: '🏠' },
  { id: 15, name: 'Grand pianos', icon: '🎹' },
  { id: 16, name: 'Amazing pools', icon: '💦' },
  { id: 17, name: 'Castles', icon: '🏰' },
  { id: 18, name: 'OMG!', icon: '😲' },
];

const CategoryFilter: React.FC = () => {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <div className="sticky top-[72px] z-40 bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 md:px-8 py-4">
        <ScrollArea className="w-full whitespace-nowrap pb-3">
          <div className="flex gap-8 pb-1">
            {categories.map((category) => (
              <div 
                key={category.id}
                className={cn(
                  "flex flex-col items-center cursor-pointer pb-2 transition-all duration-200 text-sm min-w-[56px] hover:opacity-100",
                  activeCategory === category.id 
                    ? "text-black border-b-2 border-black" 
                    : "text-gray-500 hover:text-black hover:border-b-2 hover:border-gray-300 opacity-85"
                )}
                onClick={() => setActiveCategory(category.id === activeCategory ? null : category.id)}
              >
                <div className={cn(
                  "text-2xl mb-1 transition-transform duration-200",
                  activeCategory === category.id ? "scale-110" : ""
                )}>
                  {category.icon}
                </div>
                <span className="text-xs">{category.name}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CategoryFilter;
