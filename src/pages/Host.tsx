
import React from 'react';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import { ArrowRight } from 'lucide-react';

const Host = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <div className="relative h-[70vh] bg-gradient-to-r from-rose-500 to-purple-500">
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center max-w-2xl px-4">
              <h1 className="text-5xl font-bold mb-6">Open your door to hosting</h1>
              <p className="text-xl mb-8">Join us. We'll help you every step of the way.</p>
              <Button 
                className="bg-white text-black hover:bg-gray-100 px-8 py-6 rounded-full text-lg group"
                onClick={() => window.location.href = '/become-host'}
              >
                Let's get started
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">One-to-one guidance</h3>
              <p className="text-gray-600">New hosts get dedicated support from experienced Superhosts.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">Protection for hosts</h3>
              <p className="text-gray-600">$3M damage protection and liability insurance.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">Expert resources</h3>
              <p className="text-gray-600">Tips and tools to help you manage your space.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Host;
