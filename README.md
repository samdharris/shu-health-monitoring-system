Steps to set up docker instances:

1. From this folder, in a powershell window run "docker-compose up"
2. In 2 additional windows, access the server and db with 
	- "docker exec -it server /bin/bash"
	- "docker exec -it dbcontainer /bin/bash"
3. In the server window, run "./node_modules/.bin/knex migrate:latest"
4. In the server window, run "node ./scripts/seed.js"
	- These steps will create and seed the database. In order to find the created username, we'll need to query the db
	- Please note the db can be queried from port 27017 if you have  mysql installed
5. In the db window, run the following commands:
	- mysql -u dbuser -p;  (password is dbpass)
	- use sitedb
	- select * from users;
	- log in with given username and "password" (literal) at localhost:8080/login