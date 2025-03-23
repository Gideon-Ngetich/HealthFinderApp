import React, { useState, useEffect } from "react";
import { DoubleRightOutlined, SearchOutlined } from "@ant-design/icons";
import { Avatar, Card, Input, Button, Select, Empty } from "antd";
const { Meta } = Card;
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

// Utility function to truncate description
const truncateDescription = (description, maxWords = 20) => {
  if (!description) return "No description available"; // Fallback for undefined description
  const words = description.split(" "); // Split description into words
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "..."; // Truncate and add ellipsis
  }
  return description; // Return full description if within limit
};

const Facilities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All"); // Default filter: show all
  const [facilities, setFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);

  // Fetch facilities on component mount
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DEV_ENDPOINT}/api/getfacilities`
        );

        if (response.status === 200) {
          setFacilities(response.data);
          setFilteredFacilities(response.data); // Initialize filtered facilities
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchFacilities();
  }, []);

  // Handle search and filter
  useEffect(() => {
    let results = facilities;

    // Filter by search term
    if (searchTerm) {
      results = results.filter((facility) => {
        const facilityName = facility.facilityName || ""; // Fallback to empty string if undefined
        const description = facility.description || ""; // Fallback to empty string if undefined
        return (
          facilityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Filter by category
    if (filterCategory !== "All") {
      results = results.filter(
        (facility) => facility.category === filterCategory
      );
    }

    setFilteredFacilities(results);
  }, [searchTerm, filterCategory, facilities]);

  return (
    <div>
      <Navbar />

      {/* Search and Filter Section */}
      <div className="mt-6 flex flex-col md:flex-row items-center gap-4 justify-center px-5 md:px-10 lg:px-20">
        <Input
          type="text"
          placeholder="Search hospitals, clinics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md"
        />
        <Select
          defaultValue="All"
          style={{ width: 120 }}
          onChange={(value) => setFilterCategory(value)}
        >
          <Select.Option value="All">All</Select.Option>
          <Select.Option value="Hospital">Hospital</Select.Option>
          <Select.Option value="Clinic">Clinic</Select.Option>
          <Select.Option value="Pharmacy">Pharmacy</Select.Option>
        </Select>
        <Button type="primary" icon={<SearchOutlined />}>
          Search
        </Button>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5 md:px-10 lg:px-20 py-20 -z-20">
        {filteredFacilities.length > 0 ? (
          filteredFacilities.map((facility) => (
            <Card
              key={facility._id}
              style={{
                width: 300,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }} // Ensure card height is consistent
              cover={
                <img
                  alt={facility.facilityName}
                  src={`${import.meta.env.VITE_DEV_ENDPOINT}/${facility.logo}`}
                />
              }
              onError={(e) => {
                e.target.src = " https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"; // Fallback image path
                e.target.onerror = null; // Prevent infinite loop if fallback image also fails
              }}
            >
              <div className="flex flex-col justify-between">
                <div style={{ flex: 1 }}>
                  {" "}
                  {/* Flex container for description */}
                  <Meta
                    title={facility.facilityName || "Unnamed Facility"} // Fallback for undefined facilityName
                    description={truncateDescription(facility.description)} // Truncated description
                  />
                </div>
                <div
                  className="flex justify-between w-full text-end pt-5 text-md"
                  style={{ marginTop: "auto" }}
                >
                  {" "}
                  {/* Align to bottom */}
                  <Link
                    to={`/facilities/${facility._id}`}
                    className="flex justify-center items-center gap-1 hover:gap-2 cursor-pointer"
                  >
                    View <DoubleRightOutlined />
                  </Link>
                  <span
                    className={`${
                      facility.category === "Hospital"
                        ? "text-red-500 border-[1px] border-red-500"
                        : facility.category === "Clinic"
                        ? "text-blue-600 border-[1px] border-blue-600"
                        : "text-green-600 border-[1px] border-green-600"
                    } py-2 px-4 rounded-3xl`}
                  >
                    {facility.category || "Uncategorized"}{" "}
                    {/* Fallback for undefined category */}
                  </span>
                </div>
              </div>
            </Card>
          ))
        ) : (
          // Fallback message when no facilities are found
          <div className="col-span-full flex justify-center items-center">
            <Empty
              description="No clinics found"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Facilities;
