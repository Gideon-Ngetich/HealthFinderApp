const router = require("express").Router()
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'giddyrono26@gmail.com',
      pass: 'htqs ufxt niwj bywf'
    }
  });

  router.post('/bookappointment', async (req, res) => {
    try {
      const {
        fullName,
        email,
        phone,
        dob,
        gender,
        address,
        appointmentDate,
        appointmentTime,
        department,
        notes,
        hospital_email
      } = req.body;
  
      console.log(hospital_email)
      if (!fullName || !email || !phone || !appointmentDate || !appointmentTime || !department) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please fill in all required fields.' 
        });
      }
  
      // Format the appointment date
      const formattedDate = new Date(appointmentDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
  
      // Email content for hospital
      const hospitalMailOptions = {
        from: 'giddyrono26@gmail.com',
        to: hospital_email,
        subject: `New Appointment Booking - ${fullName}`,
        html: `
          <h1>New Appointment Booking</h1>
          <h2>Patient Information</h2>
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Date of Birth:</strong> ${dob || 'Not provided'}</p>
          <p><strong>Gender:</strong> ${gender || 'Not provided'}</p>
          <p><strong>Address:</strong> ${address || 'Not provided'}</p>
          
          <h2>Appointment Details</h2>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${appointmentTime}</p>
          <p><strong>Department/Specialty:</strong> ${department}</p>
          <p><strong>Additional Notes:</strong> ${notes || 'None'}</p>
          
          <p>This appointment was booked through the online booking system.</p>
        `
      };
  
      // Send confirmation email to patient
      const patientMailOptions = {
        from: "giddyrono26@gmail.com",
        to: email,
        subject: `Your Appointment Confirmation - ${formattedDate}`,
        html: `
          <h1>Appointment Confirmation</h1>
          <p>Dear ${fullName},</p>
          
          <p>Your appointment has been successfully booked with the following details:</p>
          
          <h2>Appointment Details</h2>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${appointmentTime}</p>
          <p><strong>Department/Specialty:</strong> ${department}</p>
          
          <p>Please arrive 15 minutes before your scheduled time and bring:</p>
          <ul>
            <li>Your insurance card (if applicable)</li>
            <li>Photo ID</li>
            <li>List of current medications</li>
          </ul>
          
          <p>If you need to cancel or reschedule, please contact us at least 24 hours in advance.</p>
          
          <p>Thank you for choosing our hospital.</p>
          
          <p>Best regards,<br>The Hospital Team</p>
        `
      };
  
      // Send both emails
      await transporter.sendMail(hospitalMailOptions);
      await transporter.sendMail(patientMailOptions);
  
      res.json({ 
        success: true, 
        message: 'Appointment booked successfully! A confirmation has been sent to your email.' 
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while booking your appointment. Please try again later.' 
      });
    }
  });

  module.exports = router