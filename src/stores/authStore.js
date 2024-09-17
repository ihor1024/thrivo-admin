// @ts-nocheck
import { writable,readable } from "svelte/store";

const authStore = writable({
    isLoggedIn: false,
    lastEvent: '',
    lastPayload: {},
    loginChange: true,
})

const authStoreRead = readable({
        isLoggedIn: false,
        lastEvent: '',
        lastPayload: {},
        loginChange: true,
    }, (set) => {
        const unsub = authStore.subscribe(val => {
            set(val);
        });
        return unsub;
})

export default {
    subscribe: authStore.subscribe,
    set: authStore.set,
    update: authStore.update,
    read: authStoreRead,
}