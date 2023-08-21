const amqplib=require('amqplib')
const {MESSAGE_BROKER_URL,EXCHANGE_NAME,REMINDER_BINDING_KEY}=require('../config/serverConfig')

const createChannel=async()=>{
    try{
        const connection=await amqplib.connect(MESSAGE_BROKER_URL);
        const channel=await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME,'direct',false)
        return channel
    }catch(error){
        console.log(error)
    }
    
}

const subscribe=async(channel,service,REMINDER_BINDING_KEY)=>{
 try{
        const applicationQueue=await channel.assertQueue('QUEUE_NAME');
        channel.bindQueue(applicationQueue.queue,EXCHANGE_NAME,REMINDER_BINDING_KEY)
        channel.consume(applicationQueue.queue,msg =>{
           console.log('recieved data')
           console.log(msg.content.toString());
           const paylaod=JSON.parse(msg.content.toString())
          
            service(paylaod)
            channel.ack(msg);
        })
 }catch(error){
    console.log(error)
 }
}
const publishMessage=async(channel,REMINDER_BINDING_KEY,message)=>{
    try{
await channel.publish(EXCHANGE_NAME,REMINDER_BINDING_KEY,Buffer.from(message))
    }catch(error){
        console.log(error)
    }
}

module.exports={createChannel,subscribe,publishMessage}


