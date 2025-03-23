import { useState, useEffect } from "react";
import { Input, Button, Card,  } from "antd";
import {
  SearchOutlined,
  StarFilled,
  CheckCircleFilled,
  DoubleRightOutlined
} from "@ant-design/icons";
const { Meta } = Card;
import hero from "../assets/hero.jpg"; // Local hero image
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [facilities, setFacilities] = useState([]);

  // Fetch facilities from the backend
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

  // Function to truncate text to 20 words
  const truncateDescription = (text, wordLimit = 15) => {
    if (!text) return ""; // Return an empty string if text is undefined or null
    const words = text.split(" "); // Split the text into an array of words
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "..."; // Join the first 20 words and add "..."
    }
    return text; // Return the original text if it's within the limit
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    // Implement search logic
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full bg-blue-50 py-20">
          <div className="max-w-6xl mx-auto text-center px-4">
            <h1 className="text-5xl font-bold text-blue-900 mb-6">
              Find the Best Healthcare Near You
            </h1>
            <p className="text-gray-600 text-xl mb-8">
              Search for hospitals, clinics, and specialized care centers with
              ease.
            </p>
            
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <CheckCircleFilled className="text-5xl text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Wide Range of Facilities
                </h3>
                <p className="text-gray-600">
                  Access a comprehensive list of hospitals, clinics, and
                  specialized care centers.
                </p>
              </div>
              <div className="text-center">
                <CheckCircleFilled className="text-5xl text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Easy Search
                </h3>
                <p className="text-gray-600">
                  Find the right facility quickly with our powerful search
                  tools.
                </p>
              </div>
              <div className="text-center">
                <CheckCircleFilled className="text-5xl text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Trusted Reviews
                </h3>
                <p className="text-gray-600">
                  Read reviews from other patients to make informed decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities Showcase Section */}
        <section className="w-full py-20 bg-blue-50">
          <div className="w-full mx-auto px-5">
            <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
              Explore Top Facilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {facilities.slice(0, 8).map((facility) => (
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
              ))}
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="w-full py-20 bg-blue-900">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Find Your Healthcare Provider?
            </h2>
            <Link
              to="/facilities"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-100 transition-all"
            >
              Explore All Facilities
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}