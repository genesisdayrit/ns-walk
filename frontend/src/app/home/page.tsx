'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Define Walk type
interface Walk {
  id: number;
  title: string;
  user: string;
  dateTime: Date;
  meetupSpot: string;
  participants: string;
  direction: 'marina-to-coworking' | 'coworking-to-marina';
  discussionTopic: string;
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentDate = new Date();
  
  // Filter states
  const [directionFilter, setDirectionFilter] = useState<'all' | 'marina-to-coworking' | 'coworking-to-marina'>('all');
  const [timeFilter, setTimeFilter] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  const [sortOrder, setSortOrder] = useState<'earliest' | 'latest'>('earliest');
  
  // Dropdown toggle states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Create refs for dropdowns
  const dropdownRefs = {
    direction: useState<HTMLDivElement | null>(null),
    time: useState<HTMLDivElement | null>(null),
    sort: useState<HTMLDivElement | null>(null)
  };

  // Mock walk data
  const [walks, setWalks] = useState<Walk[]>([
    {
      id: 1,
      title: "From Marina Hotel to NS Coworking",
      user: "Genesis Dayrit",
      dateTime: new Date(2025, 4, 4, 12, 10), // May 4, 2025, 12:10 pm
      meetupSpot: "NS Cafe",
      participants: "1/5 participants",
      direction: "marina-to-coworking",
      discussionTopic: "Future of education "
    },
    {
      id: 2,
      title: "From NS Coworking to Marina Hotel",
      user: "Genesis Dayrit",
      dateTime: new Date(2025, 4, 4, 16, 30), // May 4, 2025, 4:30 pm
      meetupSpot: "Near Entrance NS-Coworking",
      participants: "1/5 participants",
      direction: "coworking-to-marina",
      discussionTopic: "Tech trends in 2025"
    },
    // Add a past walk for testing the time filter
    {
      id: 3,
      title: "From Marina Hotel to NS Coworking",
      user: "Genesis Dayrit",
      dateTime: new Date(2025, 4, 2, 10, 0), // May 2, 2025, 10:00 am (past relative to May 3)
      meetupSpot: "NS Cafe",
      participants: "3/5 participants",
      direction: "marina-to-coworking",
      discussionTopic: "Travel photography"
    }
  ]);

  // Read login state from localStorage on component mount
  useEffect(() => {
    const storedLoginState = localStorage.getItem('isLoggedIn');
    if (storedLoginState) {
      setIsLoggedIn(storedLoginState === 'true');
    }
  }, []);

