import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, Select, TimePicker, message } from "antd";
import Navbar from "../components/Navbar";
import moment from "moment";

const { Option } = Select;
const { TextArea } = Input;

const FacilityDashboard = () => {
  const { id } = useParams(); // Facility ID from the URL
  const [facility, setFacility] = useState(null);
  const [logoFile, setLogoFile] = useState(null); // Local state for logo
  const [imageFiles, setImageFiles] = useState([]); // Local state for images
  const [form] = Form.useForm();

  // Fetch facility details on component mount
  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DEV_ENDPOINT}/api/getfacilitybyid?fid=${id}`
        );
        if (response.status === 200) {
          const facilityData = response.data;

          // Convert working_hours to moment objects
          facilityData.working_hours = {
            open: moment(facilityData.working_hours.open, "HH:mm"),
            close: moment(facilityData.working_hours.close, "HH:mm"),
          };

          setFacility(facilityData);
          form.setFieldsValue(facilityData); // Populate form with facility data
        }
      } catch (err) {
        console.error("Error fetching facility:", err);
      }
    };

    fetchFacility();
  }, [id, form]);

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      // Convert working_hours back to strings
      values.working_hours = {
        open: values.working_hours.open.format("HH:mm"),
        close: values.working_hours.close.format("HH:mm"),
      };

      // Ensure services is an array of objects with name and price
      if (values.services && Array.isArray(values.services)) {
        values.services = values.services.map((service) => ({
          name: service.name,
          price: service.price,
        }));
      }

      // Create FormData for logo and images
      const formData = new FormData();
      if (logoFile) {
        formData.append("logo", logoFile); // Append logo file
      }
      imageFiles.forEach((file) => formData.append("images", file)); // Append image files

      // Append other form values
      Object.keys(values).forEach((key) => {
        if (key === "services" || key === "working_hours" || key === "medical_covers") {
          // Serialize complex fields
          formData.append(key, JSON.stringify(values[key]));
        } else if (key !== "logo" && key !== "images") {
          // Append simple fields directly
          formData.append(key, values[key]);
        }
      });

      // Log FormData for debugging
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Send the update request
      const response = await axios.put(
        `${import.meta.env.VITE_DEV_ENDPOINT}/api/updates/facilityupdate?id=${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        message.success("Facility updated successfully!");
        // Optionally, refetch facility data to update the UI
        const fetchResponse = await axios.get(
          `${import.meta.env.VITE_DEV_ENDPOINT}/api/getfacilitybyid?fid=${id}`
        );
        if (fetchResponse.status === 200) {
          setFacility(fetchResponse.data);
        }
      }
    } catch (err) {
      console.error("Error updating facility:", err);
      message.error("Failed to update facility.");
    }
  };

  if (!facility) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">Facility Dashboard</h1>

        {/* Facility Details Form */}
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          {/* Facility Name */}
          <Form.Item
            label="Facility Name"
            name="facilityName"
            rules={[
              { required: true, message: "Please enter the facility name!" },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter the email!" }]}
          >
            <Input type="email" />
          </Form.Item>

          {/* Address */}
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter the address!" }]}
          >
            <Input />
          </Form.Item>

          {/* Description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter the description!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          {/* Services */}
          <Form.Item label="Services" name="services">
            <Form.List name="services">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className="flex gap-4 mb-4">
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        rules={[
                          {
                            required: true,
                            message: "Service name is required!",
                          },
                        ]}
                      >
                        <Input placeholder="Service Name" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "price"]}
                        rules={[
                          {
                            required: true,
                            message: "Service price is required!",
                          },
                        ]}
                      >
                        <Input placeholder="Price" />
                      </Form.Item>
                      <Button onClick={() => remove(name)}>Remove</Button>
                    </div>
                  ))}
                  <Button type="dashed" onClick={() => add()}>
                    Add Service
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>

          {/* Medical Covers */}
          <Form.Item label="Medical Covers" name="medical_covers">
            <Select mode="tags" placeholder="Add medical covers">
              {facility.medical_covers.map((cover, index) => (
                <Option key={index} value={cover}>
                  {cover}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Working Hours */}
          <Form.Item label="Working Hours" name="working_hours">
            <Input.Group compact>
              <Form.Item
                name={["working_hours", "open"]}
                rules={[
                  { required: true, message: "Opening time is required!" },
                ]}
              >
                <TimePicker format="HH:mm" placeholder="Open" />
              </Form.Item>
              <Form.Item
                name={["working_hours", "close"]}
                rules={[
                  { required: true, message: "Closing time is required!" },
                ]}
              >
                <TimePicker format="HH:mm" placeholder="Close" />
              </Form.Item>
            </Input.Group>
          </Form.Item>

          {/* Logo Upload */}
          <Form.Item label="Thumbnail">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogoFile(e.target.files[0])} // Store the selected logo file
            />
          </Form.Item>

          {/* Facility Images Upload */}
          <Form.Item label="Facility Images">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImageFiles([...e.target.files])} // Store the selected image files
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Facility
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FacilityDashboard;