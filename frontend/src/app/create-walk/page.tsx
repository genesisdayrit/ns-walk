'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function CreateWalkPage() {
  const [direction, setDirection] = useState('marina-to-coworking');
  const [meetupSpot, setMeetupSpot] = useState(direction === 'marina-to-coworking' ? 'ns-cafe' : 'ns-coworking-entrance');
  const [showCustomMeetupInput, setShowCustomMeetupInput] = useState(false);
  const [timeFlexibility, setTimeFlexibility] = useState('on-time');
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  // Update the meetup spot when direction changes
  useEffect(() => {
    if (direction === 'marina-to-coworking') {
      setMeetupSpot('ns-cafe');
    } else {
      setMeetupSpot('ns-coworking-entrance');
    }
    setShowCustomMeetupInput(false);
  }, [direction]);

  // Handle meetup spot change
  const handleMeetupSpotChange = (value: string) => {
    setMeetupSpot(value);
    setShowCustomMeetupInput(value === 'custom');
    if (value !== 'custom') {
      setValue('customMeetupSpot', '');
    }
  };

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
            Set up a walk and choose your meetup location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Direction */}
            <div className="space-y-2">
              <Label htmlFor="direction">Direction</Label>
              <RadioGroup 
                defaultValue="marina-to-coworking" 
                value={direction} 
                onValueChange={setDirection}
                className="grid grid-cols-1 gap-4"
                id="direction"
              >
                <Label
                  className={`flex items-center justify-center rounded-md border p-4 cursor-pointer ${direction === 'marina-to-coworking' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
                  htmlFor="marina-to-coworking"
                >
                  <RadioGroupItem 
                    value="marina-to-coworking" 
                    id="marina-to-coworking"
                    className="sr-only" 
                  />
                  <span className="text-center font-medium">
                    From Marina Hotel to NS Coworking
                  </span>
                </Label>
                
                <Label
                  className={`flex items-center justify-center rounded-md border p-4 cursor-pointer ${direction === 'coworking-to-marina' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
                  htmlFor="coworking-to-marina"
                >
                  <RadioGroupItem 
                    value="coworking-to-marina" 
                    id="coworking-to-marina"
                    className="sr-only" 
                  />
                  <span className="text-center font-medium">
                    From NS Coworking to Marina Hotel
                  </span>
                </Label>
              </RadioGroup>
            </div>

            {/* Leaving Time */}
            <div className="space-y-2">
              <Label htmlFor="dateTime">Leaving Time</Label>
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

            {/* Time Flexibility */}
            <div className="space-y-2">
              <Label>Time Flexibility</Label>
              <RadioGroup 
                defaultValue="on-time" 
                value={timeFlexibility} 
                onValueChange={setTimeFlexibility}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="on-time" id="on-time" />
                  <Label htmlFor="on-time" className="cursor-pointer">On-Time</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="flexible" id="flexible" />
                  <Label htmlFor="flexible" className="cursor-pointer">Flexible</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Meetup Location */}
            <div className="space-y-2">
              <Label htmlFor="meetupSpot">Meetup Location</Label>
              <Select 
                value={meetupSpot} 
                onValueChange={handleMeetupSpotChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a meetup location" />
                </SelectTrigger>
                <SelectContent>
                  {direction === 'marina-to-coworking' ? (
                    <>
                      <SelectItem value="ns-cafe">NS Cafe</SelectItem>
                      <SelectItem value="custom">Setup Custom Meetup Spot</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="ns-coworking-entrance">Near Entrance NS-Coworking</SelectItem>
                      <SelectItem value="custom">Setup Custom Meetup Spot</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Custom Meetup Spot (conditional) */}
            {showCustomMeetupInput && (
              <div className="space-y-2">
                <Label htmlFor="customMeetupSpot">Custom Meetup Spot</Label>
                <Input
                  id="customMeetupSpot"
                  placeholder="Enter your custom meetup location"
                  {...register('customMeetupSpot', { 
                    required: meetupSpot === 'custom' 
                  })}
                />
                {errors.customMeetupSpot && (
                  <p className="text-sm text-red-500">Please enter your custom meetup location</p>
                )}
              </div>
            )}

            {/* Discussion Topic */}
            <div className="space-y-2">
              <Label htmlFor="discussionTopic">Discussion Topic (Optional)</Label>
              <Textarea 
                id="discussionTopic" 
                placeholder="What would you like to discuss during the walk?"
                className="min-h-[120px]"
                {...register('discussionTopic')}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">Create Walk</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
