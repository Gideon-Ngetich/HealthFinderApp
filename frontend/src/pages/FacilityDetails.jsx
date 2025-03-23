import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  HomeOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  StarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Carousel } from "antd";

const FacilityDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [showAllServices, setShowAllServices] = useState(false);

  useEffect(() => {
    const fetchFacilityDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DEV_ENDPOINT}/api/getfacilitybyid?fid=${id}`
        );
        const data = response.data;
        if (response.status === 200) {
          setDetails(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchFacilityDetails();
  }, [id]);

  if (!details) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        {/* Facility Header */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Logo */}
            {details.logo && (
              <img
                src={`${import.meta.env.VITE_DEV_ENDPOINT}/${details.logo}`}
                alt={details.facilityName}
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg border border-gray-200"
              />
            )}
            {/* Facility Name & Address */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800">
                {details.facilityName}
              </h1>
              <p className="text-gray-600 mt-2">
                <HomeOutlined className="mr-2" /> {details.address}
              </p>
              <p className="text-gray-600 mt-1">
                <PhoneOutlined className="mr-2" /> {details.contacts}
              </p>
            </div>
          </div>
        </div>

        {/* Facility Images Carousel */}
        {details.images && details.images.length > 0 && (
          <div className="mt-8">
            <Carousel autoplay>
              {details.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={`${import.meta.env.VITE_DEV_ENDPOINT}/${image}`}
                    alt={`Facility Image ${index + 1}`}
                    className="w-full h-64 md:h-[500px] object-initial rounded-lg"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        )}

        {/* Services */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            💉 Services Offered
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            style={{
              maxHeight: showAllServices ? "none" : "320px",
              overflow: "hidden",
            }}
          >
            {details.services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100"
              >
                <h3 className="font-medium text-gray-800">{service.name}</h3>
                <p className="text-blue-600 font-semibold">
                  KES {service.price}
                </p>
              </div>
            ))}
          </div>
          {details.services.length > 4 && (
            <button
              className="w-full text-sm text-blue-600 mt-4 hover:text-blue-800"
              onClick={() => setShowAllServices(!showAllServices)}
            >
              {showAllServices ? "Show Less ▲" : "Show More ▼"}
            </button>
          )}
        </div>

        {/* Medical Covers */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🏥 Accepted Medical Covers
          </h2>
          <div className="flex flex-wrap gap-2">
            {details.medical_covers.map((cover, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {cover}
              </span>
            ))}
          </div>
        </div>

        {/* Working Hours */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            ⏰ Working Hours
          </h2>
          <p className="text-gray-600">
            <ClockCircleOutlined className="mr-2" />
            <span className="text-blue-600 font-medium">Open:</span>{" "}
            {details.working_hours.open}
            <span className="text-red-600 font-medium ml-4">Close:</span>{" "}
            {details.working_hours.close}
          </p>
        </div>

        {/* Ratings & Reviews */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            ⭐ Ratings & Reviews
          </h2>
          <p className="text-gray-600">
            <StarOutlined className="mr-2" /> Average Rating:{" "}
            <span className="text-yellow-600 font-bold">
              {details.rating.average}
            </span>
            ({details.rating.total_reviews} reviews)
          </p>
        </div>

        {/* Map Location */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📍 Facility Location
          </h2>
          <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden">
            <MapContainer
              center={[
                details.location.coordinates[1],
                details.location.coordinates[0],
              ]}
              zoom={15}
              className="w-full h-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[
                  details.location.coordinates[1],
                  details.location.coordinates[0],
                ]}
              >
                <Popup>{details.facilityName}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8">
          <button className="w-full bg-blue-600 hover:bg-blue-700 transition-all py-3 text-lg font-semibold text-white rounded-lg shadow-md">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetails;