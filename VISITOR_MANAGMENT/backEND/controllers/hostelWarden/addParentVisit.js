const parent = require("../../models/static/parent/parent");

const uuid = require("uuid");

const addParentVisit = async (req, res) => {
  try {
    const { name1, name2, student_id, mobile, arrival_date, purpose } = req.body;

    const _uuid = `${uuid.v4()}parent`;

    const visit = new parent({
      name1: name1,
      name2: name2,
      student_id: Number(student_id),
      mobile: Number(mobile),
      arrival_date: new Date(arrival_date),
      purpose: purpose,
      uuid: _uuid,
    });

   const parentVisit =  await visit.save();
    
    res.status(200).send();
  
} catch (error) {
    console.log(
      "This is error from ./controllers/hostelWarden/addParentVisit.js"
    );
    console.log(error);
    res.status(500).send(error);
  }
};
