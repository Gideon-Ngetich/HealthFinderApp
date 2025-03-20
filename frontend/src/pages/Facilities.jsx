import React, { useState, useEffect } from "react";
import {  } from "@ant-design/icons";
import { Avatar, Card } from "antd";
const { Meta } = Card;
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar'


const Facilities = () => {
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
    <div>
        <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-5 md:px-10 lg:px-20 py-10">
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
  );
};

export default Facilities;
