
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from '@/components/Header';
import { toast } from "sonner";

const Login = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Login functionality coming soon!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Log in to Airbnb</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                className="w-full p-4 rounded-lg border"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                className="w-full p-4 rounded-lg border"
              />
            </div>
            <Button type="submit" className="w-full bg-airbnb-red hover:bg-airbnb-red/90 text-white p-4 rounded-lg">
              Continue
            </Button>
          </form>
          
          <div className="mt-6">
            <p className="text-center text-gray-600">Don't have an account?</p>
            <Button 
              variant="outline" 
              className="w-full mt-2"
              onClick={() => window.location.href = '/signup'}
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
