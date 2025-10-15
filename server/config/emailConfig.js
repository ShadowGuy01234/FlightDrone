import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send email to admin about new contact submission
export const sendContactNotificationEmail = async (contactData) => {
  try {
    const { name, email, phone, message } = contactData;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
              border-radius: 10px;
            }
            .header {
              background-color: #3b82f6;
              color: white;
              padding: 20px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .field {
              margin-bottom: 20px;
            }
            .label {
              font-weight: bold;
              color: #3b82f6;
              display: block;
              margin-bottom: 5px;
            }
            .value {
              padding: 10px;
              background-color: #f3f4f6;
              border-radius: 5px;
              border-left: 3px solid #3b82f6;
            }
            .message-box {
              background-color: #f3f4f6;
              padding: 15px;
              border-radius: 5px;
              border-left: 3px solid #3b82f6;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #666;
              font-size: 12px;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #3b82f6;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🔔 New Contact Form Submission</h2>
            </div>
            <div class="content">
              <p>You have received a new message through your website's contact form.</p>
              
              <div class="field">
                <span class="label">👤 Name:</span>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <span class="label">📧 Email:</span>
                <div class="value">
                  <a href="mailto:${email}">${email}</a>
                </div>
              </div>
              
              <div class="field">
                <span class="label">📱 Phone:</span>
                <div class="value">
                  <a href="tel:${phone}">${phone}</a>
                </div>
              </div>
              
              <div class="field">
                <span class="label">💬 Message:</span>
                <div class="message-box">${message}</div>
              </div>
              
              <div style="text-align: center;">
                <a href="${
                  process.env.FRONTEND_URL || "http://localhost:5173"
                }/dashboard/admin/contacts" class="button">
                  View in Admin Panel
                </a>
              </div>
              
              <div class="footer">
                <p>This is an automated notification from your website's contact form.</p>
                <p>Please do not reply to this email directly. Use the contact information provided above to respond.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}

---
This is an automated notification from your website's contact form.
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};

// Send confirmation email to the user
export const sendContactConfirmationEmail = async (contactData) => {
  try {
    const { name, email } = contactData;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting Flytium Drones",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
              border-radius: 10px;
            }
            .header {
              background-color: #3b82f6;
              color: white;
              padding: 20px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .checkmark {
              text-align: center;
              font-size: 48px;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>✅ Message Received</h2>
            </div>
            <div class="content">
              <div class="checkmark">✓</div>
              <h3>Thank you for contacting us, ${name}!</h3>
              <p>We have received your message and our team will get back to you as soon as possible.</p>
              <p>We typically respond within 24-48 hours during business days.</p>
              <p>If your inquiry is urgent, please feel free to call us directly.</p>
              
              <div class="footer">
                <p><strong>Flytium Drones</strong></p>
                <p>Email: ${process.env.ADMIN_EMAIL}</p>
                <p>This is an automated confirmation email.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Thank you for contacting Flytium Drones, ${name}!

We have received your message and our team will get back to you as soon as possible.
We typically respond within 24-48 hours during business days.

If your inquiry is urgent, please feel free to call us directly.

---
Flytium Drones
Email: ${process.env.ADMIN_EMAIL}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return { success: false, error: error.message };
  }
};

export default transporter;
