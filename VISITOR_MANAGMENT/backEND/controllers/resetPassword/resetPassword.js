const reset = require('../../models/resetPassword/reset');

const student = require('../../models/static/students_alumni/student');
const staff = require('../../models/static/staff/staff');
const security = require('../../models/static/security/security');
const hostelWarden = require('../../models/static/hostelWarden/hostelWarden');

const resetPassword = async (req, res) => {
    try {

        const resetToken = req.query.resetToken;
        const newPassword = req.body.newPassword;

        // console.log(resetToken);
        // console.log(newPassword);

        const resetObj = await reset.findOne({resetToken});
        
        if (!resetObj) {
            return res.status(401).json({message: 'Link Expired'});
        }

        const uuid = resetObj.uuid;

        if(uuid.endsWith('student')){
            const user = await student.updateOne({uuid},{password:newPassword});
            const dlt = await reset.deleteOne({resetToken});
            res.status(200).json({message: 'Password Updated Successfully'});
        }
        else if(uuid.endsWith('staff')){
            const user = await staff.updateOne({uuid},{password:newPassword});
            const dlt = await reset.deleteOne({resetToken});
            res.status(200).json({message: 'Password Updated Successfully'});
        }
        else if(uuid.endsWith('security')){
            const user = await security.updateOne({uuid},{password:newPassword});
            const dlt = await reset.deleteOne({resetToken});
            res.status(200).json({message: 'Password Updated Successfully'});
        }
        else if(uuid.endsWith('hostelWarden')){
            const user = await hostelWarden.updateOne({uuid},{password:newPassword});
            const dlt = await reset.deleteOne({resetToken});
            res.status(200).json({message: 'Password Updated Successfully'});
        }
        else{
            return res.status(401).json({message: 'Invalid Link'});
        }
    
    }catch (error) {
        console.log("This is error from ./controllers/resetPassword/resetPassword.js");
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
}


module.exports = resetPassword;
