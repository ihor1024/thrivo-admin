import {User, Salon} from '$src/models';
import {Predicates, DataStore} from "aws-amplify"

export async function getUsers() {
    try {
        const o = await DataStore.query(User, Predicates.ALL);
        const out = o.sort((uA, uB) => uA.name.localeCompare(uB.name));
        if (out){
            return out;
        } else {
            console.log('Could not query all salons')
            return null
        }
    } catch (err) {
        console.log(err)
        return null
    }
}

export async function setUserSalon(id, salonId = undefined) {
    try {
        const toUpdate = await DataStore.query(User, id);
        if (!toUpdate) {
            console.log('Could not query user to update')
            return null;
        }
        const salonData = await DataStore.query(Salon, salonId)
        if (!salonData) {
            console.log('Could not query Salon to add tenantaccess')
            return null;
        }

        const out = await DataStore.save(User.copyOf(toUpdate, updated => {
            updated.salonUsersId = salonId;
            if (salonId) {
                updated.tenantClaims = salonData.defaultSalonGroups
                updated.salonAdmins = salonData.salonAdmins
            } else {
                updated.tenantClaims = []
                updated.salonAdmins = []
            }
        }))
        if (out) {
            return out;
        } else {
            console.log('Could not set salon id on a user')
            return null;
        }
    } catch (err) {
        console.log(err)
        return null
    }
}