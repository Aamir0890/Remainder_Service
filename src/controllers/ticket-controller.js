const TicketService=require('../services/email-service')

const create=async(req,res)=>{
 try{
const response=await TicketService.createNotification(req.body);
return res.status(201).json({
    success:true,
    data:response,
    err:{},
    message:"Successfully registerd an email"
})
 }catch(error){
    console.log(error)
    return res.status(500).json({
        success:false,
        data:{},
        err:error,
        message:"Not able to register an email"
    })
 }
}



module.exports={create}