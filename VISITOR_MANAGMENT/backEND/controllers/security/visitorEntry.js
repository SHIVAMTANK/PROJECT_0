const visitor = require('../../models/static/visitor/visitor');
const visitor_transactional = require('../../models/transactional/visitor');

const faculty_adminBlock = require('../../models/static/faculty_adminBlock/faculty_adminBlock');

const filesUpload = require('../../blob/azureBlob');


const uuid = require('uuid');


const visitorEntryExit = async (req, res) => {

    try {

        const body = {...req.body};
       
        if (body.hasOwnProperty('uuid')) {
            const uuid = req.body.uuid;

            const file = req.files.photo;
            const photoUrl = await filesUpload(file.tempFilePath, "visitor");

            const visitorData = await visitor.findOne({ uuid: uuid });

            if (visitorData) {
                const exit_time = new Date();
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
                const istDateTime = exit_time.toLocaleString("en-IN", options);

                const faculty_adminBlockName = (await faculty_adminBlock.findOne({ uuid: visitorData.scheduled_by })).name;

                const newTransaction = new visitor_transactional({
                    uuid: uuid,
                    name: visitorData.name,
                    mobile: visitorData.mobile,
                    purpose: visitorData.purpose,
                    photo_entry: photoUrl,
                    entry_time: istDateTime,
                    scheduled_by: faculty_adminBlockName,
                    entry_authorised_by: req.user.name
                });

                const save = await newTransaction.save();

                // delete from static
                const deleteVisitor = await visitor.findOneAndDelete({ uuid: uuid });

                res.status(200).send({ uuid: uuid });

            }
        }

        else {

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

            const _uuid = `${uuid.v4()}visitor`;

            const name = req.body.name;
            const mobile = req.body.mobile;
            const purpose = req.body.purpose;
            const photo = req.files.photo;
            const entry_time = istDateTime;

            // upload photo to blob
            const photoUrl = await filesUpload(photo.tempFilePath, "visitor");


            const new_visitor = new visitor_transactional({
                uuid: _uuid,
                name: name,
                mobile: mobile,
                purpose: purpose,
                photo_entry: photoUrl,
                entry_time: entry_time,
                entry_authorised_by: req.user.name
            });

            const save = await new_visitor.save();

            res.status(200).send({ uuid: _uuid });

        }


    } catch (error) {
        console.log("This is error from ./controllers/security/visitorEntryExit.js");
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = visitorEntryExit;




