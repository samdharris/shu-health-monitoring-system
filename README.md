# Health Monitoring System
Group assignment for the Case Studies in Software Development module by Sam Harris, Matthew Pinder, Joe Mitchell Jones and Jon Horsfield.

# Brief
The brief was to develop a health monitoring system that had the 3 following aspects covered:

1.	Automatically storing data from a single sensor. Your developed system should be able to automatically (e.g. at a set time interval) store data from a single (simulated) sensor.
2.	Manually enter health data. A user should be able to manually enter some health data which should be stored in the system.
3.	Viewing health data history. A health professional should be able to select a patient and view that patients health data history (e.g. sensor values over time).

along with anything else that we had come up with in a set of diagrams and ui mockups for the previous assignment for the Case Studies module.

# Setup
This project uses Node.js and Yarn for managing its dependencies.

Before continuing, install Yarn globally on your system.

## Server
To setup the server, from within the server directory:

1) Run `yarn install` to install dependencies
2) Duplicate .env.example renaming it to .env
3) Replace the value of `DB_HOST` with the host to the mysql server
4) Replace the value of `DB_USER` and the value of `DB_PASS` with the credentials for accessing the mysql server
5) replace the value of `DATABASE` to the name of the database you've created in mysql
6) Run `./node_modules/.bin/knex migrate:latest` to run the database migrations 
7) Run `node ./scripts/seed.js` to seed the database
8) Get the email address of the patient account from mysql
9) Run `yarn start` to start the server.

## Client
The client is built using the Vue CLI so before continuing, ensure that you have the Vue CLI installed globally on your system. To setup the client, from within the client directory:
1) Run `yarn install` to install dependencies
2) Run `yarn serve` and head to `http://localhost:8080`
3) To login, use the email address you got in step 8 of setting up the server. The password will be the value of `DUMMY_PASSWORD` in the .env file **case sensitive**
