import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BarsOutlined, CloseOutlined, HomeOutlined, UsergroupAddOutlined, PhoneOutlined, LinkOutlined } from "@ant-design/icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const FacilityDetails = () => {
  const { id } = useParams();

  const [details, setDetails] = useState(null);
    const [showAllServices, setShowAllServices] = useState(false);

  console.log(id);
  useEffect(() => {
    const fetchFacilityDetails = async () => {
      try {
        // const response = await axios.get(`${import.meta.env.VITE_DEV_ENDPOINT}/api/getfacilitybyid?fid=${id}`)
        const response = await axios.get(
          `http://localhost:7200/api/getfacilitybyid?fid=${id}`
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
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      {details ? (
        <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-white/20">
          {/* Facility Name & Address */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <img
              src={details.images[0]}
              alt={details.facilityName}
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg border border-white/30"
            />
            <div>
              <h2 className="text-3xl font-bold">{details.facilityName}</h2>
              <p className="text-gray-300">{details.address}</p>
              <p className="text-lg font-semibold mt-1">
                📞 {details.contacts}
              </p>
            </div>
          </div>

          {/* Services */}
          <h3 className="text-xl font-semibold mt-6 border-b border-white/20 pb-2">
            💉 Services Offered
          </h3>
          <div
            className="mt-2 max-h-40 overflow-hidden transition-all duration-500"
            style={{ maxHeight: showAllServices ? "none" : "160px" }}
          >
            {details.services.map((service) => (
              <div
                key={service._id}
                className="flex justify-between bg-white/10 p-3 rounded-lg shadow-md mb-2"
              >
                <span className="font-medium">{service.name}</span>
                <span className="text-blue-400 font-semibold">
                  KES {service.price}
                </span>
              </div>
            ))}
          </div>
          {details.services.length > 5 && (
            <button
              className="w-full text-sm text-blue-400 mt-2"
              onClick={() => setShowAllServices(!showAllServices)}
            >
              {showAllServices ? "Show Less ▲" : "Show More ▼"}
            </button>
          )}

          {/* Medical Covers */}
          <h3 className="text-xl font-semibold mt-6 border-b border-white/20 pb-2">
            🏥 Accepted Medical Covers
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {details.medical_covers.map((cover, index) => (
              <span
                key={index}
                className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium"
              >
                {cover}
              </span>
            ))}
          </div>

          {/* Working Hours */}
          <h3 className="text-xl font-semibold mt-6 border-b border-white/20 pb-2">
            ⏰ Working Hours
          </h3>
          <p className="text-gray-300 mt-2">
            <span className="text-blue-400 font-medium">Open:</span>{" "}
            {details.working_hours.open}
            <span className="text-red-400 font-medium ml-4">Close:</span>{" "}
            {details.working_hours.close}
          </p>

          {/* Ratings */}
          <h3 className="text-xl font-semibold mt-6 border-b border-white/20 pb-2">
            ⭐ Ratings & Reviews
          </h3>
          <p className="text-gray-300">
            Average Rating:{" "}
            <span className="text-yellow-400 font-bold">
              {details.rating.average}
            </span>
            ({details.rating.total_reviews} reviews)
          </p>

          {/* Map Location */}
          <h3 className="text-xl font-semibold mt-6 border-b border-white/20 pb-2">
            📍 Facility Location
          </h3>
          <div className="w-full h-56 mt-3 rounded-lg overflow-hidden">
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

          {/* CTA Button */}
          <div className="mt-6">
            <button className="w-full bg-blue-500 hover:bg-blue-600 transition-all py-3 text-lg font-semibold rounded-lg shadow-md">
              Book Appointment
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-lg">Loading...</p>
      )}
    </div>
  );
};

export default FacilityDetails;
