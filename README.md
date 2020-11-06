# PRG7927
Class folder for back-end frameworks


to install all the dependencies for the backend:

express --view=hbs <filename>
-then navigate to the directory
create a .gitignore for the node modules
npm install
npm install --save-dev nodemon
npm install --save mysql
-make sure your file imports what it needs with the require..


//to change the password, so long as you’re already in Workbench, run this query:

SET PASSWORD FOR 'root'@'localhost' = PASSWORD('Password1!');
FLUSH PRIVILEGES;



password is now Password1!