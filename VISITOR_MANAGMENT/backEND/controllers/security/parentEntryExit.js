const parent_transactional = require('../../models/transactional/parent');
const parent = require('../../models/static/parent/parent');
const parent_logs = require('../../models/logs/parent');



const parentEntryExit = async (req, res) => {

    try {
        const { uuid } = req.body;

        const photo1 = req.files.photo1;
        const photo2 = req.files.photo2;

        const match = await parent_transactional.findOne({ uuid: uuid });

        if (match) {

            // Already inside campus

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
            const current_date = current_time.toLocaleString("en-IN", options);

            const exit_photo1 = await uploadFile(photo1.tempFilePath, "parent");
            var exit_photo2 = "";
            if (photo2) {
                exit_photo2 = await uploadFile(photo2.tempFilePath, "parent");
            }

            const parent_l = new parent_logs({
                uuid: uuid,
                exit_time: current_date,
                exit_photo1: exit_photo1,
                exit_photo2: exit_photo2,
                entry_time: match.entry_time,
                entry_photo1: match.entry_photo1,
                entry_photo2: match.entry_photo2,
                student_id: match.student_id,
                name1: match.name1,
                name2: match.name2,
                mobile: match.mobile,
                arrival_date: match.arrival_date,
                purpose: match.purpose,
                exit_authorised_by: req.user.name,
                entry_authorised_by: match.entry_authorised_by
            });

            const parent_log = await parent_l.save();

            await parent_transactional.deleteOne({ uuid: uuid });

            res.status(200).send({ message: "Parent Exit Successful" });

        }
        else {

            // Not inside campus

            const arrival_photo1 = await uploadFile(photo1.tempFilePath, "parent");
            var arrival_photo2 = "";
            if (photo2) {
                arrival_photo2 = await uploadFile(photo2.tempFilePath, "parent");
            }

            const data = await parent.findOne({ uuid: uuid });

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
            const current_date = current_time.toLocaleString("en-IN", options);

            const parent_t = new parent_transactional({
                uuid: uuid,
                student_id: data.student_id,
                name1: data.name1,
                name2: data.name2,
                mobile: data.mobile,
                arrival_date: data.arrival_date,
                purpose: data.purpose,
                entry_time: current_date,
                entry_photo1: arrival_photo1,
                entry_photo2: arrival_photo2,
                entry_authorised_by: req.user.name
            });

            const save = await parent_t.save();

            await parent.deleteOne({ uuid: uuid });

            res.status(200).send({ message: "Parent Entry Successful" });

        }

    } catch (error) {
        console.log("This is error from ./controllers/security/parentEntryExit.js");
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = parentEntryExit;