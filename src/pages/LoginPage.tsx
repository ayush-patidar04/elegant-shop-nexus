
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/sonner';

const LoginPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Login functionality would connect to backend API");
  };
  
  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-heading font-bold text-shop-gray-900 mb-6 text-center">
            Login to Your Account
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Your email" required />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/forgot-password"
                  className="text-sm text-shop-blue hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="Your password" required />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-shop-gray-800">
                Don't have an account?{' '}
                <Link to="/register" className="text-shop-blue hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
