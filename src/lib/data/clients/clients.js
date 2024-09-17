import { Predicates, DataStore } from "aws-amplify"
import { Salon, User, Client, Formula } from '$src/models';
import { queryWrapper } from '$lib/backend/backend.js';

export const getAllSalons = async () => {
    const salons = await queryWrapper(Salon, 'Salon');
    if (salons === null) {
        return {salons: null, salonsById: null};
    }
    const ret = [];
    const retById = {};
    await Promise.all(salons.map(async (salon) => {
        const users = await salon.users.toArray();
        const out = {
            ...salon,
            users
        }
        ret.push(out);
        retById[salon.id] = out;
    }));
    return {salons: ret.sort((a, b) => a.name.localeCompare(b.name)), salonsById: retById};
}

export const getAllUsers = async () => {
    const users = await queryWrapper(User, 'User');
    if (users === null) {
        return {users: null, usersById: null};
    }
    const ret = [];
    const retById = {};
    await Promise.all(users.map(async (user) => {
        const salon = await user.salon;
        const clients = await user.clients.toArray();
        const out = {
            ...user,
            salon,
            clients,
        };
        ret.push(out);
        retById[user.id] = out;
    }));
    return {users: ret.sort((a, b) => a.name.localeCompare(b.name)), usersById: retById};
}

export const getAllClients = async () => {
    const clients = await queryWrapper(Client, 'Client');
    if (clients === null) {
        return {clients: null, clientsById: null};
    }
    const ret = [];
    const retById = {};
    await Promise.all(clients.map(async (client) => {
        const formulas = await client.formulas.toArray();
        const stylist = await client.stylist;
        let salon = {name: 'Unknown Salon'};
        if (stylist)
            salon = await stylist.salon;
        const out = {
            ...client,
            formulas,
            stylist,
            salon,
        };
        ret.push(out);
        retById[client.id] = out;
    }));
    return {clients: ret.sort((a, b) => a.name.localeCompare(b.name)), clientsById: retById};
}

export const getSalonUsersClients = async () => {
    const { salons, salonsById } = await getAllSalons();
    const { users, usersById } = await getAllUsers();
    const { clients, clientsById } = await getAllClients();
    return {salons, users, clients, salonsById, usersById, clientsById};
}