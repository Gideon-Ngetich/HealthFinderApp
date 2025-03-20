import { useState, useEffect } from "react";
import { Input, Button, Card } from "antd";
import { SearchOutlined, DoubleRightOutlined } from "@ant-design/icons";
import hero from "../assets/hero.jpg";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const { Meta } = Card;

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    // Implement search logic
  };

  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DEV_ENDPOINT}/api/getfacilities`
        );

        const data = response.data;

        if (response.status === 200) {
          setFacilities(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchFacilities();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center px-2 py-10">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mt-10">
          <img
            src={hero}
            alt="Healthcare Hero"
            className="w-full h-64 object-cover mb-6"
          />
          <h1 className="text-4xl font-bold text-blue-700">
            Find the Best Healthcare Near You
          </h1>
          <p className="text-gray-600 mt-4">
            Search for hospitals, clinics, and specialists with ease.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <Input
              type="text"
              placeholder="Search hospitals, clinics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md"
            />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>

  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-5 py-10 w-full">
          {facilities.map((facility, index) => (
            <Card
              style={{
                width: 300,
              }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
            >
              <div>
                <Meta
                  title={facility.facilityName}
                  description={facility.description}
                />
                <div
                  className={`flex justify-between w-full text-end pt-5 text-md `}
                >
                  <Link
                    to={`/facilities/${facility._id}`}
                    className="flex justify-center items-center gap-1 hover:gap-2 cursor-pointer"
                  >
                    View <DoubleRightOutlined />
                  </Link>
                  <span
                    className={`${
                      facility.category === "Hospital"
                        ? "text-red-500"
                        : "text-blue-600"
                    }`}
                  >
                    {facility.category}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
