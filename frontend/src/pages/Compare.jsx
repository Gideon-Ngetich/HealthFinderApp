import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Input } from "antd";

const CompareFacilities = () => {
  const [facilities, setFacilities] = useState([]); // All facilities for search
  const [searchTerm1, setSearchTerm1] = useState(""); // Search term for facility 1
  const [searchTerm2, setSearchTerm2] = useState(""); // Search term for facility 2
  const [selectedFacility1, setSelectedFacility1] = useState(null); // Selected facility 1
  const [selectedFacility2, setSelectedFacility2] = useState(null); // Selected facility 2
  const [filteredFacilities1, setFilteredFacilities1] = useState([]); // Filtered facilities for search 1
  const [filteredFacilities2, setFilteredFacilities2] = useState([]); // Filtered facilities for search 2

  // Fetch all facilities on component mount
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DEV_ENDPOINT}/api/getfacilities`
        );
        if (response.status === 200) {
          setFacilities(response.data);
        }
      } catch (err) {
        console.error("Error fetching facilities:", err);
      }
    };

    fetchFacilities();
  }, []);

  // Handle search for facility 1
  useEffect(() => {
    if (searchTerm1) {
      const results = facilities.filter((facility) =>
        facility.facilityName.toLowerCase().includes(searchTerm1.toLowerCase())
      );
      setFilteredFacilities1(results);
    } else {
      setFilteredFacilities1([]);
    }
  }, [searchTerm1, facilities]);

  // Handle search for facility 2
  useEffect(() => {
    if (searchTerm2) {
      const results = facilities.filter((facility) =>
        facility.facilityName.toLowerCase().includes(searchTerm2.toLowerCase())
      );
      setFilteredFacilities2(results);
    } else {
      setFilteredFacilities2([]);
    }
  }, [searchTerm2, facilities]);

  // Handle facility selection
  const handleSelectFacility = (facility, setSelectedFacility, setSearchTerm, setFilteredFacilities) => {
    setSelectedFacility(facility);
    setSearchTerm(facility.facilityName);
    setFilteredFacilities([]);
  };

  return (
    <div>
      <Navbar />
      <div className="p-10">
        <h1 className="text-3xl font-bold text-center mb-10">Compare Facilities</h1>

        {/* Search and Select Facilities */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          {/* Facility 1 Search */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Select First Facility</h2>
            <Input
              type="text"
              placeholder="Search for a facility..."
              value={searchTerm1}
              onChange={(e) => setSearchTerm1(e.target.value)}
              className="w-full"
            />
            <ul className="mt-2 border rounded-lg max-h-40 overflow-y-auto">
              {filteredFacilities1.map((facility) => (
                <li
                  key={facility._id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    handleSelectFacility(
                      facility,
                      setSelectedFacility1,
                      setSearchTerm1,
                      setFilteredFacilities1
                    )
                  }
                >
                  {facility.facilityName}
                </li>
              ))}
            </ul>
          </div>

          {/* Facility 2 Search */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Select Second Facility</h2>
            <Input
              type="text"
              placeholder="Search for a facility..."
              value={searchTerm2}
              onChange={(e) => setSearchTerm2(e.target.value)}
              className="w-full"
            />
            <ul className="mt-2 border rounded-lg max-h-40 overflow-y-auto">
              {filteredFacilities2.map((facility) => (
                <li
                  key={facility._id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    handleSelectFacility(
                      facility,
                      setSelectedFacility2,
                      setSearchTerm2,
                      setFilteredFacilities2
                    )
                  }
                >
                  {facility.facilityName}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Comparison Table */}
        {selectedFacility1 && selectedFacility2 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6">Comparison</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left">Feature</th>
                  <th className="p-4 text-left">{selectedFacility1.facilityName}</th>
                  <th className="p-4 text-left">{selectedFacility2.facilityName}</th>
                </tr>
              </thead>
              <tbody>
                {/* Services Comparison */}
                <tr className="border-b">
                  <td className="p-4 font-semibold">Services</td>
                  <td className="p-4">
                    <ul>
                      {selectedFacility1.services.map((service, index) => (
                        <li key={index} className="mb-2">
                          {service.name} - KES {service.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4">
                    <ul>
                      {selectedFacility2.services.map((service, index) => (
                        <li key={index} className="mb-2">
                          {service.name} - KES {service.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>

                {/* Medical Covers Comparison */}
                <tr className="border-b">
                  <td className="p-4 font-semibold">Medical Covers</td>
                  <td className="p-4">
                    <ul>
                      {selectedFacility1.medical_covers.map((cover, index) => (
                        <li key={index} className="mb-2">
                          {cover}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4">
                    <ul>
                      {selectedFacility2.medical_covers.map((cover, index) => (
                        <li key={index} className="mb-2">
                          {cover}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>

                {/* Additional Metrics (e.g., Ratings, Working Hours) */}
                <tr className="border-b">
                  <td className="p-4 font-semibold">Average Rating</td>
                  <td className="p-4">{selectedFacility1.rating.average}</td>
                  <td className="p-4">{selectedFacility2.rating.average}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Working Hours</td>
                  <td className="p-4">
                    {selectedFacility1.working_hours.open} - {selectedFacility1.working_hours.close}
                  </td>
                  <td className="p-4">
                    {selectedFacility2.working_hours.open} - {selectedFacility2.working_hours.close}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareFacilities;