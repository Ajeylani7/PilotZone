import React, { useEffect, useState } from "react"; // Import necessary React hooks
import { Card, Skeleton, Tabs, Tab } from "@nextui-org/react"; // Import components from NextUI for UI elements
import axios from "axios"; // Import axios for making API requests

// Function to fetch airline data from the API
const fetchAirlineData = async (airline_code) => {
  try {
    // Make a GET request to the API
    const response = await axios.get(
      `https://api.adsbdb.com/v0/airline/${airline_code}`
    );
    return response.data.response[0]; // Return the first item in the response array
  } catch (error) {
    console.error("Error fetching airline data:", error);
    return null; // Return null if there's an error
  }
};

// Array of airline codes to fetch data for
const airlineCodes = [
  "AAL",
  "DAL",
  "UAL",
  "SWA",
  "JBU",
  "ASA",
  "FFT",
  "NKS",
  "QTR",
  "BAW",
  "KLM",
  "AFR",
  "QFA",
  "VIR",
  "ANZ",
  "SIA",
  "ANA",
  "CPA",
  "EVA",
  "THA",
  "JAL",
  "KAL",
  "MAS",
  "PAL",
  "AAR",
  "CXA",
  "CSN",
  "CEB",
  "SLK",
  "VJC",
  "EMR",
  "EMD",
];

export default function Hero() {
  // State to hold the fetched airline data
  const [airlineData, setAirlineData] = useState(Array(32).fill(null));
  // State to manage loading state
  const [loading, setLoading] = useState(true);
  // State to manage the selected tab
  const [selectedTab, setSelectedTab] = useState("all");

  useEffect(() => {
    // Function to fetch airlines data
    const fetchAirlines = async () => {
      // Check if data is in localStorage
      const cachedData = JSON.parse(localStorage.getItem("airlineData"));
      if (cachedData && cachedData.length > 0) {
        // If cached data exists, use it
        setAirlineData(cachedData);
        setLoading(false);
        return;
      }

      // Fetch data for all airline codes concurrently
      const data = await Promise.all(
        airlineCodes.slice(0, 32).map((code) => fetchAirlineData(code))
      );

      // Update state with the fetched data
      setAirlineData((prevData) =>
        data.map((item, index) => (item !== null ? item : prevData[index]))
      );

      // Save fetched data to localStorage
      localStorage.setItem("airlineData", JSON.stringify(data));
      setLoading(false);
    };

    fetchAirlines();

    // Set up an interval to refetch the data every 10 seconds
    const intervalId = setInterval(fetchAirlines, 10000);
    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Function to filter airlines based on the selected tab
  const filterAirlines = () => {
    if (selectedTab === "all") {
      return airlineData;
    } else if (selectedTab === "us") {
      return airlineData.filter(
        (airline) => airline && airline.country === "United States"
      );
    } else {
      return airlineData.filter(
        (airline) => airline && airline.country !== "United States"
      );
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-6 bg-gray-100 min-h-screen mt-4 mb-4 rounded-lg">
      <div className="flex w-full justify-between items-center mb-6 p-4 border-b-2 border-gray-300">
        <h2 className="text-3xl font-bold text-gray-700">
          Airlines Information
        </h2>
        <Tabs
          aria-label="Airline Options"
          selectedKey={selectedTab}
          onSelectionChange={setSelectedTab}
        >
          <Tab key="all" title="All"></Tab>
          <Tab key="us" title="American"></Tab>
          <Tab key="foreign" title="Foreign"></Tab>
        </Tabs>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {filterAirlines().map((airline, index) => (
          <Card
            key={index}
            className="p-6 relative h-72 w-full card"
            radius="lg"
            style={{
              backgroundImage: `url(/gallery/${
                index % 2 === 0 ? "a1" : "a2"
              }.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
            <div className="relative z-10 text-white space-y-3 flex flex-col justify-between h-full">
              {loading || !airline ? (
                <>
                  <Skeleton className="w-full h-8 rounded-lg" />
                  <Skeleton className="w-3/4 h-6 rounded-lg" />
                  <Skeleton className="w-1/2 h-6 rounded-lg" />
                  <Skeleton className="w-24 h-8 mt-auto rounded-lg" />
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold">{airline.name || "N/A"}</h3>
                  <p>ICAO: {airline.icao || "N/A"}</p>
                  <p>Country: {airline.country || "N/A"}</p>
                  <p>Callsign: {airline.callsign || "N/A"}</p>
                  <a
                    href={`https://www.google.com/search?q=${airline.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mt-auto text-center"
                  >
                    Get tickets now
                  </a>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
