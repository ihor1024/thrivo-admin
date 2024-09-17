import { Amplify } from '@aws-amplify/core'
import { Auth, DataStore } from 'aws-amplify';
// import awsExports from "../aws-exports";
/*
const awsExports = require("../aws-exports");
const awsAmplify = require("aws-amplify");
const Amplify = awsAmplify.default;*/

//Amplify.configure({ ...awsExports, ssr: false});

export const isLoggedIn = async () => {
    try {
        const out = await Auth.currentAuthenticatedUser();
        return !!out;
    } catch (e) {
        return false;
    } 
}

export const signOut = async () => {
    try {
        await DataStore.clear();
        await Auth.signOut();
    } catch (e) {
        console.log(e)
        return false;
    }
}