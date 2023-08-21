const sender=require('../config/emailConfig')
const {TicketRepository}=require('../repository/index')
const repo=new TicketRepository();

const sendBasicEmail=(mailFrom ,mailTo,mailSubject,mailBody)=>{
    try{
        sender.sendMail({
            from:mailFrom,
            to:mailTo,
            subject:mailSubject,
            text:mailBody
         })
    }catch(error){
        console.log(error)
    }
     
}
const fetchPendingEmails=async()=>{
      try{
        
        const response=await repo.get({status:"PENDING"});
        return response; 
      }catch(error){
        console.log(error)
      }
}
const createNotification=async(data)=>{
    try{
      const response=await repo.create(data);
      return response
    }catch(error){
        console.log(error)
    }
}

const updateTicket=async(ticketId,data)=>{
  try{  const response=await repo.update(ticketId,data)
    return response

  }catch(error){
    console.log(error)
  }
 
  
}
const subscribeEvents=async(paylaod)=>{
  try{
    let service=paylaod.service
    const data=paylaod.data
   
    switch(service){
      case 'CREATE_TIKCET':
        await createNotification(data)
        break;
        case 'SEND_BASIC_MAIL':
          await sendBasicEmail(data)
          break;
          default:
            console.log("No value given")
            break;
    }
  }catch(error){
    console.log(error)
  }
 
}


module.exports={sendBasicEmail,fetchPendingEmails,createNotification,updateTicket,subscribeEvents}