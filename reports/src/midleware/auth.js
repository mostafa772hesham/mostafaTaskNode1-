const jwb = require ("jsonwebtoken")
const Reporter = require ("../models/reborter")

const auth = async (req,res,next)=>{
    try{
       const  tokenheader = req.header("Authorization").replace("Bearer ","")
        const decode = jwb.verify(tokenheader,"mostafa55555")
       const  reportertoken = await Reporter.findOne({_id:decode._id,"tokens.token": tokenheader})
        if (!tokenheader) res.send("invaild token")
        req.reporter = reportertoken
        req.token = tokenheader
        next()
    }
    catch(e){

        res.send(e)
    } 
}
module.exports = auth