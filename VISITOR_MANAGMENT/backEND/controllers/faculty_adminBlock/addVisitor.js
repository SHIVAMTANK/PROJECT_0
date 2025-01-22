const visitor = require('../../models/static/visitor/visitor');
const uuid = require('uuid');
//universal unique indentity
const addVisitor = async (req,res) =>{
    try{
        const scheduled_by = req.user.uuid;
        const {name,email,mobile,purpose} = req.body;

        const arrival_date = new Date(req.body.arrival_date);
        const _uuid = `${uuid.v4()}visitor`;

        const newVisitor = new visitor({
            name,
            email,
            mobile,
            arrival_date,
            purpose,
            uuid:_uuid,
            scheduled_by
        })
        await newVisitor.save();
        res.status(200).send({message: "Visitor added successfully"});

    }catch (error) {
        console.log("This is an error from ./controllers/visitor/addVisitor.js");
        console.log(error);
        res.status(500).send({message: "Internal server error"});
    }
}
module.exports = addVisitor;
