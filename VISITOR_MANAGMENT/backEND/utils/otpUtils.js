// Store OTPs in memory (you might want to use a database in production)
const otpStore = new Map();

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

const storeOTP = (email, otp) => {
    otpStore.set(email, {
        otp,
        expiry: Date.now() + 10 * 60 * 1000 // 10 minutes expiry
    });
};

const verifyOTP = (email, userOTP) => {
    const storedData = otpStore.get(email);
    
    if (!storedData) {
        return false;
    }

    if (Date.now() > storedData.expiry) {
        otpStore.delete(email);
        return false;
    }

    if (parseInt(userOTP) !== storedData.otp) {
        return false;
    }

    otpStore.delete(email); // Clean up used OTP
    return true;
};

module.exports = {
    generateOTP,
    storeOTP,
    verifyOTP
}; 