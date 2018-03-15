<div align="center">
    <img width="50%" src="angular-src/src/assets/img/website/showoff-logo.png" alt="showOff logo">
</div>

<h4 align="center">Let employers come to you while you focus on your projects.</h4>

## How to start this project

### Prerequisites
Before you begin cloning the repo, we suggest you to install [Docker Community](https://www.docker.com/docker-community) (Mac / Linux ) or [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/) (Windows)

### Cloning the repo
On the `Clone and download` button, either clone with `HTTPS` or `SSH`. 

### Opening the project
Once you have finished with cloning the project, open it up in your text editor of choice and get into the root directory of `showOffStatic` in your `Terminal` or `Git Bash` 

### Installing the necessary modules
In your `Terminal` or `Git Bash` we need to `cd` into `angular-src` folder and `npm install` within that folder to install those modules for the front end. 

When finished we need to `cd ..` out of the `angular-src` folder and `cd` into the `ShowOffAPI` folder and once again run `npm install`. 

Once that has finished we need to `cd ..` out of the `ShowOffAPI` folder and then get back into the root folder. If everything is correct we then can run `docker-compose up` and let Docker run.  

If successful, `api-server_1`, `mongo-database_` and `angular-frontend_1` should all load up correctly with no errors. 

### Viewing the project
Windows users should use  address `http://192.168.99.100:4200`

Mac / Linux users should use address `http://localhost:4200`


## From our Wiki

### The outline of the project:
https://docs.google.com/document/d/13qHpc0Loe1PSPIROuOb0sVbtObMRvUoLO-oupR5hQwg/edit

### Creating the wireframes: 
https://projects.invisionapp.com/freehand/auth?allowTeamSelection=false&redirectURL=https%3A%2F%2Fprojects.invisionapp.com%2Ffreehand%2Fdocument%2Fsusok0EqF

### Presentation to present our work: 
https://docs.google.com/presentation/d/1f5TEHBQ_OlqIcypt_0-Ulru63GfkFVNNx2lJa4_EjWE/edit#slide=id.gd9c453428_0_16

### Testing:
https://docs.google.com/spreadsheets/d/1t-QXWnVOouUmPGcezcljBCcPsVxDxiKQk3XFspBYGhU/edit#gid=0

## Technology Stack

### Front End
- HTML
- CSS
- Angular
- TypeScript
- AJAX/HTTP
- JavaScript
- Bootstrap

### Back-end
- Node
- JavaScript
- Mongoose
- Express
- MongoDB