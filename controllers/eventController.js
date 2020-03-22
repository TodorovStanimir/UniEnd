import { getTemplate, checkContext, loading, errorNotification, successNotification } from "../helpers/helper.js"
import { getData } from "../helpers/storage.js";
import { create, edit, close, getEvent } from "../models/eventModel.js";

export function getCreate(context) {
    let newContext = checkContext(context);
    getTemplate('events/createEvent.hbs', newContext);
}

export function postCreate(context) {
    const event = {
        ...context.params,
    }

    try {
        if (event.name.length < 6) throw new Error('6');
        if (!event.dateTime.match(/^([0-9]{1,2} [A-Z]{1}[a-z]+)$|^([0-9]{2} [A-Z]{1}[a-z]+ [-] [0-9]{2} (AM|PM))$/g)) throw new Error('13');
        if (event.description.length < 10) throw new Error('7');
        if (!event.imageURL.startsWith('http:\/\/') && !event.imageURL.startsWith('https:\/\/')) throw new Error('8');

        event.organizer = JSON.parse(localStorage.getItem('userInfo')).username;
        event.peopleInterestedIn = 0;
        loading();
        create(event)
            .then(() => {
                context.redirect('#/home');
                successNotification('Event created successfully.');
            })
            .catch(error => { errorNotification(error) });
    } catch (error) {
        errorNotification(error);
    }
}

export async function getDetails(context) {
    let newContext = checkContext(context);
    let event = await getEvent(newContext.params.id);
    Object.keys(event).map(key => newContext[key] = event[key]);
    newContext.isAuthor = event._acl.creator === JSON.parse(localStorage.getItem('userInfo'))._id
    getTemplate('events/detailsEvent.hbs', newContext);
}

export async function getEdit(context) {
    let newContext = checkContext(context);
    loading();
    let event = await getEvent(newContext.params.id);
    Object.keys(event).map(key => newContext[key] = event[key]);
    getTemplate('events/editEvent.hbs', newContext);
    successNotification('Successfully loaded editing event.');
}

export function postEdit(context) {
    let newContext = checkContext(context);
    let event = { ...context.params };
    try {
        if (event.name.length < 6) throw new Error('6');
        if (!event.dateTime.match(/^([0-9]{1,2} [A-Z]{1}[a-z]+)$|^([0-9]{2} [A-Z]{1}[a-z]+ [-] [0-9]{2} (AM|PM))$/g)) throw new Error('13');
        if (event.description.length < 10) throw new Error('7');
        if (!event.imageURL.startsWith('http:\/\/') && !event.imageURL.startsWith('https:\/\/')) throw new Error('8');
        event.peopleInterestedIn = Number(event.peopleInterestedIn);
        delete event.id;
        let id = context.params.id;
        loading();
        edit(id, event)
            .then(() => {
                newContext.redirect('#/home');
                successNotification('Event edited successfully.');
            })
    } catch (err) {
        errorNotification(err);
    }

}

export function closeEvent(context) {
    let newContext = checkContext(context);
    const id = context.params.id;
    loading();
    close(id)
        .then((res) => {
            newContext.redirect('#/home');
            successNotification('Event closed successfully.')
        })
        .catch(error => errorNotification(error));
}

export async function joinEvent(context) {
    let newContext = checkContext(context);
    let id = context.params.id;
    loading();
    let event = await getEvent(id);
    delete event._id;
    try {
       
        event.peopleInterestedIn++;
        edit(id, event)
            .then(() => {
                newContext.redirect('#/home');
                successNotification(`You join the event successfully.`)
            })
            .catch(err => {
                errorNotification(err)
            })
    } catch (err) {
        errorNotification(err);
    }
}