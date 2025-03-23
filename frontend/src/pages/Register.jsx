import React from "react";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Checkbox,
  Select,
  Space,
  message
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const RegistrationForm = () => {
    const navigate = useNavigate()
    const onFinish = async (values) => {
        console.log(values)
        try {
          const response = await axios.post(`${import.meta.env.VITE_DEV_ENDPOINT}/api/register-facility`, values);
          console.log("Form Submitted Successfully:", response.data);
          navigate('/login')
          message.success("Facility registered successfully!");
        } catch (error) {
          console.error("Error submitting form:", error);
          message.error("Failed to register facility. Please try again.");
        }
      };
    

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Facility Registration</h2>

      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ category: "Hospital" }}
      >
        {/* Facility Name */}
        <Form.Item
          label="Facility Name"
          name="facilityName"
          rules={[{ required: true, message: "Facility name is required" }]}
        >
          <Input />
        </Form.Item>
        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>
        {/* Password */}
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password />
        </Form.Item>
        {/* Address */}
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Address is required" }]}
        >
          <Input />
        </Form.Item>
        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        {/* Location Coordinates */}
        <Form.Item label="Location Coordinates">
          <Space>
            <Form.Item
              name="latitude"
              rules={[{ required: true, message: "Latitude is required" }]}
            >
              <InputNumber placeholder="Latitude" />
            </Form.Item>
            <Form.Item
              name="longitude"
              rules={[{ required: true, message: "Longitude is required" }]}
            >
              <InputNumber placeholder="Longitude" />
            </Form.Item>
          </Space>
        </Form.Item>

        <div className="flex flex-col pb-5">
          <label className="font-semibold">Services</label>{" "}
          <Form.List name="services" initialValue={[{ name: "", price: "" }]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Space key={key} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      rules={[
                        { required: true, message: "Service name required" },
                      ]}
                    >
                      <Input placeholder="Service Name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "price"]}
                      rules={[{ required: true, message: "Price required" }]}
                    >
                      <Input placeholder="Price" />
                    </Form.Item>
                    {index > 0 && (
                      <Button onClick={() => remove(name)}>Remove</Button>
                    )}
                  </Space>
                ))}
                <Button className="w-fit" onClick={() => add()}>
                  Add Service
                </Button>
              </>
            )}
          </Form.List>
        </div>

        {/* Contacts */}
        <Form.Item
          label="Contact Number"
          name="contacts"
          rules={[{ required: true, message: "Contact number is required" }]}
        >
          <Input />
        </Form.Item>
        {/* Medical Covers */}

        <div className="flex flex-col pb-5">
          <label className="font-semibold">Medical Covers</label>{" "}
          <Form.List name="medical_covers" initialValue={[""]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Space key={key} align="baseline">
                    <Form.Item
                      {...restField}
                      name={name}
                      rules={[
                        { required: true, message: "Medical cover required" },
                      ]}
                    >
                      <Input placeholder="Medical Cover Name" />
                    </Form.Item>
                    {index > 0 && (
                      <Button onClick={() => remove(name)}>Remove</Button>
                    )}
                  </Space>
                ))}
                <Button className="w-fit" onClick={() => add()}>Add Medical Cover</Button>
              </>
            )}
          </Form.List>
        </div>

        {/* Working Hours */}
        <Form.Item label="Working Hours">
          <Space>
            <Form.Item
              name={["working_hours", "open"]}
              rules={[{ required: true, message: "Opening time required" }]}
            >
              <Input placeholder="Open (e.g., 08:00 AM)" />
            </Form.Item>
            <Form.Item
              name={["working_hours", "close"]}
              rules={[{ required: true, message: "Closing time required" }]}
            >
              <Input placeholder="Close (e.g., 06:00 PM)" />
            </Form.Item>
          </Space>
        </Form.Item>
        {/* Category */}
        <Form.Item label="Category" name="category">
          <Select>
            <Option value="Hospital">Hospital</Option>
            <Option value="Clinic">Clinic</Option>
            <Option value="Pharmacy">Pharmacy</Option>
          </Select>

        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register Facility
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationForm;
