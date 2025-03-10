const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.NodeMailerUserName,
        pass: process.env.NodeMailerPassword,
    },
});

exports.OtpVerification = async (name, email, randomOTP) => {
    try {
        const info = await transporter.sendMail({
            from: '"Open Mall" <no-reply@openmall.com>',
            to: email,
            subject: "Verify Your Email - Open Mall",
            text: `Your OTP is: ${randomOTP}`, 
            html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px 0; text-align: center;">
              <div style="max-width: 500px; background: #ffffff; padding: 30px; margin: auto; border-radius: 10px; 
                          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); text-align: center;">
                
                <h2 style="color: #2c3e50; font-size: 24px; margin-bottom: 10px;">Verify Your Email</h2>
                <p style="color: #555; font-size: 16px; margin-bottom: 20px;">
                  Hi <strong>${name}</strong>, use the OTP below to verify your email and complete your sign-up process.
                </p>
          
                <div style="display: inline-block; padding: 12px 24px; font-size: 28px; 
                            font-weight: bold; color: #ffffff; background: #007BFF; 
                            border-radius: 8px; letter-spacing: 3px;">
                  ${randomOTP}
                </div>
          
                <p style="color: #555; font-size: 14px; margin-top: 20px;">
                  This OTP is valid for <strong>5 minutes</strong>. Please do not share it with anyone.
                </p>
          
                <p style="font-size: 12px; color: #888; margin-top: 20px;">
                  If you did not request this, you can safely ignore this email.
                </p>
          
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
          
                <p style="color: #777; font-size: 12px;">
                  © 2025 Open Mall. All rights reserved.
                </p>
              </div>
            </div>
            `,
        });

        console.log("Message sent: %s", info.messageId);
    }
    catch (e) { console.log(e.message) }
}