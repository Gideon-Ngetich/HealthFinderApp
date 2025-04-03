import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  TimePicker,
  message,
  Card,
  Row,
  Col,
  Typography,
  Spin,
  Alert,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  MedicineBoxOutlined,
  IdcardOutlined,
  FormOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const { Option } = Select;
const { Title, Text } = Typography;
const { TextArea } = Input;

const AppointmentForm = () => {
  const { id } = useParams();
  const facilityEmail = localStorage.getItem("hospitalMail");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [fetchingServices, setFetchingServices] = useState(true);
  const [servicesError, setServicesError] = useState(null);
  console.log(id);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DEV_ENDPOINT}/api/getfacilitybyid?fid=${id}`
        );
        if (response.status === 200) {
          setServices(response.data.services);
        } else {
          setServicesError("Failed to load services");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setServicesError("Error loading services. Please refresh the page.");
      } finally {
        setFetchingServices(false);
      }
    };

    fetchServices();
  }, []);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const formattedValues = {
        ...values,
        dob: values.dob ? dayjs(values.dob).format("YYYY-MM-DD") : null,
        appointmentDate: dayjs(values.appointmentDate).format("YYYY-MM-DD"),
        appointmentTime: dayjs(values.appointmentTime).format("HH:mm"),
        hospital_email: facilityEmail,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_DEV_ENDPOINT}/api/bookappointment`,
        formattedValues
      );
      enqueueSnackbar("Appointment booked successfully", {variant: "success"})
      form.resetFields();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred. Please try again later.";
        enqueueSnackbar("Error booking appointment", {variant: "error"})
    } finally {
      setLoading(false);
    }
  };

  const disabledDate = (current) => {
    // Can not select days before today
    return current && current < dayjs().startOf("day");
  };

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "#f0f2f5" }}>
      <SnackbarProvider />

      <Row justify="center" align="middle">
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <Card
            title={
              <Title
                level={2}
                style={{ textAlign: "center", margin: 0, color: "#1890ff" }}
              >
                <MedicineBoxOutlined style={{ marginRight: 8 }} />
                Hospital Appointment Booking
              </Title>
            }
            bordered={false}
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          >
            {fetchingServices ? (
              <div style={{ textAlign: "center", padding: "40px 24px" }}>
                <Spin size="large" tip="Loading services..." />
              </div>
            ) : servicesError ? (
              <div style={{ textAlign: "center", padding: "24px" }}>
                <Alert
                  message="Error Loading Services"
                  description={servicesError}
                  type="error"
                  showIcon
                />
                <Button
                  type="primary"
                  onClick={() => window.location.reload()}
                  style={{ marginTop: 16 }}
                >
                  Retry
                </Button>
              </div>
            ) : (
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                size="large"
              >
                <Title level={4} style={{ marginBottom: 24 }}>
                  <UserOutlined style={{ marginRight: 8 }} />
                  Patient Information
                </Title>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Full Name"
                      name="fullName"
                      rules={[
                        {
                          required: true,
                          message: "Please input your full name!",
                        },
                      ]}
                    >
                      <Input prefix={<UserOutlined />} placeholder="John Doe" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: "Please input your email!" },
                        {
                          type: "email",
                          message: "Please enter a valid email!",
                        },
                      ]}
                    >
                      <Input
                        prefix={<MailOutlined />}
                        placeholder="john@example.com"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Phone Number"
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Please input your phone number!",
                        },
                      ]}
                    >
                      <Input
                        prefix={<PhoneOutlined />}
                        placeholder="+1 234 567 8900"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="Date of Birth" name="dob">
                      <DatePicker
                        style={{ width: "100%" }}
                        disabledDate={disabledDate}
                        suffixIcon={<CalendarOutlined />}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item label="Gender" name="gender">
                      <Select placeholder="Select gender">
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                        <Option value="Other">Other</Option>
                        <Option value="Prefer not to say">
                          Prefer not to say
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="Address" name="address">
                      <Input
                        prefix={<HomeOutlined />}
                        placeholder="123 Main St, City"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Title level={4} style={{ margin: "24px 0" }}>
                  <CalendarOutlined style={{ marginRight: 8 }} />
                  Appointment Details
                </Title>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Appointment Date"
                      name="appointmentDate"
                      rules={[
                        {
                          required: true,
                          message: "Please select appointment date!",
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        disabledDate={disabledDate}
                        suffixIcon={<CalendarOutlined />}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Appointment Time"
                      name="appointmentTime"
                      rules={[
                        {
                          required: true,
                          message: "Please select appointment time!",
                        },
                      ]}
                    >
                      <TimePicker
                        style={{ width: "100%" }}
                        format="HH:mm"
                        minuteStep={15}
                        suffixIcon={<ClockCircleOutlined />}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Service"
                      name="department"
                      rules={[
                        {
                          required: true,
                          message: "Please select department!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select department"
                        suffixIcon={<MedicineBoxOutlined />}
                      >
                        {services.map((service) => (
                          <Option key={service.id} value={service.name}>
                            {service.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item label="Additional Notes" name="notes">
                  <TextArea
                    rows={3}
                    placeholder="Any additional information we should know"
                    style={{ resize: "none" }}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    loading={loading}
                    style={{ height: 48, fontSize: 16 }}
                  >
                    Book Appointment
                  </Button>
                </Form.Item>

                <Text
                  type="secondary"
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginTop: 16,
                  }}
                >
                  We'll contact you to confirm your appointment
                </Text>
              </Form>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AppointmentForm;
