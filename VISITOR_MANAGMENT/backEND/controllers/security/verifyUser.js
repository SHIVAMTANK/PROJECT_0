const student = require('../../models/static/students_alumni/student');
const student_transactional = require('../../models/transactional/student');
const staff = require('../../models/static/staff/staff');
const staff_transactional = require('../../models/transactional/staff');
const parent = require('../../models/transactional/parent');
const visitor = require('../../models/transactional/visitor');



const getData = async (req, res) => {
    try {

        const uuid = req.query.uuid;

        const index_student = uuid.endsWith("student");
        const index_staff = uuid.endsWith("staff");
        const index_visitor = uuid.endsWith("visitor");
        const index_parent = uuid.endsWith("parent");

        // console.log(index_student);

        if(index_student){
            const data2 = await student_transactional.findOne({uuid: uuid});
            const data = await student.findOne({uuid: uuid});

            // console.log(data);
            // console.log(uuid);

            if(data){
                const resData = {
                    entry : false
                }
                if(data2){
                    resData.entry = true;
                }
                res.status(200).send(resData);
            }
            else{
                res.status(404).send();
            }
        }
        else if(index_staff){
            const data2 = await staff_transactional.findOne({uuid: uuid});
            const data = await staff.findOne({uuid: uuid});
            if(data){
                const resData = {
                    entry : true
                }
                if(data2){
                    resData.entry = false;
                }
                res.status(200).send(resData);
            }
            else{
                res.status(404).send();
            }
        }
        else if(index_visitor){
            const data = await visitor.findOne({uuid: uuid});
            if(data){
                const resData = {
                    entry : false
                }
                res.status(200).send(resData);
            }
            else{
                res.status(404).send();
            }
        }
        else if(index_parent){
            const data = await parent.findOne({uuid: uuid});
            if(data){
                res.status(200).send({data,isParent:true});
            }
            else{
                res.status(404).send();
            }
        }

    } catch (error) {
        
        console.log("This is error from ./controller/security/getData.js");
        console.log(error);
        res.status(500).send();

    }
}



module.exports = getData;