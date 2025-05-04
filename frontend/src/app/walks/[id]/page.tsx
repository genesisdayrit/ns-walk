'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Card, 
  CardContent, 
  CardHeader 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WalkDetail {
  id: string;
  title: string;
  dateTime: Date;
  organizer: string;
  basePrice: number;
  totalCost: number;
  perPersonCost: number;
  spots: number;
  takenSpots: number;
  status: 'Open' | 'Closed' | 'Completed';
  dropoffLocation: string;
}

export default function WalkDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [passengerCount, setPassengerCount] = useState<number>(1);
  const [dropoffLocation, setDropoffLocation] = useState<string>('');

  // Mock data - this would come from an API call in a real application
  const walkDetail: WalkDetail = {
    id: id as string,
    title: 'Forest City to Singapore',
    dateTime: new Date(2025, 4, 6, 10, 53),
    organizer: 'Danny',
    basePrice: 80,
    totalCost: 80,
    perPersonCost: 20,
    spots: 4,
    takenSpots: 1,
    status: 'Open',
    dropoffLocation: '1 Cluny Rd'
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleJoinRide = () => {
    // This will be implemented later
    console.log('Joining ride with dropoff location:', dropoffLocation);
    console.log('Number of passengers:', passengerCount);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link href="/home" className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </Link>
          <h1 className="text-2xl font-bold">{walkDetail.title}</h1>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16 6 12 2 8 6"></polyline>
            <line x1="12" y1="2" x2="12" y2="15"></line>
          </svg>
          Share
        </Button>
      </div>
      
      <p className="text-gray-600 mb-4">{formatDate(walkDetail.dateTime)}</p>
      
      <div className="flex gap-2 mb-6">
        <span className={`px-3 py-1 rounded-full text-sm ${walkDetail.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {walkDetail.status}
        </span>
        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          {walkDetail.takenSpots}/{walkDetail.spots} passengers
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <h2 className="text-xl font-semibold">Details</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <div>
                  <p className="font-medium">Date & Time</p>
                  <p className="text-gray-600">{formatDate(walkDetail.dateTime)}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div>
                  <p className="font-medium">Dropoff Locations</p>
                  <p className="text-gray-600">{walkDetail.dropoffLocation}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <path d="M12 2v20"></path>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <div>
                  <p className="font-medium">Cost</p>
                  <div className="space-y-1 text-gray-600">
                    <p>Base Cost: ${walkDetail.basePrice.toFixed(2)} SGD</p>
                    <p>Total Cost: ${walkDetail.totalCost.toFixed(2)} SGD</p>
                    <p className="text-green-600">Per Person (if full): ${walkDetail.perPersonCost.toFixed(2)} SGD</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <h2 className="text-xl font-semibold">Ride Organizer</h2>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold">
                {walkDetail.organizer.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{walkDetail.organizer}</p>
                <p className="text-gray-600">Organizer</p>
              </div>
              <Button variant="ghost" className="ml-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8 bg-green-50 border-green-100">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Join This Ride</h2>
          <p className="text-gray-600 mb-6">Specify where in Singapore we should drop you off. {walkDetail.spots - walkDetail.takenSpots} spots left.</p>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Passengers
              </label>
              <Input 
                id="passengers"
                type="number" 
                min="1" 
                max={walkDetail.spots - walkDetail.takenSpots}
                value={passengerCount}
                onChange={(e) => setPassengerCount(Number(e.target.value))}
                className="bg-white"
              />
              <p className="text-sm text-gray-500 mt-1">Maximum {walkDetail.spots - walkDetail.takenSpots} passengers allowed</p>
            </div>
            
            <div>
              <label htmlFor="dropoff" className="block text-sm font-medium text-gray-700 mb-1">
                Drop-off Location
              </label>
              <Input 
                id="dropoff"
                type="text" 
                placeholder="Where should we drop you off in Singapore?" 
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                className="bg-white"
              />
            </div>
            
            <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white" onClick={handleJoinRide}>
              Join Ride
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 