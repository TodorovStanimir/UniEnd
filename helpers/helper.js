import { saveUser, getData } from "./storage.js"

export function getTemplate(path, context) {
    context.loadPartials({
        header: "../template/common/header.hbs",
        footer: "../template/common/footer.hbs",
        error: "../template/events/error.hbs",
        eventsHolder: "../template/events/eventsHolder.hbs",
    })
        // .then(function () {
        // this
        .partial(`../template/${path}`)
    // })
}

export function saveAndRedirect(context, path, data) {
    saveUser(data)
    context.redirect(path)
}

export function checkContext(context) {
    if (getData("userInfo") !== null) {
        context.isLogged = true;
        context.username = JSON.parse(getData("userInfo")).username;
    }
    return context;
}

export function checkInputData(username, password, repeatPassword) {
    if (username.length < 3) {
        throw new Error(`1`);
    }

    if (password < 6) {
        throw new Error(`2`);
    }

    if (password !== repeatPassword) {
        throw new Error(`3`);
    }
}

export function errorNotification(err) {
    console.log(err)
    const error = {
        '1': 'The username should be at least 3 characters long.',
        '2': 'The password should be at least 6 characters long.',
        '3': 'The repeat password should be equal to the password.',
        '4': 'The username should be at least 3 characters long',
        '5': 'The rePassword should be at least 6 characters long',
        '6': 'The title should be at least 6 characters long.',
        '7': 'The description should be at least 10 characters long.',
        '8': 'The image url should start with http:// or https://.',
        '9': 'The available tickets should be a number',
        '10': 'The genres must be separated by a single space.',
        '11': 'There is not avaialable ticket.',
        '12': 'The genres must be separated by a single comma.',
        '13': 'The date should be in string format (24 February; 24 March - 10 PM;)',
        '409': 'This username is already taken. Please retry your request with a different username',
        '400': 'Invalid credentials. Please retry your request with correct credentials',
        '401': 'Invalid credentials. Please retry your request with correct credentials',
    }
    if (document.getElementById('loadingBox') !== null) {
        document.getElementById('loadingBox').style.display = 'none';
        const errorElem = document.getElementById('errorBox');
        // const spanElem = errorElem.firstElementChild;
        errorElem.textContent = error[err.message] || error[err];
        errorElem.style.display = 'block';
        // return setTimeout(() => {
        //     const errorElem = document.getElementById('errorBox');
        //     const spanElem = errorElem.firstElementChild;
        //     spanElem.textContent = '';
        //     errorElem.style.display = 'none';
        // }, 3000);
    }
}

export function successNotification(message) {
    if (document.getElementById('loadingBox') !== null) {

        setTimeout(() => {
            document.getElementById('loadingBox').style.display = 'none';
            const successElem = document.getElementById('successBox');
            // const spanElem = successElem.firstElementChild;
            successElem.textContent = message;
            successElem.style.display = 'block';
        }, 800);

        return setTimeout(() => {
            const successElem = document.getElementById('successBox');
            // const spanElem = successElem.firstElementChild;
            successElem.textContent = '';
            successElem.style.display = 'none';
        }, 4000);
    }
}

export function loading() {
    const loadingElem = document.getElementById('loadingBox');
    loadingElem.style.display = 'block';
}