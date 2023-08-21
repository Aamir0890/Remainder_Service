# Welcome to Booking_service

## Project Setup
-clone the git repository

-Execute `npm install` on the same path as the root directory of the downloaded project

-create a new .env file in the root directory and add the following enviroment variables

--`PORT=3004`


-Inside the 'src/config' folder create a new file 'config.json' and then add the following json

{
  "development": {
    "username": "your-db-login name",
    "password": "your-db-password",
    "database": "Remainder_DB_DEV",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
}

"once you have added the json file just go to git and write `npx sequelize db:create`"
  
  and to connect to sql server run `npx sequelize db:migrate`

## DB Design

-Reminder-A flight booking when succesfull will have  reciepentEmail-subject-content-status-NotificationTime


## SendingMail

We we have a successfull booking we are going to send the email vai NodeMailer which we can insall with `npm i nodemailer`.This package allows us to send mail with ease.Refer to the npm package.We can use any service to send mail.Here we are using gmail service.

-We are going to set up the notification time to be 48hrs before the flight takes off.We are going to set up cron jobs which you can get by `npm i node-cron`.After every interval of few minutes it makes a query to the db asking for the mails where the notificationTime is less than 48hrs before the flight. We are then going to make a query asking the customers mail-id and send the mail.
