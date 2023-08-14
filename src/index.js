const express=require('express')
const app=express();
const {PORT}=require('./config/serverConfig')
const bodyParser=require('body-parser')
const cron=require('node-cron')
const TicketController=require('./controllers/ticket-controller');
const setUpJobs = require('./utils/jobs');


const serverStart=()=>{
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}))
    app.post('/api/v1/tickets',TicketController.create);
    
    app.listen(PORT,()=>{
        console.log(`Server is listening on Port ${PORT}`)
        // cron.schedule('*/1 * * * *',()=>{
        //     console.log("1 minute has passed")
        // })
        setUpJobs();
        
    })
}
serverStart();
