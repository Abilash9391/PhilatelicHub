import React from "react";

const Education = () => {
  return (
    <div className="container mx-auto py-10 px-5">
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Philatelic Education
      </h2>
      <p className="text-lg text-center mb-8 text-gray-700">
        Explore the fascinating world of stamp collecting, history, and valuation.
      </p>

      {/* Educational Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Card 1: Stamp History */}
        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Stamp History & Evolution
          </h3>
          <p className="text-gray-600 mb-4">
            Learn about the origins of postage stamps and how they have evolved over time.
          </p>
          <a
            href="https://www.stampworld.com/en/stamp-history/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition duration-300"
          >
            Read More
          </a>
        </div>

        {/* Card 2: Collecting Tips */}
        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Stamp Collecting Tips
          </h3>
          <p className="text-gray-600 mb-4">
            Discover expert advice on starting and maintaining a valuable collection.
          </p>
          <a
            href="https://www.stampcollecting101.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition duration-300"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Featured Video Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Featured Video
        </h3>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <iframe
              className="w-full h-64 md:h-80 rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/Wz2XDxNwQFQ"
              title="Stamp Collecting 101"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Additional Resources Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Additional Resources
        </h3>
        <ul className="list-disc list-inside text-center text-gray-700 space-y-2">
          <li>
            <a
              href="https://postalmuseum.si.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Smithsonian National Postal Museum
            </a>
          </li>
          <li>
            <a
              href="https://www.collectorsclub.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              American Stamp Collectors Club
            </a>
          </li>
          <li>
            <a
              href="https://www.stampworld.com/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Stamp World
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Education;
