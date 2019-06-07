# Shoe_True_To_Size_Calculator
A small application designed to crowdsource true-to-size (fit) data for shoes.

## How to get Started
This app requires the user to have node/npm ([mac](https://blog.teamtreehouse.com/install-node-js-npm-mac), [linux](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/)) , and postgres ([mac/windows](https://www.datacamp.com/community/tutorials/installing-postgresql-windows-macosx), [linux](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)) installed on their machine.

After installing these items and setting up user permissions for postgreSQL, run the file schema.sql using the following command in the terminal: "psql postgres -f './db/schema.sql'". Then create a .env file in the root directory with your database username (DB_USER) and database password (DB_PASS).

If interested, you may also add a specific port number in your .env file (PORT).
After completing the above tasks, run the commands 'npm install', 'npm run build', and 'npm run start' in that order on the command line.

Finally, open up your browser and go to your localhost at port 8000 (http://localhost:8000) or whatever port you specified in your .env. the localhost should be ready to go, complete with dummy data (if you wish to start with a clean slate, comment out the insert statements in the schema.sql file in the database folder and rerun the file).
