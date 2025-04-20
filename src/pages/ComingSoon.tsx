
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

interface ComingSoonProps {
  title?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title: propTitle }) => {
  const location = useLocation();
  const [title, setTitle] = useState(propTitle || 'Feature');
  
  useEffect(() => {
    // Extract title from query params if available
    const searchParams = new URLSearchParams(location.search);
    const queryTitle = searchParams.get('title');
    if (queryTitle) {
      setTitle(queryTitle);
    }
  }, [location, propTitle]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center px-4 py-16">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-gray-600 mb-8">This feature is coming soon!</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
