'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

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

export default function ProfilePage() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log('Profile data:', data);
    // In a real application, this would update the user's profile
    alert('Profile updated successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Your Profile</CardTitle>
          <CardDescription>
            Update your personal information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="Enter your full name"
                {...register('name', { required: true })}
              />
              {errors.name && (
                <p className="text-sm text-red-500">Please enter your name</p>
              )}
            </div>

            {/* WhatsApp Number */}
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number (with international code)</Label>
              <Input 
                id="whatsapp" 
                placeholder="e.g., +65 9123 4567 or +1 555-123-4567"
                {...register('whatsapp', { 
                  required: true,
                  pattern: {
                    value: /^[+]?[\d\s()-]+$/,
                    message: "Please enter a valid phone number with international code (e.g., +65)"
                  }
                })}
              />
              {errors.whatsapp && (
                <p className="text-sm text-red-500">
                  {errors.whatsapp.message?.toString() || "WhatsApp number with international code is required"}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">Save Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
