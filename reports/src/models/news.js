const mongoose = require ("mongoose")
const newsScema = new mongoose.Schema({
    title :{
        type : String,
        required:true
        },
    description:{
        type : String,
        required : true
    }
    ,
    reborter:{
        type:mongoose.Schema.Types.ObjectId,
        required :true
    }

})

const News = mongoose.model("News",newsScema)
module.exports = News