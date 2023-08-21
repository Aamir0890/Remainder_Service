const express=require('express')
const app=express();
const {PORT}=require('./config/serverConfig')
const bodyParser=require('body-parser')
const cron=require('node-cron')
const {subscribe,createChannel}=require('./utils/messageQueue')
const {REMAINDER_BINDING_KEY}=require('./config/serverConfig')
const TicketController=require('./controllers/ticket-controller');
const setUpJobs = require('./utils/jobs');
const EmailService=require('./services/email-service')


const serverStart=async()=>{
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}))
    app.post('/api/v1/tickets',TicketController.create);
    
    const channel=await createChannel();
     subscribe(channel,EmailService.subscribeEvents,REMAINDER_BINDING_KEY)
    app.listen(PORT,()=>{
        console.log(`Server is listening on Port ${PORT}`)
       
        // setUpJobs();
        
    })
}
serverStart();
