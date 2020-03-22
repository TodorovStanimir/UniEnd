import { get, post, put, del } from "../helpers/requester.js";
import { appKey } from "../helpers/storage.js";

export function create(data) {
    return post(`appdata/${appKey}/events`, data);
}

export async function getAllEvents() {
    return await get(`appdata/${appKey}/events`)
}

export async function getEvent(id) {
    return await get(`appdata/${appKey}/events/${id}`);
}

export async function edit(id, event) {
    return await put(`appdata/${appKey}/events/${id}`, event);
}

export function close(id) {
    return del(`appdata/${appKey}/events/${id}`);
}