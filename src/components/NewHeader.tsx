
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, UserCircle, Globe, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import FeaturesMenu from './FeaturesMenu';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NewHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = [
    'sticky top-0 z-50 transition-all duration-300 w-full',
    scrolled ? 'bg-white shadow-sm' : 'bg-white md:bg-transparent',
  ].join(' ');

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1200px-Airbnb_Logo_B%C3%A9lo.svg.png" 
                alt="Airbnb" 
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Search Bar */}
          <div className={`hidden md:flex items-center justify-center ${isSearchFocused ? 'flex-grow' : ''}`}>
            <div className={`
              flex items-center border-2 rounded-full py-2 px-4 shadow-sm transition-all
              ${isSearchFocused ? 'border-gray-400 bg-white' : 'border-gray-200 bg-white'} 
            `}>
              <Input 
                type="text" 
                placeholder="Search destinations"
                className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <Button variant="default" size="icon" className="bg-rose-600 ml-2 rounded-full hover:bg-rose-500">
                <Search className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <FeaturesMenu />
            
            <Link to="/host">
              <Button variant="ghost" className="text-sm font-medium">
                Become a Host
              </Button>
            </Link>
            
            <Button variant="ghost" size="icon" className="rounded-full">
              <Globe className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full p-2 border border-gray-300 flex items-center gap-2">
                  <Menu className="h-4 w-4" />
                  <UserCircle className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate('/login')}>
                    Login
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/signup')}>
                    Sign up
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/host')}>
                    Airbnb your home
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/help')}>
                    Help
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NewHeader;
