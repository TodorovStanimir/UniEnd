import { checkContext, getTemplate } from "../helpers/helper.js";
import { getAllEvents } from "../models/eventModel.js";


export async function getHome(context) {
    let newContext = checkContext(context);
    if (newContext.isLogged) {
        let events = await getAllEvents();
        events.sort((ev1, ev2)=>ev2.peopleInterestedIn-ev1.peopleInterestedIn);
        newContext.events = events;
    }
    getTemplate("home.hbs", newContext);
}