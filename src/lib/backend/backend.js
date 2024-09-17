import {Auth, DataStore} from 'aws-amplify';
import authStore from '$stores/authStore';
import { isLoggedIn } from '$lib/auth';
import { AccessCode, BatchInfo, Client, Color, ColorLine, Company, Component, CycleInfo, Device, Formula, MixTrace, Mixture, Salon, SubscriptionPlan, User } from '$src/models';


export const queryWrapper = async (model, labelStr='') => {
    if (!await isLoggedIn()) {
        return null;
    }
    try {
        const out = await DataStore.query(model);
        //console.log(labelStr)
        //console.log(out)
        return out;
    } catch (e) {
        console.log(e)
    }
}

// helper functions to quickly refresh the 'States'
export const refreshColors = async () => {
    const colors = await queryWrapper(Color, 'Color');
    const colorLines = await queryWrapper(ColorLine, 'CL');
    const companies = await queryWrapper(Company, 'Company');

    return {colors, colorLines, companies}
}

export const queryColorLines = async () => {
    return await queryWrapper(ColorLine, 'CL');
}
export const queryColors = async () => {
    return await queryWrapper(Color, 'Color');
}
export const queryCompanies = async () => {
    return await queryWrapper(Company, 'Company');
}

export const queryCycles = async () => {
    return await queryWrapper(CycleInfo, 'Cycle');
}
export const queryBatch = async () => {
    return await queryWrapper(BatchInfo, 'Batch');
}
export const queryDevices = async () => {
    return await queryWrapper(Device, 'Devices');
}

export const refreshData = async () => {
    const batchedData = await queryBatch();
    const cycledData = await queryCycles();
    const devices = await queryDevices();

    return {batches: batchedData, cycles: cycledData, devices: devices}
}

export const refreshSalonData = async () => {
    const subscriptions = await queryWrapper(SubscriptionPlan, 'SP');
    const codes = await queryWrapper(AccessCode, 'AC');
    const salons = await queryWrapper(Salon, 'Salons');

    return {subscriptions, codes, salons}
}

export const refreshUsers = async () => {
    const users = await queryWrapper(User, 'Users');
    const clients = await queryWrapper (Client, 'Clients');
    const salons = await queryWrapper(Salon, 'Salons');

    return {users, clients, salons}
}

export const refreshFormulas = async () => {
    const formulas = await queryWrapper(Formula, 'Formulas');
    console.log((await formulas[0].components.values))
    const components = await queryWrapper(Component, 'Components');

    return {formulas, components}
}

export const refreshMixtures = async () => {
    const mixtures = await queryWrapper(Mixture, 'Mixtures');
    const mixTraces = await queryWrapper(MixTrace, 'Mixtraces');

    return {mixtures, mixTraces}
}

export const refreshEverything = async () => {
    // No idea what this function is for, but it's here.
    await refreshColors();
    await refreshData();
    await refreshSalonData();
    await refreshUsers();
    await refreshFormulas();
    await refreshMixtures();
}