export default function Home() {
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

      {/* Join Community Section */}
      <div className="bg-gray-100 rounded-lg p-6 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-gray-700">👥</span>
          <h2 className="text-xl font-bold">Join WalkShare Community</h2>
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
          <div className="border rounded-lg p-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>🧭</span>
              <span>All Directions</span>
            </div>
            <span>▼</span>
          </div>
          <div className="border rounded-lg p-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>Upcoming Walks</span>
            </div>
            <span>▼</span>
          </div>
          <div className="border rounded-lg p-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>⏱️</span>
              <span>Earliest First</span>
            </div>
            <span>▼</span>
          </div>
        </div>

        {/* Walk Cards */}
        <div className="space-y-4">
          {/* Walk Card 1 */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span>🚶</span>
                  <div>
                    <h3 className="font-medium">Singapore to Forest City</h3>
                    <p className="text-sm text-gray-600">👤 Bruno at SlingshotVPN</p>
                  </div>
                </div>
                <div className="space-y-1 ml-6">
                  <p className="text-sm flex items-center gap-2">
                    <span>📅</span> Sun, 4 May 2025, 12:10 pm
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <span>📍</span> From: Forest City
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <span>👥</span> 1/5 participants
                  </p>
                </div>
              </div>
              <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg">
                Join
              </button>
            </div>
          </div>

          {/* Walk Card 2 */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span>🚶</span>
                  <div>
                    <h3 className="font-medium">Singapore to Forest City</h3>
                    <p className="text-sm text-gray-600">👤 Bruno at SlingshotVPN</p>
                  </div>
                </div>
                <div className="space-y-1 ml-6">
                  <p className="text-sm flex items-center gap-2">
                    <span>📅</span> Sun, 4 May 2025, 4:30 pm
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <span>📍</span> From: City Hall
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <span>👥</span> 1/5 participants
                  </p>
                </div>
              </div>
              <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
