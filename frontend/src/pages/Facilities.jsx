import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
const { Meta } = Card;

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);



  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7200/api/getfacilities`
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
            <div className={`w-full text-end pt-5 text-md ${facility.category === 'Hospital' ? 'text-red-500' : 'text-blue-600'}`}>{facility.category}</div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Facilities;
