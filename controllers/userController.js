import { getTemplate, checkInputData, saveAndRedirect, errorNotification, successNotification, loading, checkContext } from "../helpers/helper.js";
import { login, logout, register } from "../models/userModel.js";
import { removeUser } from "../helpers/storage.js";
import { getAllEvents} from "../models/eventModel.js";

export function getLogin(context) {
    getTemplate('user/login.hbs', context);
}

export function getRegister(context) {
    getTemplate('user/register.hbs', context)
}

export function postRegister(context) {
    const { username, password, rePassword } = context.params;

    try {
        if (username.length < 3) {
            throw new Error('4');
        }
        if (password.length < 6) {
            throw new Error('2');
        }
        if (rePassword.length < 6) {
            throw new Error('5');
        }
        if (password!==rePassword) {
            throw new Error('3');
        }
        
        loading();
        register({ username, password })
            .then(saveAndRedirect.bind(undefined, context, '#/home'))
            .then(res => successNotification(`User registration successful.`))
            .catch(error => {
                errorNotification(error)
            })

    } catch (error) {
        errorNotification(error)
    }

}

export function logoutUser(context) {
    loading();
    logout()
        .then(() => {
            removeUser();
            context.redirect('#/home');
            successNotification('Logout successful.');
        })
}

export function postLogin(context) {
    try {
        const { username, password } = context.params;
        if (username.length < 3) {
            throw new Error('4');
        }
        if (password.length < 6) {
            throw new Error('5');
        }

        loading();
        login({ username, password })
            .then(data => saveAndRedirect(context, '#/home', data))
            .then(res => successNotification(`Login successful.`))
            .catch(error => {
                errorNotification(error)
            })
    } catch (error) {
        errorNotification(error)
    }
}

export async function getProfile(context) {
    let newContext = checkContext(context);
    let events = await getAllEvents()
    newContext.events = events
        .filter(event => event.organizer === context.username)
        .map(event => event.name);

    newContext.numberOfEvents = newContext.events.length;
    getTemplate("user/profile.hbs", newContext);
}