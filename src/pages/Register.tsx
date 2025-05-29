
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RegisterProps {
  onNavigate: () => void;
}

const Register: React.FC<RegisterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    onNavigate();
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1489599328615-c7abdf8aa5bd?w=1920&h=1080&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="bg-black/75 p-16 rounded-md w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-red-600 mb-2">WatchParty</h1>
          <h2 className="text-2xl font-semibold text-white mb-8">Sign Up</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-white text-sm">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white mt-1 h-12"
              placeholder="Email address"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-white text-sm">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white mt-1 h-12"
              placeholder="Password"
              required
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-white text-sm">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white mt-1 h-12"
              placeholder="Confirm Password"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-base font-semibold"
          >
            Sign Up
          </Button>
        </form>

        <div className="mt-8 text-gray-400 text-sm">
          <p>
            Already have an account?{' '}
            <button 
              onClick={onNavigate}
              className="text-white hover:underline"
            >
              Sign in now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