  // Handle dropdown toggle
  const toggleDropdown = (dropdown: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event from bubbling up
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only close if a dropdown is open
      if (!openDropdown) return;
      
      // Check if click is outside all dropdown elements
      const clickedOutside = !Object.entries(dropdownRefs).some(([key, [ref]]) => {
        return ref && ref.contains(event.target as Node);
      });
      
      if (clickedOutside) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown, dropdownRefs]);

  // Filter walks based on selected filters
  const getFilteredWalks = () => {
    return walks
      .filter(walk => {
        // Direction filter
        if (directionFilter !== 'all' && walk.direction !== directionFilter) {
          return false;
        }
        
        // Time filter
        if (timeFilter === 'upcoming' && walk.dateTime < currentDate) {
          return false;
        } else if (timeFilter === 'past' && walk.dateTime >= currentDate) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => {
        // Sort order
        if (sortOrder === 'earliest') {
          return a.dateTime.getTime() - b.dateTime.getTime();
        } else {
          return b.dateTime.getTime() - a.dateTime.getTime();
        }
      });
  };

  const filteredWalks = getFilteredWalks();

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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Stats Section */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-6 w-full md:w-64 flex flex-col items-center">
          <h2 className="text-4xl font-bold text-blue-600">58</h2>
          <p className="text-blue-500">Total Walks</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 w-full md:w-64 flex flex-col items-center">
          <h2 className="text-4xl font-bold text-green-600">95</h2>
          <p className="text-green-500">Total Users</p>
        </div>
      </div>

      {/* Join Community Section - Only shown when logged out */}
      {!isLoggedIn && (
        <div className="bg-gray-100 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-700">👥</span>
            <h2 className="text-xl font-bold">Join the NS Walk Community</h2>
          </div>
          <p className="text-gray-600 mb-4">Login to unlock full features and start sharing walks</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Create Walks</h3>
              <p className="text-gray-600">Organize your own walks and set your preferred schedule</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Join Existing Walks</h3>
              <p className="text-gray-600">Find and join walks that match your travel plans</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Manage Your Trips</h3>
              <p className="text-gray-600">Track your walks and communicate with co-walkers</p>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded">
              Login or Register Now
            </button>
          </div>
        </div>
      )}

      {/* Create Walk Button - Only shown when logged in */}
      {isLoggedIn && (
        <div className="w-full flex justify-center mb-8">
          <Link href="/create-walk" className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-md flex items-center gap-2">
            <span>+</span>
            <span>Create New Walk</span>
          </Link>
        </div>
      )}

      {/* Walks Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Walks</h2>
          <div className="flex gap-2">
            <button className="bg-blue-50 text-blue-600 px-4 py-1 rounded-lg font-medium">All Walks</button>
            <button className="text-gray-600 px-4 py-1 rounded-lg font-medium">My Walks</button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {/* Direction Filter */}
          <div 
            className="border rounded-lg p-2 flex justify-between items-center relative"
            ref={(el) => dropdownRefs.direction[1](el)}
          >
            <div 
              className="flex items-center gap-2 w-full justify-between cursor-pointer"
              onClick={(e) => toggleDropdown('direction', e)}
            >
              <div className="flex items-center gap-2">
                <span>🧭</span>
                <span>
                  {directionFilter === 'all' && 'All Walks'}
                  {directionFilter === 'marina-to-coworking' && 'From Marina Hotel to NS-Coworking'}
                  {directionFilter === 'coworking-to-marina' && 'From NS-Coworking to Marina Hotel'}
                </span>
              </div>
              <span>▼</span>
            </div>
            {openDropdown === 'direction' && (
              <div className="absolute top-full left-0 w-full bg-white border rounded-lg mt-1 z-10">
                <div 
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDirectionFilter('all');
                    setOpenDropdown(null);
                  }}
                >
                  All Walks
                </div>
                <div 
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDirectionFilter('marina-to-coworking');
                    setOpenDropdown(null);
                  }}
                >
                  From Marina Hotel to NS-Coworking
                </div>
                <div 
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDirectionFilter('coworking-to-marina');
                    setOpenDropdown(null);
                  }}
                >
                  From NS-Coworking to Marina Hotel
                </div>
              </div>
            )}
          </div>

          {/* Time Filter */}
          <div 
            className="border rounded-lg p-2 flex justify-between items-center relative"
            ref={(el) => dropdownRefs.time[1](el)}
          >
            <div 
              className="flex items-center gap-2 w-full justify-between cursor-pointer"
              onClick={(e) => toggleDropdown('time', e)}
            >
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>
                  {timeFilter === 'upcoming' && 'Upcoming Walks'}
                  {timeFilter === 'past' && 'Past Walks'}
                  {timeFilter === 'all' && 'All Walks'}
                </span>
              </div>
              <span>▼</span>
            </div>
            {openDropdown === 'time' && (
              <div className="absolute top-full left-0 w-full bg-white border rounded-lg mt-1 z-10">
                <div 
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTimeFilter('upcoming');
                    setOpenDropdown(null);
                  }}
                >
                  Upcoming Walks
                </div>
                <div 
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTimeFilter('past');
                    setOpenDropdown(null);
                  }}
                >
                  Past Walks
                </div>
                <div 
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTimeFilter('all');
                    setOpenDropdown(null);
                  }}
                >
                  All Walks
                </div>
              </div>
            )}
          </div>

          {/* Sort Filter */}
          <div 
            className="border rounded-lg p-2 flex justify-between items-center relative"
            ref={(el) => dropdownRefs.sort[1](el)}
          >
            <div 
              className="flex items-center gap-2 w-full justify-between cursor-pointer"
              onClick={(e) => toggleDropdown('sort', e)}
            >
              <div className="flex items-center gap-2">
                <span>⏱️</span>
                <span>
                  {sortOrder === 'earliest' && 'Earliest First'}
                  {sortOrder === 'latest' && 'Latest First'}
                </span>
              </div>
              <span>▼</span>
            </div>
            {openDropdown === 'sort' && (
              <div className="absolute top-full left-0 w-full bg-white border rounded-lg mt-1 z-10">
                <div 
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSortOrder('earliest');
                    setOpenDropdown(null);
                  }}
                >
                  Earliest First
                </div>
                <div 
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSortOrder('latest');
                    setOpenDropdown(null);
                  }}
                >
                  Latest First
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Walk Cards */}
        <div className="space-y-4">
          {filteredWalks.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No walks match your filters</p>
          ) : (
            filteredWalks.map(walk => (
              <div key={walk.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span>🚶</span>
                      <div>
                        <h3 className="font-medium">{walk.title}</h3>
                        <p className="text-sm text-gray-600">👤 {walk.user}</p>
                      </div>
                    </div>
                    <div className="space-y-1 ml-6">
                      <p className="text-sm flex items-center gap-2">
                        <span>📅</span> {formatDate(walk.dateTime)}
                      </p>
                      <p className="text-sm flex items-center gap-2">
                        <span>📍</span> Meetup Spot: {walk.meetupSpot}
                      </p>
                      <p className="text-sm flex items-center gap-2">
                        <span>👥</span> {walk.participants}
                      </p>
                      <p className="text-sm flex items-center gap-2">
                        <span>💬</span> Discussion: {walk.discussionTopic}
                      </p>
                    </div>
                  </div>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg">
                    Join
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
