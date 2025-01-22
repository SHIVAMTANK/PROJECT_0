const visitor_transactional = require('../../models/transactional/visitor');

const getCurrentVisitors = async (req,res)=>{
    try{

        const data = await visitor_transactional.find();

        res.status(200).json(data);

    }catch(error){
        console.log("This is error from ./controllers/dataTables/getCurrentVisitors.js");
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
        
    }
}

module.exports = getCurrentVisitors;