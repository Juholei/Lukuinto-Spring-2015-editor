# Lukuinto-Spring-2015-editor

 Game editor for [https://github.com/Juholei/Lukuinto-Spring-2015](https://github.com/Juholei/Lukuinto-Spring-2015)

## Building the project
Nodejs, npm, Bower and Grunt are needed. Command 'npm install' should install further dependencies for building the project based on what is added as requirements in 'package.json'. After that install globally bower and grunt with commands 'npm install -g bower' and 'npm install -g grunt-cli'. If sudo is needed then add 'sudo' to beginning of the command ;-)

After npm has installed all the requirements for building the project, use Bower to install the actual dependencies of the project with command "bower install". This installs the dependencies declared in 'bower.json'.

After installing all the dependencies, command 'grunt serve' builds and runs the game in browser. Command 'grunt build' builds the project into a production build in directory 'dist'. This can then be deployed to webserver.

The editor can be deployed separately from the game (which also has the server component), but uploading the game does not work in this case, if the server doesn't exist in the correct place.
