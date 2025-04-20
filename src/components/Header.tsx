
import React, { useState, useEffect } from 'react';
import { Search, User, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { toast } from "sonner";

const Header = () => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = () => {
    setSearchActive(!searchActive);
    toast("Search activated", {
      description: "Search functionality would open here",
      duration: 3000,
    });
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast("Home", {
      description: "Navigated to homepage",
      duration: 2000,
    });
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      isScrolled ? 'bg-white shadow-md py-3' : 'bg-white py-4'
    )}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center group" onClick={handleLogoClick}>
              <svg className="h-8 w-8 text-airbnb-red transition-transform duration-300 group-hover:scale-110" viewBox="0 0 1000 1000" fill="currentColor">
                <path d="M499.3 736.7c-51-64-81-120.1-91-168.1-10-39-6-70 11-93 18-27 45-40 80-40s62 13 80 40c17 23 21 54 11 93-11 49-40 104-91 168.1zm362.2 43c-7 47-39 86-83 105-85 37-169.1-22-241.1-102 119.1-149.1 141.1-265.1 90-340.2-30-43-73-64-128.1-64-111 0-172.1 94-148.1 203.1 14 59 51 126.1 110 201.1-37 41-72 70-103 88-24 13-47 21-69 23-101 15-180.1-83-144.1-184.1 5-13 15-37 32-74l1-2c55-120.1 122.1-256.1 199.1-407.2l2-5 22-42c17-31 24-45 51-62 13-8 29-12 47-12 36 0 64 21 76 38 6 9 13 21 22 36l21 41 3 6c77 151.1 144.1 287.1 199.1 407.2l1 1 20 46 12 29c9.2 23.1 11.2 46.1 8.2 70.1zm46-90.1c-7-22-19-48-34-79v-1c-71-151.1-137.1-287.1-200.1-409.2l-4-6c-45-92-77-147.1-157.1-147.1-30 0-58 9-83 26-25 17-43 40-54 72-18 48-44 92-71 137l-1 1v2c-20 36-32 64-40 85l-1 3c-18 50-24 89-23 125 1 42 16 76 42 98 7 6 33 25 78 25l1 1c32 1 61-9 84-24 30-19 51-45 64-77 1-2 2-3 2-5 16-52 37-125.1 97-196.1l1-2c12 16 27 40 45 76 35 68 69 164.1 91 229.1 3 9 11 15 21 15 8 0 14-3 19-7 14-13 23-34 27-60 1-7 4-24-2-48z"/>
              </svg>
              <span className="ml-2 text-airbnb-red font-bold text-2xl hidden sm:inline">airbnb</span>
            </a>
          </div>

          {/* Search bar */}
          <div 
            className={cn(
              "hidden md:flex items-center justify-center flex-grow mx-6",
              searchActive ? "scale-105" : ""
            )}
          >
            <div 
              className="flex items-center border rounded-full shadow-sm px-4 py-2 hover:shadow-md transition-all duration-300 cursor-pointer"
              onClick={handleSearch}
            >
              <div className="border-r pr-3">
                <span className="font-medium">Anywhere</span>
              </div>
              <div className="border-r px-3">
                <span className="font-medium">Any week</span>
              </div>
              <div className="px-3">
                <span className="text-gray-500">Add guests</span>
              </div>
              <Button className="rounded-full p-2 bg-airbnb-red hover:bg-airbnb-red/90 ml-3 transition-colors duration-300">
                <Search className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>

          {/* Mobile search button */}
          {isMobile && (
            <div 
              className="flex items-center border rounded-full shadow-sm p-2 ml-2 hover:shadow-md transition-shadow duration-300"
              onClick={handleSearch}
            >
              <Search className="h-5 w-5 text-gray-500" />
              <div className="ml-2">
                <div className="text-sm font-medium">Anywhere</div>
                <div className="text-xs text-gray-500">Any week · Add guests</div>
              </div>
            </div>
          )}

          {/* Right nav */}
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className="hidden md:block rounded-full px-4 py-2 hover:bg-gray-100 font-medium text-sm transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                toast("Host your home", {
                  description: "Open hosting flow",
                  duration: 2000,
                });
              }}
            >
              Airbnb your home
            </a>
            
            <button 
              className="rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => {
                toast("Language and currency", {
                  description: "Change your preferences",
                  duration: 2000,
                });
              }}
            >
              <Globe className="h-5 w-5" />
            </button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="rounded-full border flex items-center gap-2 p-2 md:p-3 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-700" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0 animate-in fade-in-80 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:zoom-out-95" align="end">
                <div className="py-2">
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      toast("Sign up", {
                        description: "Create a new account",
                        duration: 2000,
                      });
                    }}
                  >
                    Sign up
                  </a>
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      toast("Log in", {
                        description: "Access your account",
                        duration: 2000,
                      });
                    }}
                  >
                    Log in
                  </a>
                  <hr className="my-1" />
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      toast("Host your home", {
                        description: "Start earning as a host",
                        duration: 2000,
                      });
                    }}
                  >
                    Airbnb your home
                  </a>
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      toast("Help Center", {
                        description: "Get support",
                        duration: 2000,
                      });
                    }}
                  >
                    Help Center
                  </a>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
