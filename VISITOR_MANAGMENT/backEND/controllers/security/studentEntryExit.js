const student_transactional = require('../../models/transactional/student');
const student_logs = require('../../models/logs/student');
const student = require('../../models/static/students_alumni/student');

const studentEntryExit = async (req, res) => {
    try {
        const student_id = req.body.student_id;
        const photo = req.files.photo;

        // First find student by student_id
        const studentData = await student.findOne({ student_id: student_id });
        console.log("1. Found student:", studentData);

        if (!studentData) {
            return res.status(404).send({ message: "Student not found" });
        }

        // Move file to uploads directory
        const uploadDir = 'uploads/students';
        const fileName = `${Date.now()}-${photo.name}`;
        const photoUrl = `/${uploadDir}/${fileName}`;
        await photo.mv(`./${uploadDir}/${fileName}`);

        // Check if student is already in transactional
        const match = await student_transactional.findOne({ student_id: student_id });
        console.log("2. Found in transactional:", match);

        const current_time = new Date();
        const options = {
            timeZone: "Asia/Kolkata",
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        const istDateTime = current_time.toLocaleString("en-IN", options);

        if (match) {
            // This is an entry
            const logs = new student_logs({
                student_id: student_id,
                photo_exit: match.photo_exit,
                photo_entry: photoUrl,
                isLongLeave: match.isLongLeave,
                reason: match.reason,
                entry_time: istDateTime,
                exit_time: match.exit_time,
                uuid: studentData.uuid,
                entry_authorised_by: req.user.name,
                exit_authorised_by: match.exit_authorised_by
            });

            console.log("3. Saving entry log:", logs);
            await logs.save();
            console.log("4. Entry log saved successfully");

            await student_transactional.deleteOne({ student_id: student_id });
            return res.status(200).send({ entry: true });

        } else {
            // This is an exit
            const data = new student_transactional({
                name: studentData.name,
                student_id: student_id,
                uuid: studentData.uuid,
                photo_exit: photoUrl,
                exit_time: istDateTime,
                isLongLeave: req.body.isLongLeave === 'true',
                reason: req.body.reason,
                exit_authorised_by: req.user.name
            });

            console.log("3. Saving exit record:", data);
            await data.save();
            console.log("4. Exit record saved successfully");
            
            return res.status(200).send({ entry: false });
        }

    } catch (error) {
        console.error("Error in studentEntryExit:", error);
        return res.status(500).send({ message: error.message });
    }
};

module.exports = studentEntryExit;

