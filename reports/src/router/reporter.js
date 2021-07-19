        const Reporter = require("../models/reborter")
        const express = require("express")
        const router = express.Router()
        const auth = require("../midleware/auth")


        router.get("/getAllReporter" , auth,async (req,res)=>{
            try{

            const allReporter = await Reporter.find({})
            res.send(allReporter)
            }
            catch(e){
                res.send(e)
            }
        })

        router.get("/getOne/:id",auth,async (req,res)=>{
            const idUrl = req.params.id
            try{
                const oneReporter = await Reporter.findById(idUrl)
                res.send(oneReporter)
            }
            catch(e){
                res.send("errorrrrr id"+e)
            }
        })



        router.post("/addReporter",async (req,res)=>{
            try{
                const addreporter = new Reporter(req.body)

                await addreporter.save()
                const token = await addreporter.creatToken()
                res.send({addreporter,token})
            }
            catch(e){
                res.send(e)

            }
        })
        router.post("/login",async (req,res)=>{
            try{
              const reporterlogin = await Reporter.login(req.body.email,req.body.password)  
              const token = await reporterlogin.creatToken()
              res.send({reporterlogin,token})
            }
            catch(e){
                res.send(e)
            }
        })

        router.post("/logout",auth, async (req,res)=>{
            try{
                req.reporter.tokens = req.reporter.tokens.filter((e)=>{
                    return e.token !== req.token
                })
               await req.reporter.save()
               res.send("sucsess logout")

            }
            catch(e){
                res.send("error "+e)
            }
        })
        router.post("/logoutall",auth,async (req,res)=>{
            try{
                req.reporter.tokens = req.reporter.tokens[""]
                await req.reporter.save()
                res.send("sucsess logout all")
            }
            catch(e){
                res.send("unable to logout all"+e)
            }
        })
        router.get("/profile", auth, async (req,res)=>{
            res.send(req.reporter)
        })

        router.delete("/deleteReporter/:id", auth,async (req,res)=>{
            try{
                const urlid = req.params.id
                const deleteReporter = await Reporter.findByIdAndDelete(urlid)
                res.send(deleteReporter)
            }
            catch(e){
                res.send(e)
            }
        })
        router.patch("/editreporter/:id",auth,async (req,res)=>{
            const keyOfbody =  Object.keys(req.body)
            const allwoedUpdate = ["adress","password","email"]
            const isVaid = keyOfbody.every((el)=>allwoedUpdate.includes(el))
            if(!isVaid){
            return res.send("canot update this filde")
            }
          const idUrl = req.params.id
            try{
           const reporteredite = await Reporter.findById(idUrl)
           keyOfbody.forEach((el)=>(reporteredite[el]= req.body[el]))
          await reporteredite.save()
          if(!reporteredite)
          return res.send("canot find your id")

          res.send(reporteredite)
          }
          catch(e){
              res.send(e)
          }
        })
        module.exports = router