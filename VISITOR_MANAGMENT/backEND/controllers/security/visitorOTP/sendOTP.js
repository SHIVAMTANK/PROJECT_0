const mailTransporter = require('../../../SMTP/utils/setup');
const { generateOTP, storeOTP } = require('../../../utils/otpUtils');

const sendOTP = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!email || !name) {
            return res.status(400).json({
                success: false,
                message: 'Name and email are required'
            });
        }

        // Generate OTP
        const otp = generateOTP();
        
        // Store OTP
        storeOTP(email, otp);

        // Send email with OTP
        const mailOptions = {
            from: '"Visitor Management System" <shivamtank8059@gmail.com>',
            to: email,
            subject: 'Your Visitor Registration OTP',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Visitor Registration OTP</h2>
                    <p>Hello ${name},</p>
                    <p>Your OTP for visitor registration is:</p>
                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h1 style="text-align: center; color: #333;">${otp}</h1>
                    </div>
                    <p>This OTP will expire in 10 minutes.</p>
                    <p>If you didn't request this OTP, please ignore this email.</p>
                    <p>Best regards,<br>Visitor Management System</p>
                </div>
            `
        };

        await mailTransporter.sendMail(mailOptions);
        console.log('OTP sent successfully to:', email);

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully'
        });

    } catch (error) {
        console.error('Error in sendOTP:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send OTP'
        });
    }
};

module.exports = sendOTP; 