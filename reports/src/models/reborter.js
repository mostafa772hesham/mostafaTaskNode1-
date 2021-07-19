const mongoose = require ("mongoose")
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwb = require("jsonwebtoken");
const reporterScema = new mongoose.Schema({
    name : {
        type : String,
        required :true,
        trim : true
    },
    age:{
        type : Number,
        required : true
    },
    adress:{
        type : String,
    },
    email:{
        type : String,
        lowercase :true,
        required :true,
        unique : true,
        validate(value){
           if(! validator.isEmail(value))
           throw new Error("Email is invalide")
        }
    },
    password : {
        type : String,
        required : true,
        trim : true,
        minLengh : 6,
        validate(value){

            if (value.toLowerCase().includes("password"))
            {
                throw new Error("invalid password")
            }
        }
    },
    tokens:[
        {
        token:{
            type : String,
            required :true
        }
    }
]
    
})
reporterScema.virtual("newsrel",{
    ref:"News",
    localField : "_id",
    foreignField: "reborter"
})
reporterScema.methods.creatToken = async function() {
const reporter = this
const token = jwb.sign({_id:reporter.id.toString()},"mostafa55555")
reporter.tokens = reporter.tokens.concat({token})
await reporter.save()
return token
}

reporterScema.statics.login= async (email,password)=>{
    const reporter = await reborter.findOne({email})
    if (!reporter) throw new Error("unable to find your email")
    const passwordismatch = await bcrypt.compare(password,reporter.password)
    if (!passwordismatch) throw new Error("unable to find your password")
    return reporter
}


reporterScema.pre("save", async function (next) {
    const reporter = this
if(reporter.isModified("password")) reporter.password = await bcrypt.hash(reporter.password,8)
next();
})

const reborter = mongoose.model("reborter",reporterScema)
module.exports = reborter