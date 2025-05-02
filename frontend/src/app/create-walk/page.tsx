'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { format } from 'date-fns';

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

export default function CreateWalkPage() {
  const [direction, setDirection] = useState('singapore-to-forest-city');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log('Form data submitted:', data);
    // Here you would normally send the data to a server
    alert('Walk created successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create a New Walk</CardTitle>
          <CardDescription>
            Enter your pickup location in Singapore and the number of participants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Direction */}
            <div className="space-y-2">
              <Label htmlFor="direction">Direction</Label>
              <RadioGroup 
                defaultValue="singapore-to-forest-city" 
                value={direction} 
                onValueChange={setDirection}
                className="grid grid-cols-2 gap-4"
              >
                <div className={`flex items-center justify-center rounded-md border p-4 cursor-pointer ${direction === 'singapore-to-forest-city' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
                  <RadioGroupItem 
                    value="singapore-to-forest-city" 
                    id="singapore-to-forest-city"
                    className="sr-only" 
                  />
                  <Label 
                    htmlFor="singapore-to-forest-city" 
                    className="cursor-pointer text-center font-medium"
                  >
                    Singapore to Forest City
                  </Label>
                </div>
                <div className={`flex items-center justify-center rounded-md border p-4 cursor-pointer ${direction === 'forest-city-to-singapore' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
                  <RadioGroupItem 
                    value="forest-city-to-singapore" 
                    id="forest-city-to-singapore"
                    className="sr-only" 
                  />
                  <Label 
                    htmlFor="forest-city-to-singapore" 
                    className="cursor-pointer text-center font-medium"
                  >
                    Forest City to Singapore
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Maximum Total Participants */}
            <div className="space-y-2">
              <Label htmlFor="maxParticipants">Maximum Total Participants</Label>
              <Input 
                id="maxParticipants" 
                type="number" 
                defaultValue="5" 
                min="1" 
                max="20"
                {...register('maxParticipants', { required: true, min: 1, max: 20 })}
              />
              {errors.maxParticipants && (
                <p className="text-sm text-red-500">Please enter a valid number between 1 and 20</p>
              )}
            </div>

            {/* Date and Time */}
            <div className="space-y-2">
              <Label htmlFor="dateTime">Date and Time</Label>
              <Input 
                id="dateTime" 
                type="datetime-local" 
                defaultValue={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                {...register('dateTime', { required: true })}
              />
              {errors.dateTime && (
                <p className="text-sm text-red-500">Please select a valid date and time</p>
              )}
            </div>

            {/* Locations */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Locations</h3>
            </div>

            {/* Number of Participants at Your Location */}
            <div className="space-y-2">
              <Label htmlFor="participantsAtLocation">Number of Participants at Your Location</Label>
              <Input 
                id="participantsAtLocation" 
                type="number" 
                defaultValue="1" 
                min="1"
                {...register('participantsAtLocation', { required: true, min: 1 })}
              />
              {errors.participantsAtLocation && (
                <p className="text-sm text-red-500">Please enter a valid number of participants</p>
              )}
            </div>

            {/* Your Pickup Location */}
            <div className="space-y-2">
              <Label htmlFor="pickupLocation">Your Pickup Location in Singapore</Label>
              <Input 
                id="pickupLocation" 
                placeholder="e.g., Pasir Ris MRT" 
                {...register('pickupLocation', { required: true })}
              />
              {errors.pickupLocation && (
                <p className="text-sm text-red-500">Please enter your pickup location</p>
              )}
            </div>

            {/* Location Details */}
            <div className="space-y-2">
              <Label htmlFor="locationDetails">Location Details (Optional)</Label>
              <Textarea 
                id="locationDetails" 
                placeholder="You can enter multiple lines of text for detailed location instructions"
                className="min-h-[100px]"
                {...register('locationDetails')}
              />
              <p className="text-sm text-gray-500">You can enter multiple lines of text for detailed location instructions</p>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">Create Walk</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
