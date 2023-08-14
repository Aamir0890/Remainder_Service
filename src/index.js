const express=require('express')
const app=express();
const {PORT}=require('./config/serverConfig')
const bodyParser=require('body-parser')
const serverStart=()=>{
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}))
   
    app.listen(PORT,()=>{
        console.log(`Server is listening on Port ${PORT}`)
    })
}
serverStart();
