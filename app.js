import { getHome } from "./controllers/homeController.js"
import { getRegister, getLogin, postRegister, logoutUser, postLogin, getProfile } from "./controllers/userController.js";
import { getCreate, postCreate, getDetails, closeEvent, joinToEvent, getEdit, postEdit } from "./controllers/eventController.js";

const app = Sammy("body", function () {
    this.use('Handlebars', 'hbs');

    this.get('#/home', getHome);

    this.get('#/login', getLogin);
    this.post('#/login', postLogin);

    this.get('#/register', getRegister)
    this.post('#/register', postRegister);

    this.get('#/logout', logoutUser);
    this.get('#/profile', getProfile);

    this.get('#/create', getCreate);
    this.post('#/create', postCreate);

    this.get('#/details/:id', getDetails);

    this.get('#/edit/:id', getEdit);
    this.post('#/edit/:id', postEdit);

    this.get('#/close/:id', closeEvent);

    this.get('#/join/:id', joinToEvent);
    
})

app.run("#/home")