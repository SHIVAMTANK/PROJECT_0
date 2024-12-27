const mongoose = require('mongoose');

const uri = "mongodb+srv://root:root1@yashshivam.yp44w.mongodb.net/";


async function Connet(){
    const asd = await mongoose.connect(uri);
    console.log(asd);
    
}
Connet();
